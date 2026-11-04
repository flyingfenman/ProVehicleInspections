import { Armchair, Car, Cog } from "lucide-react"
import type { RealReport } from "@/lib/sample-reports/types"

const icons = { Mechanical: Cog, "Body & Chassis": Car, Interior: Armchair }

function scoreColor(score: number) {
  if (score >= 90) return { bar: "bg-emerald-500", text: "text-emerald-700" }
  if (score >= 75) return { bar: "bg-amber-500", text: "text-amber-700" }
  return { bar: "bg-red-500", text: "text-red-700" }
}

export function RealReportCategoryScores({ report }: { report: RealReport }) {
  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8 sm:mb-12 lg:mb-16 space-y-3 sm:space-y-4">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold">Category Scores</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Each score is supported by the inspector&apos;s recorded reasons
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 max-w-5xl mx-auto">
          {report.categories.map((category) => {
            const { bar, text } = scoreColor(category.score)
            const Icon = icons[category.name]
            return (
              <div key={category.name} className="bg-white rounded-xl border border-border p-4 sm:p-6 shadow-md">
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="font-semibold text-foreground">{category.name}</h3>
                </div>

                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-muted-foreground">Score</span>
                  <span className={`text-lg font-bold ${text}`}>{category.score}/100</span>
                </div>
                <div className="w-full h-2.5 bg-muted rounded-full overflow-hidden">
                  <div className={`h-full rounded-full ${bar}`} style={{ width: `${category.score}%` }} />
                </div>

                {category.reasons.length > 0 && (
                  <ul className="mt-4 space-y-1.5 list-disc pl-4 marker:text-primary">
                    {category.reasons.map((reason) => (
                      <li key={reason} className="text-sm text-muted-foreground">
                        {reason}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
