"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Camera, X, MapPin } from "lucide-react";

export const RecentCelebrationsGallery: React.FC = () => {
  const photos = [
    {
      id: "g-1",
      image: "https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&w=1000&q=80",
      caption: "Blush Rose Ring Birthday Decor",
      location: "Golf Course Road, Gurgaon",
      aspect: "row-span-2",
    },
    {
      id: "g-2",
      image: "https://images.unsplash.com/photo-1518895949257-7621c3c786d7?auto=format&fit=crop&w=1000&q=80",
      caption: "Romantic Rose Petal Anniversary",
      location: "Sector 50, Noida",
      aspect: "row-span-1",
    },
    {
      id: "g-3",
      image: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=1000&q=80",
      caption: "Marigold Jhoola Haldi Ceremony",
      location: "Chattarpur Farms, South Delhi",
      aspect: "row-span-2",
    },
    {
      id: "g-4",
      image: "https://images.unsplash.com/photo-1527529482837-4698179dc6ce?auto=format&fit=crop&w=1000&q=80",
      caption: "Pastel Teddy Baby Shower Wall",
      location: "Dwarka Sector 11, Delhi",
      aspect: "row-span-1",
    },
    {
      id: "g-5",
      image: "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&w=1000&q=80",
      caption: "Marry Me Giant Marquee Proposal",
      location: "Aerocity Rooftop, Delhi",
      aspect: "row-span-1",
    },
    {
      id: "g-6",
      image: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1000&q=80",
      caption: "Royal Vedic Marigold Mandap",
      location: "Surajkund, Faridabad",
      aspect: "row-span-1",
    },
  ];

  const [activePhoto, setActivePhoto] = useState<typeof photos[0] | null>(null);

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-50 text-rose-700 text-xs font-bold uppercase tracking-wider mb-2">
              <Camera className="w-3.5 h-3.5 text-rose-600" />
              <span>Real Customer Photos</span>
            </div>
            <h2 className="font-serif text-2xl sm:text-4xl font-extrabold text-stone-900 tracking-tight">
              From Our Recent Celebrations
            </h2>
            <p className="text-sm text-stone-600 mt-1">
              Real setups clicked immediately after completion by our Delhi NCR floral team
            </p>
          </div>

          <Link
            href="/gallery"
            className="inline-flex items-center gap-2 font-bold text-sm text-rose-600 hover:text-rose-700"
          >
            <span>View Full Gallery (100+ Photos)</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Masonry / Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {photos.map((item) => (
            <div
              key={item.id}
              onClick={() => setActivePhoto(item)}
              className="group relative h-64 sm:h-72 rounded-3xl overflow-hidden cursor-pointer shadow-sm hover:shadow-xl transition-all duration-300 bg-stone-100"
            >
              <Image
                src={item.image}
                alt={item.caption}
                fill
                sizes="(max-width: 640px) 100vw, 33vw"
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-stone-950/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

              <div className="absolute bottom-4 left-4 right-4 text-white">
                <div className="flex items-center gap-1 text-[11px] text-rose-300 font-semibold mb-1">
                  <MapPin className="w-3 h-3" />
                  <span>{item.location}</span>
                </div>
                <h3 className="font-serif font-bold text-base sm:text-lg">
                  {item.caption}
                </h3>
              </div>
            </div>
          ))}
        </div>

        {/* Lightbox Modal */}
        {activePhoto && (
          <div className="fixed inset-0 z-50 bg-stone-950/90 backdrop-blur-md flex items-center justify-center p-4">
            <button
              onClick={() => setActivePhoto(null)}
              className="absolute top-5 right-5 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
              aria-label="Close photo"
            >
              <X className="w-6 h-6" />
            </button>
            <div className="max-w-3xl w-full bg-stone-900 rounded-3xl overflow-hidden shadow-2xl border border-stone-800">
              <div className="relative h-[65vh] w-full">
                <Image
                  src={activePhoto.image}
                  alt={activePhoto.caption}
                  fill
                  className="object-contain"
                />
              </div>
              <div className="p-5 text-white flex items-center justify-between border-t border-stone-800">
                <div>
                  <h4 className="font-serif text-lg font-bold">
                    {activePhoto.caption}
                  </h4>
                  <p className="text-xs text-rose-300 flex items-center gap-1 mt-0.5">
                    <MapPin className="w-3.5 h-3.5" />
                    <span>{activePhoto.location}</span>
                  </p>
                </div>
                <Link
                  href="/decorations/all"
                  onClick={() => setActivePhoto(null)}
                  className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs"
                >
                  Book Similar
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
