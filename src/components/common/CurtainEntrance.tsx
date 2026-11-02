"use client";

import React, { useState, useEffect } from "react";

// ====================================================================
// AUTHENTIC SVG FLORAL BLOSSOMS ("PROPER PHOOL")
// ====================================================================

const SakuraBlossom = ({ className = "w-7 h-7" }: { className?: string }) => (
  <svg viewBox="0 0 100 100" className={className} fill="none">
    {[0, 72, 144, 216, 288].map((angle, i) => (
      <path
        key={i}
        d="M50 50 C40 25 32 10 50 3 C68 10 60 25 50 50 Z"
        fill="url(#sakuraGrad)"
        stroke="#f472b6"
        strokeWidth="1.2"
        transform={`rotate(${angle} 50 50)`}
      />
    ))}
    <circle cx="50" cy="50" r="11" fill="#be185d" />
    <circle cx="50" cy="50" r="6" fill="#fde047" />
    {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
      <circle
        key={i}
        cx={50 + 13 * Math.cos((angle * Math.PI) / 180)}
        cy={50 + 13 * Math.sin((angle * Math.PI) / 180)}
        r="2"
        fill="#fbbf24"
      />
    ))}
    <defs>
      <linearGradient id="sakuraGrad" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#ffffff" />
        <stop offset="50%" stopColor="#fbcfe8" />
        <stop offset="100%" stopColor="#f472b6" />
      </linearGradient>
    </defs>
  </svg>
);

const RoseBud = ({ className = "w-7 h-7" }: { className?: string }) => (
  <svg viewBox="0 0 100 100" className={className} fill="none">
    {/* Stem & Leaves */}
    <path d="M50 68 Q44 84 38 96" stroke="#16a34a" strokeWidth="4.5" strokeLinecap="round" />
    <path d="M46 76 Q26 70 28 85 Q40 85 46 76" fill="#22c55e" stroke="#15803d" strokeWidth="1" />
    <path d="M54 82 Q72 76 70 91 Q58 91 54 82" fill="#22c55e" stroke="#15803d" strokeWidth="1" />
    {/* Calyx */}
    <path d="M40 66 C44 74 56 74 60 66 C60 70 40 70 40 66 Z" fill="#15803d" />
    {/* Layered Rose Petals */}
    <path d="M28 44 C22 24 44 14 50 28 C56 14 78 24 72 44 C66 64 34 64 28 44 Z" fill="#e11d48" />
    <path d="M34 38 C30 26 44 20 50 30 C56 20 70 26 66 38 C60 54 40 54 34 38 Z" fill="#be123c" />
    <path d="M40 36 C42 28 50 26 50 32 C50 26 58 28 60 36 C56 44 44 44 40 36 Z" fill="#fda4af" />
    <circle cx="50" cy="33" r="3.5" fill="#fff1f2" />
  </svg>
);

const DaisyBlossom = ({ className = "w-7 h-7" }: { className?: string }) => (
  <svg viewBox="0 0 100 100" className={className} fill="none">
    {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((angle, i) => (
      <ellipse
        key={i}
        cx="50"
        cy="22"
        rx="7.5"
        ry="18"
        fill="#ffffff"
        stroke="#fed7aa"
        strokeWidth="0.8"
        transform={`rotate(${angle} 50 50)`}
      />
    ))}
    <circle cx="50" cy="50" r="14" fill="#f59e0b" stroke="#d97706" strokeWidth="1.5" />
    <circle cx="50" cy="50" r="8" fill="#fbbf24" />
    <circle cx="47" cy="47" r="3" fill="#fffbeb" opacity="0.9" />
  </svg>
);

const PeachBlossom = ({ className = "w-7 h-7" }: { className?: string }) => (
  <svg viewBox="0 0 100 100" className={className} fill="none">
    {[0, 60, 120, 180, 240, 300].map((angle, i) => (
      <path
        key={i}
        d="M50 50 C38 28 34 12 50 6 C66 12 62 28 50 50 Z"
        fill="#fdba74"
        stroke="#ea580c"
        strokeWidth="1"
        transform={`rotate(${angle} 50 50)`}
      />
    ))}
    <circle cx="50" cy="50" r="11" fill="#ea580c" />
    <circle cx="50" cy="50" r="6" fill="#fef08a" />
  </svg>
);

