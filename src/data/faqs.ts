export interface FAQItem {
  id: string;
  category: string;
  question: string;
  answer: string;
}

export const faqsData: FAQItem[] = [
  {
    id: "faq-1",
    category: "Booking & Delivery",
    question: "Do you offer same-day decoration delivery in Delhi NCR?",
    answer:
      "Yes! Same-day decoration booking is available across Delhi, Gurgaon, Noida, Ghaziabad, and Faridabad if booked BEFORE 4:00 PM IST. After 4:00 PM, same-day slots automatically close to ensure our florists have adequate prep time to pick fresh blooms and travel to your venue. If you book after 4 PM, you can select tomorrow or any future date.",
  },
  {
    id: "faq-2",
    category: "Freshness & Materials",
    question: "Are the flowers 100% fresh or artificial?",
    answer:
      "All our floral arrangements use 100% fresh farm-sourced flowers (Dutch roses, Asiatic lilies, orchids, carnations, Calcutta marigolds, and aromatic tuberoses/rajnigandha). We procure flowers daily at 5:00 AM from Ghazipur Flower Mandi. Frames, metallic backdrops, LED signs, and stands are provided on a rental basis and retrieved post-celebration.",
  },
  {
    id: "faq-3",
    category: "Service Areas",
    question: "Which areas do you deliver and decorate in?",
    answer:
      "We serve all locations in Delhi NCR, including South Delhi, North & West Delhi, Dwarka, Gurgaon (all DLF phases, Golf Course Ext, Sohna Rd), Noida (all sectors), Greater Noida, Ghaziabad (Indirapuram, Vaishali, Raj Nagar Extension), and Faridabad. Enter your 6-digit pincode on any decoration page to check instant coverage and delivery charges.",
  },
  {
    id: "faq-4",
    category: "Payment & Confirmation",
    question: "How does the advance payment work?",
    answer:
      "To confirm your booking and reserve your florist slot, we require only a 30% advance payment via UPI, Credit/Debit Card, or Net Banking. The remaining 70% balance is payable upon delivery and visual inspection once the decoration is completed to your 100% satisfaction.",
  },
  {
    id: "faq-5",
    category: "Cancellation & Refund",
    question: "What is your cancellation and refund policy?",
    answer:
      "We offer transparent, fair cancellation rules: 1) Free 100% refund if cancelled at least 48 hours before your booked time slot. 2) 50% refund if cancelled between 24 and 48 hours prior. 3) No refund within 24 hours of the setup time as perishable flowers are already harvested and prepped. You can cancel directly from your /account dashboard with instant refund calculation.",
  },
  {
    id: "faq-6",
    category: "Time Slots & Flexibility",
    question: "What time slots can I choose, and what is Fixed Time Delivery?",
    answer:
      "We offer three standard 4-hour operating windows: Morning (10 AM – 2 PM), Afternoon (2 PM – 6 PM), and Evening (6 PM – 10 PM). Alternatively, you can pick any flexible 3-hour window. If you require the decoration to finish by an exact minute (e.g. 5:30 PM sharp before guests arrive), you can select 'Fixed Time Delivery' for a nominal upgrade charge of ₹299.",
  },
  {
    id: "faq-7",
    category: "Setup Duration",
    question: "How long does the decoration team take to set up?",
    answer:
      "Standard room surprises and ring arches take between 1.5 to 2.5 hours. Large wedding mandaps, haldi stages, or corporate gala setups take 4 to 6 hours. Our professional decorators arrive discreetly, wear shoe covers, and clean up all snipped stems before leaving.",
  },
];
