// One entry per area page (/vehicle-inspection-<place> and the two original pages). The words on the page are
// Henry's, written once in components/vehicle-inspections/local-inspection-page.tsx and the same for every place:
// who he is, what he does at the car, the price. Henry (4 Nov 2026) rejected per-place copy about car supermarkets,
// dealer strips and auctions as "AI slop", so an area holds only what genuinely differs: its name, the towns and
// postcodes it covers, and its neighbours. Do not add dealer lists, routes, mileage or local facts back.

export type AreaFaq = { question: string; answer: string }

export type Area = {
  /** URL path without the leading slash, e.g. "vehicle-inspection-luton". */
  slug: string
  kind: "city" | "county"
  /** The place as written in sentences: "Luton", "Hertfordshire". */
  name: string
  /** The page heading, e.g. "Pre-Purchase Car Inspection Luton". */
  h1: string
  /** The browser title without the brand, which the page adds. */
  title: string
  schemaType: "City" | "AdministrativeArea"
  /** Towns or districts covered, shown as chips. */
  nearby: string[]
  /** e.g. "LU1 to LU7" */
  postcodes?: string
  /** Slugs of neighbouring area pages. */
  related: string[]
  /** ISO date the page content was last checked, for the sitemap and the "last checked" line. */
  updated: string
}
