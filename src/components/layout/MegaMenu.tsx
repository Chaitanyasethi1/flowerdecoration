"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronDown, ArrowRight, Sparkles } from "lucide-react";
import { occasionsData } from "@/data/occasions";

export const MegaMenu: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [hoveredOccasion, setHoveredOccasion] = useState(occasionsData[0]);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        onMouseEnter={() => setIsOpen(true)}
        className="flex items-center gap-1.5 px-3 py-2 text-sm font-semibold text-stone-800 hover:text-rose-600 transition-colors rounded-lg group"
      >
        <span>Occasions</span>
        <ChevronDown
          className={`w-4 h-4 text-stone-500 transition-transform duration-200 group-hover:text-rose-600 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {isOpen && (
        <div
          onMouseLeave={() => setIsOpen(false)}
          className="absolute left-0 mt-1 w-[90vw] max-w-4xl bg-white rounded-3xl shadow-2xl border border-rose-100 p-6 z-50 animate-in fade-in-50 zoom-in-95 duration-200"
        >
          <div className="flex items-center justify-between pb-4 mb-4 border-b border-rose-100/70">
            <div>
              <h3 className="font-serif text-lg font-bold text-stone-900">
                15 Celebration Occasions
              </h3>
              <p className="text-xs text-stone-500">
                Handcrafted floral concepts, customized props & same-day delivery
              </p>
            </div>
            <Link
              href="/decorations/all"
              onClick={() => setIsOpen(false)}
              className="text-xs font-semibold text-rose-600 hover:text-rose-700 flex items-center gap-1"
            >
              <span>Explore All 40+ Designs</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Occasion items - 2 columns */}
            <div className="md:col-span-2 grid grid-cols-2 sm:grid-cols-3 gap-2">
              {occasionsData.map((occ) => (
                <Link
                  key={occ.id}
                  href={`/decorations/${occ.slug}`}
                  onClick={() => setIsOpen(false)}
                  onMouseEnter={() => setHoveredOccasion(occ)}
                  className={`flex items-center gap-2.5 p-2 rounded-xl transition-all ${
                    hoveredOccasion.id === occ.id
                      ? "bg-rose-50 text-rose-700 font-semibold shadow-xs"
                      : "text-stone-700 hover:bg-stone-50"
                  }`}
                >
                  <span className="text-xl shrink-0 p-1 bg-white rounded-lg shadow-xs">
                    {occ.emoji}
                  </span>
                  <div className="truncate">
                    <p className="text-xs sm:text-sm font-medium truncate">
                      {occ.name}
                    </p>
                    <p className="text-[10px] text-stone-400">
                      {occ.itemCount} designs
                    </p>
                  </div>
                </Link>
              ))}
            </div>

            {/* Preview Card */}
            <div className="hidden md:block bg-stone-50 rounded-2xl p-4 border border-rose-100/60 relative overflow-hidden group">
              <div className="relative h-44 w-full rounded-xl overflow-hidden mb-3">
                <Image
                  src={hoveredOccasion.image}
                  alt={hoveredOccasion.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-2 left-2 right-2 text-white">
                  <div className="flex items-center gap-1 text-[11px] font-semibold text-amber-300">
                    <Sparkles className="w-3 h-3" />
                    <span>Popular in Delhi NCR</span>
                  </div>
                  <h4 className="font-serif font-bold text-sm">
                    {hoveredOccasion.emoji} {hoveredOccasion.name}
                  </h4>
                </div>
              </div>
              <p className="text-xs text-stone-600 line-clamp-2 mb-3">
                {hoveredOccasion.shortDesc}
              </p>
              <Link
                href={`/decorations/${hoveredOccasion.slug}`}
                onClick={() => setIsOpen(false)}
                className="w-full inline-flex items-center justify-center gap-1.5 py-2 px-3 text-xs font-semibold text-white bg-rose-600 hover:bg-rose-700 rounded-xl transition-colors shadow-sm"
              >
                <span>Browse {hoveredOccasion.name}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
