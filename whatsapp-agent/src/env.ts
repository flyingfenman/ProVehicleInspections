import type { Chat } from "./chat"
import type { Inbox } from "./inbox"

export interface Env {
  CHAT: DurableObjectNamespace<Chat>
  INBOX: DurableObjectNamespace<Inbox>

  MODE: "approve" | "auto" | "off"
  MIN_DELAY_SECONDS: string
  RANDOM_EXTRA_SECONDS: string
  HANDOVER_HOURS: string
  SITE_URL: string
  // Where this Worker answers, for the links in Henry's emails.
  AGENT_URL: string
  GRAPH_VERSION: string
  // Only set for local testing, to point at a fake Meta and a fake Claude.
  GRAPH_ORIGIN?: string
  ANTHROPIC_BASE_URL?: string

  // Meta: a permanent System User token, the business phone number's id, the app secret (signs each webhook call)
  // and the made-up verify token typed into the webhook settings.
  WHATSAPP_TOKEN: string
  WHATSAPP_PHONE_NUMBER_ID: string
  WHATSAPP_APP_SECRET: string
  WHATSAPP_VERIFY_TOKEN: string

  ANTHROPIC_API_KEY: string
  // Emails Henry each draft to approve.
  RESEND_API_KEY: string
  NOTIFY_EMAIL: string
  // Opens the drafts page. It is in every link Henry gets by email.
  ADMIN_KEY: string
}

export function inboxStub(env: Env) {
  return env.INBOX.get(env.INBOX.idFromName("inbox"))
}

export function chatStub(env: Env, waId: string) {
  return env.CHAT.get(env.CHAT.idFromName(waId))
}
