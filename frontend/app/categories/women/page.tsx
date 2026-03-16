"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import ProductCard from "@/components/products/ProductCard";
import { featuredProducts, SIZES, COLORS } from "@/lib/productData";
import { ChevronDownIcon, XMarkIcon } from "@heroicons/react/24/outline";
import type { Product, Size } from "@/lib/productData";

type SortOption = "newest" | "price-low" | "price-high" | "rating";

export default function WomenPage() {
  const [sortBy, setSortBy] = useState<SortOption>("newest");
  const [selectedSizes, setSelectedSizes] = useState<Size[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 500]);
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  const categoryProducts = useMemo(() => {
    return featuredProducts.filter(p => p.collection === "women");
  }, []);

  const maxPrice = Math.max(...categoryProducts.map(p => Math.max(p.price, p.discountPrice || 0))) + 50;

  // Filter products
  const filteredProducts = useMemo(() => {
    let result = [...categoryProducts];

    // Price filter
    result = result.filter(p => {
      const price = p.discountPrice ?? p.price;
      return price >= priceRange[0] && price <= priceRange[1];
    });

    // Size filter
    if (selectedSizes.length > 0) {
      result = result.filter(p =>
        selectedSizes.some(size => p.sizes.includes(size))
      );
    }

    // Color filter
    if (selectedColors.length > 0) {
      result = result.filter(p =>
        selectedColors.some(colorName =>
          p.colors.some(c => c.name === colorName)
        )
      );
    }

    // Sorting
    switch (sortBy) {
      case "price-low":
        result.sort((a, b) => (a.discountPrice ?? a.price) - (b.discountPrice ?? b.price));
        break;
      case "price-high":
        result.sort((a, b) => (b.discountPrice ?? b.price) - (a.discountPrice ?? a.price));
        break;
      case "rating":
        result.sort((a, b) => b.rating - a.rating);
        break;
      case "newest":
      default:
        result.sort((a, b) => b.id - a.id);
    }

    return result;
  }, [categoryProducts, selectedSizes, selectedColors, priceRange, sortBy]);

  return (
    <>
      {/* Hero Section */}
      <section className="border-b border-neutral-200 bg-white">
        <div className="mx-auto max-w-6xl px-4 py-8 md:py-12">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold text-neutral-900 md:text-4xl">Women's Collection</h1>
            <p className="text-neutral-600">Elegant designs and contemporary styles for the modern woman</p>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col gap-6 px-4 py-8 md:flex-row md:gap-8 md:py-10">
          {/* Filters Sidebar - Hidden on mobile unless toggled */}
          <div className={`${showMobileFilters ? "block" : "hidden"} md:block md:w-56 flex-shrink-0`}>
            <div className="space-y-6 border-b border-neutral-200 pb-6 md:border-none md:pb-0">
              {/* Sort - Mobile only header */}
              <div className="md:hidden flex items-center justify-between">
                <h3 className="font-semibold text-neutral-900">Filters</h3>
                <button
                  onClick={() => setShowMobileFilters(false)}
                  className="p-1 text-neutral-600 hover:text-neutral-900"
                >
                  <XMarkIcon className="h-5 w-5" />
                </button>
              </div>

              {/* Sorting */}
              <div>
                <label className="mb-3 block text-sm font-semibold text-neutral-900">Sort by</label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as SortOption)}
                  className="w-full rounded border border-neutral-300 bg-white px-3 py-2 text-sm text-neutral-900 focus:border-neutral-900 focus:outline-none"
                >
                  <option value="newest">Newest</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                </select>
              </div>

              {/* Price Range */}
              <div>
                <label className="mb-3 block text-sm font-semibold text-neutral-900">Price range</label>
                <div className="space-y-3">
                  <div className="flex gap-2">
                    <input
                      type="number"
                      placeholder="Min"
                      value={priceRange[0]}
                      onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
                      className="w-1/2 rounded border border-neutral-300 bg-white px-3 py-2 text-sm text-neutral-900 focus:border-neutral-900 focus:outline-none"
                    />
                    <input
                      type="number"
                      placeholder="Max"
                      value={priceRange[1]}
                      onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                      className="w-1/2 rounded border border-neutral-300 bg-white px-3 py-2 text-sm text-neutral-900 focus:border-neutral-900 focus:outline-none"
                    />
                  </div>
                  <input
                    type="range"
                    min="0"
                    max={maxPrice}
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                    className="w-full accent-neutral-900"
                  />
                </div>
              </div>

              {/* Size Filter */}
              <div>
                <label className="mb-3 block text-sm font-semibold text-neutral-900">Size</label>
                <div className="space-y-2">
                  {SIZES.map(size => (
                    <label key={size} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={selectedSizes.includes(size)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedSizes([...selectedSizes, size]);
                          } else {
                            setSelectedSizes(selectedSizes.filter(s => s !== size));
                          }
                        }}
                        className="h-4 w-4 cursor-pointer accent-neutral-900"
                      />
                      <span className="text-sm text-neutral-700">{size}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Color Filter */}
              <div>
                <label className="mb-3 block text-sm font-semibold text-neutral-900">Color</label>
                <div className="space-y-2">
                  {COLORS.map(color => (
                    <label key={color.name} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={selectedColors.includes(color.name)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedColors([...selectedColors, color.name]);
                          } else {
                            setSelectedColors(selectedColors.filter(c => c !== color.name));
                          }
                        }}
                        className="h-4 w-4 cursor-pointer accent-neutral-900"
                      />
                      <div className="flex items-center gap-2">
                        <div
                          className="h-4 w-4 rounded border border-neutral-300"
                          style={{ backgroundColor: color.code }}
                        />
                        <span className="text-sm text-neutral-700">{color.name}</span>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              {/* Clear Filters */}
              {(selectedSizes.length > 0 || selectedColors.length > 0 || priceRange[0] > 0 || priceRange[1] < maxPrice - 50) && (
                <button
                  onClick={() => {
                    setSelectedSizes([]);
                    setSelectedColors([]);
                    setPriceRange([0, maxPrice - 50]);
                  }}
                  className="w-full rounded border border-neutral-300 bg-white px-3 py-2 text-sm font-medium text-neutral-900 hover:bg-neutral-50 transition"
                >
                  Clear filters
                </button>
              )}
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Mobile Filter Toggle */}
            <div className="mb-6 flex items-center justify-between md:hidden">
              <p className="text-sm text-neutral-600">
                {filteredProducts.length} products
              </p>
              <button
                onClick={() => setShowMobileFilters(true)}
                className="flex items-center gap-2 rounded border border-neutral-300 bg-white px-3 py-2 text-sm font-medium text-neutral-900 hover:bg-neutral-50"
              >
                Filters
                <ChevronDownIcon className="h-4 w-4" />
              </button>
            </div>

            {/* Desktop Product Count */}
            <div className="mb-6 hidden items-center justify-between md:flex">
              <p className="text-sm text-neutral-600">
                {filteredProducts.length} products
              </p>
            </div>

            {/* Products Grid */}
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-5 lg:gap-6">
                {filteredProducts.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center gap-4 rounded bg-neutral-50 px-6 py-12 text-center">
                <p className="text-neutral-600">No products found with selected filters.</p>
                <button
                  onClick={() => {
                    setSelectedSizes([]);
                    setSelectedColors([]);
                    setPriceRange([0, maxPrice - 50]);
                  }}
                  className="rounded bg-neutral-900 px-4 py-2 text-sm font-medium text-white hover:bg-neutral-800 transition"
                >
                  Clear filters
                </button>
              </div>
            )}

            {/* Back to home */}
            <div className="mt-8 border-t border-neutral-200 pt-6">
              <Link href="/" className="text-sm text-neutral-600 hover:text-neutral-900 transition">
                ← Back to home
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
