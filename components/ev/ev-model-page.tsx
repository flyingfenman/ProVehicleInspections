import Link from "next/link"
import { ArrowRight, BatteryCharging, CalendarDays, ChevronDown, CircleAlert, Search, ShieldCheck } from "lucide-react"
import { AuthorCard, AUTHOR } from "@/components/guides/author-card"
import { formatDate, renderInline } from "@/components/guides/inline"
import { evModelPath, evModels, type EvModel } from "@/lib/ev-models"
import { guidePath, guides, type Guide } from "@/lib/guides"

const SITE_URL = "https://www.provehicleinspections.com"
const EV_GUIDE_SLUGS = ["how-to-check-ev-battery-health-before-you-buy", "how-long-do-electric-car-batteries-last"]

export function EvModelPage({ model }: { model: EvModel }) {
  const url = `${SITE_URL}${evModelPath(model)}`
  const related = model.related.map((slug) => evModels.find((other) => other.slug === slug)).filter((other): other is EvModel => Boolean(other))
  const evGuides = EV_GUIDE_SLUGS.map((slug) => guides.find((guide) => guide.slug === slug)).filter((guide): guide is Guide => guide !== undefined)

  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: `${model.name} battery health: what to check before you buy`,
      description: model.description,
      url,
      mainEntityOfPage: url,
      datePublished: model.updated,
      dateModified: model.updated,
      image: `${SITE_URL}/images/inspection-car.jpg`,
      about: { "@type": "Car", name: model.name, vehicleEngine: { "@type": "EngineSpecification", fuelType: "Electric" } },
      author: { "@type": "Person", name: AUTHOR.name, jobTitle: AUTHOR.role, url: `${SITE_URL}/#business` },
      publisher: { "@id": `${SITE_URL}/#business` },
      inLanguage: "en-GB",
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: model.faqs.map((faq) => ({
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
        { "@type": "ListItem", position: 2, name: "EV battery health check", item: `${SITE_URL}/ev-battery-health-check` },
        { "@type": "ListItem", position: 3, name: `${model.name} battery health`, item: url },
      ],
    },
  ]

  return (
    <main className="bg-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />

      <section className="border-b border-border bg-primary/5 py-12 sm:py-16">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl">
            <nav aria-label="Breadcrumb" className="text-sm text-muted-foreground">
              <Link href="/" className="hover:underline">
                Home
              </Link>
              <span className="mx-2">/</span>
              <Link href="/ev-battery-health-check" className="hover:underline">
                EV battery health check
              </Link>
            </nav>
            <h1 className="mt-4 text-balance text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl">
              Used {model.name} battery health: what to check before you buy
            </h1>
            <p className="mt-2 text-sm font-semibold text-primary">{model.years}</p>
            <p className="mt-5 text-lg leading-relaxed text-foreground sm:text-xl">{renderInline(model.summary)}</p>
            <p className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted-foreground">
              <span>By {AUTHOR.name}, Pro Vehicle Inspections</span>
              <span className="inline-flex items-center gap-1.5">
                <CalendarDays className="h-4 w-4 text-primary" /> Last checked {formatDate(model.updated)}
              </span>
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Link href="/book?package=ev" className="inline-flex min-h-12 items-center justify-center rounded-xl bg-primary px-6 font-bold text-white hover:bg-primary/90">
                Book the battery check: £149.99 <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <Link href="/book" className="inline-flex min-h-12 items-center justify-center rounded-xl border border-border bg-white px-6 font-bold hover:bg-muted/40">
                Full inspection + battery report
              </Link>
            </div>
          </div>
        </div>
      </section>

      <article className="py-10 sm:py-14">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-[17px]">
            <h2 className="flex items-center gap-2 text-2xl font-bold sm:text-3xl">
              <BatteryCharging className="h-7 w-7 text-primary" /> Battery sizes and range
            </h2>
            <div className="mt-5 overflow-x-auto rounded-2xl border border-border">
              <table className="w-full min-w-[520px] text-left text-sm">
                <thead className="bg-muted/40">
                  <tr>
                    <th className="px-4 py-3 font-bold">Version</th>
                    <th className="px-4 py-3 font-bold">Battery</th>
                    <th className="px-4 py-3 font-bold">Official range when new</th>
                  </tr>
                </thead>
                <tbody>
                  {model.batteries.map((battery) => (
                    <tr key={battery.version} className="border-t border-border align-top">
                      <td className="px-4 py-3 font-semibold text-foreground">{battery.version}</td>
                      <td className="px-4 py-3 text-muted-foreground">{battery.capacity}</td>
                      <td className="px-4 py-3 text-muted-foreground">{battery.range}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-3 text-sm text-muted-foreground">Gross is the pack as built; usable is what the car lets you use. Official range is the WLTP or NEDC figure when new, which real driving rarely matches.</p>

            <h2 className="mt-10 text-2xl font-bold sm:text-3xl">Battery warranty</h2>
            <p className="mt-4 leading-relaxed text-muted-foreground">{renderInline(model.warranty)}</p>

            <h2 className="mt-10 text-2xl font-bold sm:text-3xl">Does the car show its own battery health?</h2>
            <p className="mt-4 leading-relaxed text-muted-foreground">{renderInline(model.sohDisplay)}</p>

            <h2 className="mt-10 flex items-center gap-2 text-2xl font-bold sm:text-3xl">
              <CircleAlert className="h-7 w-7 text-primary" /> What goes wrong, and the recalls
            </h2>
            <ul className="mt-4 space-y-3">
              {model.knownIssues.map((issue) => (
                <li key={issue} className="flex items-start gap-3 leading-relaxed text-muted-foreground">
                  <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-primary" />
                  <span>{renderInline(issue)}</span>
                </li>
              ))}
            </ul>

            <h2 className="mt-10 flex items-center gap-2 text-2xl font-bold sm:text-3xl">
              <Search className="h-7 w-7 text-primary" /> What we check on a used {model.name}
            </h2>
            <ul className="mt-4 space-y-3">
              {model.whatWeCheck.map((item) => (
                <li key={item} className="flex items-start gap-3 leading-relaxed text-muted-foreground">
                  <ShieldCheck className="mt-1 h-5 w-5 shrink-0 text-primary" />
                  <span>{renderInline(item)}</span>
                </li>
              ))}
            </ul>
            <p className="mt-5 rounded-2xl border border-primary/15 bg-primary/5 p-4 text-sm leading-relaxed">
              The battery State of Health test is the CARA Approved Autel procedure, which reads the battery management system and reports pack health as a percentage with module and cell data. It takes minutes at the car. It is not a full charge and discharge capacity test, and we say so on every report. £149.99 on its own, or £49.99 added to a{" "}
              <Link href="/book" className="font-semibold text-primary underline underline-offset-4">
                Standard or Premium inspection
              </Link>
              .
            </p>

            <section className="mt-12">
              <h2 className="text-2xl font-bold sm:text-3xl">Questions {model.name} buyers ask</h2>
              <div className="mt-5 space-y-3">
                {model.faqs.map((faq) => (
                  <details key={faq.question} className="group rounded-2xl border border-border bg-white p-5">
                    <summary className="flex cursor-pointer list-none items-center justify-between gap-3 text-base font-bold">
                      {faq.question}
                      <ChevronDown className="h-5 w-5 shrink-0 text-primary transition group-open:rotate-180" />
                    </summary>
                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{faq.answer}</p>
                  </details>
                ))}
              </div>
            </section>

            <section className="mt-12">
              <h2 className="text-xl font-bold">Sources</h2>
              <ul className="mt-3 space-y-1.5 text-sm">
                {model.sources.map((source) => (
                  <li key={source.href}>
                    <a href={source.href} target="_blank" rel="noopener noreferrer" className="text-primary underline underline-offset-4">
                      {source.label}
                    </a>
                  </li>
                ))}
              </ul>
            </section>

            <div className="mt-12">
              <AuthorCard checked={formatDate(model.updated)} />
            </div>

            <section className="mt-12 grid gap-6 sm:grid-cols-2">
              <div>
                <h2 className="text-lg font-bold">Other models</h2>
                <ul className="mt-3 space-y-2">
                  {related.map((other) => (
                    <li key={other.slug}>
                      <Link href={evModelPath(other)} className="inline-flex items-start gap-1.5 text-sm font-semibold text-primary hover:underline">
                        <ArrowRight className="mt-0.5 h-4 w-4 shrink-0" /> {other.name} battery health
                      </Link>
                    </li>
                  ))}
                  <li>
                    <Link href="/ev-battery-health-check#models" className="inline-flex items-start gap-1.5 text-sm font-semibold text-primary hover:underline">
                      <ArrowRight className="mt-0.5 h-4 w-4 shrink-0" /> All models
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <h2 className="text-lg font-bold">EV battery guides</h2>
                <ul className="mt-3 space-y-2">
                  {evGuides.map((guide) => (
                    <li key={guide.slug}>
                      <Link href={guidePath(guide)} className="inline-flex items-start gap-1.5 text-sm font-semibold text-primary hover:underline">
                        <ArrowRight className="mt-0.5 h-4 w-4 shrink-0" /> {guide.question}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </section>
          </div>
        </div>
      </article>
    </main>
  )
}
