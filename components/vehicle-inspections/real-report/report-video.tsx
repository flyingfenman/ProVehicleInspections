import s from "./report.module.css"

// Where the customer report has its inspection video. Henry asked (5 Nov 2026) for the video itself not to be shown
// on the sample for privacy, with a mock player and a line making clear every report comes with an informative video.
export function RealReportVideo() {
  return (
    <section className={s.section} id="inspection-video">
      <div className={s.inner}>
        <div className={s.head}>
          <h2 className={s.headTitle}>Inspection Video</h2>
          <p className={s.headText}>Filmed during the inspection.</p>
        </div>
        <div className={`${s.card} ${s.videoCard}`}>
          <div className={s.videoMock} role="img" aria-label="Inspection video, not shown on this sample for privacy">
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
