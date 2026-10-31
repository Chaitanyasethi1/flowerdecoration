"use client";

import React from "react";
import Link from "next/link";
import { Phone, MessageCircle, Sparkles } from "lucide-react";
import { siteConfig } from "@/config/site";

export const MobileBottomNav: React.FC = () => {
  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-lg border-t border-rose-200/80 px-3 py-2 shadow-2xl">
      <div className="grid grid-cols-3 gap-2 items-center">
        {/* Call button */}
        <a
          href={`tel:${siteConfig.phone}`}
          className="flex flex-col items-center justify-center gap-1 py-1.5 px-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 transition-colors"
          aria-label="Call Bloomora"
        >
          <Phone className="w-4 h-4 text-stone-700" />
          <span className="text-[11px] font-bold">Call Now</span>
        </a>

        {/* WhatsApp button */}
        <a
          href={`https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent(
            "Hi Bloomora Decor, I want to book a flower decoration in Delhi NCR."
          )}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center gap-1 py-1.5 px-2 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200/60 transition-colors"
          aria-label="WhatsApp Bloomora"
        >
          <MessageCircle className="w-4 h-4 text-emerald-600" />
          <span className="text-[11px] font-bold">WhatsApp</span>
        </a>

        {/* Book Now button */}
        <Link
          href="/decorations/all"
          className="flex flex-col items-center justify-center gap-1 py-1.5 px-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold transition-all shadow-md active:scale-95"
          aria-label="Book flower decoration"
        >
          <Sparkles className="w-4 h-4 text-amber-300" />
          <span className="text-[11px]">Book Now</span>
        </Link>
      </div>
    </div>
  );
};
