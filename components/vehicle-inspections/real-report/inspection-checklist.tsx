import type { LucideIcon } from "lucide-react"
import { CircleAlert, CircleCheck, CircleX, MinusCircle } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { CheckItem, CheckResult, RealReport } from "@/lib/sample-reports/types"

const resultStyle: Record<CheckResult, { icon: LucideIcon; text: string; word: string }> = {
  good: { icon: CircleCheck, text: "text-emerald-700", word: "Satisfactory" },
  minor: { icon: CircleAlert, text: "text-amber-700", word: "Minor" },
  issue: { icon: CircleX, text: "text-red-700", word: "Issue" },
  na: { icon: MinusCircle, text: "text-muted-foreground", word: "N/A" },
}

function CheckRow({ item }: { item: CheckItem }) {
  const style = resultStyle[item.result]
  const Icon = style.icon
  return (
    <li className="flex items-start gap-2.5 py-2.5 border-b border-border/60">
      <Icon className={`w-4 h-4 mt-0.5 flex-shrink-0 ${style.text}`} aria-hidden="true" />
      <div className="min-w-0">
        <p className="text-sm font-medium text-foreground">{item.label}</p>
        {item.note && <p className="text-xs text-muted-foreground mt-0.5 break-words">{item.note}</p>}
        <p className={`text-xs font-semibold mt-0.5 ${style.text}`}>
          {item.result === "good" ? (item.status ?? style.word) : style.word}
        </p>
      </div>
    </li>
  )
}

export function RealReportChecklist({ report }: { report: RealReport }) {
  const { checklist } = report
  const legend: CheckResult[] = ["good", "minor", "issue", "na"]

  return (
    <section id="checklist" className="py-12 sm:py-16 lg:py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8 sm:mb-12 space-y-3 sm:space-y-4">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold">Detailed Physical Inspection</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {checklist.recorded} of the {checklist.total} points were inspected and recorded. Green means
            satisfactory, amber a minor point, red an issue to address.
          </p>
        </div>

        <ul className="flex flex-wrap justify-center gap-x-6 gap-y-2 mb-8 sm:mb-12">
          {legend.map((result) => {
            const style = resultStyle[result]
            return (
              <li key={result} className={`inline-flex items-center gap-1.5 text-sm font-semibold ${style.text}`}>
                <style.icon className="w-4 h-4" aria-hidden="true" />
                {style.word}
              </li>
            )
          })}
        </ul>

        <div className="space-y-5 sm:space-y-6 lg:space-y-8 max-w-5xl mx-auto">
          {checklist.sections.map((section) => (
            <Card key={section.name} className="border shadow-md py-4 gap-4 sm:py-6 sm:gap-6">
              <CardHeader>
                <div className="flex items-center justify-between gap-3">
                  <CardTitle className="text-lg">{section.name}</CardTitle>
                  {section.score !== undefined && (
                    <span className="text-sm font-bold text-primary whitespace-nowrap">{section.score}/100</span>
                  )}
                </div>
                {section.intro && <p className="text-sm text-muted-foreground">{section.intro}</p>}
              </CardHeader>
              <CardContent>
                <ul className="grid lg:grid-cols-2 gap-x-8">
                  {section.items.map((item) => (
                    <CheckRow key={item.label} item={item} />
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
