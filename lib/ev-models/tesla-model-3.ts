import type { EvModel } from "./types"

export const teslaModel3: EvModel = {
  slug: "tesla-model-3",
  name: "Tesla Model 3",
  years: "UK sales from 2019",
  title: "Used Tesla Model 3 Battery Health Check",
  description:
    "Tesla Model 3 battery sizes, the 8-year warranty to 70%, how to read Tesla's own health figure, the 2019 and 2021 pack replacements, and what we test before you buy.",
  summary:
    "A used Model 3 is the EV buyers ask us about most. The packs have held up well in the fleet data, Tesla gives you a quick health figure in the app, and the 8-year warranty guarantees 70% capacity. What we add is an independent State of Health reading from the battery management system, the charging history, and the rest of the car, before you pay.",
  batteries: [
    { version: "Standard Range Plus, 2019 to 2021", capacity: "55 kWh gross (estimate), 51 kWh usable, NCA cells", range: "278 miles WLTP" },
    { version: "RWD (LFP battery), late 2021 to early 2024", capacity: "57.5 kWh, LFP cells", range: "305 miles WLTP" },
    { version: "Long Range, 2019 on", capacity: "75 kWh", range: "360 miles WLTP (2019), 325 miles for the 2023 to 2025 Highland Long Range AWD" },
    { version: "Highland RWD, 2026", capacity: "64 kWh gross (estimate), 60 kWh usable, LFP cells", range: "332 miles WLTP" },
  ],
  warranty:
    "Eight years or 100,000 miles on the Standard Range and RWD cars, eight years or 120,000 miles on Long Range and Performance, with a minimum of 70% capacity retained. The warranty follows the car, so it carries over to you. Check the first registration date and mileage against it before you buy.",
  sohDisplay:
    "Yes, and it is worth using. In the Tesla app go to Service, Request Service, then Battery and Charging, and the Range option gives a quick health check. A full Battery Health test exists in Service Mode but takes around 24 hours, so it is rarely done before a sale. Our Autel test reads State of Health and the individual module data from the battery management system in minutes at the car.",
  knownIssues: [
    "Fleet data shows Model 3 packs ageing slowly. Recurrent's study of around 13,000 Teslas found no significant difference in range loss between cars fast charged most of the time and cars rarely fast charged, which is good news for ex-fleet and ex-taxi cars, though the authors warn a cumulative effect may show later.",
    "Recurrent noted an uptick in pack replacements on 2019 and 2021 Model 3s, most of them replaced with LFP packs. A replaced pack is not a bad thing, but you want to know which chemistry is now in the car, because it changes how it should be charged.",
    "LFP cars (the RWD from late 2021) are meant to be charged to 100% regularly so the battery gauge stays accurate. An LFP car that has never been charged to full can show a misleading range figure rather than a faulty pack.",
    "There is no traction battery recall for the Model 3 on the DVSA recall file as of October 2026.",
  ],
  whatWeCheck: [
    "State of Health, module voltages and the spread between cells from the battery management system, with the Autel report you keep.",
    "Which pack chemistry the car has now (NCA, NMC or LFP), because it decides whether charging to 100% is a habit to keep or avoid.",
    "The app's own range figure against the official figure for that version, and whether the two agree with our reading.",
    "Charging on the day: the port, the cable and a live charge where a charger is available, plus the 12V battery, which strands more Teslas than the main pack does.",
    "The rest of the car in a Standard or Premium inspection: suspension arms and bushes (the Model 3 is heavy and firm), tyre wear across the tread, panel gaps and paint depth, brakes that corrode from under-use, and the fault memory in every module.",
  ],
  faqs: [
    {
      question: "What State of Health is normal on a used Model 3?",
      answer:
        "Fleet studies put average EV degradation at roughly 1.8% to 2.3% a year, so a three-year-old car in the low to mid 90s and a five-year-old car in the high 80s is normal. A Model 3 well below that for its age and mileage needs an explanation, and the warranty covers anything under 70% inside eight years.",
    },
    {
      question: "The seller says the Tesla app shows battery health. Do I still need your test?",
      answer:
        "The app figure is useful and we check it. Our test reads the battery management system directly and reports module and cell data as well as the headline percentage, on a report you keep, and it comes with the rest of the inspection: the car's fault memory, the 12V battery, suspension, tyres, paint and the road test.",
    },
    {
      question: "Does fast charging ruin a Model 3 battery?",
      answer:
        "Not on the evidence. Recurrent's study of around 13,000 Teslas found no statistically significant difference in degradation between heavy and light fast chargers. Across all makes, Geotab's 2026 data does show faster ageing for cars that fast charge often, so we still look at the charging history where the car records it.",
    },
    {
      question: "Can you inspect a Model 3 at a Tesla showroom or a private seller?",
      answer:
        "Either. Tesla's own used cars are usually sold unseen, so most of our Model 3 inspections are at independent dealers and private sellers. Give us the address and the year, and we confirm the battery test works on that version before you book.",
    },
  ],
  related: ["tesla-model-y", "polestar-2", "volkswagen-id3", "hyundai-kona-electric"],
  sources: [
    { label: "EV Database: Tesla Model 3 Standard Range Plus", href: "https://ev-database.org/uk/car/1485/Tesla-Model-3-Standard-Range-Plus" },
    { label: "EV Database: Tesla Model 3 RWD (2026)", href: "https://ev-database.org/uk/car/3403/Tesla-Model-3-RWD" },
    { label: "Recurrent: how long do EV batteries last (replacement rates, November 2025)", href: "https://www.recurrentauto.com/research/how-long-do-ev-batteries-last" },
    { label: "Recurrent: checking Tesla battery health for free", href: "https://www.recurrentauto.com/research/check-tesla-battery-health-for-free" },
    { label: "Recurrent: the impact of fast charging on Teslas", href: "https://www.recurrentauto.com/research/impacts-of-fast-charging" },
    { label: "Geotab EV battery health study, April 2026", href: "https://www.geotab.com/blog/ev-battery-health/" },
  ],
  updated: "2026-10-19",
}
