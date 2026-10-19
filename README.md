# Pro Vehicle Inspections

The website for www.provehicleinspections.com: independent mobile pre-purchase car inspections and EV battery health
checks. It is a Next.js site that runs on Cloudflare Workers (OpenNext adapter), copied from the vehicle inspection
pages of Epping Car Buyer and given its own name. Epping Car Buyer and Stamford Car Buyer carry on as they are.

## Pages

- `/` the inspection page (prices, what we check, reviews, Meet Henry, FAQ)
- `/book` the booking calendar and Stripe checkout; `/booked` the thank-you page Stripe returns to
- `/what-we-inspect`, `/sample-report`, `/ev-battery-health-check`
- `/vehicle-inspection-london`, `/pre-purchase-car-inspection-essex`
- `/contact`, `/privacy-policy`, `/terms-of-service`

Old Epping-style links (`/vehicle-inspections/book?package=premium` and so on) redirect to the same page here, so the
WhatsApp catalogue links only need the domain changing.

## How booking works

- Payments go to Pro Vehicle Inspections' own Stripe account, separate from the one Epping and Stamford Car Buyer
  share. The free appointment times are worked out from this account's checkout sessions (open or paid).
- Henry is one person, so a time booked on any of his sites has to disappear from all of them. Each site publishes
  the times its own bookings leave free at `/api/inspection-slots?package=all&diary=own`, and this site only offers,
  and only sells, a time that Epping Car Buyer's diary (which includes Stamford's bookings) also has free. Epping and
  Stamford check this site's diary the same way. If the other site cannot be reached, this site's own bookings decide
  and the failure is logged (`lib/other-diaries.ts`).
- Every checkout from this site is tagged `brand: Pro Vehicle Inspections` and `site: provehicleinspections` in the
  Stripe session's metadata.
- When a booking is paid, Stripe calls `/api/webhooks/stripe`, which emails Henry the job details and the customer
  their confirmation (through Resend, from noreply@eppingcarbuyer.com under the Pro Vehicle Inspections name until
  this domain is added to Resend). The webhook endpoint is registered in the Stripe account; see
  [CLOUDFLARE.md](CLOUDFLARE.md).
- The contact form emails henry@eppingcarbuyer.com through Resend.

## Deploying

Push to `main`. Cloudflare builds and deploys it. First-time setup is in [CLOUDFLARE.md](CLOUDFLARE.md).

## Local development

```
pnpm install
pnpm dev
```
