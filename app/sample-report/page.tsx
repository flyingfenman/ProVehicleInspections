import type { Metadata } from "next"
import { ReviewsSlider } from "@/components/reviews-slider"
import { RealReportHero } from "@/components/vehicle-inspections/real-report/report-hero"
import { RealReportSummary } from "@/components/vehicle-inspections/real-report/inspection-summary"
import { RealReportCategoryScores } from "@/components/vehicle-inspections/real-report/category-scores"
import { RealReportDiagnosticScan } from "@/components/vehicle-inspections/real-report/diagnostic-scan"
import { RealReportHistoryCheck } from "@/components/vehicle-inspections/real-report/history-check"
import { RealReportChecklist } from "@/components/vehicle-inspections/real-report/inspection-checklist"
import { RealReportPhotos } from "@/components/vehicle-inspections/real-report/photo-report"
import { RealReportClose } from "@/components/vehicle-inspections/real-report/report-close"
import reportStyles from "@/components/vehicle-inspections/real-report/report.module.css"
import { rangeRoverSportReport as report } from "@/lib/sample-reports/range-rover-sport"

// The sample report is a real one: Henry's Premium inspection of a Range Rover Sport, customer details removed
// (see lib/sample-reports/range-rover-sport.ts). The made-up Hyundai Ioniq 5 that used to be here was taken off on
// 4 Nov 2026 at Henry's request, and /sample-report/range-rover-sport now redirects here. The page is laid out and
// styled like the customer report the lead tool sends, in the same order, at Henry's request.
const title = "Sample Inspection Report: a real Range Rover Sport | Pro Vehicle Inspections"
const description =
  "A real Premium pre-purchase inspection of a 2023 Range Rover Sport D300: 93/100, Good Buy, a full scan of 48 systems, the history check, 192 recorded checks and the photos. Customer details removed."

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: report.path },
  openGraph: { title, description, url: report.path, type: "article", images: [report.hero.src] },
}

export default function SampleReportPage() {
  return (
    <div className="min-h-screen">
      <div className={reportStyles.report}>
        <RealReportHero report={report} />
        <RealReportSummary report={report} />
        <RealReportDiagnosticScan report={report} />
        <RealReportHistoryCheck report={report} />
        <RealReportCategoryScores report={report} />
        <RealReportChecklist report={report} />
        <RealReportPhotos photos={report.photos} photoCount={report.photoCount} />
        <RealReportClose report={report} />
      </div>
      <ReviewsSlider />
    </div>
  )
}
