"use client";

import Image from "next/image";
import Link from "next/link";
import { StarIcon, HeartIcon as HeartSolidIcon } from "@heroicons/react/24/solid";
import { HeartIcon } from "@heroicons/react/24/outline";
import { useState, useEffect } from "react";
import type { Product } from "@/lib/productData";

export default function ProductCard({ product }: { product: Product }) {
  const [showSecondImage, setShowSecondImage] = useState(false);
  const [isInWishlist, setIsInWishlist] = useState(false);
  
  const primaryImage = product.images?.[0] ?? "/placeholder-product.png";
  const secondaryImage = product.images?.[1] ?? null;
  const displayImage = showSecondImage && secondaryImage ? secondaryImage : primaryImage;
  const displayPrice = product.discountPrice ?? product.price;
  const hasDiscount = product.discountPrice !== undefined;

  // Check if product is in wishlist on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem("topline_wishlist");
      const wishlist = stored ? JSON.parse(stored) : [];
      const exists = wishlist.some((item: any) => item.productId === product.id);
      setIsInWishlist(exists);
    } catch (error) {
      console.error("Failed to load wishlist:", error);
    }
  }, [product.id]);

  const handleWishlistClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    try {
      const stored = localStorage.getItem("topline_wishlist");
      let wishlist = stored ? JSON.parse(stored) : [];

      const exists = wishlist.some((item: any) => item.productId === product.id);

      if (exists) {
        wishlist = wishlist.filter((item: any) => item.productId !== product.id);
      } else {
        wishlist.push({
          id: `${product.id}`,
          productId: product.id,
          name: product.name,
          price: displayPrice,
          image: primaryImage
        });
      }

      localStorage.setItem("topline_wishlist", JSON.stringify(wishlist));
      setIsInWishlist(!exists);
    } catch (error) {
      console.error("Failed to update wishlist:", error);
    }
  };

  return (
    <Link
      href={`/products/${product.id}`}
      className="group relative bg-white overflow-hidden cursor-pointer border border-neutral-200 hover:border-neutral-300 transition"
      title={`View ${product.name}`}
    >
      {/* Image Container */}
      <div 
        className="relative w-full overflow-hidden bg-neutral-100"
        style={{ aspectRatio: "3 / 4" }}
        onMouseEnter={() => secondaryImage && setShowSecondImage(true)}
        onMouseLeave={() => setShowSecondImage(false)}
      >
        <Image
          src={displayImage}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          loading="lazy"
          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
        />
        
        {/* Discount Badge */}
        {hasDiscount && (
          <div className="absolute right-2 top-2 bg-red-600 px-2 py-1 text-xs font-semibold text-white z-10">
            Sale
          </div>
        )}
        
        {/* Wishlist Heart */}
        <button
          onClick={handleWishlistClick}
          className="absolute bottom-2 right-2 p-1.5 hover:opacity-80 transition z-10 bg-white/80 hover:bg-white rounded-full"
          title={isInWishlist ? "Remove from wishlist" : "Add to wishlist"}
          aria-label={isInWishlist ? "Remove from wishlist" : "Add to wishlist"}
        >
          {isInWishlist ? (
            <HeartSolidIcon className="h-5 w-5 text-red-500" />
          ) : (
            <HeartIcon className="h-5 w-5 text-neutral-900" />
          )}
        </button>
      </div>

      {/* Product Info - Always visible on mobile, visible on hover on desktop */}
      <div className="p-3 sm:p-4">
        <p className="text-xs sm:text-sm font-light text-neutral-900 line-clamp-2 mb-2">
          {product.name}
        </p>
        
        <div className="flex items-center gap-2 mb-2">
          <span className="text-sm sm:text-base font-semibold text-neutral-900">
            ৳{displayPrice.toFixed(0)}
          </span>
          {hasDiscount && (
            <span className="text-xs text-neutral-500 line-through">
              ৳{product.price.toFixed(0)}
            </span>
          )}
        </div>

        <div className="flex items-center gap-1 text-xs">
          <StarIcon className="h-3.5 w-3.5 text-neutral-900" />
          <span className="font-light text-neutral-700">{product.rating?.toFixed(1) ?? "4.5"}</span>
        </div>
      </div>
    </Link>
  );
}


