"use client";

import { useRef } from "react";
import ProductCard from "@/components/products/ProductCard";
import { featuredProducts } from "@/lib/productData";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";

export default function TrendingSection() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (!scrollContainerRef.current) return;
    const scrollAmount = 400;
    const newScrollLeft =
      direction === "left"
        ? scrollContainerRef.current.scrollLeft - scrollAmount
        : scrollContainerRef.current.scrollLeft + scrollAmount;

    scrollContainerRef.current.scrollTo({
      left: newScrollLeft,
      behavior: "smooth",
    });
  };

  return (
    <section className="border-b border-neutral-200 bg-white">
      <div className="mx-auto max-w-7xl px-4 py-10 md:py-16">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-neutral-900 md:text-3xl">
            Now Trending
          </h2>
          <p className="mt-1 text-xs text-neutral-700 md:text-sm">
            This week's most popular items.
          </p>
        </div>

        <div className="relative">
          <div
            ref={scrollContainerRef}
            className="flex gap-4 overflow-x-auto scroll-smooth pb-2 md:gap-6"
            style={{ scrollBehavior: "smooth" }}
          >
            {featuredProducts.map((product) => (
              <div key={product.id} className="flex-shrink-0 w-48 md:w-56">
                <ProductCard product={product} />
              </div>
            ))}
          </div>

          {/* Scroll Button - Left */}
          <button
            onClick={() => scroll("left")}
            className="absolute left-0 top-1/3 -translate-y-1/2 -translate-x-4 md:-translate-x-6 z-10 hidden md:flex items-center justify-center h-10 w-10 rounded-full bg-white border border-neutral-300 hover:border-neutral-400 hover:shadow-sm transition"
            aria-label="Scroll left"
          >
            <ChevronLeftIcon className="h-5 w-5 text-neutral-700" />
          </button>

          {/* Scroll Button - Right */}
          <button
            onClick={() => scroll("right")}
            className="absolute right-0 top-1/3 -translate-y-1/2 translate-x-4 md:translate-x-6 z-10 hidden md:flex items-center justify-center h-10 w-10 rounded-full bg-white border border-neutral-300 hover:border-neutral-400 hover:shadow-sm transition"
            aria-label="Scroll right"
          >
            <ChevronRightIcon className="h-5 w-5 text-neutral-700" />
          </button>
        </div>
      </div>
    </section>
  );
}
