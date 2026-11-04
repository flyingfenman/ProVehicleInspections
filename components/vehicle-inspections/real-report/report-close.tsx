import Link from "next/link"
import { CalendarCheck, Info } from "lucide-react"
import type { RealReport } from "@/lib/sample-reports/types"

export function RealReportClose({ report }: { report: RealReport }) {
  return (
    <section className="py-12 sm:py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="rounded-3xl border border-primary/15 bg-primary/5 p-7 text-center sm:p-10">
            <h2 className="text-2xl font-bold sm:text-3xl">Want a report like this on the car you&apos;re buying?</h2>
            <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
              This was our {report.packageName}: 260 points, a full diagnostic scan, the history check, a road test,
              repair cost guidance and the photos, the same day. We come to the car, wherever it is being sold.
            </p>
            <Link
              href="/book?package=premium"
              className="mt-6 inline-flex min-h-12 items-center gap-2 rounded-xl bg-primary px-6 py-3 font-bold text-white transition hover:bg-primary/90"
            >
              <CalendarCheck className="h-5 w-5" aria-hidden="true" /> Book a Premium Inspection
            </Link>
            <p className="mt-4 text-sm">
              <Link href="/what-we-inspect" className="font-semibold text-primary underline underline-offset-4">
                See all 260 checklist points
              </Link>
            </p>
          </div>

          <div className="rounded-xl border border-border bg-white p-6 flex items-start gap-3">
            <Info className="w-4 h-4 text-muted-foreground flex-shrink-0 mt-0.5" />
            <div className="space-y-2">
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Report limitations</p>
              <p className="text-xs text-muted-foreground leading-relaxed">{report.limitations}</p>
              <p className="text-xs text-muted-foreground leading-relaxed">
                The customer&apos;s name, the registration and the VIN have been removed from this page, and the
                photos are edited only to hide number plates and signs.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
