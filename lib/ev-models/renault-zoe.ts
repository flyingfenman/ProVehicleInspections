import type { EvModel } from "./types"

export const renaultZoe: EvModel = {
  slug: "renault-zoe",
  name: "Renault Zoe",
  years: "UK sales 2013 to 2023",
  title: "Used Renault Zoe Battery Health Check",
  description:
    "Renault Zoe battery sizes (22, 41 and 52 kWh), the battery hire trap on early cars, the 8-year warranty to 70%, the 2022 recall, and what we test on a used Zoe before you buy.",
  summary:
    "The Zoe is a cheap, well-made small EV with one trap: on early cars the battery could be owned or leased, and a leased battery still carries a monthly bill that transfers to you. The air-cooled 41 and 52 kWh packs have aged reasonably, the warranty is eight years or 100,000 miles to 70%, and the car gives you no health figure at all, so the test is the only way to know.",
  batteries: [
    { version: "ZE22, 2013 to 2016", capacity: "25.9 kWh gross, 22 kWh usable, air-cooled", range: "130 to 149 miles NEDC, much less in practice" },
    { version: "ZE40 (R90 and Q90), late 2016 to 2019", capacity: "45.6 kWh gross, 41 kWh usable, air-cooled", range: "186 miles WLTP" },
    { version: "ZE50 (R110 and R135), late 2019 to 2024", capacity: "55 kWh gross, 52 kWh usable, NMC cells, air-cooled", range: "239 to 245 miles WLTP" },
  ],
  warranty:
    "Renault UK guarantees its E-Tech batteries for eight years or 100,000 miles, maintaining 70% of capacity. On a car where the battery was hired rather than bought, the hire contract covered the battery instead, and the monthly payment continues with the car. Renault stopped selling the Zoe in the UK in December 2023.",
  sohDisplay:
    "No. The Zoe shows the driver nothing about battery health; owners use the CanZE app over an OBD dongle. Our Autel test reads State of Health and the cell data from the battery management system and gives you a report to keep.",
  knownIssues: [
    "Battery hire. Early UK Zoes were sold with the battery either bought outright or leased from Renault for a monthly fee based on mileage, with buy-outs allowed from late 2017. A leased battery is not yours when you buy the car, and the payments carry on. The V5C and the Renault paperwork show which it is, and we check before anything else.",
    "Recall R/2022/001 (January 2022): 31 UK cars built between 13 January and 22 February 2021 for an internal short-circuit risk in the battery, fixed by module replacement. Small, but worth a VIN check.",
    "Air-cooled packs age with heat and rapid charging. The ZE40 and ZE50 have held up better than early Leafs, but a motorway-commuting Zoe that has lived on rapid chargers will read lower than a home-charged one.",
    "The ZE50 R135 cars from 2020 on have a 50 kW rapid charge option that not every car has; the port and the spec sheet tell you, and it changes what the car is worth.",
  ],
  whatWeCheck: [
    "Whether the battery is owned or on hire, from the V5C, the Renault documents and the seller, before the price is agreed.",
    "State of Health and the cell voltage spread from the battery management system, on the Autel report you keep.",
    "The 2022 recall against the VIN, and the first registration date and mileage against the eight-year warranty.",
    "A live charge where a charger is available, the charge port and cable, and the 12V battery, which fails on Zoes and leaves them dead on the drive.",
    "In a Standard or Premium inspection, the rest of the car: brakes that corrode from under-use, tyres, suspension, paint depth on every panel, and the fault memory in every module.",
  ],
  faqs: [
    {
      question: "How do I know if a used Zoe's battery is on hire?",
      answer:
        "Ask the seller for the Renault battery hire agreement or the proof it was bought out, and check the sale documents: a hired battery is usually stated in the advert because the buyer takes over the payments. We check the paperwork before anything else, because it changes the price by thousands.",
    },
    {
      question: "What State of Health is normal on a used Zoe?",
      answer:
        "A ZE40 from 2017 or 2018 in the mid 80s and a ZE50 from 2020 or 2021 around 90 is in line with fleet averages. Anything under 70% inside eight years or 100,000 miles is a warranty claim, on an owned battery, or a hire-contract claim on a leased one.",
    },
    {
      question: "Is a 22 kWh Zoe worth buying?",
      answer:
        "Only as a short-range runabout charged at home, at a price that reflects a real range of 60 to 80 miles. The health reading tells you where in that range the car sits, and whether a battery on hire makes it dearer than it looks.",
    },
  ],
  related: ["nissan-leaf", "peugeot-e-208", "vauxhall-corsa-e", "bmw-i3"],
  sources: [
    { label: "Wikipedia: Renault Zoe (battery versions)", href: "https://en.wikipedia.org/wiki/Renault_Zoe" },
    { label: "EV Database: Renault Zoe ZE50 R135", href: "https://ev-database.org/uk/car/1205/Renault-Zoe-ZE50-R135" },
    { label: "Renault UK: E-Tech electric battery guarantee", href: "https://www.renault.co.uk/e-tech-electric/battery.html" },
    { label: "PushEVs: Renault lets owners buy the leased battery (2017)", href: "https://pushevs.com/2017/11/24/renault-now-lets-buy-battery-lease/" },
    { label: "DVSA vehicle recalls service", href: "https://www.check-vehicle-recalls.service.gov.uk/" },
  ],
  updated: "2026-10-19",
}
