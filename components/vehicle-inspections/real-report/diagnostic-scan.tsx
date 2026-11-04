import { BookOpen, CircleCheck, Info, MessageSquareText, ScanLine } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { RealReport, ScanCodeStatus, ScanGroup } from "@/lib/sample-reports/types"
import { Removed } from "./removed"

const statusStyles: Record<ScanCodeStatus, string> = {
  Permanent: "bg-red-50 text-red-700 border-red-200",
  Intermittent: "bg-amber-50 text-amber-700 border-amber-200",
  History: "bg-muted text-muted-foreground border-border",
}

function StatusPill({ status, className = "" }: { status: ScanCodeStatus; className?: string }) {
  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold whitespace-nowrap flex-shrink-0 ${statusStyles[status]} ${className}`}
    >
      {status}
    </span>
  )
}

function groupSummary(group: ScanGroup) {
  const codes = group.modules.reduce((sum, module) => sum + module.codes.length, 0)
  if (codes === 0) {
    const systems = group.modules.length
    return `${systems} ${systems === 1 ? "system" : "systems"}, no faults`
  }
  return `${codes} ${codes === 1 ? "code" : "codes"}`
}

export function RealReportDiagnosticScan({ report }: { report: RealReport }) {
  const { scan } = report
  const total = scan.counts.permanent + scan.counts.intermittent + scan.counts.history
  const facts = [
    { label: "Scan tool", value: scan.tool },
    { label: "Date of scan", value: scan.date },
    { label: "Systems interrogated", value: String(scan.systems) },
    { label: "Odometer read by the scan", value: scan.odometer },
    { label: "VIN read from the vehicle", value: null },
  ]

  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8 sm:mb-12 lg:mb-16 space-y-3 sm:space-y-4">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold">Full Diagnostic Scan</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            The vehicle&apos;s electronic control systems were interrogated with a professional scan tool. This is
            what each one reported.
          </p>
        </div>

        <div className="max-w-4xl mx-auto space-y-5 sm:space-y-6 lg:space-y-8">
          <Card className="border shadow-md py-4 gap-4 sm:py-6 sm:gap-6">
            <CardContent className="space-y-5">
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-11 h-11 bg-primary/10 rounded-xl flex items-center justify-center">
                  <ScanLine className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-xl sm:text-2xl font-bold text-foreground">
                    {total} fault codes across {scan.systemsWithCodes} of {scan.systems} systems
                  </p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    <span className={`rounded-full border px-3 py-1 text-xs font-semibold ${statusStyles.Permanent}`}>
                      {scan.counts.permanent} permanent
                    </span>
                    <span className={`rounded-full border px-3 py-1 text-xs font-semibold ${statusStyles.Intermittent}`}>
                      {scan.counts.intermittent} intermittent
                    </span>
                    <span className={`rounded-full border px-3 py-1 text-xs font-semibold ${statusStyles.History}`}>
                      {scan.counts.history} history
                    </span>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4 pt-1">
                {facts.map((fact) => (
                  <div key={fact.label}>
                    <p className="text-sm text-muted-foreground">{fact.label}</p>
                    <p className="font-semibold text-foreground">{fact.value ?? <Removed />}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <h3 className="text-2xl font-bold text-center pt-2">System by system</h3>

          {scan.groups.map((group) => {
            const withCodes = group.modules.filter((module) => module.codes.length > 0)
            const clear = group.modules.filter((module) => module.codes.length === 0)
            return (
              <Card key={group.name} className="border shadow-md py-4 gap-4 sm:py-6 sm:gap-6">
                <CardHeader>
                  <div className="flex items-center justify-between gap-3">
                    <CardTitle className="text-lg">{group.name}</CardTitle>
                    <span
                      className={`text-sm font-bold whitespace-nowrap ${withCodes.length ? "text-amber-700" : "text-emerald-700"}`}
                    >
                      {groupSummary(group)}
                    </span>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {withCodes.map((module) => (
                    <div key={module.name} className="rounded-xl border border-border bg-muted/30 p-4">
                      <p className="font-semibold text-foreground">{module.name}</p>
                      {module.role && <p className="text-xs text-muted-foreground mt-0.5">{module.role}</p>}
                      <ul className="mt-3 space-y-2">
                        {module.codes.map((code) => (
                          <li
                            key={`${module.name}-${code.code}`}
                            className="flex items-start justify-between gap-3 rounded-lg bg-white border border-border/60 px-3 py-2"
                          >
                            <div className="min-w-0">
                              <p className="text-sm font-bold tracking-wide text-foreground">{code.code}</p>
                              <p className="text-xs text-muted-foreground mt-0.5">{code.description}</p>
                            </div>
                            <StatusPill status={code.status} />
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}

                  {clear.length > 0 && (
                    <ul className="grid sm:grid-cols-2 gap-x-8">
                      {clear.map((module) => (
                        <li key={module.name} className="flex items-start gap-2.5 py-2 border-b border-border/60">
                          <CircleCheck className="w-4 h-4 mt-0.5 text-emerald-600 flex-shrink-0" />
                          <div>
                            <p className="text-sm font-medium text-foreground">{module.name}</p>
                            <p className="text-xs text-muted-foreground mt-0.5">
                              {module.role ? `${module.role}. ` : ""}No faults
                            </p>
                          </div>
                        </li>
                      ))}
                    </ul>
                  )}
                </CardContent>
              </Card>
            )
          })}

          <Card className="rounded-2xl border-2 border-primary/20 bg-primary/5 shadow-lg py-4 gap-4 sm:py-6 sm:gap-6">
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                  <MessageSquareText className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="font-bold text-foreground">Inspector&apos;s Interpretation</p>
                  <p className="text-xs text-muted-foreground">
                    {report.inspector} · {report.inspected}
                  </p>
                </div>
              </div>
              {scan.interpretation.map((paragraph) => (
                <p key={paragraph.slice(0, 48)} className="text-foreground leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </CardContent>
          </Card>

          <Card className="border shadow-md py-4 gap-4 sm:py-6 sm:gap-6">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="flex-shrink-0 w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                  <BookOpen className="w-5 h-5 text-primary" />
                </div>
                <CardTitle className="text-lg">Reading this scan</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {scan.legend.map((entry) => (
                  <li key={entry.status} className="flex items-start gap-3">
                    <StatusPill status={entry.status} className="w-24 justify-center" />
                    <span className="text-sm text-muted-foreground">{entry.meaning}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <div className="flex items-start justify-center gap-2.5 text-sm text-muted-foreground text-center px-4">
            <Info className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
            <span>{scan.note}</span>
          </div>
        </div>
      </div>
    </section>
  )
}
