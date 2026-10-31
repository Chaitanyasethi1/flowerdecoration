"use client";

import React from "react";
import Image from "next/image";
import { Plus, Minus, Check } from "lucide-react";
import { AddOn } from "@/types";
import { addonsData } from "@/data/addons";

interface AddonSelectorProps {
  selectedAddons: { addon: AddOn; quantity: number }[];
  setSelectedAddons: React.Dispatch<
    React.SetStateAction<{ addon: AddOn; quantity: number }[]>
  >;
}

export const AddonSelector: React.FC<AddonSelectorProps> = ({
  selectedAddons,
  setSelectedAddons,
}) => {
  const toggleAddon = (addon: AddOn) => {
    const existing = selectedAddons.find((item) => item.addon.id === addon.id);
    if (existing) {
      setSelectedAddons((prev) => prev.filter((item) => item.addon.id !== addon.id));
    } else {
      setSelectedAddons((prev) => [...prev, { addon, quantity: 1 }]);
    }
  };

  const updateQuantity = (addonId: string, delta: number) => {
    setSelectedAddons((prev) =>
      prev
        .map((item) => {
          if (item.addon.id !== addonId) return item;
          const newQty = item.quantity + delta;
          return newQty > 0 ? { ...item, quantity: newQty } : null;
        })
        .filter(Boolean) as { addon: AddOn; quantity: number }[]
    );
  };

  return (
    <div className="space-y-4">
      <div>
        <h3 className="font-serif text-lg sm:text-xl font-bold text-stone-900">
          Enhance Your Celebration (Add-ons)
        </h3>
        <p className="text-xs text-stone-500">
          Pair with freshly baked photo cakes, extra floral bouquets, fairy lights, or live music
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {addonsData.map((addon) => {
          const selected = selectedAddons.find((item) => item.addon.id === addon.id);

          return (
            <div
              key={addon.id}
              className={`p-3 rounded-2xl border transition-all flex items-center justify-between gap-3 ${
                selected
                  ? "bg-rose-50/70 border-rose-300 shadow-xs"
                  : "bg-white border-stone-200/80 hover:border-stone-300"
              }`}
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className="relative w-14 h-14 rounded-xl overflow-hidden shrink-0 bg-stone-100">
                  <Image
                    src={addon.image}
                    alt={addon.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="min-w-0">
                  <h4 className="text-xs font-bold text-stone-900 truncate">
                    {addon.name}
                  </h4>
                  <div className="flex items-baseline gap-1.5 mt-0.5">
                    <span className="text-xs font-extrabold text-stone-900">
                      ₹{addon.price}
                    </span>
                    {addon.originalPrice && (
                      <span className="text-[10px] text-stone-400 line-through">
                        ₹{addon.originalPrice}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Action */}
              <div>
                {selected ? (
                  <div className="flex items-center gap-1.5 bg-white border border-rose-200 p-1 rounded-xl shadow-2xs">
                    <button
                      type="button"
                      onClick={() => updateQuantity(addon.id, -1)}
                      className="w-5 h-5 rounded-lg bg-stone-100 hover:bg-stone-200 flex items-center justify-center text-stone-700"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="text-xs font-bold w-4 text-center">
                      {selected.quantity}
                    </span>
                    <button
                      type="button"
                      onClick={() => updateQuantity(addon.id, 1)}
                      className="w-5 h-5 rounded-lg bg-rose-600 hover:bg-rose-700 text-white flex items-center justify-center"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => toggleAddon(addon)}
                    className="px-3 py-1.5 rounded-xl bg-stone-100 hover:bg-rose-50 hover:text-rose-600 text-stone-700 text-xs font-bold transition-colors flex items-center gap-1"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add</span>
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
