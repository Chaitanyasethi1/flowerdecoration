"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Phone,
  Mail,
  Clock,
  MapPin,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Heart,
} from "lucide-react";

const InstagramIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);
import { siteConfig } from "@/config/site";
import { occasionsData } from "@/data/occasions";

export const Footer: React.FC = () => {
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleNewsletter = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail.trim()) {
      setSubscribed(true);
      setNewsletterEmail("");
    }
  };

  return (
    <footer className="bg-gradient-to-b from-pink-50/80 via-white to-pink-50/50 text-stone-700 pt-12 sm:pt-16 pb-28 md:pb-12 border-t border-pink-200/80">
      <div className="container mx-auto px-4">
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 sm:gap-10 pb-10 sm:pb-12 border-b border-pink-100">
          {/* Brand Blurb */}
          <div className="lg:col-span-2 space-y-3 sm:space-y-4">
            <Link href="/" className="inline-flex items-center gap-1.5">
              <span className="font-serif text-3xl font-extrabold text-stone-900 tracking-tight">
                Bloomora
              </span>
              <span className="w-2.5 h-2.5 rounded-full bg-pink-500" />
            </Link>
            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed max-w-sm">
              {siteConfig.description}
            </p>

            <div className="space-y-2 text-xs text-stone-600 pt-1">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-amber-500 shrink-0" />
                <span>{siteConfig.timing}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-pink-500 shrink-0" />
                <span>{siteConfig.address}</span>
              </div>
            </div>

            {/* Newsletter */}
            <div className="pt-2">
              <p className="text-xs font-bold text-stone-900 uppercase tracking-wider mb-2">
                Get ₹500 off your first celebration
              </p>
              {subscribed ? (
                <div className="flex items-center gap-2 text-xs text-emerald-700 bg-emerald-50 border border-emerald-200 p-2.5 rounded-xl">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Thank you! Use coupon code <b>WELCOME500</b> at checkout.</span>
                </div>
              ) : (
                <form onSubmit={handleNewsletter} className="flex gap-2 max-w-sm">
                  <input
                    type="email"
                    required
                    placeholder="Enter your email address..."
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    className="flex-1 px-3 py-2 text-xs rounded-xl bg-white border border-pink-200 text-stone-800 placeholder:text-stone-400 focus:outline-none focus:border-pink-500 shadow-2xs"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 bg-gradient-to-r from-pink-600 to-rose-500 hover:from-pink-700 hover:to-rose-600 text-white text-xs font-bold rounded-xl transition-all shadow-xs shrink-0"
                  >
                    Subscribe
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Occasions (col 1) */}
          <div className="space-y-3">
            <h4 className="font-serif text-sm font-bold text-stone-900 uppercase tracking-wider">
              Popular Occasions
            </h4>
            <ul className="space-y-2 text-xs text-stone-600">
              {occasionsData.slice(0, 8).map((occ) => (
                <li key={occ.id}>
                  <Link
                    href={`/decorations/${occ.slug}`}
                    className="hover:text-pink-600 transition-colors flex items-center gap-1.5"
                  >
                    <span>{occ.emoji}</span>
                    <span>{occ.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Occasions (col 2) */}
          <div className="space-y-3">
            <h4 className="font-serif text-sm font-bold text-stone-900 uppercase tracking-wider">
              More Celebrations
            </h4>
            <ul className="space-y-2 text-xs text-stone-600">
              {occasionsData.slice(8, 15).map((occ) => (
                <li key={occ.id}>
                  <Link
                    href={`/decorations/${occ.slug}`}
                    className="hover:text-pink-600 transition-colors flex items-center gap-1.5"
                  >
                    <span>{occ.emoji}</span>
                    <span>{occ.name}</span>
                  </Link>
                </li>
              ))}
              <li className="pt-1">
                <Link
                  href="/decorations/all"
                  className="text-pink-600 hover:underline font-bold"
                >
                  View All 40+ Designs →
                </Link>
              </li>
            </ul>
          </div>

          {/* Company & Support */}
          <div className="space-y-3">
            <h4 className="font-serif text-sm font-bold text-stone-900 uppercase tracking-wider">
              Company & Help
            </h4>
            <ul className="space-y-2 text-xs text-stone-600">
              <li>
                <Link href="/about" className="hover:text-pink-600 transition-colors">
                  About Bloomora
                </Link>
              </li>
              <li>
                <Link href="/gallery" className="hover:text-pink-600 transition-colors">
                  Celebration Gallery
                </Link>
              </li>
              <li>
                <Link href="/custom-quote" className="hover:text-pink-600 transition-colors">
                  Custom Event Quote
                </Link>
              </li>
              <li>
                <Link href="/corporate" className="hover:text-pink-600 transition-colors">
                  Corporate Launches
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-pink-600 transition-colors">
                  Frequently Asked Questions
                </Link>
              </li>
              <li>
                <Link href="/policies" className="hover:text-pink-600 transition-colors">
                  Cancellation & Refund Policy
                </Link>
              </li>
              <li>
                <Link href="/policies#terms" className="hover:text-pink-600 transition-colors">
                  Terms of Service & Privacy
                </Link>
              </li>
              <li>
                <Link href="/admin" className="hover:text-pink-600 transition-colors text-stone-400">
                  Admin Dashboard
                </Link>
              </li>
            </ul>

            <div className="pt-2 space-y-2 border-t border-pink-100">
              <a
                href={`tel:${siteConfig.phone}`}
                className="flex items-center gap-2 text-xs text-stone-800 hover:text-pink-600 transition-colors font-semibold"
              >
                <Phone className="w-3.5 h-3.5 text-pink-600" />
                <span>{siteConfig.phoneDisplay}</span>
              </a>
              <a
                href={`mailto:${siteConfig.email}`}
                className="flex items-center gap-2 text-xs text-stone-600 hover:text-pink-600 transition-colors"
              >
                <Mail className="w-3.5 h-3.5 text-pink-600" />
                <span>{siteConfig.email}</span>
              </a>
              <a
                href={siteConfig.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-xs text-stone-600 hover:text-pink-600 transition-colors"
              >
                <InstagramIcon className="w-3.5 h-3.5 text-pink-600" />
                <span>{siteConfig.instagramHandle}</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 sm:pt-8 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-stone-500">
          <p>
            © {new Date().getFullYear()} {siteConfig.name}. Delhi NCR. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1 text-stone-600">
              <span>Handcrafted with</span>
              <Heart className="w-3.5 h-3.5 text-pink-600 fill-pink-600" />
              <span>for Delhi, Gurgaon & Noida</span>
            </span>
            <Link href="/policies" className="hover:underline">
              Refunds
            </Link>
            <Link href="/policies#terms" className="hover:underline">
              Terms
            </Link>
            <Link href="/policies#privacy" className="hover:underline">
              Privacy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
