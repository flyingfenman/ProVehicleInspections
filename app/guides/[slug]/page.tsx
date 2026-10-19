import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { GuidePage } from "@/components/guides/guide-page"
import { getGuide, guidePath, guides } from "@/lib/guides"

export const dynamicParams = false

export function generateStaticParams() {
  return guides.map((guide) => ({ slug: guide.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const guide = getGuide(slug)
  if (!guide) return {}
  const title = `${guide.title} | Pro Vehicle Inspections`
  return {
    title,
    description: guide.description,
    alternates: { canonical: guidePath(guide) },
    openGraph: {
      title,
      description: guide.description,
      url: guidePath(guide),
      type: "article",
      publishedTime: guide.published,
      modifiedTime: guide.updated,
      images: ["/images/inspection-car.jpg"],
    },
  }
}

export default async function GuideRoute({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const guide = getGuide(slug)
  if (!guide) notFound()
  return <GuidePage guide={guide} />
}
