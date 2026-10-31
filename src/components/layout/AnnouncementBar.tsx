"use client";

import React from "react";
import Link from "next/link";
import { Sparkles, Tag, Clock, PhoneCall } from "lucide-react";
import { siteConfig } from "@/config/site";
import { useAdmin } from "@/context/AdminContext";

export const AnnouncementBar: React.FC = () => {
  const { announcementText } = useAdmin();

  if (!siteConfig.announcement.enabled) return null;

  const messages = [
    {
      badge: "🔥 DIWALI SPECIAL",
      text: announcementText || siteConfig.announcement.text,
      linkText: "Claim 10% Off",
      href: "/offers",
      badgeClass: "bg-amber-400 text-stone-900",
    },
    {
      badge: "⚡ SAME-DAY SETUP",
      text: "Delhi NCR Same-Day Decoration Delivery across Delhi, Noida, Gurgaon & Ghaziabad (Order before 4 PM)",
      linkText: "Book Today",
      href: "/decorations/all",
      badgeClass: "bg-white text-rose-800",
    },
    {
      badge: "🎉 FLAT ₹500 OFF",
      text: "Use Promo Code: WELCOME500 on all floral bookings above ₹2,999",
      linkText: "Apply Code",
      href: "/offers",
      badgeClass: "bg-emerald-400 text-stone-900",
    },
    {
      badge: "💐 24/7 HELPLINE",
      text: `Direct Florist WhatsApp Support: +91 ${siteConfig.phone} · Custom Themes & Stage Quotes`,
      linkText: "WhatsApp Now",
      href: `https://wa.me/${siteConfig.whatsapp}?text=Hi%20Bloomora%20Decor,%20I%20want%20to%20book%20flower%20decoration`,
      badgeClass: "bg-emerald-300 text-emerald-950",
    },
  ];

  return (
    <div className="bg-gradient-to-r from-rose-800 via-rose-700 to-rose-800 text-white text-xs sm:text-sm py-2 overflow-hidden shadow-inner border-b border-rose-900/30 select-none">
      {/* Infinite Marquee Strip */}
      <div className="overflow-hidden flex items-center">
        <div className="animate-marquee flex items-center gap-8 sm:gap-12 whitespace-nowrap">
          {/* First set */}
          {messages.map((item, idx) => (
            <div key={`ticker-1-${idx}`} className="inline-flex items-center gap-2.5 font-medium px-2">
              <span className={`text-[10px] font-black px-2 py-0.5 rounded-full uppercase tracking-wider shadow-2xs ${item.badgeClass}`}>
                {item.badge}
              </span>
              <span className="text-rose-50 font-semibold tracking-wide text-xs sm:text-[13px]">
                {item.text}
              </span>
              <Link
                href={item.href}
                className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-white/20 hover:bg-white text-white hover:text-rose-700 font-bold text-[11px] transition-all border border-white/30 ml-1"
              >
                <span>{item.linkText}</span>
                <span>→</span>
              </Link>
            </div>
          ))}

          {/* Duplicate set for seamless continuous infinite rotation ("gol gol ghumta rhe na") */}
          {messages.map((item, idx) => (
            <div key={`ticker-2-${idx}`} className="inline-flex items-center gap-2.5 font-medium px-2">
              <span className={`text-[10px] font-black px-2 py-0.5 rounded-full uppercase tracking-wider shadow-2xs ${item.badgeClass}`}>
                {item.badge}
              </span>
              <span className="text-rose-50 font-semibold tracking-wide text-xs sm:text-[13px]">
                {item.text}
              </span>
              <Link
                href={item.href}
                className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-white/20 hover:bg-white text-white hover:text-rose-700 font-bold text-[11px] transition-all border border-white/30 ml-1"
              >
                <span>{item.linkText}</span>
                <span>→</span>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

