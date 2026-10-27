import { Check, ShieldCheck } from "lucide-react"
import { BookNowButton } from "../book-now-button"
import { Reviews } from "./reviews"

const IN_BOTH = ["We come to the car", "History check", "Full diagnostics", "Road test", "Video review", "Same-day report"]

// The title, the prices, what both inspections include and the first Book Now, with what customers say
// beside it on a laptop and straight after it on a phone or tablet. The heading keeps Henry's own line and
// leads with what people search for (pre-purchase car inspections); the small line above it says independent
// mobile car inspection service. Google rated the landing page below average on every PVI ad keyword.
export function InspectionsHero() {
  return (
    <section className="border-b bg-white">
      <div className="container mx-auto px-4 py-8 sm:py-12 lg:py-10 xl:py-14">
        <div className="mx-auto max-w-4xl lg:grid lg:max-w-none lg:grid-cols-[minmax(0,1fr)_minmax(0,0.85fr)] lg:items-center lg:gap-10 xl:gap-14">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-white px-3 py-1.5 text-xs font-bold text-primary sm:px-4 sm:py-2 sm:text-sm">
              <ShieldCheck className="h-4 w-4 shrink-0" />
              Independent mobile car inspection service
            </div>

            <h1 className="mt-4 text-4xl font-bold leading-[1.06] sm:mt-5 sm:text-5xl xl:text-6xl">
              Pre-purchase car inspections, done like <span className="text-primary">our own money is on the line.</span>
            </h1>

            <p className="mt-5 hidden max-w-2xl text-xl leading-relaxed text-muted-foreground sm:block lg:text-lg xl:text-xl">
              Years of buying cars with our own money shape how we inspect yours. We come to the car wherever it is for sale and combine a detailed physical inspection, full diagnostics, a road test, the vehicle history and clear video evidence, sent the same day, so you understand the car before you commit.
            </p>

            <p className="mt-4 text-lg font-bold text-foreground sm:mt-5">Standard £149.99 · Premium £199.99</p>
            <p className="mt-3 text-sm font-bold uppercase tracking-wide text-primary">Both inspections include</p>
            <ul className="mt-2 grid grid-cols-2 gap-x-3 gap-y-2 font-semibold sm:flex sm:flex-wrap sm:gap-x-6">
              {IN_BOTH.map((item) => (
                <li key={item} className="flex items-center gap-2">
                  <Check className="h-5 w-5 shrink-0 text-emerald-600" /> {item}
                </li>
              ))}
            </ul>
            <p className="mt-3 text-sm text-muted-foreground sm:text-base">EV battery health report: +£49.99 with either inspection, or £99.99 on its own.</p>

            <div className="mt-6">
              <BookNowButton />
            </div>
          </div>

          <Reviews />
        </div>
      </div>
    </section>
  )
}
