"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  Lock,
  LogOut,
  Package,
  Sparkles,
  Settings,
  Calendar,
  Tag,
  Plus,
  Trash2,
  Edit3,
  CheckCircle2,
  Clock,
  ShieldCheck,
  TrendingUp,
} from "lucide-react";
import { useAdmin } from "@/context/AdminContext";
import { useAuth } from "@/context/AuthContext";
import { siteConfig } from "@/config/site";
import { occasionsData } from "@/data/occasions";
import { Decoration } from "@/types";

export default function AdminPage() {
  const {
    isAdminLoggedIn,
    adminLogin,
    adminLogout,
    decorations,
    addDecoration,
    deleteDecoration,
    coupons,
    addCoupon,
    deleteCoupon,
    blockedDates,
    toggleBlockedDate,
    sameDayCutoffHour,
    setSameDayCutoffHour,
    advancePaymentPercent,
    setAdvancePaymentPercent,
    fixedTimeFee,
    setFixedTimeFee,
    updateOrderStatus,
    announcementText,
    setAnnouncementText,
  } = useAdmin();

  const { orders } = useAuth();

  // Login state
  const [passwordInput, setPasswordInput] = useState("");
  const [loginError, setLoginError] = useState(false);

  // Active Admin Tab: "orders" | "decorations" | "settings" | "coupons" | "blocked"
  const [activeTab, setActiveTab] = useState<
    "orders" | "decorations" | "settings" | "coupons" | "blocked"
  >("orders");

  // New Decoration Modal
  const [showAddModal, setShowAddModal] = useState(false);
  const [newName, setNewName] = useState("");
  const [newOccasion, setNewOccasion] = useState(occasionsData[0].name);
  const [newPrice, setNewPrice] = useState(3499);
  const [newMrp, setNewMrp] = useState(4999);
  const [newImage, setNewImage] = useState("https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&w=1000&q=80");
  const [newDesc, setNewDesc] = useState("");
  const [newInclusions, setNewInclusions] = useState("Metallic frame, Fresh roses, Neon flex light");

  // New Coupon Form
  const [newCouponCode, setNewCouponCode] = useState("");
  const [newCouponDiscount, setNewCouponDiscount] = useState(10);
  const [newCouponMin, setNewCouponMin] = useState(1999);

  // Blocked Date Form
  const [newBlockedDate, setNewBlockedDate] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const success = adminLogin(passwordInput);
    if (!success) {
      setLoginError(true);
    } else {
      setLoginError(false);
    }
  };

  const handleCreateDecoration = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName) return;

    const matchedOccasion = occasionsData.find(
      (o) => o.name.toLowerCase() === newOccasion.toLowerCase()
    ) || occasionsData[0];

    const newDec: Omit<Decoration, "id"> = {
      slug: newName.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
      name: newName,
      occasion: matchedOccasion.name,
      occasionSlug: matchedOccasion.slug,
      price: Number(newPrice),
      originalPrice: Number(newMrp),
      discountPercent: Math.round(((newMrp - newPrice) / newMrp) * 100),
      rating: 4.9,
      reviewsCount: 1,
      images: [newImage],
      isTrending: true,
      isSameDayAvailable: true,
      flowerType: ["Roses", "Carnations"],
      colorTheme: ["Pink & White"],
      hasBalloons: true,
      locationType: "Home",
      inclusions: newInclusions.split(",").map((s) => s.trim()),
      dimensions: "6 ft x 6 ft",
      setupTime: "2 hours",
      description: newDesc || `${newName} luxury decoration in Delhi NCR.`,
      careTips: ["Keep in cool air-conditioned space."],
    };

    addDecoration(newDec);
    setShowAddModal(false);
    setNewName("");
    setNewDesc("");
  };

  const handleCreateCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCouponCode) return;
    addCoupon({
      code: newCouponCode.toUpperCase().trim(),
      discountPercent: Number(newCouponDiscount),
      minOrder: Number(newCouponMin),
      validTill: "31 Dec 2026",
      description: `Get ${newCouponDiscount}% off on orders above ₹${newCouponMin}`,
    });
    setNewCouponCode("");
  };

  // IF NOT LOGGED IN
  if (!isAdminLoggedIn) {
    return (
      <div className="py-20 bg-cream-50/40 min-h-screen flex items-center justify-center">
        <div className="container mx-auto px-4 max-w-md">
          <div className="bg-white rounded-3xl p-8 border border-stone-200/80 shadow-2xl space-y-6">
            <div className="text-center space-y-2">
              <div className="w-14 h-14 mx-auto rounded-full bg-stone-900 text-white flex items-center justify-center">
                <Lock className="w-6 h-6" />
              </div>
              <h1 className="font-serif text-2xl font-bold text-stone-900">
                Bloomora Admin Portal
              </h1>
              <p className="text-xs text-stone-500">
                Manage live bookings, cutoff rules, blocked dates, and decoration inventory.
              </p>
            </div>

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="text-xs font-bold text-stone-700 uppercase tracking-wider block mb-1">
                  Master Password
                </label>
                <input
                  type="password"
                  required
                  placeholder="Enter admin password (e.g. bloomora123)"
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                  className="w-full px-4 py-2.5 text-sm rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-rose-500 text-stone-900"
                />
                <span className="text-[11px] text-stone-400 mt-1 block">
                  Default: <b>bloomora123</b> or <b>admin</b>
                </span>
              </div>

              {loginError && (
                <p className="text-xs text-rose-600 font-semibold">
                  Invalid password. Please use &lsquo;bloomora123&rsquo;.
                </p>
              )}

              <button
                type="submit"
                className="w-full py-3 rounded-2xl bg-stone-900 hover:bg-stone-800 text-white font-bold text-sm shadow-md transition-all"
              >
                Access Dashboard
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }

  // IF LOGGED IN
  return (
    <div className="py-8 bg-stone-50 min-h-screen">
      <div className="container mx-auto px-4 max-w-7xl space-y-6">
        {/* Top Navbar */}
        <div className="bg-white p-6 rounded-3xl border border-stone-200 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-rose-600 text-white flex items-center justify-center font-bold">
              B
            </div>
            <div>
              <h1 className="font-serif text-xl font-bold text-stone-900">
                Bloomora Operations Dashboard
              </h1>
              <span className="text-xs text-stone-500">
                Real-time Delhi NCR Booking & Decor Management
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs font-bold bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full">
              System Online
            </span>
            <button
              onClick={adminLogout}
              className="px-3.5 py-1.5 rounded-xl border border-stone-200 hover:bg-stone-100 text-xs font-semibold text-stone-700 flex items-center gap-1.5"
            >
              <LogOut className="w-4 h-4" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 border-b border-stone-200 overflow-x-auto no-scrollbar">
          <button
            onClick={() => setActiveTab("orders")}
            className={`py-3 px-5 text-sm font-bold border-b-2 transition-all flex items-center gap-2 ${
              activeTab === "orders"
                ? "border-rose-600 text-rose-600"
                : "border-transparent text-stone-500 hover:text-stone-900"
            }`}
          >
            <Package className="w-4 h-4" />
            <span>Customer Orders ({orders.length})</span>
          </button>

          <button
            onClick={() => setActiveTab("decorations")}
            className={`py-3 px-5 text-sm font-bold border-b-2 transition-all flex items-center gap-2 ${
              activeTab === "decorations"
                ? "border-rose-600 text-rose-600"
                : "border-transparent text-stone-500 hover:text-stone-900"
            }`}
          >
            <Sparkles className="w-4 h-4" />
            <span>Decorations Inventory ({decorations.length})</span>
          </button>

          <button
            onClick={() => setActiveTab("settings")}
            className={`py-3 px-5 text-sm font-bold border-b-2 transition-all flex items-center gap-2 ${
              activeTab === "settings"
                ? "border-rose-600 text-rose-600"
                : "border-transparent text-stone-500 hover:text-stone-900"
            }`}
          >
            <Settings className="w-4 h-4" />
            <span>Booking & Cutoff Rules</span>
          </button>

          <button
            onClick={() => setActiveTab("blocked")}
            className={`py-3 px-5 text-sm font-bold border-b-2 transition-all flex items-center gap-2 ${
              activeTab === "blocked"
                ? "border-rose-600 text-rose-600"
                : "border-transparent text-stone-500 hover:text-stone-900"
            }`}
          >
            <Calendar className="w-4 h-4" />
            <span>Blocked Dates ({blockedDates.length})</span>
          </button>

          <button
            onClick={() => setActiveTab("coupons")}
            className={`py-3 px-5 text-sm font-bold border-b-2 transition-all flex items-center gap-2 ${
              activeTab === "coupons"
                ? "border-rose-600 text-rose-600"
                : "border-transparent text-stone-500 hover:text-stone-900"
            }`}
          >
            <Tag className="w-4 h-4" />
            <span>Promo Coupons ({coupons.length})</span>
          </button>
        </div>

        {/* TAB 1: ORDERS */}
        {activeTab === "orders" && (
          <div className="bg-white rounded-3xl border border-stone-200 overflow-hidden shadow-xs">
            <div className="p-6 border-b border-stone-100 flex items-center justify-between">
              <div>
                <h2 className="font-serif font-bold text-lg text-stone-900">
                  Real-time Booking Requests
                </h2>
                <p className="text-xs text-stone-500">
                  Update status as your floral crews prepare and complete decorations on-site
                </p>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-stone-700">
                <thead className="bg-stone-50 text-[11px] font-bold text-stone-400 uppercase tracking-wider border-b border-stone-200">
                  <tr>
                    <th className="p-4">Order ID</th>
                    <th className="p-4">Customer</th>
                    <th className="p-4">Occasion & Slot</th>
                    <th className="p-4">Venue Address</th>
                    <th className="p-4">Payment</th>
                    <th className="p-4">Status Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100">
                  {orders.map((o) => (
                    <tr key={o.id} className="hover:bg-stone-50/50">
                      <td className="p-4 font-bold text-stone-900">{o.id}</td>
                      <td className="p-4">
                        <span className="font-semibold block text-stone-900">{o.customer.name}</span>
                        <span className="text-stone-400">{o.customer.phone}</span>
                      </td>
                      <td className="p-4">
                        <span className="font-semibold block text-rose-600">{o.eventDetails.occasion}</span>
                        <span>{o.eventDetails.eventDate} ({o.eventDetails.slot})</span>
                      </td>
                      <td className="p-4 max-w-xs">
                        <span className="block truncate">{o.address.house}, {o.address.area}</span>
                        <span className="text-stone-400">{o.address.city} - {o.address.pincode}</span>
                      </td>
                      <td className="p-4">
                        <span className="font-bold block text-stone-900">₹{o.pricing.total.toLocaleString()}</span>
                        <span className="text-emerald-600 font-semibold text-[11px]">
                          Advance: ₹{o.pricing.advancePaid.toLocaleString()}
                        </span>
                      </td>
                      <td className="p-4">
                        <select
                          value={o.orderStatus}
                          onChange={(e) => updateOrderStatus(o.id, e.target.value as any)}
                          className="p-1.5 rounded-lg border border-stone-300 text-xs font-semibold text-stone-800 bg-white"
                        >
                          <option value="new">New</option>
                          <option value="confirmed">Confirmed</option>
                          <option value="decorating">Decorating</option>
                          <option value="completed">Completed</option>
                          <option value="cancelled">Cancelled</option>
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 2: DECORATIONS CRUD */}
        {activeTab === "decorations" && (
          <div className="space-y-4">
            <div className="flex justify-between items-center bg-white p-5 rounded-3xl border border-stone-200">
              <div>
                <h2 className="font-serif font-bold text-lg text-stone-900">
                  Product Catalogue ({decorations.length})
                </h2>
                <p className="text-xs text-stone-500">
                  Manage live prices, images, and descriptions
                </p>
              </div>
              <button
                onClick={() => setShowAddModal(true)}
                className="inline-flex items-center gap-1.5 px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs rounded-xl"
              >
                <Plus className="w-4 h-4" />
                <span>Add Decoration</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {decorations.map((d) => (
                <div
                  key={d.id}
                  className="p-4 rounded-3xl bg-white border border-stone-200 shadow-xs flex gap-3 items-center justify-between"
                >
                  <div className="relative w-16 h-16 rounded-xl overflow-hidden shrink-0 bg-stone-100">
                    <Image src={d.images[0]} alt={d.name} fill className="object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="text-[10px] font-bold text-rose-600 uppercase">
                      {d.occasion}
                    </span>
                    <h4 className="font-bold text-sm text-stone-900 truncate">
                      {d.name}
                    </h4>
                    <span className="font-extrabold text-xs text-stone-900 block">
                      ₹{d.price.toLocaleString()}
                    </span>
                  </div>
                  <button
                    onClick={() => deleteDecoration(d.id)}
                    className="p-2 text-stone-400 hover:text-rose-600 transition-colors"
                    title="Delete product"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: BOOKING & CUTOFF RULES */}
        {activeTab === "settings" && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-xs max-w-2xl space-y-6">
            <div>
              <h2 className="font-serif font-bold text-lg text-stone-900">
                Operating Rules & Delivery Configurations
              </h2>
              <p className="text-xs text-stone-500">
                Changes apply instantly across product pages, cart, and checkout
              </p>
            </div>

            <div className="space-y-4 text-xs">
              <div>
                <label className="font-bold text-stone-800 uppercase block mb-1">
                  Same-Day Delivery Cutoff Hour (IST 24-hr format)
                </label>
                <input
                  type="number"
                  min={10}
                  max={22}
                  value={sameDayCutoffHour}
                  onChange={(e) => setSameDayCutoffHour(Number(e.target.value))}
                  className="w-full p-2.5 rounded-xl border border-stone-300 font-bold text-stone-900"
                />
                <span className="text-stone-400 text-[11px] mt-1 block">
                  Currently set to <b>{sameDayCutoffHour}:00 IST (4:00 PM)</b>. Customers booking after this hour are prompted to choose tomorrow.
                </span>
              </div>

              <div>
                <label className="font-bold text-stone-800 uppercase block mb-1">
                  Advance Payment Percentage (%)
                </label>
                <input
                  type="number"
                  min={10}
                  max={100}
                  value={advancePaymentPercent}
                  onChange={(e) => setAdvancePaymentPercent(Number(e.target.value))}
                  className="w-full p-2.5 rounded-xl border border-stone-300 font-bold text-stone-900"
                />
                <span className="text-stone-400 text-[11px] mt-1 block">
                  Default is 30%. The customer pays this advance to confirm the booking.
                </span>
              </div>

              <div>
                <label className="font-bold text-stone-800 uppercase block mb-1">
                  Fixed Time Delivery Surcharge (₹)
                </label>
                <input
                  type="number"
                  min={0}
                  max={2000}
                  value={fixedTimeFee}
                  onChange={(e) => setFixedTimeFee(Number(e.target.value))}
                  className="w-full p-2.5 rounded-xl border border-stone-300 font-bold text-stone-900"
                />
                <span className="text-stone-400 text-[11px] mt-1 block">
                  Extra fee for exact minute finish time (Default: ₹299).
                </span>
              </div>

              <div>
                <label className="font-bold text-stone-800 uppercase block mb-1">
                  Top Announcement Bar Text
                </label>
                <input
                  type="text"
                  value={announcementText}
                  onChange={(e) => setAnnouncementText(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-stone-300 text-stone-900"
                />
              </div>

              <div className="p-3 bg-emerald-50 rounded-xl text-emerald-800 font-semibold">
                ✓ Settings autosaved to local persistent storage.
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: BLOCKED DATES */}
        {activeTab === "blocked" && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-xs max-w-2xl space-y-6">
            <div>
              <h2 className="font-serif font-bold text-lg text-stone-900">
                Blocked / Sold-Out Dates
              </h2>
              <p className="text-xs text-stone-500">
                Dates when decorators cannot accept any new orders (e.g. fully booked dates)
              </p>
            </div>

            <div className="flex gap-2">
              <input
                type="date"
                value={newBlockedDate}
                onChange={(e) => setNewBlockedDate(e.target.value)}
                className="flex-1 p-2.5 rounded-xl border border-stone-300 text-xs font-semibold text-stone-800"
              />
              <button
                onClick={() => {
                  if (newBlockedDate) {
                    toggleBlockedDate(newBlockedDate);
                    setNewBlockedDate("");
                  }
                }}
                className="px-4 py-2 bg-rose-600 text-white font-bold text-xs rounded-xl"
              >
                Block Date
              </button>
            </div>

            <div className="space-y-2">
              <h4 className="text-xs font-bold text-stone-800 uppercase">
                Currently Blocked Dates:
              </h4>
              {blockedDates.length === 0 ? (
                <p className="text-xs text-stone-400">No dates blocked currently.</p>
              ) : (
                <div className="flex flex-wrap gap-2">
                  {blockedDates.map((dateStr) => (
                    <span
                      key={dateStr}
                      className="px-3 py-1 bg-rose-50 text-rose-800 border border-rose-200 rounded-full text-xs font-bold flex items-center gap-1.5"
                    >
                      <span>{dateStr}</span>
                      <button
                        onClick={() => toggleBlockedDate(dateStr)}
                        className="text-stone-400 hover:text-rose-600"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* TAB 5: COUPONS */}
        {activeTab === "coupons" && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-xs max-w-2xl space-y-6">
            <div>
              <h2 className="font-serif font-bold text-lg text-stone-900">
                Promotional Coupons
              </h2>
              <p className="text-xs text-stone-500">
                Add discount promo codes for festival discounts and first-time users
              </p>
            </div>

            <form onSubmit={handleCreateCoupon} className="grid grid-cols-3 gap-2">
              <input
                type="text"
                placeholder="Code (e.g. DIWALI20)"
                value={newCouponCode}
                onChange={(e) => setNewCouponCode(e.target.value.toUpperCase())}
                className="p-2.5 rounded-xl border border-stone-300 text-xs font-bold uppercase text-stone-900"
              />
              <input
                type="number"
                placeholder="Discount %"
                value={newCouponDiscount}
                onChange={(e) => setNewCouponDiscount(Number(e.target.value))}
                className="p-2.5 rounded-xl border border-stone-300 text-xs text-stone-900"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-stone-900 text-white font-bold text-xs rounded-xl"
              >
                Create Coupon
              </button>
            </form>

            <div className="space-y-2">
              {coupons.map((c) => (
                <div
                  key={c.code}
                  className="flex items-center justify-between p-3 rounded-2xl bg-stone-50 border border-stone-200 text-xs"
                >
                  <div>
                    <span className="font-bold text-stone-900 block">{c.code}</span>
                    <span className="text-stone-500">{c.description}</span>
                  </div>
                  <button
                    onClick={() => deleteCoupon(c.code)}
                    className="text-stone-400 hover:text-rose-600"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* MODAL: ADD DECORATION */}
        {showAddModal && (
          <div className="fixed inset-0 z-50 bg-stone-900/60 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl max-w-lg w-full p-6 space-y-4 shadow-2xl border border-stone-200">
              <h3 className="font-serif font-bold text-lg text-stone-900">
                Add New Decoration
              </h3>
              <form onSubmit={handleCreateDecoration} className="space-y-3 text-xs">
                <div>
                  <label className="font-bold block mb-1">Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Lavender Dream Birthday Ring"
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    className="w-full p-2 rounded-xl border border-stone-200"
                  />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="font-bold block mb-1">Price (₹)</label>
                    <input
                      type="number"
                      required
                      value={newPrice}
                      onChange={(e) => setNewPrice(Number(e.target.value))}
                      className="w-full p-2 rounded-xl border border-stone-200"
                    />
                  </div>
                  <div>
                    <label className="font-bold block mb-1">Original MRP (₹)</label>
                    <input
                      type="number"
                      required
                      value={newMrp}
                      onChange={(e) => setNewMrp(Number(e.target.value))}
                      className="w-full p-2 rounded-xl border border-stone-200"
                    />
                  </div>
                </div>
                <div>
                  <label className="font-bold block mb-1">Occasion</label>
                  <select
                    value={newOccasion}
                    onChange={(e) => setNewOccasion(e.target.value)}
                    className="w-full p-2 rounded-xl border border-stone-200 bg-white"
                  >
                    {occasionsData.map((o) => (
                      <option key={o.id} value={o.name}>
                        {o.emoji} {o.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="font-bold block mb-1">Photo URL</label>
                  <input
                    type="url"
                    value={newImage}
                    onChange={(e) => setNewImage(e.target.value)}
                    className="w-full p-2 rounded-xl border border-stone-200"
                  />
                </div>
                <div>
                  <label className="font-bold block mb-1">Inclusions (comma separated)</label>
                  <input
                    type="text"
                    value={newInclusions}
                    onChange={(e) => setNewInclusions(e.target.value)}
                    className="w-full p-2 rounded-xl border border-stone-200"
                  />
                </div>

                <div className="pt-2 flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setShowAddModal(false)}
                    className="px-4 py-2 border rounded-xl"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 bg-rose-600 text-white rounded-xl font-bold"
                  >
                    Save & Publish
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
