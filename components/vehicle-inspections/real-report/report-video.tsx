import Image from "next/image"
import s from "./report.module.css"

// Where the customer report has its inspection video. Henry asked (5 Nov 2026) for the video itself not to be shown
// on the sample for privacy, with a mock player and a line making clear every report comes with an informative video.
// The still behind the play button is Henry's own road-test photo (5 Nov 2026), cropped to the windscreen and dashboard,
// with the number plates ahead and a windscreen reflection blurred. Henry asked for the photo to fill the whole box with
// no white round it, a bit darker, with the play button over it, so the box has no card padding and the note sits under it.
export function RealReportVideo() {
  return (
    <section className={s.section} id="inspection-video">
      <div className={s.inner}>
        <div className={s.head}>
          <h2 className={s.headTitle}>Inspection Video</h2>
          <p className={s.headText}>Filmed during the inspection.</p>
        </div>
        <div className={s.videoCard}>
          <div className={s.videoMock} role="img" aria-label="Inspection video, not shown on this sample for privacy">
            <Image
              src="/images/sample-report/range-rover-sport/video-still.webp"
              alt=""
              fill
              sizes="(max-width: 820px) 100vw, 780px"
              className={s.videoStill}
            />
            <span className={s.videoPlay} aria-hidden="true" />
            <span className={s.videoMockText}>Your inspection video plays here</span>
          </div>
          <p className={s.videoNote}>
            Every report includes an informative inspection video that talks you through the car: the walk round and
            bodywork, the engine and exhaust on start-up, the road test, and what each finding means in plain English.
            The video from this inspection isn&apos;t shown here for privacy reasons.
          </p>
        </div>
      </div>
    </section>
  )
}
