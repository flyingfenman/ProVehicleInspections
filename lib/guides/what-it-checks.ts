import type { Guide } from "./types"

export const whatItChecks: Guide = {
  slug: "what-does-a-pre-purchase-car-inspection-check",
  question: "What does a pre-purchase car inspection check?",
  title: "What Does a Pre-Purchase Car Inspection Check?",
  description:
    "The five areas a proper pre-purchase inspection covers, point by point: mechanical, exterior and paint, interior, the full diagnostic scan and the road test, plus the history check, what Premium adds, and what no inspection can do.",
  published: "2026-10-19",
  updated: "2026-10-19",
  answer:
    "A proper pre-purchase inspection checks the car in five areas: mechanical (engine, gearbox, brakes, steering, suspension, tyres, cooling and charging), exterior (bodywork, paint depth, lights, glass and signs of accident repair), interior (controls, seats, seatbelts, warning lights and electrics), a diagnostic scan of every control module, and a road test. The good ones also run a history check. Ours covers 160 points in the Standard package and 260 in the Premium, and takes 40 to 60 minutes or 70 to 90.",
  blocks: [
    { type: "h2", text: "Mechanical" },
    {
      type: "ul",
      items: [
        "Engine and transmission: leaks, mounts, valve noise, cold start behaviour, and how the gearbox takes up drive.",
        "Cooling: coolant condition and level, the recovery tank, the fan and the air conditioning condenser and compressor.",
        "Brakes: pad and disc condition at every corner, caliper leaks and corrosion from under-use.",
        "Steering and suspension: power steering, ball joints and tie rod ends, bushes, dampers and springs.",
        "Driveline: CV joints and boots, driveshafts, universal joints and, on four-wheel-drive cars, the transfer case.",
        "Tyres: tread depth and wear pattern across each tyre, age, brand matching and damage.",
        "Battery, alternator and the fuel system in operation.",
        "On electric and hybrid cars, the high-voltage, charging and battery management systems where the car supports it, and the optional [battery State of Health report](/guides/how-to-check-ev-battery-health-before-you-buy).",
      ],
    },
    { type: "h2", text: "Exterior" },
    {
      type: "ul",
      items: [
        "Paint depth readings on every panel, which is how filler and resprays are found. A factory finish reads in a narrow band; a filled or repainted panel does not.",
        "Signs of major body repair: panel gaps, overspray, replaced bolts, mismatched paint and new sealant.",
        "Scratches, dents and stone chips, recorded with photographs.",
        "Every light: headlights, tail lights, fog lamps, reverse lights, indicators, hazards and number plate lights.",
        "Doors, bonnet, boot and fuel flap operation, and the glass for chips and cracks.",
      ],
    },
    { type: "h2", text: "Interior" },
    {
      type: "ul",
      items: [
        "Warning lights at ignition on and once running, including the ones that should go out and the ones that should never come on.",
        "Seats, seatbelts and pretensioners, and the wear on the driver's seat, pedals and steering wheel against the mileage shown.",
        "Interior lights, windows, mirrors, locks, wipers, horn and the heating and air conditioning.",
        "Infotainment, cameras and parking sensors, which on a repaired car are often the first things that stop working.",
        "Signs of a working life: rear seat wear, plate holes and roof sign fixings on an ex-taxi, and damp or smells that point to a leak.",
      ],
    },
    { type: "h2", text: "The diagnostic scan" },
    {
      type: "p",
      text: "A generic OBD reader looks at the engine's emissions codes and nothing else. We scan every control module in the car with an Autel diagnostic tablet, and with VCDS on Volkswagen group cars, and we record the distance driven since the codes were last cleared. The BMW M4 we inspected in October 2026 showed zero codes on a generic scan, 170 km after a clear. The full scan found eight intermittent faults across seven modules. Nothing serious on that car, but the difference between the two scans is the difference between an inspection and a glance.",
    },
    { type: "h2", text: "The road test" },
    {
      type: "p",
      text: "Every inspection includes a road test, extended in the Premium package: cold start, idle, pulling away, gear changes under load, braking in a straight line, steering self-centring, noises over bumps and on lock, and how the car tracks hands-off on a flat road. The things that only show when the car is moving are the things a forecourt inspection misses.",
    },
    { type: "h2", text: "The history check" },
    {
      type: "p",
      text: "Both packages include a vehicle history check: outstanding finance, insurance write-off category, theft markers, mileage records and plate changes. Most national inspection services sell this separately or not at all; [HPI check vs car inspection](/guides/hpi-check-vs-car-inspection) has the comparison.",
    },
    { type: "h2", text: "What the Premium adds" },
    {
      type: "ul",
      items: [
        "Paint depth readings on every suitable panel and a deeper bodywork and condition assessment.",
        "Repair cost guidance and an action plan: what to fix now, within three months and later.",
        "Seller and logbook (V5C) checks, where the documents are available.",
        "Searches of auction, salvage and previous advert records, including Copart, which show what the car looked like before a repair.",
        "Checks for signs of undisclosed motor trading, which decide whether you have Consumer Rights Act protection.",
        "An extended road test.",
      ],
    },
    { type: "h2", text: "What no inspection can do" },
    {
      type: "ul",
      items: [
        "Dismantle anything. There is no compression test, no gearbox oil sample and no removal of trim. Every provider's terms say the same.",
        "See the future. An inspection records condition on the day; it cannot promise a clutch another 20,000 miles.",
        "Road test a car that cannot legally be on the road, such as an unregistered import or a car with no MOT. On those the road test is limited to private ground and the report says so.",
        "Find a fault code that has been cleared and has not yet returned. We record the distance since the clear, so you know how much to read into a clean scan.",
        "Work in the dark or in heavy rain. Paint readings and bodywork inspection need light and a dry surface, so we book daylight slots.",
      ],
    },
    { type: "h2", text: "What you get" },
    {
      type: "p",
      text: "A written report the same day with photographs and a video walk-round, the scan results, the paint readings in a Premium, a verdict, and a call to talk it through. [The sample report](/sample-report) shows the layout, and [what we inspect](/what-we-inspect) lists every point by group.",
    },
    {
      type: "note",
      text: "[Book a Standard inspection](/book) for £149.99 or [a Premium](/book?package=premium) for £199.99. Add the EV battery State of Health report to either for £49.99.",
    },
  ],
  faqs: [
    {
      question: "How long does a pre-purchase inspection take?",
      answer:
        "A Standard inspection takes 40 to 60 minutes at the car and a Premium 70 to 90, including the road test. The report follows the same day.",
    },
    {
      question: "Do you need the seller's permission?",
      answer:
        "Yes, and for the road test the seller needs to be happy for the car to be driven. Nearly every seller agrees; a seller who refuses an inspection is telling you something about the car.",
    },
    {
      question: "Do you put the car on a ramp?",
      answer:
        "No. We are mobile, like every inspector who comes to the car, so the underside is checked from the ground as far as access allows, and where a seller's workshop has a ramp we use it. The AA and RAC work the same way, and the RAC charges extra when a ramp is needed.",
    },
    {
      question: "Do you check whether the mileage is genuine?",
      answer:
        "Yes, two ways. The history check compares the recorded mileage over time, and the inspection compares the wear on the seat, pedals, steering wheel and tyres with the number on the dash. The AA's terms say it does not check mileage accuracy.",
    },
  ],
  related: ["is-a-pre-purchase-car-inspection-worth-it", "pre-purchase-car-inspection-cost-uk", "hpi-check-vs-car-inspection"],
  areas: ["vehicle-inspection-london", "pre-purchase-car-inspection-essex", "vehicle-inspection-norwich", "vehicle-inspection-nottingham"],
  sources: [
    { label: "The AA vehicle inspection terms and conditions, October 2026", href: "https://www.theaa.com/media/the-aa/pdf/vehicle-inspection/aa-vehicle-inspections-terms-and-conditions-october-2026.pdf" },
    { label: "RAC vehicle inspections terms and conditions", href: "https://assets.contentstack.io/v3/assets/bltf298597f74081431/blted4c2fe7e46f05d8/vehicle-inspections-ts-cs.pdf" },
  ],
}
