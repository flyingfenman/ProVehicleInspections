"use client"

import Image from "next/image"
import { useCallback, useEffect, useRef, useState } from "react"
import type { ReportPhoto } from "@/lib/sample-reports/types"
import s from "./report.module.css"

// The report's photo grid and its full-screen viewer: tap a photo to enlarge it, then use the arrows, the keyboard or
// a swipe to move through the gallery. Each tile is still a plain link to the photo, so it works without JavaScript.
export function RealReportPhotos({ photos, photoCount }: { photos: ReportPhoto[]; photoCount: number }) {
  const [open, setOpen] = useState<number | null>(null)
  const closeButton = useRef<HTMLButtonElement>(null)
  const touchStart = useRef<number | null>(null)

  const close = useCallback(() => setOpen(null), [])
  const step = useCallback(
    (by: number) => setOpen((index) => (index === null ? null : (index + by + photos.length) % photos.length)),
    [photos.length],
  )

  useEffect(() => {
    if (open === null) return
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = "hidden"
    closeButton.current?.focus()
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") close()
      if (event.key === "ArrowLeft") step(-1)
      if (event.key === "ArrowRight") step(1)
    }
    window.addEventListener("keydown", onKey)
    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener("keydown", onKey)
    }
  }, [open, close, step])

  const current = open === null ? null : photos[open]

  return (
    <section className={`${s.section} ${s.soft}`}>
      <div className={s.inner}>
        <div className={s.head}>
          <h2 className={s.headTitle}>Photo Report</h2>
          <p className={s.headText}>
            {photos.length} of the {photoCount} photos from this inspection. Tap any photo to enlarge it, then
            swipe through the gallery.
          </p>
        </div>

        <div className={s.photos}>
          {photos.map((photo, index) => (
            <a
              key={photo.src}
              href={photo.src}
              className={s.photo}
              onClick={(event) => {
                event.preventDefault()
                setOpen(index)
              }}
            >
              <Image
                src={photo.src}
                alt={`Range Rover Sport inspection photo: ${photo.caption}`}
                fill
                sizes="(min-width: 1040px) 250px, (min-width: 820px) 25vw, 50vw"
                className={s.photoImage}
                style={{ objectPosition: photo.position ?? "center" }}
              />
              <span className={s.cap}>{photo.caption}</span>
            </a>
          ))}
        </div>

        <p className={s.galleryHint}>
          The car&apos;s registration is covered with our own plate, and other cars&apos; plates and signs in the
          background are blurred. The customer also had the inspection video, which isn&apos;t shown here.
        </p>
      </div>

      {current && open !== null && (
        <div
          className={s.lightbox}
          role="dialog"
          aria-modal="true"
          aria-label="Inspection photos"
          onClick={(event) => {
            if (event.target === event.currentTarget) close()
          }}
          onTouchStart={(event) => {
            touchStart.current = event.touches[0]?.clientX ?? null
          }}
          onTouchEnd={(event) => {
            const start = touchStart.current
            const end = event.changedTouches[0]?.clientX
            touchStart.current = null
            if (start === null || end === undefined || Math.abs(end - start) < 40) return
            step(end < start ? 1 : -1)
          }}
        >
          <div className={s.lightboxCount}>
            {open + 1} / {photos.length}
          </div>
          <button
            ref={closeButton}
            type="button"
            className={`${s.lightboxButton} ${s.lightboxClose}`}
            onClick={close}
            aria-label="Close"
          >
            ×
          </button>
          <button
            type="button"
            className={`${s.lightboxButton} ${s.lightboxNav} ${s.lightboxPrev}`}
            onClick={() => step(-1)}
            aria-label="Previous photo"
          >
            ‹
          </button>
          <div
            className={s.lightboxStage}
            onClick={(event) => {
              if (event.target === event.currentTarget) close()
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element -- full-size photo at its natural shape */}
            <img src={current.src} alt={current.caption} className={s.lightboxImage} />
          </div>
          <button
            type="button"
            className={`${s.lightboxButton} ${s.lightboxNav} ${s.lightboxNext}`}
            onClick={() => step(1)}
            aria-label="Next photo"
          >
            ›
          </button>
          <div className={s.lightboxCaption}>{current.caption}</div>
        </div>
      )}
    </section>
  )
}
