"use client";

import React from "react";
import Link from "next/link";
import { Sparkles, Palette, CalendarCheck, HeartHandshake, ArrowRight } from "lucide-react";

export const HowItWorks: React.FC = () => {
  const steps = [
    {
      number: "01",
      title: "Choose a Design",
      description: "Browse 40+ curated fresh flower & balloon themes across 15 celebration occasions.",
      icon: Sparkles,
    },
    {
      number: "02",
      title: "Customise Add-ons",
      description: "Add fresh bouquets, designer truffle cakes, candles, fairy lights or personalized name neon.",
      icon: Palette,
    },
    {
      number: "03",
      title: "Book Your Slot",
      description: "Select same-day or future date, choose your 4-hr slot or exact fixed time, and pay 30% advance.",
      icon: CalendarCheck,
    },
    {
      number: "04",
      title: "We Decorate",
      description: "Our uniformed floral artists arrive with fresh blooms, set up seamlessly, and clean up afterwards.",
      icon: HeartHandshake,
    },
  ];

  return (
    <section className="py-12 sm:py-20 bg-gradient-to-b from-pink-50/60 via-white to-pink-50/40 text-stone-900 relative overflow-hidden border-y border-pink-100/70">
      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-14 space-y-2 sm:space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pink-100/80 border border-pink-200 text-pink-700 text-xs font-bold uppercase tracking-wider">
            <span>Seamless 4-Step Process</span>
          </div>
          <h2 className="font-serif text-2xl sm:text-4xl font-extrabold text-stone-900 tracking-tight">
            How Bloomora Works
          </h2>
          <p className="text-xs sm:text-sm text-stone-600">
            Booking professional flower decoration in Delhi NCR takes less than 2 minutes
          </p>
        </div>

        {/* 4 Steps Grid - 2 columns on mobile */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 relative">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div
                key={idx}
                className="relative p-4 sm:p-6 rounded-2xl sm:rounded-3xl bg-white border border-pink-100 hover:border-pink-300 hover:shadow-xl hover:shadow-pink-500/10 transition-all duration-300 group hover:-translate-y-1 flex flex-col justify-between"
              >
                {/* Step Number & Icon */}
                <div className="flex items-center justify-between mb-3 sm:mb-6">
                  <span className="font-serif text-2xl sm:text-3xl font-black text-pink-600 group-hover:scale-110 transition-transform">
                    {step.number}
                  </span>
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl sm:rounded-2xl bg-pink-50 border border-pink-200/60 flex items-center justify-center text-pink-600 group-hover:bg-gradient-to-r group-hover:from-pink-600 group-hover:to-rose-500 group-hover:text-white transition-all">
                    <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
                  </div>
                </div>

                <div>
                  <h3 className="font-serif font-bold text-xs sm:text-lg text-stone-900 mb-1 sm:mb-2 group-hover:text-pink-600 transition-colors">
                    {step.title}
                  </h3>
                  <p className="text-[10px] sm:text-xs text-stone-600 leading-snug">
                    {step.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-8 sm:mt-12 text-center">
          <Link
            href="/decorations/all"
            className="inline-flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-3.5 rounded-full bg-gradient-to-r from-pink-600 to-rose-500 hover:from-pink-700 hover:to-rose-600 text-white font-bold text-xs sm:text-sm shadow-lg shadow-pink-500/25 hover:shadow-xl transition-all"
          >
            <span>Start Booking Your Event</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
};
