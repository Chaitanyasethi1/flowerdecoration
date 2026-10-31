"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ShoppingBag,
  Trash2,
  Plus,
  Minus,
  Tag,
  ArrowRight,
  ShieldCheck,
  Clock,
  MapPin,
  Calendar,
  X,
} from "lucide-react";
import { useCart } from "@/context/CartContext";
import { siteConfig } from "@/config/site";

export default function CartPage() {
  const {
    cart,
    removeFromCart,
    updateAddonQuantity,
    clearCart,
    appliedCoupon,
    couponError,
    applyCoupon,
    removeCoupon,
    subtotal,
    addonsTotal,
    fixedTimeChargesTotal,
    deliveryFee,
    discount,
    grandTotal,
    advanceToPay,
    balanceDue,
  } = useCart();

  const [couponInput, setCouponInput] = useState("");

  if (cart.length === 0) {
    return (
      <div className="py-20 bg-cream-50/40 min-h-[70vh] flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4 space-y-4">
          <div className="w-24 h-24 mx-auto rounded-full bg-rose-50 flex items-center justify-center text-4xl shadow-xs">
            🌸
          </div>
          <h1 className="font-serif text-2xl sm:text-3xl font-extrabold text-stone-900">
            Your Cart is Empty
          </h1>
          <p className="text-sm text-stone-500">
            You haven&apos;t added any floral decoration setups yet. Explore our 15 occasions and surprise your loved ones.
          </p>
          <div className="pt-2">
            <Link
              href="/decorations/all"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-sm shadow-md transition-all"
            >
              <span>Explore 40+ Designs</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="py-12 bg-cream-50/40 min-h-screen">
      <div className="container mx-auto px-4">
        {/* Title */}
        <div className="flex items-center justify-between pb-6 mb-8 border-b border-rose-100">
          <div>
            <h1 className="font-serif text-2xl sm:text-4xl font-extrabold text-stone-900 tracking-tight">
              Review Your Booking Cart
            </h1>
            <p className="text-xs sm:text-sm text-stone-500 mt-1">
              {cart.length} decoration package{cart.length > 1 ? "s" : ""} selected for Delhi NCR setup
            </p>
          </div>
          <button
            onClick={clearCart}
            className="text-xs font-semibold text-rose-600 hover:underline"
          >
            Clear cart
          </button>
        </div>

        {/* 2-Column Cart Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left: Cart Items List */}
          <div className="lg:col-span-8 space-y-4">
            {cart.map((item) => (
              <div
                key={item.id}
                className="p-5 sm:p-6 rounded-3xl bg-white border border-stone-200/80 shadow-xs space-y-4"
              >
                <div className="flex flex-col sm:flex-row gap-4">
                  {/* Image */}
                  <div className="relative w-full sm:w-36 h-36 rounded-2xl overflow-hidden shrink-0 bg-stone-100">
                    <Image
                      src={item.decoration.images[0]}
                      alt={item.decoration.name}
                      fill
                      className="object-cover"
                    />
                  </div>

                  {/* Info */}
                  <div className="flex-1 space-y-2">
                    <div className="flex items-start justify-between">
                      <div>
                        <span className="text-xs font-bold text-rose-600 uppercase tracking-wider">
                          {item.decoration.occasion}
                        </span>
                        <h3 className="font-serif font-bold text-lg text-stone-900">
                          {item.decoration.name}
                        </h3>
                      </div>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-stone-400 hover:text-rose-600 p-1.5 transition-colors"
                        title="Remove item"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>

                    <div className="flex items-baseline gap-2">
                      <span className="font-serif text-xl font-extrabold text-stone-900">
                        ₹{item.decoration.price.toLocaleString()}
                      </span>
                      {item.decoration.originalPrice > item.decoration.price && (
                        <span className="text-xs text-stone-400 line-through">
                          ₹{item.decoration.originalPrice.toLocaleString()}
                        </span>
                      )}
                    </div>

                    {/* Booking Meta Pill */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 p-3 bg-stone-50 rounded-2xl text-xs text-stone-700">
                      <div className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-rose-500" />
                        <span className="font-medium">{item.bookingDetails.date}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-amber-500" />
                        <span className="truncate">{item.bookingDetails.slotValue}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-emerald-500" />
                        <span>{item.bookingDetails.city}</span>
                      </div>
                    </div>

                    {item.bookingDetails.bannerMessage && (
                      <p className="text-xs text-stone-500 italic">
                        Custom Banner Text: &ldquo;{item.bookingDetails.bannerMessage}&rdquo;
                      </p>
                    )}
                  </div>
                </div>

                {/* Selected Add-ons row */}
                {item.selectedAddons && item.selectedAddons.length > 0 && (
                  <div className="pt-3 border-t border-stone-100 space-y-2">
                    <span className="text-xs font-bold text-stone-800 uppercase tracking-wider block">
                      Custom Celebration Add-ons:
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {item.selectedAddons.map(({ addon, quantity }) => (
                        <div
                          key={addon.id}
                          className="flex items-center justify-between p-2.5 rounded-xl bg-stone-50 border border-stone-200/60 text-xs"
                        >
                          <div className="truncate pr-2">
                            <span className="font-semibold text-stone-900 block truncate">
                              {addon.name}
                            </span>
                            <span className="text-stone-400 text-[11px]">
                              ₹{addon.price} x {quantity} = ₹{addon.price * quantity}
                            </span>
                          </div>
                          <div className="flex items-center gap-1.5 shrink-0 bg-white p-1 rounded-lg border border-stone-200">
                            <button
                              onClick={() =>
                                updateAddonQuantity(item.id, addon.id, quantity - 1)
                              }
                              className="w-5 h-5 rounded flex items-center justify-center hover:bg-stone-100"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="font-bold text-xs w-4 text-center">
                              {quantity}
                            </span>
                            <button
                              onClick={() =>
                                updateAddonQuantity(item.id, addon.id, quantity + 1)
                              }
                              className="w-5 h-5 rounded flex items-center justify-center bg-rose-600 text-white"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Right: Summary & Checkout */}
          <div className="lg:col-span-4 space-y-6 sticky top-24">
            {/* Promo code */}
            <div className="p-5 rounded-3xl bg-white border border-stone-200 shadow-xs space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-stone-800 uppercase tracking-wider flex items-center gap-1.5">
                  <Tag className="w-3.5 h-3.5 text-amber-500" />
                  <span>Promo Code</span>
                </span>
                <button
                  onClick={() => {
                    setCouponInput("BLOOM10");
                    applyCoupon("BLOOM10");
                  }}
                  className="text-xs text-rose-600 font-bold hover:underline"
                >
                  Use BLOOM10
                </button>
              </div>

              {appliedCoupon ? (
                <div className="flex items-center justify-between bg-emerald-50 text-emerald-800 border border-emerald-200 px-3 py-2 rounded-xl text-xs font-bold">
                  <span>✓ {appliedCoupon.code} applied (-₹{discount.toLocaleString()})</span>
                  <button onClick={removeCoupon} className="text-stone-400 hover:text-emerald-950">
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="e.g. BLOOM10"
                    value={couponInput}
                    onChange={(e) => setCouponInput(e.target.value.toUpperCase())}
                    className="flex-1 px-3.5 py-2 text-xs rounded-xl border border-stone-200 uppercase font-semibold text-stone-800 focus:outline-none focus:ring-2 focus:ring-rose-500"
                  />
                  <button
                    onClick={() => applyCoupon(couponInput)}
                    className="px-4 py-2 bg-stone-900 hover:bg-stone-800 text-white font-bold text-xs rounded-xl transition-colors"
                  >
                    Apply
                  </button>
                </div>
              )}
              {couponError && (
                <p className="text-[11px] text-rose-600 font-semibold">{couponError}</p>
              )}
            </div>

            {/* Bill Summary */}
            <div className="p-6 rounded-3xl bg-white border border-stone-200 shadow-xs space-y-3 text-xs">
              <h3 className="font-serif font-bold text-base text-stone-900 uppercase tracking-wider">
                Price Breakdown
              </h3>
              <div className="flex justify-between text-stone-600">
                <span>Decorations Subtotal</span>
                <span>₹{subtotal.toLocaleString()}</span>
              </div>
              {addonsTotal > 0 && (
                <div className="flex justify-between text-stone-600">
                  <span>Add-ons Total</span>
                  <span>+₹{addonsTotal.toLocaleString()}</span>
                </div>
              )}
              {fixedTimeChargesTotal > 0 && (
                <div className="flex justify-between text-stone-600">
                  <span>Fixed Time Delivery</span>
                  <span>+₹{fixedTimeChargesTotal.toLocaleString()}</span>
                </div>
              )}
              <div className="flex justify-between text-stone-600">
                <span>Delhi NCR Delivery Fee</span>
                <span>{deliveryFee === 0 ? "FREE" : `+₹${deliveryFee}`}</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-emerald-600 font-bold">
                  <span>Coupon Discount ({appliedCoupon?.code})</span>
                  <span>-₹{discount.toLocaleString()}</span>
                </div>
              )}

              <div className="pt-3 border-t border-stone-200 flex justify-between font-extrabold text-base text-stone-900">
                <span>Grand Total</span>
                <span>₹{grandTotal.toLocaleString()}</span>
              </div>

              {/* 30% Advance Box */}
              <div className="mt-3 p-3.5 rounded-2xl bg-rose-50 border border-rose-200 space-y-1.5">
                <div className="flex justify-between font-extrabold text-rose-700 text-sm">
                  <span>Advance to Confirm (30%)</span>
                  <span>₹{advanceToPay.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-stone-500 text-xs">
                  <span>Remaining on Delivery (70%)</span>
                  <span>₹{balanceDue.toLocaleString()}</span>
                </div>
              </div>

              <div className="pt-2">
                <Link
                  href="/checkout"
                  className="w-full flex items-center justify-center gap-2 py-3.5 px-6 rounded-2xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-sm shadow-md hover:shadow-lg transition-all"
                >
                  <span>Proceed to Checkout (Pay ₹{advanceToPay.toLocaleString()})</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

              <div className="flex items-center gap-2 text-[11px] text-stone-400 pt-2 justify-center">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>100% Secure Checkout · Free cancel 48h before</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
