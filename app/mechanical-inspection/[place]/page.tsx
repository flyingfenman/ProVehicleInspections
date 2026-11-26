import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { LocalMechanicalPage } from "@/components/vehicle-inspections/local-mechanical-page"
import { areas } from "@/lib/areas"
import { getMechanicalArea, mechanicalAreaDescription, mechanicalAreaPath, mechanicalAreaTitle, mechanicalPlace } from "@/lib/areas/mechanical"

// The mechanical inspection by area: one page per city and county in lib/areas, the same list the pre-purchase area
// pages use. Only those places exist; anything else under /mechanical-inspection is a 404.

interface Props {
  params: Promise<{ place: string }>
}

export const dynamicParams = false

export function generateStaticParams() {
  return areas.map((area) => ({ place: mechanicalPlace(area) }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { place } = await params
  const area = getMechanicalArea(place)
  if (!area) return {}
  const path = mechanicalAreaPath(area)
  const title = `${mechanicalAreaTitle(area)} | Pro Vehicle Inspections`
  return {
    title,
    description: mechanicalAreaDescription(area),
    alternates: { canonical: path },
    openGraph: {
      title,
      description: mechanicalAreaDescription(area),
      url: path,
      type: "website",
      images: ["/images/share-inspection.jpg"],
    },
  }
}

export default async function MechanicalAreaPage({ params }: Props) {
  const { place } = await params
  const area = getMechanicalArea(place)
  if (!area) notFound()

  return <LocalMechanicalPage area={area} />
}
