import type { Metadata } from "next"
import { ReviewsSlider } from "@/components/reviews-slider"
import {
  BatteryReportClose,
  BatteryReportHealth,
  BatteryReportHero,
} from "@/components/vehicle-inspections/real-report/battery-report"
import reportStyles from "@/components/vehicle-inspections/real-report/report.module.css"
import { polestar2BatteryReport as report } from "@/lib/sample-reports/polestar-2-battery"

// The example EV battery report is a real one: Henry's State of Health test on a 2022 Polestar 2, customer details
// removed (see lib/sample-reports/polestar-2-battery.ts). It is laid out and styled like the Battery Health section of
// the customer report the lead tool sends, as the sample inspection report at /sample-report is.
const title = "Sample EV Battery Health Report: a real Polestar 2 | Pro Vehicle Inspections"
const description =
  "A real EV battery State of Health report on a 2022 Polestar 2: 91% SOH, no battery fault codes, and the voltage of all 108 cells and 54 temperature readings. Customer details removed."

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: report.path },
  openGraph: { title, description, url: report.path, type: "article", images: ["/images/inspection-car.jpg"] },
}

export default function SampleBatteryReportPage() {
  return (
    <div className="min-h-screen">
      <div className={reportStyles.report}>
        <BatteryReportHero report={report} />
        <BatteryReportHealth report={report} />
        <BatteryReportClose report={report} />
      </div>
      <ReviewsSlider />
    </div>
  )
}
