"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Sparkles, MessageCircle, ShoppingBag, Phone } from "lucide-react";
import { siteConfig } from "@/config/site";
import { useCart } from "@/context/CartContext";

export const MobileBottomNav: React.FC = () => {
  const pathname = usePathname();
  const { itemsCount, setIsCartOpen } = useCart();

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-xl border-t border-pink-100 px-2 py-1 shadow-[0_-4px_20px_rgba(244,63,94,0.08)]">
      <div className="grid grid-cols-5 items-center justify-items-center">
        {/* 1. Home */}
        <Link
          href="/"
          className={`flex flex-col items-center justify-center py-1 px-2 rounded-xl transition-colors ${
            pathname === "/" ? "text-pink-600 font-bold" : "text-stone-500 hover:text-pink-600"
          }`}
        >
          <Home className="w-4 h-4 mb-0.5" />
          <span className="text-[10px]">Home</span>
        </Link>

        {/* 2. Occasions */}
        <Link
          href="/decorations/all"
          className={`flex flex-col items-center justify-center py-1 px-2 rounded-xl transition-colors ${
            pathname.startsWith("/decorations") ? "text-pink-600 font-bold" : "text-stone-500 hover:text-pink-600"
          }`}
        >
          <Sparkles className="w-4 h-4 mb-0.5" />
          <span className="text-[10px]">Designs</span>
        </Link>

        {/* 3. Center WhatsApp CTA */}
        <a
          href={`https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent(
            "Hi Bloomora Decor, I want to book a flower decoration in Delhi NCR."
          )}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center -mt-3.5"
          aria-label="WhatsApp Bloomora"
        >
          <div className="w-11 h-11 rounded-full bg-gradient-to-tr from-emerald-600 to-emerald-400 text-white flex items-center justify-center shadow-lg shadow-emerald-500/30 border-2 border-white transition-transform active:scale-95">
            <MessageCircle className="w-5 h-5" />
          </div>
          <span className="text-[9px] font-bold text-stone-700 mt-0.5">WhatsApp</span>
        </a>

        {/* 4. Cart */}
        <button
          onClick={() => setIsCartOpen(true)}
          className="relative flex flex-col items-center justify-center py-1 px-2 rounded-xl text-stone-500 hover:text-pink-600 transition-colors"
          aria-label="Open Cart"
        >
          <div className="relative">
            <ShoppingBag className="w-4 h-4 mb-0.5" />
            {itemsCount > 0 && (
              <span className="absolute -top-1.5 -right-2.5 w-4 h-4 bg-pink-600 text-white text-[9px] font-black rounded-full flex items-center justify-center shadow-xs">
                {itemsCount}
              </span>
            )}
          </div>
          <span className="text-[10px]">Cart</span>
        </button>

        {/* 5. Call */}
        <a
          href={`tel:${siteConfig.phone}`}
          className="flex flex-col items-center justify-center py-1 px-2 rounded-xl text-stone-500 hover:text-pink-600 transition-colors"
          aria-label="Call Bloomora"
        >
          <Phone className="w-4 h-4 mb-0.5 text-pink-600" />
          <span className="text-[10px]">Call</span>
        </a>
      </div>
    </div>
  );
};
