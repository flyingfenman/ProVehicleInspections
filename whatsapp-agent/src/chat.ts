import { DurableObject } from "cloudflare:workers"
import { writeReply, type Draft, type HistoryItem } from "./agent"
import { inboxStub, type Env } from "./env"
import type { InboxStatus } from "./inbox"
import { notifyHenry } from "./notify"
import { loadFreeTimes, type FreeTimes } from "./slots"
import { fetchImage, sendText, showTyping, type IncomingEvent } from "./whatsapp"

type WaitingDraft = Draft & {
  id: string
  createdAt: number
  // waiting: Henry hasn't approved it. scheduled: approved, goes out once the minimum wait has passed.
  status: "waiting" | "scheduled"
  sendAt?: number
}

export type ChatState = {
  waId: string
  name: string
  history: HistoryItem[]
  // Message ids already handled, so Meta's retries don't count twice.
  seen: string[]
  // Ids of messages this Worker sent, so their echoes aren't mistaken for Henry typing.
  sentIds: string[]
  lastCustomerAt: number
  lastCustomerMsgId: string
  // Set while the customer is waiting for a reply.
  pendingSince: number | null
  // Henry answered himself: the agent stays out until then.
  pausedUntil: number
  draft: WaitingDraft | null
}

const HISTORY_KEPT = 60
const HISTORY_SENT_TO_CLAUDE = 40
const IMAGES_SENT_TO_CLAUDE = 4
// However long the customer keeps typing, they get a reply this long after their first unanswered message.
const LONGEST_WAIT_MS = 5 * 60 * 1000
// WhatsApp only allows free text replies within 24 hours of the customer's last message.
const REPLY_WINDOW_MS = 24 * 60 * 60 * 1000

function emptyState(waId: string): ChatState {
  return {
    waId,
    name: "",
    history: [],
    seen: [],
    sentIds: [],
    lastCustomerAt: 0,
    lastCustomerMsgId: "",
    pendingSince: null,
    pausedUntil: 0,
    draft: null,
  }
}

// One customer's conversation. All of a customer's messages go through the same instance, one at a time.
export class Chat extends DurableObject<Env> {
  private async load(waId?: string): Promise<ChatState> {
    const state = await this.ctx.storage.get<ChatState>("state")
    return state ?? emptyState(waId ?? "")
  }

  private async save(state: ChatState) {
    state.history = state.history.slice(-HISTORY_KEPT)
    state.seen = state.seen.slice(-100)
    state.sentIds = state.sentIds.slice(-100)
    await this.ctx.storage.put("state", state)
  }

  private minDelayMs() {
    return Number(this.env.MIN_DELAY_SECONDS || 60) * 1000
  }

  async getState(): Promise<ChatState | null> {
    return (await this.ctx.storage.get<ChatState>("state")) ?? null
  }

  async receive(event: IncomingEvent, now = Date.now()): Promise<void> {
    const state = await this.load(event.waId)
    state.waId = event.waId
    if (state.seen.includes(event.msgId) || state.sentIds.includes(event.msgId)) return
    state.seen.push(event.msgId)

    if (event.kind === "henry") {
      state.history.push({ from: "henry", text: event.text, at: event.at, msgId: event.msgId })
      // Henry has taken over this chat: drop whatever the agent was going to say.
      state.pendingSince = null
      state.draft = null
      state.pausedUntil = now + Number(this.env.HANDOVER_HOURS || 12) * 60 * 60 * 1000
      await this.ctx.storage.deleteAlarm()
      await this.save(state)
      await this.updateInbox(state, "henry", event.text, "", now)
      return
    }

    if (event.name) state.name = event.name
    state.history.push({ from: "customer", text: event.text, at: event.at, msgId: event.msgId, imageId: event.imageId })
    state.lastCustomerAt = Math.max(state.lastCustomerAt, event.at || now)
    state.lastCustomerMsgId = event.msgId

    if (this.env.MODE === "off" || state.pausedUntil > now) {
      await this.save(state)
      return
    }

    // A draft written before this message is out of date, so write a new one after the wait.
    if (state.draft) state.draft = null
    state.pendingSince ??= now
    const extra = Math.random() * Number(this.env.RANDOM_EXTRA_SECONDS || 0) * 1000
    const replyAt = Math.min(now + this.minDelayMs() + extra, Math.max(state.pendingSince + LONGEST_WAIT_MS, now + this.minDelayMs()))
    await this.ctx.storage.setAlarm(replyAt)
    await this.save(state)
  }

  async alarm(): Promise<void> {
    const state = await this.load()
    const now = Date.now()
    if (state.draft?.status === "scheduled") {
      await this.deliver(state, state.draft.text)
      return
    }
    if (state.pendingSince !== null) await this.compose(state, now)
  }

