import type { Area } from "./types"

export const essex: Area = {
  slug: "pre-purchase-car-inspection-essex",
  kind: "county",
  name: "Essex",
  h1: "Pre Purchase Car Inspection Essex",
  title: "Pre Purchase Car Inspection Essex",
  description:
    "Mobile pre-purchase car inspections across Essex from £149.99. We are based in Waltham Abbey: diagnostics, road test, history check and a same-day video report.",
  schemaType: "AdministrativeArea",
  intro:
    "Buying a used car in Essex? We are based here, so an inspection at a dealer in Chelmsford, a car supermarket on the A127 or a private seller in Colchester is a short drive. We check the car's condition, diagnostics, road behaviour and history before you pay.",
  travel: {
    summary: "Based in Waltham Abbey, so most of Essex is under an hour away",
    detail:
      "We are based in Waltham Abbey, by junction 26 of the M25. Epping, Loughton, Harlow and Brentwood are minutes away, Chelmsford and Basildon are about 40 minutes down the A12 and A127, and Southend, Colchester and Clacton are around an hour. Essex is where most of our inspections happen, so same-week and often next-day appointments are usually possible.",
  },
  local: [
    "Essex has everything from main-dealer approved-used centres to the long dealer strips along the A127 Southend Arterial Road and the A13, and a lot of small independents and driveway sellers in between. The same car can be priced very differently from one end of the county to the other, which is exactly when an independent look pays for itself.",
    "We inspect petrol, diesel, hybrid and electric cars at the seller's premises. Both packages include a full diagnostic scan, a road test, a history check for finance, write-offs, theft and mileage, a video review filmed at the car and a same-day written report with photos, followed by a call to talk it through.",
  ],
  places: [
    {
      name: "The A127 and A13 dealer strips",
      note: "The Southend Arterial Road through Basildon, Wickford and Rayleigh, and the A13 through Grays and Stanford-le-Hope, carry dozens of used-car dealers. We can be at any of them within the hour.",
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
        "Yes. The far east of the county is about an hour and a quarter from us and the price is the same as an inspection in Epping. There is no call-out or mileage charge.",
    },
  ],
  related: ["vehicle-inspection-london", "vehicle-inspection-hertfordshire", "vehicle-inspection-suffolk", "vehicle-inspection-cambridgeshire"],
  updated: "2026-10-19",
  showTestimonials: true,
}
