import type { Area } from "./types"

export const essex: Area = {
  slug: "pre-purchase-car-inspection-essex",
  kind: "county",
  name: "Essex",
  h1: "Pre Purchase Car Inspection Essex",
  title: "Pre Purchase Car Inspection Essex",
  description:
    "Mobile pre-purchase car inspections across Essex from £149.99, our home county. Diagnostics, road test, history check and a same-day video report.",
  schemaType: "AdministrativeArea",
  intro:
    "Buying a used car in Essex? This is our home county, so a dealer in Chelmsford, a car supermarket on the A127 or a private seller in Colchester is familiar ground. We check the car's condition, diagnostics, road behaviour and history before you pay, with a video report the same day.",
  travel: {
    summary: "Covering the whole of Essex, from Epping to Clacton, at one price with no mileage charge",
    detail:
      "Essex is where most of our inspections happen, so appointments are often available at short notice. Epping, Harlow, Brentwood, Chelmsford, Basildon, Southend, Colchester and Clacton are all the same price, with no mileage or call-out charge. Book online, tell us where the car is, and we arrange the time with the seller or dealer. You get the video, the photos and the written report the same day.",
  },
  local: [
    "Essex has everything from main-dealer approved-used centres to the long dealer strips along the A127 Southend Arterial Road and the A13, and a lot of small independents and driveway sellers in between. The same car can be priced very differently from one end of the county to the other, which is exactly when an independent look pays for itself.",
    "We inspect petrol, diesel, hybrid and electric cars at the seller's premises. Both packages include a full diagnostic scan, a road test, a history check for finance, write-offs, theft and mileage, a video review filmed at the car and a same-day written report with photos, followed by a call to talk it through.",
  ],
  places: [
    {
      name: "The A127 and A13 dealer strips",
      note: "The Southend Arterial Road through Basildon, Wickford and Rayleigh, and the A13 through Grays and Stanford-le-Hope, carry dozens of used-car dealers. Reserve the car, tell them an independent inspector is coming and we inspect it on the forecourt.",
    },
    {
      name: "Prestige and approved-used dealers",
      note: "Chelmsford, Brentwood, Romford and Colchester have most of the county's franchised dealers. A manufacturer's approved-used badge is reassuring but it is still the dealer's own check, not an independent one.",
    },
    {
      name: "Canvey Island and Southend independents",
      note: "A high turnover of cheaper and imported cars. A recent Premium inspection on Canvey Island was on a UAE-import Dodge Charger with no UK registration: see what we found below.",
    },
    {
      name: "Auction cars",
      note: "Plenty of Essex trade stock comes through BCA and Manheim sales. If you are buying a car that was recently sold at auction, the Premium inspection's auction and salvage searches are the ones to book.",
    },
    {
      name: "Private sellers",
      note: "Driveways from Epping to Clacton. Tell us the postcode when you book and we arrange a time with the seller if you cannot be there.",
    },
  ],
  watchFor: [
    {
      title: "Body filler under fresh paint",
      detail:
        "On a UAE-import Dodge Charger at a dealer on Canvey Island the paint-depth readings on the front wing and rear quarter were consistent with a large amount of body filler, and the rear bumper had been replaced and painted badly enough to stop the parking sensors working. The dealer had told the buyer by phone that there were no issues. The verdict was not to proceed.",
    },
    {
      title: "Fault memory cleared just before the viewing",
      detail:
        "The same Dodge showed about 1 km driven since its fault codes were last cleared, and it needed a jump start. A clean scan on a car that has just been reset proves nothing, so we read the distance since clear on every car and tell you what it means.",
    },
    {
      title: "Leaks and warnings on prestige 4x4s",
      detail:
        "A 72-plate Land Rover Discovery at a prestige dealer in Wickford had oil spread across the underside and a coolant warning. Both were written up before Dave paid, and the dealer put them right: a gasket and a sensor.",
    },
    {
      title: "Cat S and Cat N repairs",
      detail:
        "Written-off and repaired cars are common at the cheaper end of the Essex market. The history check shows the category; the inspection shows whether the repair was done properly, with paint readings, panel gaps and sealant checked.",
    },
  ],
  nearby: ["Epping", "Loughton", "Harlow", "Brentwood", "Romford", "Chelmsford", "Basildon", "Wickford", "Southend-on-Sea", "Colchester", "Braintree", "Clacton-on-Sea"],
  postcodes: "CM, CO, IG, RM, SS and the EN9 and EN10 districts",
  faqs: [
    {
      question: "Can you inspect a car on the A127 at Basildon or Wickford today?",
      answer:
        "Often, yes. The online calendar shows times from 9am to 6pm for the next 30 days. Anything within 24 hours needs confirming by WhatsApp first so we can check the diary and the seller, so message us with the postcode and we will tell you straight away.",
    },
    {
      question: "The dealer is Essex-based and offers their own 'pre-delivery inspection'. Do I still need you?",
      answer:
        "A dealer's PDI is a check they do on their own stock, to their own standard, and it is not written for you. We work for you only, with no commission from the sale, and you get the video, the photos and the report whatever the result.",
    },
    {
      question: "The car is a Cat N or Cat S write-off. Is an inspection worth it?",
      answer:
        "Yes, more than on any other car. The category tells you it was written off, not how well it was repaired. We check paint depth across every panel, panel gaps, sealant and underbody for signs of the repair, and tell you whether the price reflects what we find.",
    },
    {
      question: "Do you cover the whole county, including Colchester, Clacton and Harwich?",
      answer:
        "Yes. The price is the same anywhere in Essex, with no mileage or call-out charge: Standard £149.99, Premium £199.99, and the EV battery check £99.99.",
    },
  ],
  related: ["vehicle-inspection-london", "vehicle-inspection-hertfordshire", "vehicle-inspection-suffolk", "vehicle-inspection-cambridgeshire"],
  updated: "2026-10-20",
  showTestimonials: true,
}
