"use client";

import { Fragment } from "react";
import { useRouter } from "next/navigation";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { useCart } from "@/components/cart/CartContext";
import CouponInput from "@/components/coupon/CouponInput";
import { getLocationText, getShippingText } from "@/lib/shippingUtils";

interface CartDrawerProps {
  open: boolean;
  onClose: () => void;
}

export default function CartDrawer({ open, onClose }: CartDrawerProps) {
  const router = useRouter();
  const { items, removeItem, subtotal, couponDiscount, appliedCoupon, deliveryLocation, shipping } = useCart();

  const handleCheckout = () => {
    onClose();
    router.push("/checkout");
  };

  const total = Math.max(0, subtotal - couponDiscount);

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" onClose={onClose} className="relative z-50">
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-200"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-150"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/40" />
        </Transition.Child>

        <div className="fixed inset-0 flex justify-end">
          <Transition.Child
            as={Fragment}
            enter="transform transition ease-out duration-200"
            enterFrom="translate-x-full"
            enterTo="translate-x-0"
            leave="transform transition ease-in duration-150"
            leaveFrom="translate-x-0"
            leaveTo="translate-x-full"
          >
            <Dialog.Panel className="flex h-full w-1/2 sm:w-full sm:max-w-sm md:max-w-md flex-col border-l border-neutral-200 bg-white shadow-xl">
              {/* Header - Compact on mobile */}
              <div className="flex items-center justify-between gap-2 border-b border-neutral-200 px-3 py-3 sm:px-4 sm:py-4">
                <Dialog.Title className="text-base sm:text-lg font-bold text-neutral-900">
                  Shopping Cart
                </Dialog.Title>
                <button
                  onClick={onClose}
                  className="text-neutral-600 hover:text-neutral-900 transition p-1 -mr-1"
                  title="Close shopping cart"
                  aria-label="Close shopping cart"
                >
                  <XMarkIcon className="h-5 sm:h-6 w-5 sm:w-6" />
                </button>
              </div>

              {/* Items list - Tight spacing on mobile */}
              <div className="flex-1 overflow-y-auto">
                {items.length === 0 ? (
                  <div className="flex items-center justify-center h-full px-3 py-8">
                    <p className="text-xs text-neutral-600">Your cart is empty.</p>
                  </div>
                ) : (
                  <div className="space-y-2 p-3 sm:p-4">
                    {items.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-start justify-between gap-2 border border-neutral-200 bg-neutral-50 p-2 text-xs sm:text-sm"
                      >
                        <div className="flex-1 min-w-0">
                          <p className="font-medium line-clamp-2 text-neutral-900">{item.name}</p>
                          <p className="text-xs text-neutral-600 mt-0.5">
                            Qty {item.quantity} • ৳{(item.price * item.quantity).toFixed(0)}
                          </p>
                        </div>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="text-xs text-neutral-500 hover:text-neutral-900 transition whitespace-nowrap"
                        >
                          Remove
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Summary section - Compact on mobile */}
              {items.length > 0 && (
                <div className="border-t border-neutral-200 px-3 py-3 sm:px-4 sm:py-4 space-y-3">
                  {/* Coupon Input - Compact */}
                  <div>
                    <CouponInput 
                      key={items.length} 
                      showSuggestions={true} 
                    />
                  </div>

                  {/* Price Summary - Tight spacing */}
                  <div className="space-y-1.5 text-xs sm:text-sm">
                    <div className="flex items-center justify-between">
                      <span className="text-neutral-600">Subtotal</span>
                      <span className="font-semibold text-neutral-900">
                        ৳{subtotal.toFixed(0)}
                      </span>
                    </div>
                    {couponDiscount > 0 && (
                      <div className="flex items-center justify-between">
                        <span className="text-green-600 text-xs">Discount {appliedCoupon && `(${appliedCoupon.code})`}</span>
                        <span className="font-semibold text-green-600">
                          -৳{couponDiscount.toFixed(0)}
                        </span>
                      </div>
                    )}
                    <div className="flex items-center justify-between">
                      <span className="text-neutral-600">Shipping</span>
                      <span className="font-semibold text-neutral-900">
                        {shipping === 0 ? "FREE" : `৳${shipping.toFixed(0)}`}
                      </span>
                    </div>
                    <div className="border-t border-neutral-200 pt-1.5 flex items-center justify-between font-semibold">
                      <span className="text-neutral-900 text-xs sm:text-sm">Total (excl. VAT)</span>
                      <span className="text-neutral-900 text-sm sm:text-base">
                        ৳{(Math.max(0, subtotal - couponDiscount) + shipping).toFixed(0)}
                      </span>
                    </div>
                  </div>

                  <p className="text-xs text-neutral-500">
                    Delivery to: {getLocationText(deliveryLocation)}
                  </p>
                </div>
              )}

              {/* Checkout Button */}
              {items.length > 0 && (
                <div className="border-t border-neutral-200 px-3 py-3 sm:px-4 sm:py-4">
                  <button
                    onClick={handleCheckout}
                    className="w-full bg-neutral-900 py-2 sm:py-2.5 text-xs sm:text-sm font-medium text-white shadow-minimal hover:bg-neutral-800 disabled:cursor-not-allowed disabled:opacity-50 transition"
                  >
                    Proceed to checkout
                  </button>
                </div>
              )}
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
}


