"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowRight, Flame } from "lucide-react";
import { decorationsData } from "@/data/decorations";
import { DecorationCard } from "@/components/common/DecorationCard";

export const TrendingDecorations: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>("all");

  const tabs = [
    { id: "all", label: "All Trending" },
    { id: "birthday", label: "Birthday" },
    { id: "anniversary", label: "Anniversary" },
    { id: "haldi-mehndi", label: "Haldi & Mehndi" },
    { id: "wedding", label: "Wedding" },
  ];

  const trendingItems = decorationsData.filter(
    (d) => d.isTrending || d.isBestSeller
  );

  const filteredItems =
    activeTab === "all"
      ? trendingItems.slice(0, 8)
      : trendingItems.filter((d) => d.occasionSlug === activeTab).slice(0, 8);

  return (
    <section className="py-16 bg-cream-50/50">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-100/80 text-rose-800 text-xs font-bold uppercase tracking-wider mb-2">
              <Flame className="w-3.5 h-3.5 text-rose-600 fill-rose-600" />
              <span>Delhi NCR Favorites</span>
            </div>
            <h2 className="font-serif text-2xl sm:text-4xl font-extrabold text-stone-900 tracking-tight">
              Trending Decorations
            </h2>
            <p className="text-sm text-stone-600 mt-1">
              Our most celebrated setups booked over 500+ times this festive season
            </p>
          </div>

          <Link
            href="/decorations/all"
            className="inline-flex items-center gap-1.5 font-bold text-sm text-rose-600 hover:text-rose-700"
          >
            <span>View All Bestsellers</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Tab Filters */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-3 mb-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all whitespace-nowrap ${
                activeTab === tab.id
                  ? "bg-stone-900 text-white shadow-sm"
                  : "bg-white text-stone-600 hover:bg-rose-50 hover:text-stone-900 border border-stone-200/60"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredItems.map((dec) => (
            <DecorationCard key={dec.id} decoration={dec} />
          ))}
        </div>
      </div>
    </section>
  );
};
