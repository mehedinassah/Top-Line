import HeroSection from "@/components/home/HeroSection";
import CategorySection from "@/components/home/CategorySection";
import CollectionsGrid from "@/components/home/CollectionsGrid";
import FeaturedProducts from "@/components/home/FeaturedProducts";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <CategorySection />
      <CollectionsGrid />
      <FeaturedProducts />
    </>
  );
}

