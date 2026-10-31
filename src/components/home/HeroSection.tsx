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
  MapPin,
  ChevronLeft,
  ChevronRight,
  ArrowRight,
} from "lucide-react";
import { siteConfig } from "@/config/site";
import { occasionsData } from "@/data/occasions";

const heroSlides = [
  {
    title: "Blush Rose Ring Backdrop",
    tagline: "Trending in Gurgaon & South Delhi",
    price: 3499,
    originalPrice: 4999,
    slug: "blush-rose-ring-backdrop",
    image: "https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&w=1200&q=85",
  },
  {
    title: "Royal Marigold Haldi Jhoola",
    tagline: "Wedding Hit across Noida & Delhi",
    price: 4499,
    originalPrice: 5999,
    slug: "marigold-haldi-jhoola-setup",
    image: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=1200&q=85",
  },
  {
    title: "Fairy Canopy Romantic Cabana",
    tagline: "Terrace Special in Ghaziabad & CP",
    price: 3999,
    originalPrice: 5499,
    slug: "fairy-light-canopy-cabana",
    image: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=85",
  },
  {
    title: "Pastel Teddy & Cloud Baby Shower",
    tagline: "Trending in West Delhi & Gurgaon",
    price: 3899,
    originalPrice: 4999,
    slug: "pastel-teddy-cloud-baby-shower",
    image: "https://images.unsplash.com/photo-1527529482837-4698179dc6ce?auto=format&fit=crop&w=1200&q=85",
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
    <section className="relative overflow-hidden bg-gradient-to-b from-rose-50/70 via-cream-50/40 to-white pt-6 pb-16 lg:pt-12 lg:pb-24">
      {/* Decorative floral background blur */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-rose-200/30 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-96 h-96 rounded-full bg-amber-200/20 blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Headings & Actions */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            {/* Tag badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-rose-200/80 shadow-xs text-xs font-semibold text-rose-800">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Delhi NCR · Since {siteConfig.sinceYear} · Same-Day Available</span>
            </div>

            {/* H1 Title */}
            <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-extrabold text-stone-900 tracking-tight leading-[1.15]">
              Flowers that make every moment{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-600 via-rose-500 to-amber-600">
                unforgettable
              </span>
            </h1>

            {/* Subtext */}
            <p className="text-base sm:text-lg text-stone-600 max-w-xl mx-auto lg:mx-0 leading-relaxed">
              Delhi NCR&apos;s premier fresh flower & balloon styling service.
              Curated by master florists for birthdays, romantic anniversaries,
              royal weddings & intimate home celebrations.
            </p>

            {/* Call to Actions */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 pt-2">
              <Link
                href="/decorations/all"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-2xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-sm transition-all shadow-md hover:shadow-xl hover:-translate-y-0.5"
              >
                <Sparkles className="w-4 h-4 text-amber-300" />
                <span>Explore Decorations</span>
              </Link>
              <a
                href={`https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent(
                  "Hi Bloomora Decor, I'd like to explore flower decoration for my celebration."
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-emerald-50 hover:bg-emerald-100/80 text-emerald-800 border border-emerald-300/80 font-bold text-sm transition-all shadow-xs"
              >
                <MessageCircle className="w-4 h-4 text-emerald-600" />
                <span>WhatsApp Us</span>
              </a>
            </div>

            {/* Search Bar + Chips */}
            <div className="pt-4 max-w-xl mx-auto lg:mx-0 space-y-3">
              <form onSubmit={handleHeroSearch} className="relative">
                <input
                  type="text"
                  placeholder="Try 'Rose ring backdrop', 'Haldi yellow', 'Candle terrace'..."
                  value={heroSearch}
                  onChange={(e) => setHeroSearch(e.target.value)}
                  className="w-full pl-11 pr-24 py-3 text-sm bg-white border border-stone-200/90 rounded-2xl shadow-sm focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 text-stone-800"
                />
                <Search className="w-5 h-5 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <button
                  type="submit"
                  className="absolute right-2 top-1/2 -translate-y-1/2 px-4 py-1.5 bg-stone-900 hover:bg-stone-800 text-white text-xs font-semibold rounded-xl transition-colors"
                >
                  Search
                </button>
              </form>

              {/* Occasion Chips */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-1.5 text-xs">
                <span className="text-stone-400 font-medium py-1">Popular:</span>
                {popularChips.map((chip) => (
                  <Link
                    key={chip.id}
                    href={`/decorations/${chip.slug}`}
                    className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-white/80 hover:bg-rose-50 text-stone-700 hover:text-rose-700 border border-stone-200/70 hover:border-rose-200 transition-colors shadow-2xs"
                  >
                    <span>{chip.emoji}</span>
                    <span>{chip.name}</span>
                  </Link>
                ))}
              </div>
            </div>

            {/* Trust badges */}
            <div className="pt-3 grid grid-cols-3 gap-2 border-t border-rose-100/80 max-w-lg mx-auto lg:mx-0 text-left">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span className="text-[11px] font-medium text-stone-600">
                  100% Fresh Blooms
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-amber-600 shrink-0" />
                <span className="text-[11px] font-medium text-stone-600">
                  Cutoff 4 PM Same-Day
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="w-4 h-4 text-rose-500 fill-rose-500 shrink-0" />
                <span className="text-[11px] font-medium text-stone-600">
                  4.9★ / 12k+ Events
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Visual Showcase (Auto-Rotating Carousel) */}
          <div
            className="lg:col-span-5 relative"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Main arched photo slider */}
              <div className="relative h-[390px] sm:h-[470px] w-full rounded-[2.5rem] overflow-hidden shadow-2xl border-4 border-white bg-stone-900 group">
                <Image
                  key={activeSlide.slug}
                  src={activeSlide.image}
                  alt={activeSlide.title}
                  fill
                  priority
                  className="object-cover transition-all duration-700 group-hover:scale-105 animate-in fade-in"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-stone-900/20 to-transparent" />

                {/* Left & Right Chevrons */}
                <button
                  onClick={prevSlide}
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/50 hover:bg-black/80 text-white flex items-center justify-center backdrop-blur-md border border-white/20 transition-all opacity-80 hover:opacity-100 hover:scale-110 z-20"
                  aria-label="Previous decoration"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={nextSlide}
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/50 hover:bg-black/80 text-white flex items-center justify-center backdrop-blur-md border border-white/20 transition-all opacity-80 hover:opacity-100 hover:scale-110 z-20"
                  aria-label="Next decoration"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>

                {/* Floating caption on hero */}
                <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6 text-white p-4 rounded-2xl bg-stone-950/60 backdrop-blur-md border border-white/20 z-10">
                  <div className="flex items-center justify-between gap-3">
                    <div className="min-w-0">
                      <p className="text-[11px] uppercase font-semibold text-rose-300 tracking-wider truncate">
                        {activeSlide.tagline}
                      </p>
                      <h3 className="font-serif text-base sm:text-lg font-bold text-white truncate">
                        {activeSlide.title}
                      </h3>
                    </div>
                    <div className="text-right shrink-0">
                      <span className="text-[11px] text-stone-300 line-through">
                        ₹{activeSlide.originalPrice.toLocaleString()}
                      </span>
                      <p className="text-base sm:text-lg font-extrabold text-amber-300">
                        ₹{activeSlide.price.toLocaleString()}
                      </p>
                    </div>
                  </div>

                  <div className="mt-3 pt-2.5 border-t border-white/10 flex items-center justify-between">
                    <Link
                      href={`/decoration/${activeSlide.slug}`}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-300 hover:text-white transition-colors"
                    >
                      <span>Book this setup</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>

                    {/* Indicator dots matching Screenshot 1 */}
                    <div className="flex items-center gap-1.5">
                      {heroSlides.map((_, idx) => (
                        <button
                          key={idx}
                          onClick={() => setCurrentSlide(idx)}
                          className={`h-1.5 rounded-full transition-all ${
                            currentSlide === idx
                              ? "w-6 bg-rose-400"
                              : "w-1.5 bg-white/40 hover:bg-white/80"
                          }`}
                          aria-label={`Slide ${idx + 1}`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating review card */}
              <div className="absolute -bottom-5 -left-4 sm:-left-6 bg-white rounded-2xl p-3 shadow-xl border border-rose-100 flex items-center gap-3 animate-float max-w-xs z-20">
                <div className="w-9 h-9 rounded-full bg-rose-100 flex items-center justify-center text-base shrink-0">
                  💐
                </div>
                <div>
                  <div className="flex items-center gap-1 text-amber-500">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3 h-3 fill-amber-400" />
                    ))}
                    <span className="text-[11px] font-bold text-stone-800 ml-1">
                      4.9 / 5.0
                    </span>
                  </div>
                  <p className="text-xs font-semibold text-stone-800">
                    &ldquo;Best decor team in Delhi!&rdquo;
                  </p>
                  <p className="text-[10px] text-stone-400">Priya S., DLF Phase 5</p>
                </div>
              </div>

              {/* Floating city badge */}
              <div className="absolute top-4 -right-3 sm:-right-4 bg-white/95 backdrop-blur-md rounded-2xl px-3.5 py-2 shadow-lg border border-rose-100 flex items-center gap-2 z-20">
                <MapPin className="w-4 h-4 text-rose-600" />
                <span className="text-xs font-bold text-stone-800">Delhi NCR Hubs</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
