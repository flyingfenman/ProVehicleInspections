import type { Area } from "./types"

export const norfolk: Area = {
  slug: "vehicle-inspection-norfolk",
  kind: "county",
  name: "Norfolk",
  h1: "Mobile Car Inspection Norfolk",
  title: "Mobile Car Inspection Norfolk",
  description:
    "Independent mobile car inspections across Norfolk from £149.99: Norwich, King's Lynn, Great Yarmouth, Thetford, Dereham, Wymondham, Cromer and North Walsham. Same-day video report.",
  schemaType: "AdministrativeArea",
  intro:
    "Buying a used car in Norfolk? From Motorpoint in Norwich and the A140 dealers to Sandles and Anglia Car Auctions in King's Lynn and the Thurlow Nunn sites in Great Yarmouth, we come to the car and inspect it before you commit: full diagnostics, a road test, a history check and a video report the same day. And because most of Norfolk is within reach of the sea, we take the underside seriously.",
  travel: {
    summary: "Covering all of Norfolk, King's Lynn to Great Yarmouth, at one price with no mileage charge",
    detail:
      "Wherever the car is in Norfolk, the price is the same as everywhere else we cover, with no mileage or call-out charge, and that includes the north coast. Book online with the car's postcode and we arrange the time with the seller or dealer. You get the video, the photos and the written report the same day.",
  },
  local: [
    "Norwich has the county's car supermarket, Motorpoint on Turnpike Close, plus the Cromer Road and Hall Road dealer clusters and the Jaguar Land Rover centre at Postwick, all covered on our Norwich page. King's Lynn has Sandles Car Supermarket, which has traded for more than forty years, Thurlow Nunn Vauxhall on Hardwick Road, and Holden's Renault and Dacia showroom, opened in 2025 in a former Volvo site. Group 1 closed its King's Lynn Land Rover dealership in May 2026. Great Yarmouth has Thurlow Nunn, whose family-owned group runs twelve sites across East Anglia, and Wymondham, Dereham, Fakenham and Diss have small independents.",
    "The county's trade stock passes through East Anglian Motor Auctions at Wymondham, which welcomes private buyers, and Anglia Car Auctions at the Cattlemarket in King's Lynn, which runs modern and classic sales, so plenty of forecourt cars were in an auction lane shortly before they were advertised. Lotus builds its cars at Hethel, and the long coastline from Hunstanton round to Great Yarmouth means a large share of Norfolk's cars have lived in salt air. We inspect the car before you pay, photograph the underside, read the MOT history for repeated corrosion advisories and tell you whether what we find is surface rust or structural, so you decide with the facts and negotiate from them.",
  ],
  places: [
    {
      name: "Norwich: Motorpoint, Cromer Road, Hall Road and Postwick",
      note: "The county's dealer centre. See our Norwich page for the detail.",
    },
    {
      name: "King's Lynn: Sandles, Hardwick Road and Anglia Car Auctions",
      note: "Sandles Car Supermarket, Thurlow Nunn Vauxhall, Holden Renault and Dacia, and the public auction at Hardwick Narrows. Reserve the car, tell them an inspector is coming and we check it on site.",
    },
    {
      name: "Great Yarmouth and the east coast",
      note: "Thurlow Nunn Vauxhall and the independents of Yarmouth, Gorleston and Caister. Coastal cars, so the underside matters.",
    },
    {
      name: "East Anglian Motor Auctions, Wymondham",
      note: "Family run since 1946, on its purpose-built site since 2006, and open to private buyers. We inspect cars bought there by arrangement.",
    },
    {
      name: "Thetford, Dereham, Fakenham, Cromer and the villages",
      note: "Private sellers and small forecourts across the county. Give us the postcode when you book and we arrange the time with the seller.",
    },
  ],
  watchFor: [
    {
      title: "Salt corrosion on coastal cars",
      detail:
        "Hunstanton, Wells, Cromer, Great Yarmouth and the Broads: salt-laden air settles on exposed metal and attacks sills, subframes, brake lines and exhausts, and winter gritting adds to it. We photograph the underbody, probe the structural areas and read the MOT history for repeated corrosion advisories, then tell you whether it is surface or structural.",
    },
    {
      title: "Supermarket and auction stock",
      detail:
        "Cars at Motorpoint or Sandles have been valeted and priced to move; cars fresh from Wymondham or King's Lynn have an auction grade, not an inspection. We measure paint depth, check panel gaps and sealant, read the diagnostic history and, in the Premium package, search auction and salvage records.",
    },
    {
      title: "Rural cars with long gaps in servicing",
      detail:
        "Cars from the villages often have low mileage but long intervals between services, perished tyres and brake discs corroded from standing. Low miles is not the same as well looked after, and the road test and brake measurements show the difference.",
    },
    {
      title: "Lotus and specialist cars from Hethel",
      detail:
        "The county has an unusual number of Lotus cars for sale. Bonded chassis repairs, clamshell damage, track use and patchy specialist servicing are what we look for, alongside the usual mechanical checks.",
    },
  ],
  nearby: ["Norwich", "Great Yarmouth", "Gorleston", "King's Lynn", "Downham Market", "Thetford", "Attleborough", "Wymondham", "Dereham", "Fakenham", "Cromer", "North Walsham", "Diss", "Swaffham"],
  postcodes: "NR1 to NR31, PE30 to PE38 and IP22 to IP26",
  faqs: [
    {
      question: "Do you cover King's Lynn and Great Yarmouth or only Norwich?",
      answer:
        "The whole county, at the same price, with no mileage or call-out charge: Standard £149.99, Premium £199.99, and the EV battery check £99.99. King's Lynn, Great Yarmouth, the north coast and the villages in between are all covered.",
    },
    {
      question: "Can you inspect a car bought at Anglia Car Auctions in King's Lynn before I collect it?",
      answer:
        "Yes, by arrangement with the auction once the car is yours. Pre-sale inspections are rarely possible because viewing time is short and the cars are sold as seen, but once it is paid for we can check it at Hardwick Narrows or at your home and tell you what it needs before a long drive.",
    },
    {
      question: "Can you inspect a car in Cromer or North Walsham, or is the north coast outside your area?",
      answer:
        "The north coast is covered like the rest of the county, at the same price with no mileage charge. Book online with the car's postcode and we arrange the time with the seller. Coastal cars get particular attention underneath, because salt air and winter gritting attack sills, subframes and brake lines.",
    },
    {
      question: "Will you check a Lotus from near Hethel differently from an ordinary hatchback?",
      answer:
        "Yes. The checklist is the same but the emphasis changes: bonded aluminium chassis repairs, clamshell cracks and repaints, signs of track use, cooling and clutch condition, and whether the servicing was done by someone who knows the cars. The Premium inspection's paint-depth readings on every panel matter more on a Lotus than on most cars.",
    },
  ],
  related: ["vehicle-inspection-norwich", "vehicle-inspection-suffolk", "vehicle-inspection-cambridgeshire", "vehicle-inspection-lincolnshire"],
  updated: "2026-10-20",
}
