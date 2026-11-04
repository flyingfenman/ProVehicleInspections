import type { RealReport, ScanCodeStatus, ScanGroup, ScanModule } from "@/lib/sample-reports/types"
import { Removed } from "./removed"
import s from "./report.module.css"

// The report shows permanent and intermittent codes in amber and history codes in grey.
function StatusPill({ status }: { status: ScanCodeStatus }) {
  return <span className={`${s.statusPill} ${status === "History" ? s.statusGrey : s.statusAmber}`}>{status}</span>
}

function plural(count: number, word: string) {
  return `${count} ${word}${count === 1 ? "" : "s"}`
}

function groupSummary(group: ScanGroup) {
  const codes = group.modules.reduce((sum, module) => sum + module.codes.length, 0)
  return codes === 0 ? `${plural(group.modules.length, "system")}, no faults` : plural(codes, "code")
}

function moduleState(module: ScanModule) {
  const statuses = new Set(module.codes.map((code) => code.status))
  if (statuses.size === 1) {
    const [status] = statuses
    return `${module.codes.length} ${status.toLowerCase()} ${module.codes.length === 1 ? "code" : "codes"}`
  }
  return plural(module.codes.length, "code")
}

function moduleClass(module: ScanModule) {
  if (module.codes.length === 0) return s.sys
  const permanent = module.codes.some((code) => code.status === "Permanent")
  return `${s.sys} ${permanent ? s.sysActive : s.sysNoted}`
}

export function RealReportDiagnosticScan({ report }: { report: RealReport }) {
  const { scan } = report
  const total = scan.counts.permanent + scan.counts.intermittent + scan.counts.history

  return (
    <section className={s.section} id="diagnostic-scan">
      <div className={s.inner}>
        <div className={s.head}>
          <h2 className={s.headTitle}>Full Diagnostic Scan</h2>
          <p className={s.headText}>
            The vehicle&apos;s electronic control systems were interrogated with a professional scan tool. This is what
            each one reported.
          </p>
        </div>

        <div className={`${s.card} ${s.scanTop}`}>
          <div className={s.scanVerdict}>
            <strong className={s.scanVerdictValue}>{plural(total, "fault code")}</strong>
            <span className={s.scanVerdictText}>
              across {scan.systemsWithCodes} of {scan.systems} systems
            </span>
            <div className={s.scanTally}>
              <span className={`${s.statusPill} ${s.statusAmber}`}>{scan.counts.permanent} permanent</span>
              <span className={`${s.statusPill} ${s.statusAmber}`}>{scan.counts.intermittent} intermittent</span>
              <span className={`${s.statusPill} ${s.statusGrey}`}>{scan.counts.history} history</span>
            </div>
          </div>
          <dl className={s.scanRecord}>
            <div>
              <dt className={s.scanRecordLabel}>Scan tool</dt>
              <dd className={s.scanRecordValue}>
                {scan.tool} <small className={s.scanRecordSmall}>{scan.software}</small>
              </dd>
            </div>
            <div>
              <dt className={s.scanRecordLabel}>Date of scan</dt>
              <dd className={s.scanRecordValue}>{scan.date}</dd>
            </div>
            <div>
              <dt className={s.scanRecordLabel}>Systems interrogated</dt>
              <dd className={s.scanRecordValue}>{scan.systems}</dd>
            </div>
            <div>
              <dt className={s.scanRecordLabel}>Odometer read by the scan</dt>
              <dd className={s.scanRecordValue}>{scan.odometer}</dd>
            </div>
            <div className={s.scanRecordWide}>
              <dt className={s.scanRecordLabel}>VIN read from the vehicle</dt>
              <dd className={s.scanRecordValue}>
                <Removed />
              </dd>
            </div>
          </dl>
        </div>

        <div className={`${s.card} ${s.scanSystems}`}>
          <h3 className={s.scanSystemsTitle}>System by system</h3>
          {scan.groups.map((group) => {
            const modules = [...group.modules].sort((a, b) => Number(b.codes.length > 0) - Number(a.codes.length > 0))
            return (
              <div key={group.name} className={s.sysGroup}>
                <div className={s.sysArea}>
                  {group.name}
                  <span className={s.sysAreaCount}>{groupSummary(group)}</span>
                </div>
                {modules.map((module) => (
                  <div key={module.name} className={moduleClass(module)}>
                    <div className={s.sysRow}>
                      <i aria-hidden="true" className={s.sysDot} />
                      <div>
                        <b className={s.sysName}>{module.name}</b>
                        {module.role && <small className={s.sysRole}>{module.role}</small>}
                      </div>
                      <span className={s.sysState}>{module.codes.length ? moduleState(module) : "No faults"}</span>
                    </div>
                    {module.codes.map((code) => (
                      <div key={`${module.name}-${code.code}`} className={s.sysCode}>
                        <code className={s.sysCodeId}>{code.code}</code>
                        <span className={s.sysDesc}>{code.description}</span>
                        <StatusPill status={code.status} />
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            )
          })}
        </div>

        <div className={s.interpretation}>
          <b className={s.interpretationTitle}>Inspector&apos;s interpretation</b>
          {scan.interpretation.map((paragraph) => (
            <p key={paragraph.slice(0, 48)} className={s.interpretationText}>
              {paragraph}
            </p>
          ))}
        </div>

        <div className={s.scanGuide}>
          <h4 className={s.scanGuideTitle}>Reading this scan</h4>
          <dl className={s.scanGuideList}>
            {scan.legend.map((entry) => (
              <div key={entry.status} className={s.scanGuideRow}>
                <dt>
                  <StatusPill status={entry.status} />
                </dt>
                <dd className={s.scanGuideText}>{entry.meaning}</dd>
              </div>
            ))}
          </dl>
          <p className={s.scanGuideText}>{scan.note}</p>
        </div>
      </div>
    </section>
  )
}
