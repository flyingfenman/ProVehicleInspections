import { CircleAlert, CircleCheck, HandCoins } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { RealReport } from "@/lib/sample-reports/types"
import s from "./report.module.css"

// The headline section of the report: score tiles, the buyer verdict and the evidence chips laid out as the lead
// tool's report does. Henry chose the Key Positives and Negotiation Points cards below over the report's own lists, so
// they keep the site's card style.
export function RealReportSummary({ report }: { report: RealReport }) {
  const { summary } = report

  return (
    <section className={`${s.section} ${s.soft}`}>
      <div className={s.inner}>
        <p className={s.privacyNote}>{report.intro}</p>
        <div className={s.head}>
          <h2 className={s.headTitle}>Inspection Summary</h2>
          <p className={s.headText}>The headline buying information first, with the supporting evidence below.</p>
        </div>

        <div className={s.execGrid}>
          <div className={s.execCard}>
            <span className={s.execLabel}>Diagnostic scan</span>
            <strong className={`${s.execValue} ${s.bad}`}>{summary.faultCodes} fault codes</strong>
          </div>
          <div className={s.execCard}>
            <span className={s.execLabel}>Vehicle history</span>
            <strong className={`${s.execValue} ${s.good}`}>{summary.history}</strong>
          </div>
          <div className={s.execCard}>
            <span className={s.execLabel}>Overall score</span>
            <strong className={s.execValue}>{summary.overallScore}/100</strong>
          </div>
        </div>

        <div className={s.verdict}>
          <span className={s.verdictLabel}>Inspector&apos;s buyer verdict</span>
          <strong className={s.verdictValue}>{summary.verdict}</strong>
        </div>

        <div className={s.evidenceStrip}>
          {summary.evidence.map((chip) => (
            <span key={chip} className={s.evidenceChip}>
              {chip}
            </span>
          ))}
        </div>

        <div className={s.twoCol}>
          <div className="grid lg:grid-cols-2 gap-5 sm:gap-6 lg:gap-8">
            <Card className="border shadow-md py-4 gap-4 sm:py-6 sm:gap-6">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="flex-shrink-0 w-10 h-10 bg-emerald-50 rounded-lg flex items-center justify-center">
                    <CircleCheck className="w-5 h-5 text-emerald-700" />
                  </div>
                  <CardTitle className="text-lg">Key Positives</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <ul>
                  {summary.positives.map((point) => (
                    <li key={point} className="flex items-start gap-2.5 py-2 border-b border-border/60 last:border-b-0">
                      <CircleCheck className="w-4 h-4 mt-0.5 text-emerald-600 flex-shrink-0" />
                      <span className="text-sm text-foreground">{point}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card className="border shadow-md py-4 gap-4 sm:py-6 sm:gap-6">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="flex-shrink-0 w-10 h-10 bg-amber-50 rounded-lg flex items-center justify-center">
                    <HandCoins className="w-5 h-5 text-amber-700" />
                  </div>
                  <CardTitle className="text-lg">Negotiation Points</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <ul>
                  {summary.negotiation.map((item) => (
                    <li key={item.point} className="flex items-start gap-2.5 py-2 border-b border-border/60 last:border-b-0">
                      <CircleAlert className="w-4 h-4 mt-0.5 text-amber-600 flex-shrink-0" />
                      <div>
                        <p className="text-sm text-foreground">{item.point}</p>
                        <p className="text-xs font-semibold text-primary mt-0.5">Estimated {item.estimate}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}
