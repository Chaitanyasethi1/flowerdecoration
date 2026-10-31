"use client";

import React, { useState, useRef, useEffect } from "react";
import { MapPin, ChevronDown, Check } from "lucide-react";
import { useCity } from "@/context/CityContext";

interface CitySelectorProps {
  compact?: boolean;
}

export const CitySelector: React.FC<CitySelectorProps> = ({ compact = false }) => {
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
        className={`flex items-center gap-1 rounded-full bg-pink-50/90 hover:bg-pink-100/90 border border-pink-200/80 font-bold text-stone-800 transition-all shadow-xs ${
          compact ? "px-2 py-0.5 text-[11px]" : "px-3 py-1.5 text-xs sm:text-sm"
        }`}
        aria-label="Select city"
      >
        <MapPin className={`${compact ? "w-3 h-3" : "w-3.5 h-3.5"} text-pink-600 fill-pink-500/20`} />
        <span className="font-bold text-pink-900">{selectedCity}</span>
        <ChevronDown className={`${compact ? "w-2.5 h-2.5" : "w-3.5 h-3.5"} text-stone-500 transition-transform ${isOpen ? "rotate-180" : ""}`} />
      </button>

      {isOpen && (
        <div className="absolute left-0 mt-2 w-64 bg-white rounded-2xl shadow-xl border border-pink-100 p-2 z-50 animate-in fade-in zoom-in-95 duration-150">
          <div className="px-3 py-2 border-b border-pink-50 text-[11px] font-bold text-pink-700 uppercase tracking-wider">
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
                className={`w-full flex items-center justify-between px-3 py-2 text-xs sm:text-sm rounded-xl transition-colors text-left ${
                  selectedCity.toLowerCase() === city.name.toLowerCase()
                    ? "bg-pink-50 text-pink-700 font-bold"
                    : "text-stone-700 hover:bg-pink-50/40"
                }`}
              >
                <div className="flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-pink-500" />
                  <span>{city.name}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] sm:text-[11px] font-normal text-stone-400">
                    {city.deliveryFee === 0 ? "Free Delivery" : `+₹${city.deliveryFee}`}
                  </span>
                  {selectedCity.toLowerCase() === city.name.toLowerCase() && (
                    <Check className="w-3.5 h-3.5 text-pink-600" />
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
