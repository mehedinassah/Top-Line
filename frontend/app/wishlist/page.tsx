"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { HeartIcon, TrashIcon, ShoppingCartIcon, ShareIcon, ChevronLeftIcon } from "@heroicons/react/24/outline";
import { HeartIcon as HeartSolidIcon } from "@heroicons/react/24/solid";

interface WishlistItem {
  id: number;
  name: string;
  price: number;
  image: string;
  inStock: boolean;
  category: string;
}

const mockWishlistItems: WishlistItem[] = [
  {
    id: 1,
    name: "Tailored Wool Blend Overcoat",
    price: 189,
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=400&q=80",
    inStock: true,
    category: "Outerwear"
  },
  {
    id: 2,
    name: "Relaxed Fit Selvedge Denim",
    price: 150,
    image: "https://images.unsplash.com/photo-1514996937319-344454492b37?auto=format&fit=crop&w=400&q=80",
    inStock: true,
    category: "Jeans"
  },
  {
    id: 6,
    name: "Wool Sweater",
    price: 125,
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=400&q=80",
    inStock: false,
    category: "Tops"
  }
];

export default function WishlistPage() {
  const [wishlist, setWishlist] = useState<WishlistItem[]>(mockWishlistItems);
  const [shareOpen, setShareOpen] = useState(false);

  const removeFromWishlist = (id: number) => {
    setWishlist(wishlist.filter(item => item.id !== id));
  };

  const shareWishlist = () => {
    const url = window.location.href;
    if (navigator.share) {
      navigator.share({
        title: "Check out my wishlist!",
        url: url
      });
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(url);
      alert("Wishlist link copied to clipboard!");
    }
  };

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
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-neutral-900">My Wishlist</h1>
            <p className="mt-2 text-neutral-700">
              {wishlist.length} {wishlist.length === 1 ? "item" : "items"} saved
            </p>
          </div>
          <button
            onClick={shareWishlist}
            className="flex items-center gap-2 rounded-full border border-neutral-900 px-4 py-2 text-sm font-medium text-neutral-900 hover:bg-neutral-50 transition"
          >
            <ShareIcon className="h-4 w-4" />
            Share
          </button>
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
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {wishlist.map(item => (
              <div
                key={item.id}
                className="group rounded-2xl border border-neutral-200 bg-white overflow-hidden transition hover:border-neutral-300 hover:shadow-md"
              >
                {/* Image */}
                <div className="relative aspect-square w-full overflow-hidden bg-neutral-100">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover transition group-hover:scale-105"
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  />
                  {!item.inStock && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                      <span className="font-semibold text-white">Out of Stock</span>
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-4">
                  <p className="text-xs uppercase tracking-wide text-neutral-700 mb-1">
                    {item.category}
                  </p>
                  <h3 className="line-clamp-2 font-medium text-neutral-900 mb-2">
                    {item.name}
                  </h3>
                  <p className="text-lg font-semibold text-neutral-900 mb-4">
                    ${item.price.toFixed(2)}
                  </p>

                  {/* Actions */}
                  <div className="flex gap-2">
                    <Link
                      href={`/products/${item.id}`}
                      className={`flex-1 rounded-full px-3 py-2 text-sm font-medium text-center transition ${
                        item.inStock
                          ? "bg-neutral-900 text-white hover:bg-neutral-800"
                          : "border border-neutral-300 text-neutral-700 bg-neutral-50"
                      }`}
                      aria-disabled={!item.inStock}
                    >
                      {item.inStock ? "Add to Cart" : "View"}
                    </Link>
                    <button
                      onClick={() => removeFromWishlist(item.id)}
                      className="rounded-full border border-neutral-300 p-2.5 text-neutral-700 hover:bg-red-50 hover:border-red-300 hover:text-red-600 transition"
                      title="Remove from wishlist"
                      aria-label={`Remove ${item.name} from wishlist`}
                    >
                      <TrashIcon className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Share Dialog */}
        {shareOpen && (
          <div className="fixed inset-0 bg-black/50 flex items-end md:items-center justify-center p-4 z-50">
            <div className="bg-white rounded-t-2xl md:rounded-2xl w-full max-w-sm p-6">
              <h2 className="text-lg font-semibold text-neutral-900 mb-4">Share your wishlist</h2>
              <div className="flex gap-3 mb-4">
                <button className="flex-1 rounded-full bg-neutral-100 hover:bg-neutral-200 px-4 py-2 text-sm font-medium text-neutral-900 transition">
                  Facebook
                </button>
                <button className="flex-1 rounded-full bg-neutral-100 hover:bg-neutral-200 px-4 py-2 text-sm font-medium text-neutral-900 transition">
                  Twitter
                </button>
              </div>
              <button
                onClick={() => {
                  navigator.clipboard.writeText(window.location.href);
                  alert("Link copied!");
                  setShareOpen(false);
                }}
                className="w-full rounded-full bg-neutral-900 text-white px-4 py-2 text-sm font-medium hover:bg-neutral-800 transition"
              >
                Copy Link
              </button>
              <button
                onClick={() => setShareOpen(false)}
                className="w-full mt-2 rounded-full border border-neutral-300 px-4 py-2 text-sm font-medium text-neutral-900 hover:bg-neutral-50 transition"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
