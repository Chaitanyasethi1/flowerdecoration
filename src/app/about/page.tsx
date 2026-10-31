import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Sparkles, ShieldCheck, Heart, Award, Clock, MapPin, Users, CheckCircle2 } from "lucide-react";
import { siteConfig } from "@/config/site";

export const metadata = {
  title: "About Bloomora Decor | Delhi NCR's Premier Floral Stylists",
  description:
    "Founded in 2015, Bloomora Decor has styled over 12,000+ celebrations across Delhi, Gurgaon, Noida, Ghaziabad, and Faridabad with 100% farm-fresh flowers.",
};

export default function AboutPage() {
  return (
    <div className="py-12 bg-cream-50/40 min-h-screen">
      <div className="container mx-auto px-4 max-w-5xl space-y-16">
        {/* Hero */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-100 text-rose-800 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-rose-600" />
            <span>Delhi NCR · Since {siteConfig.sinceYear}</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl font-extrabold text-stone-900 tracking-tight">
            Crafting Floral Poetry for Life&apos;s Purest Moments
          </h1>
          <p className="text-sm sm:text-base text-stone-600 leading-relaxed">
            Bloomora Decor was born out of a simple conviction: life&apos;s greatest celebrations deserve authentic, fresh-harvested botanicals styled with contemporary artistry.
          </p>
        </div>

        {/* Story Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div className="relative h-80 sm:h-96 rounded-3xl overflow-hidden shadow-xl">
            <Image
              src="https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&w=1000&q=80"
              alt="Bloomora flower setup team"
              fill
              className="object-cover"
            />
          </div>

          <div className="space-y-4 text-xs sm:text-sm text-stone-600 leading-relaxed">
            <h2 className="font-serif text-2xl font-bold text-stone-900">
              From Ghazipur Mandi to 12,000+ Delhi Living Rooms
            </h2>
            <p>
              Every morning at 5:00 AM, while Delhi sleeps, our head floral buyers arrive at the Ghazipur Flower Mandi to hand-grade roses, oriental lilies, exotic dendrobium orchids, and fragrant rajnigandha blossoms.
            </p>
            <p>
              Unlike mass decorators who rely on dusty artificial plastic garlands, every Bloomora installation is guaranteed 100% farm-fresh, treated with hydration mist, and assembled with architectural precision.
            </p>
            <div className="grid grid-cols-2 gap-3 pt-2">
              <div className="p-3 bg-white rounded-2xl border border-stone-200">
                <span className="font-serif text-2xl font-bold text-rose-600 block">
                  12,000+
                </span>
                <span className="text-xs text-stone-500">Events Completed</span>
              </div>
              <div className="p-3 bg-white rounded-2xl border border-stone-200">
                <span className="font-serif text-2xl font-bold text-amber-600 block">
                  4.9★
                </span>
                <span className="text-xs text-stone-500">Google Rating</span>
              </div>
            </div>
          </div>
        </div>

        {/* Pillars */}
        <div className="bg-white p-8 sm:p-12 rounded-3xl border border-stone-200/80 shadow-xs space-y-8">
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900 text-center">
            Our 4 Foundational Pillars
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-center sm:text-left">
            <div className="space-y-2">
              <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center font-bold">
                1
              </div>
              <h3 className="font-serif font-bold text-base text-stone-900">
                Uncompromising Freshness
              </h3>
              <p className="text-xs text-stone-500 leading-relaxed">
                Zero synthetic floral replicas. Only fresh blooms that emit natural perfume and look exquisite in photographs.
              </p>
            </div>
            <div className="space-y-2">
              <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center font-bold">
                2
              </div>
              <h3 className="font-serif font-bold text-base text-stone-900">
                Transparent Pricing
              </h3>
              <p className="text-xs text-stone-500 leading-relaxed">
                Pay a small 30% advance to confirm your slot, and settle the remaining 70% upon delivery and visual inspection.
              </p>
            </div>
            <div className="space-y-2">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold">
                3
              </div>
              <h3 className="font-serif font-bold text-base text-stone-900">
                Speed & Punctuality
              </h3>
              <p className="text-xs text-stone-500 leading-relaxed">
                Same-day setup ready in 3-4 hours if booked before 4 PM IST, with guaranteed completion before guest arrival.
              </p>
            </div>
            <div className="space-y-2">
              <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center font-bold">
                4
              </div>
              <h3 className="font-serif font-bold text-base text-stone-900">
                Discreet & Clean Crews
              </h3>
              <p className="text-xs text-stone-500 leading-relaxed">
                Our in-house decorators wear shoe covers, avoid noisy drills, and sweep up all snipped stems before exiting.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
