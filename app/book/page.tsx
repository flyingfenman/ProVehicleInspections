import type { Metadata } from "next"
import { InspectionsCta } from "@/components/vehicle-inspections/cta"

const description =
  "Choose your inspection, pick a time and pay securely online: Standard £199.99, Premium £249.99, or the EV battery health check on its own for £149.99."

export const metadata: Metadata = {
  title: "Book a Vehicle Inspection | Pro Vehicle Inspections",
  description,
  alternates: {
    canonical: "/book",
  },
  openGraph: {
    title: "Book a Vehicle Inspection",
    description,
    url: "/book",
    type: "website",
    // A small square logo, so a booking link sent on WhatsApp shows a small thumbnail rather than a big photo.
    images: [{ url: "/images/share-logo-purple.png", width: 600, height: 600, alt: "Pro Vehicle Inspections" }],
  },
  twitter: {
    card: "summary",
    images: ["/images/share-logo-purple.png"],
  },
}

export default function BookInspectionPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <InspectionsCta />
    </div>
  )
}
