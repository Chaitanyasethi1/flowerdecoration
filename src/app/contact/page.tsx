"use client";

import React, { useState } from "react";
import { Phone, Mail, Clock, MapPin, MessageCircle, Send, CheckCircle2 } from "lucide-react";
import { siteConfig } from "@/config/site";

export default function ContactPage() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <div className="py-12 bg-cream-50/40 min-h-screen">
      <div className="container mx-auto px-4 max-w-5xl space-y-12">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-100 text-rose-800 text-xs font-bold uppercase tracking-wider">
            <span>Direct Concierge</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl font-extrabold text-stone-900 tracking-tight">
            We&apos;re Here to Help You Celebrate
          </h1>
          <p className="text-sm text-stone-600">
            Reach out via phone, WhatsApp, or visit our studio workshops in Gurgaon and South Delhi.
          </p>
        </div>

        {/* 2-Column Info & Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Cards */}
          <div className="lg:col-span-5 space-y-4">
            <div className="p-6 rounded-3xl bg-white border border-stone-200/80 shadow-xs space-y-4">
              <h3 className="font-serif font-bold text-lg text-stone-900">
                Contact Details
              </h3>

              <div className="space-y-3 text-xs sm:text-sm text-stone-700">
                <a
                  href={`tel:${siteConfig.phone}`}
                  className="flex items-center gap-3 p-3 rounded-2xl bg-stone-50 hover:bg-rose-50 transition-colors"
                >
                  <div className="w-10 h-10 rounded-xl bg-rose-100 text-rose-600 flex items-center justify-center shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[11px] text-stone-400 font-bold uppercase block">
                      Call Direct
                    </span>
                    <span className="font-bold text-stone-900">{siteConfig.phoneDisplay}</span>
                  </div>
                </a>

                <a
                  href={`https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent(
                    "Hi Bloomora, I want to inquire about a decoration."
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3 rounded-2xl bg-emerald-50/60 hover:bg-emerald-100/60 transition-colors border border-emerald-200"
                >
                  <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
                    <MessageCircle className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[11px] text-emerald-700 font-bold uppercase block">
                      WhatsApp Instant Desk
                    </span>
                    <span className="font-bold text-emerald-900">{siteConfig.whatsappDisplay}</span>
                  </div>
                </a>

                <a
                  href={`mailto:${siteConfig.email}`}
                  className="flex items-center gap-3 p-3 rounded-2xl bg-stone-50 hover:bg-rose-50 transition-colors"
                >
                  <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[11px] text-stone-400 font-bold uppercase block">
                      Email Us
                    </span>
                    <span className="font-bold text-stone-900">{siteConfig.email}</span>
                  </div>
                </a>

                <div className="flex items-center gap-3 p-3 rounded-2xl bg-stone-50">
                  <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center shrink-0">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[11px] text-stone-400 font-bold uppercase block">
                      Operating Hours
                    </span>
                    <span className="font-semibold text-stone-900">{siteConfig.timing}</span>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 rounded-2xl bg-stone-50">
                  <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center shrink-0 mt-0.5">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[11px] text-stone-400 font-bold uppercase block">
                      Flagship Hubs
                    </span>
                    <span className="font-medium text-stone-700 text-xs leading-relaxed block">
                      {siteConfig.address}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Inquiry Form */}
          <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-3xl border border-stone-200/80 shadow-xs">
            <h3 className="font-serif font-bold text-xl text-stone-900 mb-2">
              Send an Online Inquiry
            </h3>
            <p className="text-xs text-stone-500 mb-6">
              Fill in your event details and our lead florist will reach out promptly.
            </p>

            {sent ? (
              <div className="p-8 text-center space-y-3 bg-emerald-50 rounded-2xl border border-emerald-200">
                <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
                <h4 className="font-serif font-bold text-lg text-stone-900">
                  Message Sent Successfully!
                </h4>
                <p className="text-xs text-stone-600">
                  Thank you, {name}! Our team will call or WhatsApp you within 15 minutes during operating hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                <div>
                  <label className="font-bold text-stone-800 uppercase block mb-1">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Ananya Mehra"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-stone-200 text-stone-900"
                  />
                </div>

                <div>
                  <label className="font-bold text-stone-800 uppercase block mb-1">
                    Phone / WhatsApp Number *
                  </label>
                  <input
                    type="tel"
                    required
                    maxLength={10}
                    placeholder="10-digit mobile number"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value.replace(/\D/g, ""))}
                    className="w-full p-2.5 rounded-xl border border-stone-200 text-stone-900 font-semibold"
                  />
                </div>

                <div>
                  <label className="font-bold text-stone-800 uppercase block mb-1">
                    Your Message / Query *
                  </label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Tell us about the occasion, date, and preferred decoration design..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-stone-200 text-stone-900"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 bg-rose-600 hover:bg-rose-700 text-white font-bold text-sm rounded-2xl shadow-md transition-all flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span>Send Inquiry</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
