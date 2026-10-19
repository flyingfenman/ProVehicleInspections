import type { EvModel } from "./types"

export const hyundaiKonaElectric: EvModel = {
  slug: "hyundai-kona-electric",
  name: "Hyundai Kona Electric",
  years: "First generation 2018 to 2023, second generation 2023 on",
  title: "Used Hyundai Kona Electric Battery Health Check",
  description:
    "Hyundai Kona Electric battery sizes, the 8-year warranty to 70%, the three UK battery recalls (2020, 2021 and 2026) and how to tell if the pack was replaced, and what we test before you buy.",
  summary:
    "The Kona Electric is a good used EV with one big question attached: the battery recalls. UK cars built between 2018 and 2020 were recalled twice for cell faults, some had whole packs replaced, and in May 2026 a third recall covered more than 25,000 UK cars built up to July 2023 with a software update. On a used Kona we confirm which recalls were done, whether the pack is original, and what its State of Health is now.",
  batteries: [
    { version: "First generation 39 kWh, 2018 to 2023", capacity: "42 kWh gross, 39.2 kWh usable, liquid-cooled", range: "180 to 190 miles WLTP" },
    { version: "First generation 64 kWh, 2018 to 2023", capacity: "67.5 kWh gross (estimate), 64 kWh usable, liquid-cooled", range: "279 to 301 miles WLTP" },
    { version: "Second generation, 2023 on", capacity: "48.4 or 65.4 kWh", range: "Up to 304 miles WLTP" },
  ],
  warranty:
    "Hyundai UK's July 2024 terms: eight years or 125,000 miles on models first produced before 2020, and eight years or 100,000 miles on the Kona EV from model year 2020 and all newer models, repairing the battery back to at least 70% of its original capacity. Cars used as taxis or private hire get five years or 100,000 miles. It transfers with the car.",
  sohDisplay:
    "No. The Kona does not show the driver a battery health percentage; it is held in the battery management system, which our Autel test reads. You get the percentage, module and cell data and a report to keep.",
  knownIssues: [
    "Recall R/2020/308 (October 2020): 1,672 UK cars built between 31 January 2018 and 20 March 2020 for a faulty battery management system or damaged cells, fixed with software and, where needed, module or pack replacement.",
    "Recall R/2021/087 (April 2021): 1,214 UK cars built May 2018 to March 2020 for a potential electrical short in the lithium-ion battery, with a charge limit applied and then complete replacement of the battery assembly. Hyundai's global cost was reported at around 900 million dollars.",
    "Recall R/2026/128 (May 2026): 25,056 UK Kona Electrics built January 2018 to July 2023 for internal cell voltage deviation, fixed with a battery management software update. On a used car bought in 2026 or later, this is the one most likely to be outstanding.",
    "A car that had its pack replaced under recall has, in effect, a younger battery than its age suggests, which is good for you, but only if the paperwork proves it.",
  ],
  whatWeCheck: [
    "All three recalls against the VIN on the DVSA record, and the dealer paperwork for any pack or module replacement.",
    "State of Health and the cell voltage spread from the battery management system: a replaced pack reads differently from an original one of the same age, and a cell out of step with the rest is exactly what the recalls were about.",
    "The first registration date and mileage against the eight-year warranty, and whether the car has been used as a taxi, which shortens it to five years.",
    "A live charge where a charger is available, the charge port and cable, and the 12V battery.",
    "In a Standard or Premium inspection, the rest of the car: brakes, tyres, suspension, paint depth on every panel, and the fault memory in every module.",
  ],
  faqs: [
    {
      question: "How do I know if a used Kona Electric had its battery replaced under the recall?",
      answer:
        "Ask for the Hyundai dealer invoice or recall completion record, and check the VIN against the DVSA recall service. We do both and also read the pack through the battery management system, where a replaced pack shows as healthier than an original pack of the same age would.",
    },
    {
      question: "Is a 2018 to 2020 Kona Electric safe to buy now?",
      answer:
        "Yes, if the recalls have been completed and the health reading is good. The cars that needed new packs got them in 2021 and 2022, and the 2026 software update is a dealer visit. A car with the 2026 recall still outstanding should have it done before you rely on it.",
    },
    {
      question: "What State of Health should I expect?",
      answer:
        "An original 64 kWh pack from 2019 or 2020 in the mid to high 80s is in line with fleet averages; a pack replaced under recall in 2021 should read higher. Anything under 70% inside eight years of first registration is a warranty claim.",
    },
  ],
  related: ["kia-e-niro", "mg-zs-ev", "nissan-leaf", "volkswagen-id3"],
  sources: [
    { label: "EV Database: Hyundai Kona Electric 39 kWh", href: "https://ev-database.org/uk/car/1422/Hyundai-Kona-Electric-39-kWh" },
    { label: "EV Database: Hyundai Kona Electric 64 kWh", href: "https://ev-database.org/uk/car/1423/Hyundai-Kona-Electric-64-kWh" },
    { label: "Hyundai UK warranty terms and conditions, July 2024", href: "https://dmassets.hyundai.com/is/content/hyundaiautoever/Hyundai_UK_Warranty_Terms_and_Conditions_July_2024pdf" },
    { label: "DVSA vehicle recalls service", href: "https://www.check-vehicle-recalls.service.gov.uk/" },
    { label: "Wikipedia: Hyundai Kona Electric", href: "https://en.wikipedia.org/wiki/Hyundai_Kona_Electric" },
  ],
  updated: "2026-10-19",
}
