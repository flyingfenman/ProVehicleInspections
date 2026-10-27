import type { ChatState } from "./chat"
import type { InboxItem } from "./inbox"

export function escapeHtml(value: string) {
  return value.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!)
}

const STATUS_LABELS: Record<InboxItem["status"], string> = {
  waiting: "Waiting for you",
  sent: "Answered",
  henry: "You replied",
  quiet: "No reply needed",
  error: "Didn't send",
}

const MODE_LABELS: Record<string, string> = {
  approve: "Every reply waits for you to press Send.",
  auto: "Simple replies send themselves. Anything unusual waits for you.",
  off: "The assistant is off.",
}

function page(title: string, body: string) {
  return new Response(
    `<!doctype html><html lang="en-GB"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="robots" content="noindex,nofollow"><title>${escapeHtml(title)}</title>
<style>
:root{--purple:#6d28d9;--card:#f3efff;--text:#1f1d2b;--muted:#6b6880;--line:#e4defa}
*{box-sizing:border-box}body{margin:0;background:#fff;color:var(--text);font:16px/1.45 system-ui,-apple-system,"Segoe UI",Arial,sans-serif}
main{max-width:640px;margin:0 auto;padding:16px}h1{font-size:22px;margin:4px 0 4px}a{color:var(--purple)}
.muted{color:var(--muted);font-size:14px}.card{display:block;background:var(--card);border-radius:14px;padding:12px 14px;margin:10px 0;text-decoration:none;color:inherit}
.badge{display:inline-block;font-size:12px;font-weight:600;border-radius:999px;padding:2px 8px;background:#fff;border:1px solid var(--line)}
.badge.waiting,.badge.error{background:var(--purple);color:#fff;border-color:var(--purple)}
.bubble{max-width:85%;padding:8px 12px;border-radius:14px;margin:6px 0;white-space:pre-wrap;word-wrap:break-word}
.customer{background:#fff;border:1px solid var(--line)}.ours{background:var(--card);margin-left:auto}
.who{font-size:12px;color:var(--muted)}textarea{width:100%;min-height:180px;font:inherit;padding:10px;border:1px solid var(--line);border-radius:12px}
button{font:inherit;font-weight:600;border-radius:12px;padding:12px 18px;border:0;cursor:pointer}
.send{background:var(--purple);color:#fff}.plain{background:#fff;color:var(--purple);border:1px solid var(--line)}
.row{display:flex;gap:10px;flex-wrap:wrap;margin:10px 0}.note{background:#fff7ed;border-radius:12px;padding:10px 12px;margin:10px 0}
</style></head><body><main>${body}</main></body></html>`,
    { headers: { "content-type": "text/html; charset=utf-8", "x-robots-tag": "noindex", "cache-control": "no-store" } },
  )
}

function when(at: number) {
  return new Intl.DateTimeFormat("en-GB", { timeZone: "Europe/London", weekday: "short", hour: "2-digit", minute: "2-digit", hourCycle: "h23" }).format(new Date(at))
}

export function inboxPage(items: InboxItem[], key: string, mode: string) {
  const k = encodeURIComponent(key)
  const list = items.length
    ? items
        .map(
          (i) => `<a class="card" href="/chat/${i.waId}?k=${k}"><div><b>${escapeHtml(i.name || `+${i.waId}`)}</b> <span class="badge ${i.status}">${STATUS_LABELS[i.status]}</span></div>
<div class="muted">${when(i.updatedAt)}${i.note ? ` · ${escapeHtml(i.note)}` : ""}</div><div>${escapeHtml(i.preview)}</div></a>`,
        )
        .join("")
    : `<p class="muted">No WhatsApp chats yet.</p>`
  return page(
    "WhatsApp replies",
    `<h1>WhatsApp replies</h1><p class="muted">${escapeHtml(MODE_LABELS[mode] ?? mode)} <a href="/try?k=${k}">Try the assistant</a></p>${list}`,
  )
}

export function chatPage(state: ChatState, key: string, now: number, flash = "") {
  const k = escapeHtml(key)
  const who = state.name || `+${state.waId}`
  const bubbles = state.history
    .slice(-30)
    .map((h) => {
      const label = h.from === "customer" ? who : h.from === "henry" ? "You" : "Assistant"
      return `<div class="bubble ${h.from === "customer" ? "customer" : "ours"}"><div class="who">${escapeHtml(label)} · ${when(h.at)}</div>${escapeHtml(h.text)}</div>`
    })
    .join("")

  const draft = state.draft
  const paused = state.pausedUntil > now
  const scheduled = draft?.status === "scheduled"
  const form = scheduled
    ? `<div class="note">Approved. It sends at ${when(draft.sendAt ?? now)}.</div>`
    : `<form method="post" action="/chat/${state.waId}/send">
<input type="hidden" name="k" value="${k}"><input type="hidden" name="draft" value="${escapeHtml(draft?.id ?? "")}">
<textarea name="text" placeholder="Write a reply">${escapeHtml(draft?.text ?? "")}</textarea>
<div class="row"><button class="send" type="submit">Send</button>
${draft ? `<button class="plain" type="submit" formaction="/chat/${state.waId}/skip">Skip</button>` : ""}</div></form>`

  return page(
    `WhatsApp: ${who}`,
    `<p><a href="/inbox?k=${encodeURIComponent(key)}">All chats</a></p><h1>${escapeHtml(who)}</h1><p class="muted">+${escapeHtml(state.waId)}</p>
${flash ? `<div class="note">${escapeHtml(flash)}</div>` : ""}
${bubbles}
${draft?.note ? `<div class="note"><b>Note:</b> ${escapeHtml(draft.note)}</div>` : ""}
${paused ? `<form method="post" action="/chat/${state.waId}/resume" class="note">You replied yourself, so the assistant is quiet in this chat until ${when(state.pausedUntil)}.
<input type="hidden" name="k" value="${k}"><div class="row"><button class="plain" type="submit">Let the assistant answer again</button></div></form>` : ""}
${form}`,
  )
}

export function messagePage(message: string, back: string) {
  return page("WhatsApp replies", `<div class="note">${escapeHtml(message)}</div><p><a href="${escapeHtml(back)}">Back</a></p>`)
}

// A test box: type what a customer might send and see the reply the assistant would draft. Nothing is sent.
export function tryPage(key: string, message = "", draft?: { text: string; needsHenry: boolean; note: string; shouldReply: boolean }) {
  const result = draft
    ? `<h2 style="font-size:18px">The assistant would say</h2>
${draft.needsHenry ? `<div class="note"><b>Would wait for you.</b> ${escapeHtml(draft.note)}</div>` : `<p class="muted">Simple enough to send on its own in auto mode.</p>`}
<div class="bubble ours">${draft.shouldReply && draft.text ? escapeHtml(draft.text) : "(no reply needed)"}</div>`
    : ""
  return page(
    "Try the assistant",
    `<p><a href="/inbox?k=${encodeURIComponent(key)}">All chats</a></p><h1>Try the assistant</h1>
<p class="muted">Type a message a customer might send. Nothing goes to WhatsApp.</p>
<form method="post" action="/try"><input type="hidden" name="k" value="${escapeHtml(key)}">
<textarea name="text" placeholder="Hi, how much to check a 2019 Tesla Model 3 in Barking this Saturday?">${escapeHtml(message)}</textarea>
<div class="row"><button class="send" type="submit">Draft a reply</button></div></form>${result}`,
  )
}
