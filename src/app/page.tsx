import React from "react";
import { HeroSection } from "@/components/home/HeroSection";
import { OccasionsGrid } from "@/components/home/OccasionsGrid";
import { TrendingDecorations } from "@/components/home/TrendingDecorations";
import { DesignCarousel } from "@/components/home/DesignCarousel";
import { BouquetsSection } from "@/components/home/BouquetsSection";
import { BudgetSection } from "@/components/home/BudgetSection";
import { WhyBloomora } from "@/components/home/WhyBloomora";
import { HowItWorks } from "@/components/home/HowItWorks";
import { StatsCounter } from "@/components/home/StatsCounter";
import { RecentCelebrationsGallery } from "@/components/home/RecentCelebrationsGallery";
import { ReviewsSlider } from "@/components/home/ReviewsSlider";
import { CorporateBanner } from "@/components/home/CorporateBanner";
import { ServiceAreas } from "@/components/home/ServiceAreas";
import { FaqAccordion } from "@/components/home/FaqAccordion";
import { JournalSection } from "@/components/home/JournalSection";

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* 1. Hero */}
      <HeroSection />

      {/* 2. What are you celebrating? (15 Occasion Cards) */}
      <OccasionsGrid />

      {/* 3. Trending decorations */}
      <TrendingDecorations />

      {/* 4. Our designs, up close (3D / rotating carousel) */}
      <DesignCarousel />

      {/* 5. Flower bouquets (Fresh daily) */}
      <BouquetsSection />

      {/* 6. Shop by budget */}
      <BudgetSection />

      {/* 7. Why Bloomora */}
      <WhyBloomora />

      {/* 8. How it works */}
      <HowItWorks />

      {/* 9. Animated counters */}
      <StatsCounter />

      {/* 10. From our recent celebrations */}
      <RecentCelebrationsGallery />

      {/* 11. Reviews – testimonial slider */}
      <ReviewsSlider />

      {/* 12. Corporate banner */}
      <CorporateBanner />

      {/* 13. Service areas */}
      <ServiceAreas />

      {/* 14. FAQ accordion */}
      <FaqAccordion />

      {/* 15. Journal / blog preview + newsletter + Instagram */}
      <JournalSection />
    </div>
  );
}
