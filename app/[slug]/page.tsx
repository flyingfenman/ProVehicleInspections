import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { LocalInspectionPage } from "@/components/vehicle-inspections/local-inspection-page"
import { TestimonialsSection } from "@/components/testimonials-section"
import { areaPath, areas, getArea } from "@/lib/areas"

// The area pages: one per city and county we cover, all from lib/areas. Only the slugs listed there exist; anything
// else at the top level is a 404.

interface Props {
  params: Promise<{ slug: string }>
}

export const dynamicParams = false

export function generateStaticParams() {
  return areas.map((area) => ({ slug: area.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const area = getArea(slug)
  if (!area) return {}
  const path = areaPath(area)
  return {
    title: `${area.title} | Pro Vehicle Inspections`,
    description: area.description,
    alternates: { canonical: path },
    openGraph: {
      title: `${area.title} | Pro Vehicle Inspections`,
      description: area.description,
      url: path,
      type: "website",
      images: ["/images/inspection-car.jpg"],
    },
  }
}

export default async function AreaPage({ params }: Props) {
  const { slug } = await params
  const area = getArea(slug)
  if (!area) notFound()

  return <LocalInspectionPage area={area} localProof={area.showTestimonials ? <TestimonialsSection /> : undefined} />
}
