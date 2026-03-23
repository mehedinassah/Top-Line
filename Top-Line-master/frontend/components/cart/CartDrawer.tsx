"use client";

import { Fragment } from "react";
import { useRouter } from "next/navigation";
import { Dialog, Transition } from "@headlessui/react";
import { useCart } from "@/components/cart/CartContext";

interface CartDrawerProps {
  open: boolean;
  onClose: () => void;
}

export default function CartDrawer({ open, onClose }: CartDrawerProps) {
  const router = useRouter();
  const { items, removeItem, subtotal } = useCart();

  const handleCheckout = () => {
    onClose();
    router.push("/checkout");
  };

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
            <Dialog.Panel className="flex h-full w-full max-w-sm sm:max-w-md md:max-w-md flex-col border-l border-neutral-200 bg-white px-4 sm:px-5 py-5 shadow-xl">
              <div className="flex items-center justify-between gap-2">
                <Dialog.Title className="text-lg font-bold text-neutral-900 md:text-xl">
                  Shopping Cart
                </Dialog.Title>
                <button
                  onClick={onClose}
                  className="rounded px-3 py-2 text-xs font-medium text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900 transition md:text-sm"
                >
                  Close
                </button>
              </div>
              <div className="mt-4 flex-1 space-y-3 overflow-y-auto">
                {items.length === 0 ? (
                  <p className="text-base sm:text-sm text-neutral-600">Your cart is empty.</p>
                ) : (
                  items.map((item) => (
                    <div
                      key={item.id}
                      className="flex flex-col gap-3 border border-neutral-200 bg-neutral-50 p-4 sm:p-3 text-base sm:text-sm text-neutral-900 sm:flex-row sm:items-center sm:justify-between"
                    >
                      <div className="flex-1">
                        <p className="font-medium line-clamp-2 text-base sm:text-sm">{item.name}</p>
                        <p className="text-sm sm:text-xs text-neutral-600 mt-1">
                          Qty {item.quantity} • ৳{(item.price * item.quantity).toFixed(0)}
                        </p>
                      </div>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="px-3 py-2 text-xs sm:text-xs rounded text-neutral-500 hover:bg-neutral-200 hover:text-neutral-900 transition font-medium"
                      >
                        Remove
                      </button>
                    </div>
                  ))
                )}
              </div>
              <div className="mt-4 border-t border-neutral-200 pt-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-neutral-600">Subtotal</span>
                  <span className="font-semibold text-neutral-900">
                    ৳{subtotal.toFixed(0)}
                  </span>
                </div>
                <button
                  disabled={items.length === 0}
                  onClick={handleCheckout}
                  className="mt-3 w-full rounded bg-neutral-900 py-3 sm:py-2.5 text-base sm:text-sm font-medium text-white shadow-minimal hover:bg-neutral-800 disabled:cursor-not-allowed disabled:opacity-50 transition"
                >
                  Proceed to checkout
                </button>
              </div>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
}

