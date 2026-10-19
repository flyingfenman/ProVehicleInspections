import Link from "next/link"
import { CookieSettingsButton } from "@/components/cookie-settings-button"
import { areaPath, areas } from "@/lib/areas"
import { SERVICE_AREA } from "@/lib/areas/service-area"

// The bottom padding grows while the cookie banner is open (it sets --cookie-banner-space), so the footer can still be
// scrolled clear of it.
export function Footer() {
  return (
    <footer className="border-t bg-muted/50 px-4 pt-8 pb-[calc(6rem+var(--cookie-banner-space,0px))] sm:pb-[calc(2rem+var(--cookie-banner-space,0px))]">
      <div className="container mx-auto">
        <div className="flex flex-col items-center text-center space-y-4">
          <nav className="flex flex-wrap justify-center gap-x-6">
            <Link href="/" className="inline-flex min-h-11 items-center text-sm hover:underline">
              Vehicle Inspections
            </Link>
            <Link href="/what-we-inspect" className="inline-flex min-h-11 items-center text-sm hover:underline">
              What We Inspect
            </Link>
            <Link href="/sample-report" className="inline-flex min-h-11 items-center text-sm hover:underline">
              Sample Report
            </Link>
            <Link href="/ev-battery-health-check" className="inline-flex min-h-11 items-center text-sm hover:underline">
              EV &amp; Hybrid Battery Health Check
            </Link>
            <Link href="/contact" className="inline-flex min-h-11 items-center text-sm hover:underline">
              Contact Us
            </Link>
            <Link href="/privacy-policy" className="inline-flex min-h-11 items-center text-sm hover:underline">
              Privacy Policy
            </Link>
            <Link href="/terms-of-service" className="inline-flex min-h-11 items-center text-sm hover:underline">
              Terms of Service
            </Link>
            <CookieSettingsButton className="inline-flex min-h-11 items-center text-sm hover:underline" />
          </nav>
          <p className="text-sm text-muted-foreground">
            Independent mobile pre-purchase vehicle inspections across {SERVICE_AREA.short}.
          </p>
          <nav aria-label="Areas we cover" className="max-w-4xl">
            <p className="text-sm font-bold">Areas we cover</p>
            <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
              {areas.map((area, index) => (
                <span key={area.slug}>
                  {index > 0 && " · "}
                  <Link href={areaPath(area)} className="inline-block py-1 hover:underline">
                    {area.name}
                  </Link>
                </span>
              ))}
            </p>
          </nav>
          <p className="text-sm text-muted-foreground">© 2026 Pro Vehicle Inspections. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
