"use client";

import { useState, useEffect } from "react";
import { availableCoupons } from "@/lib/productData";
import { getActiveCoupons } from "@/lib/couponUtils";
import { SparklesIcon, XMarkIcon } from "@heroicons/react/24/outline";

export default function PromotionalBanner() {
  const [isVisible, setIsVisible] = useState(true);
  const [activeCoupons, setActiveCoupons] = useState<typeof availableCoupons>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const coupons = getActiveCoupons();
    setActiveCoupons(coupons);
    
    // Rotate through coupons every 5 seconds
    if (coupons.length > 0) {
      const interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % coupons.length);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, []);

  if (!isVisible || activeCoupons.length === 0) return null;

  const currentCoupon = activeCoupons[currentIndex];
  const discountText =
    currentCoupon.type === "percentage"
      ? `${currentCoupon.value}% OFF`
      : currentCoupon.value === 0
      ? "FREE SHIPPING"
      : `$${currentCoupon.value} OFF`;

  return (
    <div className="relative bg-gradient-to-r from-emerald-600 to-teal-600 text-white">
      <div className="mx-auto max-w-6xl px-4 py-3 sm:py-4">
        <div className="flex items-center justify-between gap-4">
          {/* Left - Icon and Content */}
          <div className="flex items-center gap-3 flex-1">
            <SparklesIcon className="h-5 w-5 sm:h-6 sm:w-6 flex-shrink-0 animate-pulse" />
            <div className="flex flex-col sm:flex-row sm:items-center sm:gap-2">
              <span className="text-sm sm:text-base font-bold">{discountText}</span>
              <span className="text-xs sm:text-sm opacity-90">
                Use code <span className="font-mono font-bold">{currentCoupon.code}</span>{" "}
                {currentCoupon.minPurchaseAmount > 0 && (
                  <>on orders over ৳{currentCoupon.minPurchaseAmount.toLocaleString()}</>
                )}
              </span>
            </div>
          </div>

          {/* Right - View All and Close */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => window.location.href = "/offers"}
              className="text-xs sm:text-sm font-semibold px-2 sm:px-3 py-1 hover:bg-white/20 transition whitespace-nowrap"
              title="View all coupons"
            >
              View All
            </button>
            <button
              onClick={() => setIsVisible(false)}
              className="p-1 hover:bg-white/20 transition"
              aria-label="Close banner"
              title="Close promotional banner"
            >
              <XMarkIcon className="h-4 w-4 sm:h-5 sm:w-5" />
            </button>
          </div>
        </div>

        {/* Indicator dots for mobile */}
        {activeCoupons.length > 1 && (
          <div className="flex gap-1 items-center justify-center mt-2 md:hidden">
            {activeCoupons.map((_, idx) => (
              <div
                key={idx}
                className={`h-1.5 rounded-full transition-all ${
                  idx === currentIndex ? "w-6 bg-white" : "w-1.5 bg-white/50"
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
