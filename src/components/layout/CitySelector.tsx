"use client";

import React, { useState, useRef, useEffect } from "react";
import { MapPin, ChevronDown, Check } from "lucide-react";
import { useCity } from "@/context/CityContext";

export const CitySelector: React.FC = () => {
  const { selectedCity, setSelectedCity, availableCities } = useCity();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-rose-50/80 hover:bg-rose-100/80 border border-rose-200/60 text-xs sm:text-sm font-medium text-stone-800 transition-all shadow-sm"
        aria-label="Select city"
      >
        <MapPin className="w-3.5 h-3.5 text-rose-500 fill-rose-500/20" />
        <span className="font-semibold">{selectedCity}</span>
        <ChevronDown className={`w-3.5 h-3.5 text-stone-500 transition-transform ${isOpen ? "rotate-180" : ""}`} />
      </button>

      {isOpen && (
        <div className="absolute left-0 mt-2 w-64 bg-white rounded-2xl shadow-xl border border-rose-100 p-2 z-50 animate-in fade-in zoom-in-95 duration-150">
          <div className="px-3 py-2 border-b border-rose-50 text-xs font-semibold text-stone-500 uppercase tracking-wider">
            Select Your City (Delhi NCR)
          </div>
          <div className="py-1">
            {availableCities.map((city) => (
              <button
                key={city.id}
                onClick={() => {
                  setSelectedCity(city.name);
                  setIsOpen(false);
                }}
                className={`w-full flex items-center justify-between px-3 py-2 text-sm rounded-xl transition-colors text-left ${
                  selectedCity.toLowerCase() === city.name.toLowerCase()
                    ? "bg-rose-50 text-rose-700 font-semibold"
                    : "text-stone-700 hover:bg-stone-50"
                }`}
              >
                <div className="flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-rose-400" />
                  <span>{city.name}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-normal text-stone-400">
                    {city.deliveryFee === 0 ? "Free Delivery" : `+₹${city.deliveryFee}`}
                  </span>
                  {selectedCity.toLowerCase() === city.name.toLowerCase() && (
                    <Check className="w-4 h-4 text-rose-600" />
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
