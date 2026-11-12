// Every email this site sends comes from Henry's own address, under the business name.
// The second sender is used only when Resend refuses the first (provehicleinspections.com not verified with Resend),
// so a booking confirmation is never lost over it.
export const SENDERS = [
  "Pro Vehicle Inspections <henry@provehicleinspections.com>",
  "Pro Vehicle Inspections <noreply@eppingcarbuyer.com>",
]

type SiteEmail = {
  to: string[]
  subject: string
  text: string
  html?: string
  reply_to?: string
}

// Sends one email through Resend and returns Resend's answer, so the caller reports a failure as it always has.
export async function sendSiteEmail(email: SiteEmail): Promise<Response> {
  let response!: Response
  for (const from of SENDERS) {
    response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ from, ...email }),
    })
    // Only a refusal (4xx) is worth another sender. On a server error the email may have gone, so it isn't sent twice.
    if (response.status < 400 || response.status >= 500) return response
    console.error(`Resend refused "${email.subject}" as ${from}:`, await response.clone().text())
  }
  return response
}
