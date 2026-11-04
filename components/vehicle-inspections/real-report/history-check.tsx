import type { HistoryRow, RealReport } from "@/lib/sample-reports/types"
import { Removed } from "./removed"
import s from "./report.module.css"

// Shades of the brand purple for the running costs ring, as on the report.
const COST_COLOURS = ["#6711a4", "#a855f7", "#d8b4fe"]

function Row({ row }: { row: HistoryRow }) {
  return (
    <div className={s.row}>
      <div className={s.rowCopy}>
        <strong className={s.rowLabel}>{row.label}</strong>
        {row.detail && <small className={s.rowDetail}>{row.detail}</small>}
      </div>
      {row.pill && <span className={`${s.pill} ${s.pass}`}>{row.pill}</span>}
      {row.value !== undefined && <span className={s.rowValue}>{row.value ?? <Removed />}</span>}
    </div>
  )
}

function Rows({ rows }: { rows: HistoryRow[] }) {
  return (
    <div className={s.details}>
      {rows.map((row) => (
        <Row key={row.label} row={row} />
      ))}
    </div>
  )
}

export function RealReportHistoryCheck({ report }: { report: RealReport }) {
  const { history } = report
  const costTotal = history.runningCosts.items.reduce((sum, item) => sum + item.value, 0)
  let from = 0
  const ring = history.runningCosts.items
    .map((item, index) => {
      const to = from + (item.value / costTotal) * 100
      const stop = `${COST_COLOURS[index % COST_COLOURS.length]} ${from.toFixed(1)}% ${to.toFixed(1)}%`
      from = to
      return stop
    })
    .join(", ")

  return (
    <section className={`${s.section} ${s.soft}`}>
      <div className={s.inner}>
        <div className={s.head}>
          <h2 className={s.headTitle}>Vehicle History Check</h2>
          <p className={s.headText}>
            Identity, finance, theft, write off, mileage and MOT information recorded for the vehicle.
          </p>
        </div>

        <div className={s.stack}>
          <div className={s.historyBanner}>✓ Recorded history checks passed</div>

          <div className={s.card}>
            <Rows rows={history.details} />
          </div>

          <div className={s.card}>
            <Rows rows={history.checks} />
          </div>

          {history.cards.map((card) => (
            <div key={card.title} className={s.card}>
              <h3 className={s.cardTitle}>{card.title}</h3>
              <Rows rows={card.rows} />
            </div>
          ))}

          <div className={s.card}>
            <h3 className={s.cardTitle}>Estimated running costs</h3>
            <div className={s.costs}>
              <div className={s.donut} style={{ background: `conic-gradient(${ring})` }}>
                <div className={s.donutHole}>
                  <strong className={s.donutTotal}>{history.runningCosts.total}</strong>
                  <small className={s.donutText}>a year</small>
                </div>
              </div>
              <div className={`${s.details} ${s.costRows}`}>
                {history.runningCosts.items.map((item, index) => (
                  <div key={item.label} className={s.row}>
                    <div className={s.rowCopy}>
                      <strong className={s.rowLabel}>
                        <span
                          aria-hidden="true"
                          className={s.swatch}
                          style={{ background: COST_COLOURS[index % COST_COLOURS.length] }}
                        />
                        {item.label}
                      </strong>
                      <small className={s.rowDetail}>{item.detail}</small>
                    </div>
                    <span className={s.rowValue}>
                      £{item.value.toLocaleString("en-GB")} ({((item.value / costTotal) * 100).toFixed(1)}%)
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className={s.card}>
            <h3 className={s.cardTitle}>Other history results</h3>
            <Rows rows={history.otherResults} />
          </div>

          <div className={s.card}>
            <h3 className={s.cardTitle}>Vehicle specification</h3>
            <Rows rows={history.specification} />
          </div>

          <p className={s.source}>{history.source}</p>
        </div>
      </div>
    </section>
  )
}
