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
    <section className="py-12 sm:py-16 bg-gradient-to-b from-white via-pink-50/30 to-white">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-3 sm:gap-4 mb-6 sm:mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pink-50 border border-pink-200/60 text-pink-700 text-xs font-bold uppercase tracking-wider mb-2">
              <Flame className="w-3.5 h-3.5 text-pink-600 fill-pink-600" />
              <span>Delhi NCR Favorites</span>
            </div>
            <h2 className="font-serif text-2xl sm:text-4xl font-extrabold text-stone-900 tracking-tight">
              Trending Decorations
            </h2>
            <p className="text-xs sm:text-sm text-stone-600 mt-1">
              Our most celebrated setups booked over 500+ times this festive season
            </p>
          </div>

          <Link
            href="/decorations/all"
            className="inline-flex items-center gap-1.5 font-bold text-xs sm:text-sm text-pink-600 hover:text-pink-700 self-start md:self-auto"
          >
            <span>View All Bestsellers</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Tab Filters */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-2 mb-6 sm:mb-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-bold transition-all whitespace-nowrap ${
                activeTab === tab.id
                  ? "bg-gradient-to-r from-pink-600 to-rose-500 text-white shadow-md shadow-pink-500/20"
                  : "bg-white text-stone-700 hover:bg-pink-50 hover:text-pink-600 border border-pink-100"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Product Grid - 2 columns on mobile */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
          {filteredItems.map((dec) => (
            <DecorationCard key={dec.id} decoration={dec} />
          ))}
        </div>
      </div>
    </section>
  );
};
