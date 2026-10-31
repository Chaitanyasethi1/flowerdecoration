"use client";

import React from "react";
import Image from "next/image";
import { MessageCircle, Sparkles } from "lucide-react";
import { bouquetsData } from "@/data/bouquets";
import { siteConfig } from "@/config/site";

export const BouquetsSection: React.FC = () => {
  return (
    <section className="py-12 sm:py-16 bg-white border-b border-pink-100/70">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12 space-y-2 sm:space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pink-50 border border-pink-200/60 text-pink-700 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-pink-500" />
            <span>Farm Harvested Daily</span>
          </div>
          <h2 className="font-serif text-2xl sm:text-4xl font-extrabold text-stone-900 tracking-tight">
            Flower Bouquets (Fresh Daily)
          </h2>
          <p className="text-xs sm:text-sm text-stone-600">
            Hand-tied luxury stems wrapped in premium matte parchment with silk ribbons. Express 2-hour delivery across Delhi NCR.
          </p>
        </div>

        {/* 4 Bouquets Grid - 2 columns on mobile */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
          {bouquetsData.map((bouquet) => (
            <div
              key={bouquet.id}
              className="group rounded-2xl sm:rounded-3xl overflow-hidden bg-white border border-pink-100/90 hover:border-pink-300 hover:shadow-xl hover:shadow-pink-500/10 transition-all duration-300 flex flex-col justify-between"
            >
              <div className="relative h-40 sm:h-64 w-full overflow-hidden bg-pink-50/50">
                <Image
                  src={bouquet.image}
                  alt={bouquet.name}
                  fill
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-2 left-2 sm:top-3 sm:left-3 bg-white/95 backdrop-blur-xs text-pink-700 text-[9px] sm:text-[11px] font-black px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full shadow-xs border border-pink-100">
                  {bouquet.tag}
                </div>
              </div>

              <div className="p-3 sm:p-5 space-y-2 sm:space-y-3">
                <div>
                  <h3 className="font-serif font-bold text-xs sm:text-lg text-stone-900 group-hover:text-pink-600 transition-colors line-clamp-1">
                    {bouquet.name}
                  </h3>
                  <p className="text-[10px] sm:text-xs text-stone-500 mt-0.5 truncate">
                    {bouquet.stems}
                  </p>
                </div>

                <div className="pt-2 border-t border-pink-100/70 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <span className="font-serif text-sm sm:text-xl font-extrabold text-stone-900">
                      ₹{bouquet.price.toLocaleString()}
                    </span>
                    <span className="text-[10px] sm:text-xs text-stone-400 line-through ml-1">
                      ₹{bouquet.originalPrice.toLocaleString()}
                    </span>
                  </div>

                  <a
                    href={`https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent(
                      `Hi Bloomora, I want to order the fresh bouquet '${bouquet.name}' for ₹${bouquet.price}.`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-1 px-2.5 py-1.5 sm:px-3.5 sm:py-2 rounded-lg sm:rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-bold text-[11px] sm:text-xs transition-all shadow-xs"
                  >
                    <MessageCircle className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                    <span>Order</span>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
