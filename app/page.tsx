import { Metadata } from "next"
import { BookingLinkRedirect } from "@/components/vehicle-inspections/booking-link-redirect"
import { LocalAreaLinks } from "@/components/vehicle-inspections/local-area-links"
import { InspectionsHero } from "@/components/vehicle-inspections/sections/hero"
import { Pricing } from "@/components/vehicle-inspections/sections/pricing"
import { WhatWeCheck } from "@/components/vehicle-inspections/sections/what-we-check"
import { ReportStrip } from "@/components/vehicle-inspections/sections/report-strip"
import { MeetHenry } from "@/components/vehicle-inspections/sections/meet-henry"
import { InspectionsFAQ } from "@/components/vehicle-inspections/sections/faq"
import { FinalCta } from "@/components/vehicle-inspections/sections/final-cta"

export const metadata: Metadata = {
  title: "Pre-Purchase Car Inspection Service | Pro Vehicle Inspections",
  description:
    "Independent mobile pre-purchase car inspections from £199.99. We come to the car: full diagnostics, road test, history check and a same-day video report across London, Essex, East Anglia and the Midlands.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Pre-Purchase Car Inspection Service | Pro Vehicle Inspections",
    description:
      "Understand the car before you commit. Both packages include a video review, documented findings and personal buying guidance. Inspections from £199.99.",
    url: "/",
    type: "website",
    images: ["/images/inspection-car.jpg"],
  },
}

// Everything about the inspection on one page, with nothing to open: what customers say is part of the
// hero. The booking itself is on /book. On this site it is the home page.
export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      <BookingLinkRedirect />
      <InspectionsHero />
      <Pricing />
      <WhatWeCheck />
      <ReportStrip />
      <MeetHenry />
      <section className="border-t bg-white py-12 sm:py-16">
        <div className="container mx-auto max-w-6xl px-4">
          <LocalAreaLinks />
        </div>
      </section>
      <InspectionsFAQ />
      <FinalCta />
    </div>
  )
}
