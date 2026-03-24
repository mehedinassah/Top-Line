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
      className="group relative aspect-square overflow-hidden bg-neutral-100 cursor-pointer"
      title={`View ${product.name}`}
    >
      <div 
        className="relative w-full h-full"
        onMouseEnter={() => secondaryImage && setShowSecondImage(true)}
        onMouseLeave={() => setShowSecondImage(false)}
      >
        <Image
          src={displayImage}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          loading="lazy"
          sizes="(min-width: 1024px) 33.33vw, (min-width: 640px) 50vw, 100vw"
        />
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/0 via-black/0 to-black/0 group-hover:from-black/20 group-hover:via-black/20 group-hover:to-black/40 transition-all duration-500" />

        {/* Discount Badge */}
        {hasDiscount && (
          <div className="absolute right-2 top-2 bg-red-600 px-2 py-1 text-xs font-semibold text-white z-10">
            Sale
          </div>
        )}
        
        {/* Wishlist Heart */}
        <button
          onClick={handleWishlistClick}
          className="absolute bottom-2 right-2 p-2 hover:opacity-80 transition z-10"
          title={isInWishlist ? "Remove from wishlist" : "Add to wishlist"}
          aria-label={isInWishlist ? "Remove from wishlist" : "Add to wishlist"}
        >
          {isInWishlist ? (
            <HeartSolidIcon className="h-6 w-6 text-red-500" />
          ) : (
            <HeartIcon className="h-6 w-6 text-white drop-shadow-lg" />
          )}
        </button>

        {/* Product Info on Hover */}
        <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500">
          <div className="text-center px-4">
            <p className="text-xs font-semibold tracking-[0.15em] text-white uppercase line-clamp-2">
              {product.name}
            </p>
            <div className="flex items-center justify-center gap-1 mt-2">
              <StarIcon className="h-4 w-4 text-yellow-400" />
              <span className="text-sm text-white/90 font-light">{product.rating?.toFixed(1) ?? "4.5"}</span>
            </div>
            <p className="mt-2 text-sm text-white/90 font-light tracking-wide">
              ৳{displayPrice.toFixed(0)}
            </p>
            <p className="mt-3 text-sm text-white/90 font-light tracking-wide">
              View Details →
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
}


