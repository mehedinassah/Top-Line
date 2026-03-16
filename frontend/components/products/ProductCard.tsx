"use client";

import Image from "next/image";
import Link from "next/link";
import { StarIcon } from "@heroicons/react/24/solid";
import { useState } from "react";
import type { Product } from "@/lib/productData";

export default function ProductCard({ product }: { product: Product }) {
  const [showSecondImage, setShowSecondImage] = useState(false);
  
  const primaryImage = product.images?.[0] ?? "/placeholder-product.png";
  const secondaryImage = product.images?.[1] ?? null;
  const displayImage = showSecondImage && secondaryImage ? secondaryImage : primaryImage;
  const displayPrice = product.discountPrice ?? product.price;
  const hasDiscount = product.discountPrice !== undefined;

  return (
    <Link
      href={`/products/${product.id}`}
      className="group flex h-full flex-col rounded-2xl border border-neutral-200 bg-white p-3 transition hover:-translate-y-1 hover:border-neutral-300 hover:bg-neutral-50 hover:shadow-minimal"
      title={`View ${product.name}`}
    >
      <div 
        className="relative aspect-square w-full overflow-hidden rounded-xl bg-neutral-100"
        onMouseEnter={() => secondaryImage && setShowSecondImage(true)}
        onMouseLeave={() => setShowSecondImage(false)}
      >
        <Image
          src={displayImage}
          alt={product.name}
          fill
          className="object-cover transition-all duration-300 group-hover:scale-105"
          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
        />
        {hasDiscount && (
          <div className="absolute right-2 top-2 rounded-full bg-red-600 px-2 py-1 text-xs font-semibold text-white">
            Sale
          </div>
        )}
      </div>
      <div className="mt-3 flex flex-grow flex-col gap-2 md:gap-3">
        <div>
          <p className="line-clamp-2 text-sm font-medium text-neutral-900 md:text-base">
            {product.name}
          </p>
          <p className="text-xs text-neutral-700 line-clamp-2 md:text-sm">
            {product.description}
          </p>
        </div>
        <div className="mt-auto flex items-center justify-between pt-2">
          <div className="flex items-center gap-2">
            <span className="text-base font-semibold text-neutral-900 md:text-lg">
              ${displayPrice.toFixed(2)}
            </span>
            {hasDiscount && (
              <span className="text-xs text-neutral-500 line-through">
                ${product.price.toFixed(2)}
              </span>
            )}
          </div>
          <div className="flex items-center gap-1 text-xs text-neutral-700">
            <StarIcon className="h-4 w-4 text-yellow-500" />
            <span className="font-medium">{product.rating?.toFixed(1) ?? "4.5"}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}

