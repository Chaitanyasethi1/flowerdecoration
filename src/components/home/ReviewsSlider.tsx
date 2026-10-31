"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Star, ChevronLeft, ChevronRight, Quote, CheckCircle2 } from "lucide-react";
import { reviewsData } from "@/data/reviews";

export const ReviewsSlider: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevReview = () => {
    setCurrentIndex((prev) => (prev - 1 + reviewsData.length) % reviewsData.length);
  };

  const nextReview = () => {
    setCurrentIndex((prev) => (prev + 1) % reviewsData.length);
  };

  const current = reviewsData[currentIndex];

  return (
    <section className="py-20 bg-cream-50/70 border-b border-rose-50 overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-rose-100 text-rose-800 text-xs font-bold uppercase tracking-wider">
            <span>⭐ 4.9 Star Verified Ratings</span>
          </div>
          <h2 className="font-serif text-2xl sm:text-4xl font-extrabold text-stone-900 tracking-tight">
            Loved by 9,500+ Hosts Across Delhi NCR
          </h2>
          <p className="text-sm text-stone-600">
            Real customer stories from Gurgaon, Noida, South Delhi & Faridabad
          </p>
        </div>

        {/* Featured Testimonial Card */}
        <div className="max-w-4xl mx-auto bg-white rounded-3xl p-6 sm:p-10 shadow-xl border border-rose-100 relative">
          <div className="absolute top-6 right-6 text-rose-200 pointer-events-none">
            <Quote className="w-16 h-16 opacity-40" />
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
            {/* Avatar */}
            <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden shrink-0 border-2 border-rose-200 shadow-md">
              <Image
                src={current.userImage || "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80"}
                alt={current.name}
                fill
                className="object-cover"
              />
            </div>

            {/* Content */}
            <div className="flex-1 space-y-3">
              {/* Stars */}
              <div className="flex items-center gap-1">
                {[...Array(current.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-amber-400 fill-amber-400" />
                ))}
                <span className="text-xs font-bold text-stone-800 ml-1.5">
                  5.0 Rating · {current.occasion}
                </span>
              </div>

              <h3 className="font-serif font-bold text-lg sm:text-xl text-stone-900">
                &ldquo;{current.title}&rdquo;
              </h3>

              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed italic">
                &ldquo;{current.comment}&rdquo;
              </p>

              <div className="flex items-center gap-2 pt-2 border-t border-rose-50 text-xs">
                <span className="font-bold text-stone-900">{current.name}</span>
                <span className="text-stone-400">·</span>
                <span className="text-stone-500">{current.location}</span>
                <span className="text-stone-400">·</span>
                <span className="text-emerald-600 flex items-center gap-1 font-semibold">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Verified Booking</span>
                </span>
              </div>
            </div>
          </div>

          {/* Controls */}
          <div className="mt-8 pt-6 border-t border-stone-100 flex items-center justify-between">
            <div className="flex items-center gap-2">
              {reviewsData.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentIndex(i)}
                  className={`h-2 rounded-full transition-all ${
                    currentIndex === i ? "w-8 bg-rose-600" : "w-2 bg-stone-200"
                  }`}
                  aria-label={`Go to review ${i + 1}`}
                />
              ))}
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={prevReview}
                className="w-9 h-9 rounded-full bg-stone-100 hover:bg-rose-50 text-stone-700 hover:text-rose-600 flex items-center justify-center transition-colors border border-stone-200"
                aria-label="Previous review"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={nextReview}
                className="w-9 h-9 rounded-full bg-stone-100 hover:bg-rose-50 text-stone-700 hover:text-rose-600 flex items-center justify-center transition-colors border border-stone-200"
                aria-label="Next review"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
