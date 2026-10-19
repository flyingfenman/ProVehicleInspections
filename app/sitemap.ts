import type { MetadataRoute } from "next"
import { areaPath, areas } from "@/lib/areas"

const BASE_URL = "https://www.provehicleinspections.com"

// lastModified only where a page carries a real date (the area pages record when their content was last checked).
// A date that is always "now" is ignored by Google, and wrong dates hurt trust in the sitemap.
export default function sitemap(): MetadataRoute.Sitemap {
  const pages: Array<[path: string, priority: number, lastModified?: string]> = [
    ["/", 1.0],
    ["/book", 0.9],
    ["/what-we-inspect", 0.85],
    ["/sample-report", 0.8],
    ["/ev-battery-health-check", 0.9],
    ...areas.map((area): [string, number, string] => [areaPath(area), 0.9, area.updated]),
    ["/contact", 0.6],
  ]

  return pages.map(([path, priority, lastModified]) => ({
    url: `${BASE_URL}${path}`,
    priority,
    ...(lastModified ? { lastModified } : {}),
  }))
}
