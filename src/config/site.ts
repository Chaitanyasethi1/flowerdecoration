export interface SiteConfig {
  name: string;
  tagline: string;
  description: string;
  url: string;
  phone: string;
  phoneDisplay: string;
  whatsapp: string;
  whatsappDisplay: string;
  email: string;
  timing: string;
  sinceYear: number;
  eventsCount: string;
  happyCustomersCount: string;
  avgRating: string;
  citiesCount: string;
  instagram: string;
  instagramHandle: string;
  address: string;
  announcement: {
    enabled: boolean;
    text: string;
    code: string;
    discountPercent: number;
    link: string;
  };
  cities: {
    id: string;
    name: string;
    isPrimary: boolean;
    deliveryFee: number;
    pincodes: string[];
  }[];
  bookingRules: {
    sameDayCutoffHourIST: number; // 16 means 4:00 PM IST
    fixedTimeFee: number;
    advancePaymentPercent: number; // e.g. 30%
    standardSlots: {
      id: string;
      label: string;
      timeRange: string;
      status: "Available" | "Few left" | "Sold out";
    }[];
    cancellationPolicy: {
      freeCancellationHours: number;
      partialRefundHours: number;
      partialRefundPercent: number;
    };
  };
}

export const siteConfig: SiteConfig = {
  name: "Bloomora Decor",
  tagline: "Flowers that make every moment unforgettable",
  description:
    "Delhi NCR's premier fresh flower & balloon decoration service. Birthday, Wedding, Baby Shower, Haldi, Griha Pravesh & Corporate decorations delivered & setup across Delhi, Noida, Gurgaon, Ghaziabad & Faridabad.",
  url: "https://bloomoradecor.com",
  phone: "9717212164",
  phoneDisplay: "+91 97172 12164",
  whatsapp: "919717212164",
  whatsappDisplay: "+91 97172 12164",
  email: "hello@bloomoradecor.com",
  timing: "Open daily 8:00 AM – 10:00 PM IST",
  sinceYear: 2015,
  eventsCount: "12,000+",
  happyCustomersCount: "9,500+",
  avgRating: "4.9★",
  citiesCount: "5 Cities / 9 Hubs",
  instagram: "https://instagram.com/bloomoradecor",
  instagramHandle: "@bloomoradecor",
  address: "Flagship Studio: Sector 44, Gurgaon & South Extension Part II, New Delhi",
  announcement: {
    enabled: true,
    text: "🪔 Diwali Special: Flat 10% off home decor with code BLOOM10",
    code: "BLOOM10",
    discountPercent: 10,
    link: "/offers",
  },
  cities: [
    {
      id: "delhi",
      name: "Delhi",
      isPrimary: true,
      deliveryFee: 0,
      pincodes: ["110001", "110003", "110016", "110017", "110019", "110020", "110024", "110025", "110029", "110048", "110049", "110065", "110070", "110075", "110085", "110092"],
    },
    {
      id: "gurgaon",
      name: "Gurgaon",
      isPrimary: true,
      deliveryFee: 0,
      pincodes: ["122001", "122002", "122003", "122008", "122011", "122015", "122018", "122022", "122050", "122051", "122102"],
    },
    {
      id: "noida",
      name: "Noida",
      isPrimary: true,
      deliveryFee: 0,
      pincodes: ["201301", "201303", "201304", "201305", "201306", "201307", "201309", "201310"],
    },
    {
      id: "ghaziabad",
      name: "Ghaziabad",
      isPrimary: false,
      deliveryFee: 149,
      pincodes: ["201001", "201002", "201005", "201009", "201010", "201012", "201014"],
    },
    {
      id: "faridabad",
      name: "Faridabad",
      isPrimary: false,
      deliveryFee: 199,
      pincodes: ["121001", "121002", "121003", "121004", "121006", "121007"],
    },
    {
      id: "greater-noida",
      name: "Greater Noida",
      isPrimary: false,
      deliveryFee: 199,
      pincodes: ["201308", "201310", "201312", "201314"],
    },
  ],
  bookingRules: {
    sameDayCutoffHourIST: 16, // 4:00 PM IST
    fixedTimeFee: 299,
    advancePaymentPercent: 30,
    standardSlots: [
      {
        id: "morning",
        label: "Morning Slot",
        timeRange: "10:00 AM – 02:00 PM",
        status: "Available",
      },
      {
        id: "afternoon",
        label: "Afternoon Slot",
        timeRange: "02:00 PM – 06:00 PM",
        status: "Few left",
      },
      {
        id: "evening",
        label: "Evening Slot",
        timeRange: "06:00 PM – 10:00 PM",
        status: "Available",
      },
    ],
    cancellationPolicy: {
      freeCancellationHours: 48,
      partialRefundHours: 24,
      partialRefundPercent: 50,
    },
  },
};
