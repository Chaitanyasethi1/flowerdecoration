"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Share2, Heart, Check, Sparkles } from "lucide-react";
import { Decoration } from "@/types";
import { useCart } from "@/context/CartContext";

interface ProductGalleryProps {
  decoration: Decoration;
}

export const ProductGallery: React.FC<ProductGalleryProps> = ({ decoration }) => {
  const [selectedImg, setSelectedImg] = useState(0);
  const [copied, setCopied] = useState(false);
  const { isInWishlist, toggleWishlist } = useCart();
  const wishlisted = isInWishlist(decoration.slug);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `${decoration.name} | Bloomora Decor`,
        text: `Check out this gorgeous ${decoration.occasion} flower decoration in Delhi NCR!`,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="space-y-4">
      {/* Main Image */}
      <div className="relative h-[340px] sm:h-[480px] w-full rounded-3xl overflow-hidden bg-stone-100 border border-stone-200/80 shadow-md group">
        <Image
          src={decoration.images[selectedImg] || decoration.images[0]}
          alt={decoration.name}
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 55vw"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />

        {/* Action icons */}
        <div className="absolute top-4 right-4 flex items-center gap-2">
          <button
            onClick={handleShare}
            className="w-10 h-10 rounded-full bg-white/90 backdrop-blur-md text-stone-700 hover:text-stone-900 shadow-md flex items-center justify-center transition-transform hover:scale-110"
            aria-label="Share decoration"
          >
            {copied ? <Check className="w-5 h-5 text-emerald-600" /> : <Share2 className="w-5 h-5" />}
          </button>
          <button
            onClick={() => toggleWishlist(decoration.slug)}
            className={`w-10 h-10 rounded-full shadow-md flex items-center justify-center transition-transform hover:scale-110 ${
              wishlisted
                ? "bg-rose-600 text-white"
                : "bg-white/90 backdrop-blur-md text-stone-700 hover:text-rose-600"
            }`}
            aria-label="Save to wishlist"
          >
            <Heart className={`w-5 h-5 ${wishlisted ? "fill-white" : ""}`} />
          </button>
        </div>

        {/* Badge */}
        <div className="absolute top-4 left-4 flex flex-col gap-1.5">
          {decoration.isBestSeller && (
            <span className="px-3 py-1 rounded-full bg-amber-400 text-stone-900 font-extrabold text-xs shadow-md flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Bestseller</span>
            </span>
          )}
          <span className="px-3 py-1 rounded-full bg-stone-900/80 backdrop-blur-xs text-white text-xs font-semibold">
            {decoration.locationType} Setup
          </span>
        </div>
      </div>

      {/* Thumbnails */}
      {decoration.images.length > 1 && (
        <div className="flex items-center gap-3 overflow-x-auto pb-2">
          {decoration.images.map((img, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedImg(idx)}
              className={`relative w-20 h-20 rounded-2xl overflow-hidden shrink-0 border-2 transition-all ${
                selectedImg === idx
                  ? "border-rose-600 shadow-md scale-105"
                  : "border-stone-200 opacity-70 hover:opacity-100"
              }`}
            >
              <Image src={img} alt={`${decoration.name} view ${idx + 1}`} fill className="object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
