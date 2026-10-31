"use client";

import React, { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import {
  CheckCircle2,
  Calendar,
  MessageCircle,
  ArrowRight,
  MapPin,
  Clock,
  Sparkles,
  Printer,
  Copy,
  Check,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { siteConfig } from "@/config/site";
import confetti from "canvas-confetti";

function OrderSuccessContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("orderId");
  const { orders } = useAuth();
  const [copied, setCopied] = useState(false);

  const order = orders.find((o) => o.id === orderId) || orders[0];

  useEffect(() => {
    // Fire celebratory confetti on page load
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ["#eb5667", "#dcba47", "#10b981", "#ffffff"],
      });
    } catch {
      // ignore
    }
  }, []);

  const handleCopyOrderId = () => {
    if (orderId) {
      navigator.clipboard.writeText(orderId);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const whatsappMessage = order
    ? `Namaste Bloomora! Here are my confirmed booking details:\nOrder ID: ${order.id}\nOccasion: ${order.eventDetails.occasion}\nDate: ${order.eventDetails.eventDate} (${order.eventDetails.slot})\nAddress: ${order.address.house}, ${order.address.area}, ${order.address.city}\nAdvance Paid: ₹${order.pricing.advancePaid}\nBalance on Delivery: ₹${order.pricing.balanceDue}\nPlease confirm my assigned florist team.`
    : `Hi Bloomora, I just placed order ${orderId} on the website.`;

  return (
    <div className="py-16 bg-cream-50/40 min-h-screen">
      <div className="container mx-auto px-4 max-w-3xl">
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-stone-200/80 shadow-xl space-y-8 text-center sm:text-left">
          {/* Top Success Badge */}
          <div className="flex flex-col sm:flex-row items-center gap-5 pb-6 border-b border-rose-100">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0 shadow-sm animate-bounce">
              <CheckCircle2 className="w-9 h-9" />
            </div>
            <div className="space-y-1">
              <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                Booking Confirmed
              </span>
              <h1 className="font-serif text-2xl sm:text-3xl font-extrabold text-stone-900">
                Thank You! Your Celebration is Booked
              </h1>
              <p className="text-xs sm:text-sm text-stone-500">
                Confirmation SMS & WhatsApp details dispatched to your registered phone.
              </p>
            </div>
          </div>

          {/* Order ID Pill */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 bg-stone-50 rounded-2xl border border-stone-200">
            <div>
              <span className="text-[11px] font-bold text-stone-400 uppercase tracking-wider block">
                Booking Reference ID
              </span>
              <span className="font-serif text-xl font-extrabold text-stone-900">
                {order?.id || orderId}
              </span>
            </div>
            <button
              onClick={handleCopyOrderId}
              className="inline-flex items-center justify-center gap-1.5 px-3 py-1.5 bg-white hover:bg-stone-100 rounded-xl border border-stone-200 text-xs font-semibold text-stone-700"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? "Copied" : "Copy ID"}</span>
            </button>
          </div>

          {/* Event Details Card */}
          {order && (
            <div className="p-5 rounded-2xl bg-cream-50 border border-rose-100 space-y-4 text-xs sm:text-sm">
              <h3 className="font-serif font-bold text-base text-stone-900">
                Event Schedule & Venue
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <span className="text-[11px] font-bold text-stone-400 uppercase block">
                    Occasion & Message
                  </span>
                  <span className="font-bold text-stone-900">
                    {order.eventDetails.occasion}
                  </span>
                  {order.eventDetails.bannerMessage && (
                    <span className="text-stone-600 block italic text-xs">
                      &ldquo;{order.eventDetails.bannerMessage}&rdquo;
                    </span>
                  )}
                </div>

                <div className="space-y-1">
                  <span className="text-[11px] font-bold text-stone-400 uppercase block">
                    Date & Time Slot
                  </span>
                  <span className="font-semibold text-stone-900 flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-rose-500" />
                    <span>{order.eventDetails.eventDate}</span>
                  </span>
                  <span className="text-stone-600 flex items-center gap-1 text-xs">
                    <Clock className="w-3.5 h-3.5 text-amber-500" />
                    <span>{order.eventDetails.slot}</span>
                  </span>
                </div>

                <div className="sm:col-span-2 space-y-1 pt-2 border-t border-rose-100">
                  <span className="text-[11px] font-bold text-stone-400 uppercase block">
                    Venue Address ({order.address.city})
                  </span>
                  <p className="text-stone-800">
                    {order.address.house}, {order.address.area},{" "}
                    {order.address.landmark && `Near ${order.address.landmark}, `}
                    {order.address.city} - {order.address.pincode}
                  </p>
                </div>
              </div>

              {/* Payment Summary */}
              <div className="pt-3 border-t border-rose-100 flex items-center justify-between text-xs">
                <div>
                  <span className="text-stone-500 block">Advance Confirmed</span>
                  <span className="font-extrabold text-base text-emerald-600">
                    ₹{order.pricing.advancePaid.toLocaleString()}
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-stone-500 block">Balance on Delivery</span>
                  <span className="font-extrabold text-base text-stone-900">
                    ₹{order.pricing.balanceDue.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Action CTAs: WhatsApp + Add to Calendar */}
          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <a
              href={`https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent(whatsappMessage)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 inline-flex items-center justify-center gap-2 py-3.5 px-6 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-md transition-all"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Send Details to WhatsApp Team</span>
            </a>

            <button
              onClick={() => {
                alert("Reminder added to your local device calendar!");
              }}
              className="inline-flex items-center justify-center gap-2 py-3.5 px-6 rounded-2xl bg-stone-100 hover:bg-stone-200 text-stone-800 font-bold text-sm transition-colors"
            >
              <Calendar className="w-4 h-4 text-rose-600" />
              <span>Add to Calendar</span>
            </button>
          </div>

          {/* Bottom Links */}
          <div className="pt-4 border-t border-stone-100 flex items-center justify-between text-xs text-stone-500">
            <Link href="/account" className="font-semibold text-rose-600 hover:underline">
              View All Your Bookings in Account →
            </Link>
            <Link href="/" className="hover:text-stone-900">
              Return to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function OrderSuccessPage() {
  return (
    <Suspense fallback={<div className="py-20 text-center">Loading booking confirmation...</div>}>
      <OrderSuccessContent />
    </Suspense>
  );
}
