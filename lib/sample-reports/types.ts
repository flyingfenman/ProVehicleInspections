// A real customer report shown on the site as a sample. Everything here comes from the finished report in the lead
// tool, with the customer's name, the registration, the VIN and anything else that identifies the customer taken out.

export type CheckResult = "good" | "minor" | "issue" | "na"

export type CheckItem = {
  label: string
  /** The inspector's own note, as recorded. */
  note?: string
  /** Left out where the report shows no result pill, as on the repair cost summary. */
  result?: CheckResult
  /** The recorded wording for the pill, such as "No damage found". Defaults to "Satisfactory", "Minor" and so on. */
  status?: string
  /** Photos from this report shown under the point, as the report shows them. */
  photos?: string[]
}

export type CheckSection = {
  name: string
  score?: number
  intro?: string
  items: CheckItem[]
}

export type ScanCodeStatus = "Permanent" | "Intermittent" | "History"

export type ScanModule = {
  name: string
  role?: string
  codes: { code: string; description: string; status: ScanCodeStatus }[]
}

export type ScanGroup = {
  name: string
  modules: ScanModule[]
}

export type ReportPhoto = {
  src: string
  caption: string
  /** Where to anchor the crop in the gallery tile. */
  position?: string
}

/** A row of the history check: a label, an optional line of detail and an optional pill or value on the right. */
export type HistoryRow = {
  label: string
  detail?: string
  /** A value shown on the right. null means it was taken out for privacy. */
  value?: string | null
  /** A green pill on the right, such as "Pass". */
  pill?: string
}

export type RealReport = {
  path: string
  vehicle: string
  intro: string
  inspected: string
  packageName: string
  mileage: string
  inspector: string
  where: { label: string; href: string }
  hero: { src: string; alt: string; width: number; height: number }
  summary: {
    overallScore: number
    verdict: string
    history: string
    faultCodes: number
    evidence: string[]
    positives: string[]
    negotiation: { point: string; estimate: string }[]
  }
  categories: { name: "Mechanical" | "Body & Chassis" | "Interior"; score: number; reasons: string[] }[]
  scan: {
    tool: string
    software: string
    date: string
    systems: number
    odometer: string
    systemsWithCodes: number
    counts: { permanent: number; intermittent: number; history: number }
    groups: ScanGroup[]
    interpretation: string[]
    legend: { status: ScanCodeStatus; meaning: string }[]
    note: string
  }
  history: {
    details: HistoryRow[]
    checks: HistoryRow[]
    cards: { title: string; rows: HistoryRow[] }[]
    runningCosts: { total: string; items: { label: string; detail: string; value: number }[] }
    otherResults: HistoryRow[]
    specification: HistoryRow[]
    source: string
  }
  checklist: { recorded: number; total: number; sections: CheckSection[] }
  photos: ReportPhoto[]
  photoCount: number
  limitations: string
}
