"use client";

import React from "react";
import { Sparkles, Users, Star, MapPin } from "lucide-react";
import { siteConfig } from "@/config/site";

export const StatsCounter: React.FC = () => {
  const stats = [
    {
      value: siteConfig.eventsCount,
      label: "Events Decorated",
      subtext: "Since 2015 across NCR",
      icon: Sparkles,
      color: "text-rose-600",
    },
    {
      value: siteConfig.happyCustomersCount,
      label: "Happy Families",
      subtext: "Delighted recurring hosts",
      icon: Users,
      color: "text-amber-600",
    },
    {
      value: siteConfig.avgRating,
      label: "Average Rating",
      subtext: "Google & WhatsApp reviews",
      icon: Star,
      color: "text-emerald-600",
    },
    {
      value: siteConfig.citiesCount,
      label: "NCR Coverage",
      subtext: "Delhi, Noida, Gurgaon & more",
      icon: MapPin,
      color: "text-blue-600",
    },
  ];

  return (
    <section className="py-10 sm:py-14 bg-gradient-to-b from-pink-50/70 via-white to-pink-50/50 border-y border-pink-100/80">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 text-center">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div key={idx} className="p-3 sm:p-5 rounded-2xl bg-white/80 border border-pink-100/70 shadow-xs space-y-1">
                <div className="flex justify-center mb-1.5 sm:mb-2">
                  <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-pink-50 border border-pink-200/60 shadow-xs flex items-center justify-center">
                    <Icon className="w-4 h-4 sm:w-5 sm:h-5 text-pink-600" />
                  </div>
                </div>
                <div className="font-serif text-2xl sm:text-4xl font-black text-stone-900 tracking-tight">
                  {stat.value}
                </div>
                <div className="font-bold text-xs sm:text-sm text-stone-800">
                  {stat.label}
                </div>
                <div className="text-[10px] sm:text-[11px] text-stone-500">
                  {stat.subtext}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
