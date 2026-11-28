import { InspectionIcon, type CheckItem } from "@/components/vehicle-inspections/sections/what-we-check"

// What the mechanical inspection looks at, shown with the icons from the pre-purchase "What we check" grid. Each icon
// is the closest match in that set (the `icon` file name is the original, the `title` is what it is called here), so
// the labels differ from the pre-purchase ones on purpose. Everything here is read by the scan tool, read from live
// data, or photographed or filmed: nothing means opening the engine, taking covers, trim or wheels off, or any test
// that needs the engine apart. Keep it that way if icons are added.
const ITEMS: CheckItem[] = [
  { title: "Warning lights and fault codes", icon: "dashboard" },
  { title: "Live data with the engine running", icon: "fuel-temperature-gauges" },
  { title: "Fuel system readings", icon: "fuel-system" },
  { title: "Cooling system readings", icon: "cooling-fan" },
  { title: "Battery and charging voltage", icon: "battery" },
  { title: "Gearbox and drivetrain scan", icon: "transfer-case" },
  { title: "Brakes and ABS scan", icon: "brake-pad-rotor" },
  { title: "Steering system scan", icon: "power-steering" },
  { title: "Leaks you can see", icon: "engine-transmission-leaks" },
  { title: "Engine noise on video", icon: "engine-valve-noise" },
]

export function MechanicalWhatWeCheck({ className = "border-t bg-slate-50" }: { className?: string } = {}) {
  return (
    <section className={`py-12 sm:py-16 ${className}`}>
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-primary">What&apos;s covered</p>
          <h2 className="mt-3 text-balance text-3xl font-bold sm:text-4xl">What I look at on your car</h2>
          <p className="mt-4 text-lg text-muted-foreground">
            A few of the things I look at. The scan covers every module the car has, and the readings, photos and video all go in your report.
          </p>
        </div>

        <div className="mx-auto mt-9 max-w-5xl rounded-3xl border border-border bg-white p-5 shadow-sm sm:p-7">
          <div className="grid grid-cols-2 gap-x-3 gap-y-5 md:grid-cols-3 md:gap-x-5 lg:grid-cols-4">
            {ITEMS.map((item) => (
              <InspectionIcon key={item.title} item={item} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
