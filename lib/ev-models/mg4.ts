import type { EvModel } from "./types"

export const mg4: EvModel = {
  slug: "mg4",
  name: "MG4",
  years: "2022 on",
  title: "Used MG4 Battery Health Check",
  description:
    "MG4 battery sizes (51 kWh LFP, 64 kWh, 77 kWh), the 7-year warranty, no battery recall, and what we test on a used MG4 before you buy.",
  summary:
    "The MG4 is the used EV bargain of the moment, and its batteries are sound: CATL cells, a 51 kWh LFP pack in the Standard Range that tolerates full charging, and 64 and 77 kWh NMC packs in the longer-range cars. There is no battery recall. The seven-year warranty is shorter than most rivals' eight, so on a 2022 car the clock is already a few years in.",
  batteries: [
    { version: "SE Standard Range", capacity: "51 kWh gross, 50.8 kWh usable, LFP cells", range: "217 to 219 miles WLTP" },
    { version: "SE and Trophy Long Range", capacity: "64 kWh gross, 61.7 kWh usable, NMC cells", range: "270 to 280 miles WLTP" },
    { version: "Trophy Extended Range", capacity: "77 kWh gross, 74.4 kWh usable", range: "Up to 320 miles WLTP" },
    { version: "XPower", capacity: "64 kWh", range: "About 240 miles WLTP" },
  ],
  warranty:
    "MG's warranty is seven years or 100,000 miles on the car, and the battery is listed at seven years or 100,000 miles too. MG's own site would not confirm the capacity threshold for us, so we ask for the written battery terms from the handbook or the dealer and record them in the report.",
  sohDisplay:
    "No. The MG4 does not give the driver a State of Health percentage; it is held in the battery management system, which our Autel test reads. You get the percentage, the module data and a report to keep.",
  knownIssues: [
    "No traction battery recall on the DVSA file as of October 2026.",
    "The Standard Range LFP pack is designed to be charged to 100% regularly to keep its gauge calibrated. A used one that has lived at 60% can show a pessimistic range that is not degradation; the test tells the two apart.",
    "The MG4's software has had its share of glitches (infotainment, warning lights, occasional charging interruptions reported abroad). Most are fixed by dealer updates, and an un-updated car behaves like a faulty one.",
    "These cars are cheap enough to have been bought as taxis and delivery cars. High mileage on a two-year-old MG4 is common, and the brakes, tyres and seats tell the story before the battery does.",
  ],
  whatWeCheck: [
    "State of Health and the cell voltage spread from the battery management system, on the Autel report you keep.",
    "Which pack the car has (LFP or NMC), confirmed from the car rather than the advert, and whether it has been charged the way that pack wants.",
    "The written battery warranty terms, the first registration date and the mileage against the seven-year limit.",
    "A live charge where a charger is available, the charge port and cable, and the 12V battery.",
    "In a Standard or Premium inspection, the rest of the car: tyres and brakes, suspension, paint depth on every panel, panel gaps (MG4 build quality varies), and the fault memory in every module.",
  ],
  faqs: [
    {
      question: "Is the MG4 battery reliable?",
      answer:
        "On the evidence so far, yes. CATL cells, liquid cooling, no recall, and no pattern of replacements in the data we have seen. The cars are too new for long-term figures, which is why a reading now matters: it is the baseline the warranty will be judged against.",
    },
    {
      question: "Which MG4 battery is better to buy used, LFP or NMC?",
      answer:
        "The 51 kWh LFP Standard Range is the cheaper, tougher pack and happy charged to full; the 64 and 77 kWh NMC packs give more range and want to be kept below 100% day to day. For a short commute the LFP car is the sensible buy. Either way we read the pack rather than trusting the badge.",
    },
    {
      question: "What State of Health should a 2022 or 2023 MG4 show?",
      answer:
        "Fleet averages are around 1.8% to 2.3% loss a year, so a 2022 car in the low to mid 90s is normal. A high-mileage taxi car may be a few points lower. Anything much below that for its age needs an explanation.",
    },
  ],
  related: ["mg-zs-ev", "volkswagen-id3", "kia-e-niro", "tesla-model-3"],
  sources: [
    { label: "EV Database: MG4 EV Standard Range", href: "https://ev-database.org/uk/car/1707/MG-MG4-EV-Standard-Range" },
    { label: "EV Database: MG4 EV Long Range", href: "https://ev-database.org/uk/car/1708/MG-MG4-EV-Long-Range" },
    { label: "Wikipedia: MG4 EV", href: "https://en.wikipedia.org/wiki/MG4_EV" },
    { label: "Geotab EV battery health study, April 2026", href: "https://www.geotab.com/blog/ev-battery-health/" },
  ],
  updated: "2026-10-19",
}
