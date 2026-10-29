import { type NextRequest, NextResponse } from "next/server"
import Stripe from "stripe"
import { getStripe } from "@/lib/stripe"

// Stripe calls this for every completed checkout in the Pro Vehicle Inspections Stripe account (the endpoint is
// registered in that account's Developers > Webhooks, see CLOUDFLARE.md). A paid inspection booking sends the
// customer their confirmation and Henry the job details. Stripe retries when this returns an error, so a failed email
// is reported as one rather than swallowed.

const WHATSAPP_ICON = "https://cdn.simpleicons.org/whatsapp/FFFFFF"
const FONT_STACK = "'Fredoka','Trebuchet MS',Arial,Helvetica,sans-serif"

const BRAND = {
  name: "Pro Vehicle Inspections",
  tagline: "Independent mobile pre-purchase car inspections",
  // Sent from Epping Car Buyer's address under this site's name until provehicleinspections.com is added to Resend
  // (the Resend plan is at its domain limit). Change the address here when it is. Replies and Henry's copy go to the
  // site's own Zoho inbox.
  from: "Pro Vehicle Inspections <noreply@eppingcarbuyer.com>",
  replyTo: "henry@provehicleinspections.com",
  inbox: "henry@provehicleinspections.com",
  whatsappLink: "441992245660",
  whatsappDisplay: "+44 1992 245660",
  site: "www.provehicleinspections.com",
}

function escapeHtml(value: unknown) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;")
    .replace(/'/g, "&#039;")
}

function whatsappButton(label: string) {
  return `<div style="text-align:center;margin-top:26px;">
    <a href="https://wa.me/${BRAND.whatsappLink}" style="display:inline-block;background:#25D366;color:#ffffff;text-decoration:none;font-family:${FONT_STACK};font-size:14px;font-weight:700;padding:13px 20px;border-radius:12px;">
      <img src="${WHATSAPP_ICON}" width="18" height="18" border="0" alt="WhatsApp" style="display:inline-block;width:18px;height:18px;vertical-align:middle;margin-right:8px;">${escapeHtml(label)}
    </a>
  </div>`
}

