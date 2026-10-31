"use client";

import React, { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, ChevronLeft, ChevronRight, Sparkles } from "lucide-react";
import { occasionsData } from "@/data/occasions";

export const OccasionsGrid: React.FC = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const offset = direction === "left" ? -320 : 320;
      scrollRef.current.scrollBy({ left: offset, behavior: "smooth" });
    }
  };

  return (
    <section className="py-10 sm:py-16 bg-white border-b border-pink-100/70 overflow-hidden">
      <div className="container mx-auto px-4">
        {/* ========================================== */}
        {/* 1. OUR POPULAR CATEGORIES (Infinite Ticker) */}
        {/* ========================================== */}
        <div className="mb-12 sm:mb-16">
          {/* Header */}
          <div className="flex items-center justify-between gap-4 mb-5 sm:mb-6">
            <div>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-pink-500 animate-ping" />
                <h2 className="font-serif text-xl sm:text-3xl font-extrabold text-stone-900 tracking-tight">
                  Our Popular Categories
                </h2>
              </div>
              <p className="text-xs sm:text-sm text-stone-500 mt-0.5">
                Tap any category to explore verified designs & instant pricing in Delhi NCR
              </p>
            </div>

            <div className="flex items-center gap-2">
              {/* Optional manual scroll buttons (Desktop) */}
              <div className="hidden sm:flex items-center gap-1.5 mr-1">
                <button
                  onClick={() => scroll("left")}
                  className="w-8 h-8 rounded-full border border-pink-200 hover:border-pink-400 hover:bg-pink-50 flex items-center justify-center text-pink-600 transition-colors"
                  aria-label="Scroll left"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={() => scroll("right")}
                  className="w-8 h-8 rounded-full border border-pink-200 hover:border-pink-400 hover:bg-pink-50 flex items-center justify-center text-pink-600 transition-colors"
                  aria-label="Scroll right"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              <Link
                href="/decorations/all"
                className="inline-flex items-center gap-1 text-xs sm:text-sm font-bold text-pink-600 hover:text-pink-700 hover:underline underline-offset-4 group whitespace-nowrap"
              >
                <span>View All</span>
                <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>

          {/* Infinite Continuous Looping Strip ("gol gol ghumta rhe na") */}
          <div className="relative overflow-hidden py-2 pause-on-hover">
            {/* Subtle edge blur masks */}
            <div className="absolute left-0 top-0 bottom-0 w-8 sm:w-16 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-8 sm:w-16 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

            <div
              ref={scrollRef}
              className="animate-marquee flex items-center gap-3 sm:gap-5 whitespace-nowrap"
            >
              {/* Set 1 */}
              {occasionsData.map((occ) => (
                <Link
                  key={`cat-loop1-${occ.id}`}
                  href={`/decorations/${occ.slug}`}
                  className="group flex flex-col items-center w-20 sm:w-26 shrink-0 text-center select-none"
                >
                  {/* Rounded square card icon (Pink & White) */}
                  <div className="w-18 h-18 sm:w-22 sm:h-22 rounded-2xl bg-white border border-pink-100 group-hover:border-pink-400 group-hover:bg-pink-50/50 group-hover:shadow-lg p-2 flex flex-col items-center justify-center transition-all duration-300 group-hover:-translate-y-1 relative shadow-xs">
                    <div className="relative w-10 h-10 sm:w-12 sm:h-12 rounded-xl overflow-hidden mb-1">
                      <Image
                        src={occ.image}
                        alt={occ.name}
                        fill
                        className="object-cover group-hover:scale-115 transition-transform duration-500"
                      />
                    </div>
                    {/* Emoji badge */}
                    <span className="absolute -top-1 -right-1 text-[11px] sm:text-xs bg-white rounded-full p-0.5 shadow-xs border border-pink-100">
                      {occ.emoji}
                    </span>
                  </div>

                  {/* Category Title */}
                  <span className="mt-1.5 text-[11px] sm:text-xs font-bold text-stone-800 group-hover:text-pink-600 line-clamp-1 transition-colors">
                    {occ.name}
                  </span>
                  <span className="text-[9px] sm:text-[10px] text-stone-400 font-medium">
                    {occ.itemCount}+ designs
                  </span>
                </Link>
              ))}

              {/* Set 2 (Duplicate for continuous seamless infinite loop) */}
              {occasionsData.map((occ) => (
                <Link
                  key={`cat-loop2-${occ.id}`}
                  href={`/decorations/${occ.slug}`}
                  className="group flex flex-col items-center w-20 sm:w-26 shrink-0 text-center select-none"
                >
                  {/* Rounded square card icon */}
                  <div className="w-18 h-18 sm:w-22 sm:h-22 rounded-2xl bg-white border border-pink-100 group-hover:border-pink-400 group-hover:bg-pink-50/50 group-hover:shadow-lg p-2 flex flex-col items-center justify-center transition-all duration-300 group-hover:-translate-y-1 relative shadow-xs">
                    <div className="relative w-10 h-10 sm:w-12 sm:h-12 rounded-xl overflow-hidden mb-1">
                      <Image
                        src={occ.image}
                        alt={occ.name}
                        fill
                        className="object-cover group-hover:scale-115 transition-transform duration-500"
                      />
                    </div>
                    {/* Emoji badge */}
                    <span className="absolute -top-1 -right-1 text-[11px] sm:text-xs bg-white rounded-full p-0.5 shadow-xs border border-pink-100">
                      {occ.emoji}
                    </span>
                  </div>

                  {/* Category Title */}
                  <span className="mt-1.5 text-[11px] sm:text-xs font-bold text-stone-800 group-hover:text-pink-600 line-clamp-1 transition-colors">
                    {occ.name}
                  </span>
                  <span className="text-[9px] sm:text-[10px] text-stone-400 font-medium">
                    {occ.itemCount}+ designs
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* ========================================== */}
        {/* 2. WHAT ARE YOU CELEBRATING? (Full Grid)  */}
        {/* ========================================== */}
        <div className="pt-4 border-t border-pink-100/60">
          <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-10 space-y-2 sm:space-y-3">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pink-50 text-pink-700 text-xs font-bold uppercase tracking-wider border border-pink-100">
              <Sparkles className="w-3.5 h-3.5 text-pink-500" />
              <span>15 Handcrafted Floral Categories</span>
            </div>
            <h2 className="font-serif text-2xl sm:text-4xl font-extrabold text-stone-900 tracking-tight">
              What are you celebrating?
            </h2>
            <p className="text-xs sm:text-base text-stone-600 max-w-lg mx-auto">
              From intimate bedroom surprises to grand banquet mandaps, explore tailored flower decors for every Indian milestone.
            </p>
          </div>

          {/* 15 Cards Grid (2 cols on mobile, 5 on desktop) */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2.5 sm:gap-4">
            {occasionsData.map((occ) => (
              <Link
                key={occ.id}
                href={`/decorations/${occ.slug}`}
                className="group relative flex flex-col rounded-2xl overflow-hidden bg-white border border-pink-100 hover:border-pink-300 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 shadow-xs"
              >
                {/* Card Image */}
                <div className="relative h-28 sm:h-40 w-full overflow-hidden bg-pink-50">
                  <Image
                    src={occ.image}
                    alt={`${occ.name} flower decoration in Delhi NCR`}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-900/70 via-stone-900/10 to-transparent" />

                  {/* Emoji Pill */}
                  <div className="absolute top-2 left-2 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white/95 backdrop-blur-sm flex items-center justify-center text-sm sm:text-base shadow-xs border border-pink-100">
                    {occ.emoji}
                  </div>

                  {/* Hover arrow */}
                  <div className="absolute top-2 right-2 w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-white/90 text-pink-600 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </div>

                  {/* Occasion Name on Image */}
                  <div className="absolute bottom-2 left-2 right-2 text-white">
                    <h3 className="font-serif font-bold text-xs sm:text-base leading-tight truncate">
                      {occ.name}
                    </h3>
                    <p className="text-[10px] sm:text-[11px] text-pink-200 font-medium">
                      {occ.itemCount} Designs
                    </p>
                  </div>
                </div>

                {/* Bottom text description */}
                <div className="p-2 sm:p-3 bg-white flex-1 flex flex-col justify-between">
                  <p className="text-[10px] sm:text-[11px] text-stone-500 line-clamp-2 leading-relaxed">
                    {occ.shortDesc}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

