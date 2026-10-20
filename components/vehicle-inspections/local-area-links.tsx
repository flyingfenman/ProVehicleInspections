import Link from "next/link"
import { MapPin } from "lucide-react"
import { areaPath, cityAreas, countyAreas } from "@/lib/areas"
import { AreaMap } from "@/components/vehicle-inspections/area-map"

// Every area page on the home page, just above the FAQs: the clickable map, then the same pages as plain links, grouped.
export function LocalAreaLinks() {
  const groups = [
    ["Cities", cityAreas],
    ["Counties", countyAreas],
  ] as const

  return (
    <div id="areas" className="scroll-mt-24 rounded-2xl border border-border bg-white p-5 sm:p-6">
      <div className="flex items-center gap-2">
        <MapPin className="h-5 w-5 text-primary" />
        <h3 className="font-bold">Areas we cover</h3>
      </div>
      <p className="mt-2 text-sm text-muted-foreground">
        Tap your county or city to see where we inspect there. Same price everywhere we cover, with no mileage or call-out charge.
      </p>
      <AreaMap className="mt-5" />
      {groups.map(([label, group]) => (
        <div key={label} className="mt-4">
          <p className="text-sm font-bold uppercase tracking-wide text-primary">{label}</p>
          <div className="mt-2 flex flex-wrap gap-2">
            {group.map((area) => (
              <Link
                key={area.slug}
                href={areaPath(area)}
                className="inline-flex min-h-11 items-center rounded-full border border-primary/30 bg-white px-3 py-2 text-sm font-semibold text-primary transition hover:bg-primary/5"
              >
                {area.name}
              </Link>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
