"use client";

import { useState, useMemo, useRef, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import ProductCard from "@/components/products/ProductCard";
import FilterDrawer from "@/components/products/FilterDrawer";
import { featuredProducts, SIZES } from "@/lib/productData";
import { FunnelIcon } from "@heroicons/react/24/outline";
import type { Product, Size } from "@/lib/productData";

type SortOption = "newest" | "price-low" | "price-high" | "rating";

function ProductsPageContent() {
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get("search") || "";
  
  const itemsPerPage = 12;
  const maxPrice = Math.max(...featuredProducts.map(p => Math.max(p.price, p.discountPrice || 0))) + 50;

  const [sortBy, setSortBy] = useState<SortOption>("newest");
  const [selectedSizes, setSelectedSizes] = useState<Size[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, maxPrice]);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [showFilterDrawer, setShowFilterDrawer] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  // Ref for scrolling to products
  const productsGridRef = useRef<HTMLDivElement>(null);

  // Scroll to products grid when page changes
  useEffect(() => {
    productsGridRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, [currentPage]);

  // Filter products
  const filteredProducts = useMemo(() => {
    let result = [...featuredProducts];

    // Search filter
    if (searchQuery) {
      result = result.filter(p =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.description.story.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.description.highlights.some(h => h.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

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
  }, [searchQuery, selectedCategory, priceRange, selectedSizes]);

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

  const clearFilters = () => {
    setSortBy("newest");
    setSelectedSizes([]);
    setPriceRange([0, maxPrice]);
    setSelectedCategory("");
  };

  const hasActiveFilters = selectedSizes.length > 0 || !!selectedCategory || priceRange[0] > 0 || priceRange[1] < maxPrice;

  // Pagination logic
  const totalPages = Math.ceil(sortedProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedProducts = sortedProducts.slice(startIndex, endIndex);

  return (
    <div className="min-h-screen bg-white">
      {/* Backdrop - Closes drawer and dims content */}
      {showFilterDrawer && (
        <div
          className="fixed inset-0 bg-black/20 z-30"
          onClick={() => setShowFilterDrawer(false)}
          aria-hidden="true"
        />
      )}

      {/* Header */}
      <div className="relative h-64 sm:h-72 md:h-96 lg:h-screen overflow-hidden bg-neutral-900 flex items-center w-full">
        <Image
          src="https://images.pexels.com/photos/3073037/pexels-photo-3073037.jpeg?auto=compress&cs=tinysrgb&w=2000&h=2000"
          alt="New Arrivals hero image"
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        {/* Content */}
        <div className="absolute bottom-16 sm:bottom-20 md:bottom-32 lg:bottom-40 right-4 sm:right-6 md:right-8">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light text-white tracking-tight text-right">New Arrivals</h1>
        </div>
      </div>

      {/* Main Section with Sidebar and Content */}
      <div 
        className="flex w-full"
        style={{ 
          backgroundColor: "#F5F5F5",
        }}
      >
        {/* Filter Drawer - Flex Item */}
        <FilterDrawer
          open={showFilterDrawer}
          onClose={() => setShowFilterDrawer(false)}
          categories={categories}
          selectedCategory={selectedCategory}
          onCategoryChange={(cat) => {
            setSelectedCategory(selectedCategory === cat ? "" : cat);
            setCurrentPage(1);
          }}
          priceRange={priceRange}
          onPriceChange={(range) => {
            setPriceRange(range);
            setCurrentPage(1);
          }}
          maxPrice={maxPrice}
          selectedSizes={selectedSizes}
          onSizeToggle={(size) => {
            setSelectedSizes(prev =>
              prev.includes(size) ? prev.filter(s => s !== size) : [...prev, size]
            );
            setCurrentPage(1);
          }}
          hasActiveFilters={hasActiveFilters}
          onClearFilters={clearFilters}
          SIZES={SIZES}
        />

        {/* Main Content - Flex Item */}
        <div className="flex-1">
        <div className="flex flex-col gap-6 sm:gap-8 px-4 sm:px-6 md:px-8 py-8 sm:py-12 md:py-16 lg:py-20">
          {/* Search Results Header */}
          {searchQuery && (
            <div className="pb-4 border-b border-neutral-200">
              <p className="text-sm text-neutral-600">
                Search results for: <span className="font-semibold text-neutral-900">"{searchQuery}"</span>
              </p>
            </div>
          )}

          {/* Toolbar */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-6">
            <div>
              <p className="text-xs sm:text-sm font-medium text-neutral-700">
                {sortedProducts.length} {sortedProducts.length === 1 ? "item" : "items"} found • Page {currentPage} of {totalPages}
              </p>
            </div>
            <div className="flex items-center gap-2 sm:gap-3 w-full sm:w-auto">
              {/* Filter Toggle Button */}
              <button
                onClick={() => setShowFilterDrawer(true)}
                className="flex items-center gap-2 border border-neutral-300 px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium text-neutral-900 hover:bg-neutral-50 transition flex-1 sm:flex-none"
              >
                <FunnelIcon className="h-4 w-4" />
                Filters
              </button>

              {/* Sort Dropdown */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortOption)}
                className="border border-neutral-300 bg-white px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium text-neutral-900 outline-none focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900 hover:border-neutral-400 transition flex-1 sm:flex-none"
              >
                <option value="newest">Newest First</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Top Rated</option>
              </select>
            </div>
          </div>

          {/* Main Content with Products Grid */}
          <div ref={productsGridRef}>
            {sortedProducts.length === 0 ? (
              <div className="border border-neutral-200 bg-neutral-50 p-6 sm:p-8 md:p-12 text-center">
                <p className="text-sm sm:text-base text-neutral-700 mb-4">No items match your selections.</p>
                <button
                  onClick={clearFilters}
                  className="bg-neutral-900 px-4 sm:px-6 py-2 sm:py-2.5 text-xs sm:text-sm font-semibold text-white hover:bg-neutral-800 transition"
                >
                  Clear Filters
                </button>
              </div>
            ) : (
              <>
                <div className="grid gap-2 sm:gap-3 md:gap-3 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                  {paginatedProducts.map(product => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>

                {/* Pagination Controls */}
                {totalPages > 1 && (
                  <div className="mt-8 sm:mt-10 md:mt-12 flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3">
                    <button
                      onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                      disabled={currentPage === 1}
                      className="border border-neutral-300 px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium text-neutral-900 hover:bg-neutral-50 disabled:opacity-50 disabled:cursor-not-allowed transition w-full sm:w-auto"
                    >
                      Previous
                    </button>

                    <div className="flex gap-1 flex-wrap justify-center">
                      {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                        <button
                          key={page}
                          onClick={() => setCurrentPage(page)}
                          className={`h-8 sm:h-10 w-8 sm:w-10 text-xs sm:text-sm font-medium transition ${
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
                      className="border border-neutral-300 px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium text-neutral-900 hover:bg-neutral-50 disabled:opacity-50 disabled:cursor-not-allowed transition w-full sm:w-auto"
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

export default function ProductsPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-white" />}>
      <ProductsPageContent />
    </Suspense>
  );
}

