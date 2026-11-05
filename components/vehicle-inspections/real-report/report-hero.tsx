import Image from "next/image"
import Link from "next/link"
import type { RealReport } from "@/lib/sample-reports/types"
import { Removed } from "./removed"
import s from "./report.module.css"

// The top of the customer report, as the lead tool lays it out: the car in a framed photo and the key facts bar sitting
// across the bottom edge. The band is white here, not the lead tool's purple, at Henry's request.
export function RealReportHero({ report }: { report: RealReport }) {
  const facts = [
    { label: "Registration", value: null },
    { label: "Mileage", value: report.mileage },
    { label: "Inspector", value: report.inspector },
    { label: "Customer", value: null },
  ]

  return (
    <section className={s.hero}>
      <div className={s.inner}>
        <div className={s.heroCopy}>
          <span className={s.eyebrow}>✓ Pro Vehicle Inspections • Real customer report</span>
          <h1 className={s.heroTitle}>{report.vehicle}</h1>
          <p className={s.heroText}>Independent vehicle inspection, diagnostic assessment and recorded vehicle checks.</p>
          <div className={s.heroBadges}>
            <span className={s.heroBadge}>Inspected {report.inspected}</span>
            <Link href={report.where.href} className={s.heroBadge}>
              {report.where.label}
            </Link>
            <span className={`${s.heroBadge} ${s.heroBadgeStrong}`}>{report.packageName}</span>
          </div>
        </div>

        <div className={s.heroCar}>
          <Image
            src={report.hero.src}
            alt={report.hero.alt}
            width={report.hero.width}
            height={report.hero.height}
            sizes="(min-width: 600px) 532px, calc(100vw - 68px)"
            className={s.heroCarImage}
            priority
          />
        </div>

        <div className={s.facts}>
          {facts.map((fact) => (
            <div key={fact.label} className={s.fact}>
              <span className={s.factLabel}>{fact.label}</span>
              <span className={s.factValue}>{fact.value ?? <Removed />}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
