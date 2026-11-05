import Anthropic from "@anthropic-ai/sdk"
import { betaZodOutputFormat } from "@anthropic-ai/sdk/helpers/beta/zod"
import { z } from "zod"
import { INSPECTION_PACKAGES } from "../../lib/inspection-packages"
import { PACKAGE_DURATIONS_MIN } from "../../lib/inspection-slots"
import { SERVICE_AREA } from "../../lib/areas/service-area"
import { describeFreeTimes, isFree, isShortNotice, londonNow, type FreeTimes } from "./slots"

const MODEL = "claude-opus-5-5"
// The battery report added to an inspection. The booking page has the same figure.
const EV_ADD_ON = 49.99

export type HistoryItem = {
  from: "customer" | "henry" | "agent"
  text: string
  at: number
  msgId?: string
  imageId?: string
}

const Answer = z.object({
  should_reply: z.boolean().describe("false when nothing needs answering, such as a thank you that ends the chat"),
  reply: z.string().describe("The WhatsApp message, exactly as the customer will see it. [BOOKING_LINK] where the link goes."),
  booking_link: z
    .object({
      package: z.enum(["standard", "premium", "ev"]),
      battery: z.boolean().describe("true adds the £49.99 EV battery report to a Standard or Premium inspection"),
      date: z.string().nullable().describe("YYYY-MM-DD, only for a free time the customer has picked"),
      time: z.string().nullable().describe("HH:MM, only for a free time the customer has picked"),
      reg: z.string().nullable().describe("the registration, if the customer gave it"),
    })
    .nullable(),
  needs_henry: z.boolean(),
  note_for_henry: z.string().describe("Why Henry should look, in one short line. Empty if nothing."),
})
export type Answer = z.infer<typeof Answer>

export type Draft = {
  shouldReply: boolean
  text: string
  needsHenry: boolean
  note: string
}

function money(amount: number) {
  return `£${amount.toFixed(2)}`
}

// Everything that does not change between messages, so it can be cached.
export function businessPrompt(siteUrl: string): string {
  const packages = INSPECTION_PACKAGES.map((p) => {
    // The website mentions a personal call. Henry never offers calls in messages.
    const features = p.features.filter((f) => !/call/i.test(f))
    const withBattery = p.key === "ev" ? "" : ` With the EV battery report added: ${money(p.amount + EV_ADD_ON)}.`
    return `- ${p.name} (link package "${p.key}"): ${p.price}, ${p.points}, about ${PACKAGE_DURATIONS_MIN[p.key]} minutes booked. ${p.strapline}. Includes: ${features.join("; ")}.${withBattery}`
  }).join("\n")

  return `You answer WhatsApp messages for Pro Vehicle Inspections, writing as Henry, who owns the business and does every inspection himself. People message 01992 245660, mostly from the website or a Google ad, usually because they are about to buy a used car and want it checked first.

How Henry writes: friendly, direct, plain British English in full sentences. Short: usually two to six lines. No sales talk, no exclamation-mark gushing, no emojis unless the customer uses them. Answer what they asked first, then move them towards booking. End every reply with:
Thanks, Henry

HENRY'S RULES, NEVER BREAK THEM
- Never offer a phone call and never say Henry will ring them. If they ask about going through the report, say: "I will always be on hand to make sure you understand the report and answer any questions that you have."
- Never name another company, website, app or brand of check (no history check brands, no motoring organisations, no listing sites). Say "full vehicle history check".
- Never use em dashes or en dashes. Use commas or full stops.
- Quote only the prices below. No discounts, no deals, no extras that are not listed.
- Appointments start on the hour. Only offer times from the FREE TIMES list, and offer two or three, not the whole list. Never say a time is free unless it is in the list.
- One price wherever the car is in the area. Never talk about miles, routes, journey times or being far away.
- Never claim to be a person if someone sincerely asks whether they are talking to a bot or AI. Say: "I use an assistant to help me reply quickly, but I read every message and I do every inspection myself." and set needs_henry.
- The first message of a chat may start with "(Ref: ...)". That is tracking for Henry, ignore it.

WHAT WE SELL
${packages}
- EV battery report as an add-on to either inspection: ${money(EV_ADD_ON)} extra (CARA Approved Autel EV Battery Health Test, State of Health result). Electric and hybrid fault checks are already in both inspections.
- On site: about 40 to 60 minutes for Standard, 70 to 90 minutes for Premium. The video review, photos and written report come the same day.
- Henry goes to the car: a dealer, a private seller's address or the customer's home. The customer does not need to be there.
- Area: ${SERVICE_AREA.long}.
- Booking and paying is online. Cancellation: free up to 48 hours before the appointment with a full refund, no refund after that, or the booking can be moved to another date or another car. To cancel or move, they message on WhatsApp.

BOOKING LINKS
To send a booking link, put [BOOKING_LINK] in the reply on its own line and fill booking_link. The link opens ${siteUrl}/book with the package, battery report, date, time and registration already filled in, and they pay there to confirm. Only fill date and time when the customer has chosen one of the free times. For an electric or plug-in hybrid car, suggest the battery report.

A GOOD FIRST REPLY
Answer their question, give the price for what suits their car, offer two or three free times, and ask for anything missing: the registration, where the car is (postcode or town) and when suits them. Once they pick a time, send the booking link.

SET needs_henry TO TRUE (still write your best reply) WHEN
- They ask about anything not covered above: vans, motorbikes, motorhomes, classic or modified cars, commercial vehicles, diagnosing a fault on their own car, repairs, selling a car, discounts.
- It is about an existing booking or report, a complaint, a refund, cancelling or moving a booking.
- The car is outside the area, or you can't tell where it is and it may be far.
- They want a short notice time (marked in the list) or any time not in the list. Say Henry will confirm.
- They sent a voice note, video or document you cannot read.
- Anything else you are not sure about. Never guess a fact.

Set should_reply to false when nothing needs an answer, for example "thanks", "ok great" or a thumbs up at the end of a chat, or when Henry has already answered everything.`
}

