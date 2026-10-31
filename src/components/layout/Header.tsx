"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Search,
  Heart,
  User,
  ShoppingBag,
  Menu,
  X,
  Phone,
  MessageCircle,
  Sparkles,
} from "lucide-react";
import { siteConfig } from "@/config/site";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { CitySelector } from "./CitySelector";
import { MegaMenu } from "./MegaMenu";
import { occasionsData } from "@/data/occasions";

import { AnnouncementBar } from "./AnnouncementBar";

export const Header: React.FC = () => {
  const router = useRouter();
  const { itemsCount, wishlist, setIsCartOpen } = useCart();
  const { isLoggedIn, user } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/decorations/all?q=${encodeURIComponent(searchQuery.trim())}`);
      setIsSearchOpen(false);
      setMobileMenuOpen(false);
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-rose-100/80 shadow-xs transition-all">
      {/* Top Infinite Running Marquee Ticker */}
      <AnnouncementBar />

      {/* Main Bar */}
      <div className="container mx-auto px-4 py-2.5 sm:py-3 flex items-center justify-between gap-4">
        {/* Left: Mobile hamburger + Logo + City */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="lg:hidden p-2 text-stone-700 hover:text-rose-600 rounded-xl hover:bg-rose-50 transition-colors"
            aria-label="Open menu"
          >
            <Menu className="w-5 h-5" />
          </button>

          <Link href="/" className="flex items-center gap-1 group">
            <span className="font-serif text-2xl sm:text-3xl font-extrabold tracking-tight text-stone-900 group-hover:text-rose-700 transition-colors">
              Bloomora
            </span>
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500 group-hover:scale-125 transition-transform" />
          </Link>

          <div className="hidden sm:block ml-2">
            <CitySelector />
          </div>
        </div>

        {/* Center: Search Bar */}
        <div className="hidden md:flex flex-1 max-w-md mx-4">
          <form onSubmit={handleSearchSubmit} className="relative w-full">
            <input
              type="text"
              placeholder="Search by occasion, theme, or flower (e.g. Ring, Roses, Haldi)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 text-xs sm:text-sm bg-stone-50 border border-stone-200/80 rounded-full focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 transition-all text-stone-800 placeholder:text-stone-400"
            />
            <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          </form>
        </div>

        {/* Right Actions: Phone + Wishlist + Account + Cart */}
        <div className="flex items-center gap-1 sm:gap-2">
          {/* Quick Call Button (Desktop) */}
          <a
            href={`tel:${siteConfig.phone}`}
            className="hidden xl:flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold text-stone-700 hover:text-rose-600 hover:bg-rose-50 border border-transparent hover:border-rose-200 transition-colors"
          >
            <Phone className="w-3.5 h-3.5 text-rose-500" />
            <span>{siteConfig.phoneDisplay}</span>
          </a>

          {/* Search trigger (Mobile) */}
          <button
            onClick={() => setIsSearchOpen(!isSearchOpen)}
            className="md:hidden p-2 text-stone-700 hover:text-rose-600 rounded-full hover:bg-rose-50"
            aria-label="Search"
          >
            <Search className="w-5 h-5" />
          </button>

          {/* Wishlist */}
          <Link
            href="/account?tab=wishlist"
            className="relative p-2 text-stone-700 hover:text-rose-600 rounded-full hover:bg-rose-50 transition-colors"
            aria-label="Wishlist"
          >
            <Heart className="w-5 h-5" />
            {wishlist.length > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 bg-rose-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                {wishlist.length}
              </span>
            )}
          </Link>

          {/* Account */}
          <Link
            href="/account"
            className="flex items-center gap-1.5 p-2 text-stone-700 hover:text-rose-600 rounded-full hover:bg-rose-50 transition-colors"
            aria-label="Account"
          >
            <User className="w-5 h-5" />
            {isLoggedIn && (
              <span className="hidden sm:inline text-xs font-semibold text-stone-800 max-w-[80px] truncate">
                {user?.name.split(" ")[0]}
              </span>
            )}
          </Link>

          {/* Cart Icon with badge */}
          <button
            onClick={() => setIsCartOpen(true)}
            className="relative flex items-center gap-1.5 py-1.5 px-3 rounded-full bg-rose-600 hover:bg-rose-700 text-white font-semibold text-xs sm:text-sm shadow-sm hover:shadow transition-all"
            aria-label="Shopping Cart"
          >
            <ShoppingBag className="w-4 h-4" />
            <span className="hidden sm:inline">Cart</span>
            {itemsCount > 0 && (
              <span className="w-5 h-5 bg-white text-rose-700 rounded-full text-xs font-extrabold flex items-center justify-center shadow-xs">
                {itemsCount}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Mobile search drop */}
      {isSearchOpen && (
        <div className="md:hidden px-4 pb-3 pt-1 border-t border-rose-50 bg-stone-50/90 animate-in fade-in">
          <form onSubmit={handleSearchSubmit} className="relative w-full">
            <input
              type="text"
              placeholder="Search decorations (e.g. Ring, Haldi, Proposal)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-xs bg-white border border-stone-200 rounded-full focus:outline-none focus:ring-2 focus:ring-rose-500 text-stone-800"
              autoFocus
            />
            <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
          </form>
        </div>
      )}

      {/* Secondary Nav Bar (Desktop) */}
      <div className="hidden lg:block border-t border-rose-100/50 bg-stone-50/50">
        <div className="container mx-auto px-4 flex items-center justify-between text-sm">
          <div className="flex items-center gap-1">
            <MegaMenu />
            <Link
              href="/decorations/birthday"
              className="px-3 py-2 text-stone-700 hover:text-rose-600 font-medium transition-colors"
            >
              Birthday
            </Link>
            <Link
              href="/decorations/wedding"
              className="px-3 py-2 text-stone-700 hover:text-rose-600 font-medium transition-colors"
            >
              Wedding
            </Link>
            <Link
              href="/corporate"
              className="px-3 py-2 text-stone-700 hover:text-rose-600 font-medium transition-colors"
            >
              Corporate
            </Link>
            <Link
              href="/gallery"
              className="px-3 py-2 text-stone-700 hover:text-rose-600 font-medium transition-colors"
            >
              Gallery
            </Link>
            <Link
              href="/offers"
              className="px-3 py-2 text-stone-700 hover:text-rose-600 font-medium transition-colors flex items-center gap-1"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>Offers</span>
            </Link>
            <Link
              href="/custom-quote"
              className="px-3 py-2 text-rose-600 hover:text-rose-700 font-semibold transition-colors"
            >
              Custom Quote
            </Link>
          </div>

          <div className="flex items-center gap-4 text-xs font-medium text-stone-500">
            <Link href="/about" className="hover:text-rose-600">
              About
            </Link>
            <Link href="/contact" className="hover:text-rose-600">
              Contact
            </Link>
            <Link href="/faq" className="hover:text-rose-600">
              FAQs
            </Link>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="fixed inset-0 bg-stone-900/40 backdrop-blur-sm"
            onClick={() => setMobileMenuOpen(false)}
          />
          <div className="fixed inset-y-0 left-0 w-4/5 max-w-sm bg-white shadow-2xl flex flex-col z-50">
            {/* Drawer Header */}
            <div className="p-4 border-b border-rose-100 flex items-center justify-between bg-rose-50/50">
              <Link
                href="/"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-1"
              >
                <span className="font-serif text-2xl font-bold text-stone-900">
                  Bloomora
                </span>
                <span className="w-2 h-2 rounded-full bg-rose-500" />
              </Link>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-1 rounded-full text-stone-500 hover:text-stone-900"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* City Selector in mobile */}
            <div className="p-4 border-b border-rose-100 bg-stone-50/50 flex items-center justify-between">
              <span className="text-xs font-semibold text-stone-500 uppercase tracking-wider">
                Current City
              </span>
              <CitySelector />
            </div>

            {/* Navigation list */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              <div>
                <p className="text-xs font-bold text-stone-400 uppercase tracking-wider mb-2">
                  15 Occasions
                </p>
                <div className="grid grid-cols-2 gap-2">
                  {occasionsData.map((occ) => (
                    <Link
                      key={occ.id}
                      href={`/decorations/${occ.slug}`}
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex items-center gap-2 p-2 rounded-xl bg-stone-50 hover:bg-rose-50 text-xs font-medium text-stone-800 transition-colors"
                    >
                      <span className="text-lg">{occ.emoji}</span>
                      <span className="truncate">{occ.name}</span>
                    </Link>
                  ))}
                </div>
              </div>

              <div className="pt-2 border-t border-rose-100 space-y-1">
                <p className="text-xs font-bold text-stone-400 uppercase tracking-wider mb-2">
                  Quick Links
                </p>
                <Link
                  href="/decorations/all"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-3 py-2 text-sm font-semibold text-rose-600 rounded-lg hover:bg-rose-50"
                >
                  Browse All 40+ Designs →
                </Link>
                <Link
                  href="/custom-quote"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-3 py-2 text-sm font-medium text-stone-700 rounded-lg hover:bg-stone-50"
                >
                  Request Custom Quote
                </Link>
                <Link
                  href="/offers"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-3 py-2 text-sm font-medium text-stone-700 rounded-lg hover:bg-stone-50"
                >
                  Special Offers & Codes
                </Link>
                <Link
                  href="/gallery"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-3 py-2 text-sm font-medium text-stone-700 rounded-lg hover:bg-stone-50"
                >
                  Recent Celebrations Gallery
                </Link>
                <Link
                  href="/corporate"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-3 py-2 text-sm font-medium text-stone-700 rounded-lg hover:bg-stone-50"
                >
                  Corporate Events & Launches
                </Link>
                <Link
                  href="/account"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-3 py-2 text-sm font-medium text-stone-700 rounded-lg hover:bg-stone-50"
                >
                  My Account & Orders
                </Link>
                <Link
                  href="/about"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-3 py-2 text-sm font-medium text-stone-700 rounded-lg hover:bg-stone-50"
                >
                  About Bloomora
                </Link>
                <Link
                  href="/contact"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-3 py-2 text-sm font-medium text-stone-700 rounded-lg hover:bg-stone-50"
                >
                  Contact Us
                </Link>
                <Link
                  href="/admin"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-3 py-2 text-xs font-medium text-stone-400 rounded-lg hover:bg-stone-50"
                >
                  Admin Portal
                </Link>
              </div>
            </div>

            {/* Mobile Drawer Footer with Contact */}
            <div className="p-4 bg-stone-50 border-t border-rose-100 space-y-2">
              <a
                href={`tel:${siteConfig.phone}`}
                className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-stone-900 text-white text-xs font-semibold"
              >
                <Phone className="w-4 h-4 text-rose-400" />
                <span>Call {siteConfig.phoneDisplay}</span>
              </a>
              <a
                href={`https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent(
                  "Hi Bloomora, I'd like to inquire about flower decoration."
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-emerald-600 text-white text-xs font-semibold"
              >
                <MessageCircle className="w-4 h-4" />
                <span>WhatsApp Instant Help</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
