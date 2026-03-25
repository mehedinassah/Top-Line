"use client";

import { useState, useEffect } from "react";
import { availableCoupons } from "@/lib/productData";
import { getActiveCoupons, validateCoupon, formatCouponDiscount } from "@/lib/couponUtils";
import { useCart } from "@/components/cart/CartContext";
import { SparklesIcon, XMarkIcon } from "@heroicons/react/24/outline";
import type { Coupon } from "@/lib/productData";

export default function CouponRecommendationBanner() {
  const { subtotal, appliedCoupon, applyCoupon } = useCart();
  const [recommendedCoupon, setRecommendedCoupon] = useState<Coupon | null>(null);
  const [recommendation, setRecommendation] = useState<{ coupon: Coupon; discount: number } | null>(null);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    // Initialize with default coupons to match server render
    const defaultActiveCoupons = (() => {
      const today = new Date();
      return availableCoupons.filter(coupon => {
        const expiryDate = new Date(coupon.expiryDate);
        return (
          coupon.active &&
          today <= expiryDate &&
          coupon.currentUses < coupon.maxUses
        );
      });
    })();

    setRecommendedCoupon(
      defaultActiveCoupons.find(c => c.code === (appliedCoupon?.code || "")) || null
    );
  }, [appliedCoupon]);

  useEffect(() => {
    // After hydration, get actual coupons with updated uses
    const activeCoupons = getActiveCoupons();
    
    // Don't recommend if coupon already applied
    if (appliedCoupon) {
      setRecommendation(null);
      setIsDismissed(false);
      return;
    }

    if (subtotal === 0 || isDismissed) {
      setRecommendation(null);
      return;
    }

    // Filter eligible coupons and find the best one (highest discount)
    let bestRecommendation: { coupon: Coupon; discount: number } | null = null;
    let maxDiscount = 0;

    for (const coupon of activeCoupons) {
      // Check if coupon is eligible
      if (subtotal < coupon.minPurchaseAmount) continue;

      // Validate coupon for this subtotal
      const validation = validateCoupon(coupon.code, subtotal);
      if (validation.valid && validation.discount > maxDiscount) {
        maxDiscount = validation.discount;
        bestRecommendation = {
          coupon,
          discount: validation.discount
        };
      }
    }

    setRecommendation(bestRecommendation);
  }, [subtotal, appliedCoupon, isDismissed]);

  const handleApplyCoupon = () => {
    if (!recommendation) return;
    
    applyCoupon(recommendation.coupon, recommendation.discount);
    setRecommendation(null);
    setIsDismissed(false);
  };

  const handleDismiss = () => {
    setIsDismissed(true);
  };

  if (!recommendation) return null;

  return (
    <div className="bg-emerald-50 border border-emerald-200 p-3 rounded flex items-start justify-between gap-3">
      <div className="flex items-start gap-2 flex-1">
        <SparklesIcon className="h-4 w-4 text-emerald-600 flex-shrink-0 mt-0.5" />
        <div className="flex-1 min-w-0">
          <p className="text-xs font-semibold text-emerald-900">
            Save {formatCouponDiscount(recommendation.coupon, recommendation.discount)}!
          </p>
          <p className="text-xs text-emerald-700 mt-0.5">
            Use code <span className="font-mono font-bold">{recommendation.coupon.code}</span>
            {recommendation.coupon.description && (
              <span> • {recommendation.coupon.description}</span>
            )}
          </p>
        </div>
      </div>
      
      <div className="flex items-center gap-2 flex-shrink-0">
        <button
          onClick={handleApplyCoupon}
          className="text-xs font-semibold bg-emerald-600 text-white px-2.5 py-1 rounded hover:bg-emerald-700 transition whitespace-nowrap"
          title="Apply this coupon"
        >
          Apply
        </button>
        <button
          onClick={handleDismiss}
          className="text-emerald-600 hover:text-emerald-700 transition p-0.5"
          title="Dismiss recommendation"
          aria-label="Dismiss"
        >
          <XMarkIcon className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  );
}
