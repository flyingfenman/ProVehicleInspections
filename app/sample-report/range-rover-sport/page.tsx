import type { Metadata } from "next"
import { RealReportHero } from "@/components/vehicle-inspections/real-report/report-hero"
import { RealReportSummary } from "@/components/vehicle-inspections/real-report/executive-summary"
import { RealReportCategoryScores } from "@/components/vehicle-inspections/real-report/category-scores"
import { RealReportDiagnosticScan } from "@/components/vehicle-inspections/real-report/diagnostic-scan"
import { RealReportHistoryCheck } from "@/components/vehicle-inspections/real-report/history-check"
import { RealReportChecklist } from "@/components/vehicle-inspections/real-report/inspection-checklist"
import { RealReportPhotos } from "@/components/vehicle-inspections/real-report/photo-report"
import { RealReportClose } from "@/components/vehicle-inspections/real-report/report-close"
import { rangeRoverSportReport as report } from "@/lib/sample-reports/range-rover-sport"

const title = "Real Range Rover Sport Inspection Report | Pro Vehicle Inspections"
const description =
  "A real Premium pre-purchase inspection of a 2023 Range Rover Sport D300: 93/100, Good Buy, a full scan of 48 systems, the history check, 192 recorded checks and the photos. Customer details removed."

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: report.path },
  openGraph: { title, description, url: report.path, type: "article", images: [report.hero.src] },
}

export default function RangeRoverSportReportPage() {
  return (
    <div className="min-h-screen">
      <RealReportHero report={report} />
      <RealReportSummary report={report} />
      <RealReportCategoryScores report={report} />
      <RealReportDiagnosticScan report={report} />
      <RealReportHistoryCheck report={report} />
      <RealReportChecklist report={report} />
      <RealReportPhotos report={report} />
      <RealReportClose report={report} />
    </div>
  )
}
