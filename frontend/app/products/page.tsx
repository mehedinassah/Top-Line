"use client";

import { useState, useMemo } from "react";
import ProductCard from "@/components/products/ProductCard";
import { featuredProducts, SIZES } from "@/lib/productData";
import { ChevronDownIcon, XMarkIcon } from "@heroicons/react/24/outline";
import type { Product, Size } from "@/lib/productData";

type SortOption = "newest" | "price-low" | "price-high" | "rating";

export default function ProductsPage() {
  const [sortBy, setSortBy] = useState<SortOption>("newest");
  const [selectedSizes, setSelectedSizes] = useState<Size[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 500]);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 12;

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

    return result;
  }, [selectedCategory, priceRange, selectedSizes]);

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

  const clearFilters = () => {
    setSortBy("newest");
    setSelectedSizes([]);
    setPriceRange([0, maxPrice]);
    setSelectedCategory("");
  };

  const hasActiveFilters = selectedSizes.length > 0 || selectedCategory || priceRange[0] > 0 || priceRange[1] < maxPrice;

  // Pagination logic
  const totalPages = Math.ceil(sortedProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedProducts = sortedProducts.slice(startIndex, endIndex);

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="border-b border-neutral-200 bg-white px-6 py-12 md:px-8 md:py-16">
        <div className="max-w-2xl">
          <h2 className="text-sm font-semibold tracking-widest text-neutral-700 uppercase">
            Curated Collection
          </h2>
          <h1 className="mt-3 text-4xl md:text-5xl font-bold text-neutral-900 tracking-tight">
            New Arrivals
          </h1>
          <p className="mt-4 text-neutral-700 max-w-2xl">
            Discover our latest pieces, carefully selected to bring you the freshest styles of the season. {sortedProducts.length} items available.
          </p>
        </div>
      </div>

      {/* Main Content - Full Width */}
      <div className="w-full" style={{ backgroundColor: "#F5F5F5" }}>
        <div className="flex flex-col gap-8 px-6 py-12 md:px-8 md:py-16 lg:py-20">
          {/* Controls and Filters */}
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Filters Sidebar */}
            <div className={`lg:w-64 flex-shrink-0 ${showMobileFilters ? "block" : "hidden lg:block"}`}>
            <div className="rounded-2xl border border-neutral-200 bg-white p-8">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-lg font-semibold text-neutral-900">Refine</h2>
                {hasActiveFilters && (
                  <button
                    onClick={clearFilters}
                    className="text-xs font-medium text-neutral-600 hover:text-neutral-900 underline transition"
                  >
                    Clear all
                  </button>
                )}
              </div>

              {/* Category Filter */}
              <div className="mb-8 pb-8 border-b border-neutral-200">
                <p className="text-xs font-semibold text-neutral-900 mb-4 uppercase tracking-wide">Category</p>
                <div className="space-y-2">
                  <button
                    onClick={() => {
                      setSelectedCategory("");
                      setCurrentPage(1);
                    }}
                    className={`w-full text-left px-3 py-2 text-sm rounded-lg transition ${
                      !selectedCategory
                        ? "bg-neutral-900 text-white"
                        : "text-neutral-700 hover:bg-neutral-50"
                    }`}
                  >
                    All Items
                  </button>
                  {categories.map(cat => (
                    <button
                      key={cat}
                      onClick={() => {
                        setSelectedCategory(selectedCategory === cat ? "" : cat);
                        setCurrentPage(1);
                      }}
                      className={`w-full text-left px-3 py-2 text-sm rounded-lg transition capitalize ${
                        selectedCategory === cat
                          ? "bg-neutral-900 text-white"
                          : "text-neutral-700 hover:bg-neutral-50"
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Range Filter */}
              <div className="mb-8 pb-8 border-b border-neutral-200">
                <p className="text-xs font-semibold text-neutral-900 mb-4 uppercase tracking-wide">Price Range</p>
                <div className="space-y-4">
                  <input
                    type="range"
                    min="0"
                    max={maxPrice}
                    value={priceRange[0]}
                    onChange={(e) => {
                      setPriceRange([Number(e.target.value), priceRange[1]]);
                      setCurrentPage(1);
                    }}
                    className="w-full"
                  />
                  <input
                    type="range"
                    min="0"
                    max={maxPrice}
                    value={priceRange[1]}
                    onChange={(e) => {
                      setPriceRange([priceRange[0], Number(e.target.value)]);
                      setCurrentPage(1);
                    }}
                    className="w-full"
                  />
                  <div className="flex justify-between text-sm font-medium text-neutral-900">
                    <span>${priceRange[0]}</span>
                    <span>${priceRange[1]}</span>
                  </div>
                </div>
              </div>

              {/* Size Filter */}
              <div>
                <p className="text-xs font-semibold text-neutral-900 mb-4 uppercase tracking-wide">Size</p>
                <div className="grid grid-cols-3 gap-2">
                  {SIZES.map(size => (
                    <button
                      key={size}
                      onClick={() => {
                        toggleSize(size);
                        setCurrentPage(1);
                      }}
                      className={`rounded-lg px-3 py-2.5 text-xs font-semibold transition ${
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
            </div>
            </div>

          {/* Products Section */}
          <div className="flex-1">
            {/* Toolbar */}
            <div className="mb-8 flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-neutral-700">
                  {sortedProducts.length} {sortedProducts.length === 1 ? "item" : "items"} found • Page {currentPage} of {totalPages}
                </p>
              </div>
              <div className="flex items-center gap-3">
                {/* Mobile Filter Toggle */}
                <button
                  onClick={() => setShowMobileFilters(!showMobileFilters)}
                  className="lg:hidden flex items-center gap-2 rounded-full border border-neutral-300 px-4 py-2 text-sm font-medium text-neutral-900 hover:bg-neutral-50 transition"
                >
                  Refine
                  <ChevronDownIcon className="h-4 w-4" />
                </button>

                {/* Sort Dropdown */}
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as SortOption)}
                  className="rounded-full border border-neutral-300 bg-white px-4 py-2 text-sm font-medium text-neutral-900 outline-none focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900 hover:border-neutral-400 transition"
                >
                  <option value="newest">Newest First</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Top Rated</option>
                </select>
              </div>
            </div>

            {/* Products Grid */}
            {sortedProducts.length === 0 ? (
              <div className="rounded-2xl border border-neutral-200 bg-neutral-50 p-12 text-center">
                <p className="text-neutral-700 mb-4">No items match your selections.</p>
                <button
                  onClick={clearFilters}
                  className="rounded-full bg-neutral-900 px-6 py-2.5 text-sm font-semibold text-white hover:bg-neutral-800 transition"
                >
                  Clear Filters
                </button>
              </div>
            ) : (
              <>
                <div className="grid gap-6 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 md:gap-8">
                  {paginatedProducts.map(product => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>

                {/* Pagination Controls */}
                {totalPages > 1 && (
                  <div className="mt-12 flex items-center justify-center gap-2">
                    <button
                      onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                      disabled={currentPage === 1}
                      className="rounded-lg border border-neutral-300 px-4 py-2 text-sm font-medium text-neutral-900 hover:bg-neutral-50 disabled:opacity-50 disabled:cursor-not-allowed transition"
                    >
                      Previous
                    </button>

                    <div className="flex gap-1">
                      {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                        <button
                          key={page}
                          onClick={() => setCurrentPage(page)}
                          className={`h-10 w-10 rounded-lg text-sm font-medium transition ${
                            currentPage === page
                              ? "bg-neutral-900 text-white"
                              : "border border-neutral-300 text-neutral-900 hover:bg-neutral-50"
                          }`}
                        >
                          {page}
                        </button>
                      ))}
                    </div>

                    <button
                      onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                      disabled={currentPage === totalPages}
                      className="rounded-lg border border-neutral-300 px-4 py-2 text-sm font-medium text-neutral-900 hover:bg-neutral-50 disabled:opacity-50 disabled:cursor-not-allowed transition"
                    >
                      Next
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
    </div>
  );
}
