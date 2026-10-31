"use client";

import React from "react";
import Link from "next/link";
import { MapPin, Navigation, ArrowRight } from "lucide-react";
import { useCity } from "@/context/CityContext";

export const ServiceAreas: React.FC = () => {
  const { setSelectedCity } = useCity();

  const hubs = [
    { name: "South Delhi", city: "Delhi", count: "450+ Decors", desc: "GK, Hauz Khas, Saket, Vasant Vihar, Defence Colony" },
    { name: "Gurgaon", city: "Gurgaon", count: "800+ Decors", desc: "DLF Phase 1-5, Golf Course Rd, Sohna Rd, Cyber City" },
    { name: "Noida", city: "Noida", count: "600+ Decors", desc: "Sector 18, 50, 75, 128, 137 & Expressways" },
    { name: "Dwarka", city: "Delhi", count: "300+ Decors", desc: "Sector 6, 10, 11, 14, 21, 23 & Dwarka Expressway" },
    { name: "Indirapuram", city: "Ghaziabad", count: "250+ Decors", desc: "Vaishali, Vasundhara, Ahinsa Khand, Raj Nagar Ext." },
    { name: "Faridabad", city: "Faridabad", count: "200+ Decors", desc: "Sector 14, 15, 16, 21C, Green Field & Surajkund" },
    { name: "Greater Noida", city: "Greater Noida", count: "180+ Decors", desc: "Pari Chowk, Alpha, Beta, Gamma, Gaur City" },
    { name: "Central & West Delhi", city: "Delhi", count: "350+ Decors", desc: "Connaught Place, Punjabi Bagh, Rajouri Garden, Patel Nagar" },
  ];

  return (
    <section className="py-12 sm:py-16 bg-gradient-to-b from-pink-50/50 via-white to-pink-50/40 border-b border-pink-100/70">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-10 space-y-2 sm:space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pink-50 border border-pink-200/60 text-pink-700 text-xs font-bold uppercase tracking-wider">
            <Navigation className="w-3.5 h-3.5 text-pink-600" />
            <span>Complete Delhi NCR Reach</span>
          </div>
          <h2 className="font-serif text-2xl sm:text-4xl font-extrabold text-stone-900 tracking-tight">
            Our Service Areas
          </h2>
          <p className="text-xs sm:text-sm text-stone-600">
            Dedicated florist crews stationed across key NCR hubs for reliable, fast arrival.
          </p>
        </div>

        {/* Hubs Grid - 2 columns on mobile */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {hubs.map((hub, idx) => (
            <Link
              key={idx}
              href="/decorations/all"
              onClick={() => setSelectedCity(hub.city)}
              className="group p-3.5 sm:p-5 rounded-2xl bg-white border border-pink-100/90 hover:border-pink-300 shadow-2xs hover:shadow-lg hover:shadow-pink-500/10 transition-all duration-300 flex flex-col justify-between space-y-2 hover:-translate-y-0.5"
            >
              <div>
                <div className="flex items-center justify-between text-xs text-pink-600 font-bold mb-1">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-pink-500" />
                    <span>{hub.city}</span>
                  </span>
                  <span className="text-[9px] sm:text-[10px] text-pink-700 bg-pink-50 px-1.5 sm:px-2 py-0.5 rounded-full font-bold">
                    {hub.count}
                  </span>
                </div>
                <h3 className="font-serif font-bold text-xs sm:text-base text-stone-900 group-hover:text-pink-600 transition-colors">
                  {hub.name}
                </h3>
                <p className="text-[10px] sm:text-xs text-stone-500 mt-0.5 line-clamp-2">
                  {hub.desc}
                </p>
              </div>

              <div className="pt-2 flex items-center gap-1 text-[10px] sm:text-[11px] font-bold text-pink-600 group-hover:translate-x-1 transition-transform border-t border-pink-50">
                <span>Book in {hub.name}</span>
                <ArrowRight className="w-3 h-3" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
