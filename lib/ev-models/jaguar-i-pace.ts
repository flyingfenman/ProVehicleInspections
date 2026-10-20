import type { EvModel } from "./types"

export const jaguarIPace: EvModel = {
  slug: "jaguar-i-pace",
  name: "Jaguar I-Pace",
  years: "2018 to 2024",
  title: "Used Jaguar I-Pace Battery Health Check",
  description:
    "Jaguar I-Pace 90 kWh battery, the 8-year, 100,000-mile warranty, the six UK battery recalls including the 2026 charge cap at 90%, and what we test on a used I-Pace before you buy.",
  summary:
    "The I-Pace is a lot of car for the money used, and the reason is its battery history. Six UK recalls since 2023 cover a thermal overload risk, loose busbar fixings, a batch of early cells that got whole new packs, and, in March 2026, a software limit holding 16,291 cars to 90% charge until a permanent fix. On a used I-Pace we establish which recalls are done, whether the pack was replaced, and whether the car is currently capped.",
  batteries: [
    { version: "EV400, 2018 to 2024", capacity: "90 kWh gross, 84.7 kWh usable, LG Chem NMC cells, liquid-cooled", range: "254 to 292 miles WLTP" },
  ],
  warranty:
    "Eight years or 100,000 miles on the high-voltage battery, transferring with the car. Jaguar's site redirected when we checked the capacity threshold, so we ask for the written terms and record them in the report. Cars from 2018 are inside the last two years of cover.",
  sohDisplay:
    "No. The I-Pace gives the driver no State of Health figure; it is held in the battery management system, which our Autel test reads. You get the percentage, the module data and a report to keep. We also read whether the car is under the 90% charge limit.",
  knownIssues: [
    "Recall R/2023/154 (June 2023): 26,137 UK cars built August 2017 to June 2023 for a thermal overload risk in the battery, addressed with monitoring software in the battery control module. R/2023/297 (October 2023) re-did 374 cars where the fix was wrongly completed.",
    "Recall R/2023/065 (April 2023): 9 cars with degraded batteries given new packs. R/2024/034 (March 2024): loose busbar fixings in the battery modules.",
    "Recall R/2024/120 (April 2024): 264 cars built February 2018 to September 2019 with cells made on or before 31 May 2018, to be given a new pack or bought back by Jaguar. A 2018 car with a new pack is a better buy than one without.",
    "Recall R/2026/052 (March 2026): 16,291 model year 2019 to 2021 cars given interim software restricting maximum charge to 90% while a permanent remedy is developed. That takes 10% off the range of a used car you are being offered today.",
  ],
  whatWeCheck: [
    "Every recall against the VIN on the DVSA record, the dealer paperwork for pack or module replacement, and whether the 90% charge limit is active on the car.",
    "State of Health and the cell voltage spread from the battery management system, on the Autel report you keep: a replaced pack reads differently from an original 2018 one.",
    "The first registration date and mileage against the eight-year, 100,000-mile warranty.",
    "A live charge where a charger is available, the charge port and cable, and the 12V battery.",
    "In a Premium inspection, the rest of the car: air suspension where fitted, brakes, the heavy car's tyre wear, paint depth on every panel, water ingress (a known I-Pace weakness), and the fault memory in every module.",
  ],
  faqs: [
    {
      question: "Is a used Jaguar I-Pace safe to buy with all these recalls?",
      answer:
        "Yes, if the recalls are complete and the reading is good. The cells that worried Jaguar most were in 2018 and 2019 cars, and many of those got new packs. What you must not do is buy one without knowing which recalls are done and whether it is still capped at 90%, and that is the first thing we establish.",
    },
    {
      question: "The car charges only to 90%. Is that a fault?",
      answer:
        "It is the March 2026 interim recall software on model year 2019 to 2021 cars, not a fault in the pack. It stays until Jaguar releases the permanent fix, so price the car on 90% of its range, not 100%.",
    },
    {
      question: "What State of Health is normal on an I-Pace?",
      answer:
        "An original pack from 2018 or 2019 in the mid 80s is in line with fleet averages; a pack replaced under recall should read noticeably higher. Anything under the warranty threshold inside eight years or 100,000 miles is a claim, and on a 2018 car that window is closing.",
    },
  ],
  related: ["polestar-2", "tesla-model-y", "bmw-i3", "hyundai-kona-electric"],
  sources: [
    { label: "EV Database: Jaguar I-Pace EV400", href: "https://ev-database.org/uk/car/1287/Jaguar-I-Pace-EV400" },
    { label: "Wikipedia: Jaguar I-Pace", href: "https://en.wikipedia.org/wiki/Jaguar_I-Pace" },
    { label: "carwow: Jaguar I-Pace review (warranty)", href: "https://www.carwow.co.uk/jaguar/i-pace" },
    { label: "DVSA vehicle recalls service", href: "https://www.check-vehicle-recalls.service.gov.uk/" },
  ],
  updated: "2026-10-19",
}
