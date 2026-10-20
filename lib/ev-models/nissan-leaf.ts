import type { EvModel } from "./types"

export const nissanLeaf: EvModel = {
  slug: "nissan-leaf",
  name: "Nissan Leaf",
  years: "2011 to 2024 (24, 30, 40 and 62 kWh), new model from 2025",
  title: "Used Nissan Leaf Battery Health Check",
  description:
    "Nissan Leaf battery sizes, the 12-bar health gauge, the short 5-year warranty on pre-2022 cars, why early Leafs degrade faster than other EVs, and what we test before you buy.",
  summary:
    "The Leaf is the cheapest way into an electric car and the one where the battery check matters most. Every Leaf sold before 2025 has an air-cooled pack, the early 24 and 30 kWh cars have lost the most capacity of any common EV, and the warranty on cars built before 2022 was only five years or 60,000 miles. The car shows a 12-bar gauge; our test turns that into a percentage, module by module.",
  batteries: [
    { version: "24 kWh, 2011 to 2017", capacity: "24 kWh nominal, about 21.4 kWh usable, air-cooled", range: "109 to 124 miles NEDC (73 to 84 miles EPA), far less in practice today" },
    { version: "30 kWh, 2016 to 2017", capacity: "30 kWh, air-cooled", range: "155 miles NEDC" },
    { version: "40 kWh, 2018 to 2022", capacity: "40 kWh gross, 39 kWh usable, air-cooled", range: "168 miles WLTP" },
    { version: "62 kWh e+, 2019 to 2024", capacity: "62 kWh gross, 59 kWh usable, air-cooled", range: "239 to 247 miles WLTP" },
    { version: "Third generation, 2025 on", capacity: "52 or 75 kWh, the first liquid-cooled Leaf", range: "271 to 375 miles WLTP" },
  ],
  warranty:
    "Nissan UK's terms: cars before model year 2022 had a battery warranty of five years or 60,000 miles, whichever came first, so every Leaf built before 2022 is now out of battery warranty. Model year 2022 cars have eight years or 100,000 miles. Nissan's capacity cover applies when the in-car gauge shows fewer than 9 of its 12 bars.",
  sohDisplay:
    "Yes, roughly. The Leaf has a 12-bar capacity gauge beside the charge gauge; losing a bar is a step of several percent, and the first bar goes at about 85%. Owners use the LeafSpy app over an OBD dongle for a percentage. Our Autel test reads State of Health and the cell data from the battery management system and gives you a report to keep.",
  knownIssues: [
    "Early packs age fast. Geotab's fleet data shows the 2015 Leaf losing about 4.2% a year, roughly double the EV average, and Recurrent estimates an eight-year-old 24 kWh car has about 70% to 75% of its original capacity, around 17 or 18 kWh, which can mean 50 to 60 real miles in winter.",
    "Across all EVs built in 2016 or earlier, about 8.5% have had a battery replaced outside recalls (Recurrent, November 2025), and the Leaf is a large share of those cars.",
    "Heat is the enemy of an air-cooled pack. A Leaf that has spent its life rapid charging on motorways, or parked in the sun, will have aged faster than one trickle charged at home.",
    "Replacement is a real option on the right car: Cleevely EV in Cheltenham fits reclaimed 40 kWh packs to 24 and 30 kWh cars for £5,995 inc VAT and 62 kWh packs for £7,995, which can be more than the car is worth, so the battery figure decides whether a cheap Leaf is a bargain or a liability.",
    "There is no traction battery recall for the Leaf on the DVSA file as of October 2026.",
  ],
  whatWeCheck: [
    "State of Health as a percentage, with the cell voltage spread, which on an old Leaf shows the weak modules the bar gauge hides.",
    "The bar gauge against our reading, and the car's own range estimate at the current charge against what that capacity should give.",
    "A live charge where a charger is available, the charge port, the cable and the 12V battery.",
    "On 40 kWh cars, how hot the pack gets and whether the car has been rapid charged repeatedly, which these cars throttle.",
    "The rest of the car in a Standard or Premium inspection: brake corrosion from under-use, tyres, suspension, the heater and air conditioning (expensive on a Leaf), the fault memory in every module, and the history check for finance and write-offs, which turn up a lot on cheap cars.",
  ],
  faqs: [
    {
      question: "How many bars should a used Leaf have?",
      answer:
        "A 2018 or later 40 kWh car with most of its 12 bars is normal; an early 24 kWh car on 9 or 10 bars is typical for its age and on 8 is tired. The bars are coarse steps, so two cars on the same bar count can be ten percent apart. Our test gives the percentage and the cell spread behind it.",
    },
    {
      question: "Is a cheap 24 or 30 kWh Leaf worth buying?",
      answer:
        "As a short-range second car charged at home, often yes, if the price reflects the capacity and you know the real range in winter. As an only car for longer trips, usually no. The battery reading is what separates the two, and a replacement pack costs more than most of these cars.",
    },
    {
      question: "Is the Leaf battery still under warranty?",
      answer:
        "On any Leaf built before model year 2022, no: the five-year, 60,000-mile warranty has expired. On a model year 2022 car it runs eight years or 100,000 miles. Nissan's capacity cover only triggers when the gauge drops below 9 bars, so a car on 9 bars is at the edge of a claim, not inside one.",
    },
    {
      question: "Can you test a Leaf's battery on its own without a full inspection?",
      answer:
        "Yes. The battery check on its own is £99.99: we come to the car, run the Autel test and give you the report. If you want the whole car checked as well, add the report to a Standard or Premium inspection for £49.99.",
    },
  ],
  related: ["renault-zoe", "bmw-i3", "hyundai-kona-electric", "kia-e-niro"],
  sources: [
    { label: "Wikipedia: Nissan Leaf (first generation) battery details", href: "https://en.wikipedia.org/wiki/Nissan_Leaf_(first_generation)" },
    { label: "EV Database: Nissan Leaf 40 kWh", href: "https://ev-database.org/uk/car/1106/Nissan-LEAF-40-kWh" },
    { label: "EV Database: Nissan Leaf e+ 62 kWh", href: "https://ev-database.org/uk/car/1657/Nissan-LEAF-eplus-62-kWh" },
    { label: "Nissan UK: car warranty terms", href: "https://www.nissan.co.uk/owners/car-warranty.html" },
    { label: "Geotab EV battery health study, April 2026", href: "https://www.geotab.com/blog/ev-battery-health/" },
    { label: "Recurrent: battery data case studies (Leaf capacity by age)", href: "https://www.recurrentauto.com/research/behind-the-scenes-data-science-case-studies" },
    { label: "Cleevely EV: Leaf battery upgrades", href: "https://www.cleevelyev.co.uk/battery-upgrades/" },
  ],
  updated: "2026-10-19",
}
