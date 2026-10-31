"use client";

import React from "react";
import Image from "next/image";
import { MessageCircle, Sparkles } from "lucide-react";
import { bouquetsData } from "@/data/bouquets";
import { siteConfig } from "@/config/site";

export const BouquetsSection: React.FC = () => {
  return (
    <section className="py-16 bg-white border-b border-rose-50">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-50 text-rose-700 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-rose-500" />
            <span>Farm Harvested Daily</span>
          </div>
          <h2 className="font-serif text-2xl sm:text-4xl font-extrabold text-stone-900 tracking-tight">
            Flower Bouquets (Fresh Daily)
          </h2>
          <p className="text-sm text-stone-600">
            Hand-tied luxury stems wrapped in premium matte parchment with silk ribbons. Express 2-hour delivery across Delhi NCR.
          </p>
        </div>

        {/* 4 Bouquets Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {bouquetsData.map((bouquet) => (
            <div
              key={bouquet.id}
              className="group rounded-3xl overflow-hidden bg-stone-50 border border-stone-200/70 hover:border-rose-300 hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
            >
              <div className="relative h-64 w-full overflow-hidden bg-stone-100">
                <Image
                  src={bouquet.image}
                  alt={bouquet.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-xs text-rose-700 text-[11px] font-bold px-2.5 py-1 rounded-full shadow-xs">
                  {bouquet.tag}
                </div>
              </div>

              <div className="p-5 space-y-3">
                <div>
                  <h3 className="font-serif font-bold text-lg text-stone-900 group-hover:text-rose-600 transition-colors">
                    {bouquet.name}
                  </h3>
                  <p className="text-xs text-stone-500 mt-0.5">
                    {bouquet.stems}
                  </p>
                </div>

                <div className="pt-2 border-t border-stone-200/70 flex items-center justify-between">
                  <div>
                    <span className="font-serif text-xl font-extrabold text-stone-900">
                      ₹{bouquet.price.toLocaleString()}
                    </span>
                    <span className="text-xs text-stone-400 line-through ml-1.5">
                      ₹{bouquet.originalPrice.toLocaleString()}
                    </span>
                  </div>

                  <a
                    href={`https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent(
                      `Hi Bloomora, I want to order the fresh bouquet '${bouquet.name}' for ₹${bouquet.price}.`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs transition-colors shadow-xs"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    <span>Order Now</span>
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
