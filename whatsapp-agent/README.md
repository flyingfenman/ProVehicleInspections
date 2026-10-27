# WhatsApp assistant for Pro Vehicle Inspections

A separate Cloudflare Worker (`pvi-whatsapp-agent`) that answers WhatsApp messages sent to 01992 245660.

## What it does

1. A customer messages the business number. Meta sends the message to `/webhook`.
2. The Worker waits at least a minute after the customer's last message (plus up to 30 random seconds). If they keep
   typing, it waits for them to finish, up to five minutes from their first unanswered message.
3. Claude writes a reply as Henry, using the prices and packages from `lib/inspection-packages.ts`, the area from
   `lib/areas/service-area.ts` and the same free times as the booking page (`/api/inspection-slots`). A booking link
   is built in code with the package, battery report, date, time and registration filled in, and only with a time
   that is really free.
4. `MODE` decides what happens next:
   - `approve` (the default): Henry gets an email with the draft and a link to a page where he presses Send, edits it
     or skips it. If he approves within the minute, it still goes out a minute after the customer's message.
   - `auto`: simple replies go out by themselves. Anything unusual (vans, existing bookings, refunds, short notice
     times, voice notes, far away cars, anything Claude is unsure of) still waits for Henry.
   - `off`: does nothing.
5. Before sending it marks the message read and shows "typing..." for a few seconds.
6. If Henry replies himself from the WhatsApp Business app, the assistant drops its draft and stays out of that chat
   for 12 hours (`HANDOVER_HOURS`). The chat page has a button to hand it back sooner.

Henry's rules are in the prompt (`src/agent.ts`) and checked again in code: em dashes are removed, and a draft that
names another company or mentions a call always waits for Henry.

Pages (all need `?k=ADMIN_KEY`, which is in the email links):
- `/inbox`: every chat, waiting drafts first
- `/chat/<number>`: the conversation, the draft, Send and Skip
- `/try`: type what a customer might say and see the draft. Nothing goes to WhatsApp, so this works before Meta is set up.

## Secrets

Worker > Settings > Variables and Secrets, type Secret:

| Secret | What |
| --- | --- |
| `ANTHROPIC_API_KEY` | Claude API key |
| `ADMIN_KEY` | a long random string, opens the drafts pages |
| `RESEND_API_KEY` | send-only Resend key, for the draft emails |
| `NOTIFY_EMAIL` | where draft emails go |
| `WHATSAPP_TOKEN` | permanent System User token with `whatsapp_business_messaging` |
| `WHATSAPP_PHONE_NUMBER_ID` | the number's id from WhatsApp Manager (not the phone number) |
| `WHATSAPP_APP_SECRET` | the Meta app's App secret (App settings > Basic), checks each webhook is really from Meta |
| `WHATSAPP_VERIFY_TOKEN` | any string, typed again into the Meta webhook settings |

Meta webhook: callback URL `https://replies.provehicleinspections.com/webhook`, subscribed to the `messages` and
`smb_message_echoes` fields. The number stays on the WhatsApp Business app on the phone at the same time
(Meta's "coexistence"), so Henry still sees and can answer every chat there.

## Costs

Meta does not charge for replies within 24 hours of the customer's message. Claude is a few pence per reply.
Durable Objects and the Worker fit in the Cloudflare plan.

## Testing locally

```
npm install
cp test/dev.vars.example .dev.vars
node test/fake-meta-and-claude.mjs &   # fake Meta, Claude and diary on port 8788
npx wrangler dev --port 8787 --local
node test/approve-mode.mjs
```

For `test/auto-mode.mjs`, add `MODE=auto` to `.dev.vars` and restart `wrangler dev` with a clean `.wrangler/state`.

## Deploying

`npx wrangler deploy` from this folder. It is not part of the website's build.