function brandedEmail(title: string, contentHtml: string) {
  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <link href="https://fonts.googleapis.com/css2?family=Fredoka:wght@400;500;600;700&display=swap" rel="stylesheet">
</head>
<body style="margin:0;padding:0;background:#f5f2f7;font-family:${FONT_STACK};color:#171717;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#f5f2f7;padding:28px 12px;font-family:${FONT_STACK};">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:640px;background:#ffffff;border-radius:18px;overflow:hidden;box-shadow:0 6px 24px rgba(43,20,60,.08);font-family:${FONT_STACK};">
          <tr>
            <td style="background:#6711a4;padding:28px 34px;">
              <div style="font-family:${FONT_STACK};font-size:30px;line-height:1.1;font-weight:700;color:#ffffff;letter-spacing:-.4px;">${escapeHtml(BRAND.name)}</div>
              <div style="font-family:${FONT_STACK};font-size:12px;line-height:1.5;color:#eadcf3;margin-top:5px;">${escapeHtml(BRAND.tagline)}</div>
            </td>
          </tr>
          <tr>
            <td style="padding:34px;">
              <div style="font-family:${FONT_STACK};font-size:25px;line-height:1.25;font-weight:700;color:#24142f;margin:0 0 22px;">${escapeHtml(title)}</div>
              ${contentHtml}
            </td>
          </tr>
          <tr>
            <td style="padding:0 34px 34px;">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border-top:1px solid #e8e1ec;padding-top:24px;font-family:${FONT_STACK};">
                <tr>
                  <td>
                    <div style="font-family:${FONT_STACK};font-size:15px;color:#2b2330;line-height:1.7;">Kind regards,</div>
                    <div style="font-family:${FONT_STACK};font-size:22px;font-weight:700;color:#6711a4;margin-top:8px;">Henry</div>
                    <div style="font-family:${FONT_STACK};font-size:14px;font-weight:600;color:#2b2330;margin-top:2px;">${escapeHtml(BRAND.name)}</div>
                    <table role="presentation" cellspacing="0" cellpadding="0" style="margin-top:10px;font-family:${FONT_STACK};">
                      <tr>
                        <td style="padding-right:8px;vertical-align:middle;">
                          <a href="https://wa.me/${BRAND.whatsappLink}" style="text-decoration:none;">
                            <img src="${WHATSAPP_ICON}" width="18" height="18" border="0" alt="WhatsApp" style="display:block;width:18px;height:18px;background:#25D366;border-radius:50%;padding:3px;">
                          </a>
                        </td>
                        <td style="vertical-align:middle;">
                          <a href="https://wa.me/${BRAND.whatsappLink}" style="font-family:${FONT_STACK};font-size:13px;line-height:1.7;color:#25D366;text-decoration:none;font-weight:700;">${BRAND.whatsappDisplay}</a>
                        </td>
                      </tr>
                    </table>
                    <div style="font-family:${FONT_STACK};font-size:13px;color:#6f6575;line-height:1.7;margin-top:7px;">
                      <a href="https://${BRAND.site}" style="font-family:${FONT_STACK};color:#6711a4;text-decoration:none;font-weight:700;">${BRAND.site}</a>
                    </div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
        <div style="font-family:${FONT_STACK};font-size:11px;color:#8b8190;padding:16px 10px 0;line-height:1.5;">${escapeHtml(BRAND.name)}</div>
      </td>
    </tr>
  </table>
</body>
</html>`
}

function textToHtml(text: string) {
  return `<div style="font-family:${FONT_STACK};font-size:15px;line-height:1.75;color:#342c38;white-space:pre-line;">${escapeHtml(text)}</div>`
}

function infoTable(rows: Array<[string, string]>) {
  return `<table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border-collapse:separate;border-spacing:0;background:#f8f5fa;border:1px solid #eadff0;border-radius:14px;overflow:hidden;margin:22px 0;font-family:${FONT_STACK};">
    ${rows.map(([label, value], index) => `<tr>
      <td style="padding:13px 16px;font-family:${FONT_STACK};font-size:12px;font-weight:700;letter-spacing:.04em;text-transform:uppercase;color:#786a80;${index ? "border-top:1px solid #eadff0;" : ""}">${escapeHtml(label)}</td>
      <td style="padding:13px 16px;font-family:${FONT_STACK};font-size:14px;font-weight:600;color:#26182e;text-align:right;${index ? "border-top:1px solid #eadff0;" : ""}">${escapeHtml(value)}</td>
    </tr>`).join("")}
  </table>`
}

async function sendEmail(to: string, subject: string, text: string, html?: string): Promise<boolean> {
  const resendResponse = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: BRAND.from,
      reply_to: BRAND.replyTo,
      to: [to],
      subject,
      text,
      html: html || brandedEmail(subject, textToHtml(text)),
    }),
  })
  if (resendResponse.ok) return true
  console.error(`Resend error sending "${subject}" to ${to}:`, await resendResponse.text())
  return false
}

export async function POST(request: NextRequest) {
  const body = await request.text()
  const signature = request.headers.get("stripe-signature")

  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET || ""
  if (!signature || !webhookSecret) {
    console.error("Stripe webhook: missing signature or webhook secret")
    return NextResponse.json({ error: "Webhook not configured" }, { status: 400 })
  }

  let event: Stripe.Event
  try {
    // The asynchronous check uses the web-standard crypto available on Cloudflare as well as on Node.
    event = await getStripe().webhooks.constructEventAsync(body, signature, webhookSecret, undefined, Stripe.createSubtleCryptoProvider())
  } catch (error) {
    console.error("Stripe webhook signature verification failed:", error)
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 })
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session

    if (session.metadata?.type === "inspection_booking") {
      const {
        packageKey, packageName, includeEvSoh, slotStart, slotEnd, registration, location, sellerName, sellerPhone, advertUrl,
        customerName, customerPhone, customerEmail, notes, trafficSource, trafficDetail, landingPage,
      } = session.metadata

      const firstName = (customerName || "there").split(" ")[0]
      const hasEvSoh = includeEvSoh === "yes"
      // The EV battery health check on its own: no inspection, just the battery test and report.
      const evOnly = packageKey === "ev"
      // The mechanical inspection: an independent report on a fault after garage work, on a car the customer owns.
      const mechanical = packageKey === "mechanical"
      const bookingKind = evOnly ? "EV battery health check" : mechanical ? "Mechanical inspection" : "Vehicle inspection"
      const visitDetails = evOnly
        ? "Henry will call or message you beforehand to confirm the details. He will then meet you at the car, run the CARA Approved® Autel EV Battery Health Test and talk you through the battery's State of Health before you hand over any money to the seller. Vehicle compatibility will be confirmed from the car details."
        : mechanical
          ? "Henry will call or message you beforehand to confirm the details. He will then meet you at the car, run a full diagnostic scan with live data and photograph and video the work and the fault. Nothing is taken apart. Your written report, with a signed statement of truth, follows after the visit, and Henry is on hand to make sure you understand it and to answer any questions."
          : "Henry will call or message you beforehand to confirm the details. He will then meet you at the car, complete the full inspection and talk you through everything found before you hand over any money to the seller."
      const amountPaid = `£${((session.amount_total || 0) / 100).toFixed(2)}`
      const slotFull = new Date(slotStart).toLocaleString("en-GB", { timeZone: "Europe/London", dateStyle: "full", timeStyle: "short" })
      const slotEndTime = new Date(slotEnd).toLocaleString("en-GB", { timeZone: "Europe/London", timeStyle: "short" })
      const evSohLine = hasEvSoh ? "\nEV Battery SOH add on: YES. CARA Approved® Autel EV Battery Health Test report required" : ""

      const internalEmail = `
New PAID ${evOnly ? "EV Battery Health Check" : mechanical ? "Mechanical Inspection" : "Vehicle Inspection"} Booking (${BRAND.name})

Package: ${packageName}${evSohLine}
Slot: ${slotFull} to ${slotEndTime}

Vehicle Details:
Registration: ${registration}
Where the car is: ${location}
${mechanical
  ? `Garage that did the work: ${sellerName || "Not provided"}`
  : `Seller name: ${sellerName || "Not provided"}
Seller contact number: ${sellerPhone || "Not provided"}
Advert link: ${advertUrl || "Not provided"}`}

Customer Details:
Name: ${customerName}
Phone: ${customerPhone}
Email: ${customerEmail}

How they found us:
${trafficSource || "Direct / unknown"}${trafficDetail ? ` (${trafficDetail})` : ""}
Landing page: ${landingPage || "Unknown"}

${mechanical ? "Work done and what has gone wrong" : "Additional Notes"}:
${notes || "None provided"}

Amount paid: ${amountPaid}
Stripe session: ${session.id}
      `.trim()

      const customerEmailBody = `
Hi ${firstName},

Your ${packageName} is booked and paid for. Thank you.
${hasEvSoh ? "\nYou have also added the £49.99 EV Battery State of Health Report using the CARA Approved® Autel EV Battery Health Test. Vehicle compatibility will be confirmed from the car details.\n" : ""}
When: ${slotFull}
Vehicle: ${registration}
Where: ${location}
Amount paid: ${amountPaid}

${visitDetails}
${hasEvSoh ? "\nYour EV battery health report will be supplied with your inspection findings.\n" : ""}
Questions in the meantime? WhatsApp Henry directly on ${BRAND.whatsappDisplay}.
      `.trim()

      // Set REVIEW_URL on the Worker to the Google Business Profile review link; until then the line is left out.
      const reviewUrl = process.env.REVIEW_URL || ""
      const customerHtml = brandedEmail(
        `Your ${bookingKind.toLowerCase()} is confirmed`,
        `<div style="font-family:${FONT_STACK};font-size:16px;line-height:1.7;color:#342c38;">Hi ${escapeHtml(firstName)},</div>
         <div style="font-family:${FONT_STACK};font-size:16px;line-height:1.7;color:#342c38;margin-top:12px;">Your <strong>${escapeHtml(packageName)}</strong> is booked and paid for. Thank you.</div>
         ${hasEvSoh ? `<div style="font-family:${FONT_STACK};margin:20px 0 0;background:#eef9f5;border:1px solid #bfe8d7;border-radius:12px;padding:15px 16px;color:#145c48;font-size:14px;line-height:1.6;"><strong>EV Battery SOH included</strong><br>Your £49.99 CARA Approved® Autel EV Battery Health Test has been added to the booking. Vehicle compatibility will be confirmed from the car details.</div>` : ""}
         ${infoTable([
           [evOnly ? "Booking" : "Inspection", packageName],
           ["When", slotFull],
           ["Vehicle", registration],
           ["Location", location],
           ["Amount paid", amountPaid],
         ])}
         <div style="font-family:${FONT_STACK};font-size:15px;line-height:1.75;color:#342c38;">${escapeHtml(visitDetails)}</div>
         ${hasEvSoh ? `<div style="font-family:${FONT_STACK};font-size:15px;line-height:1.75;color:#342c38;margin-top:14px;">Your EV battery health report will be supplied with your inspection findings.</div>` : ""}
         ${reviewUrl ? `<div style="font-family:${FONT_STACK};font-size:14px;line-height:1.7;color:#6f6575;margin-top:18px;">Once you have your report, a short Google review helps other buyers find an independent inspector: <a href="${escapeHtml(reviewUrl)}" style="color:#6711a4;font-weight:700;text-decoration:none;">leave a review</a>.</div>` : ""}
         ${whatsappButton("WhatsApp Henry")}`,
      )

      const subjectSuffix = hasEvSoh ? " + EV Battery SOH" : ""
      const [internalOk, customerOk] = await Promise.all([
        sendEmail(
          BRAND.inbox,
          // Henry's inbox also gets Epping's and Stamford's bookings, so the brand goes first in the subject.
          `Pro Vehicle Inspections: ${bookingKind} request: ${registration} (${packageName}${subjectSuffix}) PAID`,
          internalEmail,
        ),
        sendEmail(
          customerEmail,
          `Booking confirmed: ${packageName}${subjectSuffix} on ${slotFull}`,
          customerEmailBody,
          customerHtml,
        ),
      ])

      if (!internalOk || !customerOk) {
        return NextResponse.json({ error: "Failed to send confirmation email" }, { status: 502 })
      }
    }
  }

  return NextResponse.json({ received: true })
}
