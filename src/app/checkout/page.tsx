"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  ShieldCheck,
  CheckCircle2,
  Lock,
  ArrowRight,
  ArrowLeft,
  Calendar,
  Clock,
  MapPin,
  CreditCard,
  QrCode,
  Sparkles,
  Phone,
  User,
  Home,
  Building,
} from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { useCity } from "@/context/CityContext";
import { siteConfig } from "@/config/site";
import { Order } from "@/types";

export default function CheckoutPage() {
  const router = useRouter();
  const {
    cart,
    subtotal,
    addonsTotal,
    fixedTimeChargesTotal,
    deliveryFee,
    discount,
    grandTotal,
    advanceToPay,
    balanceDue,
    appliedCoupon,
    clearCart,
  } = useCart();
  const { user, isLoggedIn, addOrder, addresses } = useAuth();
  const { selectedCity } = useCity();

  // Multi-step Checkout Tracker (1 to 5)
  const [step, setStep] = useState<number>(1);

  // Step 1: Contact
  const [name, setName] = useState(user?.name || "");
  const [phone, setPhone] = useState(user?.phone || "");
  const [email, setEmail] = useState(user?.email || "");

  // Step 2: Event Details
  const defaultItem = cart[0];
  const [occasion, setOccasion] = useState(defaultItem?.decoration.occasion || "Birthday");
  const [bannerText, setBannerText] = useState(
    defaultItem?.bookingDetails.bannerMessage || ""
  );

  // Step 3: Address
  const defaultAddr = addresses[0];
  const [house, setHouse] = useState(defaultAddr?.house || "");
  const [area, setArea] = useState(defaultAddr?.area || "");
  const [city, setCity] = useState(defaultAddr?.city || selectedCity || "Delhi");
  const [pincode, setPincode] = useState(defaultAddr?.pincode || defaultItem?.bookingDetails.pincode || "110001");
  const [landmark, setLandmark] = useState(defaultAddr?.landmark || "");
  const [locationType, setLocationType] = useState<"Home" | "Hall" | "Office" | "Outdoor">(
    (defaultItem?.decoration.locationType as any) || "Home"
  );
  const [floorLift, setFloorLift] = useState(defaultAddr?.floorLift || "Ground floor / Lift available");

  // Step 4: Schedule
  const [eventDate, setEventDate] = useState(
    defaultItem?.bookingDetails.date || new Date().toISOString().split("T")[0]
  );
  const [slot, setSlot] = useState(defaultItem?.bookingDetails.slotValue || "02:00 PM – 06:00 PM");

  // Step 5: Payment
  const [paymentOption, setPaymentOption] = useState<"advance" | "full">("advance");
  const [paymentMethod, setPaymentMethod] = useState<"upi" | "card" | "netbanking" | "pod">("upi");
  const [upiId, setUpiId] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  // If cart is empty and not processing
  if (cart.length === 0 && !isProcessing) {
    return (
      <div className="py-20 text-center space-y-4">
        <h2 className="font-serif text-2xl font-bold text-stone-900">Your cart is empty</h2>
        <Link href="/decorations/all" className="inline-block px-6 py-2.5 bg-rose-600 text-white rounded-xl text-sm font-semibold">
          Explore Decorations
        </Link>
      </div>
    );
  }

  const amountToCharge = paymentOption === "advance" ? advanceToPay : grandTotal;

  const handleCompleteOrder = () => {
    setIsProcessing(true);

    const orderId = `BLM-${Math.floor(10000 + Math.random() * 90000)}`;

    const newOrder: Order = {
      id: orderId,
      items: cart,
      customer: {
        name: name || "Celebration Host",
        phone: phone || "9717212164",
        email: email || "customer@bloomora.com",
      },
      eventDetails: {
        occasion,
        bannerMessage: bannerText,
        eventDate,
        slot,
      },
      address: {
        house,
        area,
        city,
        pincode,
        landmark,
        locationType,
        floorLift,
      },
      pricing: {
        subtotal,
        addonsTotal,
        fixedTimeCharge: fixedTimeChargesTotal,
        deliveryCharge: deliveryFee,
        discount,
        total: grandTotal,
        advancePaid: amountToCharge,
        balanceDue: paymentOption === "advance" ? balanceDue : 0,
        couponCode: appliedCoupon?.code,
      },
      paymentMethod,
      paymentStatus: paymentOption === "full" ? "fully_paid" : "advance_paid",
      orderStatus: "confirmed",
      createdAt: new Date().toISOString(),
    };

    setTimeout(() => {
      addOrder(newOrder);
      clearCart();
      router.push(`/order-success?orderId=${orderId}`);
    }, 1200);
  };

  const stepsList = [
    { num: 1, label: "Contact" },
    { num: 2, label: "Event" },
    { num: 3, label: "Address" },
    { num: 4, label: "Schedule" },
    { num: 5, label: "Payment" },
  ];

  return (
    <div className="py-10 bg-cream-50/40 min-h-screen">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header */}
        <div className="text-center max-w-xl mx-auto mb-8 space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-bold uppercase tracking-wider border border-emerald-200">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>256-Bit SSL Encrypted Checkout</span>
          </div>
          <h1 className="font-serif text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight">
            Confirm Your Celebration Booking
          </h1>
        </div>

        {/* Stepper Wizard Bar */}
        <div className="mb-10 max-w-3xl mx-auto">
          <div className="flex items-center justify-between relative">
            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-stone-200 -z-0" />
            <div
              className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-rose-600 transition-all duration-300 -z-0"
              style={{ width: `${((step - 1) / (stepsList.length - 1)) * 100}%` }}
            />
            {stepsList.map((s) => (
              <button
                key={s.num}
                type="button"
                onClick={() => s.num < step && setStep(s.num)}
                className={`relative z-10 flex flex-col items-center gap-1 group`}
              >
                <div
                  className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs transition-all ${
                    step === s.num
                      ? "bg-rose-600 text-white shadow-md ring-4 ring-rose-100 scale-110"
                      : s.num < step
                      ? "bg-emerald-600 text-white"
                      : "bg-white text-stone-400 border border-stone-300"
                  }`}
                >
                  {s.num < step ? "✓" : s.num}
                </div>
                <span
                  className={`text-[11px] font-semibold hidden sm:inline ${
                    step === s.num ? "text-stone-900" : "text-stone-400"
                  }`}
                >
                  {s.label}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* 2-Column Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Form Area */}
          <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-3xl border border-stone-200/80 shadow-xs space-y-6">
            {/* STEP 1: CONTACT */}
            {step === 1 && (
              <div className="space-y-5 animate-in fade-in duration-200">
                <div>
                  <h3 className="font-serif text-lg font-bold text-stone-900">
                    Step 1: Contact Details
                  </h3>
                  <p className="text-xs text-stone-500">
                    Where we should send order confirmation and dispatch updates
                  </p>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="text-xs font-bold text-stone-700 uppercase tracking-wider block mb-1">
                      Your Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Rahul Sharma"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-4 py-2.5 text-sm rounded-xl border border-stone-200 text-stone-900 focus:outline-none focus:ring-2 focus:ring-rose-500"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-stone-700 uppercase tracking-wider block mb-1">
                      Mobile Number (WhatsApp) *
                    </label>
                    <div className="flex gap-2">
                      <span className="px-3.5 py-2.5 rounded-xl bg-stone-100 border border-stone-200 text-stone-600 text-sm font-semibold">
                        +91
                      </span>
                      <input
                        type="tel"
                        required
                        maxLength={10}
                        placeholder="10-digit mobile number"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value.replace(/\D/g, ""))}
                        className="flex-1 px-4 py-2.5 text-sm rounded-xl border border-stone-200 text-stone-900 focus:outline-none focus:ring-2 focus:ring-rose-500 font-semibold"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-stone-700 uppercase tracking-wider block mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="name@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-4 py-2.5 text-sm rounded-xl border border-stone-200 text-stone-900 focus:outline-none focus:ring-2 focus:ring-rose-500"
                    />
                  </div>
                </div>

                <div className="pt-4 flex justify-end">
                  <button
                    type="button"
                    onClick={() => {
                      if (!name || !phone) {
                        alert("Please fill your Name and Mobile Number");
                        return;
                      }
                      setStep(2);
                    }}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs sm:text-sm shadow-md"
                  >
                    <span>Continue to Event Info</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 2: EVENT DETAILS */}
            {step === 2 && (
              <div className="space-y-5 animate-in fade-in duration-200">
                <div>
                  <h3 className="font-serif text-lg font-bold text-stone-900">
                    Step 2: Event Information
                  </h3>
                  <p className="text-xs text-stone-500">
                    Personalize your decor message and neon sign
                  </p>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="text-xs font-bold text-stone-700 uppercase tracking-wider block mb-1">
                      Celebration Occasion
                    </label>
                    <select
                      value={occasion}
                      onChange={(e) => setOccasion(e.target.value)}
                      className="w-full px-4 py-2.5 text-sm rounded-xl border border-stone-200 text-stone-900 focus:outline-none focus:ring-2 focus:ring-rose-500 bg-white"
                    >
                      <option value="Birthday">Birthday 🎂</option>
                      <option value="Anniversary">Anniversary 💍</option>
                      <option value="Wedding">Wedding 💒</option>
                      <option value="Haldi & Mehndi">Haldi & Mehndi 🌼</option>
                      <option value="Baby Shower">Baby Shower 👶</option>
                      <option value="Welcome Baby">Welcome Baby 🍼</option>
                      <option value="Naming Ceremony">Naming Ceremony ✨</option>
                      <option value="Engagement">Engagement 💎</option>
                      <option value="Griha Pravesh">Griha Pravesh 🪔</option>
                      <option value="First Night">First Night 🌹</option>
                      <option value="Proposal">Proposal 💖</option>
                      <option value="Corporate">Corporate 🏢</option>
                      <option value="Festival">Festival 🎆</option>
                      <option value="Pooja & Mandir">Pooja & Mandir 🙏</option>
                      <option value="Car Decoration">Car Decoration 🚗</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-stone-700 uppercase tracking-wider block mb-1">
                      Name / Message for Banner or Neon (Optional)
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Happy 30th Birthday Rahul! or Welcome Little Princess"
                      value={bannerText}
                      onChange={(e) => setBannerText(e.target.value)}
                      className="w-full px-4 py-2.5 text-sm rounded-xl border border-stone-200 text-stone-900 focus:outline-none focus:ring-2 focus:ring-rose-500"
                    />
                  </div>
                </div>

                <div className="pt-4 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-stone-600 hover:text-stone-900 text-xs font-semibold"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Back</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setStep(3)}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs sm:text-sm shadow-md"
                  >
                    <span>Continue to Venue Address</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 3: ADDRESS */}
            {step === 3 && (
              <div className="space-y-5 animate-in fade-in duration-200">
                <div>
                  <h3 className="font-serif text-lg font-bold text-stone-900">
                    Step 3: Venue & Decoration Address
                  </h3>
                  <p className="text-xs text-stone-500">
                    Delhi NCR location where our floral crew should assemble the setup
                  </p>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="text-xs font-bold text-stone-700 uppercase tracking-wider block mb-1">
                      House / Flat / Villa / Banquet Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Flat 802, Tower 4, DLF The Crest"
                      value={house}
                      onChange={(e) => setHouse(e.target.value)}
                      className="w-full px-4 py-2.5 text-sm rounded-xl border border-stone-200 text-stone-900 focus:outline-none focus:ring-2 focus:ring-rose-500"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs font-bold text-stone-700 uppercase tracking-wider block mb-1">
                        Area / Sector / Street *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Golf Course Road, Sector 54"
                        value={area}
                        onChange={(e) => setArea(e.target.value)}
                        className="w-full px-4 py-2.5 text-sm rounded-xl border border-stone-200 text-stone-900 focus:outline-none focus:ring-2 focus:ring-rose-500"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-bold text-stone-700 uppercase tracking-wider block mb-1">
                        Pincode (Delhi NCR) *
                      </label>
                      <input
                        type="text"
                        required
                        maxLength={6}
                        placeholder="e.g. 122002"
                        value={pincode}
                        onChange={(e) => setPincode(e.target.value.replace(/\D/g, ""))}
                        className="w-full px-4 py-2.5 text-sm rounded-xl border border-stone-200 text-stone-900 focus:outline-none focus:ring-2 focus:ring-rose-500 font-semibold"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs font-bold text-stone-700 uppercase tracking-wider block mb-1">
                        City
                      </label>
                      <select
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        className="w-full px-4 py-2.5 text-sm rounded-xl border border-stone-200 text-stone-900 bg-white"
                      >
                        {siteConfig.cities.map((c) => (
                          <option key={c.id} value={c.name}>
                            {c.name} {c.deliveryFee === 0 ? "(Free Delivery)" : `(+₹${c.deliveryFee})`}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="text-xs font-bold text-stone-700 uppercase tracking-wider block mb-1">
                        Landmark (Optional)
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Near Horizon Center"
                        value={landmark}
                        onChange={(e) => setLandmark(e.target.value)}
                        className="w-full px-4 py-2.5 text-sm rounded-xl border border-stone-200 text-stone-900"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs font-bold text-stone-700 uppercase tracking-wider block mb-1">
                        Location Type
                      </label>
                      <select
                        value={locationType}
                        onChange={(e) => setLocationType(e.target.value as any)}
                        className="w-full px-4 py-2.5 text-sm rounded-xl border border-stone-200 text-stone-900 bg-white"
                      >
                        <option value="Home">Home (Living Room / Bedroom)</option>
                        <option value="Hall">Banquet Hall / Party Hall</option>
                        <option value="Outdoor">Outdoor / Terrace / Lawn</option>
                        <option value="Office">Corporate Office</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-xs font-bold text-stone-700 uppercase tracking-wider block mb-1">
                        Floor & Lift Accessibility
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. 8th floor (Lift available)"
                        value={floorLift}
                        onChange={(e) => setFloorLift(e.target.value)}
                        className="w-full px-4 py-2.5 text-sm rounded-xl border border-stone-200 text-stone-900"
                      />
                    </div>
                  </div>
                </div>

                <div className="pt-4 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-stone-600 hover:text-stone-900 text-xs font-semibold"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Back</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      if (!house || !area || !pincode) {
                        alert("Please fill House/Flat, Area, and Pincode");
                        return;
                      }
                      setStep(4);
                    }}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs sm:text-sm shadow-md"
                  >
                    <span>Continue to Schedule</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 4: SCHEDULE */}
            {step === 4 && (
              <div className="space-y-5 animate-in fade-in duration-200">
                <div>
                  <h3 className="font-serif text-lg font-bold text-stone-900">
                    Step 4: Confirm Date & Slot
                  </h3>
                  <p className="text-xs text-stone-500">
                    When should our florists arrive to begin decorating?
                  </p>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="text-xs font-bold text-stone-700 uppercase tracking-wider block mb-1">
                      Event Date
                    </label>
                    <input
                      type="date"
                      value={eventDate}
                      onChange={(e) => setEventDate(e.target.value)}
                      className="w-full px-4 py-2.5 text-sm rounded-xl border border-stone-200 text-stone-900 font-semibold"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-stone-700 uppercase tracking-wider block mb-1">
                      Decoration Time Slot
                    </label>
                    <select
                      value={slot}
                      onChange={(e) => setSlot(e.target.value)}
                      className="w-full px-4 py-2.5 text-sm rounded-xl border border-stone-200 text-stone-900 font-semibold bg-white"
                    >
                      <option value="10:00 AM – 02:00 PM">Morning Slot (10:00 AM – 02:00 PM)</option>
                      <option value="02:00 PM – 06:00 PM">Afternoon Slot (02:00 PM – 06:00 PM)</option>
                      <option value="06:00 PM – 10:00 PM">Evening Slot (06:00 PM – 10:00 PM)</option>
                      <option value="Exact Time: 05:30 PM">Fixed Time: 05:30 PM (+₹299)</option>
                    </select>
                  </div>

                  <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-200 text-xs text-emerald-800 space-y-1">
                    <p className="font-bold flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      <span>Guaranteed On-Time Arrival</span>
                    </p>
                    <p className="text-[11px] text-stone-600">
                      Our floral crew arrives with all frames, fresh flower crates, and equipment 1.5 - 2 hours before your target completion.
                    </p>
                  </div>
                </div>

                <div className="pt-4 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => setStep(3)}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-stone-600 hover:text-stone-900 text-xs font-semibold"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Back</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setStep(5)}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs sm:text-sm shadow-md"
                  >
                    <span>Proceed to Payment</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 5: PAYMENT */}
            {step === 5 && (
              <div className="space-y-6 animate-in fade-in duration-200">
                <div>
                  <h3 className="font-serif text-lg font-bold text-stone-900">
                    Step 5: Select Payment Option
                  </h3>
                  <p className="text-xs text-stone-500">
                    Choose advance confirmation or pay in full
                  </p>
                </div>

                {/* Advance vs Full Option Cards */}
                <div className="grid grid-cols-2 gap-3">
                  <div
                    onClick={() => setPaymentOption("advance")}
                    className={`p-4 rounded-2xl border-2 cursor-pointer transition-all ${
                      paymentOption === "advance"
                        ? "border-rose-600 bg-rose-50/70 shadow-sm"
                        : "border-stone-200 bg-white"
                    }`}
                  >
                    <span className="text-xs font-bold text-rose-700 uppercase tracking-wider block">
                      Pay 30% Advance (Recommended)
                    </span>
                    <span className="font-serif text-2xl font-extrabold text-stone-900 block mt-1">
                      ₹{advanceToPay.toLocaleString()}
                    </span>
                    <span className="text-[11px] text-stone-500">
                      Balance ₹{balanceDue.toLocaleString()} on delivery
                    </span>
                  </div>

                  <div
                    onClick={() => setPaymentOption("full")}
                    className={`p-4 rounded-2xl border-2 cursor-pointer transition-all ${
                      paymentOption === "full"
                        ? "border-rose-600 bg-rose-50/70 shadow-sm"
                        : "border-stone-200 bg-white"
                    }`}
                  >
                    <span className="text-xs font-bold text-stone-700 uppercase tracking-wider block">
                      Pay 100% Full Amount
                    </span>
                    <span className="font-serif text-2xl font-extrabold text-stone-900 block mt-1">
                      ₹{grandTotal.toLocaleString()}
                    </span>
                    <span className="text-[11px] text-emerald-600 font-semibold">
                      Zero balance on delivery
                    </span>
                  </div>
                </div>

                {/* Payment Method Selector */}
                <div className="space-y-2 pt-2">
                  <span className="text-xs font-bold text-stone-800 uppercase tracking-wider block">
                    Select Payment Gateway (Razorpay-ready Mock)
                  </span>

                  {/* UPI Option */}
                  <label
                    onClick={() => setPaymentMethod("upi")}
                    className={`flex items-start gap-3 p-3.5 rounded-2xl border cursor-pointer ${
                      paymentMethod === "upi"
                        ? "border-rose-500 bg-rose-50/40"
                        : "border-stone-200"
                    }`}
                  >
                    <input
                      type="radio"
                      name="payment_method"
                      checked={paymentMethod === "upi"}
                      onChange={() => setPaymentMethod("upi")}
                      className="mt-1 text-rose-600"
                    />
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className="text-xs sm:text-sm font-bold text-stone-900">
                          Instant UPI (GPay, PhonePe, Paytm, QR)
                        </span>
                        <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded">
                          Fastest
                        </span>
                      </div>
                      <p className="text-xs text-stone-500 mt-0.5">
                        Scan QR code or approve notification on your UPI app.
                      </p>
                    </div>
                  </label>

                  {/* Card Option */}
                  <label
                    onClick={() => setPaymentMethod("card")}
                    className={`flex items-start gap-3 p-3.5 rounded-2xl border cursor-pointer ${
                      paymentMethod === "card"
                        ? "border-rose-500 bg-rose-50/40"
                        : "border-stone-200"
                    }`}
                  >
                    <input
                      type="radio"
                      name="payment_method"
                      checked={paymentMethod === "card"}
                      onChange={() => setPaymentMethod("card")}
                      className="mt-1 text-rose-600"
                    />
                    <div className="flex-1">
                      <span className="text-xs sm:text-sm font-bold text-stone-900 block">
                        Credit / Debit Card (Visa, Mastercard, RuPay)
                      </span>
                      <p className="text-xs text-stone-500 mt-0.5">
                        Protected by 3D Secure OTP verification.
                      </p>
                    </div>
                  </label>

                  {/* POD with advance Option */}
                  <label
                    onClick={() => setPaymentMethod("pod")}
                    className={`flex items-start gap-3 p-3.5 rounded-2xl border cursor-pointer ${
                      paymentMethod === "pod"
                        ? "border-rose-500 bg-rose-50/40"
                        : "border-stone-200"
                    }`}
                  >
                    <input
                      type="radio"
                      name="payment_method"
                      checked={paymentMethod === "pod"}
                      onChange={() => setPaymentMethod("pod")}
                      className="mt-1 text-rose-600"
                    />
                    <div className="flex-1">
                      <span className="text-xs sm:text-sm font-bold text-stone-900 block">
                        Pay on Delivery (After Advance Confirmation)
                      </span>
                      <p className="text-xs text-stone-500 mt-0.5">
                        Pay the advance now to lock slot, and settle balance via cash/UPI post-setup.
                      </p>
                    </div>
                  </label>
                </div>

                <div className="pt-4 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => setStep(4)}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-stone-600 hover:text-stone-900 text-xs font-semibold"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Back</span>
                  </button>
                  <button
                    type="button"
                    onClick={handleCompleteOrder}
                    disabled={isProcessing}
                    className="inline-flex items-center gap-2 px-8 py-3.5 rounded-2xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-sm shadow-xl hover:shadow-2xl transition-all"
                  >
                    <Lock className="w-4 h-4 text-amber-300" />
                    <span>
                      {isProcessing
                        ? "Processing Payment..."
                        : `Pay ₹${amountToCharge.toLocaleString()} & Confirm Booking`}
                    </span>
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Right Summary Sidebar */}
          <div className="lg:col-span-5 bg-white p-6 rounded-3xl border border-stone-200 shadow-xs space-y-4 sticky top-24">
            <h3 className="font-serif font-bold text-base text-stone-900 uppercase tracking-wider border-b border-stone-100 pb-3">
              Order Summary ({cart.length} item{cart.length > 1 ? "s" : ""})
            </h3>

            {/* Items */}
            <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
              {cart.map((item) => (
                <div key={item.id} className="flex gap-3 text-xs">
                  <div className="relative w-14 h-14 rounded-xl overflow-hidden shrink-0 border border-stone-200">
                    <Image
                      src={item.decoration.images[0]}
                      alt={item.decoration.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-bold text-stone-900 truncate">
                      {item.decoration.name}
                    </h4>
                    <span className="text-stone-500 block">
                      {item.bookingDetails.date} · {item.bookingDetails.city}
                    </span>
                    <span className="font-bold text-stone-900">
                      ₹{item.decoration.price.toLocaleString()}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Bill Details */}
            <div className="pt-3 border-t border-stone-100 space-y-2 text-xs">
              <div className="flex justify-between text-stone-600">
                <span>Decorations Subtotal</span>
                <span>₹{subtotal.toLocaleString()}</span>
              </div>
              {addonsTotal > 0 && (
                <div className="flex justify-between text-stone-600">
                  <span>Add-ons</span>
                  <span>+₹{addonsTotal.toLocaleString()}</span>
                </div>
              )}
              {fixedTimeChargesTotal > 0 && (
                <div className="flex justify-between text-stone-600">
                  <span>Fixed Time Charge</span>
                  <span>+₹{fixedTimeChargesTotal.toLocaleString()}</span>
                </div>
              )}
              <div className="flex justify-between text-stone-600">
                <span>Delivery Charge</span>
                <span>{deliveryFee === 0 ? "FREE" : `₹${deliveryFee}`}</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-emerald-600 font-bold">
                  <span>Coupon Savings ({appliedCoupon?.code})</span>
                  <span>-₹{discount.toLocaleString()}</span>
                </div>
              )}
              <div className="pt-2 border-t border-stone-200 flex justify-between font-extrabold text-sm text-stone-900">
                <span>Total Amount</span>
                <span>₹{grandTotal.toLocaleString()}</span>
              </div>

              {/* Payment Split Highlight */}
              <div className="mt-3 p-3.5 rounded-2xl bg-rose-50 border border-rose-200 space-y-1">
                <div className="flex justify-between font-bold text-rose-700 text-xs">
                  <span>Amount to Charge Now</span>
                  <span>₹{amountToCharge.toLocaleString()}</span>
                </div>
                {paymentOption === "advance" && (
                  <div className="flex justify-between text-stone-500 text-[11px]">
                    <span>Balance Due on Delivery</span>
                    <span>₹{balanceDue.toLocaleString()}</span>
                  </div>
                )}
              </div>
            </div>

            <div className="text-[11px] text-stone-400 space-y-1 pt-1">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>100% Free cancellation 48h before event</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>GST invoice sent automatically to your email</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
