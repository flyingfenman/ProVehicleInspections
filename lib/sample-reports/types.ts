// A real customer report shown on the site as a sample. Everything here comes from the finished report in the lead
// tool, with the customer's name, the registration, the VIN and anything else that identifies the customer taken out.

export type CheckResult = "good" | "minor" | "issue" | "na"

export type CheckItem = {
  label: string
  /** The inspector's own note, as recorded. */
  note?: string
  result: CheckResult
  /** The recorded wording for a satisfactory result, such as "No damage found". */
  status?: string
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
  /** Where to anchor the crop in the square-ish gallery tile. */
  position?: string
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
  hero: { src: string; alt: string; position?: string }
  summary: {
    overallScore: number
    verdict: string
    history: string
    faultCodes: number
    stats: { value: string; label: string }[]
    positives: string[]
    negotiation: { point: string; estimate: string }[]
    repairs: { label: string; priority: string; detail: string; estimate: string }[]
    combinedEstimate: string
    maintenance: string
    repairNote: string
  }
  categories: { name: "Mechanical" | "Body & Chassis" | "Interior"; score: number; reasons: string[] }[]
  scan: {
    tool: string
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
    details: { label: string; value: string | null }[]
    passed: string[]
    noted: string[]
    mileageAtInspection: string
    mot: { date: string; mileage: string; result: string; note: string }[]
    motValidUntil: string
    valuation: { label: string; value: string }
    runningCosts: { total: string; items: { label: string; detail: string; value: string }[] }
    specification: { label: string; value: string }[]
  }
  checklist: { recorded: number; total: number; sections: CheckSection[] }
  photos: ReportPhoto[]
  photoCount: number
  limitations: string
}
