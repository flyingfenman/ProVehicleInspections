import type { ChatState } from "./chat"
import type { Env } from "./env"
import { escapeHtml } from "./pages"

export function chatLink(env: Env, waId: string) {
  return `${env.AGENT_URL}/chat/${waId}?k=${encodeURIComponent(env.ADMIN_KEY)}`
}

// Emails Henry a draft to approve, with a link straight to it.
export async function notifyHenry(env: Env, state: ChatState) {
  if (!env.RESEND_API_KEY || !env.NOTIFY_EMAIL) return
  const draft = state.draft
  const who = state.name || `+${state.waId}`
  const lastMessages = state.history.slice(-4)
  const link = chatLink(env, state.waId)
  const subject = `${draft?.needsHenry ? "Needs you" : "Reply ready"}: WhatsApp from ${who}`

  const text = [
    ...lastMessages.map((h) => `${h.from === "customer" ? who : "You"}: ${h.text}`),
    "",
    draft?.note ? `Note: ${draft.note}` : "",
    draft?.text ? `Draft reply:\n${draft.text}` : "No draft, please reply yourself.",
    "",
    `Send, edit or skip: ${link}`,
  ].join("\n")

  const html = `<div style="font-family:Arial,sans-serif;font-size:15px;color:#1f1d2b;max-width:560px">
${lastMessages.map((h) => `<p style="margin:0 0 8px"><b>${h.from === "customer" ? escapeHtml(who) : "You"}:</b> ${escapeHtml(h.text)}</p>`).join("")}
${draft?.note ? `<p style="margin:12px 0;color:#7c2d12"><b>Note:</b> ${escapeHtml(draft.note)}</p>` : ""}
<div style="background:#f3efff;border-radius:12px;padding:14px;margin:12px 0;white-space:pre-wrap">${draft?.text ? escapeHtml(draft.text) : "No draft, please reply yourself."}</div>
<p><a href="${link}" style="display:inline-block;background:#6d28d9;color:#fff;text-decoration:none;padding:12px 20px;border-radius:10px;font-weight:bold">Send, edit or skip</a></p>
</div>`

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${env.RESEND_API_KEY}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: "Pro Vehicle Inspections <noreply@eppingcarbuyer.com>",
      to: [env.NOTIFY_EMAIL],
      subject,
      text,
      html,
    }),
  })
  if (!res.ok) throw new Error(`Resend ${res.status}: ${await res.text()}`)
}
