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
    <section className="py-20 bg-gradient-to-b from-stone-900 to-stone-950 text-white relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-950 border border-rose-800 text-rose-300 text-xs font-bold uppercase tracking-wider">
            <span>Seamless 4-Step Process</span>
          </div>
          <h2 className="font-serif text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            How Bloomora Works
          </h2>
          <p className="text-sm text-stone-400">
            Booking professional flower decoration in Delhi NCR takes less than 2 minutes
          </p>
        </div>

        {/* 4 Steps Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div
                key={idx}
                className="relative p-6 rounded-3xl bg-stone-900/90 border border-stone-800 hover:border-rose-500/60 transition-all duration-300 group hover:-translate-y-1"
              >
                {/* Step Number */}
                <div className="flex items-center justify-between mb-6">
                  <span className="font-serif text-3xl font-extrabold text-stone-700 group-hover:text-rose-500 transition-colors">
                    {step.number}
                  </span>
                  <div className="w-10 h-10 rounded-2xl bg-stone-800 flex items-center justify-center text-rose-400 group-hover:bg-rose-600 group-hover:text-white transition-colors">
                    <Icon className="w-5 h-5" />
                  </div>
                </div>

                <h3 className="font-serif font-bold text-lg text-white mb-2">
                  {step.title}
                </h3>
                <p className="text-xs sm:text-sm text-stone-400 leading-relaxed">
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/decorations/all"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-2xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-sm shadow-xl hover:shadow-2xl transition-all"
          >
            <span>Start Booking Your Event</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
};
