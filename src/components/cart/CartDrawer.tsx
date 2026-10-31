"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  X,
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
} from "lucide-react";
import { useCart } from "@/context/CartContext";
import { siteConfig } from "@/config/site";

export const CartDrawer: React.FC = () => {
  const {
    cart,
    removeFromCart,
    updateAddonQuantity,
    isCartOpen,
    setIsCartOpen,
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

  if (!isCartOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-stone-900/40 backdrop-blur-sm transition-opacity"
        onClick={() => setIsCartOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col border-l border-rose-100">
          {/* Header */}
          <div className="px-6 py-4 bg-gradient-to-r from-rose-50 to-cream-100 border-b border-rose-100 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-rose-600" />
              <h2 className="font-serif text-lg font-bold text-stone-900">
                Your Booking Cart ({cart.length})
              </h2>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-1.5 rounded-full text-stone-500 hover:text-stone-900 hover:bg-rose-100/50 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {cart.length === 0 ? (
              <div className="text-center py-16 space-y-4">
                <div className="w-20 h-20 mx-auto rounded-full bg-rose-50 flex items-center justify-center text-3xl">
                  🌸
                </div>
                <h3 className="font-serif text-lg font-bold text-stone-800">
                  Your cart is empty
                </h3>
                <p className="text-sm text-stone-500 max-w-xs mx-auto">
                  Browse our handpicked fresh floral setups and surprise your loved ones today.
                </p>
                <Link
                  href="/decorations/all"
                  onClick={() => setIsCartOpen(false)}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-rose-600 text-white font-semibold text-sm hover:bg-rose-700 transition-colors shadow-sm"
                >
                  <span>Explore Decorations</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            ) : (
              <>
                {/* Cart Items */}
                <div className="space-y-4">
                  {cart.map((item) => (
                    <div
                      key={item.id}
                      className="p-4 rounded-2xl border border-rose-100 bg-stone-50/50 space-y-3"
                    >
                      <div className="flex gap-3">
                        <div className="relative w-20 h-20 rounded-xl overflow-hidden shrink-0 border border-rose-100">
                          <Image
                            src={item.decoration.images[0]}
                            alt={item.decoration.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-1">
                            <h4 className="font-semibold text-sm text-stone-900 truncate">
                              {item.decoration.name}
                            </h4>
                            <button
                              onClick={() => removeFromCart(item.id)}
                              className="text-stone-400 hover:text-rose-600 p-1 transition-colors"
                              title="Remove item"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                          <p className="text-xs text-rose-600 font-medium">
                            {item.decoration.occasion}
                          </p>
                          <p className="text-sm font-bold text-stone-900 mt-1">
                            ₹{item.decoration.price.toLocaleString()}
                          </p>
                        </div>
                      </div>

                      {/* Booking meta info */}
                      <div className="text-xs bg-white rounded-xl p-2.5 border border-rose-100/60 space-y-1 text-stone-600">
                        <div className="flex items-center gap-1.5">
                          <Calendar className="w-3.5 h-3.5 text-rose-500" />
                          <span className="font-medium">
                            Date: {item.bookingDetails.date}
                          </span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Clock className="w-3.5 h-3.5 text-amber-500" />
                          <span>
                            Slot: {item.bookingDetails.slotValue}
                            {item.bookingDetails.slotType === "fixed" && (
                              <span className="ml-1 text-[10px] font-bold text-amber-700 bg-amber-100 px-1.5 py-0.5 rounded">
                                Fixed Time (+₹{siteConfig.bookingRules.fixedTimeFee})
                              </span>
                            )}
                          </span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <MapPin className="w-3.5 h-3.5 text-emerald-500" />
                          <span>
                            City: {item.bookingDetails.city}{" "}
                            {item.bookingDetails.pincode &&
                              `(${item.bookingDetails.pincode})`}
                          </span>
                        </div>
                        {item.bookingDetails.bannerMessage && (
                          <div className="text-[11px] text-stone-500 italic mt-0.5">
                            Banner: &ldquo;{item.bookingDetails.bannerMessage}&rdquo;
                          </div>
                        )}
                      </div>

                      {/* Selected Add-ons */}
                      {item.selectedAddons && item.selectedAddons.length > 0 && (
                        <div className="pt-2 border-t border-rose-100/70 space-y-2">
                          <p className="text-xs font-semibold text-stone-700">
                            Custom Add-ons:
                          </p>
                          {item.selectedAddons.map(({ addon, quantity }) => (
                            <div
                              key={addon.id}
                              className="flex items-center justify-between text-xs bg-white p-2 rounded-lg border border-rose-50"
                            >
                              <div className="truncate pr-2">
                                <span className="font-medium text-stone-800">
                                  {addon.name}
                                </span>
                                <span className="text-stone-400 block text-[11px]">
                                  ₹{addon.price} each
                                </span>
                              </div>
                              <div className="flex items-center gap-2 shrink-0">
                                <button
                                  onClick={() =>
                                    updateAddonQuantity(
                                      item.id,
                                      addon.id,
                                      quantity - 1
                                    )
                                  }
                                  className="w-5 h-5 rounded bg-stone-100 hover:bg-stone-200 flex items-center justify-center text-stone-700"
                                >
                                  <Minus className="w-3 h-3" />
                                </button>
                                <span className="font-semibold text-xs">
                                  {quantity}
                                </span>
                                <button
                                  onClick={() =>
                                    updateAddonQuantity(
                                      item.id,
                                      addon.id,
                                      quantity + 1
                                    )
                                  }
                                  className="w-5 h-5 rounded bg-stone-100 hover:bg-stone-200 flex items-center justify-center text-stone-700"
                                >
                                  <Plus className="w-3 h-3" />
                                </button>
                                <span className="font-bold text-stone-900 ml-1">
                                  ₹{addon.price * quantity}
                                </span>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                {/* Coupon Box */}
                <div className="p-4 rounded-2xl bg-amber-50/50 border border-amber-200/60 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-stone-700 flex items-center gap-1.5">
                      <Tag className="w-3.5 h-3.5 text-amber-600" />
                      Apply Promo Code
                    </span>
                    <button
                      onClick={() => {
                        setCouponInput("BLOOM10");
                        applyCoupon("BLOOM10");
                      }}
                      className="text-[11px] font-semibold text-rose-600 hover:underline"
                    >
                      Use BLOOM10
                    </button>
                  </div>

                  {appliedCoupon ? (
                    <div className="flex items-center justify-between bg-emerald-50 text-emerald-800 border border-emerald-200 px-3 py-2 rounded-xl text-xs font-semibold">
                      <span>✓ {appliedCoupon.code} applied (-₹{discount.toLocaleString()})</span>
                      <button
                        onClick={removeCoupon}
                        className="text-stone-400 hover:text-emerald-900"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ) : (
                    <div className="flex gap-2">
                      <input
                        type="text"
                        placeholder="Enter coupon (e.g. BLOOM10)"
                        value={couponInput}
                        onChange={(e) => setCouponInput(e.target.value.toUpperCase())}
                        className="flex-1 px-3 py-1.5 text-xs rounded-xl border border-stone-200 uppercase font-semibold focus:outline-none focus:ring-2 focus:ring-rose-500"
                      />
                      <button
                        onClick={() => applyCoupon(couponInput)}
                        className="px-4 py-1.5 bg-stone-900 hover:bg-stone-800 text-white text-xs font-semibold rounded-xl transition-colors"
                      >
                        Apply
                      </button>
                    </div>
                  )}
                  {couponError && (
                    <p className="text-[11px] text-rose-600 font-medium">
                      {couponError}
                    </p>
                  )}
                </div>

                {/* Bill Breakdown */}
                <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200/60 space-y-2 text-xs">
                  <h4 className="font-semibold text-stone-800 uppercase tracking-wider text-[11px]">
                    Price Breakdown
                  </h4>
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
                    <span>Delhi NCR Delivery</span>
                    <span>
                      {deliveryFee === 0 ? (
                        <span className="text-emerald-600 font-medium">FREE</span>
                      ) : (
                        `+₹${deliveryFee}`
                      )}
                    </span>
                  </div>
                  {discount > 0 && (
                    <div className="flex justify-between text-emerald-600 font-medium">
                      <span>Discount ({appliedCoupon?.code})</span>
                      <span>-₹{discount.toLocaleString()}</span>
                    </div>
                  )}
                  <div className="pt-2 border-t border-stone-200 flex justify-between font-bold text-sm text-stone-900">
                    <span>Grand Total</span>
                    <span>₹{grandTotal.toLocaleString()}</span>
                  </div>

                  {/* Advance payment highlight box */}
                  <div className="mt-3 p-3 rounded-xl bg-rose-50 border border-rose-200/80 space-y-1">
                    <div className="flex justify-between font-bold text-rose-700 text-xs">
                      <span>30% Advance to Confirm</span>
                      <span>₹{advanceToPay.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-stone-500 text-[11px]">
                      <span>70% Balance on Delivery</span>
                      <span>₹{balanceDue.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Footer actions */}
          {cart.length > 0 && (
            <div className="p-6 bg-white border-t border-rose-100 space-y-3">
              <div className="flex items-center gap-2 text-[11px] text-stone-500">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>100% Fresh Flowers Guaranteed · Free cancel 48h before</span>
              </div>
              <Link
                href="/checkout"
                onClick={() => setIsCartOpen(false)}
                className="w-full flex items-center justify-center gap-2 py-3 px-6 rounded-2xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-sm transition-all shadow-md hover:shadow-lg"
              >
                <span>Proceed to Book (Pay ₹{advanceToPay.toLocaleString()})</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
