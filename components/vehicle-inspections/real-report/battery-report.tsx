import Image from "next/image"
import Link from "next/link"
import { BatteryCharging, OctagonAlert, TriangleAlert } from "lucide-react"
import type { BatteryCell, BatteryReading, BatteryReport } from "@/lib/sample-reports/polestar-2-battery"
import { Removed } from "./removed"
import s from "./report.module.css"
import b from "./battery-report.module.css"

// The example EV battery report: the top of the customer report and its Battery Health section, laid out as the lead
// tool prints them. The header is white like the sample inspection report's, and has no photo of the car.
export function BatteryReportHero({ report }: { report: BatteryReport }) {
  const facts = [
    { label: "Registration", value: null },
    { label: "Mileage", value: report.mileage },
    { label: "Tested by", value: report.inspector },
    { label: "Customer", value: null },
  ]

  return (
    <section className={s.hero}>
      <div className={s.inner}>
        <div className={s.heroCopy}>
          <span className={s.eyebrow}>✓ Pro Vehicle Inspections • Real customer report</span>
          <h1 className={s.heroTitle}>{report.vehicle}</h1>
          <p className={s.heroText}>
            EV battery State of Health report from the CARA Approved® Autel EV Battery Health Test.
          </p>
          <div className={s.heroBadges}>
            <span className={s.heroBadge}>Tested {report.tested}</span>
            <Link href={report.where.href} className={s.heroBadge}>
              {report.where.label}
            </Link>
            <span className={`${s.heroBadge} ${s.heroBadgeStrong}`}>{report.serviceName}</span>
          </div>
        </div>

        <div className={`${s.facts} ${b.factsSpaced}`}>
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

const LEVELS = [b.lv0, b.lv1, b.lv2, b.lv3, b.lv4]

function Readings({ readings }: { readings: BatteryReading[] }) {
  return (
    <dl className={b.readings}>
      {readings.map((reading) => (
        <div key={reading.label} className={b.reading}>
          <dt className={b.readingLabel}>{reading.label}:</dt>
          <dd className={b.readingValue}>{reading.value}</dd>
        </div>
      ))}
    </dl>
  )
}

// The key the printout puts above each table. No cell on this report carries either mark.
function Legend() {
  return (
    <div className={b.legend}>
      <span className={b.legendItem}>
        Low
        <span className={b.scale} aria-hidden="true">
          {LEVELS.map((level) => (
            <span key={level} className={`${b.swatch} ${level}`} />
          ))}
        </span>
        High
      </span>
      <span className={b.legendItem}>
        <TriangleAlert className={b.warningIcon} aria-hidden="true" /> Warning
      </span>
      <span className={b.legendItem}>
        <OctagonAlert className={b.notOkIcon} aria-hidden="true" /> Not OK
      </span>
    </div>
  )
}

type CellRow = { module: string; span: string; voltage?: string; cells: BatteryCell[] }

// One table of the printout: a module to a row, its cells or sensors across, each on the colour the report gave it.
function CellTable({ rows, caption, groupHeading }: { rows: CellRow[]; caption: string; groupHeading?: string }) {
  const withVoltage = rows[0]?.voltage !== undefined
  const columns = rows[0]?.cells.length ?? 0

  return (
    <table className={`${b.cells} ${withVoltage ? b.stackLabels : ""}`}>
      <caption className="sr-only">{caption}</caption>
      <colgroup>
        <col className={b.moduleCol} />
        {withVoltage && <col className={b.voltageCol} />}
      </colgroup>
      <thead>
        {groupHeading && (
          <tr>
            <th scope="colgroup" colSpan={withVoltage ? 2 : 1} className={b.headGrey}>
              Module
            </th>
            <th scope="colgroup" colSpan={columns} className={b.headGrey}>
              {groupHeading}
            </th>
          </tr>
        )}
        <tr>
          <th scope="col">
            <span className="sr-only">Module</span>
          </th>
          {withVoltage && (
            <th scope="col">
              <span className="sr-only">Module voltage</span>
            </th>
          )}
          {Array.from({ length: columns }, (_, index) => (
            <th key={index} scope="col">
              {index + 1}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((row) => (
          <tr key={row.module}>
            <th scope="row">
              <span className={b.moduleName}>{row.module}</span> <span className={b.moduleSpan}>({row.span})</span>
            </th>
            {withVoltage && <td className={b.lv2}>{row.voltage}</td>}
            {row.cells.map(([value, level], index) => (
              <td key={index} className={LEVELS[level]}>
                {value}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  )
}

// Battery Health as the report prints it: the State of Health figure and the tiles of pack readings, then the battery
// test's own panels. In the customer's report those panels are pictures of the printout, too small to read on a
// phone, so here the gauges stay as its pictures and the readings and tables are set as text, figure for figure and
// colour for colour. The printout itself is one tap away.
export function BatteryReportHealth({ report }: { report: BatteryReport }) {
  const { pack, voltage, temperature } = report
  const third = Math.ceil(report.temperatureRows.length / 3)
  const temperatureBlocks = [0, 1, 2].map((block) => report.temperatureRows.slice(block * third, (block + 1) * third))

  return (
    <section className={`${s.section} ${s.soft}`}>
      <div className={s.inner}>
        <p className={s.privacyNote}>{report.intro}</p>
        <div className={s.head}>
          <h2 className={s.headTitle}>Battery Health</h2>
          <p className={s.headText}>The hard numbers from the {report.batteryLabel.toLowerCase()}.</p>
        </div>

        <div className={b.healthStack}>
          <div className={b.batteryCard}>
            <div className={b.healthTitle}>
              <div>
                <div className={b.healthKicker}>{report.batteryLabel} health</div>
                <div className={b.soh}>
                  {report.soh}
                  <span className={b.sohUnit}>% SOH</span>
                </div>
              </div>
              <div className={b.healthStatus}>✓ {report.status}</div>
            </div>
            <div className={b.metricGrid}>
              {report.metrics.map((metric) => (
                <div key={metric.label} className={`${b.metric} ${metric.good ? b.metricGood : ""}`}>
                  <span className={b.metricLabel}>{metric.label}</span>
                  <span className={b.metricValue}>{metric.value}</span>
                  {metric.detail && <span className={b.metricDetail}>{metric.detail}</span>}
                </div>
              ))}
            </div>
          </div>

          <div className={b.panels}>
            <div className={b.panel}>
              <h3 className={b.panelBar}>Pack Information</h3>
              <div className={b.panelBody}>
                <div className={b.gauges}>
                  {pack.gauges.map((gauge, index) => (
                    <div key={gauge.src} className={b.gauge}>
                      <Image
                        src={gauge.src}
                        alt={gauge.alt}
                        width={gauge.width}
                        height={gauge.height}
                        sizes="250px"
                        className={b.gaugeImage}
                        priority={index === 0}
                      />
                      <Readings readings={gauge.readings} />
                    </div>
                  ))}
                </div>

                <div className={b.energy}>
                  <div className={b.energyRow}>
                    <span>Energy</span>
                    <span className={b.energyFigures}>
                      <span className={b.energyNow}>{pack.energy.now}</span> | {pack.energy.whenNew}
                    </span>
                  </div>
                  <div className={b.energyBar} aria-hidden="true">
                    <div className={b.energyFill} style={{ width: `${report.soh}%` }} />
                    <span className={`${b.energyMark} ${b.energyMarkTop}`} style={{ left: `${report.soh}%` }} />
                    <span className={`${b.energyMark} ${b.energyMarkBottom}`} style={{ left: `${report.soh}%` }} />
                  </div>
                  <div className={b.energyRow}>
                    <span>New vehicle&apos;s range on a full charge (WLTP)</span>
                    <span className={b.energyFigures}>
                      <span className={b.energyNow}>{pack.range.now}</span> | {pack.range.whenNew}
                    </span>
                  </div>
                </div>

                <p className={b.footnote}>{pack.footnote}</p>
              </div>
            </div>

            <div className={b.panel}>
              <h3 className={b.panelBar}>Module Voltage Information</h3>
              <div className={b.panelBody}>
                {voltage.readings.map((group) => (
                  <Readings key={group[0].label} readings={group} />
                ))}
                <Legend />
                <CellTable
                  rows={report.voltageRows}
                  groupHeading="Cell"
                  caption={`Module and cell voltages, all ${voltage.cellCount} cells`}
                />
              </div>
              <p className={b.panelCaption}>
                Battery report, module and cell voltages, all {voltage.cellCount} cells
              </p>
            </div>

            <div className={b.panel}>
              <h3 className={b.panelBar}>Module Temperature Information</h3>
              <div className={b.panelBody}>
                {temperature.readings.map((group) => (
                  <Readings key={group[0].label} readings={group} />
                ))}
                <Legend />
                <div className={b.cellBlocks}>
                  {temperatureBlocks.map((rows) => (
                    <CellTable
                      key={rows[0].module}
                      rows={rows}
                      caption={`Module temperatures, modules ${rows[0].module} to ${rows[rows.length - 1].module}`}
                    />
                  ))}
                </div>
              </div>
              <p className={b.panelCaption}>
                Battery report, module temperatures, all {temperature.sensorCount} sensors
              </p>
            </div>
          </div>

          <p className={b.shotsHint}>
            The gauges are the battery test&apos;s own pictures, and every reading and colour is as it printed them.{" "}
            <a href={report.original.src} target="_blank" rel="noopener">
              See the original printout
            </a>
            .
          </p>
        </div>
      </div>
    </section>
  )
}

// The report's limitations box, then the website's own booking box.
export function BatteryReportClose({ report }: { report: BatteryReport }) {
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
            The customer&apos;s name, the registration and the VIN have been removed from this page. The readings are as
            the test recorded them.
          </p>
        </div>
      </section>

      <section className="py-12 sm:py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto rounded-3xl border border-primary/15 bg-primary/5 p-7 text-center sm:p-10">
            <h2 className="text-2xl font-bold sm:text-3xl">Want a battery report like this on the EV you&apos;re buying?</h2>
            <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
              We come to the car, wherever it is being sold, and run the CARA Approved® Autel EV Battery Health Test.
              £149.99 on its own, or £49.99 added to a Standard or Premium inspection of the whole car.
            </p>
            <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link
                href="/book?package=ev"
                className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3 font-bold text-white transition hover:bg-primary/90 sm:w-auto"
              >
                <BatteryCharging className="h-5 w-5" aria-hidden="true" /> Book the battery check: £149.99
              </Link>
              <Link
                href="/book"
                className="inline-flex min-h-12 w-full items-center justify-center rounded-xl border border-primary/30 bg-white px-6 py-3 font-bold text-primary transition hover:bg-primary/5 sm:w-auto"
              >
                Book a vehicle inspection
              </Link>
            </div>
            <p className="mt-4 text-sm">
              <Link href="/ev-battery-health-check" className="font-semibold text-primary underline underline-offset-4">
                About the EV battery health check
              </Link>
            </p>
          </div>
        </div>
      </section>
    </>
  )
}
