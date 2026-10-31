"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Sparkles, Tag, Copy, Check, ArrowRight, ShieldCheck } from "lucide-react";
import { couponsData } from "@/data/coupons";
import { siteConfig } from "@/config/site";

export default function OffersPage() {
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const handleCopy = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  return (
    <div className="py-12 bg-cream-50/40 min-h-screen">
      <div className="container mx-auto px-4 max-w-5xl space-y-10">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            <span>Festive Celebration Deals</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl font-extrabold text-stone-900 tracking-tight">
            Bloomora Special Offers
          </h1>
          <p className="text-sm text-stone-600">
            Copy active promo codes below and paste during checkout to unlock instant discounts.
          </p>
        </div>

        {/* Primary Festive Banner */}
        <div className="rounded-3xl p-8 sm:p-12 bg-gradient-to-r from-rose-900 via-rose-800 to-stone-900 text-white relative overflow-hidden shadow-xl">
          <div className="max-w-xl space-y-4 relative z-10">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-300 bg-white/10 px-3 py-1 rounded-full">
              Diwali & Wedding Season Special
            </span>
            <h2 className="font-serif text-2xl sm:text-4xl font-extrabold leading-tight">
              Flat 10% Off on All Home & Venue Setups
            </h2>
            <p className="text-xs sm:text-sm text-rose-100">
              Valid on all fresh flower backdrops, marigold mandaps, and birthday ring arches across Delhi NCR.
            </p>
            <div className="pt-2 flex items-center gap-3">
              <button
                onClick={() => handleCopy("BLOOM10")}
                className="px-5 py-3 rounded-2xl bg-amber-400 hover:bg-amber-300 text-stone-950 font-bold text-xs sm:text-sm flex items-center gap-2 transition-all shadow-md"
              >
                {copiedCode === "BLOOM10" ? <Check className="w-4 h-4 text-emerald-950" /> : <Copy className="w-4 h-4" />}
                <span>{copiedCode === "BLOOM10" ? "Code Copied!" : "Copy Code: BLOOM10"}</span>
              </button>
              <Link
                href="/decorations/all"
                className="text-xs font-bold text-white hover:underline flex items-center gap-1"
              >
                <span>Browse Eligible Designs</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>

        {/* Active Coupons Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {couponsData.map((coupon) => (
            <div
              key={coupon.code}
              className="p-6 rounded-3xl bg-white border border-rose-100 shadow-xs hover:shadow-xl transition-all flex flex-col justify-between space-y-4 relative overflow-hidden"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-serif text-2xl font-extrabold text-stone-900">
                    {coupon.discountPercent}% OFF
                  </span>
                  <Tag className="w-4 h-4 text-rose-500" />
                </div>
                <div className="p-2.5 rounded-xl bg-stone-50 border border-dashed border-rose-300 font-mono text-sm font-extrabold text-rose-700 text-center tracking-widest">
                  {coupon.code}
                </div>
                <p className="text-xs text-stone-600 leading-relaxed pt-1">
                  {coupon.description}
                </p>
              </div>

              <div className="pt-3 border-t border-stone-100 flex items-center justify-between">
                <span className="text-[11px] text-stone-400">
                  Valid till {coupon.validTill}
                </span>
                <button
                  onClick={() => handleCopy(coupon.code)}
                  className="px-3.5 py-1.5 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 text-xs font-bold transition-colors"
                >
                  {copiedCode === coupon.code ? "Copied ✓" : "Copy"}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
