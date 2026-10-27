import { chatStub, inboxStub, type Env } from "./env"
import { writeReply } from "./agent"
import { chatPage, inboxPage, messagePage, tryPage } from "./pages"
import { loadFreeTimes } from "./slots"
import { parseWebhook, timingSafeEqual, verifySignature } from "./whatsapp"

export { Chat } from "./chat"
export { Inbox } from "./inbox"

const WA_ID = /^\d{6,15}$/

export default {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    const url = new URL(request.url)
    const path = url.pathname

    if (path === "/webhook" && request.method === "GET") return verifyWebhook(url, env)
    if (path === "/webhook" && request.method === "POST") return receiveWebhook(request, env, ctx)

    if (path === "/" || path === "/robots.txt") {
      return new Response("User-agent: *\nDisallow: /\n", { headers: { "content-type": "text/plain" } })
    }

    // Everything below is Henry's drafts page, behind the key in his email links.
    const form = request.method === "POST" ? await request.formData() : null
    const key = String(form?.get("k") ?? url.searchParams.get("k") ?? "")
    if (!env.ADMIN_KEY || !timingSafeEqual(key, env.ADMIN_KEY)) return new Response("Not found", { status: 404 })

    if (path === "/inbox" && request.method === "GET") {
      return inboxPage(await inboxStub(env).list(), key, env.MODE)
    }

    if (path === "/try") {
      const text = String(form?.get("text") ?? "").trim()
      if (!text) return tryPage(key)
      const now = Date.now()
      const free = await loadFreeTimes(env.SITE_URL)
      const draft = await writeReply({
        apiKey: env.ANTHROPIC_API_KEY,
        baseURL: env.ANTHROPIC_BASE_URL,
        siteUrl: env.SITE_URL,
        name: "",
        history: [{ from: "customer", text, at: now }],
        images: new Map(),
        free,
        now: new Date(now),
      })
      return tryPage(key, text, draft)
    }

    const match = path.match(/^\/chat\/([^/]+)(?:\/(send|skip|resume))?$/)
    if (!match || !WA_ID.test(match[1])) return new Response("Not found", { status: 404 })
    const [, waId, action] = match
    const chat = chatStub(env, waId)
    const chatUrl = `/chat/${waId}?k=${encodeURIComponent(key)}`

    if (!action && request.method === "GET") {
      const state = await chat.getState()
      if (!state) return messagePage("No chat with this number yet.", `/inbox?k=${encodeURIComponent(key)}`)
      return chatPage(state, key, Date.now(), url.searchParams.get("msg") ?? "")
    }
    if (request.method !== "POST" || !form) return new Response("Not found", { status: 404 })

    let message = ""
    if (action === "send") {
      const result = await chat.approve(String(form.get("draft") || "") || null, String(form.get("text") ?? ""))
      message = result.message
    } else if (action === "skip") {
      await chat.skip()
      message = "Skipped. Nothing was sent."
    } else if (action === "resume") {
      await chat.resume()
      message = "The assistant will answer this customer's next message."
    }
    return Response.redirect(new URL(`${chatUrl}&msg=${encodeURIComponent(message)}`, url).toString(), 303)
  },
} satisfies ExportedHandler<Env>

// Meta checks the webhook address once, when it is saved in the app settings.
function verifyWebhook(url: URL, env: Env) {
  const token = url.searchParams.get("hub.verify_token") ?? ""
  if (url.searchParams.get("hub.mode") === "subscribe" && env.WHATSAPP_VERIFY_TOKEN && timingSafeEqual(token, env.WHATSAPP_VERIFY_TOKEN)) {
    return new Response(url.searchParams.get("hub.challenge") ?? "", { status: 200 })
  }
  return new Response("Forbidden", { status: 403 })
}

async function receiveWebhook(request: Request, env: Env, ctx: ExecutionContext) {
  const raw = await request.text()
  if (!(await verifySignature(raw, request.headers.get("x-hub-signature-256"), env.WHATSAPP_APP_SECRET))) {
    return new Response("Bad signature", { status: 401 })
  }
  let body: unknown
  try {
    body = JSON.parse(raw)
  } catch {
    return new Response("Bad JSON", { status: 400 })
  }
  const events = parseWebhook(body, env.WHATSAPP_PHONE_NUMBER_ID)
  // Meta wants a quick 200. Each chat handles its message after that, one at a time.
  ctx.waitUntil(
    Promise.all(events.map((event) => chatStub(env, event.waId).receive(event).catch((error) => console.error("Chat failed", error)))),
  )
  return new Response("OK")
}
