import type { Guide } from "./types"
import { inspectionCost } from "./inspection-cost"
import { aaVsRac } from "./aa-vs-rac"
import { worthIt } from "./worth-it"
import { whatItChecks } from "./what-it-checks"
import { evBatteryHealthCheck } from "./ev-battery-health-check"
import { evBatteryLife } from "./ev-battery-life"
import { writeOffs } from "./write-offs"
import { hpiVsInspection } from "./hpi-vs-inspection"
import { dealerVsPrivate } from "./dealer-vs-private"
import { importedCars } from "./imported-cars"

export type { Guide, GuideBlock, GuideFaq } from "./types"

// In the order they are listed on /guides.
export const guides: Guide[] = [
  inspectionCost,
  aaVsRac,
  worthIt,
  whatItChecks,
  evBatteryHealthCheck,
  evBatteryLife,
  writeOffs,
  hpiVsInspection,
  dealerVsPrivate,
  importedCars,
]

export function getGuide(slug: string) {
  return guides.find((guide) => guide.slug === slug)
}

export function guidePath(guide: Pick<Guide, "slug">) {
  return `/guides/${guide.slug}`
}
