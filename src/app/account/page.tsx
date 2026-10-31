"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  User,
  Phone,
  Mail,
  MapPin,
  Calendar,
  Clock,
  Package,
  Heart,
  LogOut,
  AlertCircle,
  CheckCircle2,
  X,
  Trash2,
  Plus,
  ArrowRight,
  ShieldAlert,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/context/CartContext";
import { decorationsData } from "@/data/decorations";
import { Order } from "@/types";

export default function AccountPage() {
  const {
    user,
    isLoggedIn,
    loginWithPhone,
    logout,
    addresses,
    addAddress,
    deleteAddress,
    orders,
    cancelOrder,
  } = useAuth();

  const { wishlist, removeFromCart } = useCart();

  // Login Form States
  const [phoneInput, setPhoneInput] = useState("");
  const [nameInput, setNameInput] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otpCode, setOtpCode] = useState("");

  // Tab State: "orders" | "addresses" | "wishlist"
  const [activeTab, setActiveTab] = useState<"orders" | "addresses" | "wishlist">("orders");

  // Cancellation Modal State
  const [cancellingOrder, setCancellingOrder] = useState<Order | null>(null);
  const [cancelReason, setCancelReason] = useState("Change of plans");
  const [cancelResult, setCancelResult] = useState<{ success: boolean; refundAmount: number; message: string } | null>(null);

  // Address Form Modal State
  const [showAddressModal, setShowAddressModal] = useState(false);
  const [newAddrHouse, setNewAddrHouse] = useState("");
  const [newAddrArea, setNewAddrArea] = useState("");
  const [newAddrCity, setNewAddrCity] = useState("Delhi");
  const [newAddrPincode, setNewAddrPincode] = useState("");

  // Handle Login flow
  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (phoneInput.length !== 10) {
      alert("Please enter a valid 10-digit Indian phone number.");
      return;
    }
    setOtpSent(true);
  };

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (otpCode === "1234" || otpCode.length === 4) {
      loginWithPhone(phoneInput, nameInput || "Host");
      setOtpSent(false);
    } else {
      alert("Please enter the 4-digit OTP '1234'.");
    }
  };

  const handleQuickDemoLogin = () => {
    loginWithPhone("9717212164", "Chaitanya K.", "chaitanya@example.com");
  };

  // Handle Order Cancellation
  const handleConfirmCancel = () => {
    if (!cancellingOrder) return;
    const result = cancelOrder(cancellingOrder.id, cancelReason);
    setCancelResult(result);
  };

  // Handle Save Address
  const handleSaveAddress = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAddrHouse || !newAddrArea || !newAddrPincode) {
      alert("Please fill all required address fields.");
      return;
    }
    addAddress({
      type: "Home",
      house: newAddrHouse,
      area: newAddrArea,
      city: newAddrCity,
      pincode: newAddrPincode,
    });
    setShowAddressModal(false);
    setNewAddrHouse("");
    setNewAddrArea("");
    setNewAddrPincode("");
  };

  // Wishlisted decorations
  const wishlistedItems = decorationsData.filter((d) => wishlist.includes(d.slug));

  // IF NOT LOGGED IN
  if (!isLoggedIn) {
    return (
      <div className="py-16 bg-cream-50/40 min-h-screen flex items-center justify-center">
        <div className="container mx-auto px-4 max-w-md">
          <div className="bg-white rounded-3xl p-8 border border-stone-200/80 shadow-xl space-y-6">
            <div className="text-center space-y-2">
              <div className="w-14 h-14 mx-auto rounded-full bg-rose-50 flex items-center justify-center text-rose-600">
                <User className="w-7 h-7" />
              </div>
              <h1 className="font-serif text-2xl font-bold text-stone-900">
                Host Sign In / Sign Up
              </h1>
              <p className="text-xs text-stone-500">
                Enter your mobile number to view active bookings, cancel orders, or track your assigned florist.
              </p>
            </div>

            {!otpSent ? (
              <form onSubmit={handleSendOtp} className="space-y-4">
                <div>
                  <label className="text-xs font-bold text-stone-700 uppercase tracking-wider block mb-1">
                    Your Name (Optional)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Rahul Sharma"
                    value={nameInput}
                    onChange={(e) => setNameInput(e.target.value)}
                    className="w-full px-4 py-2.5 text-sm rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-rose-500 text-stone-900"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-stone-700 uppercase tracking-wider block mb-1">
                    Phone Number *
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
                      value={phoneInput}
                      onChange={(e) => setPhoneInput(e.target.value.replace(/\D/g, ""))}
                      className="flex-1 px-4 py-2.5 text-sm rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-rose-500 font-semibold text-stone-900"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-2xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-sm shadow-md transition-all"
                >
                  Send Verification OTP
                </button>

                <div className="text-center pt-2">
                  <button
                    type="button"
                    onClick={handleQuickDemoLogin}
                    className="text-xs font-semibold text-rose-600 hover:underline"
                  >
                    ⚡ Quick Login with Demo Account
                  </button>
                </div>
              </form>
            ) : (
              <form onSubmit={handleVerifyOtp} className="space-y-4">
                <div className="p-3 bg-rose-50 rounded-xl text-xs text-rose-800">
                  <p>OTP sent to +91 {phoneInput}.</p>
                  <p className="font-bold mt-1">Mock OTP for instant test: <b>1234</b></p>
                </div>

                <div>
                  <label className="text-xs font-bold text-stone-700 uppercase tracking-wider block mb-1">
                    Enter 4-Digit OTP
                  </label>
                  <input
                    type="text"
                    required
                    maxLength={4}
                    placeholder="1234"
                    value={otpCode}
                    onChange={(e) => setOtpCode(e.target.value)}
                    className="w-full px-4 py-3 text-center tracking-widest text-lg font-bold rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-rose-500 text-stone-900"
                    autoFocus
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-2xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-sm shadow-md transition-all"
                >
                  Verify & Continue
                </button>

                <button
                  type="button"
                  onClick={() => setOtpSent(false)}
                  className="w-full text-xs text-stone-500 hover:underline text-center"
                >
                  Change phone number
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    );
  }

  // IF LOGGED IN
  return (
    <div className="py-10 bg-cream-50/40 min-h-screen">
      <div className="container mx-auto px-4 max-w-5xl">
        {/* User Card */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-stone-200/80 shadow-xs mb-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4 text-center sm:text-left">
            <div className="w-16 h-16 rounded-full bg-rose-100 flex items-center justify-center text-rose-600 font-bold text-2xl shrink-0">
              {user?.name.charAt(0) || "H"}
            </div>
            <div>
              <h1 className="font-serif text-2xl font-bold text-stone-900">
                {user?.name}
              </h1>
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 text-xs text-stone-500 mt-1">
                <span className="flex items-center gap-1">
                  <Phone className="w-3.5 h-3.5 text-rose-500" />
                  <span>+91 {user?.phone}</span>
                </span>
                <span>·</span>
                <span className="flex items-center gap-1">
                  <Mail className="w-3.5 h-3.5 text-stone-400" />
                  <span>{user?.email}</span>
                </span>
              </div>
            </div>
          </div>

          <button
            onClick={logout}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl border border-stone-200 hover:bg-stone-50 text-stone-600 text-xs font-semibold transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </button>
        </div>

        {/* Tabs Bar */}
        <div className="flex items-center gap-2 border-b border-stone-200 mb-8 overflow-x-auto no-scrollbar">
          <button
            onClick={() => setActiveTab("orders")}
            className={`py-3 px-5 text-sm font-bold border-b-2 transition-all flex items-center gap-2 ${
              activeTab === "orders"
                ? "border-rose-600 text-rose-600"
                : "border-transparent text-stone-500 hover:text-stone-900"
            }`}
          >
            <Package className="w-4 h-4" />
            <span>My Bookings ({orders.length})</span>
          </button>

          <button
            onClick={() => setActiveTab("addresses")}
            className={`py-3 px-5 text-sm font-bold border-b-2 transition-all flex items-center gap-2 ${
              activeTab === "addresses"
                ? "border-rose-600 text-rose-600"
                : "border-transparent text-stone-500 hover:text-stone-900"
            }`}
          >
            <MapPin className="w-4 h-4" />
            <span>Saved Addresses ({addresses.length})</span>
          </button>

          <button
            onClick={() => setActiveTab("wishlist")}
            className={`py-3 px-5 text-sm font-bold border-b-2 transition-all flex items-center gap-2 ${
              activeTab === "wishlist"
                ? "border-rose-600 text-rose-600"
                : "border-transparent text-stone-500 hover:text-stone-900"
            }`}
          >
            <Heart className="w-4 h-4" />
            <span>Wishlist ({wishlist.length})</span>
          </button>
        </div>

        {/* TAB 1: ORDERS */}
        {activeTab === "orders" && (
          <div className="space-y-6">
            {orders.length === 0 ? (
              <div className="p-12 text-center bg-white rounded-3xl border border-stone-200 space-y-3">
                <Package className="w-12 h-12 text-stone-300 mx-auto" />
                <h3 className="font-serif text-lg font-bold text-stone-900">
                  No bookings yet
                </h3>
                <p className="text-xs text-stone-500">
                  You haven&apos;t placed any decoration bookings yet.
                </p>
                <Link
                  href="/decorations/all"
                  className="inline-block px-5 py-2.5 bg-rose-600 text-white rounded-xl text-xs font-bold"
                >
                  Explore Decorations
                </Link>
              </div>
            ) : (
              orders.map((order) => {
                const isCancelled = order.orderStatus === "cancelled";
                return (
                  <div
                    key={order.id}
                    className="p-6 rounded-3xl bg-white border border-stone-200/80 shadow-xs space-y-4"
                  >
                    {/* Order Header */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-stone-100">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-serif font-bold text-base text-stone-900">
                            Order {order.id}
                          </span>
                          <span
                            className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${
                              isCancelled
                                ? "bg-rose-100 text-rose-800"
                                : order.orderStatus === "completed"
                                ? "bg-emerald-100 text-emerald-800"
                                : "bg-amber-100 text-amber-800"
                            }`}
                          >
                            {isCancelled ? "Cancelled" : order.orderStatus.toUpperCase()}
                          </span>
                        </div>
                        <p className="text-xs text-stone-400 mt-0.5">
                          Booked on {new Date(order.createdAt).toLocaleDateString()}
                        </p>
                      </div>

                      <div className="text-left sm:text-right">
                        <span className="text-xs text-stone-500 block">Total Amount</span>
                        <span className="font-serif text-lg font-bold text-stone-900">
                          ₹{order.pricing.total.toLocaleString()}
                        </span>
                      </div>
                    </div>

                    {/* Order Details Body */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-stone-700">
                      <div className="space-y-1 bg-stone-50 p-3 rounded-2xl">
                        <span className="text-[11px] font-bold text-stone-400 uppercase block">
                          Event & Slot
                        </span>
                        <p className="font-bold text-stone-900">
                          {order.eventDetails.occasion}
                        </p>
                        <p className="flex items-center gap-1 text-stone-600">
                          <Calendar className="w-3.5 h-3.5 text-rose-500" />
                          <span>{order.eventDetails.eventDate}</span>
                        </p>
                        <p className="flex items-center gap-1 text-stone-600">
                          <Clock className="w-3.5 h-3.5 text-amber-500" />
                          <span>{order.eventDetails.slot}</span>
                        </p>
                      </div>

                      <div className="space-y-1 bg-stone-50 p-3 rounded-2xl">
                        <span className="text-[11px] font-bold text-stone-400 uppercase block">
                          Venue Address ({order.address.city})
                        </span>
                        <p className="text-stone-800">
                          {order.address.house}, {order.address.area}, {order.address.city} - {order.address.pincode}
                        </p>
                        <p className="text-[11px] text-stone-500">
                          Payment: Advance Paid ₹{order.pricing.advancePaid.toLocaleString()} · Balance ₹{order.pricing.balanceDue.toLocaleString()}
                        </p>
                      </div>
                    </div>

                    {/* Cancellation info if cancelled */}
                    {isCancelled && (
                      <div className="p-3 bg-rose-50 border border-rose-200 rounded-2xl text-xs text-rose-900 space-y-1">
                        <p className="font-bold flex items-center gap-1">
                          <AlertCircle className="w-4 h-4 text-rose-600" />
                          <span>Booking Cancelled</span>
                        </p>
                        <p>
                          Reason: {order.cancelReason} · Refund Credited: ₹{order.refundAmount?.toLocaleString() || 0}
                        </p>
                      </div>
                    )}

                    {/* Order Actions */}
                    <div className="pt-2 flex flex-wrap items-center justify-between gap-3">
                      <a
                        href={`https://wa.me/919717212164?text=${encodeURIComponent(
                          `Hi Bloomora, regarding my booking #${order.id}...`
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs font-semibold text-emerald-700 hover:underline"
                      >
                        Need Help on WhatsApp →
                      </a>

                      {!isCancelled && order.orderStatus !== "completed" && (
                        <button
                          onClick={() => {
                            setCancellingOrder(order);
                            setCancelResult(null);
                          }}
                          className="px-4 py-2 rounded-xl border border-rose-200 text-rose-600 hover:bg-rose-50 text-xs font-semibold transition-colors"
                        >
                          Cancel Booking & Refund
                        </button>
                      )}
                    </div>
                  </div>
                );
              })
            )}
          </div>
        )}

        {/* TAB 2: ADDRESSES */}
        {activeTab === "addresses" && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="font-serif font-bold text-lg text-stone-900">
                Your Saved Delivery Addresses
              </h3>
              <button
                onClick={() => setShowAddressModal(true)}
                className="inline-flex items-center gap-1.5 px-4 py-2 bg-rose-600 text-white rounded-xl text-xs font-bold hover:bg-rose-700"
              >
                <Plus className="w-4 h-4" />
                <span>Add New Address</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {addresses.map((addr) => (
                <div
                  key={addr.id}
                  className="p-5 rounded-3xl bg-white border border-stone-200/80 shadow-xs space-y-3 relative flex flex-col justify-between"
                >
                  <div className="space-y-1">
                    <span className="text-[11px] font-bold text-rose-600 bg-rose-50 px-2 py-0.5 rounded-md uppercase tracking-wider">
                      {addr.type}
                    </span>
                    <h4 className="font-bold text-sm text-stone-900 pt-1">
                      {addr.house}
                    </h4>
                    <p className="text-xs text-stone-600">
                      {addr.area}, {addr.city} - {addr.pincode}
                    </p>
                    {addr.landmark && (
                      <p className="text-xs text-stone-400">Landmark: {addr.landmark}</p>
                    )}
                  </div>

                  <div className="pt-3 border-t border-stone-100 flex justify-end">
                    <button
                      onClick={() => deleteAddress(addr.id)}
                      className="text-stone-400 hover:text-rose-600 text-xs flex items-center gap-1"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Remove</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: WISHLIST */}
        {activeTab === "wishlist" && (
          <div className="space-y-6">
            {wishlistedItems.length === 0 ? (
              <div className="p-12 text-center bg-white rounded-3xl border border-stone-200 space-y-3">
                <Heart className="w-12 h-12 text-stone-300 mx-auto" />
                <h3 className="font-serif text-lg font-bold text-stone-900">
                  Your Wishlist is Empty
                </h3>
                <p className="text-xs text-stone-500">
                  Tap the heart icon on any decoration card to save it for your next celebration.
                </p>
                <Link
                  href="/decorations/all"
                  className="inline-block px-5 py-2.5 bg-rose-600 text-white rounded-xl text-xs font-bold"
                >
                  Explore Designs
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {wishlistedItems.map((item) => (
                  <div
                    key={item.id}
                    className="p-4 rounded-3xl bg-white border border-stone-200 shadow-xs flex flex-col justify-between space-y-3"
                  >
                    <div className="relative h-44 w-full rounded-2xl overflow-hidden bg-stone-100">
                      <Image src={item.images[0]} alt={item.name} fill className="object-cover" />
                    </div>
                    <div>
                      <span className="text-[10px] font-bold text-rose-600 uppercase tracking-wider">
                        {item.occasion}
                      </span>
                      <h4 className="font-serif font-bold text-base text-stone-900 truncate">
                        {item.name}
                      </h4>
                      <p className="font-extrabold text-sm text-stone-900 mt-1">
                        ₹{item.price.toLocaleString()}
                      </p>
                    </div>
                    <Link
                      href={`/decoration/${item.slug}`}
                      className="w-full py-2 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-bold text-center block transition-colors"
                    >
                      View & Book
                    </Link>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* CANCELLATION MODAL */}
        {cancellingOrder && (
          <div className="fixed inset-0 z-50 bg-stone-900/60 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl max-w-md w-full p-6 space-y-5 shadow-2xl border border-stone-200 animate-in zoom-in-95">
              <div className="flex items-center justify-between pb-3 border-b border-stone-100">
                <h3 className="font-serif font-bold text-lg text-stone-900 flex items-center gap-2">
                  <ShieldAlert className="w-5 h-5 text-rose-600" />
                  <span>Cancel Booking #{cancellingOrder.id}</span>
                </h3>
                <button
                  onClick={() => setCancellingOrder(null)}
                  className="p-1 rounded-full text-stone-400 hover:text-stone-700"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {!cancelResult ? (
                <>
                  <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-xs text-amber-900 space-y-1.5">
                    <p className="font-bold">Cancellation Policy Summary:</p>
                    <ul className="list-disc pl-4 space-y-1 text-stone-600 text-[11px]">
                      <li><b>&gt; 48 hours before slot:</b> 100% advance refund.</li>
                      <li><b>24 to 48 hours before slot:</b> 50% advance refund.</li>
                      <li><b>&lt; 24 hours:</b> Non-refundable due to fresh floral procurement.</li>
                    </ul>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-stone-700 uppercase tracking-wider block">
                      Select Cancellation Reason
                    </label>
                    <select
                      value={cancelReason}
                      onChange={(e) => setCancelReason(e.target.value)}
                      className="w-full p-2.5 rounded-xl border border-stone-300 text-xs text-stone-800 bg-white"
                    >
                      <option value="Change of plans">Change of plans / Personal emergency</option>
                      <option value="Date postponed">Event date postponed</option>
                      <option value="Booked another setup">Want to book a different decoration</option>
                      <option value="Found alternative">Other</option>
                    </select>
                  </div>

                  <div className="flex gap-2 pt-2">
                    <button
                      type="button"
                      onClick={() => setCancellingOrder(null)}
                      className="flex-1 py-2.5 rounded-xl border border-stone-300 font-bold text-xs text-stone-700 hover:bg-stone-50"
                    >
                      Keep Booking
                    </button>
                    <button
                      type="button"
                      onClick={handleConfirmCancel}
                      className="flex-1 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 font-bold text-xs text-white"
                    >
                      Confirm Cancellation
                    </button>
                  </div>
                </>
              ) : (
                <div className="space-y-4 py-2 text-center">
                  <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-7 h-7" />
                  </div>
                  <h4 className="font-serif font-bold text-base text-stone-900">
                    Cancellation Confirmed
                  </h4>
                  <p className="text-xs text-stone-600">
                    {cancelResult.message}
                  </p>
                  {cancelResult.refundAmount > 0 && (
                    <div className="p-3 bg-emerald-50 rounded-xl text-xs font-bold text-emerald-800">
                      Refund Amount: ₹{cancelResult.refundAmount.toLocaleString()} credited back to source.
                    </div>
                  )}
                  <button
                    type="button"
                    onClick={() => setCancellingOrder(null)}
                    className="w-full py-2.5 bg-stone-900 text-white rounded-xl text-xs font-bold"
                  >
                    Done
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ADD ADDRESS MODAL */}
        {showAddressModal && (
          <div className="fixed inset-0 z-50 bg-stone-900/60 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl max-w-md w-full p-6 space-y-4 shadow-2xl border border-stone-200">
              <div className="flex items-center justify-between border-b border-stone-100 pb-3">
                <h3 className="font-serif font-bold text-base text-stone-900">
                  Add Delivery Address
                </h3>
                <button
                  onClick={() => setShowAddressModal(false)}
                  className="p-1 rounded-full text-stone-400 hover:text-stone-700"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSaveAddress} className="space-y-3 text-xs">
                <div>
                  <label className="font-bold text-stone-700 block mb-1">
                    House / Flat / Tower *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Flat 302, Tower B"
                    value={newAddrHouse}
                    onChange={(e) => setNewAddrHouse(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-stone-200 text-stone-900"
                  />
                </div>
                <div>
                  <label className="font-bold text-stone-700 block mb-1">
                    Area / Street *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Sector 50"
                    value={newAddrArea}
                    onChange={(e) => setNewAddrArea(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-stone-200 text-stone-900"
                  />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="font-bold text-stone-700 block mb-1">City</label>
                    <select
                      value={newAddrCity}
                      onChange={(e) => setNewAddrCity(e.target.value)}
                      className="w-full p-2.5 rounded-xl border border-stone-200 text-stone-900 bg-white"
                    >
                      <option value="Delhi">Delhi</option>
                      <option value="Gurgaon">Gurgaon</option>
                      <option value="Noida">Noida</option>
                      <option value="Ghaziabad">Ghaziabad</option>
                      <option value="Faridabad">Faridabad</option>
                    </select>
                  </div>
                  <div>
                    <label className="font-bold text-stone-700 block mb-1">Pincode *</label>
                    <input
                      type="text"
                      required
                      maxLength={6}
                      placeholder="e.g. 110001"
                      value={newAddrPincode}
                      onChange={(e) => setNewAddrPincode(e.target.value.replace(/\D/g, ""))}
                      className="w-full p-2.5 rounded-xl border border-stone-200 text-stone-900 font-semibold"
                    />
                  </div>
                </div>

                <div className="pt-2 flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setShowAddressModal(false)}
                    className="px-4 py-2 border border-stone-300 rounded-xl text-stone-700 font-bold"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 bg-rose-600 text-white rounded-xl font-bold hover:bg-rose-700"
                  >
                    Save Address
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
