import Image from "next/image"
import Link from "next/link"
import { ReviewsSlider } from "@/components/reviews-slider"
import { AreaMap } from "@/components/vehicle-inspections/area-map"
import { ReportStrip } from "@/components/vehicle-inspections/sections/report-strip"
import { WhatWeCheck } from "@/components/vehicle-inspections/sections/what-we-check"
import { WhatsIncluded } from "@/components/vehicle-inspections/whats-included"
import { areaPath, areas, type Area } from "@/lib/areas"
import { inspectionPhotos } from "@/lib/inspection-photos"
import {
  ArrowRight,
  BatteryCharging,
  CalendarCheck,
  Car,
  ChevronDown,
  FileText,
  Gauge,
  Handshake,
  History,
  MapPin,
  PaintBucket,
  Route,
  ScanLine,
  Search,
  ShieldCheck,
  Video,
  type LucideIcon,
} from "lucide-react"

const BRAND = "Pro Vehicle Inspections"
const SITE_URL = "https://www.provehicleinspections.com"

const HENRY_POINTS: Array<{ icon: LucideIcon; label: string }> = [
  { icon: Car, label: "I come to the car" },
  { icon: ScanLine, label: "Full diagnostic scan" },
  { icon: Handshake, label: "Fully independent" },
]

const PACKAGES: Array<{
  name: string
  slug: string
  price: string
  points: number
  featured?: boolean
  note?: string
  items: Array<{ icon: LucideIcon; label: string }>
}> = [
  {
    name: "Standard",
    slug: "standard",
    price: "£199.99",
    points: 160,
    items: [
      { icon: Gauge, label: "Engine, gearbox, brakes and suspension" },
      { icon: ScanLine, label: "Full diagnostic scan" },
      { icon: Route, label: "Road test" },
      { icon: History, label: "Full vehicle history check" },
      { icon: Video, label: "Video, photos and report" },
    ],
  },
  {
    name: "Premium",
    slug: "premium",
    price: "£249.99",
    points: 260,
    featured: true,
    note: "Searches depend on the records available. Road tests need the seller's permission.",
    items: [
      { icon: ShieldCheck, label: "Everything in Standard" },
      { icon: PaintBucket, label: "Paint depth on every panel" },
      { icon: Route, label: "Extended road test" },
      { icon: Search, label: "Auction, salvage and old advert searches" },
      { icon: Handshake, label: "Checks for hidden trade sellers" },
    ],
  },
]

const STEPS: Array<{ icon: LucideIcon; title: string; text: string }> = [
  { icon: CalendarCheck, title: "Book online", text: "Pick a time and tell me where the car is." },
  { icon: Car, title: "I come to the car", text: "Dealer or driveway, same price." },
  { icon: ScanLine, title: "I inspect and drive it", text: "Scan, checks and a road test." },
  { icon: Video, title: "You get the evidence", text: "Video, photos and report the same day." },
]

// The same answers on every area page, in Henry's words, with the place name filled in.
function areaFaqs(name: string) {
  return [
    {
      question: `Do you charge extra to come out to ${name}?`,
      answer: `No. It's the same price anywhere in ${name}: £199.99 for a Standard inspection, £249.99 for Premium, and £49.99 on top if you want the EV battery health check. No mileage or call-out charge.`,
    },
    {
      question: "Can you inspect a car at a dealer?",
      answer:
        "Yes. Tell the dealer an independent inspector is coming and I'll sort the time out with them. I inspect it on their site and road test it where they allow it.",
    },
    {
      question: "What about a private seller's driveway?",
      answer:
        "Yes, I do plenty of those. Ask the seller to have the keys, the V5C and any service history ready, and somewhere level to park. If you give me their number I can arrange it with them myself.",
    },
    {
      question: "Do I need to be there?",
      answer:
        "No. Most people aren't. I inspect the car with the seller or dealer, send you the video, photos and report afterwards, and then we go through it together.",
    },
    {
      question: "Will you tell me whether to buy it?",
      answer:
        "I'll tell you what I found, what matters, what doesn't, and roughly what it'll cost to put right. The decision is yours, but you'll get my honest view. I get nothing from the sale either way.",
    },
  ]
}

function formatUpdated(iso: string) {
  return new Date(iso).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })
}

