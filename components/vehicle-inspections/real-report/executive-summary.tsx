import { CircleAlert, CircleCheck, Gauge, HandCoins, History, ScanLine, ThumbsUp, Wrench } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { RealReport } from "@/lib/sample-reports/types"

export function RealReportSummary({ report }: { report: RealReport }) {
  const { summary } = report
  const tiles = [
    { icon: Gauge, label: "Overall score", value: `${summary.overallScore}/100`, tone: "good" },
    { icon: ThumbsUp, label: "Inspector's buyer verdict", value: summary.verdict, tone: "good" },
    { icon: History, label: "Vehicle history", value: summary.history, tone: "good" },
    { icon: ScanLine, label: "Diagnostic scan", value: `${summary.faultCodes} fault codes`, tone: "minor" },
  ] as const

  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8 sm:mb-12 lg:mb-16 space-y-3 sm:space-y-4">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold">Executive Summary</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            The headline buying information first, with the supporting evidence below
          </p>
        </div>

        <div className="max-w-5xl mx-auto space-y-5 sm:space-y-6 lg:space-y-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            {tiles.map((tile) => (
              <div
                key={tile.label}
                className={`rounded-2xl border p-4 sm:p-5 shadow-sm ${
                  tile.tone === "good" ? "border-emerald-200 bg-emerald-50" : "border-amber-200 bg-amber-50"
                }`}
              >
                <tile.icon className={`w-5 h-5 ${tile.tone === "good" ? "text-emerald-700" : "text-amber-700"}`} />
                <p className="mt-3 text-xs font-medium uppercase tracking-wide text-muted-foreground">{tile.label}</p>
                <p
                  className={`mt-1 text-2xl sm:text-3xl font-bold ${
                    tile.tone === "good" ? "text-emerald-700" : "text-amber-700"
                  }`}
                >
                  {tile.value}
                </p>
              </div>
            ))}
          </div>

          <ul className="flex flex-wrap justify-center gap-2 sm:gap-3">
            {summary.stats.map((stat) => (
              <li
                key={stat.label}
                className="rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-sm text-foreground"
              >
                <span className="font-bold text-primary">{stat.value}</span> {stat.label}
              </li>
            ))}
          </ul>

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

          <Card className="rounded-2xl border-2 border-primary/20 bg-primary/5 shadow-lg py-4 gap-4 sm:py-6 sm:gap-6">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="flex-shrink-0 w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Wrench className="w-5 h-5 text-primary" />
                </div>
                <CardTitle className="text-lg">Estimated Repair Cost Guidance</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                {summary.repairs.map((repair) => (
                  <div key={repair.label} className="rounded-xl border border-border bg-white p-4">
                    <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">{repair.label}</p>
                    <p className="mt-1 text-2xl font-bold text-primary">{repair.estimate}</p>
                    <p className="mt-2 text-sm font-semibold text-foreground">{repair.priority}</p>
                    <p className="mt-1 text-sm text-muted-foreground">{repair.detail}</p>
                  </div>
                ))}
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 rounded-xl bg-white border border-border px-4 py-3">
                <span className="text-sm font-semibold text-foreground">Estimated combined repair requirement</span>
                <span className="text-lg font-bold text-primary">{summary.combinedEstimate} in total</span>
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 rounded-xl bg-white border border-border px-4 py-3">
                <span className="text-sm font-semibold text-foreground">Maintenance</span>
                <span className="text-sm font-semibold text-emerald-700">{summary.maintenance}</span>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">{summary.repairNote}</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
