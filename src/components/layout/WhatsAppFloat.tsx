"use client";

import React, { useState } from "react";
import { MessageCircle, X, Send, Sparkles } from "lucide-react";
import { siteConfig } from "@/config/site";

export const WhatsAppFloat: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [userMsg, setUserMsg] = useState("");

  const quickReplies = [
    { label: "🌸 Same-day available?", text: "Hi Bloomora, do you have a same-day flower decoration slot available today in Delhi NCR?" },
    { label: "⏰ Time slots?", text: "Hi, could you share the available time slots for decoration delivery?" },
    { label: "❌ Cancel booking", text: "Hi, I have a query regarding cancelling/rescheduling an existing booking." },
    { label: "💰 Custom quote", text: "Hi Bloomora, I want a custom quote for a grand wedding/haldi setup." },
  ];

  const handleSend = (textToSend?: string) => {
    const text = textToSend || userMsg;
    if (!text.trim()) return;
    const url = `https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent(text.trim())}`;
    window.open(url, "_blank");
    setIsOpen(false);
    setUserMsg("");
  };

  return (
    <div className="fixed bottom-6 right-6 z-40 hidden md:block">
      {isOpen ? (
        <div className="w-80 bg-white rounded-3xl shadow-2xl border border-rose-100 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
          {/* Header */}
          <div className="bg-gradient-to-r from-emerald-600 to-emerald-700 p-4 text-white flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative w-10 h-10 rounded-full bg-white/20 flex items-center justify-center font-bold text-lg">
                🌸
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-300 border-2 border-emerald-700 rounded-full" />
              </div>
              <div>
                <h4 className="font-bold text-sm leading-tight">Bloomora Florist Desk</h4>
                <p className="text-[11px] text-emerald-100">Usually replies within 2 mins</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white/80 hover:text-white p-1 rounded-full hover:bg-emerald-800/40"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Chat Body */}
          <div className="p-4 bg-stone-50 space-y-3">
            <div className="bg-white p-3 rounded-2xl rounded-tl-none shadow-xs border border-stone-200/60 max-w-[85%] text-xs text-stone-800 space-y-1">
              <p className="font-medium text-stone-900">
                Namaste! 🙏 Welcome to Bloomora Decor.
              </p>
              <p className="text-stone-600">
                How may we help you design your celebration today? Pick a quick option below or message us directly:
              </p>
            </div>

            {/* Quick replies */}
            <div className="space-y-1.5 pt-1">
              <p className="text-[11px] font-semibold text-stone-400 uppercase tracking-wider">
                Quick Inquiries:
              </p>
              <div className="flex flex-col gap-1.5">
                {quickReplies.map((qr, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSend(qr.text)}
                    className="text-left text-xs bg-emerald-50 hover:bg-emerald-100/80 text-emerald-800 font-medium px-3 py-1.5 rounded-xl border border-emerald-200/60 transition-colors flex items-center justify-between group"
                  >
                    <span>{qr.label}</span>
                    <span className="text-[10px] text-emerald-600 opacity-0 group-hover:opacity-100 transition-opacity">
                      Send →
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Input Box */}
          <div className="p-3 bg-white border-t border-stone-100 flex items-center gap-2">
            <input
              type="text"
              placeholder="Type your message..."
              value={userMsg}
              onChange={(e) => setUserMsg(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              className="flex-1 text-xs px-3 py-2 bg-stone-50 rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
            <button
              onClick={() => handleSend()}
              className="p-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white transition-colors"
              aria-label="Send WhatsApp message"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      ) : (
        <button
          onClick={() => setIsOpen(true)}
          className="group flex items-center gap-2 px-4 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
          aria-label="Chat with Bloomora on WhatsApp"
        >
          <div className="relative">
            <MessageCircle className="w-6 h-6 fill-white text-emerald-600" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-amber-300 rounded-full animate-ping" />
          </div>
          <span className="font-bold text-sm tracking-wide">Chat on WhatsApp</span>
        </button>
      )}
    </div>
  );
};
