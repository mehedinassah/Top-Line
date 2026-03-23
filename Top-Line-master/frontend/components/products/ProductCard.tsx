"use client";

import Image from "next/image";
import Link from "next/link";
import { StarIcon, HeartIcon as HeartSolidIcon, ShoppingBagIcon } from "@heroicons/react/24/solid";
import { HeartIcon } from "@heroicons/react/24/outline";
import { useState, useEffect } from "react";
import { useCart } from "@/components/cart/CartContext";
import type { Product } from "@/lib/productData";

export default function ProductCard({ product }: { product: Product }) {
  const { addItem } = useCart();
  const [showSecondImage, setShowSecondImage] = useState(false);
  const [isInWishlist, setIsInWishlist] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);
  
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

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    try {
      // Use the default variant (first color/size combination)
      const defaultSize = product.sizes?.[0] || null;
      const defaultColor = product.colors?.[0] || null;
      
      // Generate unique ID combining productId + size + color
      const uniqueId = `${product.id}-${defaultSize || 'no-size'}-${defaultColor?.name || 'no-color'}`;
      
      addItem({
        id: uniqueId,
        productId: product.id,
        name: product.name,
        price: product.discountPrice ?? product.price,
        image: primaryImage,
        quantity: 1,
        size: defaultSize || undefined,
        color: defaultColor?.name || undefined,
      });
      
      setAddedToCart(true);
      setTimeout(() => setAddedToCart(false), 2000);
    } catch (error) {
      console.error("Failed to add to cart:", error);
    }
  };

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
      className="group relative aspect-square overflow-hidden bg-neutral-100 cursor-pointer shadow-md hover:shadow-xl transition-shadow duration-300"
      title={`View ${product.name}`}
    >
      <div 
        className="relative w-full h-full"
        onMouseEnter={() => secondaryImage && setShowSecondImage(true)}
        onMouseLeave={() => setShowSecondImage(false)}
      >
        {/* Main Product Image */}
        <Image
          src={displayImage}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
          loading="lazy"
          sizes="(min-width: 1024px) 33.33vw, (min-width: 640px) 50vw, 100vw"
        />
        
        {/* Enhanced Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/0 via-black/10 to-black/50 group-hover:from-black/30 group-hover:via-black/30 group-hover:to-black/60 transition-all duration-500" />

        {/* Badges (Top Left) */}
        <div className="absolute left-2 sm:left-3 top-2 sm:top-3 flex flex-col gap-1.5 sm:gap-2 z-10">
          {product.isNew && (
            <span className="inline-block bg-emerald-500 text-white text-xs sm:text-xs font-bold px-2 sm:px-3 py-1.5 sm:py-1">
              NEW
            </span>
          )}
          {product.isBestSeller && (
            <span className="inline-block bg-amber-500 text-white text-xs sm:text-xs font-bold px-2 sm:px-3 py-1.5 sm:py-1">
              BEST SELLER
            </span>
          )}
          {hasDiscount && (
            <span className="inline-block bg-red-600 text-white text-xs sm:text-xs font-bold px-2 sm:px-3 py-1.5 sm:py-1">
              -{Math.round(((product.price - product.discountPrice!) / product.price) * 100)}%
            </span>
          )}
        </div>

        {/* Price Section (Bottom Left - Always Visible on Mobile) */}
        <div className="absolute bottom-0 left-0 right-0 p-2 sm:p-3 bg-gradient-to-t from-black/80 to-black/0 z-20">
          <div className="flex flex-col gap-1">
            <div className="flex gap-2 items-center">
              <span className="text-white font-bold text-base sm:text-lg">৳{(product.discountPrice ?? product.price).toFixed(0)}</span>
              {hasDiscount && (
                <span className="text-white/60 line-through text-xs sm:text-sm">৳{product.price.toFixed(0)}</span>
              )}
            </div>
            <p className="text-white/80 text-xs sm:text-xs font-medium line-clamp-2">{product.name}</p>
            {product.rating && (
              <div className="flex items-center gap-1 mt-1">
                <StarIcon className="h-3 sm:h-3.5 w-3 sm:w-3.5 text-yellow-400" />
                <span className="text-white/90 text-xs sm:text-xs">{product.rating.toFixed(1)}</span>
                {product.reviewCount && (
                  <span className="text-white/70 text-xs sm:text-xs">({product.reviewCount})</span>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Wishlist Button (Right Side - Always Visible) */}
        <button
          onClick={handleWishlistClick}
          className="absolute top-2 sm:top-3 right-2 sm:right-3 p-2.5 sm:p-2.5 bg-white/90 hover:bg-white rounded-full shadow-lg hover:shadow-xl transition-all duration-200 z-20 min-h-[44px] min-w-[44px] flex items-center justify-center"
          title={isInWishlist ? "Remove from wishlist" : "Add to wishlist"}
          aria-label={isInWishlist ? "Remove from wishlist" : "Add to wishlist"}
        >
          {isInWishlist ? (
            <HeartSolidIcon className="h-5 w-5 text-red-500" />
          ) : (
            <HeartIcon className="h-5 w-5 text-neutral-900" />
          )}
        </button>

        {/* Hover Actions Overlay */}
        <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none group-hover:pointer-events-auto z-30">
          <div className="space-y-3 text-center px-4 w-full">
            {/* Quick Add to Cart Button */}
            {!addedToCart ? (
              <button
                onClick={handleAddToCart}
                className="w-full bg-white text-neutral-900 font-semibold py-2.5 px-4 hover:bg-neutral-100 transition-colors duration-200 flex items-center justify-center gap-2 pointer-events-auto"
              >
                <ShoppingBagIcon className="h-5 w-5" />
                Add to Cart
              </button>
            ) : (
              <button
                disabled
                className="w-full bg-emerald-500 text-white font-semibold py-2.5 px-4 flex items-center justify-center gap-2"
              >
                <span>✓ Added to Cart</span>
              </button>
            )}
            <Link
              href={`/products/${product.id}`}
              className="block text-white text-sm font-light tracking-wide hover:underline"
            >
              View Full Details →
            </Link>
          </div>
        </div>
      </div>
    </Link>
  );
}

