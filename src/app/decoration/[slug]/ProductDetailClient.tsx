"use client";

import React, { useState, useEffect } from "react";
import { Star, Clock, ShieldCheck, Sparkles, MessageCircle } from "lucide-react";
import { Decoration, AddOn } from "@/types";
import { ProductGallery } from "@/components/product/ProductGallery";
import { AddonSelector } from "@/components/product/AddonSelector";
import { ProductTabs } from "@/components/product/ProductTabs";
import { BookingPanel } from "@/components/product/BookingPanel";
import { DecorationCard } from "@/components/common/DecorationCard";
import { useCart } from "@/context/CartContext";
import { siteConfig } from "@/config/site";

interface ProductDetailClientProps {
  decoration: Decoration;
  relatedDecorations: Decoration[];
}

export const ProductDetailClient: React.FC<ProductDetailClientProps> = ({
  decoration,
  relatedDecorations,
}) => {
  const [selectedAddons, setSelectedAddons] = useState<
    { addon: AddOn; quantity: number }[]
  >([]);

  const { addRecentlyViewed } = useCart();

  useEffect(() => {
    addRecentlyViewed(decoration.slug);
  }, [decoration.slug, addRecentlyViewed]);

  return (
    <div className="space-y-8 sm:space-y-12">
      {/* 2-Column Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-start">
        {/* Left Column: Gallery + Title + Addons + Tabs */}
        <div className="lg:col-span-7 space-y-6 sm:space-y-8">
          <ProductGallery decoration={decoration} />

          {/* Heading info */}
          <div className="space-y-2.5 sm:space-y-3 bg-white p-4 sm:p-6 rounded-2xl sm:rounded-3xl border border-pink-100/90 shadow-xs">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="px-3 py-1 rounded-full bg-pink-50 border border-pink-200/60 text-pink-700 text-xs font-bold uppercase tracking-wider">
                {decoration.occasion}
              </span>
              <div className="flex items-center gap-1 bg-pink-50/50 text-stone-800 px-2.5 py-1 rounded-full text-xs font-bold border border-pink-100">
                <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-400" />
                <span>{decoration.rating}</span>
                <span className="text-stone-400 font-normal">
                  ({decoration.reviewsCount} reviews)
                </span>
              </div>
              {decoration.isSameDayAvailable && (
                <span className="px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-bold flex items-center gap-1 border border-emerald-200">
                  <Clock className="w-3 h-3 text-emerald-600" />
                  <span>Same-Day Available</span>
                </span>
              )}
            </div>

            <h1 className="font-serif text-xl sm:text-3xl font-extrabold text-stone-900 tracking-tight">
              {decoration.name}
            </h1>

            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
              {decoration.description}
            </p>

            {/* Inclusions overview */}
            <div className="pt-2 border-t border-pink-100/70">
              <h4 className="text-xs font-bold text-stone-700 uppercase tracking-wider mb-2">
                Included in this setup:
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 sm:gap-2 text-xs text-stone-600">
                {decoration.inclusions.slice(0, 4).map((inc, i) => (
                  <div key={i} className="flex items-start gap-1.5">
                    <span className="text-pink-600 font-black">✓</span>
                    <span>{inc}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Mobile quick scroll to booking button */}
            <div className="lg:hidden pt-3 border-t border-pink-100/60">
              <a
                href="#booking-panel"
                className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-gradient-to-r from-pink-600 to-rose-500 text-white font-bold text-xs shadow-md shadow-pink-500/20 active:scale-95 transition-all"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                <span>Select Date & Book Now (₹{decoration.price.toLocaleString()})</span>
              </a>
            </div>
          </div>

          {/* Add-ons selection */}
          <div className="bg-white p-4 sm:p-6 rounded-2xl sm:rounded-3xl border border-pink-100/90 shadow-xs">
            <AddonSelector
              selectedAddons={selectedAddons}
              setSelectedAddons={setSelectedAddons}
            />
          </div>

          {/* Tabs */}
          <div className="bg-white p-4 sm:p-6 rounded-2xl sm:rounded-3xl border border-pink-100/90 shadow-xs">
            <ProductTabs decoration={decoration} />
          </div>
        </div>

        {/* Right Column: Sticky Booking Panel */}
        <div id="booking-panel" className="lg:col-span-5 sticky top-24 space-y-4 scroll-mt-24">
          <BookingPanel
            decoration={decoration}
            selectedAddons={selectedAddons}
          />
        </div>
      </div>

      {/* Related Decorations - 2 columns on mobile */}
      {relatedDecorations.length > 0 && (
        <div className="pt-6 sm:pt-8 border-t border-pink-100 space-y-4 sm:space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-serif text-lg sm:text-2xl font-bold text-stone-900">
                More {decoration.occasion} Designs
              </h3>
              <p className="text-xs sm:text-sm text-stone-500">
                Customers also viewed these popular celebration concepts
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
            {relatedDecorations.map((rel) => (
              <DecorationCard key={rel.id} decoration={rel} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
