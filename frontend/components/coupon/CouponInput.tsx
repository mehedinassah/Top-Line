"use client";

import { useState } from "react";
import { validateCoupon, getCouponSuggestions } from "@/lib/couponUtils";
import { useCart } from "@/components/cart/CartContext";
import { CheckIcon, XMarkIcon } from "@heroicons/react/24/outline";

interface CouponInputProps {
  onApply?: (code: string, discount: number) => void;
  showSuggestions?: boolean;
  className?: string;
}

export default function CouponInput({
  onApply,
  showSuggestions = false,
  className = ""
}: CouponInputProps) {
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { subtotal, appliedCoupon, applyCoupon, removeCoupon } = useCart();

  const handleApply = async () => {
    setError("");
    setSuccess(false);
    setIsLoading(true);

    if (!code.trim()) {
      setError("Please enter a coupon code");
      setIsLoading(false);
      return;
    }

    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 300));

    const result = validateCoupon(code, subtotal);

    if (result.valid && result.coupon) {
      // Remove old coupon and apply new one
      if (appliedCoupon) {
        console.log('♻️ Replacing coupon:', appliedCoupon.code, '→', result.coupon.code);
        removeCoupon();
      }
      console.log('✅ Applying coupon:', result.coupon.code, 'Discount:', result.discount);
      applyCoupon(result.coupon, result.discount);
      setSuccess(true);
      setCode("");
      onApply?.(result.coupon.code, result.discount);
      
      // Clear success message after 3 seconds
      setTimeout(() => setSuccess(false), 3000);
    } else {
      setError(result.error || "Invalid coupon code");
    }

    setIsLoading(false);
  };

  const handleRemoveCoupon = () => {
    removeCoupon();
    setError("");
    setSuccess(false);
    setCode("");
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleApply();
    }
  };

  const suggestions = showSuggestions ? getCouponSuggestions(subtotal) : [];

  // Format currency display
  const formatCurrencyDisplay = (amount: number) => {
    return `৳${amount.toLocaleString()}`;
  };

  return (
    <div className={`space-y-3 ${className}`}>
      {/* Applied Coupon Display - Compact on mobile */}
      {appliedCoupon && (
        <div className="flex items-start justify-between gap-2 bg-green-50 border border-green-200 p-2.5 sm:p-3">
          <div className="flex items-start gap-2 flex-1 min-w-0">
            <CheckIcon className="h-4 w-4 text-green-600 flex-shrink-0 mt-0.5" />
            <div className="min-w-0">
              <p className="text-xs font-semibold text-green-900">
                {appliedCoupon.code} applied ✓
              </p>
              <p className="text-xs text-green-700 line-clamp-2">
                {appliedCoupon.description}
              </p>
              <p className="text-xs text-green-600 mt-0.5">
                Enter a different code to replace it
              </p>
            </div>
          </div>
          <button
            onClick={handleRemoveCoupon}
            className="flex-shrink-0 p-1 hover:bg-green-100 transition"
            title="Remove coupon"
          >
            <XMarkIcon className="h-4 w-4 text-green-600" />
          </button>
        </div>
      )}

      {/* Coupon Input Section */}
      {!appliedCoupon && (
        <>
          {/* Input & Button */}
          <div className="space-y-1.5 sm:space-y-0">
            <input
              type="text"
              placeholder="Enter coupon code"
              value={code}
              onChange={(e) => {
                setCode(e.target.value.toUpperCase());
                setError("");
              }}
              onKeyDown={handleKeyDown}
              disabled={isLoading}
              className="w-full px-2.5 py-1.5 sm:px-3 sm:py-2 border border-neutral-300 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:border-transparent disabled:bg-neutral-50 transition"
            />
            <button
              onClick={handleApply}
              disabled={isLoading || !code.trim()}
              className="w-full sm:w-auto px-3 py-1.5 sm:py-2 bg-neutral-900 text-white text-xs font-medium hover:bg-neutral-800 disabled:bg-neutral-400 disabled:cursor-not-allowed transition"
            >
              {isLoading ? "..." : "Apply"}
            </button>
          </div>

          {/* Messages - Compact */}
          {error && (
            <div className="flex items-start gap-2 bg-red-50 border border-red-200 p-2">
              <XMarkIcon className="h-3.5 w-3.5 text-red-600 flex-shrink-0 mt-0.5" />
              <p className="text-xs text-red-700">{error}</p>
            </div>
          )}

          {success && (
            <div className="flex items-start gap-2 bg-green-50 border border-green-200 p-2">
              <CheckIcon className="h-3.5 w-3.5 text-green-600 flex-shrink-0 mt-0.5" />
              <p className="text-xs text-green-700">Coupon applied!</p>
            </div>
          )}
        </>
      )}

      {/* Coupon Suggestions - Compact mobile layout */}
      {showSuggestions && suggestions.length > 0 && !appliedCoupon && (
        <div className="border-t border-neutral-200 pt-2 mt-2">
          <p className="text-xs font-semibold text-neutral-700 mb-1.5">Available coupons:</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5">
            {suggestions.map((coupon) => (
              <button
                key={coupon.code}
                onClick={() => {
                  setCode(coupon.code);
                  setError("");
                }}
                className="px-2 py-1.5 bg-neutral-100 hover:bg-neutral-200 active:bg-neutral-300 border border-neutral-300 text-xs font-semibold text-neutral-700 transition text-center hover:border-neutral-400"
                title={coupon.description}
              >
                {coupon.code}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
