// A blank, light grey bar where a customer detail has been taken out of a real report.
export function Removed({ label = "Removed for privacy" }: { label?: string }) {
  return (
    <span className="inline-flex align-middle">
      <span aria-hidden="true" className="inline-block h-4 w-24 rounded bg-gray-200" />
      <span className="sr-only">{label}</span>
    </span>
  )
}
