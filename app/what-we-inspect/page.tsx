import { Metadata } from "next"
import Link from "next/link"
import { ArrowLeft, CalendarCheck } from "lucide-react"
import { InspectionsWhatWeInspect } from "@/components/vehicle-inspections/what-we-inspect"

export const metadata: Metadata = {
  title: "What We Inspect: 260-Point Checklist | Pro Vehicle Inspections",
  description:
    "The full 260-point Premium pre-purchase inspection checklist: diagnostics, paint depth, underbody, road test, repair-cost guidance and provenance checks.",
  alternates: {
    canonical: "/what-we-inspect",
  },
}

export default function WhatWeInspectPage() {
  return (
    <main className="min-h-screen bg-white">
      <div className="border-b border-border bg-slate-50">
        <div className="container mx-auto flex max-w-5xl flex-col gap-3 px-4 py-5 sm:flex-row sm:items-center sm:justify-between">
          <Link
            href="/"
            className="-my-3 inline-flex items-center gap-2 py-3 text-sm font-bold text-primary hover:underline"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Vehicle Inspections
          </Link>
          <Link
            href="/book"
            className="inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-bold text-white hover:bg-primary/90"
          >
            <CalendarCheck className="h-4 w-4" />
            Book an Inspection
          </Link>
        </div>
      </div>
      <InspectionsWhatWeInspect headingLevel="h1" />
    </main>
  )
}
