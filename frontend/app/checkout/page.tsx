"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChevronLeftIcon } from "@heroicons/react/24/solid";
import { useCart, type CartItem } from "@/components/cart/CartContext";

type CheckoutStep = "shipping" | "payment" | "confirmation";

interface ShippingData {
  fullName: string;
  email: string;
  address: string;
  city: string;
  state: string;
  zip: string;
}

interface OrderDetails {
  number: string;
  date: string;
  total: number;
  estimatedDelivery: string;
  items: CartItem[];
  subtotal: number;
  shipping: number;
  tax: number;
}

export default function CheckoutPage() {
  const router = useRouter();
  const { items: cartItems, clear } = useCart();
  const [currentStep, setCurrentStep] = useState<CheckoutStep>("shipping");
  const [isHydrated, setIsHydrated] = useState(false);
  
  // Wait for cart to hydrate from localStorage
  useEffect(() => {
    setIsHydrated(true);
  }, []);
  
  // Redirect if cart is empty on shipping step (user shouldn't be at checkout with empty cart)
  useEffect(() => {
    if (isHydrated && currentStep === "shipping" && cartItems.length === 0) {
      // Give localStorage time to load, then redirect if still empty
      const timer = setTimeout(() => {
        if (cartItems.length === 0) {
          router.push("/");
        }
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [isHydrated, currentStep, cartItems, router]);
  
  // Calculate totals from actual cart items
  const cartSubtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = 10;
  const tax = Math.round((cartSubtotal + shipping) * 0.08 * 100) / 100;
  const cartTotal = cartSubtotal + shipping + tax;
  
  const [shippingData, setShippingData] = useState<ShippingData>({
    fullName: "",
    email: "",
    address: "",
    city: "",
    state: "",
    zip: ""
  });
  const [orderDetails, setOrderDetails] = useState<OrderDetails | null>(null);

  const handleShippingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setShippingData(prev => ({ ...prev, [name]: value }));
  };

  const handleContinueToPayment = () => {
    if (!shippingData.fullName || !shippingData.email || !shippingData.address || !shippingData.city || !shippingData.state || !shippingData.zip) {
      alert("Please fill in all fields");
      return;
    }
    setCurrentStep("payment");
  };

  const handleContinueClick = () => {
    router.push("/");
  };

  const handleContinueToConfirmation = () => {
    const orderNumber = `ORD-${Date.now().toString().slice(-8)}`;
    const deliveryDate = new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toLocaleDateString();
    
    // Capture cart items and pricing before clearing
    const subtotal = cartSubtotal;
    const orderTax = tax;
    const orderShipping = shipping;
    const orderTotal = cartTotal;
    const orderItems = [...cartItems]; // Create a copy of items
    
    setOrderDetails({
      number: orderNumber,
      date: new Date().toLocaleDateString(),
      total: orderTotal,
      estimatedDelivery: deliveryDate,
      items: orderItems,
      subtotal: subtotal,
      shipping: orderShipping,
      tax: orderTax
    });
    setCurrentStep("confirmation");
    
    // Clear the cart after order is placed
    clear();
  };

  return (
    <>
      {/* Breadcrumb */}
      <div className="border-b border-neutral-200 bg-white px-4 py-3">
        <div className="mx-auto max-w-6xl">
          <Link
            href="/products"
            className="inline-flex items-center gap-1 text-xs text-neutral-700 hover:text-neutral-900 transition"
          >
            <ChevronLeftIcon className="h-4 w-4" />
            Back to shopping
          </Link>
        </div>
      </div>

      <div className="min-h-screen bg-white">
        <div className="mx-auto max-w-6xl px-4 py-8 md:py-12">
          {/* Progress Steps */}
          <div className="relative mb-12">
            <div className="flex items-center justify-between">
              {(["Shipping", "Payment", "Confirmation"] as const).map((step, idx) => {
                const steps: CheckoutStep[] = ["shipping", "payment", "confirmation"];
                const isCompleted = steps.indexOf(currentStep) > idx;
                const isCurrent = steps[idx] === currentStep;

                return (
                  <div key={step} className="flex flex-1 items-center last:flex-none">
                    <div
                      className={`flex h-10 w-10 items-center justify-center rounded-full font-semibold text-sm transition ${
                        isCompleted
                          ? "bg-green-600 text-white"
                          : isCurrent
                          ? "bg-neutral-900 text-white"
                          : "bg-neutral-200 text-neutral-700"
                      }`}
                    >
                      {isCompleted ? "✓" : idx + 1}
                    </div>
                    {idx < 2 && (
                      <div
                        className={`h-1 flex-1 mx-2 transition ${
                          isCompleted ? "bg-green-600" : "bg-neutral-200"
                        }`}
                      />
                    )}
                  </div>
                );
              })}
            </div>
            <div className="mt-3 flex justify-between text-xs font-medium text-neutral-700">
              <span>Shipping</span>
              <span>Payment</span>
              <span>Confirmation</span>
            </div>
          </div>

          <div className="grid gap-8 lg:grid-cols-3">
            {/* Main Content */}
            <div className="lg:col-span-2">
              {/* Shipping Step */}
              {currentStep === "shipping" && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-neutral-900">Shipping Address</h2>
                  <div className="space-y-4">
                    <input
                      type="text"
                      name="fullName"
                      placeholder="Full Name"
                      value={shippingData.fullName}
                      onChange={handleShippingChange}
                      className="w-full rounded-lg border border-neutral-300 bg-white px-4 py-2.5 text-sm placeholder-neutral-500 outline-none transition focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900"
                    />
                    <input
                      type="email"
                      name="email"
                      placeholder="Email"
                      value={shippingData.email}
                      onChange={handleShippingChange}
                      className="w-full rounded-lg border border-neutral-300 bg-white px-4 py-2.5 text-sm placeholder-neutral-500 outline-none transition focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900"
                    />
                    <input
                      type="text"
                      name="address"
                      placeholder="Street Address"
                      value={shippingData.address}
                      onChange={handleShippingChange}
                      className="w-full rounded-lg border border-neutral-300 bg-white px-4 py-2.5 text-sm placeholder-neutral-500 outline-none transition focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900"
                    />
                    <div className="grid grid-cols-2 gap-4">
                      <input
                        type="text"
                        name="city"
                        placeholder="City"
                        value={shippingData.city}
                        onChange={handleShippingChange}
                        className="rounded-lg border border-neutral-300 bg-white px-4 py-2.5 text-sm placeholder-neutral-500 outline-none transition focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900"
                      />
                      <input
                        type="text"
                        name="state"
                        placeholder="State"
                        value={shippingData.state}
                        onChange={handleShippingChange}
                        className="rounded-lg border border-neutral-300 bg-white px-4 py-2.5 text-sm placeholder-neutral-500 outline-none transition focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900"
                      />
                    </div>
                    <input
                      type="text"
                      name="zip"
                      placeholder="ZIP Code"
                      value={shippingData.zip}
                      onChange={handleShippingChange}
                      className="w-full rounded-lg border border-neutral-300 bg-white px-4 py-2.5 text-sm placeholder-neutral-500 outline-none transition focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900"
                    />
                  </div>
                </div>
              )}

              {/* Payment Step */}
              {currentStep === "payment" && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-neutral-900">Payment Method</h2>
                  <div className="space-y-4">
                    <div className="rounded-lg border border-neutral-300 p-4">
                      <label className="flex items-center gap-3">
                        <input type="radio" name="payment" defaultChecked className="h-4 w-4" />
                        <span className="text-sm font-medium text-neutral-900">Credit Card</span>
                      </label>
                    </div>
                    <div className="space-y-4 rounded-lg border border-neutral-300 bg-neutral-50 p-4">
                      <input
                        type="text"
                        placeholder="Card Number"
                        className="w-full rounded-lg border border-neutral-300 bg-white px-4 py-2.5 text-sm placeholder-neutral-500 outline-none transition focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900"
                      />
                      <div className="grid grid-cols-2 gap-4">
                        <input
                          type="text"
                          placeholder="MM/YY"
                          className="rounded-lg border border-neutral-300 bg-white px-4 py-2.5 text-sm placeholder-neutral-500 outline-none transition focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900"
                        />
                        <input
                          type="text"
                          placeholder="CVV"
                          className="rounded-lg border border-neutral-300 bg-white px-4 py-2.5 text-sm placeholder-neutral-500 outline-none transition focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Confirmation Step */}
              {currentStep === "confirmation" && orderDetails && (
                <div className="space-y-6">
                  <div className="text-center">
                    <div className="mb-4 text-4xl">✓</div>
                    <h2 className="text-2xl font-bold text-neutral-900">Order Confirmed</h2>
                    <p className="mt-2 text-neutral-700">Thank you for your purchase!</p>
                  </div>
                  <div className="rounded-lg bg-neutral-50 p-6">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-neutral-700">Order Number</p>
                        <p className="mt-1 font-semibold text-neutral-900">{orderDetails.number}</p>
                      </div>
                      <div>
                        <p className="text-neutral-700">Order Date</p>
                        <p className="mt-1 font-semibold text-neutral-900">{orderDetails.date}</p>
                      </div>
                      <div>
                        <p className="text-neutral-700">Total</p>
                        <p className="mt-1 font-semibold text-neutral-900">${orderDetails.total.toFixed(2)}</p>
                      </div>
                      <div>
                        <p className="text-neutral-700">Estimated Delivery</p>
                        <p className="mt-1 font-semibold text-neutral-900">{orderDetails.estimatedDelivery}</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="mt-8 flex gap-4">
                {currentStep !== "shipping" && (
                  <button
                    onClick={() => {
                      if (currentStep === "payment") setCurrentStep("shipping");
                      else if (currentStep === "confirmation") setCurrentStep("payment");
                    }}
                    className="flex-1 rounded-full border border-neutral-900 px-6 py-2.5 font-semibold text-neutral-900 transition hover:bg-neutral-50"
                  >
                    Previous
                  </button>
                )}
                {currentStep !== "confirmation" && (
                  <button
                    onClick={currentStep === "shipping" ? handleContinueToPayment : handleContinueToConfirmation}
                    className="flex-1 rounded-full bg-neutral-900 px-6 py-2.5 font-semibold text-white transition hover:bg-neutral-800"
                  >
                    Next
                  </button>
                )}
                {currentStep === "confirmation" && (
                  <button
                    onClick={handleContinueClick}
                    className="flex-1 rounded-full bg-neutral-900 px-6 py-2.5 font-semibold text-white transition hover:bg-neutral-800"
                  >
                    Continue Shopping
                  </button>
                )}
              </div>
            </div>

            {/* Order Summary Sidebar */}
            <div className="h-fit rounded-2xl border border-neutral-200 bg-neutral-50 p-6">
              <h3 className="font-semibold text-neutral-900">Order Summary</h3>
              <div className="mt-4 space-y-3 border-b border-neutral-200 pb-4">
                {currentStep === "confirmation" && orderDetails
                  ? // Display stored order items during confirmation
                    orderDetails.items.map(item => (
                      <div key={item.id} className="flex justify-between text-sm">
                        <div>
                          <p className="font-medium text-neutral-900">{item.name}</p>
                          <p className="text-xs text-neutral-700">Qty: {item.quantity}</p>
                        </div>
                        <p className="font-medium text-neutral-900">${(item.price * item.quantity).toFixed(2)}</p>
                      </div>
                    ))
                  : // Display live cart items during shipping and payment
                    cartItems.map(item => (
                      <div key={item.id} className="flex justify-between text-sm">
                        <div>
                          <p className="font-medium text-neutral-900">{item.name}</p>
                          <p className="text-xs text-neutral-700">Qty: {item.quantity}</p>
                        </div>
                        <p className="font-medium text-neutral-900">${(item.price * item.quantity).toFixed(2)}</p>
                      </div>
                    ))
                }
              </div>
              <div className="mt-4 space-y-2 text-sm">
                <div className="flex justify-between text-neutral-700">
                  <span>Subtotal</span>
                  <span>${(currentStep === "confirmation" && orderDetails ? orderDetails.subtotal : cartSubtotal).toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-neutral-700">
                  <span>Shipping</span>
                  <span>${(currentStep === "confirmation" && orderDetails ? orderDetails.shipping : shipping).toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-neutral-700">
                  <span>Tax</span>
                  <span>${(currentStep === "confirmation" && orderDetails ? orderDetails.tax : tax).toFixed(2)}</span>
                </div>
                <div className="border-t border-neutral-200 pt-2 flex justify-between font-semibold text-neutral-900">
                  <span>Total</span>
                  <span>${(currentStep === "confirmation" && orderDetails ? orderDetails.total : cartTotal).toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
