import type { MetadataRoute } from "next"
import { areaPath, areas } from "@/lib/areas"
import { evModelPath, evModels } from "@/lib/ev-models"
import { guidePath, guides } from "@/lib/guides"
import { inspectionNotePath, inspectionNotes } from "@/lib/inspection-notes"

const BASE_URL = "https://www.provehicleinspections.com"

// lastModified only where a page carries a real date (the area pages record when their content was last checked).
// A date that is always "now" is ignored by Google, and wrong dates hurt trust in the sitemap.
export default function sitemap(): MetadataRoute.Sitemap {
  const pages: Array<[path: string, priority: number, lastModified?: string]> = [
    ["/", 1.0],
    ["/book", 0.9],
    ["/what-we-inspect", 0.85],
    ["/sample-report", 0.8],
    ["/inspection-notes", 0.8],
    ...inspectionNotes.map((note): [string, number, string] => [inspectionNotePath(note), 0.7, note.published]),
    ["/ev-battery-health-check", 0.9],
    ...evModels.map((model): [string, number, string] => [evModelPath(model), 0.8, model.updated]),
    ["/guides", 0.8],
    ...guides.map((guide): [string, number, string] => [guidePath(guide), 0.8, guide.updated]),
    ...areas.map((area): [string, number, string] => [areaPath(area), 0.9, area.updated]),
    ["/contact", 0.6],
  ]

  return pages.map(([path, priority, lastModified]) => ({
    url: `${BASE_URL}${path}`,
    priority,
    ...(lastModified ? { lastModified } : {}),
  }))
}