function contextPrompt(name: string, free: FreeTimes, now: Date): string {
  return `Now: ${londonNow(now)} (UK time).
Customer's WhatsApp name: ${name || "unknown"} (use their first name only if it looks like a real first name).

FREE TIMES (UK time, YYYY-MM-DD in brackets for the booking link):
${describeFreeTimes(free, now)}`
}

// The chat as Claude messages: the customer is "user", Henry and the agent are "assistant".
function toMessages(history: HistoryItem[], images: Map<string, { data: string; mediaType: string }>): Anthropic.Beta.BetaMessageParam[] {
  const messages: Anthropic.Beta.BetaMessageParam[] = []
  if (history[0]?.from !== "customer") {
    messages.push({ role: "user", content: "(Henry messaged this customer first.)" })
  }
  for (const item of history) {
    const role = item.from === "customer" ? "user" : "assistant"
    const content: Anthropic.Beta.BetaContentBlockParam[] = []
    const image = item.imageId ? images.get(item.imageId) : undefined
    if (image) {
      content.push({ type: "image", source: { type: "base64", media_type: image.mediaType as "image/jpeg", data: image.data } })
    }
    content.push({ type: "text", text: item.text || "(empty)" })
    messages.push({ role, content })
  }
  return messages
}

export async function writeReply(opts: {
  apiKey: string
  baseURL?: string
  siteUrl: string
  name: string
  history: HistoryItem[]
  images: Map<string, { data: string; mediaType: string }>
  free: FreeTimes
  now: Date
}): Promise<Draft> {
  const client = new Anthropic({ apiKey: opts.apiKey, ...(opts.baseURL ? { baseURL: opts.baseURL } : {}) })
  const response = await client.beta.messages.parse({
    model: MODEL,
    max_tokens: 8000,
    betas: ["server-side-fallback-2026-07-01"],
    fallbacks: "default",
    output_config: { effort: "low", format: betaZodOutputFormat(Answer) },
    system: [
      { type: "text", text: businessPrompt(opts.siteUrl), cache_control: { type: "ephemeral" } },
      { type: "text", text: contextPrompt(opts.name, opts.free, opts.now) },
    ],
    messages: toMessages(opts.history, opts.images),
  })

  if (response.stop_reason === "refusal" || !response.parsed_output) {
    return { shouldReply: true, text: "", needsHenry: true, note: "The assistant could not write a reply to this one." }
  }
  return finishReply(response.parsed_output, opts.siteUrl, opts.free, opts.now)
}

// Words that would mean a rule slipped. A reply containing one always waits for Henry.
const OTHER_COMPANIES = /\b(hpi|motorcheck|carfax|car ?vertical|experian|the aa|rac|dvla|autotrader|auto trader|ebay|gumtree|cazoo|cinch|webuyanycar|totalcarcheck|carcheck)\b/i
const CALL_OFFER = /\b(call|ring|phone)\b/i

// Builds the booking link, tidies the punctuation and double-checks Henry's rules in code.
export function finishReply(answer: Answer, siteUrl: string, free: FreeTimes, now: Date): Draft {
  const notes = answer.note_for_henry ? [answer.note_for_henry] : []
  let needsHenry = answer.needs_henry
  let text = answer.reply

  const link = answer.booking_link
  if (link) {
    const params = new URLSearchParams({ package: link.package })
    if (link.battery && link.package !== "ev") params.set("battery", "1")
    if (link.date && link.time) {
      if (isFree(free, link.package, link.date, link.time)) {
        params.set("date", link.date)
        params.set("time", link.time)
        if (isShortNotice(link.date, link.time, free, link.package, now)) {
          needsHenry = true
          notes.push("Short notice time, confirm you can do it.")
        }
      } else {
        needsHenry = true
        notes.push(`${link.date} ${link.time} is not free, so the link has no time in it.`)
      }
    }
    if (link.reg) params.set("reg", link.reg.replace(/\s+/g, "").toUpperCase())
    // Keep the time readable in the link: 10:00, not 10%3A00.
    const url = `${siteUrl}/book?${params.toString().replace(/%3A/g, ":")}`
    text = text.includes("[BOOKING_LINK]") ? text.replace("[BOOKING_LINK]", url) : `${text.trim()}\n\n${url}`
  }
  text = text.replace(/\[BOOKING_LINK\]/g, `${siteUrl}/book`)

  // Henry's rule: no em dashes, in anything.
  text = text
    .replace(/\s*—\s*/g, ", ")
    .replace(/(\d)\s*–\s*(\d)/g, "$1 to $2")
    .replace(/\s*–\s*/g, ", ")
    .trim()

  if (OTHER_COMPANIES.test(text)) {
    needsHenry = true
    notes.push("The draft names another company, please edit.")
  }
  if (CALL_OFFER.test(text)) {
    needsHenry = true
    notes.push("The draft mentions a call, please check.")
  }

  return { shouldReply: answer.should_reply && text.length > 0, text, needsHenry, note: notes.join(" ") }
}
