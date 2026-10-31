export type OccasionSlug =
  | "birthday"
  | "anniversary"
  | "wedding"
  | "haldi-mehndi"
  | "baby-shower"
  | "welcome-baby"
  | "naming-ceremony"
  | "engagement"
  | "griha-pravesh"
  | "first-night"
  | "proposal"
  | "corporate"
  | "festival"
  | "pooja-mandir"
  | "car-decoration";

export interface Occasion {
  id: string;
  name: string;
  slug: OccasionSlug;
  emoji: string;
  shortDesc: string;
  image: string;
  itemCount: number;
  popularSearch: boolean;
}

export interface AddOn {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: "cakes" | "bouquets" | "lights" | "extras" | "services";
  description?: string;
}

export interface Decoration {
  id: string;
  slug: string;
  name: string;
  occasion: string;
  occasionSlug: OccasionSlug;
  price: number;
  originalPrice: number;
  discountPercent: number;
  rating: number;
  reviewsCount: number;
  images: string[];
  isTrending?: boolean;
  isBestSeller?: boolean;
  isSameDayAvailable: boolean;
  flowerType: string[];
  colorTheme: string[];
  hasBalloons: boolean;
  locationType: "Home" | "Hall" | "Car" | "Office" | "Outdoor";
  inclusions: string[];
  dimensions: string;
  setupTime: string;
  description: string;
  careTips: string[];
  faqs?: { q: string; a: string }[];
}

export interface FlowerBouquet {
  id: string;
  slug: string;
  name: string;
  price: number;
  originalPrice: number;
  image: string;
  stems: string;
  tag: string;
}

export interface CartItem {
  id: string; // unique item id in cart
  decoration: Decoration;
  selectedAddons: {
    addon: AddOn;
    quantity: number;
  }[];
  bookingDetails: {
    date: string;
    city: string;
    slotType: "slot" | "fixed" | "custom3hr";
    slotValue: string; // "10:00 AM – 02:00 PM", "05:30 PM", or "4:00 PM – 7:00 PM"
    pincode: string;
    locationType: string;
    bannerMessage?: string;
    specialNote?: string;
  };
}

export interface Order {
  id: string;
  items: CartItem[];
  customer: {
    name: string;
    phone: string;
    email: string;
  };
  eventDetails: {
    occasion: string;
    bannerMessage: string;
    eventDate: string;
    slot: string;
  };
  address: {
    house: string;
    area: string;
    city: string;
    pincode: string;
    landmark?: string;
    locationType: string;
    floorLift: string;
  };
  pricing: {
    subtotal: number;
    addonsTotal: number;
    fixedTimeCharge: number;
    deliveryCharge: number;
    discount: number;
    total: number;
    advancePaid: number;
    balanceDue: number;
    couponCode?: string;
  };
  paymentMethod: "upi" | "card" | "netbanking" | "pod";
  paymentStatus: "advance_paid" | "fully_paid" | "pending";
  orderStatus: "new" | "confirmed" | "decorating" | "completed" | "cancelled";
  createdAt: string;
  cancelReason?: string;
  cancelledAt?: string;
  refundAmount?: number;
}

export interface Review {
  id: string;
  name: string;
  location: string;
  rating: number;
  date: string;
  title: string;
  comment: string;
  occasion: string;
  verified: boolean;
  userImage?: string;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  date: string;
  readTime: string;
  category: string;
  author: string;
}

export interface Coupon {
  code: string;
  discountPercent: number;
  maxDiscount?: number;
  minOrder: number;
  validTill: string;
  description: string;
}
