import type { Env } from "./env"

// What the agent needs from one WhatsApp webhook call.
export type IncomingEvent =
  | {
      kind: "customer"
      waId: string
      name: string
      msgId: string
      at: number
      // The message as text, with anything that isn't text described in [brackets].
      text: string
      // A photo the agent can look at.
      imageId?: string
      // Something the agent can't read or hear (voice note, video, document), so Henry must look.
      unreadable?: boolean
    }
  // A message Henry sent himself from the WhatsApp Business app on his phone.
  | { kind: "henry"; waId: string; msgId: string; at: number; text: string }

type WaMessage = {
  from: string
  to?: string
  id: string
  timestamp: string
  type: string
  text?: { body: string }
  image?: { id: string; caption?: string }
  sticker?: { id: string }
  audio?: { id: string; voice?: boolean }
  video?: { id: string; caption?: string }
  document?: { id: string; filename?: string; caption?: string }
  location?: { latitude: number; longitude: number; name?: string; address?: string }
  button?: { text: string }
  interactive?: { button_reply?: { title: string }; list_reply?: { title: string } }
  contacts?: Array<{ name?: { formatted_name?: string }; phones?: Array<{ phone?: string }> }>
  referral?: { headline?: string; body?: string; source_url?: string }
}

export async function verifySignature(rawBody: string, header: string | null, appSecret: string): Promise<boolean> {
  if (!header?.startsWith("sha256=")) return false
  const key = await crypto.subtle.importKey("raw", new TextEncoder().encode(appSecret), { name: "HMAC", hash: "SHA-256" }, false, ["sign"])
  const mac = new Uint8Array(await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(rawBody)))
  const expected = [...mac].map((b) => b.toString(16).padStart(2, "0")).join("")
  return timingSafeEqual(expected, header.slice("sha256=".length))
}

export function timingSafeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false
  let diff = 0
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i)
  return diff === 0
}

// Turns Meta's webhook body into customer messages and Henry's own replies. Delivery receipts, reactions and
// anything for another phone number are dropped.
export function parseWebhook(body: unknown, phoneNumberId: string): IncomingEvent[] {
  const events: IncomingEvent[] = []
  const entries = (body as { entry?: Array<{ changes?: Array<{ field?: string; value?: any }> }> })?.entry ?? []

  for (const change of entries.flatMap((entry) => entry.changes ?? [])) {
    const value = change.value ?? {}
    if (value.metadata?.phone_number_id && value.metadata.phone_number_id !== phoneNumberId) continue

    if (change.field === "messages") {
      const names = new Map<string, string>(
        (value.contacts ?? []).map((c: { wa_id: string; profile?: { name?: string } }) => [c.wa_id, c.profile?.name ?? ""]),
      )
      for (const message of (value.messages ?? []) as WaMessage[]) {
        const described = describe(message)
        if (!described) continue
        events.push({
          kind: "customer",
          waId: message.from,
          name: names.get(message.from) ?? "",
          msgId: message.id,
          at: Number(message.timestamp) * 1000,
          ...described,
        })
      }
    }

    // With the Business app and the API sharing the number, what Henry types in the app comes back as an echo.
    if (change.field === "smb_message_echoes") {
      for (const message of (value.message_echoes ?? []) as WaMessage[]) {
        if (!message.to) continue
        events.push({
          kind: "henry",
          waId: message.to,
          msgId: message.id,
          at: Number(message.timestamp) * 1000,
          text: describe(message)?.text ?? "[message]",
        })
      }
    }
  }
  return events
}

