import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight, Camera, ClipboardList, FileSignature, Gauge, MapPin, MessageCircle, Minus, ScanLine, Wrench } from "lucide-react"
import { MECHANICAL_ITEMS, MECHANICAL_JOBS, MECHANICAL_LIMITS } from "@/components/vehicle-inspections/sections/pricing"
import { SITE } from "@/components/vehicle-inspections/sections/site"
import { AREA_SERVED } from "@/lib/areas"
import { SERVICE_AREA } from "@/lib/areas/service-area"

const SITE_URL = "https://www.provehicleinspections.com"
const BOOK_HREF = "/book?package=mechanical"
const WHATSAPP_HREF = `${SITE.whatsapp}?text=${encodeURIComponent("Hi, I'd like a mechanical inspection after garage work. What was done and what has happened since: ")}`

const description =
  "Independent mechanical inspection after garage work, £399.99. Full diagnostic scan with live data, photos and video, a written report on the likely cause and a signed statement of truth."

export const metadata: Metadata = {
  title: "Mechanical Inspection After Garage Work | Pro Vehicle Inspections",
  description,
  alternates: {
    canonical: "/mechanical-inspection",
  },
  openGraph: {
    title: "Independent Mechanical Inspection After Garage Work",
    description,
    url: "/mechanical-inspection",
    type: "website",
    images: ["/images/inspection-car.jpg"],
  },
}

// Icons for the five things the report gives you, in the same order as MECHANICAL_ITEMS.
const ITEM_ICONS = [ScanLine, Camera, ClipboardList, FileSignature, MessageCircle]

const STEPS = [
  {
    title: "Book and tell us what happened",
    detail: "Pick a time and pay online. The booking form asks which garage did the work, what was done and what has happened since, so we know what to look for.",
  },
  {
    title: "We come to the car",
    detail: `Wherever it is across ${SERVICE_AREA.short}. Same price everywhere, no call-out or mileage charge.`,
  },
  {
    title: "Scan, live data, photos and video",
    detail: "A full Autel scan of every module, fault codes with their freeze-frame data, live data with the engine running, and photos and video of the work and the fault.",
  },
  {
    title: "Your written report",
    detail: "The findings and the likely cause, laid out so a garage, or a judge, can follow it, with a signed statement of truth.",
  },
]

const faqs = [
  {
    question: "How much is a mechanical inspection?",
    answer: `£399.99, paid when you book. The price is the same wherever the car is across ${SERVICE_AREA.short}, with no call-out or mileage charge.`,
  },
  {
    question: "When would I need one?",
    answer:
      "When a garage has worked on your car and something has gone wrong since: a tensioner, pulley or water pump failing soon after a cambelt change, timing chain noise after a repair, warning lights or running faults that started after a service, or a garage saying the fault is nothing to do with their work.",
  },
  {
    question: "Do you take anything apart?",
    answer:
      "No. The inspection is non-invasive. Nothing is stripped down or taken apart, so the findings cover what the diagnostic scan, the live data and a visual inspection show.",
  },
  {
    question: "Will the report say the garage is at fault?",
    answer:
      "The report sets out what we found and the likely cause. It is independent, so it says what the evidence shows, whichever way that goes.",
  },
  {
    question: "Can I use the report in a Small Claims case?",
    answer:
      "Yes. You get a signed statement of truth to go with your claim if the garage won't put it right. We don't attend court hearings.",
  },
  {
    question: "Is this the same as a pre-purchase inspection?",
    answer:
      "No. The mechanical inspection is for a car you already own that has a problem after garage work. If you're buying a used car, book a Standard (£199.99) or Premium (£249.99) pre-purchase inspection instead.",
  },
]

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Mechanical Inspection",
  serviceType: "Independent vehicle fault inspection",
  url: `${SITE_URL}/mechanical-inspection`,
  description:
    "Independent, non-invasive inspection of a fault after garage work: full diagnostic scan with live data, photos and video of the work, a written report on the findings and likely cause, and a signed statement of truth for a Small Claims case.",
  provider: {
    "@type": "AutomotiveBusiness",
    name: "Pro Vehicle Inspections",
    url: SITE_URL,
    telephone: "+441992245660",
  },
  areaServed: AREA_SERVED,
  offers: {
    "@type": "Offer",
    name: "Mechanical Inspection",
    price: "399.99",
    priceCurrency: "GBP",
    availability: "https://schema.org/InStock",
    url: `${SITE_URL}${BOOK_HREF}`,
  },
}

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: { "@type": "Answer", text: faq.answer },
  })),
}

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Vehicle inspections", item: `${SITE_URL}/` },
    { "@type": "ListItem", position: 2, name: "Mechanical inspection", item: `${SITE_URL}/mechanical-inspection` },
  ],
}

function BookButtons({ centred = false }: { centred?: boolean }) {
  return (
    <div className={`flex flex-col gap-3 sm:flex-row ${centred ? "justify-center" : ""}`}>
      <Link
        href={BOOK_HREF}
        className="inline-flex h-14 items-center justify-center rounded-xl bg-primary px-8 text-lg font-bold text-primary-foreground shadow-md transition hover:bg-primary/90"
      >
        Book Mechanical: £399.99 <ArrowRight className="ml-2 h-5 w-5" />
      </Link>
      <a
        href={WHATSAPP_HREF}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex h-14 items-center justify-center gap-2 rounded-xl border-2 border-primary/30 bg-white px-8 text-lg font-bold text-primary transition hover:bg-primary/5"
      >
        <MessageCircle className="h-5 w-5" /> Ask Henry first
      </a>
    </div>
  )
}

