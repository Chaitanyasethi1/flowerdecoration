"use client";

import React, { useState, useEffect } from "react";

export const CurtainEntrance: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isRemoved, setIsRemoved] = useState(false);

  useEffect(() => {
    // Check if curtain was already seen in this session (unless ?curtain=1 is in URL for testing)
    const urlParams = typeof window !== "undefined" ? new URLSearchParams(window.location.search) : null;
    const forceCurtain = urlParams?.has("curtain");

    if (!forceCurtain) {
      try {
        const hasSeen = sessionStorage.getItem("bloomora_curtain_seen");
        if (hasSeen) {
          setIsRemoved(true);
          return;
        }
      } catch {
        // ignore
      }
    }

    // Auto open after a gentle delay so the user appreciates the royal seal
    const timer = setTimeout(() => {
      handleOpen();
    }, 1200);

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

    // Unmount completely from DOM after animation completes
    setTimeout(() => {
      setIsRemoved(true);
    }, 1600);
  };

  if (isRemoved) return null;

  // Floating petals drifting during the grand reveal
  const fallingPetals = [
    { id: 1, char: "🌸", left: "10%", delay: "0s", dur: "2.2s", size: "text-2xl" },
    { id: 2, char: "🌹", left: "22%", delay: "0.15s", dur: "2.4s", size: "text-xl" },
    { id: 3, char: "🌸", left: "35%", delay: "0.05s", dur: "2.1s", size: "text-2xl" },
    { id: 4, char: "🌺", left: "48%", delay: "0.2s", dur: "2.5s", size: "text-xl" },
    { id: 5, char: "🌼", left: "60%", delay: "0.1s", dur: "2.3s", size: "text-lg" },
    { id: 6, char: "🌸", left: "72%", delay: "0.25s", dur: "2.6s", size: "text-2xl" },
    { id: 7, char: "🌹", left: "85%", delay: "0.12s", dur: "2.4s", size: "text-xl" },
    { id: 8, char: "🪷", left: "18%", delay: "0.3s", dur: "2.5s", size: "text-2xl" },
    { id: 9, char: "🌸", left: "42%", delay: "0.18s", dur: "2.2s", size: "text-3xl" },
    { id: 10, char: "🌺", left: "55%", delay: "0.28s", dur: "2.7s", size: "text-xl" },
    { id: 11, char: "🌸", left: "80%", delay: "0.22s", dur: "2.3s", size: "text-2xl" },
    { id: 12, char: "🌼", left: "28%", delay: "0.35s", dur: "2.4s", size: "text-lg" },
  ];

  return (
    <div
      onClick={handleOpen}
      className={`fixed inset-0 z-[9999] overflow-hidden select-none cursor-pointer transition-opacity duration-300 ${
        isOpen ? "pointer-events-none" : "pointer-events-auto"
      }`}
      style={{ touchAction: "manipulation" }}
      aria-label="Bloomora Royal Entrance"
    >
      {/* ============================================================ */}
      {/* TOP SCALLOPED GOLD PELMET / VALANCE                          */}
      {/* ============================================================ */}
      <div className="absolute top-0 left-0 right-0 z-40 pointer-events-none">
        {/* Scalloped edge repeating circles */}
        <div className="w-full flex justify-between overflow-hidden">
          {[...Array(30)].map((_, i) => (
            <div
              key={i}
              className="w-7 h-3.5 sm:w-10 sm:h-5 bg-gradient-to-b from-[#eab308] via-[#ca8a04] to-[#a16207] rounded-b-full shrink-0 shadow-sm border-b border-amber-200/50"
            />
          ))}
        </div>
        {/* Continuous gold trim banner with shine */}
        <div className="h-2 w-full bg-gradient-to-r from-[#d97706] via-[#fde047] to-[#b45309] shadow-md relative">
          <div className="absolute inset-0 bg-white/20 animate-pulse" />
        </div>
      </div>

      {/* ============================================================ */}
      {/* LEFT THEATRICAL CURTAIN                                      */}
      {/* ============================================================ */}
      <div
        className={`absolute top-0 bottom-0 left-0 w-[50.5vw] origin-left transition-transform duration-[1300ms] ease-[cubic-bezier(0.7,0,0.2,1)] z-20 ${
          isOpen ? "-translate-x-full -skew-y-1" : "translate-x-0"
        }`}
        style={{
          background: `repeating-linear-gradient(
            90deg,
            #831843 0px,
            #831843 8px,
            #9d174d 16px,
            #be185d 24px,
            #9d174d 32px,
            #831843 40px
          )`,
          boxShadow: "inset -12px 0 25px rgba(0, 0, 0, 0.4), 6px 0 20px rgba(0, 0, 0, 0.4)",
        }}
      >
        {/* Velvet sheen gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/25 via-transparent to-black/40 pointer-events-none" />

        {/* Scattered floral embroidery blossoms on left curtain panel */}
        <div className="absolute top-[12%] left-[20%] text-xl sm:text-2xl opacity-80 filter drop-shadow">🌸</div>
        <div className="absolute top-[24%] left-[55%] text-base sm:text-lg opacity-70 filter drop-shadow">🌹</div>
        <div className="absolute top-[38%] left-[25%] text-lg sm:text-xl opacity-75 filter drop-shadow">🌺</div>
        <div className="absolute top-[58%] left-[60%] text-sm sm:text-base opacity-65 filter drop-shadow">🌸</div>
        <div className="absolute top-[72%] left-[30%] text-lg sm:text-xl opacity-70 filter drop-shadow">🌼</div>
        <div className="absolute top-[85%] left-[50%] text-xl sm:text-2xl opacity-80 filter drop-shadow">🌸</div>
      </div>

      {/* ============================================================ */}
      {/* RIGHT THEATRICAL CURTAIN                                     */}
      {/* ============================================================ */}
      <div
        className={`absolute top-0 bottom-0 right-0 w-[50.5vw] origin-right transition-transform duration-[1300ms] ease-[cubic-bezier(0.7,0,0.2,1)] z-20 ${
          isOpen ? "translate-x-full skew-y-1" : "translate-x-0"
        }`}
        style={{
          background: `repeating-linear-gradient(
            90deg,
            #831843 0px,
            #831843 8px,
            #9d174d 16px,
            #be185d 24px,
            #9d174d 32px,
            #831843 40px
          )`,
          boxShadow: "inset 12px 0 25px rgba(0, 0, 0, 0.4), -6px 0 20px rgba(0, 0, 0, 0.4)",
        }}
      >
        {/* Velvet sheen gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/25 via-transparent to-black/40 pointer-events-none" />

        {/* Scattered floral embroidery blossoms on right curtain panel */}
        <div className="absolute top-[14%] right-[22%] text-xl sm:text-2xl opacity-80 filter drop-shadow">🌸</div>
        <div className="absolute top-[26%] right-[58%] text-base sm:text-lg opacity-70 filter drop-shadow">🌹</div>
        <div className="absolute top-[42%] right-[28%] text-lg sm:text-xl opacity-75 filter drop-shadow">🌺</div>
        <div className="absolute top-[62%] right-[62%] text-sm sm:text-base opacity-65 filter drop-shadow">🌸</div>
        <div className="absolute top-[75%] right-[25%] text-lg sm:text-xl opacity-70 filter drop-shadow">🌼</div>
        <div className="absolute top-[88%] right-[48%] text-xl sm:text-2xl opacity-80 filter drop-shadow">🌸</div>
      </div>

      {/* Subtle vertical center seam where curtains join */}
      <div
        className={`absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-[2px] bg-black/35 z-25 transition-opacity duration-300 ${
          isOpen ? "opacity-0" : "opacity-100"
        }`}
      />

      {/* ============================================================ */}
      {/* CENTER SEAL MEDALLION                                        */}
      {/* ============================================================ */}
      <div
        className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 transition-all duration-500 ease-out ${
          isOpen
            ? "opacity-0 scale-110 pointer-events-none"
            : "opacity-100 scale-100"
        }`}
      >
        <div className="relative w-48 h-48 sm:w-60 sm:h-60 md:w-72 md:h-72 rounded-full bg-gradient-to-br from-[#fdf2f8] via-[#fce7f3] to-[#fad2e1] border-[5px] sm:border-[7px] border-[#d4af37] shadow-[0_20px_50px_rgba(0,0,0,0.5),0_0_35px_rgba(212,175,55,0.45)] flex flex-col items-center justify-center p-3 sm:p-5 text-center">
          {/* Inner concentric gold ring */}
          <div className="absolute inset-2 sm:inset-3 rounded-full border border-[#d4af37]/60 pointer-events-none" />

          {/* Center vertical seam through medallion matching screenshot */}
          <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-[1px] bg-amber-900/15 pointer-events-none" />

          {/* Logo Name - Playfair Serif */}
          <h1 className="font-serif text-[2.1rem] sm:text-[2.85rem] md:text-[3.4rem] font-bold text-[#831843] tracking-tight leading-none drop-shadow-sm">
            Bloomora
          </h1>

          {/* Subtitle - Tracked Uppercase Gold */}
          <p className="text-[11px] sm:text-xs md:text-sm font-extrabold tracking-[0.26em] text-[#92400e] uppercase mt-2 sm:mt-3">
            FLOWER DECOR
          </p>

          {/* Micro tap hint */}
          <div className="mt-2.5 sm:mt-3 inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-pink-100/80 border border-pink-200 text-[10px] sm:text-[11px] font-semibold text-pink-700">
            <span>Tap to Open</span>
            <span className="text-xs">✨</span>
          </div>
        </div>
      </div>

      {/* ============================================================ */}
      {/* DRIFTING PETALS DURING REVEAL ANIMATION                      */}
      {/* ============================================================ */}
      {isOpen && (
        <div className="absolute inset-0 z-35 pointer-events-none overflow-hidden">
          {fallingPetals.map((petal) => (
            <div
              key={petal.id}
              className={`absolute top-0 ${petal.size} animate-petal-drift filter drop-shadow`}
              style={{
                left: petal.left,
                animationDelay: petal.delay,
                animationDuration: petal.dur,
              }}
            >
              {petal.char}
            </div>
          ))}
        </div>
      )}

      {/* CSS Animations */}
      <style jsx global>{`
        @keyframes petalDrift {
          0% {
            transform: translateY(-40px) rotate(0deg) translateX(0);
            opacity: 1;
          }
          50% {
            transform: translateY(45vh) rotate(180deg) translateX(25px) scale(1.1);
            opacity: 0.95;
          }
          100% {
            transform: translateY(105vh) rotate(360deg) translateX(-25px) scale(0.85);
            opacity: 0;
          }
        }
        .animate-petal-drift {
          animation: petalDrift linear forwards;
        }
      `}</style>
    </div>
  );
};
