import { currentChoices, onConsentReady } from "@/lib/cookie-consent"

// The OpenAI (ChatGPT) Ads pixel, so ChatGPT adverts can count bookings. It is not in Cloudflare Zaraz, so the site loads
// it itself, and only for visitors who agreed to advertising cookies in the site's banner. Switching advertising off
// reloads the page (lib/cookie-consent.ts saveChoices), so it never keeps running after a "no".
// Event names and fields follow OpenAI's SDK: amounts are whole pence, with the currency alongside.

const PIXEL_ID = "1aFAm2CX4tAR8YvmGwF9DA"
const SDK_URL = "https://bzrcdn.openai.com/sdk/oaiq.min.js"

type Oaiq = ((...args: unknown[]) => void) & { q?: unknown[][] }
type OaiqWindow = Window & { oaiq?: Oaiq }

const allowed = () => currentChoices().advertising

// OpenAI's own loader snippet: a queue that the SDK picks up once it has downloaded.
function load() {
  const w = window as OaiqWindow
  if (w.oaiq) return w.oaiq
  const queue: Oaiq = (...args: unknown[]) => {
    queue.q!.push(args)
  }
  queue.q = []
  w.oaiq = queue
  const script = document.createElement("script")
  script.async = true
  script.src = SDK_URL
  document.head.appendChild(script)
  queue("init", { pixelId: PIXEL_ID })
  return queue
}

function send(eventName: string, eventProps: Record<string, unknown>, eventOptions?: Record<string, unknown>) {
  try {
    load()("measure", eventName, eventProps, eventOptions)
  } catch {
    // Never let tracking break the page.
  }
}

let lastPath: string | undefined

// Called on every page change; sends nothing until the visitor has agreed to advertising cookies.
export function openAIPageView(path: string) {
  if (typeof window === "undefined" || !allowed() || path === lastPath) return
  lastPath = path
  send("page_viewed", { type: "contents" })
}

export function openAIOrder({ transactionId, value, currency }: { transactionId: string; value: number; currency: string }) {
  if (typeof window === "undefined") return
  // The booking confirmation can render before Zaraz knows the visitor's choice, so wait for it.
  onConsentReady(() => {
    if (!allowed()) return
    send(
      "order_created",
      { type: "contents", amount: Math.round(value * 100), currency: currency.toUpperCase() },
      { event_id: transactionId },
    )
  })
}
