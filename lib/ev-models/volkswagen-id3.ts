import type { EvModel } from "./types"

export const volkswagenId3: EvModel = {
  slug: "volkswagen-id3",
  name: "Volkswagen ID.3",
  years: "2020 on",
  title: "Used Volkswagen ID.3 Battery Health Check",
  description:
    "Volkswagen ID.3 battery sizes (Pure, Pro, Pro S, GTX), the 8-year warranty to 70%, the 2022 to 2025 battery recall that caps charging at 80%, and what we test before you buy.",
  summary:
    "The ID.3 has a solid liquid-cooled pack and an eight-year warranty to 70% that follows the car. The thing to check on a used one in 2026 is the battery safety recall: Volkswagen has remotely capped charging at 80% on ID.3, ID.4 and ID.7 cars with packs from one supplier built between 2022 and 2025 until a dealer check, with module replacement where needed. A used ID.3 that still charges only to 80% has not had it done.",
  batteries: [
    { version: "Pure", capacity: "55 kWh gross, 45 kWh usable", range: "Up to 205 miles WLTP" },
    { version: "Pro", capacity: "62 kWh gross, 58 kWh usable", range: "Up to 261 miles WLTP" },
    { version: "Pro S", capacity: "82 kWh gross, 77 kWh usable (79 kWh from 2024)", range: "Up to 342 miles WLTP" },
    { version: "GTX", capacity: "84 kWh gross, 79 kWh usable", range: "Up to about 400 miles WLTP" },
  ],
  warranty:
    "Volkswagen UK: up to eight years or 100,000 miles from first registration, guaranteeing the battery retains 70% of its original capacity, and transferable to later owners. ID cars bought new with the 2025 Electric Car Grant can carry a two-year extension, so ask for the paperwork on a 2025 or 2026 car.",
  sohDisplay:
    "No. The ID.3 does not give the driver a State of Health percentage; the figure is held in the battery management system, which is what our Autel test reads. You get the percentage, the module data and a report to keep. We also read whether the car is currently capped at 80% by the recall.",
  knownIssues: [
    "Battery safety recall 93MV and 93MF: ID.3, ID.4 and ID.7 cars with batteries produced by a specific supplier between 2022 and 2025 have an overheating risk when charged above 80%. Volkswagen has remotely limited charging to 80% until an approximately one-hour dealer check, with module replacement if needed. It was not yet on the DVSA file on 19 October 2026, so a VIN check alone can miss it.",
    "Early ID.3s (2020 to 2021) had a long list of software problems: infotainment, charging interruptions and warning lights, mostly fixed by updates. A used car that has not had the updates behaves like a car with faults.",
    "Recurrent's estimate for the related ID.4 is about 3.5% a year on thin data; we treat ID.3 packs as average until a reading says otherwise.",
    "The ID.3 relies on regenerative braking, so the friction brakes corrode from under-use. Rear discs and pads are a common advisory and a cheap negotiating point.",
  ],
  whatWeCheck: [
    "Whether the car is under the 80% charging cap from the recall, and whether the dealer check and any module replacement have been completed, from the car and the paperwork.",
    "State of Health and the cell voltage spread from the battery management system, on the Autel report you keep.",
    "Software version and the record of updates, because many ID.3 faults were software.",
    "A live charge where a charger is available, the charge port and cable, and the 12V battery.",
    "In a Standard or Premium inspection, the rest of the car: brake corrosion, tyres, suspension, paint depth on every panel, and the fault memory in every module, read with VCDS as well as the Autel.",
  ],
  faqs: [
    {
      question: "The ID.3 I am looking at only charges to 80%. Is the battery faulty?",
      answer:
        "Probably not: it is most likely the remote cap Volkswagen applied under the 2022 to 2025 battery recall until the car has its dealer check. Ask the seller to have the check done before you buy. If the car has had it and is still capped, that is a question for a Volkswagen dealer and a reason to pause.",
    },
    {
      question: "What State of Health is normal on a used ID.3?",
      answer:
        "Fleet averages are around 1.8% to 2.3% loss a year, so a 2020 car in the high 80s and a 2023 car in the mid 90s is in line. Anything under 70% within eight years or 100,000 miles is a warranty claim.",
    },
    {
      question: "Do you scan the ID.3 with VCDS as well?",
      answer:
        "Yes. VCDS reads every Volkswagen group module in detail, including the stored and intermittent faults the generic scan skips, and the Autel runs the CARA Approved battery health test. On an ID.3 you get both.",
    },
  ],
  related: ["mg4", "kia-e-niro", "tesla-model-3", "peugeot-e-208"],
  sources: [
    { label: "Wikipedia: Volkswagen ID.3 (battery versions)", href: "https://en.wikipedia.org/wiki/Volkswagen_ID.3" },
    { label: "Volkswagen UK: vehicle and battery warranties", href: "https://www.volkswagen.co.uk/en/electric-and-hybrid/benefits-and-costs/looking-after-your-ev/vehicle-and-battery-warranties.html" },
    { label: "Volkswagen UK: high-voltage battery recall campaign", href: "https://www.volkswagen.co.uk/en/owners-and-services/my-car/battery-recall-campaign.html" },
    { label: "Geotab EV battery health study, April 2026", href: "https://www.geotab.com/blog/ev-battery-health/" },
  ],
  updated: "2026-10-19",
}
