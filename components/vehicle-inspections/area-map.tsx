import { areaPath, getArea } from "@/lib/areas"
import { CITY_PINS, CONTEXT_PATHS, MAP_VIEWBOX, REGION_LABELS, REGION_PATHS } from "@/lib/areas/map-shapes"
import { cn } from "@/lib/utils"

// The areas we cover as a map: every county and city page is a link. Plain server-rendered SVG built from ONS
// boundaries by scripts/build-area-map.mjs, so there are no map tiles, scripts or cookies. `highlight` takes an
// area slug and marks that county or city, for use on the area pages themselves.

const PIN_LABEL: Record<"left" | "right" | "below" | "above", { dx: number; dy: string; anchor: "start" | "middle" | "end" }> = {
  left: { dx: -15, dy: "0", anchor: "end" },
  right: { dx: 15, dy: "0", anchor: "start" },
  below: { dx: 0, dy: "1.05em", anchor: "middle" },
  above: { dx: 0, dy: "-1.05em", anchor: "middle" },
}

export function AreaMap({ highlight, className }: { highlight?: string; className?: string }) {
  const regions = Object.entries(REGION_PATHS).flatMap(([slug, d]) => {
    const area = getArea(slug)
    return area ? [{ slug, d, area }] : []
  })
  const pins = Object.entries(CITY_PINS).flatMap(([slug, pin]) => {
    const area = getArea(slug)
    return area ? [{ slug, pin, area }] : []
  })

  return (
    <figure className={cn("mx-auto w-full max-w-3xl", className)}>
      <svg
        viewBox={`0 0 ${MAP_VIEWBOX.width} ${MAP_VIEWBOX.height}`}
        className="h-auto w-full select-none"
        role="group"
        aria-label="Map of the counties and cities we cover. Each one links to its page."
      >
        <g aria-hidden="true">
          {CONTEXT_PATHS.map((county) => (
            <path key={county.name} d={county.d} className="fill-slate-100 stroke-white" strokeWidth={1.5} strokeLinejoin="round" />
          ))}
        </g>

        {regions.map(({ slug, d, area }) => {
          const on = slug === highlight
          return (
            <a key={slug} href={areaPath(area)} aria-label={`Car inspections in ${area.name}`} className="group cursor-pointer outline-none">
              <title>{area.name}</title>
              <path
                d={d}
                strokeWidth={2}
                strokeLinejoin="round"
                className={cn(
                  "stroke-white transition-[fill] duration-200",
                  on ? "fill-primary" : "fill-primary/20 group-hover:fill-primary/40 group-focus-visible:fill-primary/40",
                )}
              />
            </a>
          )
        })}

        {/* Labels sit above every outline and let the pointer through, so hovering a label still lights its region. */}
        <g className="pointer-events-none" aria-hidden="true">
          {regions.map(({ slug }) => {
            const label = REGION_LABELS[slug]
            if (!label) return null
            const on = slug === highlight
            return (
              <text
                key={slug}
                x={label.x}
                y={label.y}
                textAnchor="middle"
                dominantBaseline="central"
                strokeWidth={on ? 0 : 6}
                strokeLinejoin="round"
                paintOrder="stroke"
                className={cn(
                  "text-[38px] font-bold sm:text-[25px]",
                  on ? "fill-white" : "fill-slate-900 stroke-white",
                )}
              >
                {label.text}
              </text>
            )
          })}
        </g>

        {pins.map(({ slug, pin, area }) => {
          const on = slug === highlight
          const label = PIN_LABEL[pin.side]
          return (
            <a key={slug} href={areaPath(area)} aria-label={`Car inspections in ${area.name}`} className="group cursor-pointer outline-none">
              <title>{area.name}</title>
              <circle cx={pin.x} cy={pin.y} r={26} fill="transparent" />
              <circle
                cx={pin.x}
                cy={pin.y}
                r={on ? 11 : 8}
                strokeWidth={3}
                className="origin-center fill-primary stroke-white transition-transform duration-200 [transform-box:fill-box] group-hover:scale-125 group-focus-visible:scale-125"
              />
              <text
                x={pin.x + label.dx}
                y={pin.y}
                dy={label.dy}
                textAnchor={label.anchor}
                dominantBaseline="central"
                strokeWidth={5}
                strokeLinejoin="round"
                paintOrder="stroke"
                className={cn(
                  "fill-slate-900 stroke-white text-[31px] group-hover:fill-primary group-focus-visible:fill-primary sm:text-[20px]",
                  on ? "font-bold" : "font-semibold",
                )}
              >
                {pin.text}
              </text>
            </a>
          )
        })}
      </svg>
      <figcaption className="mt-3 flex flex-wrap items-center justify-center gap-x-5 gap-y-1 text-sm text-muted-foreground">
        <span className="inline-flex items-center gap-2">
          <span className="h-3.5 w-3.5 rounded-sm border border-primary/30 bg-primary/20" aria-hidden="true" /> Areas we cover
        </span>
        <span className="inline-flex items-center gap-2">
          <span className="h-3 w-3 rounded-full bg-primary ring-2 ring-white" aria-hidden="true" /> Cities with their own page
        </span>
        <span className="basis-full text-center text-[11px] leading-snug text-muted-foreground/80">
          Contains OS data © Crown copyright and database right 2024. Source: Office for National Statistics, Open Government Licence v3.0.
        </span>
      </figcaption>
    </figure>
  )
}
