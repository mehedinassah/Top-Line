"use client";

import type { Size } from "@/lib/productData";
import { SIZES } from "@/lib/productData";

interface SizeSelectorProps {
  selectedSize: Size | null;
  onSizeChange: (size: Size) => void;
  availableSizes: Size[];
}

export default function SizeSelector({
  selectedSize,
  onSizeChange,
  availableSizes
}: SizeSelectorProps) {
  return (
    <div>
      <label className="text-sm font-semibold text-neutral-900">Size</label>
      <div className="mt-3 grid grid-cols-4 gap-1.5 sm:grid-cols-7">
        {SIZES.map((size) => {
          const isAvailable = availableSizes.includes(size);
          const isSelected = selectedSize === size;
          
          return (
            <button
              key={size}
              onClick={() => isAvailable && onSizeChange(size)}
              disabled={!isAvailable}
              className={`px-2 py-1.5 text-xs font-medium transition ${
                isSelected
                  ? "border-2 border-neutral-900 bg-neutral-900 text-white"
                  : isAvailable
                  ? "border border-neutral-300 bg-white text-neutral-900 hover:border-neutral-900"
                  : "cursor-not-allowed border border-neutral-200 bg-neutral-50 text-neutral-400"
              }`}
              title={isAvailable ? `Select size ${size}` : `Size ${size} not available`}
              aria-label={`Size ${size}${isSelected ? " (selected)" : ""}${!isAvailable ? " (unavailable)" : ""}`}
            >
              {size}
            </button>
          );
        })}
      </div>
    </div>
  );
}

