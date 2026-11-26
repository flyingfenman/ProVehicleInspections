import Link from "next/link"
import { ReviewsSlider } from "@/components/reviews-slider"
import { AreaMap } from "@/components/vehicle-inspections/area-map"
import { MECHANICAL_JOBS } from "@/components/vehicle-inspections/sections/pricing"
import { SITE } from "@/components/vehicle-inspections/sections/site"
import { areaPath, areas, type Area } from "@/lib/areas"
import { inPlace, MECHANICAL_AREAS_UPDATED, mechanicalAreaH1, mechanicalAreaPath } from "@/lib/areas/mechanical"
import { inspectionPhotos } from "@/lib/inspection-photos"
import { ArrowRight, Check, ChevronDown, Gauge, Lock, MapPin, MessageCircle, Route, ShieldCheck, Wrench } from "lucide-react"

// The mechanical inspection page for one area, at /mechanical-inspection/<place>. It follows the layout of the
// pre-purchase area pages (local-inspection-page.tsx) but none of the wording: this one is for a car the customer
// already owns that has gone wrong after garage work. In Henry's first person, the same on every area with the place
// name filled in. Scope, in his words (10 and 12 Nov 2026): in-depth photos, live data and in-depth diagnostics, in a
// written report, with the engine left sealed. Never promise anything that means opening the car up, and never a
// conclusion before the car is seen.

const BRAND = "Pro Vehicle Inspections"
const SITE_URL = "https://www.provehicleinspections.com"
const BOOK_HREF = "/book?package=mechanical"
const VAN = inspectionPhotos.van

const INCLUDED = [
  "Full Autel diagnostic scan of every module",
  "Fault codes with their freeze-frame data",
  "Live data read with the engine running",
  "In-depth photos and video of the work and the fault",
  "Written report with my findings and the most likely cause",
  "Signed statement of truth",
  "I go through the report with you and answer your questions",
  "No call-out or mileage charge: the price is the price",
]

// The same answers on every mechanical area page, in Henry's words, with the place name filled in.
function mechanicalAreaFaqs(place: string) {
  return [
    {
      question: `How much is a mechanical inspection in ${place}?`,
      answer: `£499.99, paid when you book. It's the same price anywhere in ${place}, with no mileage or call-out charge.`,
    },
    {
      question: "Where does the car need to be?",
      answer: `Wherever it is in ${place}. Put the postcode or address where the car will be on the booking form and I come to it there.`,
    },
    {
      question: "Will you take the engine apart?",
      answer:
        "No. I leave the engine sealed so nobody can say the evidence was disturbed. The report covers what the diagnostics, the live data and the photos show, and if something needs opening up to confirm it, the report says exactly what to look for.",
    },
    {
      question: "Will the report say the garage is at fault?",
      answer:
        "It sets out what I found and my opinion on the most likely cause. I'm independent, so it says what the evidence shows, whichever way that goes.",
    },
    {
      question: "Can I use the report in a Small Claims case?",
      answer:
        "Yes. It comes with a signed statement of truth to go with your claim if the garage won't put it right. I don't attend court hearings.",
    },
    {
      question: `I'm buying a car in ${place}. Is this the right inspection?`,
      answer: `No. This one is for a car you already own that has a problem after garage work. If you're buying a used car in ${place}, book a Standard (£249.99) or Premium (£299.99) pre-purchase inspection instead.`,
    },
  ]
}

function formatUpdated(iso: string) {
  return new Date(iso).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })
}

