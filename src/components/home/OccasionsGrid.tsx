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
    <section className="py-12 bg-white border-b border-rose-50 overflow-hidden">
      <div className="container mx-auto px-4">
        {/* ========================================== */}
        {/* 1. OUR POPULAR CATEGORIES (Infinite Ticker) */}
        {/* ========================================== */}
        <div className="mb-14">
          {/* Header matching Screenshot 2 */}
          <div className="flex items-center justify-between gap-4 mb-6">
            <div>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-ping" />
                <h2 className="font-serif text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight">
                  Our Popular Categories
                </h2>
              </div>
              <p className="text-xs sm:text-sm text-stone-500 mt-1">
                Tap any category to explore verified designs & instant pricing in Delhi NCR
              </p>
            </div>

            <div className="flex items-center gap-2">
              {/* Optional manual scroll buttons */}
              <div className="hidden sm:flex items-center gap-1.5 mr-2">
                <button
                  onClick={() => scroll("left")}
                  className="w-8 h-8 rounded-full border border-stone-200 hover:border-rose-300 hover:bg-rose-50 flex items-center justify-center text-stone-600 transition-colors"
                  aria-label="Scroll left"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={() => scroll("right")}
                  className="w-8 h-8 rounded-full border border-stone-200 hover:border-rose-300 hover:bg-rose-50 flex items-center justify-center text-stone-600 transition-colors"
                  aria-label="Scroll right"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              <Link
                href="/decorations/all"
                className="inline-flex items-center gap-1 text-sm font-bold text-rose-600 hover:text-rose-700 hover:underline underline-offset-4 group"
              >
                <span>View All</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>

          {/* Infinite Continuous Looping Strip ("gol gol ghumta rhe na") */}
          <div className="relative overflow-hidden py-3 pause-on-hover">
            {/* Subtle edge blur masks */}
            <div className="absolute left-0 top-0 bottom-0 w-8 sm:w-16 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-8 sm:w-16 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

            <div
              ref={scrollRef}
              className="animate-marquee flex items-center gap-4 sm:gap-6 whitespace-nowrap"
            >
              {/* Set 1 */}
              {occasionsData.map((occ) => (
                <Link
                  key={`cat-loop1-${occ.id}`}
                  href={`/decorations/${occ.slug}`}
                  className="group flex flex-col items-center w-24 sm:w-28 shrink-0 text-center select-none"
                >
                  {/* Rounded square card icon */}
                  <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-stone-50/90 border border-stone-200/90 group-hover:border-rose-400 group-hover:bg-rose-50/40 group-hover:shadow-lg p-2.5 flex flex-col items-center justify-center transition-all duration-300 group-hover:-translate-y-1 relative shadow-xs">
                    <div className="relative w-11 h-11 sm:w-13 sm:h-13 rounded-xl overflow-hidden mb-1">
                      <Image
                        src={occ.image}
                        alt={occ.name}
                        fill
                        className="object-cover group-hover:scale-115 transition-transform duration-500"
                      />
                    </div>
                    {/* Emoji badge */}
                    <span className="absolute -top-1.5 -right-1.5 text-xs sm:text-sm bg-white rounded-full p-0.5 shadow-xs border border-stone-100">
                      {occ.emoji}
                    </span>
                  </div>

                  {/* Category Title */}
                  <span className="mt-2 text-xs sm:text-[13px] font-bold text-stone-800 group-hover:text-rose-600 line-clamp-1 transition-colors">
                    {occ.name}
                  </span>
                  <span className="text-[10px] text-stone-400 font-medium">
                    {occ.itemCount}+ designs
                  </span>
                </Link>
              ))}

              {/* Set 2 (Duplicate for continuous seamless infinite loop) */}
              {occasionsData.map((occ) => (
                <Link
                  key={`cat-loop2-${occ.id}`}
                  href={`/decorations/${occ.slug}`}
                  className="group flex flex-col items-center w-24 sm:w-28 shrink-0 text-center select-none"
                >
                  {/* Rounded square card icon */}
                  <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-stone-50/90 border border-stone-200/90 group-hover:border-rose-400 group-hover:bg-rose-50/40 group-hover:shadow-lg p-2.5 flex flex-col items-center justify-center transition-all duration-300 group-hover:-translate-y-1 relative shadow-xs">
                    <div className="relative w-11 h-11 sm:w-13 sm:h-13 rounded-xl overflow-hidden mb-1">
                      <Image
                        src={occ.image}
                        alt={occ.name}
                        fill
                        className="object-cover group-hover:scale-115 transition-transform duration-500"
                      />
                    </div>
                    {/* Emoji badge */}
                    <span className="absolute -top-1.5 -right-1.5 text-xs sm:text-sm bg-white rounded-full p-0.5 shadow-xs border border-stone-100">
                      {occ.emoji}
                    </span>
                  </div>

                  {/* Category Title */}
                  <span className="mt-2 text-xs sm:text-[13px] font-bold text-stone-800 group-hover:text-rose-600 line-clamp-1 transition-colors">
                    {occ.name}
                  </span>
                  <span className="text-[10px] text-stone-400 font-medium">
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
        <div className="pt-4 border-t border-rose-100/60">
          <div className="text-center max-w-2xl mx-auto mb-10 space-y-3">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-50 text-rose-700 text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>15 Handcrafted Floral Categories</span>
            </div>
            <h2 className="font-serif text-2xl sm:text-4xl font-extrabold text-stone-900 tracking-tight">
              What are you celebrating?
            </h2>
            <p className="text-sm sm:text-base text-stone-600">
              From intimate bedroom surprises to grand banquet mandaps, explore tailored flower decors for every Indian milestone.
            </p>
          </div>

          {/* 15 Cards Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-5">
            {occasionsData.map((occ) => (
              <Link
                key={occ.id}
                href={`/decorations/${occ.slug}`}
                className="group relative flex flex-col rounded-2xl overflow-hidden bg-stone-50 border border-stone-200/60 hover:border-rose-300 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                {/* Card Image */}
                <div className="relative h-32 sm:h-40 w-full overflow-hidden bg-stone-100">
                  <Image
                    src={occ.image}
                    alt={`${occ.name} flower decoration in Delhi NCR`}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-900/70 via-stone-900/20 to-transparent" />

                  {/* Emoji Pill */}
                  <div className="absolute top-2.5 left-2.5 w-8 h-8 rounded-full bg-white/95 backdrop-blur-sm flex items-center justify-center text-base shadow-sm">
                    {occ.emoji}
                  </div>

                  {/* Hover arrow */}
                  <div className="absolute top-2.5 right-2.5 w-7 h-7 rounded-full bg-white/90 text-stone-800 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <ArrowUpRight className="w-4 h-4 text-rose-600" />
                  </div>

                  {/* Occasion Name on Image */}
                  <div className="absolute bottom-2.5 left-2.5 right-2.5 text-white">
                    <h3 className="font-serif font-bold text-sm sm:text-base leading-tight">
                      {occ.name}
                    </h3>
                    <p className="text-[11px] text-rose-200 font-medium">
                      {occ.itemCount} Designs Available
                    </p>
                  </div>
                </div>

                {/* Bottom text description */}
                <div className="p-2.5 sm:p-3 bg-white flex-1 flex flex-col justify-between">
                  <p className="text-[11px] text-stone-500 line-clamp-2 leading-relaxed">
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

