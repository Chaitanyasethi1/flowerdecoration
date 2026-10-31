import React from "react";
import Link from "next/link";
import { Sparkles, Heart, ArrowRight, CheckCircle2, Phone } from "lucide-react";
import { decorationsData } from "@/data/decorations";
import { DecorationCard } from "@/components/common/DecorationCard";
import { siteConfig } from "@/config/site";

export const metadata = {
  title: "Royal Wedding Flower Decoration Delhi NCR | Bloomora",
  description:
    "Luxury Vedic wedding mandaps, entrance floral passages, haldi jhoola setups & sangeet stages in Chattarpur, Gurgaon & Noida farmhouses.",
};

export default function WeddingPage() {
  const weddingItems = decorationsData.filter(
    (d) => d.occasionSlug === "wedding" || d.occasionSlug === "haldi-mehndi"
  );

  return (
    <div className="py-12 bg-cream-50/40 min-h-screen">
      <div className="container mx-auto px-4 max-w-7xl space-y-16">
        {/* Banner */}
        <div className="p-8 sm:p-14 rounded-3xl bg-gradient-to-r from-rose-950 via-rose-900 to-amber-950 text-white relative overflow-hidden shadow-2xl">
          <div className="max-w-2xl space-y-4 relative z-10">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-300 bg-white/10 px-3 py-1 rounded-full">
              Delhi NCR Wedding Atelier
            </span>
            <h1 className="font-serif text-3xl sm:text-5xl font-extrabold tracking-tight leading-tight">
              Royal Wedding Mandaps & Grand Floral Stages
            </h1>
            <p className="text-sm sm:text-base text-rose-100 leading-relaxed">
              From auspicious marigold mandaps with fragrant rajnigandha canopies to ethereal pastel English garden bridal stages in Chattarpur and Gurgaon farmhouses.
            </p>
            <div className="pt-4 flex flex-col sm:flex-row gap-3">
              <Link
                href="/custom-quote"
                className="px-6 py-3 rounded-2xl bg-amber-400 hover:bg-amber-300 text-stone-950 font-bold text-sm shadow-md transition-all text-center"
              >
                Book Wedding Consultation
              </Link>
              <a
                href={`https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent(
                  "Hi Bloomora, I want to consult for my upcoming wedding decor in Delhi NCR."
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-semibold text-sm border border-white/20 transition-colors text-center"
              >
                WhatsApp Wedding Specialist
              </a>
            </div>
          </div>
        </div>

        {/* Wedding Designs */}
        <div className="space-y-6">
          <div>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900">
              Wedding, Mandap & Haldi Setups
            </h2>
            <p className="text-xs sm:text-sm text-stone-500">
              Handcrafted with pure fresh blossoms from Ghazipur mandi
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {weddingItems.map((item) => (
              <DecorationCard key={item.id} decoration={item} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