export function LocalInspectionPage({ area }: { area: Area }) {
  const url = `${SITE_URL}${areaPath(area)}`
  const faqs = areaFaqs(area.name)
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
        { "@type": "Offer", name: "Standard Inspection", price: "199.99", priceCurrency: "GBP" },
        { "@type": "Offer", name: "Premium Inspection", price: "249.99", priceCurrency: "GBP" },
        { "@type": "Offer", name: "EV Battery Health Check", price: "149.99", priceCurrency: "GBP" },
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
            <p className="mx-auto mt-5 max-w-3xl text-lg leading-relaxed text-muted-foreground sm:text-xl">Buying a used car in {area.name}? I&apos;ll come to the car, go over it properly and tell you straight what I find, before you hand any money over.
            </p>

            <div className="mt-6 flex flex-wrap justify-center gap-2 text-sm font-semibold">
              <span className="rounded-full border bg-white px-4 py-2">Standard £199.99</span>
              <span className="rounded-full border bg-white px-4 py-2">Premium £249.99</span>
              <span className="rounded-full border border-primary/20 bg-primary/5 px-4 py-2 text-primary">EV battery check £149.99</span>
            </div>
            <p className="mx-auto mt-4 inline-flex max-w-2xl items-center gap-2 text-sm font-semibold text-muted-foreground">
              <Route className="h-4 w-4 shrink-0 text-primary" /> Same price anywhere in {area.name}, no mileage charge
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
          <div className="mx-auto grid max-w-5xl gap-8 md:grid-cols-[0.75fr_1.25fr] md:items-center lg:gap-12">
            <div className="mx-auto w-full max-w-[280px] overflow-hidden rounded-[2rem] border border-border bg-white shadow-md md:max-w-none">
              {/* eslint-disable-next-line @next/next/no-img-element -- the same photo the home page uses */}
              <img src="/henry.webp" alt={`Henry from ${BRAND}`} width={750} height={1000} loading="lazy" className="h-auto w-full object-contain" />
            </div>
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1.5 text-sm font-bold text-primary">
                <MapPin className="h-4 w-4" /> Mobile inspections in {area.name}
              </div>
              <h2 className="mt-4 text-3xl font-bold sm:text-4xl">I&apos;m Henry. I&apos;ll be the one looking at the car.</h2>
              <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg">
                I come to the car, on a forecourt or a driveway, and check it properly before you pay. I don&apos;t work for the seller and I get nothing from the sale.
              </p>

              <div className="mt-5 grid grid-cols-3 gap-2 sm:gap-3">
                {HENRY_POINTS.map(({ icon: Icon, label }) => (
                  <div key={label} className="rounded-2xl border border-border bg-white p-3 text-center shadow-sm">
                    <span className="mx-auto flex h-11 w-11 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                      <Icon className="h-5 w-5" />
                    </span>
                    <p className="mt-2 text-[13px] font-bold leading-tight sm:text-sm">{label}</p>
                  </div>
                ))}
              </div>

              <p className="mt-6 text-sm font-semibold">Places I cover in and around {area.name}</p>
              <div className="mt-2 flex flex-wrap gap-2">
                {area.nearby.map((place) => (
                  <span key={place} className="rounded-full border border-border bg-slate-50 px-3 py-1.5 text-sm font-medium">
                    {place}
                  </span>
                ))}
              </div>
              {area.postcodes && <p className="mt-3 text-sm text-muted-foreground">Postcodes {area.postcodes}.</p>}
            </div>
          </div>
        </div>
      </section>

      <WhatWeCheck title={`What I check on a car in ${area.name}`} />

      <ReportStrip />

      <section className="bg-slate-50 py-10 sm:py-14">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-5xl">
            <div className="text-center">
              <h2 className="text-3xl font-bold">Choose the inspection that suits the car</h2>
              <p className="mt-2 text-muted-foreground">The same price anywhere in {area.name}.</p>
            </div>

            <div className="mt-7 grid gap-4 md:grid-cols-2">
              {PACKAGES.map((pkg) => (
                <div key={pkg.name} className={`rounded-3xl bg-white p-6 shadow-sm ${pkg.featured ? "border-2 border-primary/30" : "border border-border"}`}>
                  <p className="text-sm font-bold text-primary">{pkg.name} Inspection</p>
                  <p className="mt-2 text-4xl font-bold">{pkg.price}</p>
                  <p className="mt-1 font-semibold">{pkg.points}-point pre-purchase inspection</p>
                  <div className="mt-4 space-y-2.5">
                    {pkg.items.map(({ icon: Icon, label }) => (
                      <div key={label} className="flex items-center gap-3">
                        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                          <Icon className="h-[18px] w-[18px]" />
                        </span>
                        <span className="text-sm font-semibold">{label}</span>
                      </div>
                    ))}
                  </div>
                  {pkg.note && <p className="mt-3 text-xs text-muted-foreground">{pkg.note}</p>}
                  <Link href={`/book?package=${pkg.slug}`} className="mt-4 inline-flex min-h-11 items-center font-bold text-primary hover:underline">
                    Book {pkg.name} <ArrowRight className="ml-1.5 h-4 w-4" />
                  </Link>
                </div>
              ))}
            </div>

            <Link
              href="/ev-battery-health-check"
              className="mt-4 flex items-center gap-3 rounded-2xl border border-primary/20 bg-primary/5 p-4 transition hover:bg-primary/10 sm:p-5"
            >
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                <BatteryCharging className="h-5 w-5" />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block font-bold">Electric or plug-in hybrid?</span>
                <span className="block text-sm text-muted-foreground">Add the battery health check for £49.99, or book it on its own for £149.99.</span>
              </span>
              <ArrowRight className="h-5 w-5 shrink-0 text-primary" />
            </Link>

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
          <div className="mx-auto max-w-5xl">
            <h2 className="text-center text-3xl font-bold">What happens after you book?</h2>
            <div className="mt-7 grid gap-6 lg:grid-cols-[1fr_1fr] lg:items-center">
              <figure className="order-2 lg:order-1">
                <div className="relative aspect-[4/3] overflow-hidden rounded-3xl border border-border bg-white shadow-sm">
                  <Image
                    src={inspectionPhotos.rangeRover.src}
                    alt={inspectionPhotos.rangeRover.alt}
                    fill
                    sizes="(min-width: 1024px) 480px, 100vw"
                    className="object-cover"
                    style={{ objectPosition: inspectionPhotos.rangeRover.position }}
                  />
                </div>
                <figcaption className="mt-2 text-sm text-muted-foreground">A Range Rover Sport up on my ramps at a dealer.</figcaption>
              </figure>
              <div className="order-1 grid grid-cols-2 gap-3 lg:order-2">
                {STEPS.map(({ icon: Icon, title, text }, index) => (
                  <div key={title} className="rounded-2xl border border-border bg-white p-4 shadow-sm">
                    <div className="flex items-center gap-2">
                      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                        <Icon className="h-5 w-5" />
                      </span>
                      <span className="text-sm font-bold text-primary">{index + 1}</span>
                    </div>
                    <h3 className="mt-3 font-bold leading-snug">{title}</h3>
                    <p className="mt-1 text-sm leading-snug text-muted-foreground">{text}</p>
                  </div>
                ))}
              </div>
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
            <p className="mt-4 text-sm text-muted-foreground">Page last checked {formatUpdated(area.updated)} by Henry, {BRAND}.</p>
          </div>
        </div>
      </section>

      {related.length > 0 && (
        <section className="py-10 sm:py-14">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-4xl">
              <h2 className="text-2xl font-bold">Nearby areas we cover</h2>
              <AreaMap highlight={area.slug} className="mt-5" />
              <div className="mt-6 flex flex-wrap gap-2">
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

      <ReviewsSlider className="bg-slate-50" />

      <section className="py-12 sm:py-16">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl rounded-3xl border border-primary/15 bg-primary/5 p-7 text-center sm:p-10">
            <ShieldCheck className="mx-auto h-9 w-9 text-emerald-600" />
            <h2 className="mt-4 text-3xl font-bold">Inspect it before you buy it.</h2>
            <p className="mx-auto mt-3 max-w-2xl text-muted-foreground">Independent pre-purchase vehicle inspections in {area.name} from £199.99.</p>
            <Link href="/book" className="mt-6 inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 font-bold text-white transition hover:bg-primary/90">
              Book an Inspection <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
