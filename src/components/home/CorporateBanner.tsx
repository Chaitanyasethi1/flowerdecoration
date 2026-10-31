"use client";

import React from "react";
import Link from "next/link";
import { Building2, ArrowRight, ShieldCheck, Sparkles } from "lucide-react";

export const CorporateBanner: React.FC = () => {
  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-stone-900 via-stone-850 to-stone-900 text-white p-8 sm:p-12 shadow-2xl border border-stone-800">
          {/* Subtle floral background pattern */}
          <div className="absolute right-0 top-0 bottom-0 w-1/2 opacity-10 bg-[radial-gradient(#eb5667_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />

          <div className="relative z-10 max-w-2xl space-y-4">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-amber-300 text-xs font-bold uppercase tracking-wider">
              <Building2 className="w-3.5 h-3.5" />
              <span>For Business & Brands</span>
            </div>

            <h2 className="font-serif text-2xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
              Corporate Events, Product Launches & Gala Dinners
            </h2>

            <p className="text-sm sm:text-base text-stone-300 leading-relaxed">
              Serving Cyber Hub Gurgaon, Noida IT Parks & Central Delhi embassies.
              We provide executive podium florals, step-and-repeat media photo walls,
              and VIP banquet centerpieces with GST invoicing & priority NDAs.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-4 text-xs text-stone-300">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>GST Invoicing</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span>Brand 3D Floral Logos</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Building2 className="w-4 h-4 text-rose-400" />
                <span>Dedicated Event Manager</span>
              </div>
            </div>

            <div className="pt-4 flex flex-col sm:flex-row gap-3">
              <Link
                href="/corporate"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-sm transition-all shadow-md"
              >
                <span>Get a Corporate Quote</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/custom-quote"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-sm border border-white/20 transition-colors"
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
