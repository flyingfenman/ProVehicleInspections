import { type NextRequest, NextResponse } from "next/server"
import { parseContactDetail } from "@/lib/contact"
import { sendEmail } from "@/lib/email-sender"

// The Epping site relays an enquiry to Henry's inbox when this site can't send (the same relay the Stamford site uses).
const RELAY_URL = "https://www.eppingcarbuyer.com/api/stamford-enquiry"

async function relayThroughEpping(subject: string, text: string, replyTo?: string): Promise<boolean> {
  try {
    const response = await fetch(RELAY_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ subject, text, replyTo }),
    })
    if (response.ok) return true
    console.error("Contact form: the Epping site couldn't send it either:", response.status, await response.text())
  } catch (error) {
    console.error("Contact form: could not reach the Epping site:", error)
  }
  return false
}

function clean(value: unknown, maxLength: number): string {
  return typeof value === "string" ? value.trim().slice(0, maxLength) : ""
}

export async function POST(request: NextRequest) {
  let body: Record<string, unknown>
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 })
  }

  // Hidden from people; bots fill it in. Pretend success so they don't retry.
  if (clean(body.website, 200)) return NextResponse.json({ success: true })

  const name = clean(body.name, 100)
  const contact = parseContactDetail(clean(body.contact, 200))
  const message = clean(body.message, 2000)
  const source = (body.trafficSource || {}) as { label?: unknown; detail?: unknown; landingPage?: unknown }
  const sourceLabel = clean(source.label, 60)
  const sourceDetail = clean(source.detail, 120)
  const landingPage = clean(source.landingPage, 120)

  if (!name) {
    return NextResponse.json({ error: "Please enter your name." }, { status: 400 })
  }
  if (!contact) {
    return NextResponse.json({ error: "Please enter a phone number or email so we can reply to you." }, { status: 400 })
  }

  const replyLine =
    contact.kind === "phone"
      ? `Phone: ${contact.phone}\nWhatsApp them: https://wa.me/${contact.whatsappNumber}`
      : `Email: ${contact.email} (just hit reply)`

  const text = `
New message from the Pro Vehicle Inspections contact form

Name: ${name}
${replyLine}

Message:
${message || "(No message, they'd like you to get in touch)"}

How they found us: ${sourceLabel || "Direct / unknown"}${sourceDetail ? ` (${sourceDetail})` : ""}
Landing page: ${landingPage || "Unknown"}
Sent: ${new Date().toLocaleString("en-GB", { timeZone: "Europe/London" })}
  `.trim()

  const subject = `Pro Vehicle Inspections: website message from ${name}`
  const resendResponse = await sendEmail({
    to: ["henry@eppingcarbuyer.com"],
    ...(contact.kind === "email" ? { reply_to: contact.email } : {}),
    subject,
    text,
  })

  if (!resendResponse.ok) {
    console.error("Resend error sending contact form message:", await resendResponse.text())
    // This site's key refused, so the Epping site sends it to the same inbox rather than the message being lost.
    if (await relayThroughEpping(subject, text, contact.kind === "email" ? contact.email : undefined)) {
      return NextResponse.json({ success: true })
    }
    return NextResponse.json({ error: "Your message didn't send." }, { status: 502 })
  }

  return NextResponse.json({ success: true })
}
