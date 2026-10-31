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
    <section className="py-16 bg-stone-50 border-b border-rose-100/60">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-100 text-rose-800 text-xs font-bold uppercase tracking-wider">
            <Navigation className="w-3.5 h-3.5 text-rose-600" />
            <span>Complete Delhi NCR Reach</span>
          </div>
          <h2 className="font-serif text-2xl sm:text-4xl font-extrabold text-stone-900 tracking-tight">
            Our Service Areas
          </h2>
          <p className="text-sm text-stone-600">
            Dedicated florist crews stationed across key NCR hubs for reliable, fast arrival.
          </p>
        </div>

        {/* Hubs Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {hubs.map((hub, idx) => (
            <Link
              key={idx}
              href="/decorations/all"
              onClick={() => setSelectedCity(hub.city)}
              className="group p-5 rounded-2xl bg-white border border-stone-200/80 hover:border-rose-300 shadow-2xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between space-y-2 hover:-translate-y-0.5"
            >
              <div>
                <div className="flex items-center justify-between text-xs text-rose-600 font-semibold mb-1">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-rose-500" />
                    <span>{hub.city}</span>
                  </span>
                  <span className="text-[10px] text-stone-400 bg-stone-100 px-2 py-0.5 rounded-full font-medium">
                    {hub.count}
                  </span>
                </div>
                <h3 className="font-serif font-bold text-base text-stone-900 group-hover:text-rose-600 transition-colors">
                  {hub.name}
                </h3>
                <p className="text-xs text-stone-500 mt-1 line-clamp-2">
                  {hub.desc}
                </p>
              </div>

              <div className="pt-2 flex items-center gap-1 text-[11px] font-bold text-rose-600 group-hover:translate-x-1 transition-transform">
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
