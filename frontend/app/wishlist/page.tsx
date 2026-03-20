"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { HeartIcon, TrashIcon, ShoppingCartIcon, ChevronLeftIcon } from "@heroicons/react/24/outline";

interface WishlistItem {
  id: string;
  name: string;
  price: number;
  image?: string;
  inStock?: boolean;
}

export default function WishlistPage() {
  const [wishlist, setWishlist] = useState<WishlistItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Load wishlist from localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem("topline_wishlist");
      if (stored) {
        setWishlist(JSON.parse(stored));
      }
    } catch (error) {
      console.error("Failed to load wishlist:", error);
    }
    setIsLoading(false);
  }, []);

  const removeFromWishlist = (id: string) => {
    const updated = wishlist.filter(item => item.id !== id);
    setWishlist(updated);
    localStorage.setItem("topline_wishlist", JSON.stringify(updated));
  };

  const shareWishlist = () => {
    const url = window.location.href;
    if (navigator.share) {
      navigator.share({
        title: "Check out my wishlist!",
        url: url
      });
    } else {
      navigator.clipboard.writeText(url);
      alert("Wishlist link copied to clipboard!");
    }
  };

  if (isLoading) {
    return <div className="min-h-screen bg-white" />;
  }

  return (
    <div className="min-h-screen bg-white">
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

      <div className="mx-auto max-w-6xl px-4 py-8 md:py-12">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-neutral-900">My Wishlist</h1>
          <p className="mt-2 text-neutral-700">
            {wishlist.length} {wishlist.length === 1 ? "item" : "items"} saved
          </p>
        </div>

        {/* Wishlist Items */}
        {wishlist.length === 0 ? (
          <div className="rounded-lg border border-neutral-200 bg-neutral-50 py-12 text-center">
            <HeartIcon className="mx-auto h-12 w-12 text-neutral-400 mb-4" />
            <p className="text-lg font-medium text-neutral-900">Your wishlist is empty</p>
            <p className="mt-2 text-neutral-700">Start adding items you love!</p>
            <Link
              href="/products"
              className="mt-6 inline-block rounded-full bg-neutral-900 px-6 py-2 text-sm font-semibold text-white hover:bg-neutral-800 transition"
            >
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div className="space-y-3">
            {wishlist.map(item => (
              <div
                key={item.id}
                className="flex items-center justify-between rounded-lg border border-neutral-200 bg-white p-4 hover:border-neutral-300 transition"
              >
                <div className="flex-1">
                  <h3 className="font-medium text-neutral-900">{item.name}</h3>
                  <p className="text-lg font-semibold text-neutral-900 mt-1">
                    ${Number(item.price).toFixed(2)}
                  </p>
                </div>
                <div className="flex gap-2">
                  <Link
                    href={`/products/${item.id}`}
                    className="rounded-full border border-neutral-900 px-4 py-2 text-sm font-medium text-neutral-900 hover:bg-neutral-50 transition"
                  >
                    View
                  </Link>
                  <button
                    onClick={() => removeFromWishlist(item.id)}
                    className="rounded-full border border-neutral-300 p-2 text-neutral-700 hover:bg-red-50 hover:border-red-300 hover:text-red-600 transition"
                    title="Remove from wishlist"
                  >
                    <TrashIcon className="h-5 w-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
