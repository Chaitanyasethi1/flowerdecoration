"use client";

import React, { useState } from "react";
import { Sparkles, Send, MessageCircle, CheckCircle2, UploadCloud, Calendar, MapPin, Users } from "lucide-react";
import { siteConfig } from "@/config/site";
import { occasionsData } from "@/data/occasions";

export default function CustomQuotePage() {
  const [occasion, setOccasion] = useState(occasionsData[0].name);
  const [eventDate, setEventDate] = useState("");
  const [budget, setBudget] = useState("₹15,000 – ₹25,000");
  const [guestCount, setGuestCount] = useState("50 – 100 Guests");
  const [locationCity, setLocationCity] = useState("Gurgaon");
  const [colorTheme, setColorTheme] = useState("Blush Pink & Gold");
  const [notes, setNotes] = useState("");
  const [fileName, setFileName] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const whatsappMessage = `Hi Bloomora Decor! I would like a custom decoration quote:
- Occasion: ${occasion}
- Event Date: ${eventDate || "Flexible"}
- Target Budget: ${budget}
- Guest Count: ${guestCount}
- Location: ${locationCity}
- Preferred Color Theme: ${colorTheme}
- Notes: ${notes || "None"}
Please share design concepts and cost estimate.`;

  return (
    <div className="py-12 bg-cream-50/40 min-h-screen">
      <div className="container mx-auto px-4 max-w-3xl space-y-8">
        <div className="text-center max-w-xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-100 text-rose-800 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-rose-600" />
            <span>Bespoke Floral Concepts</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl font-extrabold text-stone-900 tracking-tight">
            Request a Custom Quote
          </h1>
          <p className="text-sm text-stone-600">
            Have a Pinterest moodboard or specific floral vision? Share your requirements and our master florists will build a tailored 3D proposal within 30 minutes.
          </p>
        </div>

        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-stone-200/80 shadow-xl">
          {submitted ? (
            <div className="py-12 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-9 h-9" />
              </div>
              <h3 className="font-serif text-2xl font-bold text-stone-900">
                Custom Proposal Request Received!
              </h3>
              <p className="text-xs sm:text-sm text-stone-600 max-w-md mx-auto">
                Our Senior Floral Stylist has received your details for <b>{occasion}</b> in <b>{locationCity}</b>. We will connect with moodboard options shortly.
              </p>
              <div className="pt-3">
                <a
                  href={`https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent(whatsappMessage)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-md"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Send Direct via WhatsApp</span>
                </a>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="font-bold text-stone-800 uppercase block mb-1">
                    Occasion *
                  </label>
                  <select
                    value={occasion}
                    onChange={(e) => setOccasion(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-stone-200 text-stone-900 bg-white"
                  >
                    {occasionsData.map((o) => (
                      <option key={o.id} value={o.name}>
                        {o.emoji} {o.name}
                      </option>
                    ))}
                    <option value="Other Bespoke">Custom Event</option>
                  </select>
                </div>

                <div>
                  <label className="font-bold text-stone-800 uppercase block mb-1">
                    Event Date *
                  </label>
                  <input
                    type="date"
                    required
                    value={eventDate}
                    onChange={(e) => setEventDate(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-stone-200 text-stone-900"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="font-bold text-stone-800 uppercase block mb-1">
                    Estimated Budget *
                  </label>
                  <select
                    value={budget}
                    onChange={(e) => setBudget(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-stone-200 text-stone-900 bg-white"
                  >
                    <option value="Under ₹10,000">Under ₹10,000</option>
                    <option value="₹10,000 – ₹25,000">₹10,000 – ₹25,000</option>
                    <option value="₹25,000 – ₹50,000">₹25,000 – ₹50,000</option>
                    <option value="₹50,000 – ₹1,00,000">₹50,000 – ₹1,00,000</option>
                    <option value="₹1,00,000+">₹1,00,000+ (Grand Wedding)</option>
                  </select>
                </div>

                <div>
                  <label className="font-bold text-stone-800 uppercase block mb-1">
                    Guest Count
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. 50 Guests"
                    value={guestCount}
                    onChange={(e) => setGuestCount(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-stone-200 text-stone-900"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="font-bold text-stone-800 uppercase block mb-1">
                    Venue City / Area *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. DLF Phase 5 Gurgaon or Vasant Kunj Delhi"
                    value={locationCity}
                    onChange={(e) => setLocationCity(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-stone-200 text-stone-900"
                  />
                </div>

                <div>
                  <label className="font-bold text-stone-800 uppercase block mb-1">
                    Theme / Color Preferences
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Lavender & White, Marigold Yellow"
                    value={colorTheme}
                    onChange={(e) => setColorTheme(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-stone-200 text-stone-900"
                  />
                </div>
              </div>

              {/* Reference Image Upload Box */}
              <div>
                <label className="font-bold text-stone-800 uppercase block mb-1">
                  Upload Reference Photo / Pinterest Screenshot (Optional)
                </label>
                <div className="p-5 border-2 border-dashed border-stone-200 rounded-2xl text-center bg-stone-50 hover:bg-stone-100/60 transition-colors cursor-pointer">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      if (e.target.files && e.target.files[0]) {
                        setFileName(e.target.files[0].name);
                      }
                    }}
                    className="hidden"
                    id="quote_file_input"
                  />
                  <label htmlFor="quote_file_input" className="cursor-pointer space-y-1 block">
                    <UploadCloud className="w-7 h-7 text-stone-400 mx-auto" />
                    <span className="text-xs font-semibold text-rose-600 block">
                      {fileName ? `Attached: ${fileName}` : "Click to select a reference image from your device"}
                    </span>
                    <span className="text-[10px] text-stone-400 block">PNG, JPG up to 10MB</span>
                  </label>
                </div>
              </div>

              <div>
                <label className="font-bold text-stone-800 uppercase block mb-1">
                  Additional Notes or Specific Flower Requests
                </label>
                <textarea
                  rows={3}
                  placeholder="Tell us about the space (ceiling height, indoor vs outdoor, special prop requests)..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-stone-200 text-stone-900"
                />
              </div>

              <div className="pt-2 flex flex-col sm:flex-row gap-3">
                <button
                  type="submit"
                  className="flex-1 py-3.5 bg-rose-600 hover:bg-rose-700 text-white font-bold text-sm rounded-2xl shadow-md transition-all flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span>Submit Custom Quote Request</span>
                </button>
                <a
                  href={`https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent(whatsappMessage)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-3.5 px-6 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm rounded-2xl shadow-md transition-all flex items-center justify-center gap-2"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Send on WhatsApp</span>
                </a>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
