import type { Area } from "./types"

export const peterborough: Area = {
  slug: "vehicle-inspection-peterborough",
  kind: "city",
  name: "Peterborough",
  h1: "Pre-Purchase Car Inspection Peterborough",
  title: "Pre-Purchase Car Inspection Peterborough",
  description:
    "Mobile pre-purchase car inspections in Peterborough from £149.99, at Motorpoint, Big Motoring World, the Fengate dealers or a private seller. Same-day video report.",
  schemaType: "City",
  intro:
    "Buying a used car in Peterborough? Motorpoint and Big Motoring World hold around a thousand cars between them within a mile of each other at Fengate, and buyers from all over the east of England collect from there. We inspect the car on site before you drive it away, with diagnostics, a road test, a history check and a same-day video report.",
  travel: {
    summary: "M11 and A14 or the A1(M): about an hour and a half from our base",
    detail:
      "Peterborough is roughly 72 miles from Waltham Abbey. We come up the M11 to the A14 and then the A1 to the Fletton Parkway, or straight up the A1(M) from the M25, about an hour and a half off peak. That makes a morning inspection at Fengate followed by an afternoon one in Huntingdon, Stamford or Market Deeping a normal day for us, and the price is the same as an inspection at home in Essex.",
  },
  local: [
    "Peterborough is a car-supermarket city. Motorpoint's site on Edgerley Drain Road lists around 600 cars and Big Motoring World's Fengate supersite holds up to 450, and both sell on volume: the cars are prepared to a standard, priced keenly and collected by buyers who have often only seen them online. The Fengate and Boongate strip around them has the franchised dealers for Land Rover, Jaguar, Volvo, Volkswagen, Honda, Kia, Fiat and Suzuki, plus independents such as Car Nation and AMG Autos.",
    "A supermarket car comes with the supermarket's own check and a warranty that covers some things and not others. What it does not come with is someone on your side reading the fault memory, measuring the paint, driving it and telling you whether this particular car at this price is a good one. That is what we do, on their forecourt, before you sign the finance.",
  ],
  places: [
    {
      name: "Motorpoint Peterborough, Edgerley Drain Road",
      note: "Around 600 cars in stock off the Frank Perkins Parkway. Reserve the car, tell them an independent inspector is coming and we inspect on site, usually with a road test.",
    },
    {
      name: "Big Motoring World, Padholme Road East, Fengate",
      note: "A 450-car supersite on the former SW Car Supermarket plot. The same process: book the car, we come to it.",
    },
    {
      name: "The Fengate and Boongate franchised dealers",
      note: "Marshall Land Rover, Jaguar and Volvo on Mallory Road, Group 1 Volkswagen and Marshall Honda on Storeys Bar Road, Boongate Kia and Stoneacre on Newark Road and Forty Acre Road. Approved-used stock, prepared by the dealer, checked by us.",
    },
    {
      name: "City Auction Group, Orton Southgate",
      note: "Peterborough's auction centre on Bakewell Road, with weekly sales and hundreds of cars indoors. If you are buying a car that has just been through an auction, the Premium inspection's auction and salvage searches show its history.",
    },
    {
      name: "Private sellers across the city",
      note: "Werrington, Bretton, Hampton, Stanground, Whittlesey, Yaxley and the villages. Tell us the postcode when you book.",
    },
  ],
  watchFor: [
    {
      title: "Supermarket preparation versus condition",
      detail:
        "Volume sites valet and polish well. We measure what a valet cannot change: paint depth on every panel in the Premium inspection, brake pad and disc wear, tyre age and depth, and the diagnostic history, including how long ago the fault memory was cleared.",
    },
    {
      title: "Ex-fleet and ex-logistics cars",
      detail:
        "Peterborough has a large distribution economy, with Amazon's Kingston Park and Gateway sites among the biggest employers, and a lot of ex-fleet cars and vans come to market locally. Fleet cars are well serviced on paper; we check that the history matches the mileage and the wear.",
    },
    {
      title: "Finance paperwork on collection day",
      detail:
        "Supermarket sales move fast and the finance is usually signed on the day you collect. An inspection the day before, or first thing on collection day, means you decide with the findings in hand rather than after you have signed.",
    },
    {
      title: "Auction cars sold on quickly",
      detail:
        "Cars bought at auction and retailed within days can carry undisclosed damage. The history check shows write-off categories; the paint readings and underbody checks show repairs the paperwork does not.",
    },
  ],
  nearby: ["Fengate", "Boongate", "Werrington", "Bretton", "Hampton", "Orton", "Stanground", "Whittlesey", "Yaxley", "Market Deeping", "Oundle", "Huntingdon"],
  postcodes: "PE1 to PE8",
  faqs: [
    {
      question: "Can you inspect a car at Motorpoint Peterborough before I collect it?",
      answer:
        "Yes. Reserve the car, let the sales team know an independent inspector is coming, and we arrange a time with them. We inspect on their site, road test where they allow it, and send you the video, photos and report the same day so you can decide before you sign.",
    },
    {
      question: "Will Big Motoring World in Fengate let you inspect on site?",
      answer:
        "Supermarket sites are used to independent inspectors once a car is reserved. We confirm access with them when we book the time. If a seller refuses an independent inspection on a reserved car, that is worth knowing before you buy.",
    },
    {
      question: "Can you check a car I am bidding on at City Auction Group?",
      answer:
        "Auction cars are sold as seen and viewing time is short, so a full inspection before the sale is rarely possible. If you have bought one and have it at home, or if you are buying it from a dealer who has just had it through the sale, we inspect it in full and the Premium package traces its auction history.",
    },
    {
      question: "Is Peterborough really not too far for you?",
      answer:
        "It is about an hour and a half from us and we are there often, usually combining it with Huntingdon, Stamford or the Deepings. The price is the same as an inspection in Essex, with no mileage or call-out charge.",
    },
  ],
  related: ["vehicle-inspection-cambridgeshire", "vehicle-inspection-lincolnshire", "vehicle-inspection-cambridge", "vehicle-inspection-northamptonshire"],
  updated: "2026-10-19",
}
