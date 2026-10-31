import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Building2, ShieldCheck, Sparkles, ArrowRight, CheckCircle2, Phone, Mail } from "lucide-react";
import { siteConfig } from "@/config/site";
import { decorationsData } from "@/data/decorations";
import { DecorationCard } from "@/components/common/DecorationCard";

export const metadata = {
  title: "Corporate Floral Decoration & Event Styling Delhi NCR | Bloomora",
  description:
    "Executive floral decor for annual galas, brand launches, townhalls, and VIP conferences in Gurgaon Cyber City, Noida & Central Delhi.",
};

export default function CorporatePage() {
  const corporateItems = decorationsData.filter((d) => d.occasionSlug === "corporate");

  return (
    <div className="py-12 bg-cream-50/40 min-h-screen">
      <div className="container mx-auto px-4 max-w-7xl space-y-16">
        {/* Hero Banner */}
        <div className="p-8 sm:p-14 rounded-3xl bg-gradient-to-r from-stone-900 via-stone-850 to-stone-900 text-white relative overflow-hidden shadow-2xl">
          <div className="max-w-2xl space-y-4 relative z-10">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-300 bg-white/10 px-3 py-1 rounded-full">
              Enterprise Event Styling
            </span>
            <h1 className="font-serif text-3xl sm:text-5xl font-extrabold tracking-tight leading-tight">
              Corporate Events, Stage Florals & Brand Launches
            </h1>
            <p className="text-sm sm:text-base text-stone-300 leading-relaxed">
              We design brand-aligned botanical installations for Fortune 500 summits, Cyber City gala dinners, and embassy receptions across Delhi NCR.
            </p>
            <div className="pt-2 flex flex-wrap gap-3 text-xs">
              <span className="flex items-center gap-1.5 text-emerald-400">
                <CheckCircle2 className="w-4 h-4" />
                <span>GST Compliant Billing</span>
              </span>
              <span className="flex items-center gap-1.5 text-amber-300">
                <CheckCircle2 className="w-4 h-4" />
                <span>Non-Disclosure Agreements (NDA)</span>
              </span>
              <span className="flex items-center gap-1.5 text-rose-300">
                <CheckCircle2 className="w-4 h-4" />
                <span>Dedicated On-Site Lead</span>
              </span>
            </div>
            <div className="pt-4 flex flex-col sm:flex-row gap-3">
              <Link
                href="/custom-quote"
                className="px-6 py-3 rounded-2xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-sm shadow-md transition-all text-center"
              >
                Request Corporate Proposal
              </Link>
              <a
                href={`tel:${siteConfig.phone}`}
                className="px-6 py-3 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-semibold text-sm border border-white/20 transition-colors text-center"
              >
                Call Account Manager
              </a>
            </div>
          </div>
        </div>

        {/* Corporate Setups Catalogue */}
        <div className="space-y-6">
          <div>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900">
              Corporate Stage & Photo Wall Concepts
            </h2>
            <p className="text-xs sm:text-sm text-stone-500">
              Fixed-price packages with same-day setup for Delhi, Gurgaon, and Noida venues
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {corporateItems.map((item) => (
              <DecorationCard key={item.id} decoration={item} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
