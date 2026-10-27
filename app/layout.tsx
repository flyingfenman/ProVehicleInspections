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
    images: ["/images/inspection-car.jpg"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Pro Vehicle Inspections | Mobile Pre-Purchase Car Inspections",
    description:
      "Mobile pre-purchase car inspections from £199.99 across London, Essex, East Anglia and the Midlands. Diagnostics, road test, video review and EV battery checks.",
    images: ["/images/inspection-car.jpg"],
  },
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={charlesWright.variable}>
      <head>
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
