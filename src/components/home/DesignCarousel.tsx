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
      className="py-16 bg-stone-900 text-white relative overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-950 border border-rose-800 text-rose-300 text-xs font-bold uppercase tracking-wider mb-2">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>360° Visual Walkthrough</span>
            </div>
            <h2 className="font-serif text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
              Our designs, up close
            </h2>
            <p className="text-sm text-stone-400 mt-1">
              High-resolution floral architecture crafted for memory-making
            </p>
          </div>

          <Link
            href="/decorations/all"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white font-semibold text-xs sm:text-sm border border-white/20 transition-colors"
          >
            <span>Browse all designs</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Carousel Showcase */}
        <div className="relative rounded-3xl overflow-hidden bg-stone-950 border border-stone-800 shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[460px]">
            {/* Visual Media */}
            <div className="lg:col-span-8 relative h-72 sm:h-96 lg:h-auto overflow-hidden">
              <Image
                src={activeItem.images[0]}
                alt={activeItem.name}
                fill
                className="object-cover transition-all duration-700 hover:scale-105"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-transparent to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-stone-950" />

              {/* Prev / Next Buttons */}
              <div className="absolute inset-y-0 left-4 flex items-center">
                <button
                  onClick={prevSlide}
                  className="w-10 h-10 rounded-full bg-black/60 hover:bg-black/90 text-white flex items-center justify-center backdrop-blur-md border border-white/20 transition-all hover:scale-110"
                  aria-label="Previous slide"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
              </div>
              <div className="absolute inset-y-0 right-4 flex items-center">
                <button
                  onClick={nextSlide}
                  className="w-10 h-10 rounded-full bg-black/60 hover:bg-black/90 text-white flex items-center justify-center backdrop-blur-md border border-white/20 transition-all hover:scale-110"
                  aria-label="Next slide"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Slide details */}
            <div className="lg:col-span-4 p-6 sm:p-8 flex flex-col justify-between space-y-6 bg-stone-950">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-rose-400 uppercase tracking-wider">
                    {activeItem.occasion}
                  </span>
                  <span className="text-xs text-stone-400">
                    {currentIndex + 1} of {carouselItems.length}
                  </span>
                </div>

                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white leading-tight">
                  {activeItem.name}
                </h3>

                <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">
                  {activeItem.description}
                </p>

                <div className="space-y-2 pt-2">
                  <p className="text-xs font-semibold text-stone-400 uppercase tracking-wider">
                    Key Inclusions:
                  </p>
                  <ul className="text-xs text-stone-300 space-y-1.5">
                    {activeItem.inclusions.slice(0, 3).map((inc, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-rose-400 shrink-0">✓</span>
                        <span>{inc}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="pt-4 border-t border-stone-800 flex items-center justify-between gap-4">
                <div>
                  <div className="flex items-baseline gap-2">
                    <span className="font-serif text-2xl font-extrabold text-white">
                      ₹{activeItem.price.toLocaleString()}
                    </span>
                    <span className="text-xs text-stone-500 line-through">
                      ₹{activeItem.originalPrice.toLocaleString()}
                    </span>
                  </div>
                  <span className="text-[11px] text-amber-400">
                    {activeItem.setupTime} setup time
                  </span>
                </div>

                <Link
                  href={`/decoration/${activeItem.slug}`}
                  className="px-5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs sm:text-sm transition-colors shadow-md"
                >
                  Book Setup
                </Link>
              </div>
            </div>
          </div>

          {/* Dots Indicator */}
          <div className="p-3 bg-stone-900 border-t border-stone-800 flex justify-center items-center gap-2">
            {carouselItems.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`h-2 rounded-full transition-all ${
                  currentIndex === idx ? "w-8 bg-rose-500" : "w-2 bg-stone-700 hover:bg-stone-500"
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
