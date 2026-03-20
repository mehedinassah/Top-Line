"use client";

import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
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
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" onClose={onClose} className="relative z-50">
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-200"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-150"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/40" />
        </Transition.Child>

        <div className="fixed inset-0 flex justify-start">
          <Transition.Child
            as={Fragment}
            enter="transform transition ease-out duration-200"
            enterFrom="-translate-x-full"
            enterTo="translate-x-0"
            leave="transform transition ease-in duration-150"
            leaveFrom="translate-x-0"
            leaveTo="-translate-x-full"
          >
            <Dialog.Panel className="flex h-full w-1/2 sm:w-1/2 md:w-1/3 lg:w-1/3 flex-col border-r border-neutral-200 bg-white px-4 py-5 sm:px-6 sm:py-6 shadow-xl overflow-y-auto">
              {/* Header */}
              <div className="flex items-center justify-between gap-2 mb-6 sm:mb-8">
                <Dialog.Title className="text-lg font-bold text-neutral-900 md:text-xl">
                  Filters
                </Dialog.Title>
                <button
                  onClick={onClose}
                  className="p-1 hover:bg-neutral-100 rounded-lg transition"
                  aria-label="Close filters"
                >
                  <XMarkIcon className="h-5 w-5 text-neutral-600" />
                </button>
              </div>

              {/* Clear All Button */}
              {hasActiveFilters && (
                <button
                  onClick={() => {
                    onClearFilters();
                    onClose();
                  }}
                  className="mb-6 text-xs font-medium text-neutral-600 hover:text-neutral-900 underline transition w-full text-left"
                >
                  Clear all filters
                </button>
              )}

              {/* Category Filter */}
              <div className="mb-8 pb-8 border-b border-neutral-200">
                <p className="text-xs font-semibold text-neutral-900 mb-4 uppercase tracking-wide">
                  Category
                </p>
                <div className="space-y-2">
                  <button
                    onClick={() => {
                      onCategoryChange("");
                      onClose();
                    }}
                    className={`w-full text-left px-3 py-2.5 text-sm rounded-lg transition font-medium ${
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
                        onClose();
                      }}
                      className={`w-full text-left px-3 py-2.5 text-sm rounded-lg transition capitalize font-medium ${
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
                <p className="text-xs font-semibold text-neutral-900 mb-4 uppercase tracking-wide">
                  Price Range
                </p>
                <div className="space-y-4">
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
                  <div className="flex justify-between text-sm font-medium text-neutral-900">
                    <span>${priceRange[0]}</span>
                    <span>${priceRange[1]}</span>
                  </div>
                </div>
              </div>

              {/* Size Filter */}
              <div>
                <p className="text-xs font-semibold text-neutral-900 mb-4 uppercase tracking-wide">
                  Size
                </p>
                <div className="grid grid-cols-3 gap-2">
                  {SIZES.map((size) => (
                    <button
                      key={size}
                      onClick={() => onSizeToggle(size)}
                      className={`rounded-lg px-2 sm:px-3 py-2.5 text-xs font-semibold transition ${
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
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
