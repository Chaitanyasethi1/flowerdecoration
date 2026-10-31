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
    <section className="py-12 bg-rose-50/60 border-y border-rose-100/70">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div key={idx} className="p-4 space-y-1">
                <div className="flex justify-center mb-2">
                  <div className="w-10 h-10 rounded-full bg-white shadow-xs flex items-center justify-center">
                    <Icon className={`w-5 h-5 ${stat.color}`} />
                  </div>
                </div>
                <div className="font-serif text-3xl sm:text-4xl font-extrabold text-stone-900 tracking-tight">
                  {stat.value}
                </div>
                <div className="font-semibold text-xs sm:text-sm text-stone-800">
                  {stat.label}
                </div>
                <div className="text-[11px] text-stone-500">
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
