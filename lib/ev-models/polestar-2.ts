import type { EvModel } from "./types"

export const polestar2: EvModel = {
  slug: "polestar-2",
  name: "Polestar 2",
  years: "UK sales from 2020",
  title: "Used Polestar 2 Battery Health Check",
  description:
    "Polestar 2 battery sizes (64, 75 and 79 kWh usable), the 8-year, 100,000-mile warranty to 70%, no battery recall, and what we test on a used Polestar 2 before you buy.",
  summary:
    "The Polestar 2 has one of the cleaner battery records among used EVs: liquid-cooled packs of 64 to 79 kWh usable, an eight-year warranty to 70% that Polestar states plainly, and no battery recall on the UK file. The October 2020 recalls were for software and the inverter. The used market is full of ex-lease cars, so the check is about the reading, the service record and the wear of fleet miles.",
  batteries: [
    { version: "Standard Range, model years 2021 to 2024", capacity: "69 kWh gross, 64 kWh usable", range: "294 miles WLTP" },
    { version: "Long Range, model years 2021 to 2023", capacity: "78 kWh gross, 75 kWh usable", range: "340 miles single motor, 299 miles dual motor WLTP" },
    { version: "Long Range, model year 2024 on", capacity: "82 kWh gross, 79 kWh usable, NMC cells", range: "345 to 353 miles WLTP (Long Range Performance)" },
  ],
  warranty:
    "Polestar UK: eight years or 100,000 miles, whichever comes first, and the battery is repaired or replaced free if its State of Health drops below 70% of original capacity. It transfers with the car.",
  sohDisplay:
    "No. The Polestar 2 gives the driver no State of Health figure in the car; it is held in the battery management system, which our Autel test reads. You get the percentage, the module data and a report to keep.",
  knownIssues: [
    "No traction battery recall on the DVSA file as of October 2026. The October 2020 recalls were a software fault and an inverter fault, both fixed at dealers.",
    "Most used Polestar 2s were company or lease cars, which means full service records, high motorway miles and a lot of rapid charging. Geotab's 2026 data shows cars that fast charge often ageing faster, so the reading matters more than the mileage.",
    "Heavy car, big wheels, firm suspension: tyres wear on the inside edges and the front suspension arms and bushes show mileage. Standard Range single-motor cars on smaller wheels fare better.",
    "Over-the-air software updates changed the car a lot between 2020 and 2024. A used car that has fallen behind on updates can show range and charging quirks that are not the battery.",
  ],
  whatWeCheck: [
    "State of Health and the cell voltage spread from the battery management system, on the Autel report you keep.",
    "Which pack the car has (64, 75 or 79 kWh usable) confirmed from the car, because adverts and model years blur it.",
    "The first registration date and mileage against the eight-year, 100,000-mile warranty, and the complete service record the warranty depends on.",
    "A live charge where a charger is available, the charge port and cable, and the 12V battery.",
    "In a Standard or Premium inspection, the rest of the car: tyres and suspension, brakes that corrode from under-use, paint depth on every panel, glass, and the fault memory in every module.",
  ],
  faqs: [
    {
      question: "What State of Health is normal on a used Polestar 2?",
      answer:
        "Fleet averages are around 1.8% to 2.3% loss a year, so a 2020 or 2021 car in the high 80s to low 90s and a 2023 car in the mid 90s is in line. A heavily rapid-charged lease car may sit a few points lower. Below 70% inside eight years or 100,000 miles is a warranty claim.",
    },
    {
      question: "Is an ex-lease Polestar 2 with high mileage a good buy?",
      answer:
        "Often, yes: the paperwork is complete and the price reflects the miles. What the miles wear is tyres, suspension and brakes rather than the pack, and the reading tells you whether the charging habits have left a mark.",
    },
    {
      question: "Do you need a Polestar dealer to read the battery?",
      answer:
        "No. The Autel test reads the battery management system at the car, wherever it is for sale, and reports the percentage with module and cell data. A dealer can do a deeper workshop test, but not before you have decided to buy.",
    },
  ],
  related: ["tesla-model-3", "tesla-model-y", "jaguar-i-pace", "volkswagen-id3"],
  sources: [
    { label: "Wikipedia: Polestar 2 (battery versions)", href: "https://en.wikipedia.org/wiki/Polestar_2" },
    { label: "EV Database: Polestar 2 Long Range Performance (MY24)", href: "https://ev-database.org/uk/car/1820/Polestar-2-Long-Range-Performance" },
    { label: "Polestar UK: warranty FAQ", href: "https://www.polestar.com/uk/support/faq/warranty/" },
    { label: "Geotab EV battery health study, April 2026", href: "https://www.geotab.com/blog/ev-battery-health/" },
  ],
  updated: "2026-10-19",
}
