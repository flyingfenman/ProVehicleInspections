import type { Guide } from "./types"

export const dealerVsPrivate: Guide = {
  slug: "buying-a-used-car-from-a-dealer-vs-private-seller",
  question: "Dealer or private seller: which is safer when buying a used car?",
  title: "Buying a Used Car from a Dealer vs a Private Seller",
  description:
    "Your rights under the Consumer Rights Act 2015 from a dealer, what a private seller owes you, how traders pose as private sellers, and what an inspection adds in each case.",
  published: "2026-10-19",
  updated: "2026-10-19",
  answer:
    "A dealer gives you legal rights a private seller does not. Under the Consumer Rights Act 2015 a car sold by a trader must be of satisfactory quality, you can reject it within 30 days for a fault that was there at sale, and for six months the dealer has to prove a fault was not. A private seller only has to describe the car honestly and own it. Neither protects you from buying a bad car; an inspection before you pay does.",
  blocks: [
    { type: "h2", text: "Your rights when you buy from a dealer" },
    {
      type: "ul",
      items: [
        "The car must be of satisfactory quality, fit for purpose and as described, taking its age, mileage and price into account.",
        "For 30 days you have a short-term right to reject the car for a full refund if a fault was present at the time of sale.",
        "For six months, any fault that appears is presumed to have been there at sale unless the dealer can prove otherwise. After one failed repair or replacement you can reject the car.",
        "These rights cannot be signed away. \"Sold as seen\", \"trade sale\" and \"no warranty\" on a trader's invoice mean nothing against the Act.",
        "They apply to anyone selling cars in the course of a business, whether they have a forecourt, a unit on an industrial estate or a driveway full of cars and a private-looking advert.",
      ],
    },
    { type: "h2", text: "Your rights when you buy privately" },
    {
      type: "ul",
      items: [
        "The seller must have the right to sell the car, and it must match their description. That is the whole list.",
        "There is no requirement of satisfactory quality. If it breaks down on the way home and the seller described it honestly, that is your problem.",
        "Your remedy for a misdescription is the small claims court, which takes months and depends on finding the seller.",
        "Private prices are lower for exactly this reason: you are carrying the risk the dealer would carry.",
      ],
    },
    { type: "h2", text: "Where dealers go wrong" },
    {
      type: "p",
      text: "The Motor Ombudsman recorded more than 100,000 contacts under its Vehicle Sales Code in 2025, a record, and the most common disputes concern the quality of used cars at the point of sale. Rights are only useful after something has gone wrong, and enforcing them takes time, letters and sometimes a court.",
    },
    {
      type: "p",
      text: "An example from our own diary this month. A buyer paid a dealer a £100 deposit on an imported American V8 saloon after being told by phone that the car had no issues, and that the Consumer Rights Act did not apply to it. The second claim was wrong; the Act applies to every car a trader sells to a consumer. The inspection found the fault memory had been cleared 1 km before we arrived, paint readings on two panels consistent with a large amount of body filler, a replaced and badly painted rear bumper with its parking sensors not working, discoloured coolant, a battery that needed a jump start and no service history. We put the cost of putting it right at £5,000 to £8,500 and did not recommend the purchase. The deposit was the cheapest part of that day.",
    },
    { type: "h2", text: "Traders who pose as private sellers" },
    {
      type: "p",
      text: "Some traders sell as private individuals to avoid the Act, and a buyer who does not spot it loses the protection without knowing. Signs: the seller's name is not on the V5C, or they have owned the car for a few weeks; the same phone number appears on several adverts; they want to meet in a car park or at the roadside rather than at the address on the V5C; they know little about the car's history. In a Premium inspection we check the seller and the V5C details and search previous adverts for exactly this.",
    },
    { type: "h2", text: "Price, and what you get for it" },
    {
      type: "p",
      text: "A dealer's price includes preparation, a warranty of some kind, the legal rights above, usually a part exchange option and often finance. A private price includes none of those. The gap is the price of the protection, and whether it is worth paying depends on how much you can find out before you buy. An independent inspection narrows the gap from both sides: it tells you whether the dealer's preparation is real, and it gives you the protection a private sale lacks.",
    },
    { type: "h2", text: "What to do in each case" },
    {
      type: "table",
      head: ["Step", "From a dealer", "From a private seller"],
      rows: [
        ["History check", "Run your own; do not rely on theirs.", "Essential. Finance on a private car is common and becomes your problem."],
        ["Inspection", "Confirms the preparation and gives you a negotiating position. Dealers who refuse an independent inspection are telling you something.", "Your only protection. There is no six-month presumption to fall back on."],
        ["Paperwork", "Invoice in the business's name, with the warranty terms in writing.", "V5C in the seller's name at the address you are standing at, with photo ID to match."],
        ["Payment", "Card or bank transfer, so there is a record. Paying any part by credit card brings Section 75 cover on purchases over £100.", "Bank transfer at the seller's bank or by Faster Payments once you have the V5C new keeper slip. Never cash in a car park."],
        ["Test drive", "On the dealer's trade insurance.", "Check your own policy covers driving other cars, and whether that is third party only."],
      ],
    },
    {
      type: "note",
      text: "Whoever is selling, the car is the same car. [A Standard inspection](/book) is £199.99 and [a Premium](/book?package=premium), with the seller and V5C checks, is £249.99. Same price at a main dealer in Birmingham or a driveway in Basildon.",
    },
  ],
  faqs: [
    {
      question: "Does \"sold as seen\" mean anything?",
      answer:
        "From a trader, no. The Consumer Rights Act cannot be excluded by a phrase on an invoice. From a private seller it adds nothing either, because a private seller never owed you satisfactory quality in the first place; they still cannot misdescribe the car.",
    },
    {
      question: "Can a dealer refuse to let me have the car inspected?",
      answer:
        "They can, and some do. We would not buy from one. A dealer confident in their preparation has nothing to lose from an hour with an inspector, and a dealer who objects is asking you to take their word for it.",
    },
    {
      question: "Is a dealer warranty worth having?",
      answer:
        "Read it before you value it. Many exclude wear items, cap claims at a few hundred pounds and route repairs through the dealer's own workshop. Your Consumer Rights Act rights for the first six months are usually stronger than the warranty.",
    },
    {
      question: "Can I get a deposit back if the inspection finds problems?",
      answer:
        "If you paid it subject to inspection, say so in writing at the time and most dealers will return it. If the dealer refuses, a deposit paid by credit card can be disputed through the card issuer. Pay deposits by credit card for that reason, and keep them small.",
    },
  ],
  related: ["is-a-pre-purchase-car-inspection-worth-it", "hpi-check-vs-car-inspection", "imported-cars-what-to-check-before-you-buy"],
  areas: ["pre-purchase-car-inspection-essex", "vehicle-inspection-london", "vehicle-inspection-birmingham"],
  sources: [
    { label: "Consumer Rights Act 2015, Part 1 Chapter 2 (goods)", href: "https://www.legislation.gov.uk/ukpga/2015/15/part/1/chapter/2" },
    { label: "The Motor Ombudsman: a decade of the Vehicle Sales Code, 1 September 2026", href: "https://www.themotorombudsman.org/press-releases/tmo-marks-a-decade-of-the-vehicle-sales-code-driving-high-standards-in-the-automotive-sector/" },
    { label: "RAC Drive: buying a used car, February 2025", href: "https://www.rac.co.uk/drive/advice/buying-and-selling-guides/buying-a-used-car/" },
  ],
}
