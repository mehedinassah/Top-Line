"use client";

import Image from "next/image";
import Link from "next/link";
import { StarIcon, ChevronLeftIcon, MinusIcon, PlusIcon, HeartIcon } from "@heroicons/react/24/solid";
import { useCart } from "@/components/cart/CartContext";
import SizeSelector from "@/components/product/SizeSelector";
import ColorSelector from "@/components/product/ColorSelector";
import SizeGuideModal from "@/components/product/SizeGuideModal";
import TrustSignals from "@/components/product/TrustSignals";
import FabricDetails from "@/components/product/FabricDetails";
import RelatedProducts from "@/components/products/RelatedProducts";
import { useState, useEffect, useRef } from "react";
import type { ReactNode } from "react";
import type { Product, Size, Color, ProductVariant, Review } from "@/lib/productData";
import { getRandomReviewsForProduct, calculateAverageRating } from "@/lib/productData";

type ProductDetailProps = Product & {
  inStock: boolean;
  stockCount: number;
  reviews: Review[];
  allProducts?: Product[];
};

export default function ProductDetailClient(props: ProductDetailProps) {
  const { addItem } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState<Size | null>(null);
  const [selectedColor, setSelectedColor] = useState<Color | null>(props.colors?.[0] || null);
  const [addedToCart, setAddedToCart] = useState(false);
  const [addedToWishlist, setAddedToWishlist] = useState(false);
  const [isInWishlist, setIsInWishlist] = useState(false);
  const [imageZoom, setImageZoom] = useState(false);
  const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 });
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewComment, setReviewComment] = useState("");
  const [reviews, setReviews] = useState<Review[]>(props.reviews);
  const [allProductReviews, setAllProductReviews] = useState<Review[]>([]);
  const [showSizeGuideModal, setShowSizeGuideModal] = useState(false);
  const [displayedReviewCount, setDisplayedReviewCount] = useState(2);
  const [averageRating, setAverageRating] = useState(props.rating);
  const [isSubmittingReview, setIsSubmittingReview] = useState(false);
  const reviewsSectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const loggedIn = localStorage.getItem("isLoggedIn") === "true";
    setIsLoggedIn(loggedIn);

    // Load random reviews for this product (4-5 reviews per product)
    const productReviews = getRandomReviewsForProduct(props.id, 4 + Math.floor(Math.random() * 2));
    setAllProductReviews(productReviews);
    setAverageRating(calculateAverageRating(productReviews));

    // Check if product is already in wishlist
    try {
      const stored = localStorage.getItem("topline_wishlist");
      const wishlist = stored ? JSON.parse(stored) : [];
      const exists = wishlist.some((item: any) => item.productId === props.id);
      setIsInWishlist(exists);
    } catch (error) {
      console.error("Failed to load wishlist:", error);
    }
  }, [props.id]);

  // Listen for auth state changes
  useEffect(() => {
    const handleAuthStateChange = () => {
      const updatedLoggedIn = localStorage.getItem("isLoggedIn") === "true";
      setIsLoggedIn(updatedLoggedIn);
    };

    window.addEventListener("authStateChanged", handleAuthStateChange);
    window.addEventListener("storage", handleAuthStateChange);
    
    return () => {
      window.removeEventListener("authStateChanged", handleAuthStateChange);
      window.removeEventListener("storage", handleAuthStateChange);
    };
  }, []);

  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewComment.trim()) return;

    setIsSubmittingReview(true);

    // Simulate API call with 1 second delay
    const newReview: Review = {
      id: Math.max(...allProductReviews.map(r => r.id), 0) + 1,
      author: localStorage.getItem("userEmail")?.split("@")[0] || "Anonymous",
      rating: reviewRating,
      comment: reviewComment
    };

    // Add new review to the beginning of allProductReviews
    const updatedReviews = [newReview, ...allProductReviews];
    
    // Wait a moment for soft loading effect
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Update all states together
    setAllProductReviews(updatedReviews);
    setAverageRating(calculateAverageRating(updatedReviews));
    
    // Ensure new review is visible by showing at least 3 reviews
    setDisplayedReviewCount(prevCount => Math.max(prevCount, 3));
    
    // Reset form
    setReviewComment("");
    setReviewRating(5);
    setShowReviewForm(false);
    setIsSubmittingReview(false);
  };

  const image = props.images?.[selectedImageIndex] ?? "/placeholder-product.png";
  
  // Find the current variant based on selected size and color
  const currentVariant = props.variants?.find(
    v => v.size === selectedSize && v.color?.name === selectedColor?.name
  );

  const variantStock = currentVariant?.quantity ?? 0;
  const isVariantInStock = currentVariant?.inStock ?? props.inStock;
  const stockLabel = isVariantInStock ? "In stock" : "Out of stock";
  const displayPrice = props.discountPrice ?? props.price;
  const hasDiscount = props.discountPrice !== undefined;

  // Get available sizes for selected color
  const availableSizesForColor = selectedColor
    ? props.variants
        ?.filter(v => v.color?.name === selectedColor.name && v.inStock)
        .map(v => v.size)
        .filter((size, index, arr) => arr.indexOf(size) === index) || []
    : props.sizes || [];

  // Get available colors for selected size
  const availableColorsForSize = selectedSize
    ? props.variants
        ?.filter(v => v.size === selectedSize && v.inStock)
        .map(v => v.color)
        .filter((color, index, arr) => 
          arr.findIndex(c => c.name === color.name) === index
        ) || []
    : props.colors || [];

  function handleAddToCart() {
    if (!isVariantInStock) {
      return;
    }
    
    // Only require size/color for non-accessory items
    if (props.collection !== "accessories") {
      if (!selectedSize || !selectedColor) {
        alert("Please select a size and color");
        return;
      }
    }

    const cartItemData = {
      id: props.collection === "accessories" 
        ? `${props.id}` 
        : `${props.id}-${selectedSize}-${selectedColor?.name}`,
      productId: props.id,
      name: props.name,
      price: displayPrice,
      quantity,
      size: selectedSize,
      color: selectedColor?.name,
      image: props.images?.[0],
      discountPrice: props.discountPrice
    };

    addItem(cartItemData);
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
    setQuantity(1);
  }

  function handleAddToWishlist() {
    const wishlistItem = {
      id: `${props.id}`,
      productId: props.id,
      name: props.name,
      price: displayPrice,
      image: props.images?.[0]
    };

    try {
      const stored = localStorage.getItem("topline_wishlist");
      let wishlist = stored ? JSON.parse(stored) : [];
      
      const exists = wishlist.some((item: any) => item.productId === wishlistItem.productId);

      if (exists) {
        wishlist = wishlist.filter((item: any) => item.productId !== wishlistItem.productId);
        setIsInWishlist(false);
      } else {
        wishlist.push(wishlistItem);
        setIsInWishlist(true);
      }

      localStorage.setItem("topline_wishlist", JSON.stringify(wishlist));
    } catch (error) {
      console.error("Failed to add to wishlist:", error);
    }

    setAddedToWishlist(true);
    setTimeout(() => setAddedToWishlist(false), 2000);
  }

  function handleIncreaseQuantity() {
    const stock = props.collection === "accessories" ? props.stockCount : variantStock;
    if (quantity < stock) {
      setQuantity(quantity + 1);
    }
  }

  function handleDecreaseQuantity() {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  }

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setZoomPosition({ x, y });
  };

  return (
    <>
      {/* Breadcrumb */}
      <div className="border-b border-neutral-200 bg-white px-4 py-3 md:py-4">
        <div className="mx-auto max-w-6xl">
          <Link
            href="/products"
            className="inline-flex items-center gap-1 text-xs text-neutral-700 hover:text-neutral-900 transition"
          >
            <ChevronLeftIcon className="h-4 w-4" />
            Back to products
          </Link>
        </div>
      </div>

      {/* Main Product Section */}
      <section className="border-b border-neutral-200 bg-white">
        <div className="mx-auto max-w-6xl px-4 py-6 md:py-10">
          <div className="grid gap-6 md:gap-8 lg:grid-cols-2">
            {/* Product Images */}
            <div className="space-y-3 md:space-y-4">
              {/* Main Image with Zoom */}
              <div
                className="relative aspect-square w-full overflow-hidden bg-neutral-100 cursor-zoom-in"
                onMouseEnter={() => setImageZoom(true)}
                onMouseLeave={() => setImageZoom(false)}
                onMouseMove={handleMouseMove}
              >
                <Image
                  src={image}
                  alt={props.name}
                  fill
                  className={`object-cover transition-transform ${imageZoom ? "scale-150" : "scale-100"}`}
                  style={imageZoom ? {
                    transformOrigin: `${zoomPosition.x}% ${zoomPosition.y}%`
                  } : {}}
                  priority
                  sizes="(min-width: 1024px) 50vw, 100vw"
                />
                {hasDiscount && (
                  <div className="absolute right-4 top-4 bg-red-600 px-3 py-1 text-sm font-semibold text-white">
                    -{Math.round(((props.price - displayPrice) / props.price) * 100)}%
                  </div>
                )}
                {!isVariantInStock && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                    <p className="text-2xl font-bold text-white md:text-3xl">Sold Out</p>
                  </div>
                )}
              </div>

              {/* Image Thumbnails Gallery */}
              <div className="flex gap-2 sm:gap-3">
                {/* Existing product images and placeholder boxes */}
                {[0, 1, 2, 3].map((idx) => {
                  const hasImage = idx < props.images.length;
                  const img = hasImage ? props.images[idx] : null;
                  
                  return (
                    <button
                      key={idx}
                      onClick={() => {
                        if (hasImage) {
                          setSelectedImageIndex(idx);
                        }
                      }}
                      className={`relative h-16 w-16 overflow-hidden transition md:h-20 md:w-20 ${
                        hasImage ? "cursor-pointer" : "cursor-not-allowed"
                      } ${
                        hasImage && idx === selectedImageIndex
                          ? "ring-2 ring-neutral-900"
                          : hasImage
                          ? "border border-neutral-300 hover:border-neutral-400"
                          : "border border-neutral-200 bg-neutral-50"
                      }`}
                      aria-label={`View product image ${idx + 1}`}
                      title={hasImage ? `View product image ${idx + 1}` : "Placeholder for future image"}
                      disabled={!hasImage}
                    >
                      {hasImage && img ? (
                        <Image
                          src={img}
                          alt={`${props.name} view ${idx + 1}`}
                          fill
                          className="object-cover"
                          sizes="80px"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center bg-neutral-100">
                          <div className="text-center">
                            <div className="text-sm text-neutral-400">+</div>
                            <p className="text-xs text-neutral-400">Pending</p>
                          </div>
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Product Info */}
            <div className="flex flex-col justify-start gap-4 md:gap-6">
              {/* Category & Title */}
              <div>
                <p className="text-xs uppercase tracking-wide text-neutral-700">
                  {props.category}
                </p>
                <h1 className="mt-2 text-2xl font-bold text-neutral-900 md:text-3xl lg:text-4xl">
                  {props.name}
                </h1>
              </div>

              {/* Price & Stock Status */}
              <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-3xl font-bold text-neutral-900 md:text-4xl">
                    ৳{displayPrice.toFixed(0)}
                  </span>
                  {hasDiscount && (
                    <span className="text-sm text-neutral-500 line-through">
                      ৳{props.price.toFixed(0)}
                    </span>
                  )}
                  <span className="rounded-full bg-neutral-100 px-3 py-1 text-xs font-medium text-neutral-900">
                    {stockLabel}
                    {isVariantInStock && variantStock > 0 && (
                      <span className="ml-1 text-neutral-700">
                        • {variantStock} left
                      </span>
                    )}
                  </span>
                </div>

                {/* Rating */}
                <div className="flex items-center gap-3">
                  <div className="flex gap-0.5">
                    {renderStars(averageRating)}
                  </div>
                  <span className="text-sm font-medium text-neutral-700">
                    {averageRating.toFixed(1)} ({allProductReviews.length} reviews)
                  </span>
                </div>
              </div>

              {/* Description */}
              <p className="text-sm leading-relaxed text-neutral-800 md:text-base">
                {props.description}
              </p>

              {/* Size & Color Selectors */}
              {props.collection !== "accessories" && (
                <div className="space-y-4 border-t border-neutral-200 pt-4 md:pt-6">
                  <ColorSelector
                    selectedColor={selectedColor}
                    onColorChange={setSelectedColor}
                    colors={props.colors}
                  />
                  
                  <div className="flex items-end justify-between gap-4">
                    <div className="flex-1">
                      <SizeSelector
                        selectedSize={selectedSize}
                        onSizeChange={setSelectedSize}
                        availableSizes={selectedSize ? availableColorsForSize.map((_, i) => props.sizes?.[i]) as Size[] : props.sizes || []}
                      />
                    </div>
                    <button
                      onClick={() => setShowSizeGuideModal(true)}
                      className="text-sm underline text-neutral-700 hover:text-neutral-900 transition font-medium whitespace-nowrap pb-2"
                    >
                      Size Guide
                    </button>
                  </div>

                  {/* SKU Display */}
                  {currentVariant && (
                    <div className=" bg-neutral-50 px-3 py-2 text-xs text-neutral-700">
                      SKU: <span className="font-mono font-medium">{currentVariant.sku}</span>
                    </div>
                  )}
                </div>
              )}

              {/* Quantity Selector & Add to Cart */}
              <div className="flex flex-col gap-3 sm:gap-4">
                {isVariantInStock && (
                  <div className="flex items-center gap-3 bg-neutral-100 px-4 py-2.5">
                    <button
                      onClick={handleDecreaseQuantity}
                      disabled={quantity <= 1}
                      className="text-neutral-700 hover:text-neutral-900 disabled:opacity-50 disabled:cursor-not-allowed transition"
                      aria-label="Decrease quantity"
                      title="Decrease quantity"
                    >
                      <MinusIcon className="h-4 w-4" />
                    </button>
                    <input
                      type="number"
                      value={quantity}
                      onChange={(e) => {
                        const val = parseInt(e.target.value);
                        const maxStock = props.collection === "accessories" ? props.stockCount : variantStock;
                        if (val > 0 && val <= maxStock) {
                          setQuantity(val);
                        }
                      }}
                      min="1"
                      max={props.collection === "accessories" ? props.stockCount : variantStock}
                      className="w-8 bg-transparent text-center text-sm font-medium text-neutral-900 outline-none"
                      aria-label="Product quantity"
                    />
                    <button
                      onClick={handleIncreaseQuantity}
                      disabled={quantity >= (props.collection === "accessories" ? props.stockCount : variantStock)}
                      className="text-neutral-700 hover:text-neutral-900 disabled:opacity-50 disabled:cursor-not-allowed transition"
                      aria-label="Increase quantity"
                      title="Increase quantity"
                    >
                      <PlusIcon className="h-4 w-4" />
                    </button>
                  </div>
                )}

                <div className="flex gap-3">
                  <button
                    onClick={handleAddToCart}
                    disabled={!isVariantInStock || (props.collection !== "accessories" && (!selectedSize || !selectedColor))}
                    className={`flex-1 px-6 py-2.5 font-semibold text-sm shadow-minimal transition ${
                      addedToCart
                        ? "bg-green-600 text-white hover:bg-green-700"
                        : "bg-neutral-900 text-white hover:bg-neutral-800 disabled:cursor-not-allowed disabled:opacity-60"
                    }`}
                    title={isVariantInStock ? "Add this item to your cart" : "This variant is out of stock"}
                    aria-label={isVariantInStock ? `Add ${props.name} to cart` : "Out of stock"}
                  >
                    {addedToCart
                      ? "✓ Added to cart"
                      : isVariantInStock
                      ? "Add to cart"
                      : "Out of stock"}
                  </button>
                  <button
                    onClick={handleAddToWishlist}
                    className={`px-4 py-2.5 font-semibold text-sm transition ${
                      isInWishlist
                        ? "bg-red-100 text-red-600 hover:bg-red-200"
                        : "bg-neutral-100 text-neutral-900 hover:bg-neutral-200"
                    }`}
                    title={isInWishlist ? "Remove from wishlist" : "Add to wishlist"}
                    aria-label={isInWishlist ? "Remove from wishlist" : "Add to wishlist"}
                  >
                    {isInWishlist ? (
                      <HeartIcon className="h-5 w-5 fill-current" />
                    ) : (
                      <HeartIcon className="h-5 w-5" />
                    )}
                  </button>
                </div>
              </div>

              {/* Features Below Add to Cart */}
              <div className="grid grid-cols-2 gap-3 pt-4 sm:grid-cols-4">
                <div className="border border-neutral-200 bg-white p-3 text-center sm:p-4">
                  <p className="text-xs font-semibold text-neutral-900 sm:text-sm">Stock Status</p>
                  <p className={`mt-1.5 text-xs font-medium ${isVariantInStock ? "text-green-600" : "text-red-600"}`}>
                    {isVariantInStock ? "In Stock" : "Out of Stock"}
                  </p>
                </div>
                <div className="border border-neutral-200 bg-white p-3 text-center sm:p-4">
                  <p className="text-xs font-semibold text-neutral-900 sm:text-sm">Free Shipping</p>
                  <p className="mt-1.5 text-xs text-neutral-600">Over ৳1,000</p>
                </div>
                <div className="border border-neutral-200 bg-white p-3 text-center sm:p-4">
                  <p className="text-xs font-semibold text-neutral-900 sm:text-sm">Easy Returns</p>
                  <p className="mt-1.5 text-xs text-neutral-600">30-day policy</p>
                </div>
                <div className="border border-neutral-200 bg-white p-3 text-center sm:p-4">
                  <p className="text-xs font-semibold text-neutral-900 sm:text-sm">Secure Payment</p>
                  <p className="mt-1.5 text-xs text-neutral-600">256-bit SSL</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Fabric/Product Details Section */}
      {(props.fabricDescription || props.fabricComposition) && (
        <FabricDetails 
          description={props.fabricDescription}
          composition={props.fabricComposition}
          isAccessory={props.collection === "accessories"}
        />
      )}

      {/* Reviews Section */}
      <section ref={reviewsSectionRef} className="border-b border-neutral-200 bg-white">
        <div className="mx-auto max-w-6xl px-4 py-8 md:py-12">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-neutral-900 md:text-3xl">Customer reviews</h2>
            <p className="mt-1 text-sm text-neutral-700">
              {allProductReviews.length} {allProductReviews.length === 1 ? "review" : "reviews"}
            </p>
          </div>

          {/* Add Review Form */}
          {isLoggedIn ? (
            <div className="mb-8 border border-neutral-200 bg-neutral-50 p-6">
              {showReviewForm ? (
                <form onSubmit={handleSubmitReview} className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-neutral-900 mb-3">
                      Rating
                    </label>
                    <div className="flex gap-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setReviewRating(star)}
                          className="transition hover:scale-110"
                        >
                          <StarIcon
                            className={`h-6 w-6 ${
                              star <= reviewRating
                                ? "text-yellow-500"
                                : "text-neutral-400"
                            }`}
                          />
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label htmlFor="review-comment" className="block text-sm font-semibold text-neutral-900 mb-2">
                      Your review
                    </label>
                    <textarea
                      id="review-comment"
                      value={reviewComment}
                      onChange={(e) => setReviewComment(e.target.value)}
                      placeholder="Share your thoughts about this product..."
                      className="w-full px-4 py-3  border border-neutral-200 bg-white text-neutral-900 placeholder-neutral-500 focus:outline-none focus:border-neutral-900 transition"
                      rows={4}
                    />
                  </div>

                  <div className="flex gap-3">
                    <button
                      type="submit"
                      disabled={!reviewComment.trim() || isSubmittingReview}
                      className="flex items-center gap-2 bg-neutral-900 px-6 py-2 text-sm font-semibold text-white hover:bg-neutral-800 disabled:opacity-50 disabled:cursor-not-allowed transition"
                    >
                      {isSubmittingReview && (
                        <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                      )}
                      {isSubmittingReview ? "Submitting..." : "Submit review"}
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setShowReviewForm(false);
                        setReviewComment("");
                        setReviewRating(5);
                      }}
                      className="bg-neutral-200 px-6 py-2 text-sm font-semibold text-neutral-900 hover:bg-neutral-300 transition"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              ) : (
                <button
                  onClick={() => setShowReviewForm(true)}
                  className="w-full bg-neutral-900 px-6 py-2.5 text-sm font-semibold text-white hover:bg-neutral-800 transition"
                >
                  Write a review
                </button>
              )}
            </div>
          ) : (
            <div className="mb-8 border border-neutral-200 bg-neutral-50 p-6 text-center">
              <p className="text-neutral-700 mb-3">
                Sign in to share your review of this product
              </p>
              <Link
                href="/auth/login"
                className="inline-block bg-neutral-900 px-6 py-2.5 text-sm font-semibold text-white hover:bg-neutral-800 transition"
              >
                Sign in to review
              </Link>
            </div>
          )}

          {/* Display Reviews */}
          {allProductReviews.length === 0 ? (
            <div className="border border-neutral-200 bg-neutral-50 p-6 text-center">
              <p className="text-neutral-700">No reviews yet. Be the first to review this product!</p>
            </div>
          ) : (
            <>
              <div className="grid gap-4 md:gap-6">
                {allProductReviews.slice(0, displayedReviewCount).map((review) => (
                  <div
                    key={review.id}
                    className="border border-neutral-200 bg-neutral-50 p-4 md:p-6 hover:border-neutral-300 transition"
                  >
                    <div className="flex flex-col gap-2 md:gap-3 md:flex-row md:items-start md:justify-between">
                      <div>
                        <p className="font-semibold text-neutral-900">{review.author}</p>
                        <div className="mt-1 flex items-center gap-2">
                          <div className="flex gap-0.5">
                            {renderStars(review.rating)}
                          </div>
                          <span className="text-xs text-neutral-700">
                            {review.rating.toFixed(1)} out of 5
                          </span>
                        </div>
                      </div>
                    </div>
                    <p className="mt-3 text-sm leading-relaxed text-neutral-800 md:text-base">
                      {review.comment}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:gap-3">
                {displayedReviewCount < allProductReviews.length && (
                  <button
                    onClick={() => setDisplayedReviewCount(prev => Math.min(prev + Math.floor(Math.random() * 2) + 2, allProductReviews.length))}
                    className="flex-1 border border-neutral-300 bg-white px-6 py-3 text-sm font-semibold text-neutral-900 hover:bg-neutral-50 transition"
                  >
                    Load more reviews
                  </button>
                )}
                
                {displayedReviewCount > 2 && (
                  <button
                    onClick={() => {
                      setDisplayedReviewCount(2);
                      reviewsSectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
                    }}
                    className="flex-1 border border-neutral-300 bg-neutral-100 px-6 py-3 text-sm font-semibold text-neutral-900 hover:bg-neutral-200 transition"
                  >
                    Hide reviews
                  </button>
                )}
              </div>
            </>
          )}
        </div>
      </section>

      {/* Related Products */}
      {props.allProducts && (
        <RelatedProducts 
          products={props.allProducts} 
          currentProductId={props.id}
        />
      )}

      {/* Size Guide Modal */}
      <SizeGuideModal
        isOpen={showSizeGuideModal}
        onClose={() => setShowSizeGuideModal(false)}
      />
    </>
  );
}

function renderStars(rating: number): ReactNode {
  const stars = [];
  const rounded = Math.round(rating * 2) / 2; // Round to nearest 0.5
  for (let i = 1; i <= 5; i++) {
    if (i <= Math.floor(rounded)) {
      stars.push(
        <StarIcon
          key={i}
          className="h-4 w-4 text-yellow-500"
        />
      );
    } else if (i - 0.5 === rounded) {
      // Half star would go here (visual representation only)
      stars.push(
        <StarIcon
          key={i}
          className="h-4 w-4 text-yellow-500"
        />
      );
    } else {
      stars.push(
        <StarIcon
          key={i}
          className="h-4 w-4 text-neutral-400"
        />
      );
    }
  }
  return stars;
}

