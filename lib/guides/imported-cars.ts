import type { Guide } from "./types"

export const importedCars: Guide = {
  slug: "imported-cars-what-to-check-before-you-buy",
  question: "Buying an imported car: what should you check?",
  title: "Imported Cars: What to Check Before You Buy",
  description:
    "Why a UK history check is blind on an import, the registration paperwork an unregistered car still needs, the conversion for UK roads, which inspection services refuse imports, and a real example that cost £5,000 to £8,500 to put right.",
  published: "2026-10-19",
  updated: "2026-10-19",
  answer:
    "Treat an imported car as a car with no past. A UK history check only starts at UK registration, so foreign write-offs, finance and mileage never show. Check the registration paperwork (a car under ten years old that was not built to UK or EU approval needs an Individual Vehicle Approval test before the DVLA will register it), the conversion for UK roads, and the car itself, because the national inspection services turn most imports away.",
  blocks: [
    { type: "h2", text: "Three kinds of import" },
    {
      type: "ul",
      items: [
        "Japanese imports: right-hand drive, usually with an auction sheet that grades the car, and a mileage in kilometres that may or may not have been converted honestly. Popular for sports cars, people carriers and hybrids the UK never got.",
        "American and Gulf imports: left-hand drive, often V8s and pick-ups, sometimes brought in unregistered by a dealer who sells them before the paperwork is done. Desert heat and different fuel and emissions rules leave their mark.",
        "European and Irish imports: right-hand drive from Ireland, left-hand drive from the continent, often cheaper than the UK equivalent but with a service history in another language and a record that stops at the border.",
      ],
    },
    { type: "h2", text: "The paperwork an import needs" },
    {
      type: "ul",
      items: [
        "HMRC notification within 14 days of arrival, with any VAT and duty paid. Without it the DVLA will not register the car.",
        "Individual Vehicle Approval (IVA) for a car under ten years old that was not built to UK or EU type approval, which covers almost every American and Gulf car and most Japanese ones. Cars over ten years old are exempt from the test but not from registration.",
        "DVLA registration, a UK registration number and a V5C. Until these exist the car cannot be taxed, insured normally or driven legally on the road.",
        "An MOT if the car is more than three years old, which it cannot take until it has a UK registration or is booked in under its VIN for the purpose.",
        "Proof of the car's age and identity: the foreign title or registration document, the export certificate, and a date of first registration the DVLA will accept. A car with no documents may end up on a Q plate.",
      ],
    },
    {
      type: "p",
      text: "If the seller has not done these, every one of them is a cost and a risk that becomes yours. An IVA test can fail on lights, speedometer units, emissions or a dozen details, and the car cannot be used until it passes.",
    },
    { type: "h2", text: "The conversion for UK roads" },
    {
      type: "ul",
      items: [
        "Headlamps that dip to the left, not the right. Beam deflectors are a temporary fix the IVA will not accept on most cars.",
        "A rear fog light on the offside or in the centre.",
        "A speedometer that reads in miles per hour, either natively or converted.",
        "On a left-hand-drive car, mirrors that give a view down the offside, and your own comfort with overtaking and junctions from the wrong seat.",
        "Emissions equipment and software for UK fuel. American cars tuned for 87 octane and Gulf cars for high sulphur fuel can run badly or throw codes on UK pump fuel.",
      ],
    },
    { type: "h2", text: "Why history checks go blind on imports" },
    {
      type: "p",
      text: "HPI, the AA and the RAC read UK databases. The record of an imported car starts the day it is registered here. A write-off in Texas, a finance agreement in Dubai, a mileage that was reset in Osaka: none of it exists as far as a UK check is concerned. For Japanese cars the auction sheet helps if it is genuine; for American cars a Carfax or AutoCheck report on the VIN helps if the seller will supply the VIN; for Gulf cars there is often nothing at all. The car itself is the only record you can trust.",
    },
    { type: "h2", text: "What the national inspection services say" },
    {
      type: "table",
      caption: "Import eligibility, from each provider's terms, 19 October 2026",
      head: ["Service", "Imports"],
      rows: [
        ["The AA Vehicle Inspection", "American imports excluded altogether, along with kit cars, limousines and London taxis."],
        ["RAC Vehicle Inspections", "Imports excluded from the Basic package; prestige and high-performance cars need a ramp at extra cost."],
        ["ClickMechanic", "Imports excluded."],
        ["Pro Vehicle Inspections", "Inspected, registered or not, left-hand drive or right, at the same price as any other car."],
      ],
    },
    { type: "h2", text: "A real example" },
    {
      type: "p",
      text: "In October 2026 we inspected a 2018 American 6.4-litre V8 saloon imported from the UAE, left-hand drive, unregistered, with 81,600 miles showing. The dealer had told the buyer by phone that it had no issues. The fault memory had been cleared 1 km before we arrived. Paint depth readings on the front-right wing and rear-left quarter were consistent with a large amount of body filler. The rear bumper had been replaced and badly painted, and its parking sensors did not work. The battery needed a jump start, the coolant was discoloured and there was no service history. Ahead of the buyer lay the IVA test, DVLA registration and an MOT. We put the cost of putting the car right at £5,000 to £8,500 before registration and did not recommend the purchase. The inspection cost £199.99.",
    },
    { type: "h2", text: "What we check on an import" },
    {
      type: "ul",
      items: [
        "The documents: foreign title or registration, export certificate, HMRC notification, IVA certificate or booking, and whether the VIN on the paperwork matches the car in three places.",
        "The conversion: headlamps, rear fog, speedometer units, and anything the IVA will fail.",
        "Paint depth on every panel, because body filler is the cheapest way to hide a foreign accident that no UK database knows about.",
        "The fault memory in every module, and the distance driven since any codes were cleared.",
        "Corrosion and heat damage: rubber, plastics and hoses on a Gulf car, underbody on a car from a salted winter state, and the condition of the cooling system.",
        "Mileage against wear: pedals, seats, steering wheel and tyres, because an odometer in kilometres converted on paper proves nothing.",
        "The seller, in a Premium inspection: whether they are a trader, how long they have had the car, and what their previous adverts said.",
      ],
    },
    {
      type: "note",
      text: "An import that has already been registered, converted and MOT tested by a previous owner is a different and far safer proposition than one still on its foreign title. Either way, [book a Premium inspection](/book?package=premium): the paint depth readings, the document checks and the seller checks are the parts that matter most on an import.",
    },
  ],
  faqs: [
    {
      question: "Can you inspect an unregistered import?",
      answer:
        "Yes. The car cannot be road tested on the public road without a registration, trade plates or a booked MOT or IVA, so the road test is limited to private ground, and the report says so. Everything else, including the full diagnostic scan and paint depth readings, is done as normal.",
    },
    {
      question: "Will an HPI check show a write-off from abroad?",
      answer:
        "No. UK history checks only see UK records, which begin at UK registration. For an American car ask for the VIN and run a Carfax or AutoCheck report; for a Japanese car ask for the original auction sheet; for a Gulf car assume there is no record and rely on the inspection.",
    },
    {
      question: "Is a Japanese import a bad idea?",
      answer:
        "Not in itself. Many are low-mileage, well-kept cars graded honestly at auction. The risks are a mileage converted dishonestly, rust protection that was never needed in Japan, and parts and insurance that cost more. The inspection checks the first two and you can price the third before you buy.",
    },
    {
      question: "Who pays for the IVA and registration if the dealer has not done them?",
      answer:
        "Whoever the sale contract says, and if it says nothing, you do. Get it in writing before you pay a deposit whether the price includes a UK registration, a passed IVA and an MOT, and what happens to your money if the car fails the IVA.",
    },
  ],
  related: ["buying-a-used-car-from-a-dealer-vs-private-seller", "hpi-check-vs-car-inspection", "cat-s-and-cat-n-write-offs"],
  areas: ["vehicle-inspection-london", "pre-purchase-car-inspection-essex", "vehicle-inspection-birmingham"],
  sources: [
    { label: "GOV.UK: importing vehicles into the UK", href: "https://www.gov.uk/importing-vehicles-into-the-uk" },
    { label: "GOV.UK: vehicle approval (IVA)", href: "https://www.gov.uk/vehicle-approval/individual-vehicle-approval" },
    { label: "The AA vehicle inspection terms and conditions, October 2026", href: "https://www.theaa.com/media/the-aa/pdf/vehicle-inspection/aa-vehicle-inspections-terms-and-conditions-october-2026.pdf" },
    { label: "RAC basic vehicle inspection exclusions", href: "https://www.rac.co.uk/buying-a-car/vehicle-inspections/basic-inspection" },
    { label: "ClickMechanic pre-purchase inspection", href: "https://www.clickmechanic.com/pre-purchase-inspection" },
  ],
}
