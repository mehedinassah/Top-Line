"use client";

import { 
  TruckIcon, 
  ArrowPathIcon, 
  ShieldCheckIcon,
  CheckIcon 
} from "@heroicons/react/24/solid";

export default function TrustSignals() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 py-6 border-y border-neutral-200">
      {/* Free Shipping */}
      <div className="flex gap-3 items-start">
        <div className="flex-shrink-0 mt-1">
          <TruckIcon className="h-5 w-5 text-emerald-600" />
        </div>
        <div>
          <p className="font-semibold text-neutral-900">Free Shipping</p>
          <p className="text-sm text-neutral-600">On orders over ৳1,000</p>
        </div>
      </div>

      {/* Easy Returns */}
      <div className="flex gap-3 items-start">
        <div className="flex-shrink-0 mt-1">
          <ArrowPathIcon className="h-5 w-5 text-blue-600" />
        </div>
        <div>
          <p className="font-semibold text-neutral-900">Easy Returns</p>
          <p className="text-sm text-neutral-600">30-day return policy</p>
        </div>
      </div>

      {/* Secure Payment */}
      <div className="flex gap-3 items-start">
        <div className="flex-shrink-0 mt-1">
          <ShieldCheckIcon className="h-5 w-5 text-purple-600" />
        </div>
        <div>
          <p className="font-semibold text-neutral-900">Secure Payment</p>
          <p className="text-sm text-neutral-600">256-bit SSL encryption</p>
        </div>
      </div>

      {/* Quality Guarantee */}
      <div className="flex gap-3 items-start">
        <div className="flex-shrink-0 mt-1">
          <CheckIcon className="h-5 w-5 text-amber-600" />
        </div>
        <div>
          <p className="font-semibold text-neutral-900">Quality Guarantee</p>
          <p className="text-sm text-neutral-600">Premium fabric assured</p>
        </div>
      </div>
    </div>
  );
}
