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
    "Buying a used car in Norfolk? From Motorpoint in Norwich and the A140 dealers to Sandles and Anglia Car Auctions in King's Lynn and the Thurlow Nunn sites in Great Yarmouth, we drive to the car and inspect it before you commit, with diagnostics, a road test, a history check and a same-day video report. And because most of Norfolk is within reach of the sea, we take the underside seriously.",
  travel: {
    summary: "A11 to Norwich in two hours, A10 to King's Lynn, A47 to Yarmouth: no mileage charge anywhere in the county",
    detail:
      "Norwich is about 105 miles from Waltham Abbey by the M11 and A11, around two hours off peak, and Thetford and Attleborough are on the way. For King's Lynn and Downham Market we take the M11 and A10 through Ely; for Great Yarmouth the A47 beyond Norwich; for Cromer and North Walsham the A140 north. The far coast is a two-and-a-half-hour drive, so we pair it with another job in the county. One price everywhere, with no mileage charge.",
  },
  local: [
    "Norwich has the county's only car supermarket, Motorpoint on Turnpike Close, plus the Cromer Road and Hall Road dealer clusters and the Jaguar Land Rover centre at Postwick, covered on our Norwich page. King's Lynn has Sandles Car Supermarket, which has traded for more than forty years, Thurlow Nunn Vauxhall on Hardwick Road, and Holden's Renault and Dacia showroom, opened in 2025 in a former Volvo site; Group 1 closed its King's Lynn Land Rover dealership in May 2026. Great Yarmouth has Thurlow Nunn, and Thurlow Nunn's family-owned group runs twelve sites across East Anglia. Wymondham, Dereham, Fakenham and Diss have small independents.",
    "Norfolk's trade stock passes through East Anglian Motor Auctions at Wymondham, which welcomes private buyers, and Anglia Car Auctions at the Cattlemarket in King's Lynn, which runs modern and classic sales. Lotus builds its cars at Hethel, and the county's long coastline from Hunstanton round to Great Yarmouth means a large share of its cars have lived in salt air.",
  ],
  places: [
    {
      name: "Norwich: Motorpoint, Cromer Road, Hall Road and Postwick",
      note: "The county's dealer centre. See our Norwich page for the detail.",
    },
    {
      name: "King's Lynn: Sandles, Hardwick Road and Anglia Car Auctions",
      note: "Sandles Car Supermarket, Thurlow Nunn Vauxhall, Holden Renault and Dacia, and the public auction at Hardwick Narrows. Reached by the A10 through Ely.",
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
      note: "Private sellers and small forecourts across the county. Give us the postcode when you book and we will tell you when we are next passing.",
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
        "The whole county, at the same price. Norwich is two hours from us, King's Lynn a little under that by the A10, and Great Yarmouth and the north coast about two and a half hours. For the coast we ask for some flexibility on the time so we can pair it with another Norfolk inspection.",
    },
    {
      question: "Can you inspect a car bought at Anglia Car Auctions in King's Lynn before I collect it?",
      answer:
        "Yes, by arrangement with the auction once the car is yours. Pre-sale inspections are rarely possible because viewing time is short and the cars are sold as seen, but once it is paid for we can check it at Hardwick Narrows or at your home and tell you what it needs before a long drive.",
    },
    {
      question: "Is the drive from Waltham Abbey to Cromer or North Walsham too far for a same-week booking?",
      answer:
        "No. It is about two and a half hours, and we are in Norfolk regularly. Book online and pick a time; if we need to move it an hour or two to pair it with another job in the county, we will tell you straight away. There is no mileage charge.",
    },
    {
      question: "Will you check a Lotus from near Hethel differently from an ordinary hatchback?",
      answer:
        "Yes. The checklist is the same but the emphasis changes: bonded aluminium chassis repairs, clamshell cracks and repaints, signs of track use, cooling and clutch condition, and whether the servicing was done by someone who knows the cars. The Premium inspection's paint-depth readings on every panel matter more on a Lotus than on most cars.",
    },
  ],
  related: ["vehicle-inspection-norwich", "vehicle-inspection-suffolk", "vehicle-inspection-cambridgeshire", "vehicle-inspection-lincolnshire"],
  updated: "2026-10-19",
}
