"use client";

import React, { useState, useMemo } from "react";
import {
  Filter,
  SlidersHorizontal,
  X,
  ChevronDown,
  Sparkles,
  RotateCcw,
  Star,
  Clock,
} from "lucide-react";
import { Decoration, Occasion } from "@/types";
import { DecorationCard } from "@/components/common/DecorationCard";
import { occasionsData } from "@/data/occasions";

interface ListingViewProps {
  initialDecorations: Decoration[];
  occasion?: Occasion;
  title: string;
  subtitle: string;
  initialMinPrice?: number;
  initialMaxPrice?: number;
  searchQuery?: string;
}

export const ListingView: React.FC<ListingViewProps> = ({
  initialDecorations,
  occasion,
  title,
  subtitle,
  initialMinPrice,
  initialMaxPrice,
  searchQuery,
}) => {
  // Filter States
  const [minPrice, setMinPrice] = useState<number>(initialMinPrice || 0);
  const [maxPrice, setMaxPrice] = useState<number>(initialMaxPrice || 70000);
  const [selectedRating, setSelectedRating] = useState<number>(0);
  const [sameDayOnly, setSameDayOnly] = useState<boolean>(false);
  const [selectedFlower, setSelectedFlower] = useState<string>("all");
  const [balloonFilter, setBalloonFilter] = useState<"all" | "with" | "without">("all");
  const [selectedLocation, setSelectedLocation] = useState<string>("all");
  const [sortBy, setSortBy] = useState<
    "popularity" | "price-asc" | "price-desc" | "rating" | "newest"
  >("popularity");

  // Mobile Filter Drawer State
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Extract distinct flower types
  const flowerTypes = [
    "Roses",
    "Marigold",
    "Tuberoses (Rajnigandha)",
    "Lilies",
    "Orchids",
    "Hydrangeas",
    "Carnations",
  ];

  // Filtering Logic
  const filteredDecorations = useMemo(() => {
    return initialDecorations.filter((item) => {
      // Search query check
      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        const matchesName = item.name.toLowerCase().includes(q);
        const matchesOccasion = item.occasion.toLowerCase().includes(q);
        const matchesFlower = item.flowerType.some((f) => f.toLowerCase().includes(q));
        if (!matchesName && !matchesOccasion && !matchesFlower) return false;
      }

      // Price filter
      if (item.price < minPrice || item.price > maxPrice) return false;

      // Rating filter
      if (selectedRating > 0 && item.rating < selectedRating) return false;

      // Same-day filter
      if (sameDayOnly && !item.isSameDayAvailable) return false;

      // Flower filter
      if (selectedFlower !== "all") {
        if (!item.flowerType.some((f) => f.toLowerCase().includes(selectedFlower.toLowerCase()))) {
          return false;
        }
      }

      // Balloon filter
      if (balloonFilter === "with" && !item.hasBalloons) return false;
      if (balloonFilter === "without" && item.hasBalloons) return false;

      // Location filter
      if (selectedLocation !== "all" && item.locationType !== selectedLocation) {
        return false;
      }

      return true;
    });
  }, [
    initialDecorations,
    searchQuery,
    minPrice,
    maxPrice,
    selectedRating,
    sameDayOnly,
    selectedFlower,
    balloonFilter,
    selectedLocation,
  ]);

  // Sorting Logic
  const sortedDecorations = useMemo(() => {
    const list = [...filteredDecorations];
    switch (sortBy) {
      case "price-asc":
        return list.sort((a, b) => a.price - b.price);
      case "price-desc":
        return list.sort((a, b) => b.price - a.price);
      case "rating":
        return list.sort((a, b) => b.rating - a.rating);
      case "popularity":
      default:
        return list.sort((a, b) => (b.isTrending ? 1 : 0) - (a.isTrending ? 1 : 0) || b.rating - a.rating);
    }
  }, [filteredDecorations, sortBy]);

  const resetFilters = () => {
    setMinPrice(0);
    setMaxPrice(70000);
    setSelectedRating(0);
    setSameDayOnly(false);
    setSelectedFlower("all");
    setBalloonFilter("all");
    setSelectedLocation("all");
    setSortBy("popularity");
  };

  const hasActiveFilters =
    minPrice > 0 ||
    maxPrice < 70000 ||
    selectedRating > 0 ||
    sameDayOnly ||
    selectedFlower !== "all" ||
    balloonFilter !== "all" ||
    selectedLocation !== "all";

  return (
    <div className="py-8 bg-cream-50/40 min-h-screen">
      <div className="container mx-auto px-4">
        {/* Occasion / Listing Header Banner */}
        <div className="p-6 sm:p-10 rounded-3xl bg-gradient-to-r from-rose-900 via-rose-800 to-stone-900 text-white mb-8 shadow-xl relative overflow-hidden">
          <div className="relative z-10 max-w-2xl space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-rose-300 text-xs font-bold uppercase tracking-wider">
              <span>{occasion ? `${occasion.emoji} Occasion Collection` : "🌸 Complete Collection"}</span>
            </div>
            <h1 className="font-serif text-2xl sm:text-4xl font-extrabold tracking-tight">
              {title}
            </h1>
            <p className="text-xs sm:text-sm text-rose-100 leading-relaxed">
              {subtitle}
            </p>
          </div>
        </div>

        {/* Top Control Bar: Active count, Mobile filter button, Sort dropdown */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-stone-200 shadow-2xs mb-8">
          <div className="flex items-center gap-2">
            <span className="text-sm font-bold text-stone-900">
              Showing {sortedDecorations.length} Designs
            </span>
            {searchQuery && (
              <span className="text-xs bg-rose-50 text-rose-700 px-2.5 py-0.5 rounded-full font-semibold">
                &ldquo;{searchQuery}&rdquo;
              </span>
            )}
            {hasActiveFilters && (
              <button
                onClick={resetFilters}
                className="text-xs font-semibold text-rose-600 hover:underline flex items-center gap-1 ml-2"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset Filters</span>
              </button>
            )}
          </div>

          <div className="flex items-center gap-3">
            {/* Mobile Filter Trigger */}
            <button
              onClick={() => setMobileFilterOpen(true)}
              className="lg:hidden flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 font-bold text-xs"
            >
              <Filter className="w-3.5 h-3.5" />
              <span>Filters {hasActiveFilters && "•"}</span>
            </button>

            {/* Sort by dropdown */}
            <div className="flex items-center gap-2 text-xs">
              <span className="text-stone-500 font-medium hidden sm:inline">Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
                className="px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-stone-800 font-semibold focus:outline-none focus:ring-2 focus:ring-rose-500 text-xs"
              >
                <option value="popularity">Most Popular / Trending</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating">Customer Rating</option>
              </select>
            </div>
          </div>
        </div>

        {/* 2-Column Content: Sidebar Filters + Products Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Desktop Filters Sidebar */}
          <aside className="hidden lg:block lg:col-span-3 bg-white p-6 rounded-3xl border border-stone-200 shadow-xs space-y-6 sticky top-24">
            <div className="flex items-center justify-between pb-4 border-b border-stone-100">
              <h3 className="font-serif font-bold text-base text-stone-900 flex items-center gap-1.5">
                <SlidersHorizontal className="w-4 h-4 text-rose-600" />
                <span>Filters</span>
              </h3>
              {hasActiveFilters && (
                <button
                  onClick={resetFilters}
                  className="text-xs text-rose-600 hover:underline font-semibold"
                >
                  Clear all
                </button>
              )}
            </div>

            {/* Same-day Delivery Toggle */}
            <div className="p-3 bg-rose-50/70 rounded-2xl border border-rose-100">
              <label className="flex items-center justify-between cursor-pointer">
                <span className="text-xs font-bold text-stone-800 flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-rose-600" />
                  <span>Same-Day Available</span>
                </span>
                <input
                  type="checkbox"
                  checked={sameDayOnly}
                  onChange={(e) => setSameDayOnly(e.target.checked)}
                  className="rounded text-rose-600 focus:ring-rose-500 w-4 h-4"
                />
              </label>
            </div>

            {/* Price Range Filter */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold text-stone-800 uppercase tracking-wider">
                Price Range (₹)
              </h4>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  value={minPrice}
                  onChange={(e) => setMinPrice(Number(e.target.value))}
                  placeholder="Min"
                  className="w-full px-2.5 py-1.5 rounded-xl border border-stone-200 text-xs text-stone-800"
                />
                <span className="text-stone-400 text-xs">to</span>
                <input
                  type="number"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  placeholder="Max"
                  className="w-full px-2.5 py-1.5 rounded-xl border border-stone-200 text-xs text-stone-800"
                />
              </div>
              <div className="flex flex-wrap gap-1.5 pt-1">
                <button
                  onClick={() => {
                    setMinPrice(0);
                    setMaxPrice(3000);
                  }}
                  className="px-2 py-1 bg-stone-50 hover:bg-rose-50 text-[11px] rounded-lg text-stone-600"
                >
                  Under ₹3K
                </button>
                <button
                  onClick={() => {
                    setMinPrice(3000);
                    setMaxPrice(8000);
                  }}
                  className="px-2 py-1 bg-stone-50 hover:bg-rose-50 text-[11px] rounded-lg text-stone-600"
                >
                  ₹3K – ₹8K
                </button>
                <button
                  onClick={() => {
                    setMinPrice(8000);
                    setMaxPrice(70000);
                  }}
                  className="px-2 py-1 bg-stone-50 hover:bg-rose-50 text-[11px] rounded-lg text-stone-600"
                >
                  ₹8K+
                </button>
              </div>
            </div>

            {/* Flower Type Filter */}
            <div className="space-y-2 pt-2 border-t border-stone-100">
              <h4 className="text-xs font-bold text-stone-800 uppercase tracking-wider">
                Primary Flower
              </h4>
              <div className="space-y-1">
                <label className="flex items-center gap-2 text-xs text-stone-700 cursor-pointer">
                  <input
                    type="radio"
                    name="flower_filter"
                    checked={selectedFlower === "all"}
                    onChange={() => setSelectedFlower("all")}
                    className="text-rose-600"
                  />
                  <span>All Flowers</span>
                </label>
                {flowerTypes.map((flower) => (
                  <label key={flower} className="flex items-center gap-2 text-xs text-stone-700 cursor-pointer">
                    <input
                      type="radio"
                      name="flower_filter"
                      checked={selectedFlower === flower}
                      onChange={() => setSelectedFlower(flower)}
                      className="text-rose-600"
                    />
                    <span>{flower}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Balloons Filter */}
            <div className="space-y-2 pt-2 border-t border-stone-100">
              <h4 className="text-xs font-bold text-stone-800 uppercase tracking-wider">
                Balloons
              </h4>
              <div className="space-y-1 text-xs text-stone-700">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="balloon_filter"
                    checked={balloonFilter === "all"}
                    onChange={() => setBalloonFilter("all")}
                    className="text-rose-600"
                  />
                  <span>All Setups</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="balloon_filter"
                    checked={balloonFilter === "with"}
                    onChange={() => setBalloonFilter("with")}
                    className="text-rose-600"
                  />
                  <span>With Balloons</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="balloon_filter"
                    checked={balloonFilter === "without"}
                    onChange={() => setBalloonFilter("without")}
                    className="text-rose-600"
                  />
                  <span>Only Flowers (No Balloons)</span>
                </label>
              </div>
            </div>

            {/* Location Type Filter */}
            <div className="space-y-2 pt-2 border-t border-stone-100">
              <h4 className="text-xs font-bold text-stone-800 uppercase tracking-wider">
                Venue Location Type
              </h4>
              <select
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                className="w-full p-2 bg-stone-50 border border-stone-200 rounded-xl text-xs font-semibold text-stone-800"
              >
                <option value="all">All Venues</option>
                <option value="Home">Home (Living Room / Bedroom)</option>
                <option value="Hall">Banquet Hall / Clubhouse</option>
                <option value="Outdoor">Outdoor / Lawn / Terrace</option>
                <option value="Car">Car Decoration</option>
                <option value="Office">Corporate / Office</option>
              </select>
            </div>
          </aside>

          {/* Product Grid Area */}
          <main className="lg:col-span-9">
            {sortedDecorations.length === 0 ? (
              <div className="p-12 text-center bg-white rounded-3xl border border-stone-200 space-y-4">
                <div className="w-16 h-16 rounded-full bg-rose-50 text-2xl mx-auto flex items-center justify-center">
                  🌸
                </div>
                <h3 className="font-serif text-xl font-bold text-stone-900">
                  No matching decorations found
                </h3>
                <p className="text-sm text-stone-500 max-w-sm mx-auto">
                  Try broadening your price range or reset filters to see all available floral designs.
                </p>
                <button
                  onClick={resetFilters}
                  className="px-5 py-2.5 rounded-xl bg-stone-900 hover:bg-stone-800 text-white font-semibold text-xs"
                >
                  Reset All Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {sortedDecorations.map((item) => (
                  <DecorationCard key={item.id} decoration={item} />
                ))}
              </div>
            )}
          </main>
        </div>
      </div>

      {/* Mobile Filters Drawer */}
      {mobileFilterOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="fixed inset-0 bg-stone-900/50 backdrop-blur-xs"
            onClick={() => setMobileFilterOpen(false)}
          />
          <div className="fixed inset-y-0 right-0 w-4/5 max-w-xs bg-white shadow-2xl p-6 overflow-y-auto space-y-6">
            <div className="flex items-center justify-between border-b border-stone-100 pb-4">
              <h3 className="font-serif font-bold text-lg text-stone-900">
                Filter Designs
              </h3>
              <button
                onClick={() => setMobileFilterOpen(false)}
                className="p-1 rounded-full text-stone-500"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Mobile Filters Body */}
            <div className="space-y-4 text-xs">
              <label className="flex items-center justify-between p-3 bg-rose-50 rounded-xl">
                <span className="font-bold text-stone-800">Same-Day Available</span>
                <input
                  type="checkbox"
                  checked={sameDayOnly}
                  onChange={(e) => setSameDayOnly(e.target.checked)}
                  className="rounded text-rose-600"
                />
              </label>

              <div className="space-y-2">
                <span className="font-bold text-stone-800 uppercase">Max Budget</span>
                <input
                  type="range"
                  min={1500}
                  max={60000}
                  step={500}
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  className="w-full accent-rose-600"
                />
                <span className="font-bold text-rose-600">Up to ₹{maxPrice.toLocaleString()}</span>
              </div>
            </div>

            <div className="pt-4 border-t border-stone-100 flex gap-2">
              <button
                onClick={resetFilters}
                className="w-1/2 py-2.5 rounded-xl border border-stone-300 font-bold text-xs"
              >
                Reset
              </button>
              <button
                onClick={() => setMobileFilterOpen(false)}
                className="w-1/2 py-2.5 rounded-xl bg-rose-600 text-white font-bold text-xs"
              >
                Apply
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
