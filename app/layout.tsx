import type React from "react"
import type { Metadata, Viewport } from "next"
import localFont from "next/font/local"
import "./globals.css"
import { LayoutWrapper } from "@/components/layout-wrapper"
import { LocalBusinessSchema } from "@/components/seo/local-business-schema"
import Script from "next/script"
import { SiteTracking } from "@/components/tracking/site-tracking"
import { CookieBanner } from "@/components/tracking/cookie-banner"

// Fredoka (SIL Open Font License, see public/fonts/Fredoka-OFL.txt), served from this site instead of fetched from Google
// during every build: a failed Google Fonts download used to break deploys at random. It is the same latin variable
// file Google served, declared for the same three weights as before so every heading and button renders unchanged.
const fredoka = localFont({
  src: [
    { path: "../public/fonts/fredoka-latin.woff2", weight: "400", style: "normal" },
    { path: "../public/fonts/fredoka-latin.woff2", weight: "500", style: "normal" },
    { path: "../public/fonts/fredoka-latin.woff2", weight: "700", style: "normal" },
  ],
  display: "swap",
})

// Number-plate font, cut down to the basic Latin characters a registration can contain.
// Not preloaded: only the registration boxes use it, so other pages never download it.
const charlesWright = localFont({
  src: "../public/fonts/charles-wright.woff2",
  variable: "--font-charles-wright",
  preload: false,
})

export const metadata: Metadata = {
  title: "Pro Vehicle Inspections | Mobile Pre-Purchase Car Inspections",
  description:
    "Mobile pre-purchase car inspections from £199.99 across London, Essex, East Anglia and the Midlands. Diagnostics, road test, video review and EV battery checks.",
  // Purple car, the same icon as Epping and Stamford. Google wants a square icon at a multiple of 48px.
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "48x48" },
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/icon-48.png", type: "image/png", sizes: "48x48" },
      { url: "/icon-96.png", type: "image/png", sizes: "96x96" },
      { url: "/icon-192.png", type: "image/png", sizes: "192x192" },
    ],
    apple: "/apple-touch-icon.png",
  },
  metadataBase: new URL("https://www.provehicleinspections.com"),
  openGraph: {
    type: "website",
    siteName: "Pro Vehicle Inspections",
    title: "Pro Vehicle Inspections | Mobile Pre-Purchase Car Inspections",
    description:
      "Mobile pre-purchase car inspections from £199.99 across London, Essex, East Anglia and the Midlands. Diagnostics, road test, video review and EV battery checks.",
    images: ["/images/share-inspection.jpg"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Pro Vehicle Inspections | Mobile Pre-Purchase Car Inspections",
    description:
      "Mobile pre-purchase car inspections from £199.99 across London, Essex, East Anglia and the Midlands. Diagnostics, road test, video review and EV battery checks.",
    images: ["/images/share-inspection.jpg"],
  },
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  // Lay the page out right to the edges of a phone screen, so the booking bar and the cookie card can sit flush
  // with the bottom of the screen: without this, in-app browsers and home-screen web apps leave a 34px band below
  // anything fixed or sticky at the bottom, with the page showing through it. The bottom-of-screen elements add
  // env(safe-area-inset-bottom) themselves so they stay clear of the home indicator.
  viewportFit: "cover",
}

// The usual fix for React and page translation (github.com/facebook/react/issues/11538): when the node React wants to
// remove has been moved by the translator, skip it, and insert next to the translated text (or at the end) instead of
// throwing, so nothing new goes missing from the page.
const TRANSLATE_GUARD = `(function(){if(typeof Node!=="function"||!Node.prototype)return;var r=Node.prototype.removeChild;Node.prototype.removeChild=function(c){if(c&&c.parentNode!==this){return c}return r.apply(this,arguments)};var i=Node.prototype.insertBefore;Node.prototype.insertBefore=function(n,ref){if(ref&&ref.parentNode!==this){var a=ref;while(a&&a.parentNode!==this)a=a.parentNode;return i.call(this,n,a||null)}return i.apply(this,arguments)}})();`

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={charlesWright.variable}>
      <head>
        {/* Chrome and Safari translate the page for visitors whose phone is in another language (7 Nov: a Russian
            speaking customer on Chrome for iPhone). The translator swaps React's text for its own, and the next time
            the booking page changed, such as tapping a time, React could not find its text and the whole page fell
            over with "Application error: a client-side exception has occurred". This lets React carry on instead of
            crashing. It changes nothing on the page itself and runs before React starts. */}
        <script dangerouslySetInnerHTML={{ __html: TRANSLATE_GUARD }} />
        <LocalBusinessSchema />
      </head>
      <body className={fredoka.className}>
        <SiteTracking />
        <CookieBanner />
        {/* Cloudflare Zaraz runs the analytics/ads tags and stores the visitor's cookie choice. The banner asking for it is
            the site's own (CookieBanner above). Cloudflare cannot auto-inject Zaraz into pages a Worker generates, so it is
            loaded here. It loads after hydration on purpose: as a blocking tag in <head> it changed the page before React
            hydrated, which caused hydration error #418 and a full client re-render. */}
        <Script src="/cdn-cgi/zaraz/i.js" strategy="afterInteractive" referrerPolicy="origin" />
        {/* Cloudflare Web Analytics goes here once the site is added in Cloudflare (Analytics > Web Analytics > Add a site):
            the token is per site, and Epping's would mix this site's visitors into Epping's numbers. */}
        <LayoutWrapper>{children}</LayoutWrapper>
      </body>
    </html>
  )
}
