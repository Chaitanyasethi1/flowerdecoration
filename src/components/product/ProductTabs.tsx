"use client";

import React, { useState } from "react";
import { Star, CheckCircle2, ShieldCheck, Sparkles, HelpCircle } from "lucide-react";
import { Decoration } from "@/types";
import { reviewsData } from "@/data/reviews";

interface ProductTabsProps {
  decoration: Decoration;
}

export const ProductTabs: React.FC<ProductTabsProps> = ({ decoration }) => {
  const [activeTab, setActiveTab] = useState<"details" | "inclusions" | "care" | "reviews" | "faq">("details");

  const tabs = [
    { id: "details", label: "Details & Setup" },
    { id: "inclusions", label: "What's Included" },
    { id: "care", label: "Care & Tips" },
    { id: "reviews", label: `Reviews (${decoration.reviewsCount})` },
    { id: "faq", label: "FAQs" },
  ];

  return (
    <div className="space-y-6">
      {/* Tabs list */}
      <div className="flex items-center gap-2 border-b border-stone-200 overflow-x-auto no-scrollbar">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as typeof activeTab)}
            className={`py-3 px-4 text-xs sm:text-sm font-bold border-b-2 transition-all whitespace-nowrap ${
              activeTab === tab.id
                ? "border-rose-600 text-rose-600"
                : "border-transparent text-stone-500 hover:text-stone-900"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Panels */}
      <div className="text-stone-700 text-sm leading-relaxed min-h-[160px]">
        {/* DETAILS */}
        {activeTab === "details" && (
          <div className="space-y-4">
            <p>{decoration.description}</p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-2">
              <div className="p-3 bg-stone-50 rounded-2xl border border-stone-200/60">
                <span className="text-[11px] text-stone-400 font-semibold uppercase block">
                  Dimensions
                </span>
                <span className="font-bold text-stone-800 text-xs sm:text-sm">
                  {decoration.dimensions}
                </span>
              </div>
              <div className="p-3 bg-stone-50 rounded-2xl border border-stone-200/60">
                <span className="text-[11px] text-stone-400 font-semibold uppercase block">
                  Setup Time
                </span>
                <span className="font-bold text-stone-800 text-xs sm:text-sm">
                  {decoration.setupTime}
                </span>
              </div>
              <div className="p-3 bg-stone-50 rounded-2xl border border-stone-200/60">
                <span className="text-[11px] text-stone-400 font-semibold uppercase block">
                  Location Type
                </span>
                <span className="font-bold text-stone-800 text-xs sm:text-sm">
                  {decoration.locationType} Friendly
                </span>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 pt-2">
              <span className="text-xs font-semibold text-stone-500 py-1">Flowers Used:</span>
              {decoration.flowerType.map((f, i) => (
                <span key={i} className="px-2.5 py-1 rounded-full bg-rose-50 text-rose-700 text-xs font-medium">
                  {f}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* INCLUSIONS */}
        {activeTab === "inclusions" && (
          <div className="space-y-3">
            <h4 className="font-serif font-bold text-stone-900">
              Everything provided in this setup package:
            </h4>
            <ul className="space-y-2.5">
              {decoration.inclusions.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <div className="p-3 bg-amber-50 rounded-2xl border border-amber-200/80 text-xs text-amber-900 mt-4">
              <b>Important Note:</b> Rental hardware (frames, neon lights, brass urlis) will be picked up the next morning at your convenient time.
            </div>
          </div>
        )}

        {/* CARE */}
        {activeTab === "care" && (
          <div className="space-y-3">
            <h4 className="font-serif font-bold text-stone-900">
              Flower Care & Longevity Advice:
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm">
              <li className="flex items-start gap-2">
                <span className="text-rose-500 font-bold">•</span>
                <span>All flowers are sourced farm-fresh and treated with floral hydration mist.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-rose-500 font-bold">•</span>
                <span>Keep the room temperature cool (20°C - 24°C) to keep petals perky and prevent dehydration.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-rose-500 font-bold">•</span>
                <span>Avoid placing flowers directly in line with harsh outdoor sun or ceiling fan blast.</span>
              </li>
            </ul>
          </div>
        )}

        {/* REVIEWS */}
        {activeTab === "reviews" && (
          <div className="space-y-4">
            <div className="flex items-center gap-3 p-4 bg-stone-50 rounded-2xl border border-stone-200">
              <div className="text-center pr-4 border-r border-stone-200">
                <div className="font-serif text-3xl font-extrabold text-stone-900">
                  {decoration.rating}
                </div>
                <div className="flex items-center gap-0.5 text-amber-400 mt-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                  ))}
                </div>
                <span className="text-[10px] text-stone-500">
                  {decoration.reviewsCount} Reviews
                </span>
              </div>
              <div className="text-xs text-stone-600">
                <p className="font-bold text-stone-900">
                  100% Verified Customer Reviews
                </p>
                <p>
                  Rated on punctuality of decorators, fresh flower quality, and resemblance to catalog photos.
                </p>
              </div>
            </div>

            <div className="space-y-3">
              {reviewsData.slice(0, 3).map((rev) => (
                <div key={rev.id} className="p-3.5 rounded-2xl bg-white border border-stone-200/80 space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-stone-900">{rev.name} ({rev.location})</span>
                    <span className="text-stone-400">{rev.date}</span>
                  </div>
                  <div className="flex items-center gap-0.5 text-amber-400">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-3 h-3 fill-amber-400" />
                    ))}
                  </div>
                  <p className="text-xs text-stone-600 italic">
                    &ldquo;{rev.comment}&rdquo;
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* FAQ */}
        {activeTab === "faq" && (
          <div className="space-y-3">
            <div className="p-3.5 rounded-2xl bg-stone-50 border border-stone-200 space-y-1">
              <h5 className="font-bold text-stone-900 text-xs sm:text-sm">
                How many decorators will arrive at my location?
              </h5>
              <p className="text-xs text-stone-600">
                A dedicated team of 2 professional floral technicians will arrive with all equipment and ladder stands.
              </p>
            </div>
            <div className="p-3.5 rounded-2xl bg-stone-50 border border-stone-200 space-y-1">
              <h5 className="font-bold text-stone-900 text-xs sm:text-sm">
                What if I need to postpone my booking date?
              </h5>
              <p className="text-xs text-stone-600">
                Rescheduling is 100% free of charge up to 24 hours prior to your booked slot. Simply contact our WhatsApp support.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
