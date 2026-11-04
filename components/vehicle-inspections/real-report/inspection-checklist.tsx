import Image from "next/image"
import type { CheckItem, CheckResult, RealReport } from "@/lib/sample-reports/types"
import s from "./report.module.css"

const pills: Record<CheckResult, { className: string; text: string }> = {
  good: { className: s.pass, text: "✓ Satisfactory" },
  minor: { className: s.minor, text: "△ Minor" },
  issue: { className: s.issue, text: "✕ Issue" },
  na: { className: s.na, text: "N/A" },
}

function Check({ item }: { item: CheckItem }) {
  const pill = item.result ? pills[item.result] : null
  return (
    <div className={s.check}>
      <div>
        <b className={s.checkLabel}>{item.label}</b>
        {item.note && <small className={s.checkNote}>{item.note}</small>}
        {item.photos && (
          <div className={s.checkShots}>
            {item.photos.map((src) => (
              <a key={src} href={src} target="_blank" rel="noopener">
                <Image src={src} alt={item.label} width={96} height={72} className={s.checkShot} />
              </a>
            ))}
          </div>
        )}
      </div>
      {pill && (
        <span className={`${s.pill} ${s.checkPill} ${pill.className}`}>
          {item.result === "good" && item.status ? `✓ ${item.status}` : pill.text}
        </span>
      )}
    </div>
  )
}

export function RealReportChecklist({ report }: { report: RealReport }) {
  const { checklist } = report
  return (
    <section className={s.section}>
      <div className={s.inner}>
        <div className={s.head}>
          <h2 className={s.headTitle}>Detailed Physical Inspection</h2>
          <p className={s.headText}>
            {checklist.recorded} of the {checklist.total} points were inspected and recorded. Green means
            satisfactory, amber a minor point, red an issue to address.
          </p>
        </div>

        <div className={s.stack}>
          {checklist.sections.map((section) => (
            <div key={section.name} className={s.category}>
              <div className={s.catHead}>
                <h3 className={s.catTitle}>{section.name}</h3>
                {section.score !== undefined && <span className={s.catScore}>{section.score}/100</span>}
              </div>
              {section.intro && <p className={s.catIntro}>{section.intro}</p>}
              <div className={s.checklist}>
                {section.items.map((item) => (
                  <Check key={item.label} item={item} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
