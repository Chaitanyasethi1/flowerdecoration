import { Coupon } from "@/types";

export const couponsData: Coupon[] = [
  {
    code: "BLOOM10",
    discountPercent: 10,
    maxDiscount: 1000,
    minOrder: 1999,
    validTill: "30 Nov 2026",
    description: "Flat 10% OFF on all home & venue decorations.",
  },
  {
    code: "WELCOME500",
    discountPercent: 12,
    maxDiscount: 500,
    minOrder: 2999,
    validTill: "31 Dec 2026",
    description: "Flat ₹500 discount on your first booking with Bloomora.",
  },
  {
    code: "FESTIVE15",
    discountPercent: 15,
    maxDiscount: 1500,
    minOrder: 4999,
    validTill: "15 Nov 2026",
    description: "Festive special: 15% OFF on Diwali and wedding setups above ₹4,999.",
  },
];
