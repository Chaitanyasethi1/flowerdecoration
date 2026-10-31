import React from "react";
import { notFound } from "next/navigation";
import { decorationsData } from "@/data/decorations";
import { occasionsData } from "@/data/occasions";
import { ListingView } from "@/components/listing/ListingView";
import type { Metadata } from "next";

interface PageProps {
  params: Promise<{ occasion: string }>;
  searchParams: Promise<{
    minPrice?: string;
    maxPrice?: string;
    q?: string;
  }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { occasion: occasionParam } = await params;

  if (occasionParam === "all") {
    return {
      title: "All Flower & Balloon Decorations in Delhi NCR | Bloomora",
      description: "Browse 40+ fresh flower decorations for birthdays, anniversaries, weddings, haldi, and home pujas across Delhi, Gurgaon, Noida & Faridabad.",
    };
  }

  const occasion = occasionsData.find((o) => o.slug === occasionParam);
  if (!occasion) return { title: "Occasion Not Found" };

  return {
    title: `${occasion.name} Flower Decoration in Delhi NCR | Bloomora Decor`,
    description: `Book fresh ${occasion.name} flower decorations in Delhi NCR. Same-day setups, 100% fresh blooms, transparent pricing. Book with 30% advance.`,
  };
}

export default async function OccasionListingPage({
  params,
  searchParams,
}: PageProps) {
  const { occasion: occasionParam } = await params;
  const sParams = await searchParams;

  const isAll = occasionParam === "all";
  const occasion = occasionsData.find((o) => o.slug === occasionParam);

  if (!isAll && !occasion) {
    notFound();
  }

  const items = isAll
    ? decorationsData
    : decorationsData.filter((d) => d.occasionSlug === occasionParam);

  const title = isAll
    ? "All Flower Decorations (Delhi NCR)"
    : `${occasion?.emoji} ${occasion?.name} Flower Decoration`;

  const subtitle = isAll
    ? "Explore 40+ handcrafted fresh flower setups, organic balloon arches, and custom celebration backdrops."
    : occasion?.shortDesc || "Handcrafted fresh floral themes curated for your special day.";

  const minPrice = sParams.minPrice ? Number(sParams.minPrice) : undefined;
  const maxPrice = sParams.maxPrice ? Number(sParams.maxPrice) : undefined;
  const q = sParams.q || undefined;

  return (
    <ListingView
      initialDecorations={items}
      occasion={occasion}
      title={title}
      subtitle={subtitle}
      initialMinPrice={minPrice}
      initialMaxPrice={maxPrice}
      searchQuery={q}
    />
  );
}
