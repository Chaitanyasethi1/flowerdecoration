"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ChevronDown, HelpCircle, ArrowRight } from "lucide-react";
import { faqsData } from "@/data/faqs";

export const FaqAccordion: React.FC = () => {
  const [openId, setOpenId] = useState<string>(faqsData[0].id);

  const toggle = (id: string) => {
    setOpenId(openId === id ? "" : id);
  };

  return (
    <section className="py-20 bg-white border-b border-rose-50">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-50 text-rose-700 text-xs font-bold uppercase tracking-wider">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Got Questions?</span>
          </div>
          <h2 className="font-serif text-2xl sm:text-4xl font-extrabold text-stone-900 tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-sm text-stone-600">
            Everything you need to know about delivery, cutoff times, freshness, and cancellation policies.
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-3">
          {faqsData.map((faq) => {
            const isOpen = openId === faq.id;
            return (
              <div
                key={faq.id}
                className="rounded-2xl border border-stone-200/80 bg-stone-50/50 overflow-hidden transition-all duration-200"
              >
                <button
                  onClick={() => toggle(faq.id)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 font-semibold text-stone-900 hover:text-rose-600 transition-colors"
                >
                  <span className="text-sm sm:text-base">{faq.question}</span>
                  <div
                    className={`w-7 h-7 rounded-full bg-white shadow-2xs flex items-center justify-center shrink-0 transition-transform duration-200 ${
                      isOpen ? "rotate-180 bg-rose-50 text-rose-600" : "text-stone-500"
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-stone-600 leading-relaxed border-t border-stone-200/50 bg-white">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="mt-8 text-center">
          <Link
            href="/faq"
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-rose-600 hover:text-rose-700"
          >
            <span>Read all 20+ Frequently Asked Questions</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
};
