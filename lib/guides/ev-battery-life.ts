import type { Guide } from "./types"

export const evBatteryLife: Guide = {
  slug: "how-long-do-electric-car-batteries-last",
  question: "How long do electric car batteries last?",
  title: "How Long Do Electric Car Batteries Last?",
  description:
    "What the 2026 fleet data says about EV battery life: 2.3% loss a year, 82% at eight years, under 4% ever replaced, what shortens a pack, every major warranty, and what a replacement costs in the UK.",
  published: "2026-10-19",
  updated: "2026-10-19",
  answer:
    "Longer than most buyers fear. Geotab's April 2026 study of more than 22,000 electric vehicles found batteries losing about 2.3% of their capacity a year on average, which leaves roughly 82% at eight years and points to a working life of 13 years or more. Fewer than 4% of EVs have ever had a battery replaced outside a recall. Early air-cooled packs, mainly the Nissan Leaf, are the exception.",
  blocks: [
    { type: "h2", text: "The numbers" },
    {
      type: "table",
      caption: "Fleet data on EV battery ageing",
      head: ["Measure", "Figure", "Source"],
      rows: [
        ["Average capacity loss per year", "2.3% (Geotab, 22,700 vehicles, April 2026); 1.8% in Geotab's 2023 study; long-established models have settled at 1.4%", "Geotab"],
        ["Capacity left at 8 years", "81.6% on average; 88% for cars rarely rapid charged; 76% for heavy users of chargers above 100 kW", "Geotab"],
        ["Expected lifespan", "Around 13 years or more", "Geotab"],
        ["Batteries replaced outside recalls", "Under 4% of all EVs; about 8.5% of cars built in 2016 or earlier; 0.3% of cars built in 2022 or later", "Recurrent, 30,000 cars, November 2025"],
        ["Highest-mileage cars", "The 100 highest-odometer cars in Recurrent's data still deliver 86% to 87% of their original range", "Recurrent, August 2024"],
      ],
    },
    { type: "h2", text: "The shape of the curve" },
    {
      type: "p",
      text: "A pack loses a few percent quickly in its first year or two, then settles into a long, slow slope of 1% to 2% a year, and only much later drops off steeply. That is why a three-year-old car at 94% is not on course to be at 70% in five more years, and why the number that matters when you buy used is where the car sits on that curve, not its mileage.",
    },
    { type: "h2", text: "What shortens a battery's life" },
    {
      type: "ul",
      items: [
        "Rapid charging, especially at high power. Geotab's 2026 data shows cars that use DC rapid chargers for more than 12% of their sessions losing 2.5% a year against 1.5% for cars that rarely do, and frequent users of chargers above 100 kW losing 3.0% a year. Geotab calls high-power charging the single largest stressor. Tesla-only data from Recurrent found no significant difference, so the effect varies by car.",
        "Heat. Cars in hot climates degrade about 0.4% a year faster. In Britain that matters less than how the pack is cooled: an air-cooled pack cannot shed the heat of a rapid charge or a summer motorway run.",
        "Living at the extremes. Cars that spend more than 80% of their time near full or near empty lose 2.0% a year against 1.4% to 1.5%. Occasional 100% charges before a long trip do no measurable harm, and LFP packs (MG4 Standard Range, Tesla RWD) are designed to be charged to full regularly.",
        "No liquid cooling. Every Nissan Leaf before 2025 and every Renault Zoe is air-cooled. The 2015 Leaf loses 4.2% a year in Geotab's data, nearly double the average.",
      ],
    },
    { type: "h2", text: "What does not shorten it as much as people think" },
    {
      type: "ul",
      items: [
        "Mileage on its own. A 100,000-mile EV with a gentle charging history can read better than a 30,000-mile car that lived on rapid chargers. Recurrent's highest-mileage cars keep 86% to 87% of their range.",
        "Age on its own. Capacity loss is tied to charge cycles and heat more than calendar years, which is why low-mileage cars still age, just more slowly.",
        "Daily driving. Normal use between 20% and 80% is what the pack was designed for.",
      ],
    },
    { type: "h2", text: "What the warranties promise" },
    {
      type: "table",
      caption: "Traction battery warranties on common used EVs (manufacturer UK terms, checked October 2026)",
      head: ["Car", "Battery warranty", "Capacity promise"],
      rows: [
        ["Tesla Model 3 and Model Y", "8 years or 100,000 miles (RWD); 8 years or 120,000 miles (Long Range, Performance)", "70%"],
        ["Volkswagen ID.3", "8 years or 100,000 miles", "70%"],
        ["Kia e-Niro and Niro EV", "8 years (car warranty 7 years or 100,000 miles)", "70%"],
        ["Hyundai Kona Electric", "8 years or 125,000 miles before 2020; 8 years or 100,000 miles from model year 2020; 5 years or 100,000 miles as a taxi", "70%"],
        ["Renault Zoe", "8 years or 100,000 miles", "70%"],
        ["Polestar 2", "8 years or 100,000 miles", "70%"],
        ["Jaguar I-Pace, Peugeot e-208, Vauxhall Corsa-e", "8 years or 100,000 miles", "Threshold not published online; ask for the written terms"],
        ["MG4", "7 years or 100,000 miles", "Threshold not published online"],
        ["MG ZS EV", "7 years or 80,000 miles", "Threshold not published online"],
        ["Nissan Leaf", "5 years or 60,000 miles before model year 2022; 8 years or 100,000 miles from model year 2022", "Fewer than 9 of 12 bars on the gauge"],
      ],
    },
    {
      type: "p",
      text: "Every one of these transfers to the next owner, and most depend on a complete service record. A car at 75% with two years of warranty left is a different proposition from the same car with two months left.",
    },
    { type: "h2", text: "What a replacement costs" },
    {
      type: "p",
      text: "In the UK, Cleevely EV in Cheltenham fits a reclaimed 40 kWh pack to a 24 or 30 kWh Nissan Leaf for £5,995 including VAT, or a 62 kWh pack for £7,995. Published US figures give a sense of the rest: a remanufactured Tesla Model 3 pack has been quoted at around 13,000 to 16,000 dollars fitted, BMW estimated about 16,000 dollars for an i3 pack in 2016, and single Volkswagen ID.4 modules run to about 2,000 dollars each. Few cars ever need one, but on a cheap older EV the pack can be worth more than the car.",
    },
    { type: "h2", text: "What this means when you buy used" },
    {
      type: "p",
      text: "The battery is the most expensive part of the car and the one part the seller cannot see either. Read its State of Health before you pay, compare it with the band for its age, check the warranty dates, and look at how it was charged. [Our guide to checking battery health](/guides/how-to-check-ev-battery-health-before-you-buy) covers the methods, and [the battery test](/book?package=ev) is £149.99 at the car.",
    },
  ],
  faqs: [
    {
      question: "Will I need to replace the battery in a used EV?",
      answer:
        "Almost certainly not within the time most people keep a car. Fewer than 4% of EVs have ever had a pack replaced outside a recall, and for cars built since 2022 the figure is 0.3%. The exceptions are early air-cooled cars, chiefly the 24 and 30 kWh Nissan Leaf.",
    },
    {
      question: "Is a 100,000-mile electric car a bad buy?",
      answer:
        "Not because of the mileage. The pack cares about charge cycles and heat, not distance, and high-mileage cars in Recurrent's data keep 86% to 87% of their range. What matters is the State of Health reading, the charging history and whether the warranty mileage limit has been passed.",
    },
    {
      question: "Does charging to 100% damage the battery?",
      answer:
        "Occasionally, no. Living there, yes: cars that sit near full or near empty most of the time lose more capacity each year. LFP packs, fitted to the MG4 Standard Range and rear-wheel-drive Teslas, are meant to be charged to 100% regularly.",
    },
    {
      question: "Which used EVs have the worst battery records?",
      answer:
        "The early Nissan Leaf for degradation, the Hyundai Kona Electric and Jaguar I-Pace for recalls, and the Renault Zoe for the battery hire trap rather than the pack itself. Each has its own page on our site with the details and what we check.",
    },
  ],
  related: ["how-to-check-ev-battery-health-before-you-buy", "is-a-pre-purchase-car-inspection-worth-it", "hpi-check-vs-car-inspection"],
  models: ["nissan-leaf", "tesla-model-3", "hyundai-kona-electric", "jaguar-i-pace", "renault-zoe", "bmw-i3"],
  sources: [
    { label: "Geotab EV battery health study, 28 April 2026", href: "https://www.geotab.com/blog/ev-battery-health/" },
    { label: "Recurrent: how long do EV batteries last, November 2025", href: "https://www.recurrentauto.com/research/how-long-do-ev-batteries-last" },
    { label: "Recurrent: how reliable are high-mileage EVs, August 2024", href: "https://www.recurrentauto.com/research/just-how-reliable-are-high-mileage-evs" },
    { label: "Recurrent: the impact of fast charging on Teslas, June 2024", href: "https://www.recurrentauto.com/research/impacts-of-fast-charging" },
    { label: "Recurrent: EV battery replacement costs, December 2024", href: "https://www.recurrentauto.com/research/costs-ev-battery-replacement" },
    { label: "Cleevely EV: Leaf battery upgrades", href: "https://www.cleevelyev.co.uk/battery-upgrades/" },
    { label: "Nissan UK warranty terms", href: "https://www.nissan.co.uk/owners/car-warranty.html" },
    { label: "Hyundai UK warranty terms and conditions, July 2024", href: "https://dmassets.hyundai.com/is/content/hyundaiautoever/Hyundai_UK_Warranty_Terms_and_Conditions_July_2024pdf" },
    { label: "Polestar UK warranty FAQ", href: "https://www.polestar.com/uk/support/faq/warranty/" },
  ],
}
