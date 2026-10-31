"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { CartItem, Decoration, AddOn, Coupon } from "@/types";
import { siteConfig } from "@/config/site";
import { couponsData } from "@/data/coupons";
import { useCity } from "./CityContext";

interface CartContextType {
  cart: CartItem[];
  addToCart: (
    decoration: Decoration,
    bookingDetails: CartItem["bookingDetails"],
    addons?: { addon: AddOn; quantity: number }[]
  ) => void;
  removeFromCart: (cartItemId: string) => void;
  updateAddonQuantity: (cartItemId: string, addonId: string, quantity: number) => void;
  clearCart: () => void;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  appliedCoupon: Coupon | null;
  couponError: string | null;
  applyCoupon: (code: string) => boolean;
  removeCoupon: () => void;
  // Totals
  itemsCount: number;
  subtotal: number;
  addonsTotal: number;
  fixedTimeChargesTotal: number;
  deliveryFee: number;
  discount: number;
  grandTotal: number;
  advanceToPay: number;
  balanceDue: number;
  // Wishlist
  wishlist: string[];
  toggleWishlist: (slug: string) => void;
  isInWishlist: (slug: string) => boolean;
  // Recently viewed
  recentlyViewed: string[];
  addRecentlyViewed: (slug: string) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { deliveryFee } = useCity();
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(null);
  const [couponError, setCouponError] = useState<string | null>(null);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [recentlyViewed, setRecentlyViewed] = useState<string[]>([]);
  const [isInitialized, setIsInitialized] = useState<boolean>(false);

  // Load from localStorage
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem("bloomora_cart");
      if (savedCart) setCart(JSON.parse(savedCart));

      const savedWishlist = localStorage.getItem("bloomora_wishlist");
      if (savedWishlist) setWishlist(JSON.parse(savedWishlist));

      const savedRecent = localStorage.getItem("bloomora_recent");
      if (savedRecent) setRecentlyViewed(JSON.parse(savedRecent));

      const savedCoupon = localStorage.getItem("bloomora_coupon");
      if (savedCoupon) setAppliedCoupon(JSON.parse(savedCoupon));
    } catch {
      // ignore JSON parse errors
    }
    setIsInitialized(true);
  }, []);

  // Save cart to localStorage
  useEffect(() => {
    if (!isInitialized) return;
    localStorage.setItem("bloomora_cart", JSON.stringify(cart));
  }, [cart, isInitialized]);

  // Save wishlist to localStorage
  useEffect(() => {
    if (!isInitialized) return;
    localStorage.setItem("bloomora_wishlist", JSON.stringify(wishlist));
  }, [wishlist, isInitialized]);

  // Save recently viewed to localStorage
  useEffect(() => {
    if (!isInitialized) return;
    localStorage.setItem("bloomora_recent", JSON.stringify(recentlyViewed));
  }, [recentlyViewed, isInitialized]);

  const addToCart = (
    decoration: Decoration,
    bookingDetails: CartItem["bookingDetails"],
    addons: { addon: AddOn; quantity: number }[] = []
  ) => {
    const newItem: CartItem = {
      id: `${decoration.id}-${Date.now()}`,
      decoration,
      selectedAddons: addons,
      bookingDetails,
    };
    setCart((prev) => [...prev, newItem]);
    setIsCartOpen(true);
  };

  const removeFromCart = (cartItemId: string) => {
    setCart((prev) => prev.filter((item) => item.id !== cartItemId));
  };

  const updateAddonQuantity = (
    cartItemId: string,
    addonId: string,
    quantity: number
  ) => {
    setCart((prev) =>
      prev.map((item) => {
        if (item.id !== cartItemId) return item;
        let updatedAddons = [...item.selectedAddons];
        if (quantity <= 0) {
          updatedAddons = updatedAddons.filter((a) => a.addon.id !== addonId);
        } else {
          const index = updatedAddons.findIndex((a) => a.addon.id === addonId);
          if (index >= 0) {
            updatedAddons[index] = {
              ...updatedAddons[index],
              quantity,
            };
          }
        }
        return { ...item, selectedAddons: updatedAddons };
      })
    );
  };

  const clearCart = () => {
    setCart([]);
    setAppliedCoupon(null);
    localStorage.removeItem("bloomora_cart");
    localStorage.removeItem("bloomora_coupon");
  };

  const applyCoupon = (code: string): boolean => {
    setCouponError(null);
    const cleanCode = code.trim().toUpperCase();
    const found = couponsData.find((c) => c.code.toUpperCase() === cleanCode);

    if (!found) {
      setCouponError("Invalid promo code. Try 'BLOOM10' for 10% off!");
      return false;
    }

    const currentSubtotal = cart.reduce(
      (sum, item) => sum + item.decoration.price,
      0
    );

    if (currentSubtotal < found.minOrder) {
      setCouponError(
        `Code ${found.code} is valid only on bookings above ₹${found.minOrder.toLocaleString()}`
      );
      return false;
    }

    setAppliedCoupon(found);
    localStorage.setItem("bloomora_coupon", JSON.stringify(found));
    return true;
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    setCouponError(null);
    localStorage.removeItem("bloomora_coupon");
  };

  const toggleWishlist = (slug: string) => {
    setWishlist((prev) =>
      prev.includes(slug) ? prev.filter((s) => s !== slug) : [...prev, slug]
    );
  };

  const isInWishlist = (slug: string) => wishlist.includes(slug);

  const addRecentlyViewed = (slug: string) => {
    setRecentlyViewed((prev) => {
      const filtered = prev.filter((s) => s !== slug);
      return [slug, ...filtered].slice(0, 10);
    });
  };

  // Calculations
  const itemsCount = cart.length;

  const subtotal = cart.reduce(
    (sum, item) => sum + item.decoration.price,
    0
  );

  const addonsTotal = cart.reduce((sum, item) => {
    const itemAddons = item.selectedAddons.reduce(
      (aSum, a) => aSum + a.addon.price * a.quantity,
      0
    );
    return sum + itemAddons;
  }, 0);

  const fixedTimeChargesTotal = cart.reduce((sum, item) => {
    if (item.bookingDetails.slotType === "fixed") {
      return sum + siteConfig.bookingRules.fixedTimeFee;
    }
    return sum;
  }, 0);

  let discount = 0;
  if (appliedCoupon) {
    const rawDiscount =
      (subtotal * appliedCoupon.discountPercent) / 100;
    discount = appliedCoupon.maxDiscount
      ? Math.min(rawDiscount, appliedCoupon.maxDiscount)
      : rawDiscount;
  }

  const grandTotal = Math.max(
    0,
    subtotal + addonsTotal + fixedTimeChargesTotal + deliveryFee - discount
  );

  // 30% advance payment rule
  const advancePercent = siteConfig.bookingRules.advancePaymentPercent;
  const advanceToPay = Math.round((grandTotal * advancePercent) / 100);
  const balanceDue = grandTotal - advanceToPay;

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateAddonQuantity,
        clearCart,
        isCartOpen,
        setIsCartOpen,
        appliedCoupon,
        couponError,
        applyCoupon,
        removeCoupon,
        itemsCount,
        subtotal,
        addonsTotal,
        fixedTimeChargesTotal,
        deliveryFee,
        discount,
        grandTotal,
        advanceToPay,
        balanceDue,
        wishlist,
        toggleWishlist,
        isInWishlist,
        recentlyViewed,
        addRecentlyViewed,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
