import type { Metadata } from "next"
import { ReviewsSlider } from "@/components/reviews-slider"
import Link from "next/link"
import { ArrowRight, Camera, CarFront, ChevronDown, ClipboardList, FileSignature, Lock, MapPin, MessageCircle, Scale, ScanLine, Wrench } from "lucide-react"
import { LocalAreaLinks } from "@/components/vehicle-inspections/local-area-links"
import { MECHANICAL_DEALER_JOBS, MECHANICAL_ITEMS, MECHANICAL_JOBS } from "@/components/vehicle-inspections/sections/pricing"
import { SITE } from "@/components/vehicle-inspections/sections/site"
import { AREA_SERVED } from "@/lib/areas"
import { inspectionPhotos } from "@/lib/inspection-photos"
import { SERVICE_AREA } from "@/lib/areas/service-area"

const SITE_URL = "https://www.provehicleinspections.com"
const BOOK_HREF = "/book?package=mechanical"
const WHATSAPP_HREF = `${SITE.whatsapp}?text=${encodeURIComponent("Hi, I'd like a mechanical inspection. What has happened with the car: ")}`

// The page is in Henry's first person, like the area pages. It is for a car the customer already owns with a fault
// after garage work or after buying from a dealer (Henry, 26 Nov 2026), and it leads on him being independent of both.
// Never promise a conclusion before the car is seen, never say a fault is covered by the Consumer Rights Act, and word
// the sealed engine as a positive.
const description =
  "Fault after garage work or after buying from a dealer? An independent, unbiased inspection: diagnostics, live data, photos and a written report. £499.99."

export const metadata: Metadata = {
  title: "Independent Mechanical Inspection for Garage and Dealer Faults | Pro Vehicle Inspections",
  description,
  alternates: {
    canonical: "/mechanical-inspection",
  },
  openGraph: {
    title: "Independent Mechanical Inspection for Garage and Dealer Faults",
    description,
    url: "/mechanical-inspection",
    type: "website",
    images: ["/images/share-inspection.jpg"],
  },
}

const VAN = inspectionPhotos.van

// Icons for the six things the report gives you, in the same order as MECHANICAL_ITEMS.
const ITEM_ICONS = [Scale, ScanLine, Camera, ClipboardList, FileSignature, MessageCircle]

const JOB_GROUPS = [
  { title: "After garage work", icon: Wrench, jobs: MECHANICAL_JOBS },
  { title: "After buying from a dealer", icon: CarFront, jobs: MECHANICAL_DEALER_JOBS },
]

const STEPS = [
  {
    title: "Book and tell me what happened",
    detail: "Pick a time and pay online. The booking form asks which garage or dealer is involved and what has happened, so I know what to look for.",
  },
  {
    title: "I come to the car",
    detail: `Wherever it is across ${SERVICE_AREA.short}. Same price everywhere, no call-out or mileage charge.`,
  },
  {
    title: "Diagnostics, live data, photos and video",
    detail: "A full Autel scan of every module, fault codes with their freeze-frame data, live data with the engine running, and in-depth photos and video of the fault and any work that was done.",
  },
  {
    title: "Your written report",
    detail: "My findings and my opinion on the most likely cause, laid out so a garage, a dealer or a judge can follow it, with a signed statement of truth.",
  },
]

const GOOD_TO_KNOW = [
  {
    icon: Lock,
    label: "The engine stays sealed",
    note: "I leave the engine sealed so nobody can say the evidence was disturbed. If something needs opening up to confirm it, the report says exactly what to look for.",
  },
  {
    icon: FileSignature,
    label: "A signed statement, not a court visit",
    note: "The signed statement of truth goes with your claim. I don't attend hearings.",
  },
]

