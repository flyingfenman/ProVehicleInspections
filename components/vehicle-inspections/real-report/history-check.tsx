import type { ReactNode } from "react"
import { Car, CircleCheck, Gauge, Info, PoundSterling, ReceiptText, Settings2, ShieldCheck } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { RealReport } from "@/lib/sample-reports/types"
import { Removed } from "./removed"

function SectionCard({ icon: Icon, title, children }: { icon: typeof Car; title: string; children: ReactNode }) {
  return (
    <Card className="border shadow-md py-4 gap-4 sm:py-6 sm:gap-6">
      <CardHeader>
        <div className="flex items-center gap-3">
          <div className="flex-shrink-0 w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
            <Icon className="w-5 h-5 text-primary" />
          </div>
          <CardTitle className="text-lg">{title}</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="space-y-5">{children}</CardContent>
    </Card>
  )
}

export function RealReportHistoryCheck({ report }: { report: RealReport }) {
  const { history } = report

  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8 sm:mb-12 lg:mb-16 space-y-3 sm:space-y-4">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold">Vehicle History Check</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Identity, finance, theft, write-off, mileage and MOT information recorded for the vehicle
          </p>
        </div>

        <div className="max-w-4xl mx-auto space-y-5 sm:space-y-6 lg:space-y-8">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 bg-emerald-600 text-white rounded-2xl shadow-lg py-4 px-5 sm:py-6 sm:px-6 text-center sm:text-left">
            <ShieldCheck className="w-10 h-10 flex-shrink-0" />
            <div>
              <p className="text-2xl font-extrabold tracking-wide uppercase">Recorded history checks passed</p>
              <p className="text-emerald-50 text-sm mt-1">No finance, write-off, stolen or mileage record found</p>
            </div>
          </div>

          <SectionCard icon={Car} title="Registered Vehicle Details">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-5">
              {history.details.map((item) => (
                <div key={item.label}>
                  <p className="text-sm text-muted-foreground">{item.label}</p>
                  <p className="font-semibold text-foreground">{item.value ?? <Removed />}</p>
                </div>
              ))}
            </div>
          </SectionCard>

          <SectionCard icon={ShieldCheck} title="History Checks">
            <ul className="grid sm:grid-cols-2 gap-x-8">
              {history.passed.map((item) => (
                <li key={item} className="flex items-center gap-2.5 py-2 border-b border-border/60">
                  <CircleCheck className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span className="text-sm text-foreground">{item}</span>
                </li>
              ))}
            </ul>
            <ul className="space-y-2">
              {history.noted.map((item) => (
                <li key={item} className="flex items-start gap-2.5 rounded-lg bg-primary/5 px-3 py-2.5">
                  <Info className="w-4 h-4 mt-0.5 text-primary flex-shrink-0" />
                  <span className="text-sm text-foreground">{item}</span>
                </li>
              ))}
            </ul>
          </SectionCard>

          <SectionCard icon={Gauge} title="Mileage & MOT History">
            <div className="flex items-center justify-between gap-3 rounded-lg bg-primary/5 px-4 py-3">
              <span className="text-sm font-medium text-foreground">Mileage at inspection, read by the scan tool</span>
              <span className="text-sm font-bold text-primary whitespace-nowrap">{history.mileageAtInspection}</span>
            </div>
            <div>
              {history.mot.map((entry, index) => (
                <div
                  key={entry.date}
                  className={`flex items-start justify-between gap-4 py-3 ${
                    index < history.mot.length - 1 ? "border-b border-border/60" : ""
                  }`}
                >
                  <div>
                    <p className="font-semibold text-foreground">
                      {entry.mileage} <span className="font-normal text-muted-foreground">&middot; {entry.date}</span>
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">{entry.note}</p>
                  </div>
                  <span className="inline-flex items-center gap-1 rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-0.5 text-xs font-semibold text-emerald-700 flex-shrink-0">
                    <CircleCheck className="w-3.5 h-3.5" />
                    {entry.result}
                  </span>
                </div>
              ))}
            </div>
            <div className="flex items-center justify-between gap-3 pt-1">
              <span className="text-sm font-medium text-foreground">MOT valid until</span>
              <span className="text-sm font-bold text-foreground">{history.motValidUntil}</span>
            </div>
          </SectionCard>

          <div className="grid md:grid-cols-2 gap-5 sm:gap-6 lg:gap-8">
            <SectionCard icon={PoundSterling} title="Valuation">
              <div>
                <p className="text-sm text-muted-foreground">{history.valuation.label}</p>
                <p className="text-4xl font-bold text-primary mt-1">{history.valuation.value}</p>
              </div>
            </SectionCard>

            <SectionCard icon={ReceiptText} title="Estimated Running Costs">
              <p className="text-2xl font-bold text-primary">{history.runningCosts.total}</p>
              <ul>
                {history.runningCosts.items.map((item) => (
                  <li
                    key={item.label}
                    className="flex items-start justify-between gap-3 py-2 border-b border-border/60 last:border-b-0"
                  >
                    <div>
                      <p className="text-sm font-medium text-foreground">{item.label}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">{item.detail}</p>
                    </div>
                    <span className="text-sm font-bold text-foreground">{item.value}</span>
                  </li>
                ))}
              </ul>
            </SectionCard>
          </div>

          <SectionCard icon={Settings2} title="Vehicle Specification">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-8 gap-y-5">
              {history.specification.map((item) => (
                <div key={item.label}>
                  <p className="text-sm text-muted-foreground">{item.label}</p>
                  <p className="font-semibold text-foreground">{item.value}</p>
                </div>
              ))}
            </div>
          </SectionCard>
        </div>
      </div>
    </section>
  )
}
