"use client";

import { useState, useEffect } from "react";
import { availableCoupons } from "@/lib/productData";
import { useCart } from "@/components/cart/CartContext";
import { getActiveCoupons } from "@/lib/couponUtils";
import { validateCoupon } from "@/lib/couponUtils";
import type { Coupon } from "@/lib/productData";

interface AvailableCouponsProps {
  subtotal: number;
}

export default function AvailableCoupons({ subtotal }: AvailableCouponsProps) {
  const { applyCoupon, removeCoupon, appliedCoupon } = useCart();
  const [appliedCode, setAppliedCode] = useState<string | null>(appliedCoupon?.code || null);
  const [toastMessage, setToastMessage] = useState("");
  // Initialize with default coupons to match server render
  const [activeCoupons, setActiveCoupons] = useState<Coupon[]>(() => {
    const today = new Date();
    return availableCoupons.filter(coupon => {
      const expiryDate = new Date(coupon.expiryDate);
      return (
        coupon.active &&
        today <= expiryDate &&
        coupon.currentUses < coupon.maxUses
      );
    });
  });

  // After hydration, load actual coupons from localStorage
  useEffect(() => {
    setActiveCoupons(getActiveCoupons());
  }, []);
  
  // Filter only truly eligible coupons based on subtotal >= minimum purchase
  const eligibleCoupons = activeCoupons.filter(coupon => {
    const isEligible = subtotal >= coupon.minPurchaseAmount;
    console.log(`📊 Coupon ${coupon.code}: subtotal ৳${subtotal} >= min ৳${coupon.minPurchaseAmount}? ${isEligible}`);
    return isEligible;
  });

  const handleApplyCoupon = (code: string) => {
    const validation = validateCoupon(code, subtotal);
    
    if (!validation.valid || !validation.coupon) {
      setToastMessage(validation.error || "Coupon not applicable");
      setTimeout(() => setToastMessage(""), 3000);
      return;
    }

    // Remove previous coupon if exists
    if (appliedCoupon) {
      removeCoupon();
    }

    // Apply new coupon
    applyCoupon(validation.coupon, validation.discount);
    setAppliedCode(code);
    setToastMessage(`✓ Coupon '${code}' applied!`);
    setTimeout(() => setToastMessage(""), 3000);
  };

  const handleRemoveCoupon = () => {
    removeCoupon();
    setAppliedCode(null);
    setToastMessage("Coupon removed");
    setTimeout(() => setToastMessage(""), 3000);
  };

  if (eligibleCoupons.length === 0) {
    return null;
  }

  return (
    <div className="space-y-3">
      <div>
        <p className="text-xs font-semibold text-neutral-900 mb-3">Available Coupons</p>
        <div className="grid grid-cols-1 gap-2">
          {eligibleCoupons.map(coupon => {
            const isApplied = appliedCode === coupon.code;
            const discountText = coupon.type === 'percentage' 
              ? `${coupon.value}% off` 
              : `৳${coupon.value} off`;

            return (
              <button
                key={coupon.code}
                onClick={() => isApplied ? handleRemoveCoupon() : handleApplyCoupon(coupon.code)}
                className={`p-3 border text-left transition duration-200 ${
                  isApplied
                    ? 'border-green-500 bg-green-50'
                    : 'border-neutral-300 bg-white hover:border-neutral-400 hover:bg-neutral-50'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <code className="text-sm font-bold text-neutral-900">{coupon.code}</code>
                      {isApplied && <span className="text-xs font-medium text-green-600">✓ Applied</span>}
                    </div>
                    <p className="text-xs text-neutral-600 mt-1">{coupon.description}</p>
                    <p className="text-xs text-neutral-500 mt-1">Min: ৳{coupon.minPurchaseAmount.toLocaleString()}</p>
                  </div>
                  <div className="text-sm font-bold text-green-600 ml-2">{discountText}</div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {toastMessage && (
        <div className="text-xs text-neutral-600 bg-neutral-100 border border-neutral-300 px-3 py-2">
          {toastMessage}
        </div>
      )}
    </div>
  );
}
