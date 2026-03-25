"use client";

import { getActiveCoupons } from "@/lib/couponUtils";
import { SparklesIcon } from "@heroicons/react/24/outline";

export default function CouponBadge() {
  const activeCoupons = getActiveCoupons();
  const count = activeCoupons.length;

  if (count === 0) return null;

  return (
    <button
      onClick={() => window.location.href = "/offers"}
      className="hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 hover:bg-emerald-100 transition text-xs font-semibold"
      title="View active coupon offers"
    >
      <SparklesIcon className="h-3.5 w-3.5" />
      <span>{count} Offers</span>
    </button>
  );
}
