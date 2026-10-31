"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Star, Heart, Clock, ArrowRight, Sparkles } from "lucide-react";
import { Decoration } from "@/types";
import { useCart } from "@/context/CartContext";

interface DecorationCardProps {
  decoration: Decoration;
}

export const DecorationCard: React.FC<DecorationCardProps> = ({ decoration }) => {
  const { isInWishlist, toggleWishlist } = useCart();
  const wishlisted = isInWishlist(decoration.slug);

  return (
    <div className="group relative flex flex-col rounded-2xl sm:rounded-3xl overflow-hidden bg-white border border-pink-100/90 hover:border-pink-300 shadow-xs hover:shadow-xl hover:shadow-pink-500/10 transition-all duration-300 hover:-translate-y-1">
      {/* Image container */}
      <div className="relative h-40 sm:h-64 w-full overflow-hidden bg-pink-50/50">
        <Link href={`/decoration/${decoration.slug}`} className="block h-full w-full">
          <Image
            src={decoration.images[0]}
            alt={decoration.name}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </Link>
        <div className="absolute inset-0 bg-gradient-to-t from-stone-900/40 via-transparent to-transparent pointer-events-none" />

        {/* Top Badges */}
        <div className="absolute top-2 left-2 sm:top-3 sm:left-3 flex flex-col gap-1 items-start">
          {decoration.discountPercent > 0 && (
            <span className="px-1.5 sm:px-2.5 py-0.5 rounded-full bg-gradient-to-r from-pink-600 to-rose-500 text-white font-black text-[9px] sm:text-[11px] shadow-sm tracking-wide">
              {decoration.discountPercent}% OFF
            </span>
          )}
          {decoration.isBestSeller && (
            <span className="px-1.5 sm:px-2 py-0.5 rounded-full bg-amber-400 text-stone-900 font-extrabold text-[8px] sm:text-[10px] shadow-xs flex items-center gap-0.5">
              <Sparkles className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
              <span>Bestseller</span>
            </span>
          )}
        </div>

        {/* Wishlist Heart Button */}
        <button
          onClick={(e) => {
            e.preventDefault();
            toggleWishlist(decoration.slug);
          }}
          className={`absolute top-2 right-2 sm:top-3 sm:right-3 w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center transition-all ${
            wishlisted
              ? "bg-pink-600 text-white shadow-md shadow-pink-500/30"
              : "bg-white/90 text-stone-600 hover:text-pink-600 hover:bg-white"
          } shadow-sm`}
          aria-label="Save to wishlist"
        >
          <Heart className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${wishlisted ? "fill-white" : ""}`} />
        </button>

        {/* Same-day badge */}
        {decoration.isSameDayAvailable && (
          <div className="absolute bottom-2 left-2 sm:bottom-3 sm:left-3 bg-stone-900/85 backdrop-blur-xs text-white text-[8px] sm:text-[10px] font-semibold px-2 py-0.5 sm:py-1 rounded-full flex items-center gap-1">
            <Clock className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-amber-300" />
            <span className="hidden xs:inline">Same-Day</span>
            <span className="xs:hidden">Today</span>
          </div>
        )}
      </div>

      {/* Card Content */}
      <div className="p-2.5 sm:p-5 flex-1 flex flex-col justify-between space-y-2 sm:space-y-3">
        <div>
          <div className="flex items-center justify-between gap-1 text-xs">
            <Link
              href={`/decorations/${decoration.occasionSlug}`}
              className="text-pink-600 font-bold uppercase tracking-wider text-[10px] sm:text-[11px] hover:underline truncate"
            >
              {decoration.occasion}
            </Link>
            <div className="flex items-center gap-1 text-stone-700 bg-pink-50/80 px-1.5 sm:px-2 py-0.5 rounded-md font-bold text-[10px] sm:text-xs shrink-0">
              <Star className="w-3 h-3 text-amber-500 fill-amber-400" />
              <span>{decoration.rating}</span>
            </div>
          </div>

          <Link href={`/decoration/${decoration.slug}`} className="block mt-1">
            <h3 className="font-serif font-bold text-xs sm:text-base text-stone-900 group-hover:text-pink-600 transition-colors line-clamp-1">
              {decoration.name}
            </h3>
          </Link>

          {/* Setup inclusions snippet - hidden on mobile for clean cards */}
          <p className="hidden sm:block text-xs text-stone-500 mt-1 line-clamp-2">
            {decoration.inclusions[0] || decoration.description}
          </p>
        </div>

        {/* Pricing and Action */}
        <div className="pt-2 sm:pt-3 border-t border-pink-100/70 flex items-center justify-between gap-1.5">
          <div>
            <div className="flex items-baseline gap-1">
              <span className="font-serif text-sm sm:text-xl font-black text-stone-900">
                ₹{decoration.price.toLocaleString()}
              </span>
              {decoration.originalPrice > decoration.price && (
                <span className="text-[10px] sm:text-xs text-stone-400 line-through">
                  ₹{decoration.originalPrice.toLocaleString()}
                </span>
              )}
            </div>
            <p className="text-[9px] sm:text-[10px] text-emerald-600 font-semibold leading-tight">
              30% advance
            </p>
          </div>

          <Link
            href={`/decoration/${decoration.slug}`}
            className="inline-flex items-center gap-1 px-2.5 py-1.5 sm:px-3.5 sm:py-2 rounded-lg sm:rounded-xl bg-pink-50 group-hover:bg-gradient-to-r group-hover:from-pink-600 group-hover:to-rose-500 text-pink-700 group-hover:text-white font-bold text-[11px] sm:text-xs transition-all shadow-2xs shrink-0"
          >
            <span>Book</span>
            <ArrowRight className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
};