export default function MechanicalInspectionPage() {
  return (
    <main className="bg-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <section className="border-b border-border bg-primary/5 py-12 sm:py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto grid max-w-6xl items-center gap-8 lg:grid-cols-[1.15fr_.85fr]">
            <div className="text-center lg:text-left">
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-white px-4 py-2 text-sm font-bold text-primary">
                <Wrench className="h-4 w-4" /> Independent fault report after garage work
              </div>
              <h1 className="text-balance text-4xl font-bold leading-tight text-foreground sm:text-5xl lg:text-6xl">
                Mechanical inspection after garage work
              </h1>
              <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-muted-foreground sm:text-xl lg:mx-0">
                A garage has worked on your car and something has gone wrong since. We inspect it independently and write up what we find, so you have evidence to take back to the garage, or to a Small Claims case if it comes to that.
              </p>
              <div className="mt-7">
                <BookButtons />
              </div>
              <p className="mt-5 flex items-center justify-center gap-2 text-sm text-muted-foreground lg:justify-start">
                <MapPin className="h-4 w-4 shrink-0 text-primary" /> {SERVICE_AREA.short}, wherever the car is
              </p>
            </div>

            <div className="rounded-3xl border border-border bg-white p-6 shadow-sm sm:p-7">
              <p className="text-sm font-bold text-primary">Mechanical Inspection</p>
              <p className="mt-1 text-5xl font-bold tracking-tight">£399.99</p>
              <p className="mt-2 text-sm text-muted-foreground">One price, no call-out or mileage charge.</p>
              <ul className="mt-5 space-y-3 border-t border-border pt-5">
                {MECHANICAL_ITEMS.map((item) => (
                  <li key={item.label} className="flex items-start gap-3">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary text-[11px] font-bold text-primary-foreground">✓</span>
                    <span className="font-semibold leading-snug">{item.label}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-16">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-5xl">
            <div className="mx-auto mb-8 max-w-3xl text-center">
              <h2 className="text-balance text-3xl font-bold sm:text-4xl">When you need one</h2>
              <p className="mt-3 text-lg text-muted-foreground">Typical jobs we look at.</p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
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

      <section className="border-t border-border bg-white py-12 sm:py-16">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-5xl">
            <div className="mx-auto mb-8 max-w-3xl text-center">
              <h2 className="text-balance text-3xl font-bold sm:text-4xl">What you get</h2>
              <p className="mt-3 text-lg text-muted-foreground">Independent evidence you can put in front of the garage.</p>
            </div>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {MECHANICAL_ITEMS.map((item, i) => {
                const Icon = ITEM_ICONS[i] ?? ClipboardList
                return (
                  <div key={item.label} className="rounded-2xl border bg-white p-6 shadow-sm">
                    <Icon className="h-9 w-9 text-primary" />
                    <h3 className="mt-4 text-xl font-bold leading-snug">{item.label}</h3>
                    {item.note && <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.note}</p>}
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-primary/5 py-12 sm:py-16">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-5xl">
            <h2 className="mb-8 text-center text-3xl font-bold sm:text-4xl">How it works</h2>
            <ol className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {STEPS.map((step, i) => (
                <li key={step.title} className="rounded-2xl border border-primary/15 bg-white p-6 shadow-sm">
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-primary font-bold text-primary-foreground">{i + 1}</span>
                  <h3 className="mt-4 text-lg font-bold leading-snug">{step.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{step.detail}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-16">
        <div className="container mx-auto px-4">
          <div className="mx-auto grid max-w-5xl gap-5 lg:grid-cols-2">
            <div className="rounded-3xl border border-border bg-white p-6 shadow-sm sm:p-7">
              <h2 className="mb-4 text-2xl font-bold">Good to know</h2>
              <ul className="space-y-4">
                {MECHANICAL_LIMITS.map((item) => (
                  <li key={item.label} className="flex items-start gap-3">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-muted-foreground/60">
                      <Minus className="h-3.5 w-3.5 text-white" strokeWidth={3} />
                    </span>
                    <span>
                      <span className="block font-semibold leading-snug">{item.label}</span>
                      {item.note && <span className="mt-0.5 block text-sm text-muted-foreground">{item.note}</span>}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-3xl border border-primary/20 bg-primary/5 p-6 sm:p-7">
              <h2 className="text-2xl font-bold">Buying a car instead?</h2>
              <p className="mt-3 text-muted-foreground">
                The mechanical inspection is for a car you already own. If you&apos;re about to buy one, our pre-purchase inspections check the whole car before you pay.
              </p>
              <p className="mt-3 font-semibold">Standard £199.99 · Premium £249.99</p>
              <Link href="/book" className="mt-4 inline-flex min-h-11 items-center font-bold text-primary underline underline-offset-4">
                See the pre-purchase inspections
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-border bg-white py-12 sm:py-16">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl">
            <h2 className="mb-8 text-center text-3xl font-bold sm:text-4xl">Mechanical inspection FAQs</h2>
            <div className="space-y-4">
              {faqs.map((faq) => (
                <div key={faq.question} className="rounded-2xl border bg-white p-5 sm:p-6">
                  <h3 className="text-lg font-bold">{faq.question}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-border bg-primary/5 py-12 sm:py-16">
        <div className="container mx-auto px-4 text-center">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-balance text-3xl font-bold sm:text-4xl">Get the evidence before you go back to the garage</h2>
            <p className="mt-4 text-lg text-muted-foreground">Book in a couple of minutes and choose your exact time.</p>
            <div className="mt-7">
              <BookButtons centred />
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
