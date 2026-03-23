import HeroSection from "@/components/home/HeroSection";
import CategorySection from "@/components/home/CategorySection";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import TrendingSection from "@/components/home/TrendingSection";
import LookbookSection from "@/components/home/LookbookSection";
import NewsletterSection from "@/components/home/NewsletterSection";

// Disable caching to ensure fresh product data is always shown
export const revalidate = 0;

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <CategorySection />
      <TrendingSection />
      <FeaturedProducts />
      <LookbookSection />
      <NewsletterSection />
    </>
  );
}

