import Link from "next/link"
import { MechanicalReportOverview } from "@/components/vehicle-inspections/mechanical-report-overview"
import { WhatsIncluded } from "@/components/vehicle-inspections/whats-included"
import { areaPath, areas, type Area } from "@/lib/areas"
import {
  ArrowRight,
  BatteryCharging,
  Car,
  Check,
  ChevronDown,
  CircleAlert,
  FileText,
  MapPin,
  Route,
  ShieldCheck,
} from "lucide-react"

const BRAND = "Pro Vehicle Inspections"
const SITE_URL = "https://www.provehicleinspections.com"

// Questions every area page answers the same way, after the ones written for the place.
const SHARED_FAQS = [
  {
    question: "Do I need to be there?",
    answer:
      "No. We can inspect the car directly with the seller or dealer and send you the video review, photos and report afterwards, then talk it through with you on the phone.",
  },
  {
    question: "Will you tell me whether to buy the car?",
    answer:
      "We give you the findings, point out what matters and what it is likely to cost, and talk it through so you can make your own decision. We have no commission from the sale, so the advice is straight.",
  },
]

function formatUpdated(iso: string) {
  return new Date(iso).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })
}

export function LocalInspectionPage({ area, localProof }: { area: Area; localProof?: React.ReactNode }) {
  const url = `${SITE_URL}${areaPath(area)}`
  const faqs = [...area.faqs, ...SHARED_FAQS]
  const related = area.related.map((slug) => areas.find((other) => other.slug === slug)).filter((other): other is Area => Boolean(other))

  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: area.h1,
      serviceType: "Pre-purchase vehicle inspection",
      provider: { "@id": `${SITE_URL}/#business` },
      areaServed: { "@type": area.schemaType, name: area.name },
      url,
      offers: [
        { "@type": "Offer", name: "Standard Inspection", price: "149.99", priceCurrency: "GBP" },
        { "@type": "Offer", name: "Premium Inspection", price: "199.99", priceCurrency: "GBP" },
        { "@type": "Offer", name: "EV Battery Health Check", price: "99.99", priceCurrency: "GBP" },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faqs.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: { "@type": "Answer", text: faq.answer },
      })),
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
        { "@type": "ListItem", position: 2, name: area.h1, item: url },
      ],
    },
  ]

  return (
    <main className="bg-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />

      <section className="border-b border-border bg-gradient-to-b from-primary/5 to-white py-10 sm:py-14 lg:py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl text-center">
            <Link href="/" className="-my-3.5 inline-block py-3.5 text-sm font-semibold text-primary hover:underline">
              Vehicle inspections
            </Link>
            <h1 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">{area.h1}</h1>
            <p className="mx-auto mt-5 max-w-3xl text-lg leading-relaxed text-muted-foreground sm:text-xl">{area.intro}</p>

            <div className="mt-6 flex flex-wrap justify-center gap-2 text-sm font-semibold">
              <span className="rounded-full border bg-white px-4 py-2">Standard £149.99</span>
              <span className="rounded-full border bg-white px-4 py-2">Premium £199.99</span>
              <span className="rounded-full border border-primary/20 bg-primary/5 px-4 py-2 text-primary">EV battery check £99.99</span>
            </div>
            <p className="mx-auto mt-4 inline-flex max-w-2xl items-center gap-2 text-sm font-semibold text-muted-foreground">
              <Route className="h-4 w-4 shrink-0 text-primary" /> {area.travel.summary}
            </p>

            <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
              <Link
                href="/book"
                className="inline-flex h-13 items-center justify-center rounded-xl bg-primary px-7 py-3.5 text-base font-bold text-primary-foreground transition hover:bg-primary/90"
              >
                Book an Inspection <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
              <Link
                href="/sample-report"
                className="inline-flex h-13 items-center justify-center rounded-xl border border-border bg-white px-7 py-3.5 text-base font-bold transition hover:bg-muted/30"
              >
                <FileText className="mr-2 h-4 w-4" /> View Sample Report
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-10 sm:py-14">
        <div className="container mx-auto px-4">
          <div className="mx-auto grid max-w-5xl gap-8 lg:grid-cols-[1.15fr_.85fr] lg:items-start">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1.5 text-sm font-bold text-primary">
                <MapPin className="h-4 w-4" /> Mobile inspection service
              </div>
              <h2 className="mt-4 text-3xl font-bold">Pre-purchase car inspections in {area.name}</h2>
              {area.local.map((paragraph) => (
                <p key={paragraph.slice(0, 40)} className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg">
                  {paragraph}
                </p>
              ))}
              <p className="mt-4 text-base leading-relaxed text-muted-foreground">{area.travel.detail}</p>

              <div className="mt-6 flex flex-wrap gap-2">
                {area.nearby.map((place) => (
                  <span key={place} className="rounded-full border border-border bg-slate-50 px-3 py-1.5 text-sm font-medium">
                    {place}
                  </span>
                ))}
              </div>
              {area.postcodes && <p className="mt-3 text-sm text-muted-foreground">Postcodes {area.postcodes}.</p>}
            </div>

            <div className="rounded-3xl border border-border bg-slate-50 p-5 sm:p-6">
              <h3 className="text-xl font-bold">Every inspection includes</h3>
              <div className="mt-4 space-y-3 text-sm">
                {[
                  "Full-system diagnostic scan",
                  "Road test",
                  "History check: finance, write-off, stolen and mileage",
                  "Body, chassis, tyres and interior checks",
                  "Powertrain-specific checks for petrol, diesel, hybrid or EV",
                  "Easy-to-understand video review in both packages",
                  "Photo evidence and same-day digital report",
                  "Personal call and buying guidance",
                  "No call-out or mileage charge: the price is the price",
                ].map((item) => (
                  <div key={item} className="flex items-start gap-2.5">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-10 sm:py-14">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-5xl">
            <h2 className="text-3xl font-bold">Where we inspect in {area.name}</h2>
            <p className="mt-2 text-muted-foreground">
              Any dealer forecourt, car supermarket, auction collection or private seller&apos;s driveway. These are the places buyers in {area.name} send us to most.
            </p>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {area.places.map((place) => (
                <div key={place.name} className="flex gap-3 rounded-2xl border border-border bg-white p-4 sm:p-5">
                  <Car className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                  <div>
                    <h3 className="font-bold">{place.name}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{place.note}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-10 sm:py-14">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-5xl">
            <h2 className="text-3xl font-bold">What we pay extra attention to around {area.name}</h2>
            <p className="mt-2 text-muted-foreground">
              Every car gets the full checklist. These are the things that come up more often on cars sold in this area, so they get a second look.
            </p>
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {area.watchFor.map((item) => (
                <div key={item.title} className="flex gap-3 rounded-2xl border border-border bg-white p-4 shadow-sm sm:p-5">
                  <CircleAlert className="mt-0.5 h-5 w-5 shrink-0 text-amber-600" />
                  <div>
                    <h3 className="font-bold">{item.title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{item.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {localProof}

      <MechanicalReportOverview />

      <section className="bg-slate-50 py-10 sm:py-14">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-5xl">
            <div className="text-center">
              <h2 className="text-3xl font-bold">Choose the inspection that suits the car</h2>
              <p className="mt-2 text-muted-foreground">Clear pricing, the same anywhere in {area.name}, with no quote to request first.</p>
            </div>

            <div className="mt-7 grid gap-4 md:grid-cols-2">
              <div className="rounded-3xl border border-border bg-white p-6 shadow-sm">
                <p className="text-sm font-bold text-primary">Standard Inspection</p>
                <p className="mt-2 text-4xl font-bold">£149.99</p>
                <p className="mt-2 font-semibold">160-point pre-purchase inspection</p>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  An in-depth mechanical inspection of the relevant engine and drivetrain, brakes, steering, suspension and diagnostics. Includes road test, vehicle history, a clear video review, photo evidence and personal buying guidance.
                </p>
                <Link href="/book?package=standard" className="mt-4 inline-flex min-h-11 items-center font-bold text-primary hover:underline">
                  Book Standard <ArrowRight className="ml-1.5 h-4 w-4" />
                </Link>
              </div>

              <div className="rounded-3xl border-2 border-primary/30 bg-white p-6 shadow-sm">
                <p className="text-sm font-bold text-primary">Premium Inspection</p>
                <p className="mt-2 text-4xl font-bold">£199.99</p>
                <p className="mt-2 font-semibold">260-point pre-purchase inspection</p>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  Everything in Standard, including the video review, plus deeper condition checks, paint-depth readings, an extended road test, available auction, salvage and previous advert searches, and checks for indicators of undisclosed motor trading. Subject to available records, seller cooperation and road-test permission.
                </p>
                <Link href="/book?package=premium" className="mt-4 inline-flex min-h-11 items-center font-bold text-primary hover:underline">
                  Book Premium <ArrowRight className="ml-1.5 h-4 w-4" />
                </Link>
              </div>
            </div>

            <div className="mt-4 rounded-2xl border border-primary/20 bg-primary/5 p-5">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex gap-3">
                  <BatteryCharging className="mt-0.5 h-6 w-6 shrink-0 text-primary" />
                  <div>
                    <h3 className="font-bold">Buying an electric or plug-in hybrid car in {area.name}?</h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                      Add a CARA Approved® Autel EV Battery State of Health report to either inspection for £49.99, or book the battery check on its own for £99.99. It isn&apos;t included in Standard or Premium.
                    </p>
                  </div>
                </div>
                <div className="shrink-0 sm:text-right">
                  <p className="text-2xl font-bold">+£49.99</p>
                  <Link href="/ev-battery-health-check" className="-my-3.5 inline-block py-3.5 text-sm font-bold text-primary hover:underline">
                    EV battery details
                  </Link>
                </div>
              </div>
            </div>

            <details className="group mt-4 overflow-hidden rounded-2xl border border-border bg-white">
              <summary className="flex min-h-12 cursor-pointer list-none items-center justify-between gap-3 px-4 py-3 font-bold text-primary [&::-webkit-details-marker]:hidden">
                Compare what&apos;s included
                <ChevronDown className="h-5 w-5 shrink-0 transition-transform group-open:rotate-180" />
              </summary>
              <div className="border-t border-border bg-slate-50 p-3 sm:p-4">
                <WhatsIncluded />
              </div>
            </details>
          </div>
        </div>
      </section>

      <section className="py-10 sm:py-14">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl">
            <h2 className="text-center text-3xl font-bold">What happens after you book?</h2>
            <div className="mt-7 space-y-3">
              {[
                ["1", "Choose a package and appointment", "Book online, pick your time and tell us where the car is being sold."],
                ["2", "We drive to the car", `We come to the seller or dealer anywhere in ${area.name}. ${area.travel.summary}.`],
                ["3", "We inspect and test", "We carry out the physical, diagnostic, history and road-test checks, and film the video review at the car."],
                ["4", "Understand before you decide", "You get the video review, photos and digital report the same day, then we talk through the findings and the buying decision with you. Keep the evidence for future reference."],
              ].map(([number, title, text]) => (
                <div key={number} className="flex gap-4 rounded-2xl border border-border bg-white p-4 sm:p-5">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary font-bold text-primary-foreground">{number}</span>
                  <div>
                    <h3 className="font-bold">{title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-10 sm:py-14">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl">
            <div className="grid gap-4 sm:grid-cols-2">
              <Link href="/sample-report" className="group rounded-3xl border bg-white p-6 shadow-sm transition hover:shadow-md">
                <FileText className="h-7 w-7 text-primary" />
                <h2 className="mt-4 text-xl font-bold">See a sample inspection report</h2>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">See the level of detail, findings and checklist before you book.</p>
                <span className="mt-4 inline-flex items-center font-bold text-primary">View sample report <ArrowRight className="ml-2 h-4 w-4" /></span>
              </Link>

              <Link href="/ev-battery-health-check" className="group rounded-3xl border bg-white p-6 shadow-sm transition hover:shadow-md">
                <BatteryCharging className="h-7 w-7 text-primary" />
                <h2 className="mt-4 text-xl font-bold">EV battery health checks</h2>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">What the State of Health assessment checks on compatible electric and plug-in hybrid cars.</p>
                <span className="mt-4 inline-flex items-center font-bold text-primary">EV battery health <ArrowRight className="ml-2 h-4 w-4" /></span>
              </Link>
            </div>

            <h2 className="mt-10 text-3xl font-bold">Questions from {area.name} buyers</h2>
            <div className="mt-5 space-y-3">
              {faqs.map((faq) => (
                <details key={faq.question} className="group rounded-2xl border bg-white">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-3 p-4 font-bold sm:p-5 [&::-webkit-details-marker]:hidden">
                    {faq.question}
                    <ChevronDown className="h-5 w-5 shrink-0 transition-transform group-open:rotate-180" />
                  </summary>
                  <p className="-mt-1 px-4 pb-4 text-sm leading-relaxed text-muted-foreground sm:-mt-2 sm:px-5 sm:pb-5">{faq.answer}</p>
                </details>
              ))}
            </div>
            <p className="mt-4 text-sm text-muted-foreground">Page last checked {formatUpdated(area.updated)} by Henry, {BRAND}.</p>
          </div>
        </div>
      </section>

      {related.length > 0 && (
        <section className="py-10 sm:py-14">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-4xl">
              <h2 className="text-2xl font-bold">Nearby areas we cover</h2>
              <div className="mt-4 flex flex-wrap gap-2">
                {related.map((other) => (
                  <Link
                    key={other.slug}
                    href={areaPath(other)}
                    className="inline-flex min-h-11 items-center rounded-full border border-primary/30 bg-white px-4 py-2 text-sm font-semibold text-primary transition hover:bg-primary/5"
                  >
                    {other.name}
                  </Link>
                ))}
                <Link
                  href="/#areas"
                  className="inline-flex min-h-11 items-center rounded-full border border-border bg-white px-4 py-2 text-sm font-semibold transition hover:bg-muted/30"
                >
                  All areas we cover
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}

      <section className="py-12 sm:py-16">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl rounded-3xl border border-primary/15 bg-primary/5 p-7 text-center sm:p-10">
            <ShieldCheck className="mx-auto h-9 w-9 text-emerald-600" />
            <h2 className="mt-4 text-3xl font-bold">Inspect it before you buy it.</h2>
            <p className="mx-auto mt-3 max-w-2xl text-muted-foreground">Independent pre-purchase vehicle inspections in {area.name} from £149.99.</p>
            <Link href="/book" className="mt-6 inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 font-bold text-white transition hover:bg-primary/90">
              Book an Inspection <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