  private async compose(state: ChatState, now: number) {
    state.pendingSince = null
    if (this.env.MODE === "off" || state.pausedUntil > now) return this.save(state)

    let free: FreeTimes = { standard: [], premium: [], ev: [] }
    let diaryNote = ""
    try {
      free = await loadFreeTimes(this.env.SITE_URL)
    } catch (error) {
      console.error(error)
      diaryNote = "The diary didn't load, so no times were offered."
    }

    const history = state.history.slice(-HISTORY_SENT_TO_CLAUDE)
    const images = new Map<string, { data: string; mediaType: string }>()
    // Photos from the messages waiting for an answer.
    const lastBusiness = history.map((h) => h.from).lastIndexOf("agent")
    const lastHenry = history.map((h) => h.from).lastIndexOf("henry")
    const unanswered = history.slice(Math.max(lastBusiness, lastHenry) + 1)
    for (const item of unanswered.filter((h) => h.imageId).slice(-IMAGES_SENT_TO_CLAUDE)) {
      const image = await fetchImage(this.env, item.imageId!).catch(() => null)
      if (image) images.set(item.imageId!, image)
    }
    const unreadable = unanswered.some((h) => /^\[(voice note|video|document)/.test(h.text))

    let draft: Draft
    try {
      draft = await writeReply({ apiKey: this.env.ANTHROPIC_API_KEY, baseURL: this.env.ANTHROPIC_BASE_URL, siteUrl: this.env.SITE_URL, name: state.name, history, images, free, now: new Date(now) })
    } catch (error) {
      console.error(error)
      draft = { shouldReply: true, text: "", needsHenry: true, note: "The assistant failed to write a reply." }
    }
    if (diaryNote) draft = { ...draft, needsHenry: true, note: [draft.note, diaryNote].filter(Boolean).join(" ") }
    if (unreadable && !draft.needsHenry) draft = { ...draft, needsHenry: true, note: [draft.note, "They sent something the assistant can't hear or read."].filter(Boolean).join(" ") }

    if (!draft.shouldReply && !draft.needsHenry) {
      await this.save(state)
      await this.updateInbox(state, "quiet", lastCustomerText(state), "Nothing to answer.", now)
      return
    }

    if (this.env.MODE === "auto" && !draft.needsHenry && draft.text) {
      await this.deliver(state, draft.text)
      return
    }

    state.draft = { ...draft, id: crypto.randomUUID(), createdAt: now, status: "waiting" }
    await this.save(state)
    await this.updateInbox(state, "waiting", draft.text || lastCustomerText(state), draft.note, now)
    await notifyHenry(this.env, state).catch((error) => console.error("Email to Henry failed", error))
  }

  // Henry pressed Send on the drafts page, with the draft as it was or edited.
  async approve(draftId: string | null, text: string, now = Date.now()): Promise<{ ok: boolean; message: string }> {
    const state = await this.load()
    text = text.trim()
    if (!text) return { ok: false, message: "The message is empty." }
    if (draftId && state.draft?.id !== draftId) {
      return { ok: false, message: "The customer wrote again, so this draft is out of date. A new one is on its way." }
    }
    if (now - state.lastCustomerAt > REPLY_WINDOW_MS) {
      return { ok: false, message: "It is over 24 hours since the customer last wrote, so WhatsApp only allows you to reply from the app." }
    }

    const sendAt = state.lastCustomerAt + this.minDelayMs()
    if (sendAt > now) {
      state.draft = { ...(state.draft ?? { shouldReply: true, needsHenry: false, note: "", id: crypto.randomUUID(), createdAt: now }), text, status: "scheduled", sendAt }
      state.pendingSince = null
      await this.ctx.storage.setAlarm(sendAt)
      await this.save(state)
      return { ok: true, message: `Sending in ${Math.ceil((sendAt - now) / 1000)} seconds.` }
    }
    const sent = await this.deliver(state, text)
    return sent ? { ok: true, message: "Sent." } : { ok: false, message: "WhatsApp didn't accept it. The error is on the chat page." }
  }

  async skip(): Promise<void> {
    const state = await this.load()
    state.draft = null
    state.pendingSince = null
    await this.ctx.storage.deleteAlarm()
    await this.save(state)
    await this.updateInbox(state, "quiet", lastCustomerText(state), "Skipped.", Date.now())
  }

  // Lets the agent answer a chat Henry took over, before the handover time runs out.
  async resume(): Promise<void> {
    const state = await this.load()
    state.pausedUntil = 0
    await this.save(state)
  }

  private async deliver(state: ChatState, text: string): Promise<boolean> {
    try {
      if (state.lastCustomerMsgId) {
        await showTyping(this.env, state.lastCustomerMsgId).catch((error) => console.error("Typing indicator failed", error))
        // A few seconds of "typing...", longer for longer replies.
        await new Promise((resolve) => setTimeout(resolve, Math.min(3000 + text.length * 25, 12000)))
      }
      const msgId = await sendText(this.env, state.waId, text)
      const now = Date.now()
      state.history.push({ from: "agent", text, at: now, msgId })
      if (msgId) state.sentIds.push(msgId)
      state.draft = null
      state.pendingSince = null
      await this.save(state)
      await this.updateInbox(state, "sent", text, "", now)
      return true
    } catch (error) {
      console.error(error)
      const note = `Sending failed: ${error instanceof Error ? error.message : String(error)}`
      state.draft = { ...(state.draft ?? { shouldReply: true, needsHenry: true, id: crypto.randomUUID(), createdAt: Date.now() }), text, note, status: "waiting" }
      await this.save(state)
      await this.updateInbox(state, "error", text, note, Date.now())
      return false
    }
  }

  private async updateInbox(state: ChatState, status: InboxStatus, preview: string, note: string, now: number) {
    await inboxStub(this.env).set({ waId: state.waId, name: state.name, preview: preview.slice(0, 160), status, note, updatedAt: now })
  }
}

function lastCustomerText(state: ChatState) {
  return [...state.history].reverse().find((h) => h.from === "customer")?.text ?? ""
}
