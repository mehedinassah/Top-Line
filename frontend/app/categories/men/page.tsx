"use client";

import { useState, useMemo, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { featuredProducts, SIZES } from "@/lib/productData";
import { StarIcon, HeartIcon as HeartSolidIcon } from "@heroicons/react/24/solid";
import { HeartIcon } from "@heroicons/react/24/outline";
import type { Product, Size } from "@/lib/productData";

type SortOption = "newest" | "price-low" | "price-high" | "rating";

function MinimalProductCard({ product }: { product: Product }) {
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
      className="group flex flex-col bg-white border border-neutral-200 hover:border-neutral-300 transition"
      title={`View ${product.name}`}
    >
      <div 
        className="relative w-full overflow-hidden"
        style={{ aspectRatio: "3 / 4" }}
        onMouseEnter={() => secondaryImage && setShowSecondImage(true)}
        onMouseLeave={() => setShowSecondImage(false)}
      >
        <Image
          src={displayImage}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-[400ms] ease-out group-hover:scale-105"
          loading="lazy"
          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
        />
        {hasDiscount && (
          <div className="absolute right-2 top-2 sm:right-3 sm:top-3 bg-black px-2.5 py-1 text-xs font-semibold text-white">
            Sale
          </div>
        )}
        {/* Wishlist Heart */}
        <button
          onClick={handleWishlistClick}
          className="absolute bottom-2 right-2 sm:bottom-3 sm:right-3 p-1.5 sm:p-2 hover:opacity-80 transition bg-white/80 hover:bg-white rounded-full"
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
      <div className="flex flex-grow flex-col gap-2 px-3 py-3 sm:px-4 sm:py-4">
        <div>
          <p className="line-clamp-2 text-xs sm:text-sm font-light text-neutral-900">
            {product.name}
          </p>
        </div>
        <div className="mt-auto flex items-center justify-between pt-1">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-sm sm:text-base font-semibold text-neutral-900">
              ৳{displayPrice.toFixed(0)}
            </span>
            {hasDiscount && (
              <span className="text-xs text-neutral-500 line-through">
                ৳{product.price.toFixed(0)}
              </span>
            )}
          </div>
          <div className="flex items-center gap-1 text-xs text-neutral-700">
            <StarIcon className="h-3.5 w-3.5 text-neutral-900" />
            <span className="font-light">{product.rating?.toFixed(1) ?? "4.5"}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default function MenPage() {
  const categoryProducts = useMemo(() => {
    return featuredProducts.filter(p => p.collection === "men");
  }, []);

  const maxPrice = Math.max(...categoryProducts.map(p => Math.max(p.price, p.discountPrice || 0))) + 50;

  const [sortBy, setSortBy] = useState<SortOption>("newest");
  const [selectedSizes, setSelectedSizes] = useState<Size[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, maxPrice]);

  // Filter products
  const filteredProducts = useMemo(() => {
    let result = [...categoryProducts];

    // Price filter
    result = result.filter(p => {
      const price = p.discountPrice ?? p.price;
      return price >= priceRange[0] && price <= priceRange[1];
    });

    // Size filter
    if (selectedSizes.length > 0) {
      result = result.filter(p =>
        selectedSizes.some(size => p.sizes.includes(size))
      );
    }

    // Sorting
    switch (sortBy) {
      case "price-low":
        result.sort((a, b) => (a.discountPrice ?? a.price) - (b.discountPrice ?? b.price));
        break;
      case "price-high":
        result.sort((a, b) => (b.discountPrice ?? b.price) - (a.discountPrice ?? a.price));
        break;
      case "rating":
        result.sort((a, b) => b.rating - a.rating);
        break;
      case "newest":
      default:
        result.sort((a, b) => b.id - a.id);
    }

    return result;
  }, [categoryProducts, selectedSizes, priceRange, sortBy]);

  return (
    <>
      {/* Hero Section with Background Image */}
      <div 
        className="relative w-full border-b border-neutral-200 overflow-hidden"
        style={{
          aspectRatio: '16 / 5'
        }}
      >
        <Image
          src="https://drive.google.com/uc?export=view&id=10zOKNSPsM_ZSuXSSIj7MjifZ86DE6F9-"
          alt="Men's Collection"
          fill
          className="object-cover object-center"
          priority
          sizes="100vw"
        />
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/40"></div>
        
        {/* Content */}
        <div className="relative h-full flex items-start px-4 sm:px-6 md:px-8 pt-6 sm:pt-8 md:pt-12">
          <div className="space-y-2 max-w-2xl">
            <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-5xl font-light text-white tracking-tight">Men's Collection</h1>
          </div>
        </div>
      </div>

      {/* Control Bar */}
      <div className="border-b border-neutral-200 bg-white px-6 py-4 md:px-8">
        <div className="flex items-center justify-between">
          <span className="text-sm text-neutral-600">{filteredProducts.length} products</span>
          <div className="flex items-center gap-4">
            <label className="text-sm text-neutral-600">
              Sort:
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortOption)}
                className="ml-2 border-0 bg-transparent text-sm text-neutral-900 focus:outline-none focus:ring-0 cursor-pointer"
              >
                <option value="newest">Newest</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
              </select>
            </label>
          </div>
        </div>
      </div>

      {/* Main Content - Full Width */}
      <div className="w-full" style={{ backgroundColor: "#F5F5F5" }}>
        <div className="flex flex-col gap-8 px-6 py-12 md:px-8 md:py-16 lg:py-20">
          {/* Products Grid */}
          {filteredProducts.length > 0 ? (
            <div className="overflow-x-auto">
              <div className="grid gap-3 sm:gap-4 md:gap-6 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4">
                {filteredProducts.map(product => (
                  <MinimalProductCard key={product.id} product={product} />
                ))}
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center gap-4 rounded bg-white px-6 py-16 text-center">
              <p className="text-neutral-600">No products found with selected filters.</p>
              <button
                onClick={() => {
                  setSelectedSizes([]);
                  setPriceRange([0, maxPrice - 50]);
                }}
                className="bg-neutral-900 px-6 py-2 text-sm font-light text-white hover:bg-neutral-800 transition"
              >
                Clear filters
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Back Link */}
      <div className="border-t border-neutral-200 bg-white px-6 py-6 md:px-8">
        <Link href="/" className="text-sm text-neutral-600 hover:text-neutral-900 transition font-light">
          ← Back to home
        </Link>
      </div>
    </>
  );
}

