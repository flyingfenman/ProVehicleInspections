import type { EvModel } from "./types"

export const vauxhallCorsaE: EvModel = {
  slug: "vauxhall-corsa-e",
  name: "Vauxhall Corsa-e and Corsa Electric",
  years: "2020 on",
  title: "Used Vauxhall Corsa-e Battery Health Check",
  description:
    "Vauxhall Corsa-e and Corsa Electric battery sizes (50 and 51 kWh), the 8-year, 100,000-mile warranty, the 2022 build recalls for battery software, and what we test before you buy.",
  summary:
    "The Corsa-e is the Peugeot e-208 with a different badge: same 50 kWh pack, same motor, same recalls. It sold in large numbers to fleets and as a company car, so used ones are plentiful and often high mileage. The battery has a clean record; the two recalls were software updates on cars built in the second half of 2022, one of them for loss of drive.",
  batteries: [
    { version: "Corsa-e, 2020 to 2024", capacity: "50 kWh gross, about 46 kWh usable", range: "222 miles WLTP (official, latest figure)" },
    { version: "Corsa Electric with 115 kW motor, 2023 on", capacity: "51 kWh gross", range: "246 miles WLTP" },
  ],
  warranty:
    "Eight years or 100,000 miles on the high-voltage battery, the same Stellantis cover as the e-208, transferring with the car. Vauxhall's site would not load when we checked the capacity threshold, so we ask for the written terms and record them in the report.",
  sohDisplay:
    "No. The Corsa-e gives the driver no State of Health figure; it is held in the battery management system, which our Autel test reads. You get the percentage, the module data and a report to keep.",
  knownIssues: [
    "Recall R/2023/008 (January 2023): 3,666 UK Corsa Electrics built August to December 2022 for traction battery control unit software that could cause loss of propulsion. A dealer update.",
    "Recall R/2025/119 (March 2025): 864 cars built August to December 2022 for Battery Monitoring Unit software. The one most likely to be outstanding on a car bought in 2025 or 2026.",
    "Fleet and lease cars make up a big share of used Corsa-es. Good paperwork, high mileage, a lot of rapid charging on the motorway, and the brakes, tyres and seats wear before the battery does.",
    "Early cars on old software had optimistic range estimates and 12V battery drain; updates fixed both, and an un-updated car behaves worse than its pack deserves.",
  ],
  whatWeCheck: [
    "Both recalls against the VIN, and whether the 2022-build software updates have been done.",
    "State of Health and the cell voltage spread from the battery management system, on the Autel report you keep.",
    "The first registration date and mileage against the eight-year, 100,000-mile warranty, and the written capacity terms.",
    "A live charge where a charger is available, the charge port and cable, and the 12V battery.",
    "In a Standard or Premium inspection, the rest of the car: brake corrosion, tyres, suspension bushes worn by fleet miles, paint depth on every panel, and the fault memory in every module.",
  ],
  faqs: [
    {
      question: "What State of Health should a used Corsa-e show?",
      answer:
        "Fleet averages are around 1.8% to 2.3% loss a year, so a 2020 car in the high 80s and a 2023 car in the mid 90s is normal. A high-mileage fleet car that rapid charged daily may sit a few points lower, which is fine if the price reflects it.",
    },
    {
      question: "Is the Corsa-e the same car as the Peugeot e-208?",
      answer:
        "Underneath, yes: the same platform, battery, motor and recalls. The e-208 page covers the Peugeot version in the same detail. We read both packs the same way.",
    },
    {
      question: "Should I worry about an ex-fleet Corsa-e with 80,000 miles?",
      answer:
        "Not about the battery as such; EV packs handle mileage well, and the warranty runs to 100,000 miles. The things fleet miles wear are the brakes, suspension, tyres and interior, and the inspection measures all of them.",
    },
  ],
  related: ["peugeot-e-208", "renault-zoe", "mg4", "nissan-leaf"],
  sources: [
    { label: "Wikipedia: Opel Corsa (Corsa-e battery)", href: "https://en.wikipedia.org/wiki/Opel_Corsa" },
    { label: "carwow: Vauxhall Corsa Electric review (range figures)", href: "https://www.carwow.co.uk/vauxhall/corsa-electric" },
    { label: "DVSA vehicle recalls service", href: "https://www.check-vehicle-recalls.service.gov.uk/" },
    { label: "Geotab EV battery health study, April 2026", href: "https://www.geotab.com/blog/ev-battery-health/" },
  ],
  updated: "2026-10-19",
}
