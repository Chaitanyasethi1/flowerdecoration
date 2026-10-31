"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, Wallet, Sparkles } from "lucide-react";

export const BudgetSection: React.FC = () => {
  const budgetTiers = [
    {
      id: "under-2k",
      label: "Under ₹2,000",
      subtext: "Bouquets & room surprises",
      min: 0,
      max: 2000,
      bg: "from-pink-50 via-white to-pink-50/50",
      accent: "text-pink-700",
      borderColor: "border-pink-200/90",
      itemsCount: "12+ Options",
    },
    {
      id: "2k-5k",
      label: "₹2,000 – ₹5,000",
      subtext: "Ring backdrops & romantic neon walls",
      min: 2000,
      max: 5000,
      bg: "from-rose-50 via-white to-pink-100/60",
      accent: "text-rose-700",
      borderColor: "border-pink-300",
      itemsCount: "20+ Options",
      popular: true,
    },
    {
      id: "5k-10k",
      label: "₹5,000 – ₹10,000",
      subtext: "Haldi corners & rooftop cabanas",
      min: 5000,
      max: 10000,
      bg: "from-pink-50/70 via-white to-rose-50/50",
      accent: "text-pink-800",
      borderColor: "border-pink-200/80",
      itemsCount: "15+ Options",
    },
    {
      id: "10k-plus",
      label: "₹10,000+",
      subtext: "Grand wedding mandaps & royal backdrops",
      min: 10000,
      max: 100000,
      bg: "from-rose-100/40 via-white to-pink-50",
      accent: "text-rose-900",
      borderColor: "border-pink-200/90",
      itemsCount: "8+ Options",
    },
  ];

  return (
    <section className="py-12 sm:py-16 bg-white border-b border-pink-100/70">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-10 space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pink-50 border border-pink-200/60 text-pink-700 text-xs font-bold uppercase tracking-wider">
            <Wallet className="w-3.5 h-3.5 text-pink-500" />
            <span>Smart Event Planning</span>
          </div>
          <h2 className="font-serif text-2xl sm:text-4xl font-extrabold text-stone-900 tracking-tight">
            Shop by Budget
          </h2>
          <p className="text-xs sm:text-sm text-stone-600">
            Find the perfect setup tailored specifically to your celebration scale and spend.
          </p>
        </div>

        {/* Budget Tiers Grid - 2 columns on mobile */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
          {budgetTiers.map((tier) => (
            <Link
              key={tier.id}
              href={`/decorations/all?minPrice=${tier.min}&maxPrice=${tier.max}`}
              className={`group relative p-4 sm:p-6 rounded-2xl sm:rounded-3xl bg-gradient-to-br ${tier.bg} border ${tier.borderColor} shadow-xs hover:shadow-xl hover:shadow-pink-500/10 transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between`}
            >
              {tier.popular && (
                <div className="absolute -top-2.5 right-3 sm:right-6 bg-gradient-to-r from-pink-600 to-rose-500 text-white text-[8px] sm:text-[10px] font-black px-2 sm:px-3 py-0.5 sm:py-1 rounded-full uppercase tracking-wider flex items-center gap-1 shadow-md shadow-pink-500/20">
                  <Sparkles className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-amber-300" />
                  <span>Popular</span>
                </div>
              )}

              <div className="space-y-1.5 sm:space-y-3">
                <span className="text-[10px] sm:text-[11px] font-bold text-stone-500 uppercase tracking-wider">
                  {tier.itemsCount}
                </span>
                <h3 className={`font-serif text-base sm:text-2xl font-extrabold ${tier.accent}`}>
                  {tier.label}
                </h3>
                <p className="text-[10px] sm:text-xs text-stone-600 leading-snug line-clamp-2">
                  {tier.subtext}
                </p>
              </div>

              <div className="pt-3 sm:pt-6 flex items-center justify-between text-[11px] sm:text-xs font-bold text-stone-800 group-hover:text-pink-600 transition-colors border-t border-pink-100/60 mt-3 sm:mt-0">
                <span className="hidden sm:inline">View Designs</span>
                <span className="sm:hidden">Explore</span>
                <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-white shadow-xs flex items-center justify-center group-hover:bg-gradient-to-r group-hover:from-pink-600 group-hover:to-rose-500 group-hover:text-white transition-all">
                  <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
