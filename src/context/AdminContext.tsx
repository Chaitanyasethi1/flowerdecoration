"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { Decoration, Coupon, Order } from "@/types";
import { decorationsData } from "@/data/decorations";
import { couponsData } from "@/data/coupons";
import { siteConfig } from "@/config/site";
import { useAuth } from "./AuthContext";

interface AdminContextType {
  isAdminLoggedIn: boolean;
  adminLogin: (pass: string) => boolean;
  adminLogout: () => void;
  decorations: Decoration[];
  addDecoration: (item: Omit<Decoration, "id">) => void;
  updateDecoration: (id: string, item: Partial<Decoration>) => void;
  deleteDecoration: (id: string) => void;
  coupons: Coupon[];
  addCoupon: (coupon: Coupon) => void;
  deleteCoupon: (code: string) => void;
  blockedDates: string[]; // YYYY-MM-DD
  toggleBlockedDate: (dateStr: string) => void;
  sameDayCutoffHour: number;
  setSameDayCutoffHour: (hour: number) => void;
  advancePaymentPercent: number;
  setAdvancePaymentPercent: (percent: number) => void;
  fixedTimeFee: number;
  setFixedTimeFee: (fee: number) => void;
  updateOrderStatus: (orderId: string, status: Order["orderStatus"]) => void;
  announcementText: string;
  setAnnouncementText: (text: string) => void;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export const AdminProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { orders } = useAuth();
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState<boolean>(false);
  const [decorations, setDecorations] = useState<Decoration[]>(decorationsData);
  const [coupons, setCoupons] = useState<Coupon[]>(couponsData);
  const [blockedDates, setBlockedDates] = useState<string[]>([]);
  const [sameDayCutoffHour, setSameDayCutoffHour] = useState<number>(siteConfig.bookingRules.sameDayCutoffHourIST);
  const [advancePaymentPercent, setAdvancePaymentPercent] = useState<number>(siteConfig.bookingRules.advancePaymentPercent);
  const [fixedTimeFee, setFixedTimeFee] = useState<number>(siteConfig.bookingRules.fixedTimeFee);
  const [announcementText, setAnnouncementText] = useState<string>(siteConfig.announcement.text);
  const [isInitialized, setIsInitialized] = useState<boolean>(false);

  useEffect(() => {
    try {
      const savedAdminAuth = sessionStorage.getItem("bloomora_admin_auth");
      if (savedAdminAuth === "true") setIsAdminLoggedIn(true);

      const savedDecs = localStorage.getItem("bloomora_admin_decorations");
      if (savedDecs) setDecorations(JSON.parse(savedDecs));

      const savedCoupons = localStorage.getItem("bloomora_admin_coupons");
      if (savedCoupons) setCoupons(JSON.parse(savedCoupons));

      const savedBlocked = localStorage.getItem("bloomora_admin_blocked");
      if (savedBlocked) setBlockedDates(JSON.parse(savedBlocked));

      const savedCutoff = localStorage.getItem("bloomora_admin_cutoff");
      if (savedCutoff) setSameDayCutoffHour(Number(savedCutoff));

      const savedAdvance = localStorage.getItem("bloomora_admin_advance");
      if (savedAdvance) setAdvancePaymentPercent(Number(savedAdvance));

      const savedAnnounce = localStorage.getItem("bloomora_admin_announcement");
      if (savedAnnounce) setAnnouncementText(savedAnnounce);
    } catch {
      // ignore
    }
    setIsInitialized(true);
  }, []);

  useEffect(() => {
    if (!isInitialized) return;
    localStorage.setItem("bloomora_admin_decorations", JSON.stringify(decorations));
  }, [decorations, isInitialized]);

  useEffect(() => {
    if (!isInitialized) return;
    localStorage.setItem("bloomora_admin_coupons", JSON.stringify(coupons));
  }, [coupons, isInitialized]);

  useEffect(() => {
    if (!isInitialized) return;
    localStorage.setItem("bloomora_admin_blocked", JSON.stringify(blockedDates));
  }, [blockedDates, isInitialized]);

  useEffect(() => {
    if (!isInitialized) return;
    localStorage.setItem("bloomora_admin_cutoff", String(sameDayCutoffHour));
    localStorage.setItem("bloomora_admin_advance", String(advancePaymentPercent));
    localStorage.setItem("bloomora_admin_announcement", announcementText);
  }, [sameDayCutoffHour, advancePaymentPercent, announcementText, isInitialized]);

  const adminLogin = (pass: string): boolean => {
    // Default admin password for local dev out of the box: "bloomora123" or "admin"
    if (pass === "bloomora123" || pass === "admin") {
      setIsAdminLoggedIn(true);
      sessionStorage.setItem("bloomora_admin_auth", "true");
      return true;
    }
    return false;
  };

  const adminLogout = () => {
    setIsAdminLoggedIn(false);
    sessionStorage.removeItem("bloomora_admin_auth");
  };

  const addDecoration = (item: Omit<Decoration, "id">) => {
    const newItem: Decoration = {
      ...item,
      id: `dec-${Date.now()}`,
    };
    setDecorations((prev) => [newItem, ...prev]);
  };

  const updateDecoration = (id: string, updated: Partial<Decoration>) => {
    setDecorations((prev) =>
      prev.map((d) => (d.id === id ? { ...d, ...updated } : d))
    );
  };

  const deleteDecoration = (id: string) => {
    setDecorations((prev) => prev.filter((d) => d.id !== id));
  };

  const addCoupon = (newCoupon: Coupon) => {
    setCoupons((prev) => [newCoupon, ...prev]);
  };

  const deleteCoupon = (code: string) => {
    setCoupons((prev) => prev.filter((c) => c.code !== code));
  };

  const toggleBlockedDate = (dateStr: string) => {
    setBlockedDates((prev) =>
      prev.includes(dateStr)
        ? prev.filter((d) => d !== dateStr)
        : [...prev, dateStr]
    );
  };

  const updateOrderStatus = (orderId: string, status: Order["orderStatus"]) => {
    // Directly mutate the stored orders list in localStorage
    const savedOrders = localStorage.getItem("bloomora_orders");
    if (savedOrders) {
      try {
        const parsed = JSON.parse(savedOrders) as Order[];
        const updated = parsed.map((o) => (o.id === orderId ? { ...o, orderStatus: status } : o));
        localStorage.setItem("bloomora_orders", JSON.stringify(updated));
        window.location.reload(); // refresh to reflect
      } catch {
        // ignore
      }
    }
  };

  return (
    <AdminContext.Provider
      value={{
        isAdminLoggedIn,
        adminLogin,
        adminLogout,
        decorations,
        addDecoration,
        updateDecoration,
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
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error("useAdmin must be used within an AdminProvider");
  }
  return context;
};