export function LocalMechanicalPage({ area }: { area: Area }) {
  const place = inPlace(area)
  const h1 = mechanicalAreaH1(area)
  const url = `${SITE_URL}${mechanicalAreaPath(area)}`
  const faqs = mechanicalAreaFaqs(place)
  const related = area.related.map((slug) => areas.find((other) => other.slug === slug)).filter((other): other is Area => Boolean(other))
  const whatsappHref = `${SITE.whatsapp}?text=${encodeURIComponent(`Hi, I'd like a mechanical inspection in ${place}. What was done and what has happened since: `)}`

  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: h1,
      serviceType: "Independent vehicle fault inspection",
      description: `Independent mechanical inspection in ${place} for a fault after garage work: full diagnostic scan with live data, photos and video of the work, a written report on the findings and likely cause, and a signed statement of truth.`,
      provider: { "@id": `${SITE_URL}/#business` },
      areaServed: { "@type": area.schemaType, name: area.name },
      url,
      offers: {
        "@type": "Offer",
        name: "Mechanical Inspection",
        price: "499.99",
        priceCurrency: "GBP",
        availability: "https://schema.org/InStock",
        url: `${SITE_URL}${BOOK_HREF}`,
      },
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
        { "@type": "ListItem", position: 2, name: "Mechanical inspection", item: `${SITE_URL}/mechanical-inspection` },
        { "@type": "ListItem", position: 3, name: h1, item: url },
      ],
    },
  ]

  return (
    <main className="bg-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />

      <section className="border-b border-border bg-gradient-to-b from-primary/5 to-white py-10 sm:py-14 lg:py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl text-center">
            <Link href="/mechanical-inspection" className="-my-3.5 inline-block py-3.5 text-sm font-semibold text-primary hover:underline">
              Mechanical inspection
            </Link>
            <h1 className="mt-3 text-balance text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">{h1}</h1>
            <p className="mx-auto mt-5 max-w-3xl text-lg leading-relaxed text-muted-foreground sm:text-xl">
              Car in {place} not been right since a garage worked on it? I&apos;ll come to it, run in-depth diagnostics and write up what I find, so you have independent evidence to take back to the garage.
            </p>

            <div className="mt-6 flex flex-wrap justify-center gap-2 text-sm font-semibold">
              <span className="rounded-full border border-primary/20 bg-primary/5 px-4 py-2 text-primary">Mechanical Inspection £499.99</span>
              <span className="rounded-full border bg-white px-4 py-2">Written report</span>
              <span className="rounded-full border bg-white px-4 py-2">Signed statement of truth</span>
            </div>
            <p className="mx-auto mt-4 inline-flex max-w-2xl items-center gap-2 text-sm font-semibold text-muted-foreground">
              <Route className="h-4 w-4 shrink-0 text-primary" /> Same price anywhere in {place}, no mileage charge
            </p>

            <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
              <Link
                href={BOOK_HREF}
                className="inline-flex h-13 items-center justify-center rounded-xl bg-primary px-7 py-3.5 text-base font-bold text-primary-foreground transition hover:bg-primary/90"
              >
                Book Mechanical: £499.99 <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-13 items-center justify-center rounded-xl border-2 border-primary/30 bg-white px-7 py-3.5 text-base font-bold text-primary transition hover:bg-primary/5"
              >
                <MessageCircle className="mr-2 h-4 w-4" /> Ask Henry first
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="py-10 sm:py-14">
        <div className="container mx-auto px-4">
          <div className="mx-auto grid max-w-5xl gap-8 md:grid-cols-[0.75fr_1.25fr] md:items-center lg:gap-12">
            <div className="mx-auto w-full max-w-[280px] overflow-hidden rounded-[2rem] border border-border bg-white shadow-md md:max-w-none">
              {/* eslint-disable-next-line @next/next/no-img-element -- the same photo the home page uses */}
              <img src="/henry.webp" alt={`Henry from ${BRAND}`} width={750} height={1000} loading="lazy" className="h-auto w-full object-contain" />
            </div>
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1.5 text-sm font-bold text-primary">
                <MapPin className="h-4 w-4" /> Mechanical inspections in {place}
              </div>
              <h2 className="mt-4 text-3xl font-bold sm:text-4xl">I&apos;m Henry. I do every mechanical inspection myself.</h2>
              <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg">
                When a repair goes wrong it often comes down to your word against the garage&apos;s. I&apos;m independent of both. I come to the car wherever it is in {place} and record what it shows.
              </p>
              <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg">
                I run in-depth diagnostics on every system with my Autel tablet, read the fault codes with their freeze-frame data, record live data with the engine running, and take in-depth photos and video of the work that was done and of the fault.
              </p>
              <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg">
                It all goes into a written report with my findings and my opinion on the most likely cause, with a signed statement of truth. It says what the evidence shows, whichever way that goes.
              </p>

              <p className="mt-6 text-sm font-semibold">Places I cover in and around {area.name}</p>
              <div className="mt-2 flex flex-wrap gap-2">
                {area.nearby.map((town) => (
                  <span key={town} className="rounded-full border border-border bg-slate-50 px-3 py-1.5 text-sm font-medium">
                    {town}
                  </span>
                ))}
              </div>
              {area.postcodes && <p className="mt-3 text-sm text-muted-foreground">Postcodes {area.postcodes}.</p>}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-10 sm:py-14">
        <div className="container mx-auto px-4">
          <div className="mx-auto grid max-w-5xl gap-8 lg:grid-cols-[1.15fr_.85fr] lg:items-center">
            <figure>
              <div className="overflow-hidden rounded-3xl border border-border bg-white shadow-sm">
                {/* eslint-disable-next-line @next/next/no-img-element -- static photo, already sized and compressed */}
                <img
                  src={VAN.src}
                  alt={VAN.alt}
                  width={900}
                  height={675}
                  loading="lazy"
                  className="aspect-[4/3] h-full w-full object-cover"
                  style={{ objectPosition: VAN.position }}
                />
              </div>
              <figcaption className="mt-3 text-sm text-muted-foreground">A Citroën Relay van on my ramps, ready for its inspection.</figcaption>
            </figure>

            <div className="rounded-3xl border border-border bg-white p-5 sm:p-6">
              <h2 className="text-xl font-bold">What you get for £499.99</h2>
              <div className="mt-4 space-y-3 text-sm">
                {INCLUDED.map((item) => (
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

      <section className="py-10 sm:py-14">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-5xl">
            <div className="text-center">
              <h2 className="text-3xl font-bold">When a mechanical inspection helps</h2>
              <p className="mt-2 text-muted-foreground">The jobs I&apos;m asked to look at most.</p>
            </div>
            <div className="mt-7 grid gap-4 sm:grid-cols-2">
              {MECHANICAL_JOBS.map((job) => (
                <div key={job} className="flex items-start gap-3 rounded-2xl border border-primary/15 bg-primary/5 p-5">
                  <Gauge className="mt-0.5 h-6 w-6 shrink-0 text-primary" />
                  <p className="font-semibold leading-snug">{job}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-10 sm:py-14">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-5xl">
            <div className="text-center">
              <h2 className="text-3xl font-bold">One price anywhere in {place}</h2>
              <p className="mt-2 text-muted-foreground">Paid when you book. No quote to ask for first.</p>
            </div>

            <div className="mt-7 grid gap-4 md:grid-cols-2">
              <div className="rounded-3xl border-2 border-primary/30 bg-white p-6 shadow-sm">
                <p className="flex items-center gap-2 text-sm font-bold text-primary">
                  <Wrench className="h-4 w-4" /> Mechanical Inspection
                </p>
                <p className="mt-2 text-4xl font-bold">£499.99</p>
                <p className="mt-2 font-semibold">Independent fault report after garage work</p>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  In-depth diagnostics, live data, photos and video, written up with my findings and the most likely cause, and a signed statement of truth to go with it.
                </p>
                <Link href={BOOK_HREF} className="mt-4 inline-flex min-h-11 items-center font-bold text-primary hover:underline">
                  Book Mechanical <ArrowRight className="ml-1.5 h-4 w-4" />
                </Link>
              </div>

              <div className="rounded-3xl border border-primary/20 bg-primary/5 p-6">
                <Lock className="h-6 w-6 text-primary" />
                <h3 className="mt-3 text-xl font-bold">The engine stays sealed</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  I leave the engine sealed so nobody can say the evidence was disturbed. The report covers what the diagnostics, the live data and the photos show. If something needs opening up to confirm it, the report says exactly what to look for.
                </p>
              </div>
            </div>

            <div className="mt-4 rounded-2xl border border-border bg-white p-5">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h3 className="font-bold">Buying a car in {place} instead?</h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    This inspection is for a car you already own. Before you buy one, book a pre-purchase inspection: Standard £249.99 or Premium £299.99.
                  </p>
                </div>
                <Link href={areaPath(area)} className="inline-flex min-h-11 shrink-0 items-center font-bold text-primary hover:underline">
                  Pre-purchase inspections in {place} <ArrowRight className="ml-1.5 h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-10 sm:py-14">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl">
            <h2 className="text-center text-3xl font-bold">What happens after you book?</h2>
            <div className="mt-7 space-y-3">
              {[
                ["1", "Book and tell me what happened", "Pick a time and pay online. The form asks which garage did the work, what was done and what has happened since, so I know what to look for."],
                ["2", "I come to the car", `Wherever it is in ${place}, for the same price.`],
                ["3", "Diagnostics, live data, photos and video", "A full scan of every module, live data with the engine running, and photos and video of the work and the fault."],
                ["4", "Your written report", "My findings and the most likely cause, laid out so a garage, or a judge, can follow it. Then I go through it with you."],
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
            <h2 className="text-3xl font-bold">Questions people ask me</h2>
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
            <p className="mt-4 text-sm text-muted-foreground">Page last checked {formatUpdated(MECHANICAL_AREAS_UPDATED)} by Henry, {BRAND}.</p>
          </div>
        </div>
      </section>

      {related.length > 0 && (
        <section className="py-10 sm:py-14">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-4xl">
              <h2 className="text-2xl font-bold">Nearby areas I cover</h2>
              <AreaMap highlight={area.slug} service="mechanical" className="mt-5" />
              <div className="mt-6 flex flex-wrap gap-2">
                {related.map((other) => (
                  <Link
                    key={other.slug}
                    href={mechanicalAreaPath(other)}
                    className="inline-flex min-h-11 items-center rounded-full border border-primary/30 bg-white px-4 py-2 text-sm font-semibold text-primary transition hover:bg-primary/5"
                  >
                    {other.name}
                  </Link>
                ))}
                <Link
                  href="/mechanical-inspection#areas"
                  className="inline-flex min-h-11 items-center rounded-full border border-border bg-white px-4 py-2 text-sm font-semibold transition hover:bg-muted/30"
                >
                  All areas I cover
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}

      <ReviewsSlider className="bg-slate-50" />

      <section className="py-12 sm:py-16">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl rounded-3xl border border-primary/15 bg-primary/5 p-7 text-center sm:p-10">
            <ShieldCheck className="mx-auto h-9 w-9 text-emerald-600" />
            <h2 className="mt-4 text-3xl font-bold">Go back to the garage with evidence.</h2>
            <p className="mx-auto mt-3 max-w-2xl text-muted-foreground">Independent mechanical inspections in {place}, £499.99.</p>
            <Link href={BOOK_HREF} className="mt-6 inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 font-bold text-white transition hover:bg-primary/90">
              Book Mechanical <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
