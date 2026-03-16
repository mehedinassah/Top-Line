"use client";

import { useState, useMemo } from "react";
import ProductCard from "@/components/products/ProductCard";
import { featuredProducts, SIZES, COLORS } from "@/lib/productData";
import { ChevronDownIcon, XMarkIcon } from "@heroicons/react/24/outline";
import type { Product, Size, Color } from "@/lib/productData";

type SortOption = "newest" | "price-low" | "price-high" | "rating";

export default function ProductsPage() {
  const [sortBy, setSortBy] = useState<SortOption>("newest");
  const [selectedSizes, setSelectedSizes] = useState<Size[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 500]);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  const maxPrice = Math.max(...featuredProducts.map(p => Math.max(p.price, p.discountPrice || 0))) + 50;

  // Filter products
  const filteredProducts = useMemo(() => {
    let result = [...featuredProducts];

    // Category filter
    if (selectedCategory) {
      result = result.filter(p => p.category === selectedCategory);
    }

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

    return result;
  }, [selectedCategory, priceRange, selectedSizes, selectedColors]);

  // Sort products
  const sortedProducts = useMemo(() => {
    const result = [...filteredProducts];

    switch (sortBy) {
      case "price-low":
        return result.sort((a, b) => {
          const priceA = a.discountPrice ?? a.price;
          const priceB = b.discountPrice ?? b.price;
          return priceA - priceB;
        });
      case "price-high":
        return result.sort((a, b) => {
          const priceA = a.discountPrice ?? a.price;
          const priceB = b.discountPrice ?? b.price;
          return priceB - priceA;
        });
      case "rating":
        return result.sort((a, b) => b.rating - a.rating);
      case "newest":
      default:
        return result;
    }
  }, [filteredProducts, sortBy]);

  const categories = Array.from(new Set(featuredProducts.map(p => p.category)));

  const toggleSize = (size: Size) => {
    setSelectedSizes(prev =>
      prev.includes(size) ? prev.filter(s => s !== size) : [...prev, size]
    );
  };

  const toggleColor = (colorName: string) => {
    setSelectedColors(prev =>
      prev.includes(colorName) ? prev.filter(c => c !== colorName) : [...prev, colorName]
    );
  };

  const clearFilters = () => {
    setSortBy("newest");
    setSelectedSizes([]);
    setSelectedColors([]);
    setPriceRange([0, maxPrice]);
    setSelectedCategory("");
  };

  const hasActiveFilters = selectedSizes.length > 0 || selectedColors.length > 0 || selectedCategory || priceRange[0] > 0 || priceRange[1] < maxPrice;

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="border-b border-neutral-200 bg-neutral-50 px-4 py-8">
        <div className="mx-auto max-w-6xl">
          <h1 className="text-3xl font-bold text-neutral-900">All Products</h1>
          <p className="mt-2 text-neutral-700">
            Showing {sortedProducts.length} of {featuredProducts.length} products
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-4 py-8">
        <div className="grid gap-8 lg:grid-cols-4">
          {/* Filters Sidebar */}
          <div className={`lg:col-span-1 ${showMobileFilters ? "block" : "hidden lg:block"}`}>
            <div className="rounded-2xl border border-neutral-200 bg-white p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-neutral-900">Filters</h2>
                {hasActiveFilters && (
                  <button
                    onClick={clearFilters}
                    className="text-xs font-medium text-neutral-700 hover:text-neutral-900 underline"
                  >
                    Clear
                  </button>
                )}
              </div>

              {/* Category Filter */}
              <div className="mb-6 pb-6 border-b border-neutral-200">
                <p className="text-sm font-semibold text-neutral-900 mb-3">Category</p>
                <div className="space-y-2">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={!selectedCategory}
                      onChange={() => setSelectedCategory("")}
                      className="h-4 w-4 rounded border-neutral-300"
                    />
                    <span className="text-sm text-neutral-700">All Categories</span>
                  </label>
                  {categories.map(cat => (
                    <label key={cat} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={selectedCategory === cat}
                        onChange={() => setSelectedCategory(selectedCategory === cat ? "" : cat)}
                        className="h-4 w-4 rounded border-neutral-300"
                      />
                      <span className="text-sm text-neutral-700 capitalize">{cat}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Price Range Filter */}
              <div className="mb-6 pb-6 border-b border-neutral-200">
                <p className="text-sm font-semibold text-neutral-900 mb-3">Price Range</p>
                <div className="space-y-3">
                  <input
                    type="range"
                    min="0"
                    max={maxPrice}
                    value={priceRange[0]}
                    onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
                    className="w-full"
                  />
                  <input
                    type="range"
                    min="0"
                    max={maxPrice}
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                    className="w-full"
                  />
                  <div className="flex justify-between text-sm text-neutral-700">
                    <span>${priceRange[0]}</span>
                    <span>${priceRange[1]}</span>
                  </div>
                </div>
              </div>

              {/* Size Filter */}
              <div className="mb-6 pb-6 border-b border-neutral-200">
                <p className="text-sm font-semibold text-neutral-900 mb-3">Size</p>
                <div className="grid grid-cols-3 gap-2">
                  {SIZES.map(size => (
                    <button
                      key={size}
                      onClick={() => toggleSize(size)}
                      className={`rounded-lg px-3 py-2 text-xs font-medium transition ${
                        selectedSizes.includes(size)
                          ? "bg-neutral-900 text-white"
                          : "border border-neutral-300 text-neutral-900 hover:border-neutral-900"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Color Filter */}
              <div>
                <p className="text-sm font-semibold text-neutral-900 mb-3">Color</p>
                <div className="flex flex-wrap gap-3">
                  {COLORS.map(color => (
                    <button
                      key={color.name}
                      onClick={() => toggleColor(color.name)}
                      className={`flex flex-col items-center gap-1 transition ${
                        selectedColors.includes(color.name) ? "opacity-100" : "opacity-70 hover:opacity-100"
                      }`}
                      title={color.name}
                    >
                      <div
                        className={`h-8 w-8 rounded-full border-2 transition ${
                          selectedColors.includes(color.name)
                            ? "border-neutral-900 shadow-md"
                            : "border-neutral-300"
                        }`}
                        style={{
                          backgroundColor: color.code,
                          borderColor: color.code === "#FFFFFF" ? "#ccc" : undefined
                        }}
                      />
                      <span className="text-xs text-neutral-700">{color.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Products Grid */}
          <div className="lg:col-span-3">
            {/* Toolbar */}
            <div className="mb-6 flex items-center justify-between">
              <div>
                <p className="text-sm text-neutral-700">
                  {sortedProducts.length} {sortedProducts.length === 1 ? "product" : "products"}
                </p>
              </div>
              <div className="flex items-center gap-3">
                {/* Mobile Filter Toggle */}
                <button
                  onClick={() => setShowMobileFilters(!showMobileFilters)}
                  className="lg:hidden flex items-center gap-2 rounded-full border border-neutral-300 px-3 py-2 text-sm font-medium text-neutral-900 hover:border-neutral-900 transition"
                >
                  Filters
                  <ChevronDownIcon className="h-4 w-4" />
                </button>

                {/* Sort Dropdown */}
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as SortOption)}
                  className="rounded-full border border-neutral-300 bg-white px-4 py-2 text-sm font-medium text-neutral-900 outline-none focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900"
                >
                  <option value="newest">Newest</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Best Rating</option>
                </select>
              </div>
            </div>

            {/* Products Grid */}
            {sortedProducts.length === 0 ? (
              <div className="rounded-lg border border-neutral-200 bg-neutral-50 p-12 text-center">
                <p className="text-neutral-700">No products found matching your filters.</p>
                <button
                  onClick={clearFilters}
                  className="mt-4 rounded-full bg-neutral-900 px-6 py-2 text-sm font-medium text-white hover:bg-neutral-800 transition"
                >
                  Clear Filters
                </button>
              </div>
            ) : (
              <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 lg:grid-cols-3">
                {sortedProducts.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
