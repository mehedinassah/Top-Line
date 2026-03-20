"use client";

import Link from "next/link";
import Image from "next/image";
import { useRef, useState, useEffect } from "react";
import { featuredProducts } from "@/lib/productData";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import { HeartIcon as HeartSolidIcon } from "@heroicons/react/24/solid";
import { HeartIcon } from "@heroicons/react/24/outline";
import type { Product } from "@/lib/productData";

function TrendingProductCard({ product }: { product: Product }) {
  const [isInWishlist, setIsInWishlist] = useState(false);

  // Check if product is in wishlist on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem("topline_wishlist");
      const wishlist = stored ? JSON.parse(stored) : [];
      const exists = wishlist.some((item: any) => item.productId === product.id);
      setIsInWishlist(exists);
    } catch (error) {
      console.error("Failed to load wishlist:", error);
    }
  }, [product.id]);

  const handleWishlistClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    try {
      const stored = localStorage.getItem("topline_wishlist");
      let wishlist = stored ? JSON.parse(stored) : [];
      const displayPrice = product.discountPrice ?? product.price;
      const primaryImage = product.images?.[0] ?? "/placeholder-product.png";

      const exists = wishlist.some((item: any) => item.productId === product.id);

      if (exists) {
        wishlist = wishlist.filter((item: any) => item.productId !== product.id);
      } else {
        wishlist.push({
          id: `${product.id}`,
          productId: product.id,
          name: product.name,
          price: displayPrice,
          image: primaryImage
        });
      }

      localStorage.setItem("topline_wishlist", JSON.stringify(wishlist));
      setIsInWishlist(!exists);
    } catch (error) {
      console.error("Failed to update wishlist:", error);
    }
  };

  return (
    <Link
      href={`/products/${product.id}`}
      className="flex-shrink-0 w-40 md:w-48"
    >
      <div className="ticker-item group relative aspect-[2/3] overflow-hidden bg-neutral-100 cursor-pointer border-t-2 border-transparent transition-all duration-300">
        {/* Image */}
        <Image
          src={product.images?.[0] || "/placeholder-product.png"}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(min-width: 1024px) 12.5vw, (min-width: 768px) 10vw, 25vw"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/0 via-black/0 to-black/0 group-hover:from-black/20 group-hover:via-black/20 group-hover:to-black/40 transition-all duration-500" />

        {/* Content */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500">
          <div className="text-center px-3">
            <p className="text-xs font-semibold tracking-[0.15em] text-white uppercase line-clamp-2">
              {product.name}
            </p>
            <p className="mt-2 text-sm text-white/90 font-light">
              ${product.discountPrice || product.price}
            </p>
          </div>
        </div>

        {/* Wishlist Heart */}
        <button
          onClick={handleWishlistClick}
          className="absolute bottom-4 right-4 p-2 hover:opacity-80 transition"
          title={isInWishlist ? "Remove from wishlist" : "Add to wishlist"}
          aria-label={isInWishlist ? "Remove from wishlist" : "Add to wishlist"}
        >
          {isInWishlist ? (
            <HeartSolidIcon className="h-6 w-6 text-red-500" />
          ) : (
            <HeartIcon className="h-6 w-6 text-white drop-shadow-lg" />
          )}
        </button>
      </div>
    </Link>
  );
}

export default function TrendingSection() {
  // Duplicate products for seamless infinite scroll
  const allProducts = [...featuredProducts, ...featuredProducts];
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isManualScrolling, setIsManualScrolling] = useState(false);

  const scroll = (direction: "left" | "right") => {
    if (!scrollContainerRef.current) return;
    const scrollAmount = 300;
    const newScrollLeft =
      direction === "left"
        ? scrollContainerRef.current.scrollLeft - scrollAmount
        : scrollContainerRef.current.scrollLeft + scrollAmount;

    scrollContainerRef.current.scrollTo({
      left: newScrollLeft,
      behavior: "smooth",
    });
  };

  // Auto-scroll effect
  useEffect(() => {
    if (isManualScrolling) return; // Don't auto-scroll when manually scrolling

    const container = scrollContainerRef.current;
    if (!container) return;

    let scrollPosition = 0;
    let animationId: NodeJS.Timeout;

    const autoScroll = () => {
      scrollPosition += 1; // Adjust speed here (pixels per interval)

      container.scrollLeft = scrollPosition;

      // Reset to 0 when reaching the halfway point (since we duplicated the products)
      if (scrollPosition >= container.scrollWidth / 2 - container.clientWidth) {
        scrollPosition = 0;
      }
    };

    animationId = setInterval(autoScroll, 30); // 30ms interval

    return () => clearInterval(animationId);
  }, [isManualScrolling]);

  return (
    <section className="border-b border-neutral-200 bg-white w-full overflow-hidden"
    >
      <style>{`
        .ticker-item:hover {
          border-top: 2px solid #000;
        }
      `}</style>

      <div className="w-full px-4 py-16 md:py-20 lg:px-10">
        {/* Header */}
        <div className="mb-12 md:mb-16">
          <h2 className="text-sm font-semibold tracking-widest text-neutral-700 uppercase">
            This Week
          </h2>
          <h3 className="mt-3 text-3xl md:text-5xl font-bold text-neutral-900 tracking-tight">
            Now Trending
          </h3>
        </div>

        {/* Infinite Scroll Ticker with Manual Controls */}
        <div className="relative">
          {/* Left Scroll Button */}
          <button
            onClick={() => scroll("left")}
            onMouseEnter={() => setIsManualScrolling(true)}
            onMouseLeave={() => setIsManualScrolling(false)}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/20 hover:bg-white/40 text-white p-3 rounded-full transition duration-200 hover:scale-110 backdrop-blur-sm"
            aria-label="Scroll left"
            title="Scroll left"
          >
            <ChevronLeftIcon className="h-6 w-6" />
          </button>

          {/* Ticker Container */}
          <div
            ref={scrollContainerRef}
            className="overflow-x-auto overflow-y-hidden scroll-smooth"
          >
            <div className="flex gap-4 md:gap-6 min-w-min">
              {allProducts.map((product, index) => (
                <TrendingProductCard key={`${product.id}-${index}`} product={product} />
              ))}
            </div>
          </div>

          {/* Right Scroll Button */}
          <button
            onClick={() => scroll("right")}
            onMouseEnter={() => setIsManualScrolling(true)}
            onMouseLeave={() => setIsManualScrolling(false)}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/20 hover:bg-white/40 text-white p-3 rounded-full transition duration-200 hover:scale-110 backdrop-blur-sm"
            aria-label="Scroll right"
            title="Scroll right"
          >
            <ChevronRightIcon className="h-6 w-6" />
          </button>
        </div>
      </div>
    </section>
  );
}
