"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ChevronDown, HelpCircle, MessageCircle, ArrowRight } from "lucide-react";
import { faqsData } from "@/data/faqs";
import { siteConfig } from "@/config/site";

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <div className="py-12 bg-cream-50/40 min-h-screen">
      <div className="container mx-auto px-4 max-w-4xl space-y-10">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-100 text-rose-800 text-xs font-bold uppercase tracking-wider">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Support & Guidance</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl font-extrabold text-stone-900 tracking-tight">
            Frequently Asked Questions
          </h1>
          <p className="text-sm text-stone-600">
            Learn about our same-day cutoff times, Ghazipur fresh flower sourcing, 30% advance confirmation, and free cancellation policy.
          </p>
        </div>

        <div className="space-y-3">
          {faqsData.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={faq.id}
                className="bg-white rounded-2xl border border-stone-200/80 shadow-2xs overflow-hidden transition-all"
              >
                <button
                  onClick={() => toggle(idx)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 font-semibold text-stone-900 hover:text-rose-600 transition-colors"
                >
                  <span className="text-sm sm:text-base font-bold">{faq.question}</span>
                  <div
                    className={`w-7 h-7 rounded-full bg-stone-100 flex items-center justify-center shrink-0 transition-transform ${
                      isOpen ? "rotate-180 bg-rose-50 text-rose-600" : "text-stone-500"
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 text-xs sm:text-sm text-stone-600 leading-relaxed border-t border-stone-100 bg-stone-50/30">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* WhatsApp Help Card */}
        <div className="p-8 rounded-3xl bg-gradient-to-r from-emerald-700 to-emerald-900 text-white flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="space-y-1 text-center sm:text-left">
            <h3 className="font-serif text-xl font-bold">Have a unique question?</h3>
            <p className="text-xs text-emerald-100">
              Our floral support desk replies on WhatsApp in under 2 minutes.
            </p>
          </div>
          <a
            href={`https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent(
              "Hi Bloomora, I have a question regarding decoration booking."
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 bg-white text-emerald-900 hover:bg-emerald-50 rounded-2xl font-bold text-xs sm:text-sm flex items-center gap-2 shrink-0 transition-colors shadow-sm"
          >
            <MessageCircle className="w-4 h-4 text-emerald-600" />
            <span>Chat on WhatsApp</span>
          </a>
        </div>
      </div>
    </div>
  );
}
