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
    <div className="group relative flex flex-col rounded-3xl overflow-hidden bg-white border border-stone-200/70 hover:border-rose-300 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
      {/* Image container */}
      <div className="relative h-56 sm:h-64 w-full overflow-hidden bg-stone-100">
        <Link href={`/decoration/${decoration.slug}`}>
          <Image
            src={decoration.images[0]}
            alt={decoration.name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </Link>
        <div className="absolute inset-0 bg-gradient-to-t from-stone-900/30 via-transparent to-transparent pointer-events-none" />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 items-start">
          {decoration.discountPercent > 0 && (
            <span className="px-2.5 py-1 rounded-full bg-rose-600 text-white font-extrabold text-[11px] shadow-sm tracking-wide">
              {decoration.discountPercent}% OFF
            </span>
          )}
          {decoration.isBestSeller && (
            <span className="px-2.5 py-0.5 rounded-full bg-amber-400 text-stone-900 font-bold text-[10px] shadow-xs flex items-center gap-1">
              <Sparkles className="w-3 h-3" />
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
          className={`absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center transition-all ${
            wishlisted
              ? "bg-rose-500 text-white"
              : "bg-white/90 text-stone-600 hover:text-rose-600 hover:bg-white"
          } shadow-sm`}
          aria-label="Save to wishlist"
        >
          <Heart className={`w-4 h-4 ${wishlisted ? "fill-white" : ""}`} />
        </button>

        {/* Same-day badge */}
        {decoration.isSameDayAvailable && (
          <div className="absolute bottom-3 left-3 bg-stone-900/80 backdrop-blur-xs text-white text-[10px] font-semibold px-2.5 py-1 rounded-full flex items-center gap-1">
            <Clock className="w-3 h-3 text-amber-300" />
            <span>Same-Day Available</span>
          </div>
        )}
      </div>

      {/* Card Content */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-3">
        <div>
          <div className="flex items-center justify-between gap-2 text-xs">
            <Link
              href={`/decorations/${decoration.occasionSlug}`}
              className="text-rose-600 font-semibold uppercase tracking-wider text-[11px] hover:underline"
            >
              {decoration.occasion}
            </Link>
            <div className="flex items-center gap-1 text-stone-700 bg-stone-100 px-2 py-0.5 rounded-md font-semibold text-xs">
              <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-400" />
              <span>{decoration.rating}</span>
              <span className="text-stone-400 font-normal">
                ({decoration.reviewsCount})
              </span>
            </div>
          </div>

          <Link href={`/decoration/${decoration.slug}`} className="block mt-1">
            <h3 className="font-serif font-bold text-base sm:text-lg text-stone-900 group-hover:text-rose-600 transition-colors line-clamp-1">
              {decoration.name}
            </h3>
          </Link>

          {/* Setup inclusions snippet */}
          <p className="text-xs text-stone-500 mt-1 line-clamp-2">
            {decoration.inclusions[0] || decoration.description}
          </p>
        </div>

        {/* Pricing and Action */}
        <div className="pt-3 border-t border-stone-100 flex items-center justify-between gap-2">
          <div>
            <div className="flex items-baseline gap-1.5">
              <span className="font-serif text-lg sm:text-xl font-extrabold text-stone-900">
                ₹{decoration.price.toLocaleString()}
              </span>
              {decoration.originalPrice > decoration.price && (
                <span className="text-xs text-stone-400 line-through">
                  ₹{decoration.originalPrice.toLocaleString()}
                </span>
              )}
            </div>
            <p className="text-[10px] text-emerald-600 font-medium">
              Pay 30% advance to book
            </p>
          </div>

          <Link
            href={`/decoration/${decoration.slug}`}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-rose-50 group-hover:bg-rose-600 text-rose-700 group-hover:text-white font-bold text-xs transition-colors shadow-2xs"
          >
            <span>Book Now</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
};
