import Link from "next/link"
import { Check, MessageCircle, User } from "lucide-react"
import { SITE } from "./site"

const POINTS = [
  "Independent of the seller",
  "The person who inspects the car is the person you talk to",
  "Straight answers in plain English, good news and bad",
]

// The person behind the inspection, and how to reach him directly. Portrait on the left, the words in the middle, a photo
// of a real inspection on the right (below the words on phones and tablets so nothing gets squeezed).
export function MeetHenry() {
  return (
    <section className="overflow-hidden border-t bg-white py-12 sm:py-16">
      <div className="container mx-auto grid max-w-7xl items-center gap-8 px-4 md:grid-cols-[0.8fr_1.2fr] lg:grid-cols-[minmax(0,0.6fr)_minmax(0,1.05fr)_minmax(0,1.1fr)] lg:gap-8 xl:gap-12">
        <div className="mx-auto w-full max-w-xs overflow-hidden rounded-[2.5rem] border border-border bg-white shadow-md md:max-w-sm">
          {/* eslint-disable-next-line @next/next/no-img-element -- the same photo the home page uses */}
          <img src="/henry.webp" alt={`Henry from ${SITE.brand}`} width={750} height={1000} loading="lazy" className="h-auto w-full object-contain" />
        </div>

        <div>
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-primary">Who inspects your car</p>
          <h2 className="mt-3 text-balance text-3xl font-bold sm:text-4xl lg:text-5xl">Meet Henry</h2>
          <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
            Years of buying cars with our own money shape how we inspect yours. You deal with Henry from booking to findings: no call centre, and no sales commission from the car.
          </p>
          <ul className="mt-6 space-y-3">
            {POINTS.map((point) => (
              <li key={point} className="flex items-start gap-3 text-lg font-semibold">
                <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary">
                  <Check className="h-4 w-4 text-white" strokeWidth={3} />
                </span>
                {point}
              </li>
            ))}
          </ul>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <a href={SITE.whatsapp} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-12 items-center justify-center gap-2 whitespace-nowrap rounded-xl bg-[#25D366] px-6 lg:px-4 xl:px-6 text-lg font-bold text-white transition hover:bg-[#1da851]">
              <MessageCircle className="h-5 w-5" /> Message Henry
            </a>
            <Link href="/about" className="inline-flex min-h-12 items-center justify-center gap-2 whitespace-nowrap rounded-xl bg-primary px-6 lg:px-4 xl:px-6 text-lg font-bold text-white transition hover:bg-primary/90">
              <User className="h-5 w-5" /> About me
            </Link>
          </div>
        </div>

        <div className="w-full overflow-hidden rounded-[2rem] border border-border bg-white shadow-md md:col-span-2 md:mx-auto md:max-w-xl lg:col-span-1 lg:max-w-none">
          {/* eslint-disable-next-line @next/next/no-img-element -- a plain static photo, like the portrait */}
          <img src="/images/polestar-on-ramps.webp" alt={`A Polestar 2 on ramps with a ${SITE.brand} plate on the front, ready to be inspected`} width={1000} height={1250} loading="lazy" className="h-auto w-full object-cover" />
        </div>
      </div>
    </section>
  )
}
