"use client";

import { XMarkIcon } from "@heroicons/react/24/outline";
import type { Size } from "@/lib/productData";

interface FilterDrawerProps {
  open: boolean;
  onClose: () => void;
  categories: string[];
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  priceRange: [number, number];
  onPriceChange: (range: [number, number]) => void;
  maxPrice: number;
  selectedSizes: Size[];
  onSizeToggle: (size: Size) => void;
  hasActiveFilters: boolean;
  onClearFilters: () => void;
  SIZES: Size[];
}

export default function FilterDrawer({
  open,
  onClose,
  categories,
  selectedCategory,
  onCategoryChange,
  priceRange,
  onPriceChange,
  maxPrice,
  selectedSizes,
  onSizeToggle,
  hasActiveFilters,
  onClearFilters,
  SIZES,
}: FilterDrawerProps) {
  return (
    <div
      className={`flex-shrink-0 overflow-hidden transition-all duration-200 ease-out flex flex-col border-r border-neutral-200 bg-white shadow-lg z-40 ${
        open 
          ? "w-full max-w-xs sm:max-w-sm md:w-1/3 lg:w-1/3 min-h-screen pointer-events-auto" 
          : "w-0 pointer-events-none"
      }`}
    >
      {/* Header - Fixed */}
      <div className="flex-shrink-0 flex items-center justify-between gap-2 border-b border-neutral-200 px-4 py-5 sm:px-6 sm:py-6">
        <h2 className="text-lg font-bold text-neutral-900 md:text-xl">
          Filters
        </h2>
        <button
          onClick={onClose}
          className="rounded p-2 hover:bg-neutral-100 transition min-h-[44px] flex items-center justify-center"
          aria-label="Close filters"
        >
          <XMarkIcon className="h-5 w-5 text-neutral-600" />
        </button>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto px-4 py-5 sm:px-6 sm:py-6">
        {/* Clear All Button */}
        {hasActiveFilters && (
          <button
            onClick={() => {
              onClearFilters();
            }}
            className="mb-6 text-xs font-medium text-neutral-600 hover:text-neutral-900 underline transition w-full text-left"
          >
            Clear all filters
          </button>
        )}

        {/* Category Filter */}
        <div className="mb-6 sm:mb-8 pb-6 sm:pb-8 border-b border-neutral-200">
          <p className="text-xs font-semibold text-neutral-900 mb-3 sm:mb-4 uppercase tracking-wide">
            Category
          </p>
          <div className="space-y-2">
            <button
              onClick={() => {
                onCategoryChange("");
              }}
              className={`w-full text-left px-3 py-2 sm:py-2.5 text-xs sm:text-sm transition font-medium ${
                !selectedCategory
                  ? "bg-neutral-900 text-white"
                  : "text-neutral-700 hover:bg-neutral-50"
              }`}
            >
              All Items
            </button>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  onCategoryChange(selectedCategory === cat ? "" : cat);
                }}
                className={`w-full text-left px-3 py-2 sm:py-2.5 text-xs sm:text-sm transition capitalize font-medium ${
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
        <div className="mb-6 sm:mb-8 pb-6 sm:pb-8 border-b border-neutral-200">
          <p className="text-xs font-semibold text-neutral-900 mb-3 sm:mb-4 uppercase tracking-wide">
            Price Range
          </p>
          <div className="space-y-3 sm:space-y-4">
            <input
              type="range"
              min="0"
              max={maxPrice}
              value={priceRange[0]}
              onChange={(e) => {
                onPriceChange([Number(e.target.value), priceRange[1]]);
              }}
              className="w-full accent-neutral-900"
            />
            <input
              type="range"
              min="0"
              max={maxPrice}
              value={priceRange[1]}
              onChange={(e) => {
                onPriceChange([priceRange[0], Number(e.target.value)]);
              }}
              className="w-full accent-neutral-900"
            />
            <div className="flex justify-between text-xs sm:text-sm font-medium text-neutral-900">
              <span>৳{priceRange[0]}</span>
              <span>৳{priceRange[1]}</span>
            </div>
          </div>
        </div>

        {/* Size Filter */}
        <div>
          <p className="text-xs font-semibold text-neutral-900 mb-3 sm:mb-4 uppercase tracking-wide">
            Size
          </p>
          <div className="grid grid-cols-3 gap-2">
            {SIZES.map((size) => (
              <button
                key={size}
                onClick={() => onSizeToggle(size)}
                className={`px-2 sm:px-3 py-2 sm:py-2.5 text-xs font-semibold transition ${
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
  );
}
