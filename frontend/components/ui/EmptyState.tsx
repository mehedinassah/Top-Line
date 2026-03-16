"use client";

import Link from "next/link";
import { ShoppingCartIcon, MagnifyingGlassIcon, HeartIcon } from "@heroicons/react/24/outline";

interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  description: string;
  cta?: {
    label: string;
    href: string;
  };
}

export default function EmptyState({ icon, title, description, cta }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-4 rounded-2xl border border-neutral-200 bg-neutral-50 px-6 py-12 text-center md:py-16">
      {icon && (
        <div className="flex justify-center">
          {icon}
        </div>
      )}
      <div className="space-y-2">
        <h3 className="text-lg font-semibold text-neutral-900 md:text-xl">{title}</h3>
        <p className="text-sm text-neutral-600 md:text-base">{description}</p>
      </div>
      {cta && (
        <Link
          href={cta.href}
          className="mt-4 inline-block rounded-full bg-neutral-900 px-6 py-2.5 text-sm font-semibold text-white hover:bg-neutral-800 transition"
        >
          {cta.label}
        </Link>
      )}
    </div>
  );
}

export function EmptyCart() {
  return (
    <EmptyState
      icon={<ShoppingCartIcon className="h-12 w-12 text-neutral-400" />}
      title="Your cart is empty"
      description="Start shopping to add items to your cart"
      cta={{ label: "Continue shopping", href: "/products" }}
    />
  );
}

export function EmptySearchResults() {
  return (
    <EmptyState
      icon={<MagnifyingGlassIcon className="h-12 w-12 text-neutral-400" />}
      title="No products found"
      description="Try adjusting your filters or search terms"
      cta={{ label: "View all products", href: "/products" }}
    />
  );
}

export function EmptyWishlist() {
  return (
    <EmptyState
      icon={<HeartIcon className="h-12 w-12 text-neutral-400" />}
      title="Your wishlist is empty"
      description="Start adding your favorite items to your wishlist"
      cta={{ label: "Start exploring", href: "/products" }}
    />
  );
}
