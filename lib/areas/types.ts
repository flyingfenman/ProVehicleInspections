// One entry per area page (/vehicle-inspection-<place> and the two original pages). Each page is written for its
// place: the dealers and auctions we actually drive to, the route from our base, what we look out for on cars sold
// there and the questions buyers from there ask. Pages that only swap the town name get filtered out by Google and
// ignored by AI assistants, so there is no template text in these entries beyond the shared layout.

export type AreaFaq = { question: string; answer: string }

// A real place buyers get cars from in the area: a car supermarket, a dealer strip (named by road), an auction site.
export type AreaPlace = { name: string; note: string }

// Something about cars sold in that area that gets extra attention during the inspection, and why.
export type AreaWatch = { title: string; detail: string }

export type Area = {
  /** URL path without the leading slash, e.g. "vehicle-inspection-luton". */
  slug: string
  kind: "city" | "county"
  /** The place as written in sentences: "Luton", "Hertfordshire". */
  name: string
  /** The page heading, e.g. "Pre-Purchase Car Inspection Luton & Dunstable". */
  h1: string
  /** The browser title without the brand, which the page adds. */
  title: string
  /** Meta description, 150 characters or fewer. */
  description: string
  schemaType: "City" | "AdministrativeArea"
  /** The sentence under the heading. */
  intro: string
  /** How we get there from Waltham Abbey: a short chip ("M25 and M1, about an hour") and a fuller paragraph. */
  travel: { summary: string; detail: string }
  /** Two or three paragraphs about buying a used car in this area and how the inspection fits. */
  local: string[]
  places: AreaPlace[]
  watchFor: AreaWatch[]
  /** Towns or districts covered, shown as chips. */
  nearby: string[]
  /** e.g. "LU1 to LU7" */
  postcodes?: string
  faqs: AreaFaq[]
  /** Slugs of neighbouring area pages. */
  related: string[]
  /** ISO date the page content was last checked, for the sitemap and the "last checked" line. */
  updated: string
  /** Show the customer reviews on this page (only where a reviewed car was inspected in the area). */
  showTestimonials?: boolean
}
