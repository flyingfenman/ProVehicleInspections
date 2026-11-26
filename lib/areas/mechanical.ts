import { areas } from "./index"
import type { Area } from "./types"

// The mechanical inspection has its own page for every area the pre-purchase inspection has one for, at
// /mechanical-inspection/<place>. The places, their towns and postcodes all come from the same Area entries, so adding
// an area adds both pages. The words are Henry's, written once in
// components/vehicle-inspections/local-mechanical-page.tsx, and are different from the pre-purchase area pages on
// purpose: the two sets must not read as copies of each other. The same rule applies here as there: no dealer or
// garage lists, routes, mileage or local facts.

/** The date the mechanical area wording was last checked, for the sitemap and the "last checked" line. */
export const MECHANICAL_AREAS_UPDATED = "2026-11-26"

/** "vehicle-inspection-cambridge" and "pre-purchase-car-inspection-essex" become "cambridge" and "essex". */
export function mechanicalPlace(area: Area) {
  return area.slug.replace(/^(vehicle-inspection|pre-purchase-car-inspection)-/, "")
}

export function mechanicalAreaPath(area: Area) {
  return `/mechanical-inspection/${mechanicalPlace(area)}`
}

export function getMechanicalArea(place: string) {
  return areas.find((area) => mechanicalPlace(area) === place)
}

/** The place as it reads after "in": "Cambridge", "the West Midlands". */
export function inPlace(area: Area) {
  return area.name === "West Midlands" ? "the West Midlands" : area.name
}

/** The page heading, e.g. "Independent Mechanical Inspection in Cambridge". */
export function mechanicalAreaH1(area: Area) {
  return `Independent Mechanical Inspection in ${inPlace(area)}`
}

/** The browser title without the brand, which the page adds. */
export function mechanicalAreaTitle(area: Area) {
  return `Independent Mechanical Inspection ${area.name}`
}

/** Meta description, under 160 characters for every area. */
export function mechanicalAreaDescription(area: Area) {
  return `Fault after garage work or a dealer sale in ${inPlace(area)}? Henry comes to the car: diagnostics, live data and a written report. £499.99, no mileage charge.`
}
