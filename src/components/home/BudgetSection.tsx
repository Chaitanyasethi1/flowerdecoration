"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, Wallet, Sparkles } from "lucide-react";

export const BudgetSection: React.FC = () => {
  const budgetTiers = [
    {
      id: "under-2k",
      label: "Under ₹2,000",
      subtext: "Bouquets, simple room surprises & balloon arches",
      min: 0,
      max: 2000,
      bg: "from-rose-50 to-pink-50",
      accent: "text-rose-700",
      borderColor: "border-rose-200",
      itemsCount: "12+ Options",
    },
    {
      id: "2k-5k",
      label: "₹2,000 – ₹5,000",
      subtext: "Ring backdrops, neon walls & romantic bedroom setups",
      min: 2000,
      max: 5000,
      bg: "from-amber-50 to-orange-50",
      accent: "text-amber-800",
      borderColor: "border-amber-200",
      itemsCount: "20+ Options",
      popular: true,
    },
    {
      id: "5k-10k",
      label: "₹5,000 – ₹10,000",
      subtext: "Haldi corners, rooftop cabanas & proposal setups",
      min: 5000,
      max: 10000,
      bg: "from-emerald-50 to-teal-50",
      accent: "text-emerald-800",
      borderColor: "border-emerald-200",
      itemsCount: "15+ Options",
    },
    {
      id: "10k-plus",
      label: "₹10,000+",
      subtext: "Grand wedding mandaps, gala stages & royal backdrops",
      min: 10000,
      max: 100000,
      bg: "from-purple-50 to-indigo-50",
      accent: "text-purple-800",
      borderColor: "border-purple-200",
      itemsCount: "8+ Options",
    },
  ];

  return (
    <section className="py-16 bg-cream-100/60 border-b border-rose-50">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-rose-200/60 text-stone-700 text-xs font-bold uppercase tracking-wider">
            <Wallet className="w-3.5 h-3.5 text-rose-500" />
            <span>Smart Event Planning</span>
          </div>
          <h2 className="font-serif text-2xl sm:text-4xl font-extrabold text-stone-900 tracking-tight">
            Shop by Budget
          </h2>
          <p className="text-sm text-stone-600">
            Find the perfect setup tailored specifically to your celebration scale and spend.
          </p>
        </div>

        {/* Budget Tiers Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {budgetTiers.map((tier) => (
            <Link
              key={tier.id}
              href={`/decorations/all?minPrice=${tier.min}&maxPrice=${tier.max}`}
              className={`group relative p-6 rounded-3xl bg-gradient-to-br ${tier.bg} border ${tier.borderColor} shadow-xs hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between`}
            >
              {tier.popular && (
                <div className="absolute -top-3 right-6 bg-stone-900 text-amber-300 text-[10px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider flex items-center gap-1 shadow-sm">
                  <Sparkles className="w-3 h-3" />
                  <span>Most Popular</span>
                </div>
              )}

              <div className="space-y-3">
                <span className="text-[11px] font-bold text-stone-500 uppercase tracking-wider">
                  {tier.itemsCount}
                </span>
                <h3 className={`font-serif text-2xl font-extrabold ${tier.accent}`}>
                  {tier.label}
                </h3>
                <p className="text-xs text-stone-600 leading-relaxed">
                  {tier.subtext}
                </p>
              </div>

              <div className="pt-6 flex items-center justify-between text-xs font-bold text-stone-800 group-hover:text-rose-600 transition-colors">
                <span>View Matching Designs</span>
                <div className="w-8 h-8 rounded-full bg-white shadow-xs flex items-center justify-center group-hover:bg-rose-600 group-hover:text-white transition-colors">
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
