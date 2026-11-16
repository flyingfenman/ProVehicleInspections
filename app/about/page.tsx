import { Metadata } from "next"
import Link from "next/link"
import { ArrowLeft, CalendarCheck, Car, GraduationCap, Lightbulb, MessageCircle, Scale } from "lucide-react"
import { ReviewsSlider } from "@/components/reviews-slider"
import { SITE } from "@/components/vehicle-inspections/sections/site"

const title = "About Henry | Pro Vehicle Inspections"
const description =
  "Henry inspects every car himself. A Level 3 Extended Diploma in Engineering, a lifetime in the motor trade and a good knowledge of the Consumer Rights Act."

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/about" },
  openGraph: {
    title,
    description,
    url: "/about",
    images: ["/images/share-inspection.jpg"],
  },
}

// Written in Henry's own first person. Only what he has said about himself goes here: the diploma, growing up in the
// motor trade, knowing the Consumer Rights Act. The fun fact is checked against the Act itself (sections 9(4) and 19(14))
// and the limitation periods: six years in England, Wales and Northern Ireland, five in Scotland.
const ABOUT = [
  {
    icon: Car,
    heading: "Brought up in the motor trade",
    text: "I grew up in the motor trade, so I have been around cars my whole life. Years of buying cars with my own money add to that, and it shapes how I inspect yours.",
  },
  {
    icon: GraduationCap,
    heading: "Trained in engineering",
    text: "I hold a Level 3 Extended Diploma in Engineering. It gives me the formal training to go with a lifetime around cars.",
  },
  {
    icon: Scale,
    heading: "I know the Consumer Rights Act",
    text: "I know the Consumer Rights Act well, so I understand where you stand when you buy from a dealer. I am not a solicitor, but I can explain what a finding in your report could mean.",
  },
]

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-white">
      <div className="border-b border-border bg-slate-50">
        <div className="container mx-auto flex max-w-5xl flex-col gap-3 px-4 py-5 sm:flex-row sm:items-center sm:justify-between">
          <Link href="/" className="-my-3 inline-flex items-center gap-2 py-3 text-sm font-bold text-primary hover:underline">
            <ArrowLeft className="h-4 w-4" />
            Back to Vehicle Inspections
          </Link>
          <Link href="/book" className="inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-bold text-white hover:bg-primary/90">
            <CalendarCheck className="h-4 w-4" />
            Book an Inspection
          </Link>
        </div>
      </div>

      <section className="py-10 sm:py-14">
        <div className="container mx-auto grid max-w-5xl items-center gap-8 px-4 md:grid-cols-[0.8fr_1.2fr] lg:gap-14">
          <div className="mx-auto w-full max-w-xs overflow-hidden rounded-[2.5rem] border border-border bg-white shadow-md">
            {/* eslint-disable-next-line @next/next/no-img-element -- the same photo the home page uses */}
            <img src="/henry.webp" alt={`Henry from ${SITE.brand}`} width={750} height={1000} className="h-auto w-full object-contain" />
          </div>
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-primary">Who inspects your car</p>
            <h1 className="mt-3 text-balance text-4xl font-bold sm:text-5xl">A little about me</h1>
            <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
              I am Henry. I inspect every car myself, and you deal with me from booking to findings. No call centre, and no sales commission from the car.
            </p>
          </div>
        </div>
      </section>

      <section className="pb-10 sm:pb-14">
        <div className="container mx-auto max-w-5xl px-4">
          <ul className="grid gap-4 md:grid-cols-3">
            {ABOUT.map(({ icon: Icon, heading, text }) => (
              <li key={heading} className="rounded-3xl border border-primary/15 bg-primary/5 p-6">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary">
                  <Icon className="h-6 w-6 text-white" aria-hidden="true" />
                </span>
                <h2 className="mt-4 text-xl font-bold">{heading}</h2>
                <p className="mt-2 text-base leading-relaxed text-muted-foreground">{text}</p>
              </li>
            ))}
          </ul>

          <aside className="mt-6 rounded-3xl border-2 border-primary/30 bg-primary/5 p-6 sm:p-8" aria-labelledby="fun-fact">
            <div className="flex items-center gap-3">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary">
                <Lightbulb className="h-6 w-6 text-white" aria-hidden="true" />
              </span>
              <h2 id="fun-fact" className="text-2xl font-bold">Fun fact</h2>
            </div>
            <div className="mt-4 space-y-3 text-lg leading-relaxed">
              <p>
                Buy a car from a dealer and the Consumer Rights Act covers faults that were already there when you bought it. You have up to six years from the sale to bring a claim (five in Scotland).
              </p>
              <p>
                A fault the dealer pointed out before you bought, or one you should have spotted when you looked the car over, is not covered. In the first six months the dealer has to prove the fault was not there when you bought the car. After that, you have to prove it was.
              </p>
              <p className="text-base text-muted-foreground">It applies to cars bought from a dealer, not private sales. General information, not legal advice.</p>
            </div>
          </aside>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link href="/book" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-primary px-6 text-lg font-bold text-white transition hover:bg-primary/90">
              <CalendarCheck className="h-5 w-5" /> Book an inspection
            </Link>
            <a href={SITE.whatsapp} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-[#25D366] px-6 text-lg font-bold text-white transition hover:bg-[#1da851]">
              <MessageCircle className="h-5 w-5" /> Message Henry
            </a>
          </div>
        </div>
      </section>

      <ReviewsSlider className="bg-slate-50" />
    </main>
  )
}
