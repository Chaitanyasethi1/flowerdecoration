"use client";

import React from "react";
import {
  Clock,
  Sparkles,
  Users,
  CheckCircle,
  Award,
  Headphones,
} from "lucide-react";

export const WhyBloomora: React.FC = () => {
  const perks = [
    {
      icon: Clock,
      title: "Same-Day Decoration",
      description: "Book before 4:00 PM IST and have our expert floral crew set up at your Delhi NCR venue in as quick as 3 to 4 hours.",
      color: "text-rose-600 bg-rose-50 border-rose-100",
    },
    {
      icon: Sparkles,
      title: "100% Fresh Farm Flowers",
      description: "Procured fresh at 5 AM daily from Ghazipur mandi. Hand-selected Dutch roses, orchids, and fragrant tuberoses with zero wilting.",
      color: "text-amber-600 bg-amber-50 border-amber-100",
    },
    {
      icon: Users,
      title: "Trained & Verified Team",
      description: "Courteous, police-verified in-house floral artisans who arrive discreetly with shoe covers and leave your premises spotless.",
      color: "text-emerald-600 bg-emerald-50 border-emerald-100",
    },
    {
      icon: CheckCircle,
      title: "Transparent Fixed Pricing",
      description: "No hidden charges on site. Confirm your booking with only a 30% advance, and settle the balance after inspecting the completed setup.",
      color: "text-blue-600 bg-blue-50 border-blue-100",
    },
    {
      icon: Award,
      title: "10+ Years / 12,000+ Celebrations",
      description: "Delhi NCR's trusted flower stylists since 2015. Counted on by celebrity birthdays, corporate galas, and thousands of joyful homes.",
      color: "text-purple-600 bg-purple-50 border-purple-100",
    },
    {
      icon: Headphones,
      title: "Free Custom Consultation",
      description: "Not sure what fits your space? Share your living room or lawn photo on WhatsApp for instant 3D layout recommendations.",
      color: "text-stone-700 bg-stone-100 border-stone-200",
    },
  ];

  return (
    <section className="py-12 sm:py-20 bg-white">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-14 space-y-2 sm:space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-pink-50 border border-pink-200/60 text-pink-700 text-xs font-bold uppercase tracking-wider">
            <span>🌸 The Bloomora Promise</span>
          </div>
          <h2 className="font-serif text-2xl sm:text-4xl font-extrabold text-stone-900 tracking-tight">
            Why Delhi NCR Chooses Bloomora
          </h2>
          <p className="text-xs sm:text-base text-stone-600">
            We don&apos;t just deliver flowers; we transform spaces into enchanting memories with uncompromised craftsmanship.
          </p>
        </div>

        {/* 6 Features Grid - 2 columns on mobile */}
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6">
          {perks.map((perk, idx) => {
            const Icon = perk.icon;
            return (
              <div
                key={idx}
                className="p-3.5 sm:p-6 rounded-2xl sm:rounded-3xl bg-pink-50/30 border border-pink-100/90 hover:bg-white hover:border-pink-300 hover:shadow-xl hover:shadow-pink-500/10 transition-all duration-300 group flex flex-col justify-between"
              >
                <div>
                  <div
                    className="w-9 h-9 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl flex items-center justify-center border border-pink-200/60 bg-white text-pink-600 mb-3 sm:mb-5 transition-transform group-hover:scale-110 shadow-xs"
                  >
                    <Icon className="w-4 h-4 sm:w-6 sm:h-6" />
                  </div>
                  <h3 className="font-serif font-bold text-xs sm:text-lg text-stone-900 mb-1 sm:mb-2 group-hover:text-pink-600 transition-colors">
                    {perk.title}
                  </h3>
                  <p className="text-[10px] sm:text-sm text-stone-600 leading-snug">
                    {perk.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
