import { recentInspectionPhotos } from "@/lib/inspection-photos"

// Henry's own photos from recent inspections, shown on the main pages so the site shows real cars and the real
// set-up rather than stock pictures. The first photo is the big one: full width on a phone, two rows tall on a
// tablet, then five in a row on a laptop.
export function RecentInspections({ className = "border-t bg-white" }: { className?: string }) {
  return (
    <section className={`py-12 sm:py-16 ${className}`}>
      <div className="container mx-auto max-w-6xl px-4">
        <div className="mx-auto mb-8 max-w-2xl text-center sm:mb-10">
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-primary">Recent inspections</p>
          <h2 className="mt-3 text-balance text-3xl font-bold sm:text-4xl">Cars Henry has inspected</h2>
          <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
            Real cars, photographed on the day. Every one goes up on the ramps and gets our plate on the front.
          </p>
        </div>

        <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-5">
          {recentInspectionPhotos.map((photo, i) => (
            <li
              key={photo.src}
              className={`flex flex-col overflow-hidden rounded-2xl border border-border bg-white shadow-sm ${
                i === 0 ? "col-span-2 sm:col-span-1 sm:row-span-2 lg:row-span-1" : ""
              }`}
            >
              <div className={`relative ${i === 0 ? "aspect-[4/3] sm:aspect-auto sm:flex-1 lg:aspect-[4/5] lg:flex-none" : "aspect-[4/3] lg:aspect-[4/5]"}`}>
                {/* eslint-disable-next-line @next/next/no-img-element -- static photo, already sized and compressed */}
                <img
                  src={photo.src}
                  alt={photo.alt}
                  width={photo.width}
                  height={photo.height}
                  loading="lazy"
                  decoding="async"
                  className="absolute inset-0 h-full w-full object-cover"
                  style={{ objectPosition: photo.position ?? "center" }}
                />
              </div>
              <p className="px-3 py-2.5 text-sm font-bold text-foreground">{photo.car}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
