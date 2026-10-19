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

- Payments go to the same Stripe account as Epping and Stamford Car Buyer. The free appointment times are worked out
  from the Stripe checkout sessions, so all three sites share one diary and a time booked on one disappears from the
  others.
- Every checkout from this site is tagged `brand: Pro Vehicle Inspections` and `site: provehicleinspections` in the
  Stripe session's metadata.
- Stripe sends paid bookings to Epping Car Buyer's webhook, which emails Henry and the customer. It reads the `brand`
  tag to send a Pro Vehicle Inspections email. This site has no webhook of its own on purpose: two webhooks would send
  every customer two emails.
- The contact form emails henry@eppingcarbuyer.com through Resend.

## Deploying

Push to `main`. Cloudflare builds and deploys it. First-time setup is in [CLOUDFLARE.md](CLOUDFLARE.md).

## Local development

```
pnpm install
pnpm dev
```
