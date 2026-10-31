"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { Order } from "@/types";

interface UserProfile {
  name: string;
  phone: string;
  email: string;
}

interface Address {
  id: string;
  type: "Home" | "Office" | "Hall";
  house: string;
  area: string;
  city: string;
  pincode: string;
  landmark?: string;
  floorLift?: string;
}

interface AuthContextType {
  user: UserProfile | null;
  isLoggedIn: boolean;
  loginWithPhone: (phone: string, name?: string, email?: string) => Promise<boolean>;
  logout: () => void;
  addresses: Address[];
  addAddress: (address: Omit<Address, "id">) => void;
  deleteAddress: (id: string) => void;
  orders: Order[];
  addOrder: (order: Order) => void;
  cancelOrder: (orderId: string, reason: string) => { success: boolean; refundAmount: number; message: string };
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Initial sample orders for realistic account experience
const sampleOrders: Order[] = [
  {
    id: "BLM-89421",
    items: [
      {
        id: "item-init-1",
        decoration: {
          id: "dec-1",
          slug: "blush-rose-ring-backdrop",
          name: "Blush Rose Ring Backdrop",
          occasion: "Birthday",
          occasionSlug: "birthday",
          price: 3499,
          originalPrice: 4999,
          discountPercent: 30,
          rating: 4.9,
          reviewsCount: 142,
          images: [
            "https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&w=1000&q=80",
          ],
          isTrending: true,
          isBestSeller: true,
          isSameDayAvailable: true,
          flowerType: ["Roses"],
          colorTheme: ["Pink & White"],
          hasBalloons: true,
          locationType: "Home",
          inclusions: ["6x6 ft gold ring frame", "Fresh pink roses", "Happy Birthday neon sign"],
          dimensions: "6 ft x 7 ft",
          setupTime: "2 hours",
          description: "Luxury birthday floral backdrop.",
          careTips: [],
        },
        selectedAddons: [],
        bookingDetails: {
          date: new Date(Date.now() + 86400000 * 3).toISOString().split("T")[0],
          city: "Gurgaon",
          slotType: "slot",
          slotValue: "02:00 PM – 06:00 PM",
          pincode: "122002",
          locationType: "Home",
          bannerMessage: "Happy 30th Birthday Rahul!",
        },
      },
    ],
    customer: {
      name: "Chaitanya K.",
      phone: "9717212164",
      email: "chaitanya@example.com",
    },
    eventDetails: {
      occasion: "Birthday",
      bannerMessage: "Happy 30th Birthday Rahul!",
      eventDate: new Date(Date.now() + 86400000 * 3).toISOString().split("T")[0],
      slot: "02:00 PM – 06:00 PM",
    },
    address: {
      house: "Tower 4, Apt 802, DLF Phase 5",
      area: "Golf Course Road",
      city: "Gurgaon",
      pincode: "122002",
      landmark: "Near One Horizon Center",
      locationType: "Home",
      floorLift: "8th Floor (Lift available)",
    },
    pricing: {
      subtotal: 3499,
      addonsTotal: 0,
      fixedTimeCharge: 0,
      deliveryCharge: 0,
      discount: 350,
      total: 3149,
      advancePaid: 945,
      balanceDue: 2204,
      couponCode: "BLOOM10",
    },
    paymentMethod: "upi",
    paymentStatus: "advance_paid",
    orderStatus: "confirmed",
    createdAt: new Date(Date.now() - 3600000 * 4).toISOString(),
  },
];

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [addresses, setAddresses] = useState<Address[]>([
    {
      id: "addr-1",
      type: "Home",
      house: "Tower 4, Flat 802, DLF The Crest",
      area: "DLF Phase 5, Golf Course Road",
      city: "Gurgaon",
      pincode: "122002",
      landmark: "Opposite Club House",
      floorLift: "Lift available",
    },
  ]);
  const [orders, setOrders] = useState<Order[]>(sampleOrders);
  const [isInitialized, setIsInitialized] = useState<boolean>(false);

  useEffect(() => {
    try {
      const savedUser = localStorage.getItem("bloomora_user");
      if (savedUser) setUser(JSON.parse(savedUser));

      const savedAddresses = localStorage.getItem("bloomora_addresses");
      if (savedAddresses) setAddresses(JSON.parse(savedAddresses));

      const savedOrders = localStorage.getItem("bloomora_orders");
      if (savedOrders) setOrders(JSON.parse(savedOrders));
    } catch {
      // ignore
    }
    setIsInitialized(true);
  }, []);

  useEffect(() => {
    if (!isInitialized) return;
    if (user) {
      localStorage.setItem("bloomora_user", JSON.stringify(user));
    } else {
      localStorage.removeItem("bloomora_user");
    }
  }, [user, isInitialized]);

  useEffect(() => {
    if (!isInitialized) return;
    localStorage.setItem("bloomora_addresses", JSON.stringify(addresses));
  }, [addresses, isInitialized]);

  useEffect(() => {
    if (!isInitialized) return;
    localStorage.setItem("bloomora_orders", JSON.stringify(orders));
  }, [orders, isInitialized]);

  const loginWithPhone = async (phone: string, name?: string, email?: string): Promise<boolean> => {
    const profile: UserProfile = {
      phone,
      name: name || "Valued Customer",
      email: email || `${phone}@customer.bloomora.com`,
    };
    setUser(profile);
    return true;
  };

  const logout = () => {
    setUser(null);
  };

  const addAddress = (newAddr: Omit<Address, "id">) => {
    const addr: Address = {
      ...newAddr,
      id: `addr-${Date.now()}`,
    };
    setAddresses((prev) => [...prev, addr]);
  };

  const deleteAddress = (id: string) => {
    setAddresses((prev) => prev.filter((a) => a.id !== id));
  };

  const addOrder = (newOrder: Order) => {
    setOrders((prev) => [newOrder, ...prev]);
  };

  const cancelOrder = (
    orderId: string,
    reason: string
  ): { success: boolean; refundAmount: number; message: string } => {
    const targetOrder = orders.find((o) => o.id === orderId);
    if (!targetOrder) {
      return { success: false, refundAmount: 0, message: "Order not found" };
    }

    if (targetOrder.orderStatus === "cancelled") {
      return { success: false, refundAmount: 0, message: "Order is already cancelled" };
    }

    // Determine hours remaining until event date
    const eventTime = new Date(targetOrder.eventDetails.eventDate).getTime();
    const now = Date.now();
    const diffHours = (eventTime - now) / (1000 * 60 * 60);

    let refundPercent = 0;
    let message = "";

    if (diffHours >= 48) {
      refundPercent = 100;
      message = "Full 100% advance refund approved (cancelled >48 hours in advance).";
    } else if (diffHours >= 24) {
      refundPercent = 50;
      message = "50% advance refund approved (cancelled between 24 and 48 hours).";
    } else {
      refundPercent = 0;
      message = "No refund applicable as cancellation is within 24 hours of event setup.";
    }

    const advancePaid = targetOrder.pricing.advancePaid;
    const refundAmount = Math.round((advancePaid * refundPercent) / 100);

    setOrders((prev) =>
      prev.map((o) => {
        if (o.id !== orderId) return o;
        return {
          ...o,
          orderStatus: "cancelled",
          cancelReason: reason,
          cancelledAt: new Date().toISOString(),
          refundAmount,
        };
      })
    );

    return {
      success: true,
      refundAmount,
      message,
    };
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoggedIn: !!user,
        loginWithPhone,
        logout,
        addresses,
        addAddress,
        deleteAddress,
        orders,
        addOrder,
        cancelOrder,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