function describe(message: WaMessage): { text: string; imageId?: string; unreadable?: boolean } | null {
  const fromAd = message.referral?.headline ? ` [came from the ad "${message.referral.headline}"]` : ""
  switch (message.type) {
    case "text":
      return { text: (message.text?.body ?? "") + fromAd }
    case "image":
      return { text: `[photo]${message.image?.caption ? ` ${message.image.caption}` : ""}${fromAd}`, imageId: message.image?.id }
    case "button":
      return { text: message.button?.text ?? "" }
    case "interactive":
      return { text: message.interactive?.button_reply?.title ?? message.interactive?.list_reply?.title ?? "" }
    case "location": {
      const l = message.location
      const place = [l?.name, l?.address].filter(Boolean).join(", ")
      return { text: `[shared a location${place ? `: ${place}` : ""} (${l?.latitude}, ${l?.longitude})]` }
    }
    case "audio":
      return { text: "[voice note]", unreadable: true }
    case "video":
      return { text: `[video]${message.video?.caption ? ` ${message.video.caption}` : ""}`, unreadable: true }
    case "document":
      return {
        text: `[document${message.document?.filename ? ` ${message.document.filename}` : ""}]${message.document?.caption ? ` ${message.document.caption}` : ""}`,
        unreadable: true,
      }
    case "contacts": {
      const c = message.contacts?.[0]
      return { text: `[contact card: ${c?.name?.formatted_name ?? ""} ${c?.phones?.[0]?.phone ?? ""}]` }
    }
    case "sticker":
      return { text: "[sticker]" }
    // A reaction is not a message to answer.
    case "reaction":
      return null
    default:
      return { text: `[${message.type} message]`, unreadable: true }
  }
}

function graphUrl(env: Env, path: string) {
  return `${env.GRAPH_ORIGIN || "https://graph.facebook.com"}/${env.GRAPH_VERSION}/${path}`
}

async function graph(env: Env, path: string, body: unknown) {
  const res = await fetch(graphUrl(env, path), {
    method: "POST",
    headers: { Authorization: `Bearer ${env.WHATSAPP_TOKEN}`, "Content-Type": "application/json" },
    body: JSON.stringify(body),
  })
  const data = (await res.json().catch(() => ({}))) as any
  if (!res.ok) throw new Error(`WhatsApp ${path} failed (${res.status}): ${JSON.stringify(data?.error ?? data)}`)
  return data
}

// Sends a text message and returns its WhatsApp message id.
export async function sendText(env: Env, to: string, body: string): Promise<string> {
  const data = await graph(env, `${env.WHATSAPP_PHONE_NUMBER_ID}/messages`, {
    messaging_product: "whatsapp",
    recipient_type: "individual",
    to,
    type: "text",
    text: { body, preview_url: true },
  })
  return data?.messages?.[0]?.id ?? ""
}

// Blue ticks on the customer's message and "typing..." for up to 25 seconds or until the reply arrives.
export async function showTyping(env: Env, messageId: string) {
  await graph(env, `${env.WHATSAPP_PHONE_NUMBER_ID}/messages`, {
    messaging_product: "whatsapp",
    status: "read",
    message_id: messageId,
    typing_indicator: { type: "text" },
  })
}

// Downloads a photo the customer sent, for Claude to look at.
export async function fetchImage(env: Env, mediaId: string): Promise<{ data: string; mediaType: string } | null> {
  const auth = { Authorization: `Bearer ${env.WHATSAPP_TOKEN}` }
  const meta = (await (await fetch(graphUrl(env, mediaId), { headers: auth })).json()) as { url?: string; mime_type?: string }
  if (!meta.url) return null
  const res = await fetch(meta.url, { headers: auth })
  if (!res.ok) return null
  const mediaType = (meta.mime_type ?? res.headers.get("content-type") ?? "").split(";")[0]
  if (!["image/jpeg", "image/png", "image/webp", "image/gif"].includes(mediaType)) return null
  const bytes = await res.arrayBuffer()
  // Claude takes images up to 5 MB.
  if (bytes.byteLength > 5 * 1024 * 1024) return null
  return { data: toBase64(new Uint8Array(bytes)), mediaType }
}

function toBase64(bytes: Uint8Array): string {
  let binary = ""
  for (let i = 0; i < bytes.length; i += 0x8000) binary += String.fromCharCode(...bytes.subarray(i, i + 0x8000))
  return btoa(binary)
}
