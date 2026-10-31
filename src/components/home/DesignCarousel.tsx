"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight, Sparkles, ArrowRight } from "lucide-react";
import { decorationsData } from "@/data/decorations";

export const DesignCarousel: React.FC = () => {
  const carouselItems = decorationsData.slice(0, 7);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % carouselItems.length);
    }, 4500);
    return () => clearInterval(interval);
  }, [isPaused, carouselItems.length]);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % carouselItems.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + carouselItems.length) % carouselItems.length);
  };

  const activeItem = carouselItems[currentIndex];

  return (
    <section
      className="py-14 sm:py-20 bg-gradient-to-b from-pink-50/60 via-white to-pink-50/40 relative overflow-hidden border-b border-pink-100/60"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 sm:mb-10">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pink-100/80 border border-pink-200 text-pink-700 text-xs font-bold uppercase tracking-wider mb-2">
              <Sparkles className="w-3.5 h-3.5 text-pink-500" />
              <span>360° Visual Walkthrough</span>
            </div>
            <h2 className="font-serif text-2xl sm:text-4xl font-extrabold text-stone-900 tracking-tight">
              Our designs, up close
            </h2>
            <p className="text-xs sm:text-sm text-stone-500 mt-1">
              High-resolution floral architecture crafted for memory-making
            </p>
          </div>

          <Link
            href="/decorations/all"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white hover:bg-pink-50 text-pink-600 font-bold text-xs sm:text-sm border border-pink-200 transition-colors shadow-xs"
          >
            <span>Browse all designs</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Carousel Showcase (Pink & White) */}
        <div className="relative rounded-3xl overflow-hidden bg-white border border-pink-100 shadow-xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[460px]">
            {/* Visual Media */}
            <div className="lg:col-span-8 relative h-64 sm:h-96 lg:h-auto overflow-hidden bg-pink-50">
              <Image
                src={activeItem.images[0]}
                alt={activeItem.name}
                fill
                className="object-cover transition-all duration-700 hover:scale-105"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent lg:hidden" />

              {/* Prev / Next Buttons */}
              <div className="absolute inset-y-0 left-3 sm:left-4 flex items-center">
                <button
                  onClick={prevSlide}
                  className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/90 hover:bg-white text-stone-800 flex items-center justify-center backdrop-blur-md border border-pink-200 shadow-md transition-all hover:scale-110 active:scale-95"
                  aria-label="Previous slide"
                >
                  <ChevronLeft className="w-5 h-5 text-pink-600" />
                </button>
              </div>
              <div className="absolute inset-y-0 right-3 sm:right-4 flex items-center">
                <button
                  onClick={nextSlide}
                  className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/90 hover:bg-white text-stone-800 flex items-center justify-center backdrop-blur-md border border-pink-200 shadow-md transition-all hover:scale-110 active:scale-95"
                  aria-label="Next slide"
                >
                  <ChevronRight className="w-5 h-5 text-pink-600" />
                </button>
              </div>
            </div>

            {/* Slide details */}
            <div className="lg:col-span-4 p-5 sm:p-8 flex flex-col justify-between space-y-5 bg-white">
              <div className="space-y-3 sm:space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-pink-600 uppercase tracking-wider bg-pink-50 px-2.5 py-0.5 rounded-full border border-pink-100">
                    {activeItem.occasion}
                  </span>
                  <span className="text-xs text-stone-400 font-medium">
                    {currentIndex + 1} of {carouselItems.length}
                  </span>
                </div>

                <h3 className="font-serif text-xl sm:text-3xl font-bold text-stone-900 leading-tight">
                  {activeItem.name}
                </h3>

                <p className="text-xs sm:text-sm text-stone-600 leading-relaxed line-clamp-3 sm:line-clamp-none">
                  {activeItem.description}
                </p>

                <div className="space-y-1.5 pt-1">
                  <p className="text-[11px] font-bold text-stone-400 uppercase tracking-wider">
                    Key Inclusions:
                  </p>
                  <ul className="text-xs text-stone-700 space-y-1">
                    {activeItem.inclusions.slice(0, 3).map((inc, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-pink-600 font-bold shrink-0">✓</span>
                        <span className="truncate">{inc}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="pt-4 border-t border-pink-100 flex items-center justify-between gap-3">
                <div>
                  <div className="flex items-baseline gap-1.5">
                    <span className="font-serif text-xl sm:text-2xl font-extrabold text-pink-600">
                      ₹{activeItem.price.toLocaleString()}
                    </span>
                    <span className="text-xs text-stone-400 line-through">
                      ₹{activeItem.originalPrice.toLocaleString()}
                    </span>
                  </div>
                  <span className="text-[10px] sm:text-[11px] text-amber-600 font-semibold block">
                    ⚡ {activeItem.setupTime} setup
                  </span>
                </div>

                <Link
                  href={`/decoration/${activeItem.slug}`}
                  className="px-4 sm:px-6 py-2.5 rounded-xl bg-gradient-to-r from-pink-600 to-rose-500 hover:from-pink-700 hover:to-rose-600 text-white font-bold text-xs sm:text-sm transition-all shadow-md shadow-pink-500/25 active:scale-95"
                >
                  Book Setup
                </Link>
              </div>
            </div>
          </div>

          {/* Dots Indicator */}
          <div className="p-2.5 bg-pink-50/50 border-t border-pink-100 flex justify-center items-center gap-1.5">
            {carouselItems.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`h-1.5 rounded-full transition-all ${
                  currentIndex === idx ? "w-6 bg-pink-600" : "w-1.5 bg-pink-200 hover:bg-pink-400"
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
