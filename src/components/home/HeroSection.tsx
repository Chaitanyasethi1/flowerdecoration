"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Search,
  MessageCircle,
  Sparkles,
  ShieldCheck,
  Clock,
  Star,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { siteConfig } from "@/config/site";
import { occasionsData } from "@/data/occasions";

const heroSlides = [
  {
    title: "Luxury Blush Rose Ring Backdrop",
    image: "/images/hero/hero_pink_rose_ring.jpg",
  },
  {
    title: "Royal Wedding Grand Floral Stage",
    image: "/images/hero/hero_wedding_stage.jpg",
  },
  {
    title: "Romantic Twilight Terrace Cabana",
    image: "/images/hero/hero_romantic_cabana.jpg",
  },
  {
    title: "Pastel Pink Grand Celebration Arch",
    image: "/images/hero/hero_baby_shower_arch.jpg",
  },
];

export const HeroSection: React.FC = () => {
  const router = useRouter();
  const [heroSearch, setHeroSearch] = useState("");
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 4500);
    return () => clearInterval(interval);
  }, [isPaused]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
  };

  const handleHeroSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (heroSearch.trim()) {
      router.push(`/decorations/all?q=${encodeURIComponent(heroSearch.trim())}`);
    }
  };

  const popularChips = occasionsData.slice(0, 7);
  const activeSlide = heroSlides[currentSlide];

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-pink-50/70 via-white to-pink-50/40 pt-4 pb-12 sm:pt-10 sm:pb-20">
      {/* Decorative floral background blur */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 sm:w-96 h-80 sm:h-96 rounded-full bg-pink-200/40 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 sm:w-96 h-80 sm:h-96 rounded-full bg-rose-100/40 blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Headings & Actions */}
          <div className="lg:col-span-7 space-y-4 sm:space-y-6 text-center lg:text-left">
            {/* Tag badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-pink-200 shadow-xs text-xs font-bold text-pink-700">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Delhi NCR · Since {siteConfig.sinceYear} · Same-Day Available</span>
            </div>

            {/* H1 Title */}
            <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-extrabold text-stone-900 tracking-tight leading-[1.18]">
              Flowers that make every moment{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-600 via-rose-500 to-pink-500">
                unforgettable
              </span>
            </h1>

            {/* Subtext */}
            <p className="text-sm sm:text-base lg:text-lg text-stone-600 max-w-xl mx-auto lg:mx-0 leading-relaxed">
              Delhi NCR&apos;s premier fresh flower & balloon styling service.
              Curated by master florists for birthdays, romantic anniversaries,
              royal weddings & intimate home celebrations.
            </p>

            {/* Call to Actions */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-2.5 sm:gap-3 pt-1 sm:pt-2">
              <Link
                href="/decorations/all"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 sm:px-7 py-3 sm:py-3.5 rounded-2xl bg-gradient-to-r from-pink-600 to-rose-500 hover:from-pink-700 hover:to-rose-600 text-white font-bold text-sm transition-all shadow-md shadow-pink-500/25 hover:-translate-y-0.5 active:scale-95"
              >
                <Sparkles className="w-4 h-4 text-white" />
                <span>Explore Decorations</span>
              </Link>
              <a
                href={`https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent(
                  "Hi Bloomora Decor, I'd like to explore flower decoration for my celebration."
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 sm:py-3.5 rounded-2xl bg-white hover:bg-emerald-50 text-emerald-800 border border-emerald-300 font-bold text-sm transition-all shadow-xs active:scale-95"
              >
                <MessageCircle className="w-4 h-4 text-emerald-600" />
                <span>WhatsApp Us</span>
              </a>
            </div>

            {/* Search Bar + Chips */}
            <div className="pt-2 sm:pt-3 max-w-xl mx-auto lg:mx-0 space-y-2.5">
              <form onSubmit={handleHeroSearch} className="relative">
                <input
                  type="text"
                  placeholder="Try 'Rose ring backdrop', 'Haldi yellow', 'Terrace'..."
                  value={heroSearch}
                  onChange={(e) => setHeroSearch(e.target.value)}
                  className="w-full pl-10 pr-24 py-2.5 sm:py-3 text-xs sm:text-sm bg-white border border-pink-200/80 rounded-2xl shadow-xs focus:outline-none focus:ring-2 focus:ring-pink-500/20 focus:border-pink-500 text-stone-800 placeholder:text-stone-400"
                />
                <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <button
                  type="submit"
                  className="absolute right-1.5 top-1/2 -translate-y-1/2 px-3.5 py-1.5 bg-gradient-to-r from-pink-600 to-rose-500 hover:from-pink-700 hover:to-rose-600 text-white text-xs font-bold rounded-xl transition-all shadow-xs"
                >
                  Search
                </button>
              </form>

              {/* Occasion Chips */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-1.5 text-xs">
                <span className="text-stone-400 font-semibold py-0.5 text-[11px]">Popular:</span>
                {popularChips.map((chip) => (
                  <Link
                    key={chip.id}
                    href={`/decorations/${chip.slug}`}
                    className="inline-flex items-center gap-1 px-2.5 py-0.5 sm:py-1 rounded-full bg-white hover:bg-pink-50 text-stone-700 hover:text-pink-600 border border-pink-100 transition-colors shadow-2xs text-[11px] sm:text-xs font-medium"
                  >
                    <span>{chip.emoji}</span>
                    <span>{chip.name}</span>
                  </Link>
                ))}
              </div>
            </div>

            {/* Trust badges */}
            <div className="pt-2 sm:pt-3 grid grid-cols-3 gap-2 border-t border-pink-100 max-w-lg mx-auto lg:mx-0 text-left">
              <div className="flex items-center gap-1.5 sm:gap-2">
                <ShieldCheck className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-600 shrink-0" />
                <span className="text-[10px] sm:text-[11px] font-semibold text-stone-600">
                  100% Fresh Blooms
                </span>
              </div>
              <div className="flex items-center gap-1.5 sm:gap-2">
                <Clock className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-600 shrink-0" />
                <span className="text-[10px] sm:text-[11px] font-semibold text-stone-600">
                  Same-Day Cutoff 4 PM
                </span>
              </div>
              <div className="flex items-center gap-1.5 sm:gap-2">
                <Star className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-pink-500 fill-pink-500 shrink-0" />
                <span className="text-[10px] sm:text-[11px] font-semibold text-stone-600">
                  4.9★ / 12k+ Events
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Visual Showcase (Auto-Rotating Pink & White Showcase) */}
          {/* Right Column: Hero Visual Showcase (Pure Clean Image Slider - No text over image) */}
          <div
            className="lg:col-span-5 relative mt-4 lg:mt-0"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            <div className="relative mx-auto max-w-lg lg:max-w-none">
              {/* Main Photo Slider */}
              <div className="relative h-[360px] sm:h-[480px] lg:h-[520px] w-full rounded-3xl sm:rounded-[2.5rem] overflow-hidden shadow-2xl shadow-pink-500/15 border-4 border-white bg-pink-50 group">
                <Image
                  key={activeSlide.image}
                  src={activeSlide.image}
                  alt={activeSlide.title}
                  fill
                  priority
                  className="object-cover transition-all duration-700 group-hover:scale-105"
                />

                {/* Left & Right Chevrons */}
                <button
                  onClick={prevSlide}
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white/90 hover:bg-white text-stone-800 flex items-center justify-center backdrop-blur-md border border-pink-100 shadow-lg transition-all active:scale-95 z-20 hover:scale-110"
                  aria-label="Previous decoration"
                >
                  <ChevronLeft className="w-5 h-5 text-pink-600" />
                </button>
                <button
                  onClick={nextSlide}
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white/90 hover:bg-white text-stone-800 flex items-center justify-center backdrop-blur-md border border-pink-100 shadow-lg transition-all active:scale-95 z-20 hover:scale-110"
                  aria-label="Next decoration"
                >
                  <ChevronRight className="w-5 h-5 text-pink-600" />
                </button>

                {/* Sleek floating indicator dots - Zero text written over image */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 bg-black/40 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/20 z-20">
                  {heroSlides.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentSlide(idx)}
                      className={`h-2 rounded-full transition-all ${
                        currentSlide === idx
                          ? "w-6 bg-pink-500 shadow-sm shadow-pink-500/50"
                          : "w-2 bg-white/70 hover:bg-white"
                      }`}
                      aria-label={`Slide ${idx + 1}`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
