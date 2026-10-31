"use client";

import React, { useState } from "react";
import Link from "next/link";
import { X, Sparkles, Tag, Clock, PhoneCall } from "lucide-react";
import { siteConfig } from "@/config/site";
import { useAdmin } from "@/context/AdminContext";

export const AnnouncementBar: React.FC = () => {
  const [dismissed, setDismissed] = useState(false);
  const { announcementText } = useAdmin();

  if (dismissed || !siteConfig.announcement.enabled) return null;

  const messages = [
    {
      icon: <Sparkles className="w-3.5 h-3.5 text-amber-300" />,
      text: announcementText || siteConfig.announcement.text,
      linkText: "Claim 10% Off",
      href: "/offers",
    },
    {
      icon: <Clock className="w-3.5 h-3.5 text-rose-300" />,
      text: "⚡ Same-Day Decoration Setup available across Delhi, Gurgaon, Noida & Faridabad (Book before 4 PM)",
      linkText: "Book Today",
      href: "/decorations/all",
    },
    {
      icon: <Tag className="w-3.5 h-3.5 text-emerald-300" />,
      text: "🎉 Flat ₹500 OFF on Orders above ₹2,999 — Use Code: WELCOME500",
      linkText: "Apply Code",
      href: "/offers",
    },
    {
      icon: <PhoneCall className="w-3.5 h-3.5 text-amber-300" />,
      text: `💐 Direct Florist WhatsApp Hotline: +91 ${siteConfig.phone} · Instant Booking Support`,
      linkText: "Chat Now",
      href: `https://wa.me/${siteConfig.whatsapp}?text=Hi%20Bloomora,%20I%20need%20flower%20decoration`,
    },
  ];

  return (
    <div className="relative bg-gradient-to-r from-rose-950 via-rose-900 to-stone-950 text-rose-50 text-xs sm:text-sm py-2 overflow-hidden z-50 border-b border-rose-800/40 select-none">
      {/* Infinite Marquee Strip */}
      <div className="overflow-hidden flex items-center">
        <div className="animate-marquee flex items-center gap-10 whitespace-nowrap">
          {/* First set */}
          {messages.map((item, idx) => (
            <div key={`msg-1-${idx}`} className="inline-flex items-center gap-2.5 font-medium px-4">
              {item.icon}
              <span className="tracking-wide">{item.text}</span>
              <Link
                href={item.href}
                className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-amber-400/20 text-amber-300 hover:bg-amber-400 hover:text-stone-900 font-semibold text-[11px] transition-colors border border-amber-400/30 ml-1"
              >
                {item.linkText} →
              </Link>
            </div>
          ))}

          {/* Duplicate set for seamless continuous infinite rotation */}
          {messages.map((item, idx) => (
            <div key={`msg-2-${idx}`} className="inline-flex items-center gap-2.5 font-medium px-4">
              {item.icon}
              <span className="tracking-wide">{item.text}</span>
              <Link
                href={item.href}
                className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-amber-400/20 text-amber-300 hover:bg-amber-400 hover:text-stone-900 font-semibold text-[11px] transition-colors border border-amber-400/30 ml-1"
              >
                {item.linkText} →
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/* Dismiss Button */}
      <div className="absolute right-2 top-1/2 -translate-y-1/2 pl-6 bg-gradient-to-l from-rose-950 via-rose-950/90 to-transparent flex items-center">
        <button
          onClick={() => setDismissed(true)}
          className="text-rose-300 hover:text-white p-1 rounded-full hover:bg-white/10 transition-colors"
          aria-label="Dismiss announcement"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};

