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
    <footer className="bg-stone-900 text-stone-300 pt-16 pb-24 md:pb-12 border-t border-stone-800">
      <div className="container mx-auto px-4">
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-stone-800">
          {/* Brand Blurb */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="inline-flex items-center gap-1.5">
              <span className="font-serif text-3xl font-extrabold text-white tracking-tight">
                Bloomora
              </span>
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500" />
            </Link>
            <p className="text-sm text-stone-400 leading-relaxed max-w-sm">
              {siteConfig.description}
            </p>

            <div className="space-y-2 text-xs text-stone-300 pt-2">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-amber-400 shrink-0" />
                <span>{siteConfig.timing}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-rose-400 shrink-0" />
                <span>{siteConfig.address}</span>
              </div>
            </div>

            {/* Newsletter */}
            <div className="pt-3">
              <p className="text-xs font-semibold text-white uppercase tracking-wider mb-2">
                Get ₹500 off your first celebration
              </p>
              {subscribed ? (
                <div className="flex items-center gap-2 text-xs text-emerald-400 bg-emerald-950/60 border border-emerald-800/80 p-2.5 rounded-xl">
                  <CheckCircle2 className="w-4 h-4" />
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
                    className="flex-1 px-3 py-2 text-xs rounded-xl bg-stone-800 border border-stone-700 text-white placeholder:text-stone-500 focus:outline-none focus:border-rose-500"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold rounded-xl transition-colors shrink-0"
                  >
                    Subscribe
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Occasions (col 1) */}
          <div className="space-y-3">
            <h4 className="font-serif text-sm font-bold text-white uppercase tracking-wider">
              Occasions
            </h4>
            <ul className="space-y-2 text-xs text-stone-400">
              {occasionsData.slice(0, 8).map((occ) => (
                <li key={occ.id}>
                  <Link
                    href={`/decorations/${occ.slug}`}
                    className="hover:text-rose-400 transition-colors flex items-center gap-1.5"
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
            <h4 className="font-serif text-sm font-bold text-white uppercase tracking-wider">
              More Occasions
            </h4>
            <ul className="space-y-2 text-xs text-stone-400">
              {occasionsData.slice(8, 15).map((occ) => (
                <li key={occ.id}>
                  <Link
                    href={`/decorations/${occ.slug}`}
                    className="hover:text-rose-400 transition-colors flex items-center gap-1.5"
                  >
                    <span>{occ.emoji}</span>
                    <span>{occ.name}</span>
                  </Link>
                </li>
              ))}
              <li className="pt-1">
                <Link
                  href="/decorations/all"
                  className="text-amber-400 hover:underline font-semibold"
                >
                  View All Occasions →
                </Link>
              </li>
            </ul>
          </div>

          {/* Company & Support */}
          <div className="space-y-3">
            <h4 className="font-serif text-sm font-bold text-white uppercase tracking-wider">
              Company & Help
            </h4>
            <ul className="space-y-2 text-xs text-stone-400">
              <li>
                <Link href="/about" className="hover:text-rose-400 transition-colors">
                  About Bloomora
                </Link>
              </li>
              <li>
                <Link href="/gallery" className="hover:text-rose-400 transition-colors">
                  Celebration Gallery
                </Link>
              </li>
              <li>
                <Link href="/custom-quote" className="hover:text-rose-400 transition-colors">
                  Custom Event Quote
                </Link>
              </li>
              <li>
                <Link href="/corporate" className="hover:text-rose-400 transition-colors">
                  Corporate Launches
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-rose-400 transition-colors">
                  Frequently Asked Questions
                </Link>
              </li>
              <li>
                <Link href="/policies" className="hover:text-rose-400 transition-colors">
                  Cancellation & Refund Policy
                </Link>
              </li>
              <li>
                <Link href="/policies#terms" className="hover:text-rose-400 transition-colors">
                  Terms of Service & Privacy
                </Link>
              </li>
              <li>
                <Link href="/admin" className="hover:text-rose-400 transition-colors text-stone-500">
                  Admin Dashboard
                </Link>
              </li>
            </ul>

            <div className="pt-2 space-y-2 border-t border-stone-800">
              <a
                href={`tel:${siteConfig.phone}`}
                className="flex items-center gap-2 text-xs text-white hover:text-rose-400 transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-rose-500" />
                <span>{siteConfig.phoneDisplay}</span>
              </a>
              <a
                href={`mailto:${siteConfig.email}`}
                className="flex items-center gap-2 text-xs text-stone-400 hover:text-rose-400 transition-colors"
              >
                <Mail className="w-3.5 h-3.5 text-rose-500" />
                <span>{siteConfig.email}</span>
              </a>
              <a
                href={siteConfig.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-xs text-stone-400 hover:text-rose-400 transition-colors"
              >
                <InstagramIcon className="w-3.5 h-3.5 text-pink-500" />
                <span>{siteConfig.instagramHandle}</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-stone-500">
          <p>
            © {new Date().getFullYear()} {siteConfig.name}. Delhi NCR. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1 text-stone-400">
              <span>Handcrafted with</span>
              <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
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
