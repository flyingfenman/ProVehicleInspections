import type { RealReport } from "@/lib/sample-reports/types"
import s from "./report.module.css"

// Green from 90, amber from 75, red below: the report's own score colours.
function scoreColours(score: number) {
  if (score >= 90) return { text: "#047857", bar: "#10b981" }
  if (score >= 75) return { text: "#a16207", bar: "#f59e0b" }
  return { text: "#b91c1c", bar: "#ef4444" }
}

export function RealReportCategoryScores({ report }: { report: RealReport }) {
  return (
    <section className={s.section}>
      <div className={s.inner}>
        <div className={s.head}>
          <h2 className={s.headTitle}>Category Scores</h2>
          <p className={s.headText}>Each score is supported by the inspector&apos;s recorded reasons.</p>
        </div>

        <div className={s.scores}>
          {report.categories.map((category) => {
            const colours = scoreColours(category.score)
            return (
              <div key={category.name} className={s.score}>
                <h3 className={s.scoreTitle}>{category.name}</h3>
                <div className={s.scoreline}>
                  <span>Score</span>
                  <strong className={s.scorelineValue} style={{ color: colours.text }}>
                    {category.score}/100
                  </strong>
                </div>
                <div className={s.meter}>
                  <i className={s.meterFill} style={{ width: `${category.score}%`, background: colours.bar }} />
                </div>
                {category.reasons.length > 0 && (
                  <ul className={s.scoreReasons}>
                    {category.reasons.map((reason) => (
                      <li key={reason} className={s.scoreReason}>
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
