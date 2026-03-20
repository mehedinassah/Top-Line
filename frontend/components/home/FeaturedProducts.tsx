"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { featuredProducts } from "@/lib/productData";
import { HeartIcon as HeartSolidIcon } from "@heroicons/react/24/solid";
import { HeartIcon } from "@heroicons/react/24/outline";
import type { Product } from "@/lib/productData";

function FeaturedProductCard({ product }: { product: Product }) {
  const [isInWishlist, setIsInWishlist] = useState(false);

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
      const displayPrice = product.discountPrice ?? product.price;
      const primaryImage = product.images?.[0] ?? "/placeholder-product.png";

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
    <Link href={`/products/${product.id}`}>
      <div className="group relative aspect-[3/4] overflow-hidden bg-neutral-100 cursor-pointer">
        {/* Image */}
        <Image
          src={product.images?.[0] || "/placeholder-product.png"}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
          priority
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/0 via-black/0 to-black/0 group-hover:from-black/20 group-hover:via-black/20 group-hover:to-black/40 transition-all duration-500" />

        {/* Content */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500">
          <div className="text-center px-4">
            <p className="text-xs font-semibold tracking-[0.15em] text-white uppercase line-clamp-2">
              {product.name}
            </p>
            <p className="mt-2 text-sm text-white/90 font-light">
              ${product.discountPrice || product.price}
            </p>
          </div>
        </div>

        {/* Wishlist Heart */}
        <button
          onClick={handleWishlistClick}
          className="absolute bottom-4 right-4 p-2 hover:opacity-80 transition"
          title={isInWishlist ? "Remove from wishlist" : "Add to wishlist"}
          aria-label={isInWishlist ? "Remove from wishlist" : "Add to wishlist"}
        >
          {isInWishlist ? (
            <HeartSolidIcon className="h-6 w-6 text-red-500" />
          ) : (
            <HeartIcon className="h-6 w-6 text-white drop-shadow-lg" />
          )}
        </button>
      </div>
    </Link>
  );
}

export default function FeaturedProducts() {
  // Limit to maximum 12 products (4 columns × 3 rows)
  const displayedProducts = featuredProducts.slice(0, 12);

  return (
    <section className="border-b border-neutral-200 bg-white w-full">
      <div className="w-full px-4 py-16 md:py-20 lg:px-10">
        {/* Header */}
        <div className="mb-12 md:mb-16">
          <h2 className="text-sm font-semibold tracking-widest text-neutral-700 uppercase">
            Collection
          </h2>
          <h3 className="mt-3 text-3xl md:text-5xl font-bold text-neutral-900 tracking-tight">
            Featured
          </h3>
        </div>

        {/* Product Grid - Premium Fashion Style with Portrait Images */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
          {displayedProducts.map((product) => (
            <FeaturedProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}