const VioletBlossom = ({ className = "w-7 h-7" }: { className?: string }) => (
  <svg viewBox="0 0 100 100" className={className} fill="none">
    <path d="M50 50 C26 36 20 14 50 4 C80 14 74 36 50 50 Z" fill="#c084fc" stroke="#7e22ce" strokeWidth="1" />
    <path d="M50 50 C14 56 10 76 30 86 C46 80 50 64 50 50 Z" fill="#d8b4fe" stroke="#7e22ce" strokeWidth="1" />
    <path d="M50 50 C86 56 90 76 70 86 C54 80 50 64 50 50 Z" fill="#d8b4fe" stroke="#7e22ce" strokeWidth="1" />
    <circle cx="50" cy="50" r="9" fill="#fae8ff" />
    <circle cx="50" cy="50" r="5" fill="#fde047" />
  </svg>
);

export const CurtainEntrance: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isRemoved, setIsRemoved] = useState(false);

  useEffect(() => {
    // If user reloaded the page in browser, clear previous seen state so they can test/see it again!
    try {
      const perfEntries = window.performance?.getEntriesByType("navigation");
      const navEntry = perfEntries?.[0] as PerformanceNavigationTiming | undefined;
      const isReload = navEntry?.type === "reload" || (window.performance as unknown as { navigation?: { type: number } })?.navigation?.type === 1;
      if (isReload) {
        sessionStorage.removeItem("bloomora_curtain_seen");
      }
    } catch {
      // ignore
    }

    const hasSeen = typeof window !== "undefined" ? sessionStorage.getItem("bloomora_curtain_seen") : null;
    const urlParams = typeof window !== "undefined" ? new URLSearchParams(window.location.search) : null;
    const forceCurtain = urlParams?.has("curtain");

    // Only skip if already seen during this active tab browsing session (without reload)
    if (hasSeen && !forceCurtain) {
      setIsRemoved(true);
      return;
    }

    // Auto-open after 1.5s so the user has time to view the flowers & seal
    const timer = setTimeout(() => {
      handleOpen();
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  const handleOpen = () => {
    if (isOpen) return;
    setIsOpen(true);
    try {
      sessionStorage.setItem("bloomora_curtain_seen", "true");
    } catch {
      // ignore
    }

    // Remove from DOM cleanly after parting completes
    setTimeout(() => {
      setIsRemoved(true);
    }, 1700);
  };

  if (isRemoved) return null;

  // Falling petals when curtains part from the center
  const fallingPetals = [
    { id: 1, component: <SakuraBlossom className="w-8 h-8" />, left: "15%", delay: "0s", dur: "2.3s" },
    { id: 2, component: <RoseBud className="w-7 h-7" />, left: "28%", delay: "0.15s", dur: "2.5s" },
    { id: 3, component: <DaisyBlossom className="w-8 h-8" />, left: "42%", delay: "0.05s", dur: "2.2s" },
    { id: 4, component: <PeachBlossom className="w-7 h-7" />, left: "55%", delay: "0.2s", dur: "2.4s" },
    { id: 5, component: <VioletBlossom className="w-7 h-7" />, left: "68%", delay: "0.1s", dur: "2.6s" },
    { id: 6, component: <SakuraBlossom className="w-9 h-9" />, left: "82%", delay: "0.25s", dur: "2.4s" },
    { id: 7, component: <DaisyBlossom className="w-7 h-7" />, left: "35%", delay: "0.3s", dur: "2.7s" },
    { id: 8, component: <RoseBud className="w-8 h-8" />, left: "62%", delay: "0.18s", dur: "2.3s" },
    { id: 9, component: <PeachBlossom className="w-8 h-8" />, left: "48%", delay: "0.12s", dur: "2.5s" },
    { id: 10, component: <SakuraBlossom className="w-7 h-7" />, left: "22%", delay: "0.35s", dur: "2.6s" },
    { id: 11, component: <VioletBlossom className="w-8 h-8" />, left: "75%", delay: "0.22s", dur: "2.4s" },
  ];

  // Common circular medallion UI rendered inside each half so it splits cleanly down the center
  const renderMedallionContent = () => (
    <div className="relative w-[230px] h-[230px] sm:w-[280px] sm:h-[280px] md:w-[320px] md:h-[320px] rounded-full bg-[#f8e7ed] border-[5px] sm:border-[7px] border-[#c5a059] shadow-[0_20px_50px_rgba(0,0,0,0.5),0_0_30px_rgba(197,160,89,0.4)] flex flex-col items-center justify-center p-3 text-center pointer-events-none select-none">
      {/* Outer subtle concentric gold ring */}
      <div className="absolute inset-2 sm:inset-3 rounded-full border border-[#c5a059]/50 pointer-events-none" />

      {/* Center Seam Hairline */}
      <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-[1.5px] bg-[#7b1842]/20 pointer-events-none" />

      {/* Brand Name - Playfair Serif in Deep Plum */}
      <h1 className="font-serif text-[2.4rem] sm:text-[3.2rem] md:text-[3.8rem] font-bold text-[#7b1842] tracking-tight leading-none drop-shadow-sm">
        Bloomora
      </h1>

      {/* Subtitle - Gold Tracked Uppercase */}
      <p className="text-[11px] sm:text-xs md:text-sm font-bold tracking-[0.28em] text-[#a16207] uppercase mt-2 sm:mt-3">
        FLOWER DECOR
      </p>

      {/* Tap prompt */}
      <div className="mt-3 inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-pink-100 border border-pink-300 text-[10px] sm:text-[11px] font-semibold text-[#831843]">
        <span>Tap to Open</span>
        <span className="text-xs">✨</span>
      </div>
    </div>
  );

  return (
    <div
      onClick={handleOpen}
      className={`fixed inset-0 z-[9999] overflow-hidden select-none cursor-pointer ${
        isOpen ? "pointer-events-none" : "pointer-events-auto"
      }`}
      style={{ touchAction: "manipulation" }}
      aria-label="Welcome to Bloomora - Click to enter"
    >
      {/* ============================================================ */}
      {/* LEFT THEATRICAL CURTAIN PANEL (w-[50vw], left: 0)            */}
      {/* ============================================================ */}
      <div
        className={`absolute top-0 bottom-0 left-0 w-[50.2vw] overflow-hidden origin-left transition-transform duration-[1400ms] ease-[cubic-bezier(0.7,0,0.2,1)] z-20 ${
          isOpen ? "-translate-x-full -skew-y-1" : "translate-x-0"
        }`}
        style={{
          background: `repeating-linear-gradient(
            90deg,
            #6b1236 0px,
            #7b1842 12px,
            #9b2558 24px,
            #be185d 36px,
            #9b2558 48px,
            #7b1842 60px
          )`,
          boxShadow: "inset -15px 0 35px rgba(0, 0, 0, 0.45), 8px 0 25px rgba(0, 0, 0, 0.5)",
        }}
      >
        {/* Velvet sheen gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/45 pointer-events-none" />

        {/* Top Gold Valance / Pelmet (Left Half) */}
        <div className="absolute top-0 left-0 right-0 z-30 pointer-events-none">
          <div className="h-2 w-full bg-gradient-to-r from-[#b45309] via-[#fde047] to-[#d97706] shadow-sm" />
          <div className="flex w-full justify-between overflow-hidden">
            {[...Array(16)].map((_, i) => (
              <div
                key={i}
                className="w-7 h-4 sm:w-10 sm:h-5 bg-gradient-to-b from-[#eab308] via-[#ca8a04] to-[#a16207] rounded-b-full shrink-0 shadow-sm border-b border-amber-200/50"
              />
            ))}
          </div>
        </div>

        {/* Proper Illustrated Flowers on Left Curtain */}
        <div className="absolute top-[10%] left-[22%] filter drop-shadow-md">
          <SakuraBlossom className="w-8 h-8 sm:w-10 sm:h-10" />
        </div>
        <div className="absolute top-[20%] left-[58%] filter drop-shadow-md">
          <RoseBud className="w-7 h-7 sm:w-9 sm:v-9" />
        </div>
        <div className="absolute top-[34%] left-[25%] filter drop-shadow-md">
          <DaisyBlossom className="w-8 h-8 sm:w-10 sm:h-10" />
        </div>
        <div className="absolute top-[48%] left-[62%] filter drop-shadow-md">
          <PeachBlossom className="w-7 h-7 sm:w-9 sm:h-9" />
        </div>
        <div className="absolute top-[66%] left-[28%] filter drop-shadow-md">
          <VioletBlossom className="w-8 h-8 sm:w-10 sm:h-10" />
        </div>
        <div className="absolute top-[80%] left-[52%] filter drop-shadow-md">
          <SakuraBlossom className="w-9 h-9 sm:w-11 sm:h-11" />
        </div>

        {/* ======================================================== */}
        {/* LEFT HALF OF THE SPLIT MEDALLION                         */}
        {/* Positioned at right edge of left curtain (screen center) */}
        {/* ======================================================== */}
        <div className="absolute top-1/2 right-0 -translate-y-1/2 translate-x-1/2 z-30">
          {renderMedallionContent()}
        </div>
      </div>

      {/* ============================================================ */}
      {/* RIGHT THEATRICAL CURTAIN PANEL (w-[50vw], right: 0)          */}
      {/* ============================================================ */}
      <div
        className={`absolute top-0 bottom-0 right-0 w-[50.2vw] overflow-hidden origin-right transition-transform duration-[1400ms] ease-[cubic-bezier(0.7,0,0.2,1)] z-20 ${
          isOpen ? "translate-x-full skew-y-1" : "translate-x-0"
        }`}
        style={{
          background: `repeating-linear-gradient(
            90deg,
            #6b1236 0px,
            #7b1842 12px,
            #9b2558 24px,
            #be185d 36px,
            #9b2558 48px,
            #7b1842 60px
          )`,
          boxShadow: "inset 15px 0 35px rgba(0, 0, 0, 0.45), -8px 0 25px rgba(0, 0, 0, 0.5)",
        }}
      >
        {/* Velvet sheen gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/45 pointer-events-none" />

        {/* Top Gold Valance / Pelmet (Right Half) */}
        <div className="absolute top-0 left-0 right-0 z-30 pointer-events-none">
          <div className="h-2 w-full bg-gradient-to-r from-[#d97706] via-[#fde047] to-[#b45309] shadow-sm" />
          <div className="flex w-full justify-between overflow-hidden">
            {[...Array(16)].map((_, i) => (
              <div
                key={i}
                className="w-7 h-4 sm:w-10 sm:h-5 bg-gradient-to-b from-[#eab308] via-[#ca8a04] to-[#a16207] rounded-b-full shrink-0 shadow-sm border-b border-amber-200/50"
              />
            ))}
          </div>
        </div>

        {/* Proper Illustrated Flowers on Right Curtain */}
        <div className="absolute top-[12%] right-[24%] filter drop-shadow-md">
          <RoseBud className="w-8 h-8 sm:w-10 sm:h-10" />
        </div>
        <div className="absolute top-[22%] right-[60%] filter drop-shadow-md">
          <DaisyBlossom className="w-8 h-8 sm:w-10 sm:h-10" />
        </div>
        <div className="absolute top-[36%] right-[28%] filter drop-shadow-md">
          <SakuraBlossom className="w-8 h-8 sm:w-10 sm:h-10" />
        </div>
        <div className="absolute top-[52%] right-[64%] filter drop-shadow-md">
          <VioletBlossom className="w-7 h-7 sm:w-9 sm:h-9" />
        </div>
        <div className="absolute top-[68%] right-[26%] filter drop-shadow-md">
          <PeachBlossom className="w-8 h-8 sm:w-10 sm:h-10" />
        </div>
        <div className="absolute top-[82%] right-[54%] filter drop-shadow-md">
          <SakuraBlossom className="w-9 h-9 sm:w-11 sm:h-11" />
        </div>

        {/* ======================================================== */}
        {/* RIGHT HALF OF THE SPLIT MEDALLION                        */}
        {/* Positioned at left edge of right curtain (screen center) */}
        {/* ======================================================== */}
        <div className="absolute top-1/2 left-0 -translate-y-1/2 -translate-x-1/2 z-30">
          {renderMedallionContent()}
        </div>
      </div>

      {/* Subtle vertical center seam where curtains meet */}
      <div
        className={`absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-[2px] bg-black/40 z-30 transition-opacity duration-300 ${
          isOpen ? "opacity-0" : "opacity-100"
        }`}
      />

      {/* ============================================================ */}
      {/* SHOWER OF FALLING FLOWERS DURING CENTER REVEAL               */}
      {/* ============================================================ */}
      {isOpen && (
        <div className="absolute inset-0 z-40 pointer-events-none overflow-hidden">
          {fallingPetals.map((petal) => (
            <div
              key={petal.id}
              className="absolute top-0 animate-flower-fall filter drop-shadow-md"
              style={{
                left: petal.left,
                animationDelay: petal.delay,
                animationDuration: petal.dur,
              }}
            >
              {petal.component}
            </div>
          ))}
        </div>
      )}

      {/* Keyframe animation for falling flower graphics */}
      <style jsx global>{`
        @keyframes flowerFall {
          0% {
            transform: translateY(-50px) rotate(0deg) scale(0.8);
            opacity: 1;
          }
          40% {
            transform: translateY(40vh) rotate(140deg) translateX(25px) scale(1.05);
            opacity: 0.95;
          }
          80% {
            transform: translateY(80vh) rotate(280deg) translateX(-20px) scale(0.95);
            opacity: 0.9;
          }
          100% {
            transform: translateY(110vh) rotate(360deg) translateX(15px) scale(0.85);
            opacity: 0;
          }
        }
        .animate-flower-fall {
          animation: flowerFall linear forwards;
        }
      `}</style>
    </div>
  );
};
