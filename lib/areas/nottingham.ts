import type { Area } from "./types"

export const nottingham: Area = {
  slug: "vehicle-inspection-nottingham",
  kind: "city",
  name: "Nottingham",
  h1: "Pre-Purchase Car Inspection Nottingham",
  title: "Pre-Purchase Car Inspection Nottingham",
  description:
    "Mobile pre-purchase car inspections in Nottingham from £149.99, at Arnold Clark and the Lenton Lane dealers, Sherwood, Basford or a private seller. Same-day video report.",
  schemaType: "City",
  intro:
    "Buying a used car in Nottingham? Most of the city's stock sits in one place, the Lenton Lane estate off the A52, where Arnold Clark's Motorstore, Sytner BMW and Audi, Vertu Honda and Sandicliffe all trade. We come to the car wherever it is for sale and inspect it before you commit: full diagnostics, a road test, a history check and a video report the same day.",
  travel: {
    summary: "Covering Nottingham and the surrounding towns at one price with no mileage charge",
    detail:
      "The price is the same in Nottingham as it is everywhere else we cover, with no mileage or call-out charge. Book online and tell us where the car is. We agree the time with the seller or dealer, inspect at the car and send you the video, photos and written report the same day.",
  },
  local: [
    "Lenton Lane is Nottingham's car quarter. Arnold Clark's Nottingham Motorstore and Vanstore on Redfield Road lists several hundred cars. Sytner's BMW centre on Jockey Lane has one of the largest approved-used BMW displays in the Midlands, with Nottingham Audi and Graypaul Ferrari alongside, and Vertu Honda and Sandicliffe are on the same estate. Elsewhere, Bristol Street Motors sells Renault and Dacia on Haydn Road in Sherwood and Stoneacre opened a Nissan dealership on Nottingham Road in Basford in 2025. For supermarket stock, buyers head to Available Car at Castle Donington and Sutton-in-Ashfield or Motorpoint Derby.",
    "Nottingham's two universities have around 70,000 students between them, so the city also has one of the biggest cheap-first-car markets in the country, sold privately in Lenton, Beeston and Dunkirk or through small forecourts in Bulwell and Basford. With BCA's Nottingham centre selling up to five days a week, a lot of local forecourt stock is a week or two out of the auction lanes. Whichever end of the market you are buying at, we inspect the car to the same checklist, read the fault memory, measure the paint and drive it, and you have the findings before you pay, not after.",
  ],
  places: [
    {
      name: "Lenton Lane Industrial Estate, NG7",
      note: "Arnold Clark Motorstore on Redfield Road, Sytner BMW on Jockey Lane, Nottingham Audi and Sandicliffe on Abbeyfield Road, Vertu Honda and Graypaul Ferrari on Lenton Lane. Reserve the car, tell the dealer an independent inspector is coming and we inspect on their forecourt.",
    },
    {
      name: "Sherwood, Basford and Bulwell",
      note: "Bristol Street Motors on Haydn Road, Stoneacre Nissan on Nottingham Road and the independents along the A60 and A610.",
    },
    {
      name: "BCA Nottingham and John Pye Auctions",
      note: "BCA's remarketing centre sells fleet, lease and BMW Group stock up to five days a week. John Pye on Radford Road runs weekly sales including seized vehicles. Cars from both are retailed locally within days.",
    },
    {
      name: "Available Car, Castle Donington and Sutton-in-Ashfield",
      note: "The region's two car supermarkets, 12 miles south-west and 14 miles north of the city. Reserve the car and we inspect before you collect.",
    },
    {
      name: "Private sellers across the city",
      note: "West Bridgford, Beeston, Arnold, Mapperley, Clifton, Hucknall and the student streets around the universities. Tell us the postcode when you book.",
    },
  ],
  watchFor: [
    {
      title: "Student cars with several owners",
      detail:
        "Cheap first cars around Lenton, Beeston and Dunkirk often have a long list of keepers and gaps in the servicing. The history check for finance and write-offs, the road test and the diagnostic scan find the faults that matter at £2,000 to £5,000: clutch, cooling system, rust and electrical gremlins.",
    },
    {
      title: "Ex-lease and ex-fleet cars from BCA",
      detail:
        "BCA Nottingham defleets lease and company cars in volume, and many are sold on Lenton Lane within a fortnight. They have good paperwork and hard miles. We check the big-ticket items due at the mileage, brake and tyre wear, and the fault memory, including how long since it was last cleared.",
    },
    {
      title: "Burnaston hybrids",
      detail:
        "Toyota's Burnaston plant, 20 miles west, builds only hybrids, and the area has a high share of hybrid Corollas and Auris. Hybrid battery and inverter checks are part of every inspection; on an older hybrid, the Autel battery State of Health report tells you what the dash does not.",
    },
    {
      title: "No charging Clean Air Zone, but a city of parking rules",
      detail:
        "Nottingham chose not to charge drivers under its air quality plan, so there is no daily zone charge on older cars. Its Workplace Parking Levy means many dealers and employers keep tight control of parking, so we arrange the inspection time and space with the seller in advance.",
    },
  ],
  nearby: ["Lenton", "Beeston", "West Bridgford", "Arnold", "Sherwood", "Hucknall", "Bulwell", "Basford", "Clifton", "Mapperley", "Carlton", "Long Eaton"],
  postcodes: "NG1 to NG17",
  faqs: [
    {
      question: "Is there a travel charge for Nottingham, or does the price change?",
      answer:
        "No. The price is the same anywhere in Nottingham, with no mileage or call-out charge: Standard £149.99, Premium £199.99, and the EV battery check £99.99.",
    },
    {
      question: "Can you inspect a car at Arnold Clark Nottingham or a Lenton Lane main dealer, and will they let you put it on a ramp?",
      answer:
        "We inspect on the dealer's premises once the car is reserved, and most are used to it. We do not need their ramp: the underbody checks are done from the ground with our own equipment, and the road test, diagnostic scan, paint readings and photos all happen on their forecourt.",
    },
    {
      question: "I am a student buying a cheap first car in Lenton or Beeston. Is an inspection worth it on a £3,000 car?",
      answer:
        "The repairs an inspection finds are the same size whatever the car cost: a clutch is £600 to £1,000, a head gasket more, and a car with finance still on it can be taken back. On a £3,000 car any one of those is a third of your money, so yes.",
    },
    {
      question: "Can you inspect a car I am bidding on at BCA Nottingham or John Pye before the sale?",
      answer:
        "Rarely. Auction viewing windows are short and the cars are sold as seen. Once the car is yours we can inspect it at home or, by arrangement, at the site. If a dealer has just bought it from the sale and is retailing it, we inspect it on their forecourt and the Premium package traces its auction history.",
    },
  ],
  related: ["vehicle-inspection-nottinghamshire", "vehicle-inspection-leicestershire", "vehicle-inspection-leicester", "vehicle-inspection-lincolnshire"],
  updated: "2026-10-20",
}
