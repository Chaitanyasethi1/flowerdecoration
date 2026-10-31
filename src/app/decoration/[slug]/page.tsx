import React from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ChevronRight, Star, ShieldCheck, Clock, MapPin, Sparkles } from "lucide-react";
import { decorationsData } from "@/data/decorations";
import { ProductGallery } from "@/components/product/ProductGallery";
import { ProductTabs } from "@/components/product/ProductTabs";
import { ProductDetailClient } from "./ProductDetailClient";
import { DecorationCard } from "@/components/common/DecorationCard";
import { siteConfig } from "@/config/site";
import type { Metadata } from "next";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const item = decorationsData.find((d) => d.slug === slug);
  if (!item) return { title: "Decoration Not Found" };

  return {
    title: `${item.name} - ${item.occasion} Flower Decoration in Delhi NCR`,
    description: `${item.name} for ${item.occasion} starting at ₹${item.price}. Same-day delivery in Delhi, Gurgaon, Noida, Ghaziabad & Faridabad. 100% fresh flowers.`,
    openGraph: {
      title: `${item.name} | Bloomora Decor`,
      description: item.description,
      images: [{ url: item.images[0] }],
    },
  };
}

export default async function ProductDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const decoration = decorationsData.find((d) => d.slug === slug);

  if (!decoration) {
    notFound();
  }

  // Related products from same category
  const relatedDecorations = decorationsData
    .filter((d) => d.occasionSlug === decoration.occasionSlug && d.id !== decoration.id)
    .slice(0, 4);

  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: decoration.name,
    image: decoration.images,
    description: decoration.description,
    brand: {
      "@type": "Brand",
      name: siteConfig.name,
    },
    offers: {
      "@type": "Offer",
      url: `${siteConfig.url}/decoration/${decoration.slug}`,
      priceCurrency: "INR",
      price: decoration.price,
      priceValidUntil: "2027-12-31",
      availability: "https://schema.org/InStock",
      itemCondition: "https://schema.org/NewCondition",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: decoration.rating,
      reviewCount: decoration.reviewsCount,
    },
  };

  return (
    <div className="py-8 bg-cream-50/40 min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
      />

      <div className="container mx-auto px-4">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-1.5 text-xs text-stone-500 mb-6 flex-wrap">
          <Link href="/" className="hover:text-rose-600 transition-colors">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <Link
            href={`/decorations/${decoration.occasionSlug}`}
            className="hover:text-rose-600 transition-colors capitalize"
          >
            {decoration.occasion}
          </Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="font-semibold text-stone-800 truncate max-w-xs">
            {decoration.name}
          </span>
        </nav>

        {/* Client Interactive Area (Gallery, Addons, Tabs, BookingPanel) */}
        <ProductDetailClient
          decoration={decoration}
          relatedDecorations={relatedDecorations}
        />
      </div>
    </div>
  );
}
