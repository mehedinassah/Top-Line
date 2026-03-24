"use client";

import type { Color } from "@/lib/productData";

interface ColorSelectorProps {
  selectedColor: Color | null;
  onColorChange: (color: Color) => void;
  colors: Color[];
}

export default function ColorSelector({
  selectedColor,
  onColorChange,
  colors
}: ColorSelectorProps) {
  return (
    <div>
      <label className="text-sm font-semibold text-neutral-900">Color</label>
      <div className="mt-3 flex flex-wrap gap-3">
        {colors.map((color) => {
          const isSelected = selectedColor?.name === color.name;
          
          return (
            <button
              key={color.name}
              onClick={() => onColorChange(color)}
              className={`flex flex-col items-center gap-1.5 transition ${
                isSelected ? "opacity-100" : "opacity-75 hover:opacity-100"
              }`}
              title={`Select ${color.name} color`}
              aria-label={`Color ${color.name}${isSelected ? " (selected)" : ""}`}
            >
              <div
                className={`h-10 w-10 border-2 transition ${
                  isSelected
                    ? "border-neutral-900 shadow-md"
                    : "border-neutral-300 hover:border-neutral-500"
                }`}
                style={{
                  backgroundColor: color.code,
                  borderColor: color.code === "#FFFFFF" ? "#ccc" : undefined
                }}
              />
              <span className="text-xs font-medium text-neutral-900">
                {color.name}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

