"use client";

import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import type { Coupon } from "@/lib/productData";
import type { DeliveryLocation } from "@/lib/shippingUtils";
import { calculateShipping } from "@/lib/shippingUtils";

export type CartItem = {
  id: string; // Unique ID combining productId + size + color
  productId: number;
  name: string;
  price: number;
  quantity: number;
  size?: string;
  color?: string;
  image?: string;
  discountPrice?: number;
};

type CartContextValue = {
  items: CartItem[];
  addItem: (item: Omit<CartItem, "quantity"> & { quantity?: number }) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clear: () => void;
  totalQuantity: number;
  subtotal: number;
  discount: number;
  appliedCoupon: Coupon | null;
  couponDiscount: number;
  applyCoupon: (coupon: Coupon, discountAmount: number) => void;
  removeCoupon: () => void;
  deliveryLocation: DeliveryLocation;
  setDeliveryLocation: (location: DeliveryLocation) => void;
  shipping: number;
  isLoading: boolean;
};

const CartContext = createContext<CartContextValue | null>(null);

const CART_STORAGE_KEY = "topline_cart";
const COUPON_STORAGE_KEY = "topline_coupon";
const DELIVERY_LOCATION_KEY = "topline_delivery_location";

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(null);
  const [couponDiscount, setCouponDiscount] = useState(0);
  const [deliveryLocation, setDeliveryLocationState] = useState<DeliveryLocation>("dhaka");
  const [isLoading, setIsLoading] = useState(false);

  // Load cart from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(CART_STORAGE_KEY);
      if (stored) {
        setItems(JSON.parse(stored));
      }
      const storedCoupon = localStorage.getItem(COUPON_STORAGE_KEY);
      if (storedCoupon) {
        const parsed = JSON.parse(storedCoupon);
        setAppliedCoupon(parsed.coupon);
        setCouponDiscount(parsed.discount);
      }
      const storedLocation = localStorage.getItem(DELIVERY_LOCATION_KEY);
      if (storedLocation && (storedLocation === "dhaka" || storedLocation === "outside-dhaka")) {
        setDeliveryLocationState(storedLocation);
      }
    } catch (error) {
      console.error("Failed to load cart from localStorage:", error);
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
    } catch (error) {
      console.error("Failed to save cart to localStorage:", error);
    }
  }, [items]);

  // Save coupon to localStorage whenever it changes
  useEffect(() => {
    try {
      if (appliedCoupon) {
        localStorage.setItem(COUPON_STORAGE_KEY, JSON.stringify({ coupon: appliedCoupon, discount: couponDiscount }));
      } else {
        localStorage.removeItem(COUPON_STORAGE_KEY);
      }
    } catch (error) {
      console.error("Failed to save coupon to localStorage:", error);
    }
  }, [appliedCoupon, couponDiscount]);

  // Save delivery location to localStorage whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem(DELIVERY_LOCATION_KEY, deliveryLocation);
    } catch (error) {
      console.error("Failed to save delivery location to localStorage:", error);
    }
  }, [deliveryLocation]);

  function addItem(item: Omit<CartItem, "quantity"> & { quantity?: number }) {
    setItems((prev) => {
      const existingIndex = prev.findIndex((p) => p.id === item.id);
      if (existingIndex !== -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += item.quantity || 1;
        return updated;
      }
      return [...prev, { ...item, quantity: item.quantity || 1 }];
    });
  }

  function removeItem(id: string) {
    setItems((prev) => prev.filter((p) => p.id !== id));
  }

  function updateQuantity(id: string, quantity: number) {
    if (quantity <= 0) {
      removeItem(id);
      return;
    }
    setItems((prev) =>
      prev.map((p) => (p.id === id ? { ...p, quantity } : p))
    );
  }

  function clear() {
    setItems([]);
    setAppliedCoupon(null);
    setCouponDiscount(0);
    // Explicitly remove coupon from localStorage immediately
    try {
      localStorage.removeItem(COUPON_STORAGE_KEY);
    } catch (error) {
      console.error("Failed to clear coupon from localStorage:", error);
    }
  }

  function applyCoupon(coupon: Coupon, discountAmount: number) {
    setAppliedCoupon(coupon);
    setCouponDiscount(discountAmount);
  }

  function removeCoupon() {
    setAppliedCoupon(null);
    setCouponDiscount(0);
  }

  function setDeliveryLocation(location: DeliveryLocation) {
    setDeliveryLocationState(location);
  }

  const { totalQuantity, subtotal, discount, shipping } = useMemo(() => {
    const totalQuantity = items.reduce((sum, item) => sum + item.quantity, 0);
    const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const discount = items.reduce(
      (sum, item) => sum + ((item.discountPrice || 0) > 0 ? (item.price - item.discountPrice) * item.quantity : 0),
      0
    );
    const shippingInfo = calculateShipping(subtotal, deliveryLocation);
    return { totalQuantity, subtotal, discount, shipping: shippingInfo.amount };
  }, [items, deliveryLocation]);

  const value: CartContextValue = {
    items,
    addItem,
    removeItem,
    updateQuantity,
    clear,
    totalQuantity,
    subtotal,
    discount,
    appliedCoupon,
    couponDiscount,
    applyCoupon,
    removeCoupon,
    deliveryLocation,
    setDeliveryLocation,
    shipping,
    isLoading
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error("useCart must be used within CartProvider");
  }
  return ctx;
}


