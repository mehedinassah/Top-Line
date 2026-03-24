"use client";

import type { Color } from "@/lib/productData";

interface ColorSelectorProps {
  selectedColor: Color | null;
  onColorChange: (color: Color | null) => void;
  colors: Color[];
}

export default function ColorSelector({
  selectedColor,
  onColorChange,
  colors
}: ColorSelectorProps) {
  const handleColorClick = (color: Color) => {
    // If clicking the same color, deselect it; otherwise select the new color
    if (selectedColor?.name === color.name) {
      onColorChange(null);
    } else {
      onColorChange(color);
    }
  };

  return (
    <div>
      <label className="text-sm font-semibold text-neutral-900">Available Colors</label>
      <div className="mt-3 flex flex-wrap gap-3">
        {colors.map((color) => {
          const isSelected = selectedColor?.name === color.name;
          
          return (
            <button
              key={color.name}
              onClick={() => handleColorClick(color)}
              className={`flex flex-col items-center gap-1.5 transition ${
                isSelected ? "opacity-100 scale-110" : "opacity-75 hover:opacity-100"
              }`}
              title={`${isSelected ? "Deselect" : "Select"} ${color.name} color`}
              aria-label={`Color ${color.name}${isSelected ? " (selected, click to deselect)" : ""}`}
            >
              <div
                className={`h-10 w-10 border-2 transition ${
                  isSelected
                    ? "border-black shadow-md scale-110"
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

