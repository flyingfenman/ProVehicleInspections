import Image from "next/image"
import { Camera } from "lucide-react"
import type { RealReport } from "@/lib/sample-reports/types"

export function RealReportPhotos({ report }: { report: RealReport }) {
  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8 sm:mb-10 lg:mb-12 space-y-3 sm:space-y-4">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold">Photo Report</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {report.photos.length} of the {report.photoCount} photos from this inspection. Tap a photo to see it full
            size.
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
            {report.photos.map((photo) => (
              <a
                key={photo.src}
                href={photo.src}
                target="_blank"
                rel="noopener"
                className="group relative block aspect-[4/3] rounded-xl overflow-hidden shadow-md border border-border bg-white"
              >
                <Image
                  src={photo.src}
                  alt={`Range Rover Sport inspection photo: ${photo.caption}`}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  style={{ objectPosition: photo.position ?? "center" }}
                  sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
                />
                <div className="absolute inset-x-0 bottom-0 bg-black/60 px-3 py-2">
                  <p className="text-xs font-semibold text-white">{photo.caption}</p>
                </div>
              </a>
            ))}
          </div>

          <div className="mt-8 flex items-start justify-center gap-2 text-center">
            <Camera className="w-5 h-5 text-primary flex-shrink-0" />
            <p className="text-sm text-muted-foreground max-w-2xl">
              The car&apos;s registration is covered with our own plate, and other cars&apos; plates and signs in the
              background are blurred. The customer also had the inspection video, which isn&apos;t shown here.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