const faqs = [
  {
    question: "How much is a mechanical inspection?",
    answer: `£499.99, paid when you book. The price is the same wherever the car is across ${SERVICE_AREA.short}, with no call-out or mileage charge.`,
  },
  {
    question: "Are you connected to any garage or dealer?",
    answer: "No. I'm independent, so the report says what the evidence shows, whichever way that goes.",
  },
  {
    question: "Can you tell if the fault was there when I bought the car?",
    answer:
      "I can't promise that before I've seen the car. The report sets out what the car has stored, what the live data shows and what can be seen, with my opinion on the most likely cause. If the evidence doesn't show when it started, the report says so.",
  },
  {
    question: "Will you take the engine apart?",
    answer:
      "No. I leave the engine sealed so nobody can say the evidence was disturbed. The report covers what the diagnostics, the live data and the photos show, and if something needs opening up to confirm it, the report says exactly what to look for.",
  },
  {
    question: "Will the report say the garage or dealer is at fault?",
    answer:
      "It sets out what I found and my opinion on the most likely cause. It is independent, so it says what the evidence shows, whichever way that goes.",
  },
  {
    question: "Can I use the report in a Small Claims case?",
    answer:
      "Yes. You get a signed statement of truth to go with your claim if the garage or dealer won't put it right. I don't attend court hearings.",
  },
  {
    question: "Is this the same as a pre-purchase inspection?",
    answer:
      "No. The mechanical inspection is for a car you already own that has a problem. If you're buying a used car, book a Standard (£249.99) or Premium (£299.99) pre-purchase inspection instead.",
  },
]

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Mechanical Inspection",
  serviceType: "Independent vehicle fault inspection",
  url: `${SITE_URL}/mechanical-inspection`,
  description:
    "Independent, unbiased inspection of a fault after garage work or after buying from a dealer: full diagnostic scan with live data, photos and video, a written report on the findings and likely cause, and a signed statement of truth for a Small Claims case.",
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
    price: "499.99",
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
        Book Mechanical: £499.99 <ArrowRight className="ml-2 h-5 w-5" />
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
                <Scale className="h-4 w-4" /> Independent, unbiased fault report
              </div>
              <h1 className="text-balance text-4xl font-bold leading-tight text-foreground sm:text-5xl lg:text-6xl">
                Independent mechanical inspection
              </h1>
              <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-muted-foreground sm:text-xl lg:mx-0">
                Something has gone wrong after a garage worked on your car, or soon after you bought it from a dealer. I work for neither side. I inspect the car and write up what the evidence shows, whichever way that goes.
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
              <p className="mt-1 text-5xl font-bold tracking-tight">£499.99</p>
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
              <p className="mt-3 text-lg text-muted-foreground">When the garage or the dealer says it&apos;s nothing to do with them.</p>
            </div>
            <div className="grid items-center gap-6 lg:grid-cols-[1fr_380px]">
              <div className="space-y-7">
                {JOB_GROUPS.map((group) => (
                  <div key={group.title}>
                    <h3 className="flex items-center gap-2 text-sm font-bold uppercase tracking-wide text-primary">
                      <group.icon className="h-5 w-5" /> {group.title}
                    </h3>
                    <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
                      {group.jobs.map((job) => (
                        <div key={job} className="rounded-2xl border border-primary/15 bg-primary/5 px-5 py-4">
                          <p className="font-semibold leading-snug">{job}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              {/* Henry's own photo from a real job. */}
              <div className="mx-auto w-full max-w-md overflow-hidden rounded-2xl border border-border bg-white shadow-sm lg:max-w-none">
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
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-border bg-white py-12 sm:py-16">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-5xl">
            <div className="mx-auto mb-8 max-w-3xl text-center">
              <h2 className="text-balance text-3xl font-bold sm:text-4xl">What you get</h2>
              <p className="mt-3 text-lg text-muted-foreground">Independent evidence you can put in front of the garage or the dealer.</p>
            </div>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {MECHANICAL_ITEMS.map((item, i) => {
                const Icon = ITEM_ICONS[i] ?? ClipboardList
                return (
                  // On a phone the icon sits beside the words, so six tiles stay short.
                  <div key={item.label} className="flex items-start gap-4 rounded-2xl border bg-white p-5 shadow-sm sm:block sm:p-6">
                    <Icon className="h-8 w-8 shrink-0 text-primary sm:h-9 sm:w-9" />
                    <div>
                      <h3 className="text-lg font-bold leading-snug sm:mt-4 sm:text-xl">{item.label}</h3>
                      {item.note && <p className="mt-1 text-sm leading-relaxed text-muted-foreground sm:mt-2">{item.note}</p>}
                    </div>
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
              <ul className="space-y-5">
                {GOOD_TO_KNOW.map((item) => (
                  <li key={item.label} className="flex items-start gap-3">
                    <item.icon className="mt-0.5 h-6 w-6 shrink-0 text-primary" />
                    <span>
                      <span className="block font-semibold leading-snug">{item.label}</span>
                      <span className="mt-1 block text-sm leading-relaxed text-muted-foreground">{item.note}</span>
                    </span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-3xl border border-primary/20 bg-primary/5 p-6 sm:p-7">
              <h2 className="text-2xl font-bold">Buying a car instead?</h2>
              <p className="mt-3 text-muted-foreground">
                The mechanical inspection is for a car you already own. If you&apos;re about to buy one, my pre-purchase inspections check the whole car before you pay.
              </p>
              <p className="mt-3 font-semibold">Standard £249.99 · Premium £299.99</p>
              <Link href="/book" className="mt-4 inline-flex min-h-11 items-center font-bold text-primary underline underline-offset-4">
                See the pre-purchase inspections
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Every area has its own mechanical inspection page: the map and the links to them. */}
      <section className="border-t border-border bg-white py-12 sm:py-16">
        <div className="container mx-auto max-w-6xl px-4">
          <LocalAreaLinks service="mechanical" />
        </div>
      </section>

      <section className="border-t border-border bg-white py-12 sm:py-16">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl">
            <h2 className="mb-8 text-center text-3xl font-bold sm:text-4xl">Mechanical inspection FAQs</h2>
            <div className="space-y-3">
              {faqs.map((faq) => (
                <details key={faq.question} className="group rounded-2xl border bg-white">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-3 p-4 text-lg font-bold sm:p-5 [&::-webkit-details-marker]:hidden">
                    {faq.question}
                    <ChevronDown className="h-5 w-5 shrink-0 transition-transform group-open:rotate-180" />
                  </summary>
                  <p className="-mt-1 px-4 pb-4 text-sm leading-relaxed text-muted-foreground sm:-mt-2 sm:px-5 sm:pb-5">{faq.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-border bg-primary/5 py-12 sm:py-16">
        <div className="container mx-auto px-4 text-center">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-balance text-3xl font-bold sm:text-4xl">Get the evidence before you go back to the garage or dealer</h2>
            <p className="mt-4 text-lg text-muted-foreground">Book in a couple of minutes and choose your exact time.</p>
            <div className="mt-7">
              <BookButtons centred />
            </div>
          </div>
        </div>
      </section>
      <ReviewsSlider />
    </main>
  )
}
