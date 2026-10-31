"use client";

import React from "react";
import Link from "next/link";
import { Building2, ArrowRight, ShieldCheck, Sparkles } from "lucide-react";

export const CorporateBanner: React.FC = () => {
  return (
    <section className="py-10 sm:py-14 bg-white">
      <div className="container mx-auto px-4">
        <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden bg-gradient-to-r from-pink-600 via-rose-500 to-pink-600 text-white p-6 sm:p-12 shadow-2xl shadow-pink-500/20 border border-pink-300/40">
          {/* Subtle floral background pattern */}
          <div className="absolute right-0 top-0 bottom-0 w-1/2 opacity-15 bg-[radial-gradient(#ffffff_1.5px,transparent_1.5px)] [background-size:16px_16px] pointer-events-none" />

          <div className="relative z-10 max-w-2xl space-y-3 sm:space-y-4">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 text-white text-[11px] sm:text-xs font-black uppercase tracking-wider backdrop-blur-xs border border-white/30">
              <Building2 className="w-3.5 h-3.5" />
              <span>For Business & Brands</span>
            </div>

            <h2 className="font-serif text-xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
              Corporate Events, Product Launches & Gala Dinners
            </h2>

            <p className="text-xs sm:text-base text-pink-50 leading-relaxed">
              Serving Cyber Hub Gurgaon, Noida IT Parks & Central Delhi embassies.
              We provide executive podium florals, step-and-repeat media photo walls,
              and VIP banquet centerpieces with GST invoicing & priority NDAs.
            </p>

            <div className="pt-1 sm:pt-2 flex flex-wrap items-center gap-3 sm:gap-4 text-[11px] sm:text-xs text-white">
              <div className="flex items-center gap-1.5 bg-white/10 px-2.5 py-1 rounded-full border border-white/20">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-300" />
                <span>GST Invoicing</span>
              </div>
              <div className="flex items-center gap-1.5 bg-white/10 px-2.5 py-1 rounded-full border border-white/20">
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                <span>3D Floral Logos</span>
              </div>
              <div className="flex items-center gap-1.5 bg-white/10 px-2.5 py-1 rounded-full border border-white/20">
                <Building2 className="w-3.5 h-3.5 text-white" />
                <span>Dedicated Manager</span>
              </div>
            </div>

            <div className="pt-2 sm:pt-4 flex flex-col sm:flex-row gap-2.5 sm:gap-3">
              <Link
                href="/corporate"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-white hover:bg-pink-50 text-pink-700 font-extrabold text-xs sm:text-sm transition-all shadow-md active:scale-95"
              >
                <span>Get a Corporate Quote</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/custom-quote"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-white/15 hover:bg-white/25 text-white font-bold text-xs sm:text-sm border border-white/30 backdrop-blur-xs transition-colors"
              >
                <span>Custom Proposal</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
