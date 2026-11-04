import Link from "next/link"
import { CalendarCheck } from "lucide-react"
import type { RealReport } from "@/lib/sample-reports/types"
import { Removed } from "./removed"
import s from "./report.module.css"

// The report ends with its limitations box, as the customer's copy does. The booking box after it is the website's.
export function RealReportClose({ report }: { report: RealReport }) {
  return (
    <>
      <section className={s.terms}>
        <div className={s.termsCard}>
          <strong className={s.termsTitle}>* Report limitations</strong>
          <p className={s.termsText}>{report.limitations}</p>
          <div className={s.contact}>
            Prepared for <Removed label="Customer name removed for privacy" />.
          </div>
          <div className={s.contact}>
            <b>Pro Vehicle Inspections</b> • {report.inspector}
          </div>
          <p className={s.termsText}>
            The customer&apos;s name, the registration and the VIN have been removed from this page, and the photos are
            edited only to hide number plates and signs.
          </p>
        </div>
      </section>

      <section className="py-12 sm:py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto rounded-3xl border border-primary/15 bg-primary/5 p-7 text-center sm:p-10">
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
        </div>
      </section>
    </>
  )
}
