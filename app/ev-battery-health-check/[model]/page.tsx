import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { EvModelPage } from "@/components/ev/ev-model-page"
import { evModelPath, evModels, getEvModel } from "@/lib/ev-models"

export const dynamicParams = false

export function generateStaticParams() {
  return evModels.map((model) => ({ model: model.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ model: string }> }): Promise<Metadata> {
  const { model: slug } = await params
  const model = getEvModel(slug)
  if (!model) return {}
  const title = `${model.title} | Pro Vehicle Inspections`
  return {
    title,
    description: model.description,
    alternates: { canonical: evModelPath(model) },
    openGraph: {
      title,
      description: model.description,
      url: evModelPath(model),
      type: "article",
      modifiedTime: model.updated,
      images: ["/images/inspection-car.jpg"],
    },
  }
}

export default async function EvModelRoute({ params }: { params: Promise<{ model: string }> }) {
  const { model: slug } = await params
  const model = getEvModel(slug)
  if (!model) notFound()
  return <EvModelPage model={model} />
}
