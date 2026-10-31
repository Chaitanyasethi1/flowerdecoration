import React from "react";
import { decorationsData } from "@/data/decorations";
import { ListingView } from "@/components/listing/ListingView";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "All Flower Decorations in Delhi NCR | Bloomora",
  description:
    "Browse 40+ fresh flower decorations for birthdays, anniversaries, weddings, haldi, and home pujas across Delhi, Gurgaon, Noida & Faridabad.",
};

interface PageProps {
  searchParams: Promise<{
    minPrice?: string;
    maxPrice?: string;
    q?: string;
  }>;
}

export default async function AllDecorationsPage({ searchParams }: PageProps) {
  const sParams = await searchParams;
  const minPrice = sParams.minPrice ? Number(sParams.minPrice) : undefined;
  const maxPrice = sParams.maxPrice ? Number(sParams.maxPrice) : undefined;
  const q = sParams.q || undefined;

  return (
    <ListingView
      initialDecorations={decorationsData}
      title="All Flower & Balloon Decorations"
      subtitle="Delhi NCR's widest catalogue of fresh floral installations, terrace cabanas, and mandaps."
      initialMinPrice={minPrice}
      initialMaxPrice={maxPrice}
      searchQuery={q}
    />
  );
}
