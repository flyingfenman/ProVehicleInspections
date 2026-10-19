# Running Pro Vehicle Inspections on Cloudflare

The site runs on a Cloudflare Worker called **provehicleinspections** (the name in `wrangler.jsonc`; it must match the
Worker's name in the dashboard). It needs no database or storage bucket.

## One-time setup

1. **Put the domain on Cloudflare.** Cloudflare dashboard > Add a domain > `provehicleinspections.com`, then change the
   nameservers at the registrar you bought it from to the two Cloudflare gives you.
2. **Connect GitHub.** Workers & Pages > Create application > Import a repository, pick this repository.
   - Worker name: `provehicleinspections`
   - Production branch: `main`
   - Build command: `pnpm run cf:build` (Cloudflare pre-fills `pnpm run build`; **change it**)
   - Deploy command: `pnpm run cf:deploy` (Cloudflare pre-fills `npx wrangler deploy`; **change it**)
3. **Turn off preview builds** (Settings > Build > Branch control > untick *Enable Preview Builds*).
4. **Runtime secrets** (the Worker's Settings > Variables and secrets, type **Secret**). Copy the values from the
   eppingcarbuyer Worker:
   - `STRIPE_SECRET_KEY`: the same key Epping uses, so bookings share one diary
   - `RESEND_API_KEY`: for the contact form
5. **Domain.** Deploying adds `www.provehicleinspections.com` to the Worker (it is in `wrangler.jsonc`). Then add a
   redirect for the bare domain: the domain's Rules > Redirect Rules > Create rule > "Redirect from root to WWW"
   template, status 301. In DNS, the bare domain needs a proxied (orange cloud) record for the rule to catch it, for
   example `A @ 192.0.2.1` proxied.

## Tracking (when the ads move here)

- **Zaraz** (the domain's Zaraz settings): add Google Analytics 4, Google Ads and the Meta pixel the same way they are
  set up on eppingcarbuyer.com, with the "purchase" and "contact" events. The site already sends both, and its cookie
  banner already asks for consent. Until Zaraz is set up on this domain no tags load.
- **Web Analytics**: Analytics > Web Analytics > Add a site, then put its token in `app/layout.tsx` where the comment
  says.

## If a build fails

- **"Could not find compiled Open Next config"**: the Build command is still `pnpm run build`. It must be
  `pnpm run cf:build` (and the Deploy command `pnpm run cf:deploy`).
- To start a build by hand: Deployments > View build history > open the top build > Retry build.
