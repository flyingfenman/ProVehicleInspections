import { testimonials } from "@/lib/testimonials"

export type Review = {
  name: string
  /** What the customer said, word for word (an ellipsis marks a cut). */
  quote: string
  /** The whole review, word for word, one string per paragraph, when the quote above is cut. */
  full?: string[]
}

// Every real customer review we have, for the sliding reviews strip near the bottom of the pages. Never invent or
// reword one: add a new review here only when a customer has actually written it. Long reviews are cut with an
// ellipsis so every card stays a similar size; the words that are shown are exactly the customer's, and "Read the
// full review" opens the whole thing.
export const reviews: Review[] = [
  // Sent to Henry by customers, 5 November 2026, word for word.
  {
    name: "Erik",
    quote:
      "I can’t recommend Henry highly enough! He was professional, honest, thorough and incredibly helpful throughout the whole process. … His inspection gave me peace of mind and potentially saved me from making the wrong purchase. … It’s rare to find someone who genuinely cares about their customers rather than just doing a job.",
    full: [
      "I can’t recommend Henry highly enough! He was professional, honest, thorough and incredibly helpful throughout the whole process. He took the time to explain everything clearly and helped me make an informed decision before buying a car.",
      "His inspection gave me peace of mind and potentially saved me from making the wrong purchase. What impressed me most was his honesty, kindness and genuine willingness to help. He never made me feel rushed or pressured, and he was happy to answer my questions.",
      "It’s rare to find someone who genuinely cares about their customers rather than just doing a job. I’m very grateful for his help and would absolutely recommend Henry to anyone looking for an independent car inspection.",
      "Thank you, Henry, for your excellent service and support! 😊",
    ],
  },
  {
    name: "Johnathan",
    quote:
      "We were looking to purchase a used car from a dealership in Peterborough. We wanted a second opinion and booked a premium inspection with an EV battery health check. The service from Henry was excellent. The report was full of information and he talked it through with us until we understood and were happy to go ahead with the purchase. Highly recommended.",
  },
  {
    // Also posted on the Epping Car Buyer Google profile as "H", 21 October 2026.
    name: "Helen",
    quote:
      "I can’t recommend Henry highly enough. He was incredibly thorough and took the time to explain everything clearly … I genuinely feel the £199 inspection was some of the best money I’ve ever spent. It gave me the confidence to walk away from paying too much initially and then negotiate a better price.",
    full: [
      "I can’t recommend Henry highly enough. He was incredibly thorough and took the time to explain everything clearly, including both the positives and the negatives of the car rather than just giving me a list of faults. I really appreciated that, because it gave me a much more balanced idea of what I was actually buying.",
      "He checked the car properly, talked me through what would likely need doing over the next year, what was minor, and what genuinely mattered. He also reassured me about the things that were good about the car, which helped me make a sensible decision rather than just worrying about every little issue.",
      "He was friendly, honest and clearly very knowledgeable. I genuinely feel the £199 inspection was some of the best money I’ve ever spent. It gave me the confidence to walk away from paying too much initially and then negotiate a better price, and I now feel much more informed about the car I’ve bought.",
      "I would absolutely use him again and would recommend him to anyone buying a used car.",
    ],
  },
  {
    name: "Andre",
    quote:
      "Henry inspected a Volkswagen e-Golf I was considering purchasing and identified some substantial faults, including the heating not working. On a 30-degree day, this is something I probably wouldn’t have thought to test myself, so I’m incredibly grateful that he picked it up and made me aware of the issues before I committed to buying the car. …",
    full: [
      "Henry inspected a Volkswagen e-Golf I was considering purchasing and identified some substantial faults, including the heating not working. On a 30-degree day, this is something I probably wouldn’t have thought to test myself, so I’m incredibly grateful that he picked it up and made me aware of the issues before I committed to buying the car.",
      "He then went on to inspect another vehicle for me, which I ultimately purchased, and provided excellent advice that gave me real confidence in my decision.",
    ],
  },
  {
    name: "Sarah",
    quote:
      "I had a vehicle inspection done in London for a 2014 transit. It was so thorough I was very impressed and thankful as this looked like a van I would buy but it would have cost me a fortune. Henry’s communication was excellent. Great communication. Excellent report. Will 100% use again. Thank you 😊",
  },
  {
    name: "Flora",
    quote:
      "I had a great experience with Pro Vehicle Inspections. The process was quick, transparent, and stress free from start to finish. Henry was very knowledgeable, answered all of my questions.",
  },
  {
    name: "Dan",
    quote:
      "Inspection was carried out extremely thoroughly, the inspection needed the wheel to be removed to get to the suspected part on the car, the inspector went above and beyond and took alot of time to find the route cause of the problem, as well as submitting me a thorough report with alot of detail and photos and videos that I can use if needed.",
  },
  {
    name: "Stuart",
    quote: "Trustworthy and a pleasure to deal with. Will be recommending to friends and family and anyone else who wants to listen.",
  },
  {
    name: "Dan",
    quote: "Really helpful, couldn’t recommend enough.",
  },
  ...testimonials.map((t) => ({ name: t.name, quote: t.quote, full: t.fullReview })),
]
