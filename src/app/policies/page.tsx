import React from "react";
import Link from "next/link";
import { ShieldAlert, FileText, Lock, CheckCircle2 } from "lucide-react";
import { siteConfig } from "@/config/site";

export const metadata = {
  title: "Policies, Cancellation & Refunds | Bloomora Decor",
  description: "Read Bloomora Decor's 48-hour free cancellation policy, advance payment terms, and privacy practices.",
};

export default function PoliciesPage() {
  return (
    <div className="py-12 bg-cream-50/40 min-h-screen">
      <div className="container mx-auto px-4 max-w-4xl space-y-12">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-100 text-rose-800 text-xs font-bold uppercase tracking-wider">
            <ShieldAlert className="w-3.5 h-3.5" />
            <span>Customer Protection</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl font-extrabold text-stone-900 tracking-tight">
            Terms, Privacy & Cancellation Policies
          </h1>
          <p className="text-sm text-stone-600">
            Transparent, customer-friendly policies designed for total peace of mind.
          </p>
        </div>

        {/* SECTION 1: CANCELLATION & REFUNDS */}
        <section id="cancellation" className="bg-white p-6 sm:p-10 rounded-3xl border border-rose-200/80 shadow-xs space-y-4">
          <div className="flex items-center gap-2 text-rose-700">
            <ShieldAlert className="w-6 h-6" />
            <h2 className="font-serif text-2xl font-bold text-stone-900">
              Cancellation & Refund Policy
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
            Because our floral arrangements use fresh, perishable botanicals harvested daily from Ghazipur Mandi, our cancellation refund tiers are based on how far in advance notice is provided:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
            <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 space-y-1">
              <span className="font-serif text-2xl font-extrabold text-emerald-800 block">
                100% Refund
              </span>
              <span className="text-xs font-bold text-emerald-900 block">
                More than 48 Hours Before
              </span>
              <p className="text-[11px] text-stone-600">
                Cancel your booking at least 48 hours before your chosen time slot for an immediate, full advance refund.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 space-y-1">
              <span className="font-serif text-2xl font-extrabold text-amber-800 block">
                50% Refund
              </span>
              <span className="text-xs font-bold text-amber-900 block">
                Between 24 and 48 Hours
              </span>
              <p className="text-[11px] text-stone-600">
                50% advance refund is credited back to your original source of payment within 2 to 4 business days.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 space-y-1">
              <span className="font-serif text-2xl font-extrabold text-rose-800 block">
                Non-Refundable
              </span>
              <span className="text-xs font-bold text-rose-900 block">
                Within 24 Hours
              </span>
              <p className="text-[11px] text-stone-600">
                Fresh blooms are already harvested, trimmed, and staged by our florists. (Free date rescheduling is still available).
              </p>
            </div>
          </div>

          <div className="p-4 bg-stone-50 rounded-2xl text-xs text-stone-700 space-y-1">
            <p className="font-bold">How to Cancel:</p>
            <p>
              Navigate to <Link href="/account" className="text-rose-600 font-bold underline">My Account → Bookings</Link> and tap the &ldquo;Cancel Booking&rdquo; button. The refund amount is automatically calculated and processed immediately.
            </p>
          </div>
        </section>

        {/* SECTION 2: TERMS OF SERVICE */}
        <section id="terms" className="bg-white p-6 sm:p-10 rounded-3xl border border-stone-200 shadow-xs space-y-4">
          <div className="flex items-center gap-2 text-stone-900">
            <FileText className="w-6 h-6 text-rose-600" />
            <h2 className="font-serif text-2xl font-bold">Terms of Service</h2>
          </div>
          <div className="space-y-3 text-xs sm:text-sm text-stone-600 leading-relaxed">
            <p>
              <b>1. Rental Hardware:</b> Backdrops, metallic circular ring frames, neon flex lights, fairy curtain nets, brass urlis, and pedestals are provided on a rental basis. Our technician will safely dismantle and pick up the hardware the following morning.
            </p>
            <p>
              <b>2. Site Access & Electricity:</b> The client must ensure access to the venue at the beginning of the booked time slot. Standard setups with neon lights or fairy lights require one working 3-pin 220V plug point within 10 meters of the setup area.
            </p>
            <p>
              <b>3. Advance & Balance Payment:</b> A 30% advance deposit confirms your slot on our decorators&apos; calendar. The remaining 70% balance is payable on site upon completion of the setup via UPI, Card, or Cash.
            </p>
          </div>
        </section>

        {/* SECTION 3: PRIVACY POLICY */}
        <section id="privacy" className="bg-white p-6 sm:p-10 rounded-3xl border border-stone-200 shadow-xs space-y-4">
          <div className="flex items-center gap-2 text-stone-900">
            <Lock className="w-6 h-6 text-emerald-600" />
            <h2 className="font-serif text-2xl font-bold">Privacy & Data Security</h2>
          </div>
          <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
            We value your privacy. We collect your name, phone number, address, and event details solely for executing your floral decoration and dispatching order confirmations. We never sell or share your contact information with external marketing companies.
          </p>
        </section>
      </div>
    </div>
  );
}
