"use client";

import { useState } from "react";
import { availableCoupons } from "@/lib/productData";
import { getActiveCoupons, formatCouponDiscount, validateCoupon } from "@/lib/couponUtils";
import { SparklesIcon, CheckCircleIcon } from "@heroicons/react/24/outline";
import { useToast } from "@/components/toast/ToastContext";
import { useCart } from "@/components/cart/CartContext";

export default function OffersSection() {
  const activeCoupons = getActiveCoupons();
  const [appliedCode, setAppliedCode] = useState<string | null>(null);
  const { addToast } = useToast();
  const { applyCoupon, removeCoupon, subtotal } = useCart();

  if (activeCoupons.length === 0) {
    return (
      <div className="mx-auto max-w-6xl px-4 py-12 text-center">
        <p className="text-neutral-600">No active offers at this time. Check back soon!</p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-neutral-900 mb-2 flex items-center gap-2">
          <SparklesIcon className="h-8 w-8 text-emerald-600" />
          Active Offers & Coupons
        </h2>
        <p className="text-neutral-600">
          Save big with our exclusive promotional codes. Valid until shown expiry date.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {activeCoupons.map((coupon) => (
          <div
            key={coupon.code}
            className="border border-neutral-200 p-5 sm:p-6 hover:shadow-lg transition-shadow bg-white"
          >
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-lg font-bold text-neutral-900">{coupon.code}</h3>
                <p className="text-sm text-neutral-600">{coupon.description}</p>
              </div>
              <div className="bg-emerald-50 px-3 py-2 rounded">
                <p className="text-lg font-bold text-emerald-600">
                  {formatCouponDiscount(coupon, coupon.value)}
                </p>
              </div>
            </div>

            {/* Details */}
            <div className="space-y-2 mb-4 text-sm">
              {coupon.minPurchaseAmount > 0 && (
                <div className="flex items-center gap-2 text-neutral-600">
                  <CheckCircleIcon className="h-4 w-4 text-emerald-600 flex-shrink-0" />
                  <span>Minimum purchase: ৳{coupon.minPurchaseAmount.toLocaleString()}</span>
                </div>
              )}
              <div className="flex items-center gap-2 text-neutral-600">
                <CheckCircleIcon className="h-4 w-4 text-emerald-600 flex-shrink-0" />
                <span>Expires: {new Date(coupon.expiryDate).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center gap-2 text-neutral-600">
                <CheckCircleIcon className="h-4 w-4 text-emerald-600 flex-shrink-0" />
                <span>
                  {coupon.maxUses - coupon.currentUses} uses remaining
                </span>
              </div>
            </div>

            {/* Usage bar */}
            <div className="mb-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs text-neutral-600 font-medium">Usage</span>
                <span className="text-xs text-neutral-600">
                  {coupon.currentUses}/{coupon.maxUses}
                </span>
              </div>
              <div className="w-full bg-neutral-200 h-2">
                <div
                  className="bg-gradient-to-r from-emerald-500 to-teal-500 h-2 transition-all"
                  style={{
                    width: `${(coupon.currentUses / coupon.maxUses) * 100}%`,
                  }}
                />
              </div>
            </div>

            {/* Copy button */}
            <button
              onClick={() => {
                // Validate and apply the coupon
                const result = validateCoupon(coupon.code, subtotal);
                
                if (result.valid && result.coupon) {
                  // Remove any previously applied coupon
                  if (appliedCode) {
                    removeCoupon();
                  }
                  
                  // Apply the new coupon
                  applyCoupon(result.coupon, result.discount);
                  setAppliedCode(coupon.code);
                  
                  // Copy code to clipboard as well
                  navigator.clipboard.writeText(coupon.code);
                  
                  addToast(`Coupon "${coupon.code}" applied! (Copied to clipboard)`, "success", 3000);
                  
                  // Reset after 3 seconds
                  setTimeout(() => setAppliedCode(null), 3000);
                } else {
                  addToast(result.error || "Cannot apply this coupon", "error", 3000);
                }
              }}
              disabled={appliedCode !== null}
              className={`w-full font-semibold py-2 transition text-sm ${
                appliedCode !== null
                  ? "bg-neutral-400 text-white cursor-not-allowed opacity-60"
                  : "bg-neutral-900 hover:bg-neutral-800 text-white"
              }`}
              title={appliedCode !== null ? "Coupon applied - wait before applying another" : `Apply coupon code ${coupon.code}`}
            >
              {appliedCode === coupon.code ? "✓ Applied" : "Apply Coupon"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
