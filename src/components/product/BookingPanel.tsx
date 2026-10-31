"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Calendar,
  Clock,
  MapPin,
  CheckCircle2,
  AlertCircle,
  ShieldAlert,
  Sparkles,
  ShoppingBag,
  MessageCircle,
  HelpCircle,
} from "lucide-react";
import { Decoration, AddOn, CartItem } from "@/types";
import { siteConfig } from "@/config/site";
import { useCart } from "@/context/CartContext";
import { useCity } from "@/context/CityContext";
import { useAdmin } from "@/context/AdminContext";

interface BookingPanelProps {
  decoration: Decoration;
  selectedAddons: { addon: AddOn; quantity: number }[];
}

export const BookingPanel: React.FC<BookingPanelProps> = ({
  decoration,
  selectedAddons,
}) => {
  const router = useRouter();
  const { addToCart, setIsCartOpen } = useCart();
  const { selectedCity, setSelectedCity, deliveryFee } = useCity();
  const { sameDayCutoffHour, fixedTimeFee, blockedDates, advancePaymentPercent } = useAdmin();

  // Date and Time calculation based on IST (UTC+5:30)
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [deliveryType, setDeliveryType] = useState<"slot" | "custom3hr" | "fixed">("slot");
  const [selectedSlot, setSelectedSlot] = useState<string>(
    siteConfig.bookingRules.standardSlots[0].timeRange
  );
  const [custom3HourSlot, setCustom3HourSlot] = useState<string>("04:00 PM – 07:00 PM");
  const [fixedTime, setFixedTime] = useState<string>("17:30"); // 5:30 PM
  const [bannerMessage, setBannerMessage] = useState<string>("");
  const [pincode, setPincode] = useState<string>("");
  const [pincodeStatus, setPincodeStatus] = useState<"idle" | "valid" | "invalid">("idle");
  const [pincodeCity, setPincodeCity] = useState<string>("");

  // Live countdown to cutoff time (4:00 PM IST)
  const [isSameDayAllowed, setIsSameDayAllowed] = useState<boolean>(true);
  const [cutoffCountdown, setCutoffCountdown] = useState<string>("");

  useEffect(() => {
    const updateCountdown = () => {
      // Calculate current IST time
      const now = new Date();
      const utc = now.getTime() + now.getTimezoneOffset() * 60000;
      const istTime = new Date(utc + 3600000 * 5.5);

      const istHours = istTime.getHours();
      const istMinutes = istTime.getMinutes();
      const istSeconds = istTime.getSeconds();

      const todayStr = istTime.toISOString().split("T")[0];

      if (istHours < sameDayCutoffHour) {
        setIsSameDayAllowed(true);
        const remainingHours = sameDayCutoffHour - 1 - istHours;
        const remainingMinutes = 59 - istMinutes;
        const remainingSeconds = 59 - istSeconds;
        setCutoffCountdown(
          `${remainingHours}h ${remainingMinutes}m ${remainingSeconds}s`
        );
      } else {
        setIsSameDayAllowed(false);
        setCutoffCountdown("");
      }

      // Default selected date if empty
      if (!selectedDate) {
        if (istHours < sameDayCutoffHour) {
          setSelectedDate(todayStr);
        } else {
          // Tomorrow
          const tomorrow = new Date(istTime);
          tomorrow.setDate(tomorrow.getDate() + 1);
          setSelectedDate(tomorrow.toISOString().split("T")[0]);
        }
      }
    };

    updateCountdown();
    const timer = setInterval(updateCountdown, 1000);
    return () => clearInterval(timer);
  }, [sameDayCutoffHour, selectedDate]);

  // Pincode validation for Delhi NCR
  const handlePincodeCheck = () => {
    const cleanPin = pincode.trim();
    if (!cleanPin || cleanPin.length !== 6) {
      setPincodeStatus("invalid");
      return;
    }

    // Delhi: 11xxxx, Gurgaon: 122xxx, Noida: 2013xx, Ghaziabad: 2010xx, Faridabad: 121xxx
    let foundCity = "";
    if (cleanPin.startsWith("11")) foundCity = "Delhi";
    else if (cleanPin.startsWith("122")) foundCity = "Gurgaon";
    else if (cleanPin.startsWith("2013")) foundCity = "Noida";
    else if (cleanPin.startsWith("2010")) foundCity = "Ghaziabad";
    else if (cleanPin.startsWith("121")) foundCity = "Faridabad";

    if (foundCity) {
      setPincodeStatus("valid");
      setPincodeCity(foundCity);
      setSelectedCity(foundCity);
    } else {
      setPincodeStatus("invalid");
    }
  };

  // Price calculations
  const basePrice = decoration.price;
  const addonsPrice = selectedAddons.reduce(
    (sum, item) => sum + item.addon.price * item.quantity,
    0
  );
  const fixedTimeExtra = deliveryType === "fixed" ? fixedTimeFee : 0;
  const totalAmount = basePrice + addonsPrice + fixedTimeExtra + deliveryFee;
  const advanceAmount = Math.round((totalAmount * advancePaymentPercent) / 100);
  const balanceAmount = totalAmount - advanceAmount;

  // Selected date status
  const todayStr = new Date().toISOString().split("T")[0];
  const isSelectedDateToday = selectedDate === todayStr;
  const isDateBlocked = blockedDates.includes(selectedDate);

  const handleBooking = (redirectCheckout: boolean = false) => {
    let slotVal = selectedSlot;
    if (deliveryType === "fixed") {
      slotVal = `Exact Time: ${fixedTime}`;
    } else if (deliveryType === "custom3hr") {
      slotVal = custom3HourSlot;
    }

    const bookingDetails: CartItem["bookingDetails"] = {
      date: selectedDate,
      city: pincodeCity || selectedCity,
      slotType: deliveryType,
      slotValue: slotVal,
      pincode: pincode || "110001",
      locationType: decoration.locationType,
      bannerMessage: bannerMessage.trim() || undefined,
    };

    addToCart(decoration, bookingDetails, selectedAddons);

    if (redirectCheckout) {
      setIsCartOpen(false);
      router.push("/checkout");
    }
  };

  // WhatsApp prefilled booking message
  const whatsappMsg = `Hi Bloomora Decor! I want to book '${decoration.name}' (₹${decoration.price}) for ${selectedDate} in ${selectedCity}.\nSlot: ${
    deliveryType === "fixed" ? `Fixed Time ${fixedTime}` : deliveryType === "custom3hr" ? custom3HourSlot : selectedSlot
  }\nTotal Estimate: ₹${totalAmount}`;

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-7 border border-rose-200/80 shadow-xl space-y-6">
      {/* Price Header */}
      <div className="flex items-baseline justify-between border-b border-rose-100 pb-4">
        <div>
          <span className="text-xs font-semibold text-stone-500 uppercase tracking-wider block">
            Starting Price
          </span>
          <div className="flex items-baseline gap-2">
            <span className="font-serif text-3xl sm:text-4xl font-extrabold text-stone-900">
              ₹{decoration.price.toLocaleString()}
            </span>
            {decoration.originalPrice > decoration.price && (
              <span className="text-sm text-stone-400 line-through">
                ₹{decoration.originalPrice.toLocaleString()}
              </span>
            )}
            <span className="text-xs font-bold text-rose-600 bg-rose-50 px-2 py-0.5 rounded-full">
              {decoration.discountPercent}% OFF
            </span>
          </div>
        </div>
        <div className="text-right">
          <span className="text-[11px] text-stone-500 block">Advance to Book</span>
          <span className="font-serif text-xl font-bold text-rose-700">
            ₹{advanceAmount.toLocaleString()}
          </span>
        </div>
      </div>

      {/* Same-day countdown alert */}
      <div className="rounded-2xl p-3.5 bg-gradient-to-r from-amber-50 to-rose-50 border border-amber-200/70 text-xs text-stone-800 space-y-1">
        <div className="flex items-center justify-between font-bold">
          <span className="flex items-center gap-1.5 text-amber-800">
            <Clock className="w-4 h-4 text-amber-600" />
            <span>Same-Day Decoration Status</span>
          </span>
          {isSameDayAllowed ? (
            <span className="text-rose-600 font-extrabold animate-pulse">
              Closes in {cutoffCountdown}
            </span>
          ) : (
            <span className="text-stone-500 font-semibold">Closed for Today</span>
          )}
        </div>
        <p className="text-[11px] text-stone-600">
          {isSameDayAllowed
            ? `Book before 4:00 PM IST for guaranteed setup today in Delhi NCR.`
            : `Same-day booking closes at 4 PM — choose tomorrow or any upcoming date.`}
        </p>
      </div>

      {/* Date Picker */}
      <div className="space-y-2">
        <label className="text-xs font-bold text-stone-800 uppercase tracking-wider flex items-center justify-between">
          <span className="flex items-center gap-1.5">
            <Calendar className="w-4 h-4 text-rose-500" />
            <span>1. Select Celebration Date</span>
          </span>
          {isSelectedDateToday && isSameDayAllowed && (
            <span className="text-[10px] text-emerald-700 bg-emerald-100 font-extrabold px-2 py-0.5 rounded-full">
              ⚡ Same-Day Delivery
            </span>
          )}
        </label>
        <input
          type="date"
          min={isSameDayAllowed ? todayStr : new Date(Date.now() + 86400000).toISOString().split("T")[0]}
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          className="w-full px-4 py-2.5 rounded-xl border border-stone-200 text-sm font-semibold text-stone-800 focus:outline-none focus:ring-2 focus:ring-rose-500/30 focus:border-rose-500"
        />

        {/* Date notice */}
        {isDateBlocked && (
          <p className="text-xs text-rose-600 font-bold flex items-center gap-1">
            <AlertCircle className="w-3.5 h-3.5" />
            <span>This date is fully booked. Please select another slot.</span>
          </p>
        )}
      </div>

      {/* Slot Type Toggle */}
      <div className="space-y-3">
        <label className="text-xs font-bold text-stone-800 uppercase tracking-wider flex items-center gap-1.5">
          <Clock className="w-4 h-4 text-rose-500" />
          <span>2. Choose Delivery / Setup Time</span>
        </label>

        {/* 3 Delivery Modes */}
        <div className="grid grid-cols-3 gap-1.5 bg-stone-100 p-1 rounded-2xl text-xs font-semibold">
          <button
            type="button"
            onClick={() => setDeliveryType("slot")}
            className={`py-2 px-1 rounded-xl transition-all text-center ${
              deliveryType === "slot"
                ? "bg-white text-stone-900 shadow-sm"
                : "text-stone-500 hover:text-stone-800"
            }`}
          >
            4-Hour Slots
          </button>
          <button
            type="button"
            onClick={() => setDeliveryType("custom3hr")}
            className={`py-2 px-1 rounded-xl transition-all text-center ${
              deliveryType === "custom3hr"
                ? "bg-white text-stone-900 shadow-sm"
                : "text-stone-500 hover:text-stone-800"
            }`}
          >
            3-Hour Window
          </button>
          <button
            type="button"
            onClick={() => setDeliveryType("fixed")}
            className={`py-2 px-1 rounded-xl transition-all text-center ${
              deliveryType === "fixed"
                ? "bg-white text-stone-900 shadow-sm"
                : "text-stone-500 hover:text-stone-800"
            }`}
          >
            Fixed Time (+₹{fixedTimeFee})
          </button>
        </div>

        {/* Mode A: Standard 4-Hour Slots */}
        {deliveryType === "slot" && (
          <div className="space-y-2">
            {siteConfig.bookingRules.standardSlots.map((slot) => (
              <label
                key={slot.id}
                onClick={() => setSelectedSlot(slot.timeRange)}
                className={`flex items-center justify-between p-3 rounded-xl border cursor-pointer transition-all ${
                  selectedSlot === slot.timeRange
                    ? "bg-rose-50 border-rose-400 text-rose-950 font-semibold"
                    : "bg-white border-stone-200 text-stone-700 hover:bg-stone-50"
                }`}
              >
                <div className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="booking_slot"
                    checked={selectedSlot === slot.timeRange}
                    onChange={() => setSelectedSlot(slot.timeRange)}
                    className="text-rose-600 focus:ring-rose-500"
                  />
                  <span className="text-xs sm:text-sm">{slot.label}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-stone-500">{slot.timeRange}</span>
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      slot.status === "Available"
                        ? "bg-emerald-100 text-emerald-800"
                        : slot.status === "Few left"
                        ? "bg-amber-100 text-amber-800"
                        : "bg-stone-200 text-stone-600"
                    }`}
                  >
                    {slot.status}
                  </span>
                </div>
              </label>
            ))}
          </div>
        )}

        {/* Mode B: 3-Hour Window Selection */}
        {deliveryType === "custom3hr" && (
          <div className="space-y-2 bg-stone-50 p-3 rounded-2xl border border-stone-200">
            <p className="text-xs text-stone-600">
              Pick your preferred 3-hour decoration window within operating hours (10 AM to 10 PM):
            </p>
            <select
              value={custom3HourSlot}
              onChange={(e) => setCustom3HourSlot(e.target.value)}
              className="w-full p-2.5 rounded-xl border border-stone-300 text-xs font-semibold text-stone-800 bg-white"
            >
              <option value="10:00 AM – 01:00 PM">10:00 AM – 01:00 PM (Morning)</option>
              <option value="01:00 PM – 04:00 PM">01:00 PM – 04:00 PM (Afternoon)</option>
              <option value="04:00 PM – 07:00 PM">04:00 PM – 07:00 PM (Early Evening)</option>
              <option value="07:00 PM – 10:00 PM">07:00 PM – 10:00 PM (Night Surprise)</option>
            </select>
          </div>
        )}

        {/* Mode C: Fixed Time Delivery */}
        {deliveryType === "fixed" && (
          <div className="space-y-2 bg-amber-50/60 p-3.5 rounded-2xl border border-amber-200">
            <div className="flex items-center justify-between text-xs font-bold text-amber-900">
              <span>Exact Setup Finish Time</span>
              <span className="bg-amber-200 text-amber-900 px-2 py-0.5 rounded-full text-[10px]">
                +₹{fixedTimeFee} Upgrade
              </span>
            </div>
            <p className="text-[11px] text-stone-600">
              Our decorators will arrive well in advance to finish the entire setup by this exact minute before your guests arrive:
            </p>
            <input
              type="time"
              value={fixedTime}
              onChange={(e) => setFixedTime(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-amber-300 text-sm font-bold bg-white text-stone-800"
            />
          </div>
        )}
      </div>

      {/* Pincode & Delhi NCR Check */}
      <div className="space-y-2">
        <label className="text-xs font-bold text-stone-800 uppercase tracking-wider flex items-center justify-between">
          <span className="flex items-center gap-1.5">
            <MapPin className="w-4 h-4 text-rose-500" />
            <span>3. Check Delhi NCR Delivery</span>
          </span>
          <span className="text-[11px] text-stone-400 font-normal">
            Delhi, Noida, Gurgaon, Ghaziabad, Faridabad
          </span>
        </label>
        <div className="flex gap-2">
          <input
            type="text"
            maxLength={6}
            placeholder="Enter 6-digit Pincode (e.g. 110001, 122002)"
            value={pincode}
            onChange={(e) => {
              setPincode(e.target.value.replace(/\D/g, ""));
              setPincodeStatus("idle");
            }}
            className="flex-1 px-3.5 py-2 rounded-xl border border-stone-200 text-xs font-semibold text-stone-800 focus:outline-none focus:ring-2 focus:ring-rose-500"
          />
          <button
            type="button"
            onClick={handlePincodeCheck}
            className="px-4 py-2 bg-stone-900 hover:bg-stone-800 text-white font-semibold text-xs rounded-xl transition-colors"
          >
            Check
          </button>
        </div>

        {/* Pincode Feedback */}
        {pincodeStatus === "valid" && (
          <div className="flex items-center gap-2 text-xs text-emerald-700 bg-emerald-50 border border-emerald-200 p-2.5 rounded-xl font-medium">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>
              Hurray! We decorate in <b>{pincodeCity}</b> (Delivery: {deliveryFee === 0 ? "FREE" : `₹${deliveryFee}`}).
            </span>
          </div>
        )}
        {pincodeStatus === "invalid" && (
          <div className="flex items-center gap-2 text-xs text-rose-700 bg-rose-50 border border-rose-200 p-2.5 rounded-xl font-medium">
            <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
            <span>
              Bloomora currently decorates exclusively across Delhi & Delhi NCR pincodes (11xxxx, 122xxx, 2013xx, 2010xx, 121xxx).
            </span>
          </div>
        )}
      </div>

      {/* Banner / Message Customization */}
      <div className="space-y-1.5">
        <label className="text-xs font-bold text-stone-800 uppercase tracking-wider flex items-center justify-between">
          <span>4. Banner / Name Message</span>
          <span className="text-[10px] text-stone-400 font-normal">Optional</span>
        </label>
        <input
          type="text"
          placeholder="e.g. Happy 30th Birthday Rahul! or Welcome Baby Riya"
          value={bannerMessage}
          onChange={(e) => setBannerMessage(e.target.value)}
          className="w-full px-3.5 py-2 rounded-xl border border-stone-200 text-xs text-stone-800 focus:outline-none focus:ring-2 focus:ring-rose-500"
        />
      </div>

      {/* Cancellation Policy Box */}
      <div className="p-3.5 rounded-2xl bg-stone-50 border border-stone-200/80 text-xs text-stone-600 space-y-1.5">
        <div className="flex items-center gap-1.5 font-bold text-stone-800">
          <ShieldAlert className="w-4 h-4 text-rose-600" />
          <span>Flexible Cancellation Policy:</span>
        </div>
        <ul className="text-[11px] text-stone-500 space-y-1 list-disc pl-4">
          <li><b>100% Free Cancellation</b> if cancelled 48+ hours before the event.</li>
          <li><b>50% Advance Refund</b> if cancelled between 24 and 48 hours.</li>
          <li>No refund within 24 hours as perishable flowers are prepped.</li>
        </ul>
      </div>

      {/* Live Booking Summary Table */}
      <div className="p-4 rounded-2xl bg-cream-50 border border-rose-100 space-y-2 text-xs">
        <h4 className="font-bold text-stone-900 uppercase tracking-wider text-[11px]">
          Booking Summary
        </h4>
        <div className="flex justify-between text-stone-600">
          <span>Base Decoration</span>
          <span>₹{basePrice.toLocaleString()}</span>
        </div>
        {addonsPrice > 0 && (
          <div className="flex justify-between text-stone-600">
            <span>Selected Add-ons ({selectedAddons.length})</span>
            <span>+₹{addonsPrice.toLocaleString()}</span>
          </div>
        )}
        {fixedTimeExtra > 0 && (
          <div className="flex justify-between text-stone-600">
            <span>Fixed Time Delivery</span>
            <span>+₹{fixedTimeExtra.toLocaleString()}</span>
          </div>
        )}
        <div className="flex justify-between text-stone-600">
          <span>Delivery ({selectedCity})</span>
          <span>{deliveryFee === 0 ? "FREE" : `₹${deliveryFee}`}</span>
        </div>
        <div className="pt-2 border-t border-rose-200/70 flex justify-between font-extrabold text-stone-900 text-sm">
          <span>Estimated Total</span>
          <span>₹{totalAmount.toLocaleString()}</span>
        </div>

        {/* 30% Advance breakdown */}
        <div className="mt-2 pt-2 border-t border-rose-200/70 grid grid-cols-2 gap-2 text-center">
          <div className="p-2 bg-rose-600 text-white rounded-xl">
            <span className="text-[10px] block opacity-90">Pay Now ({advancePaymentPercent}%)</span>
            <span className="font-bold text-sm">₹{advanceAmount.toLocaleString()}</span>
          </div>
          <div className="p-2 bg-white text-stone-800 border border-rose-200 rounded-xl">
            <span className="text-[10px] block text-stone-500">Pay on Delivery</span>
            <span className="font-bold text-sm">₹{balanceAmount.toLocaleString()}</span>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="space-y-2.5 pt-1">
        <button
          onClick={() => handleBooking(true)}
          disabled={isDateBlocked}
          className="w-full flex items-center justify-center gap-2 py-3.5 px-6 rounded-2xl bg-rose-600 hover:bg-rose-700 disabled:bg-stone-300 text-white font-bold text-sm shadow-md hover:shadow-xl transition-all"
        >
          <Sparkles className="w-4 h-4 text-amber-300" />
          <span>Book Now (Pay ₹{advanceAmount.toLocaleString()} Advance)</span>
        </button>

        <button
          onClick={() => handleBooking(false)}
          disabled={isDateBlocked}
          className="w-full flex items-center justify-center gap-2 py-3 px-6 rounded-2xl bg-white hover:bg-stone-50 border border-stone-300 text-stone-800 font-bold text-xs transition-colors"
        >
          <ShoppingBag className="w-4 h-4 text-stone-600" />
          <span>Add to Cart</span>
        </button>

        {/* WhatsApp prefilled booking */}
        <a
          href={`https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent(whatsappMsg)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-2xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-300 font-semibold text-xs transition-colors"
        >
          <MessageCircle className="w-4 h-4 text-emerald-600" />
          <span>Book on WhatsApp Directly</span>
        </a>
      </div>
    </div>
  );
};
