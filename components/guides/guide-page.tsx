import Link from "next/link"
import { ArrowRight, CalendarDays, ChevronDown } from "lucide-react"
import { AuthorCard, AUTHOR } from "@/components/guides/author-card"
import { formatDate, renderInline } from "@/components/guides/inline"
import { areaPath, areas, type Area } from "@/lib/areas"
import { evModelPath, evModels, type EvModel } from "@/lib/ev-models"
import { guidePath, guides, type Guide, type GuideBlock } from "@/lib/guides"

const BRAND = "Pro Vehicle Inspections"
const SITE_URL = "https://www.provehicleinspections.com"

function Block({ block }: { block: GuideBlock }) {
  switch (block.type) {
    case "h2":
      return <h2 className="mt-10 text-2xl font-bold sm:text-3xl">{block.text}</h2>
    case "h3":
      return <h3 className="mt-7 text-xl font-bold">{block.text}</h3>
    case "p":
      return <p className="mt-4 leading-relaxed text-muted-foreground">{renderInline(block.text)}</p>
    case "note":
      return (
        <p className="mt-5 rounded-2xl border border-primary/15 bg-primary/5 p-4 text-sm leading-relaxed text-foreground">{renderInline(block.text)}</p>
      )
    case "ul":
      return (
        <ul className="mt-4 space-y-2 pl-5">
          {block.items.map((item) => (
            <li key={item} className="list-disc leading-relaxed text-muted-foreground">
              {renderInline(item)}
            </li>
          ))}
        </ul>
      )
    case "ol":
      return (
        <ol className="mt-4 space-y-2 pl-5">
          {block.items.map((item) => (
            <li key={item} className="list-decimal leading-relaxed text-muted-foreground">
              {renderInline(item)}
            </li>
          ))}
        </ol>
      )
    case "table":
      return (
        <div className="mt-5 overflow-x-auto rounded-2xl border border-border">
          <table className="w-full min-w-[560px] text-left text-sm">
            {block.caption && <caption className="px-4 py-3 text-left text-sm font-semibold text-foreground">{block.caption}</caption>}
            <thead className="bg-muted/40">
              <tr>
                {block.head.map((cell) => (
                  <th key={cell} className="px-4 py-3 font-bold">
                    {cell}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {block.rows.map((row, index) => (
                <tr key={index} className="border-t border-border align-top">
                  {row.map((cell, cellIndex) => (
                    <td key={cellIndex} className={`px-4 py-3 ${cellIndex === 0 ? "font-semibold text-foreground" : "text-muted-foreground"}`}>
                      {renderInline(cell)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )
  }
}

export function GuidePage({ guide }: { guide: Guide }) {
  const url = `${SITE_URL}${guidePath(guide)}`
  const related = guide.related.map((slug) => guides.find((other) => other.slug === slug)).filter((other): other is Guide => Boolean(other))
  const relatedAreas = (guide.areas ?? []).map((slug) => areas.find((area) => area.slug === slug)).filter((area): area is Area => area !== undefined)
  const relatedModels = (guide.models ?? []).map((slug) => evModels.find((model) => model.slug === slug)).filter((model): model is EvModel => model !== undefined)

  const structuredData: Record<string, unknown>[] = [
    {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: guide.question,
      description: guide.description,
      url,
      mainEntityOfPage: url,
      datePublished: guide.published,
      dateModified: guide.updated,
      image: `${SITE_URL}/images/inspection-car.jpg`,
      author: { "@type": "Person", name: AUTHOR.name, jobTitle: AUTHOR.role, url: `${SITE_URL}/#business` },
      publisher: { "@id": `${SITE_URL}/#business` },
      inLanguage: "en-GB",
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
        { "@type": "ListItem", position: 2, name: "Guides", item: `${SITE_URL}/guides` },
        { "@type": "ListItem", position: 3, name: guide.question, item: url },
      ],
    },
  ]
  if (guide.faqs?.length) {
    structuredData.push({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: guide.faqs.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: { "@type": "Answer", text: faq.answer },
      })),
    })
  }

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
              <Link href="/guides" className="hover:underline">
                Guides
              </Link>
            </nav>
            <h1 className="mt-4 text-balance text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl">{guide.question}</h1>
            <p className="mt-5 text-lg leading-relaxed text-foreground sm:text-xl">{renderInline(guide.answer)}</p>
            <p className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted-foreground">
              <span>By {AUTHOR.name}, {BRAND}</span>
              <span className="inline-flex items-center gap-1.5">
                <CalendarDays className="h-4 w-4 text-primary" /> Last checked {formatDate(guide.updated)}
              </span>
            </p>
          </div>
        </div>
      </section>

      <article className="py-10 sm:py-14">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-[17px]">
            {guide.blocks.map((block, index) => (
              <Block key={index} block={block} />
            ))}

            {guide.faqs && guide.faqs.length > 0 && (
              <section className="mt-12">
                <h2 className="text-2xl font-bold sm:text-3xl">Questions people ask</h2>
                <div className="mt-5 space-y-3">
                  {guide.faqs.map((faq) => (
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
            )}

            {guide.sources && guide.sources.length > 0 && (
              <section className="mt-12">
                <h2 className="text-xl font-bold">Sources</h2>
                <ul className="mt-3 space-y-1.5 text-sm">
                  {guide.sources.map((source) => (
                    <li key={source.href}>
                      <a href={source.href} target="_blank" rel="noopener noreferrer" className="text-primary underline underline-offset-4">
                        {source.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            <div className="mt-12">
              <AuthorCard checked={formatDate(guide.updated)} />
            </div>

            {(related.length > 0 || relatedModels.length > 0 || relatedAreas.length > 0) && (
              <section className="mt-12 grid gap-6 sm:grid-cols-2">
                {related.length > 0 && (
                  <div>
                    <h2 className="text-lg font-bold">Related guides</h2>
                    <ul className="mt-3 space-y-2">
                      {related.map((other) => (
                        <li key={other.slug}>
                          <Link href={guidePath(other)} className="inline-flex items-start gap-1.5 text-sm font-semibold text-primary hover:underline">
                            <ArrowRight className="mt-0.5 h-4 w-4 shrink-0" /> {other.question}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                {relatedModels.length > 0 && (
                  <div>
                    <h2 className="text-lg font-bold">Battery notes by model</h2>
                    <ul className="mt-3 space-y-2">
                      {relatedModels.map((model) => (
                        <li key={model.slug}>
                          <Link href={evModelPath(model)} className="inline-flex items-start gap-1.5 text-sm font-semibold text-primary hover:underline">
                            <ArrowRight className="mt-0.5 h-4 w-4 shrink-0" /> {model.name} battery health
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                {relatedAreas.length > 0 && (
                  <div>
                    <h2 className="text-lg font-bold">Where we inspect</h2>
                    <ul className="mt-3 space-y-2">
                      {relatedAreas.map((area) => (
                        <li key={area.slug}>
                          <Link href={areaPath(area)} className="inline-flex items-start gap-1.5 text-sm font-semibold text-primary hover:underline">
                            <ArrowRight className="mt-0.5 h-4 w-4 shrink-0" /> {area.h1}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </section>
            )}
          </div>
        </div>
      </article>

      <section className="border-t border-border py-12 sm:py-16">
        <div className="container mx-auto max-w-4xl rounded-3xl border border-primary/15 bg-primary/5 px-4 py-10 text-center sm:px-10">
          <h2 className="text-balance text-3xl font-bold sm:text-4xl">Found the car? Have it inspected before you pay.</h2>
          <p className="mx-auto mt-3 max-w-2xl text-lg text-muted-foreground">
            Standard £199.99, Premium £249.99, EV battery check £99.99. We come to the car anywhere in our area and you get the video, photos and report the same day.
          </p>
          <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link href="/book" className="inline-flex min-h-12 items-center rounded-xl bg-primary px-7 text-base font-bold text-white hover:bg-primary/90">
              Book an inspection <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            <Link href="/sample-report" className="inline-flex min-h-12 items-center rounded-xl border border-primary/30 px-7 text-base font-bold text-primary hover:bg-primary/10">
              See a sample report
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
