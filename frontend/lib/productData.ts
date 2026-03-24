import { allReviews, calculateAverageRating } from "./reviewsData";
import type { Review } from "./reviewsData";

export const SIZES = ["XS", "S", "M", "L", "XL", "XXL"];

export const COLORS = [
  { name: "Black", code: "#000000" },
  { name: "White", code: "#FFFFFF" },
  { name: "Navy", code: "#001F3F" },
  { name: "Charcoal", code: "#36454F" },
  { name: "Gray", code: "#808080" },
  { name: "Beige", code: "#F5F5DC" },
  { name: "Cream", code: "#FFFDD0" },
  { name: "Olive", code: "#808000" }
];

export type Color = typeof COLORS[number];
export type Size = typeof SIZES[number];

export type ProductVariant = {
  size: Size;
  color: Color;
  sku: string;
  inStock: boolean;
  quantity: number;
};

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  discountPrice?: number;
  category: string;
  collection: "men" | "women" | "accessories";
  images: string[];
  rating: number;
  sizes: Size[];
  colors: Color[];
  variants: ProductVariant[];
}

// Helper function to get random reviews for each product
function getProductReviews(productId: number): Review[] {
  const seed = productId * 7; // Use product ID as seed for consistent random selection
  const reviewCount = 4 + (seed % 2); // 4 or 5 reviews
  const startIndex = (seed % (allReviews.length - reviewCount));
  return allReviews.slice(startIndex, startIndex + reviewCount);
}

export const featuredProducts: Product[] = [
  {
    id: 1,
    name: "Dotted Luxe Cotton Shirt",
    description: "Premium dotted cotton shirt designed with refined elegance. This lightweight, breathable shirt balances comfort with sophistication, perfect for both casual and semi-formal occasions. KEY FEATURES: Premium 140 GSM combed cotton, Poplin weave construction, Breathable and lightweight design, Smooth finish with colorfast dye, All-day comfort fit. FABRIC DETAILS: 100% Combed Cotton, 140 GSM, Poplin Weave, Breathable and lightweight, Smooth finish, Colorfast dyed, Pre-shrunk fabric, Double-stitched seams. FIT AND SIZING: Regular Fit, Model wearing size M is 5'10 inches, True to size - take your usual size. CARE INSTRUCTIONS: Machine wash cold (30 degrees C), Do not bleach, Low heat dry, Iron at low temperature.",
    price: 2200,
    discountPrice: 1890,
    category: "shirts",
    collection: "men",
    images: [
      "https://drive.google.com/uc?export=view&id=18y3VK3nf74ypAkmBJhhe3h1JVh07gRTq"
    ],
    rating: 4.8,
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: [
      { name: "Charcoal", code: "#36454F" },
      { name: "Navy", code: "#001F3F" },
      { name: "Black", code: "#000000" },
      { name: "Beige", code: "#F5F5DC" }
    ],
    variants: [
      { size: "S", color: { name: "Charcoal", code: "#36454F" }, sku: "TL-001-CHA-S", inStock: true, quantity: 12 },
      { size: "M", color: { name: "Charcoal", code: "#36454F" }, sku: "TL-001-CHA-M", inStock: true, quantity: 18 },
      { size: "L", color: { name: "Charcoal", code: "#36454F" }, sku: "TL-001-CHA-L", inStock: true, quantity: 14 },
      { size: "XL", color: { name: "Charcoal", code: "#36454F" }, sku: "TL-001-CHA-XL", inStock: true, quantity: 8 },
      { size: "XXL", color: { name: "Charcoal", code: "#36454F" }, sku: "TL-001-CHA-XXL", inStock: false, quantity: 0 },
      { size: "S", color: { name: "Navy", code: "#001F3F" }, sku: "TL-001-NAV-S", inStock: true, quantity: 10 },
      { size: "M", color: { name: "Navy", code: "#001F3F" }, sku: "TL-001-NAV-M", inStock: true, quantity: 16 },
      { size: "L", color: { name: "Navy", code: "#001F3F" }, sku: "TL-001-NAV-L", inStock: true, quantity: 11 },
      { size: "XL", color: { name: "Navy", code: "#001F3F" }, sku: "TL-001-NAV-XL", inStock: true, quantity: 6 },
      { size: "S", color: { name: "Black", code: "#000000" }, sku: "TL-001-BLK-S", inStock: true, quantity: 15 },
      { size: "M", color: { name: "Black", code: "#000000" }, sku: "TL-001-BLK-M", inStock: true, quantity: 20 },
      { size: "L", color: { name: "Black", code: "#000000" }, sku: "TL-001-BLK-L", inStock: true, quantity: 17 },
      { size: "XL", color: { name: "Black", code: "#000000" }, sku: "TL-001-BLK-XL", inStock: true, quantity: 9 },
      { size: "S", color: { name: "Beige", code: "#F5F5DC" }, sku: "TL-001-BEI-S", inStock: true, quantity: 8 },
      { size: "M", color: { name: "Beige", code: "#F5F5DC" }, sku: "TL-001-BEI-M", inStock: true, quantity: 12 },
      { size: "L", color: { name: "Beige", code: "#F5F5DC" }, sku: "TL-001-BEI-L", inStock: false, quantity: 0 },
    ]
  },
  {
    id: 2,
    name: "Tropical Breeze Viscose Shirt",
    description: "Stay cool and comfortable with this ultra-lightweight Hawaiian viscose shirt. Designed for effortless summer elegance with a fluid drape and moisture-wicking properties that keep you fresh all day. KEY FEATURES: 120 GSM eco-viscose rayon, Ultra-light and breathable, Fluid natural drape, Moisture-wicking technology, Perfect for warm weather. FABRIC DETAILS: 100% Eco Viscose Rayon, 120 GSM, Fluid drape, Moisture-wicking, Soft touch, Breathable construction, Sustainable material. FIT AND SIZING: Regular Fit, Model wearing size M is 5'10 inches, True to size - take your usual size. CARE INSTRUCTIONS: Machine wash cold (30 degrees C), Do not bleach, Low heat dry, Iron at low temperature.",
    price: 1500,
    category: "shirts",
    collection: "men",
    images: [
      "https://drive.google.com/uc?export=view&id=15VbtSrK04WkbezbDqh2wum5haAeLXNIR"
    ],
    rating: 4.7,
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: [
      { name: "Navy", code: "#001F3F" },
      { name: "Black", code: "#000000" },
      { name: "Charcoal", code: "#36454F" }
    ],
    variants: [
      { size: "XS", color: { name: "Navy", code: "#001F3F" }, sku: "TL-002-NAV-XS", inStock: true, quantity: 7 },
      { size: "S", color: { name: "Navy", code: "#001F3F" }, sku: "TL-002-NAV-S", inStock: true, quantity: 14 },
      { size: "M", color: { name: "Navy", code: "#001F3F" }, sku: "TL-002-NAV-M", inStock: true, quantity: 22 },
      { size: "L", color: { name: "Navy", code: "#001F3F" }, sku: "TL-002-NAV-L", inStock: true, quantity: 18 },
      { size: "XL", color: { name: "Navy", code: "#001F3F" }, sku: "TL-002-NAV-XL", inStock: true, quantity: 10 },
      { size: "XS", color: { name: "Black", code: "#000000" }, sku: "TL-002-BLK-XS", inStock: false, quantity: 0 },
      { size: "S", color: { name: "Black", code: "#000000" }, sku: "TL-002-BLK-S", inStock: true, quantity: 12 },
      { size: "M", color: { name: "Black", code: "#000000" }, sku: "TL-002-BLK-M", inStock: true, quantity: 19 },
      { size: "L", color: { name: "Black", code: "#000000" }, sku: "TL-002-BLK-L", inStock: true, quantity: 15 },
      { size: "XL", color: { name: "Black", code: "#000000" }, sku: "TL-002-BLK-XL", inStock: true, quantity: 8 },
      { size: "S", color: { name: "Charcoal", code: "#36454F" }, sku: "TL-002-CHA-S", inStock: true, quantity: 9 },
      { size: "M", color: { name: "Charcoal", code: "#36454F" }, sku: "TL-002-CHA-M", inStock: true, quantity: 16 },
      { size: "L", color: { name: "Charcoal", code: "#36454F" }, sku: "TL-002-CHA-L", inStock: true, quantity: 11 },
    ]
  },
  {
    id: 3,
    name: "Core Essential Cotton Tee - Crimson Red",
    description: "Crafted from premium 180 GSM organic cotton, this crimson red t-shirt delivers durability, softness, and exceptional long-lasting color for everyday wear. A timeless essential piece that never goes out of style. KEY FEATURES: 180 GSM organic cotton, Single jersey knit construction, Fade-resistant premium dye, Durable and soft feel, Perfect everyday essential. FABRIC DETAILS: 100% Organic Cotton, 180 GSM, Single Jersey Knit, Durable knit, Fade-resistant, Soft feel, Pre-shrunk fabric, Double-stitched seams. FIT AND SIZING: Regular Fit, Model wearing size M is 5'10 inches, True to size - take your usual size. CARE INSTRUCTIONS: Machine wash cold (30 degrees C), Do not bleach, Low heat dry, Iron at low temperature.",
    price: 890,
    category: "tees",
    collection: "men",
    images: [
      "https://drive.google.com/uc?export=view&id=1b499K-a75hHTuFUHy6kZna1YKBa1XUtC"
    ],
    rating: 4.6,
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    colors: [
      { name: "White", code: "#FFFFFF" },
      { name: "Navy", code: "#001F3F" },
      { name: "Charcoal", code: "#36454F" },
      { name: "Cream", code: "#FFFDD0" }
    ],
    variants: [
      { size: "XS", color: { name: "White", code: "#FFFFFF" }, sku: "TL-003-WHT-XS", inStock: true, quantity: 15 },
      { size: "S", color: { name: "White", code: "#FFFFFF" }, sku: "TL-003-WHT-S", inStock: true, quantity: 24 },
      { size: "M", color: { name: "White", code: "#FFFFFF" }, sku: "TL-003-WHT-M", inStock: true, quantity: 31 },
      { size: "L", color: { name: "White", code: "#FFFFFF" }, sku: "TL-003-WHT-L", inStock: true, quantity: 26 },
      { size: "XL", color: { name: "White", code: "#FFFFFF" }, sku: "TL-003-WHT-XL", inStock: true, quantity: 18 },
      { size: "XXL", color: { name: "White", code: "#FFFFFF" }, sku: "TL-003-WHT-XXL", inStock: true, quantity: 9 },
      { size: "S", color: { name: "Navy", code: "#001F3F" }, sku: "TL-003-NAV-S", inStock: true, quantity: 20 },
      { size: "M", color: { name: "Navy", code: "#001F3F" }, sku: "TL-003-NAV-M", inStock: true, quantity: 27 },
      { size: "L", color: { name: "Navy", code: "#001F3F" }, sku: "TL-003-NAV-L", inStock: true, quantity: 22 },
      { size: "XL", color: { name: "Navy", code: "#001F3F" }, sku: "TL-003-NAV-XL", inStock: false, quantity: 0 },
      { size: "M", color: { name: "Charcoal", code: "#36454F" }, sku: "TL-003-CHA-M", inStock: true, quantity: 19 },
      { size: "L", color: { name: "Charcoal", code: "#36454F" }, sku: "TL-003-CHA-L", inStock: true, quantity: 14 },
      { size: "S", color: { name: "Cream", code: "#FFFDD0" }, sku: "TL-003-CRM-S", inStock: true, quantity: 11 },
      { size: "M", color: { name: "Cream", code: "#FFFDD0" }, sku: "TL-003-CRM-M", inStock: true, quantity: 16 },
      { size: "L", color: { name: "Cream", code: "#FFFDD0" }, sku: "TL-003-CRM-L", inStock: true, quantity: 12 },
    ]
  },
  {
    id: 4,
    name: "Heritage Check Wool Shacket",
    description: "Premium 320 GSM wool blend shacket designed for warmth, durability, and versatile layering with a structured modern fit. The perfect balance of shirt and jacket for effortless style that transitions seamlessly from casual to refined. KEY FEATURES: 320 GSM wool blend construction, Structured modern fit, Exceptional warmth retention, Durable layering piece, Classic check pattern. FABRIC DETAILS: 70% Wool 30% Polyester, 320 GSM, Warm insulation, Durable weave, Wrinkle-resistant, Pre-shrunk fabric, Double-stitched seams. FIT AND SIZING: Regular Fit, Model wearing size M is 5'10 inches, True to size - take your usual size. CARE INSTRUCTIONS: Machine wash cold (30 degrees C), Do not bleach, Low heat dry, Iron at low temperature.",
    price: 450,
    discountPrice: 360,
    category: "outerwear",
    collection: "men",
    images: [
      "https://drive.google.com/uc?export=view&id=1Z9lQJXzn1EwBSMotxULQ8vE35PPYdP2t"
    ],
    rating: 4.5,
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    colors: [
      { name: "White", code: "#FFFFFF" },
      { name: "Black", code: "#000000" },
      { name: "Gray", code: "#808080" }
    ],
    variants: [
      { size: "XS", color: { name: "White", code: "#FFFFFF" }, sku: "TL-004-WHT-XS", inStock: true, quantity: 40 },
      { size: "S", color: { name: "White", code: "#FFFFFF" }, sku: "TL-004-WHT-S", inStock: true, quantity: 58 },
      { size: "M", color: { name: "White", code: "#FFFFFF" }, sku: "TL-004-WHT-M", inStock: true, quantity: 75 },
      { size: "L", color: { name: "White", code: "#FFFFFF" }, sku: "TL-004-WHT-L", inStock: true, quantity: 62 },
      { size: "XL", color: { name: "White", code: "#FFFFFF" }, sku: "TL-004-WHT-XL", inStock: true, quantity: 44 },
      { size: "XXL", color: { name: "White", code: "#FFFFFF" }, sku: "TL-004-WHT-XXL", inStock: true, quantity: 28 },
      { size: "XS", color: { name: "Black", code: "#000000" }, sku: "TL-004-BLK-XS", inStock: true, quantity: 35 },
      { size: "S", color: { name: "Black", code: "#000000" }, sku: "TL-004-BLK-S", inStock: true, quantity: 52 },
      { size: "M", color: { name: "Black", code: "#000000" }, sku: "TL-004-BLK-M", inStock: true, quantity: 68 },
      { size: "L", color: { name: "Black", code: "#000000" }, sku: "TL-004-BLK-L", inStock: true, quantity: 55 },
      { size: "XL", color: { name: "Black", code: "#000000" }, sku: "TL-004-BLK-XL", inStock: true, quantity: 38 },
      { size: "S", color: { name: "Gray", code: "#808080" }, sku: "TL-004-GRY-S", inStock: false, quantity: 0 },
      { size: "M", color: { name: "Gray", code: "#808080" }, sku: "TL-004-GRY-M", inStock: true, quantity: 45 },
      { size: "L", color: { name: "Gray", code: "#808080" }, sku: "TL-004-GRY-L", inStock: true, quantity: 38 },
    ]
  },
  {
    id: 5,
    name: "Signature Black Cotton Tee",
    description: "A must-have 180 GSM black cotton t-shirt with a smooth finish, durable stitching, and perfect everyday comfort. This timeless essential delivers shape retention and breathable performance for all-day wear. KEY FEATURES: 180 GSM premium cotton jersey, Smooth refined finish, Minimal versatile design, Excellent shape retention, Breathable construction. FABRIC DETAILS: 100% Cotton Jersey, 180 GSM, Shape retention, Breathable, Minimal design, Pre-shrunk fabric, Double-stitched seams. FIT AND SIZING: Regular Fit, Model wearing size M is 5'10 inches, True to size - take your usual size. CARE INSTRUCTIONS: Machine wash cold (30 degrees C), Do not bleach, Low heat dry, Iron at low temperature.",
    price: 950,
    category: "tees",
    collection: "men",
    images: [
      "https://drive.google.com/uc?export=view&id=1rUu2LKvcZcacmPB8ywYrwSjEPsseRYQc"
    ],
    rating: 4.7,
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: [
      { name: "Navy", code: "#001F3F" },
      { name: "Beige", code: "#F5F5DC" },
      { name: "Charcoal", code: "#36454F" },
      { name: "Olive", code: "#808000" }
    ],
    variants: [
      { size: "XS", color: { name: "Navy", code: "#001F3F" }, sku: "TL-005-NAV-XS", inStock: true, quantity: 9 },
      { size: "S", color: { name: "Navy", code: "#001F3F" }, sku: "TL-005-NAV-S", inStock: true, quantity: 16 },
      { size: "M", color: { name: "Navy", code: "#001F3F" }, sku: "TL-005-NAV-M", inStock: true, quantity: 24 },
      { size: "L", color: { name: "Navy", code: "#001F3F" }, sku: "TL-005-NAV-L", inStock: true, quantity: 19 },
      { size: "XL", color: { name: "Navy", code: "#001F3F" }, sku: "TL-005-NAV-XL", inStock: true, quantity: 11 },
      { size: "S", color: { name: "Beige", code: "#F5F5DC" }, sku: "TL-005-BEI-S", inStock: true, quantity: 13 },
      { size: "M", color: { name: "Beige", code: "#F5F5DC" }, sku: "TL-005-BEI-M", inStock: true, quantity: 20 },
      { size: "L", color: { name: "Beige", code: "#F5F5DC" }, sku: "TL-005-BEI-L", inStock: true, quantity: 16 },
      { size: "M", color: { name: "Charcoal", code: "#36454F" }, sku: "TL-005-CHA-M", inStock: true, quantity: 17 },
      { size: "L", color: { name: "Charcoal", code: "#36454F" }, sku: "TL-005-CHA-L", inStock: false, quantity: 0 },
      { size: "S", color: { name: "Olive", code: "#808000" }, sku: "TL-005-OLV-S", inStock: true, quantity: 8 },
      { size: "M", color: { name: "Olive", code: "#808000" }, sku: "TL-005-OLV-M", inStock: true, quantity: 14 },
      { size: "L", color: { name: "Olive", code: "#808000" }, sku: "TL-005-OLV-L", inStock: true, quantity: 11 },
    ]
  },
  {
    id: 6,
    name: "Forest Wool Blend Shirt",
    description: "Stay stylish with this 260 GSM wool blend shirt offering breathable warmth and a refined textured finish. Perfect for layering, this forest-tone piece brings sophisticated comfort to any wardrobe. KEY FEATURES: 260 GSM wool blend fabric, Soft insulation properties, Breathable warmth, Premium textured finish, Refined layering piece. FABRIC DETAILS: 65% Wool 35% Cotton, 260 GSM, Soft insulation, Breathable warmth, Premium texture, Pre-shrunk fabric, Double-stitched seams. FIT AND SIZING: Regular Fit, Model wearing size M is 5'10 inches, True to size - take your usual size. CARE INSTRUCTIONS: Machine wash cold (30 degrees C), Do not bleach, Low heat dry, Iron at low temperature.",
    price: 1250,
    category: "shirts",
    collection: "men",
    images: [
      "https://drive.google.com/uc?export=view&id=1iUNRUWfB9yTevUftNOuf1iC4E1jFXgHG"
    ],
    rating: 4.6,
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    colors: [
      { name: "Charcoal", code: "#36454F" },
      { name: "Navy", code: "#001F3F" },
      { name: "Cream", code: "#FFFDD0" }
    ],
    variants: [
      { size: "XS", color: { name: "Charcoal", code: "#36454F" }, sku: "TL-006-CHA-XS", inStock: true, quantity: 8 },
      { size: "S", color: { name: "Charcoal", code: "#36454F" }, sku: "TL-006-CHA-S", inStock: true, quantity: 14 },
      { size: "M", color: { name: "Charcoal", code: "#36454F" }, sku: "TL-006-CHA-M", inStock: true, quantity: 21 },
      { size: "L", color: { name: "Charcoal", code: "#36454F" }, sku: "TL-006-CHA-L", inStock: true, quantity: 17 },
      { size: "XL", color: { name: "Charcoal", code: "#36454F" }, sku: "TL-006-CHA-XL", inStock: true, quantity: 10 },
      { size: "XXL", color: { name: "Charcoal", code: "#36454F" }, sku: "TL-006-CHA-XXL", inStock: false, quantity: 0 },
      { size: "S", color: { name: "Navy", code: "#001F3F" }, sku: "TL-006-NAV-S", inStock: true, quantity: 12 },
      { size: "M", color: { name: "Navy", code: "#001F3F" }, sku: "TL-006-NAV-M", inStock: true, quantity: 18 },
      { size: "L", color: { name: "Navy", code: "#001F3F" }, sku: "TL-006-NAV-L", inStock: true, quantity: 14 },
      { size: "XL", color: { name: "Navy", code: "#001F3F" }, sku: "TL-006-NAV-XL", inStock: true, quantity: 9 },
      { size: "M", color: { name: "Cream", code: "#FFFDD0" }, sku: "TL-006-CRM-M", inStock: true, quantity: 10 },
      { size: "L", color: { name: "Cream", code: "#FFFDD0" }, sku: "TL-006-CRM-L", inStock: true, quantity: 8 },
    ]
  },
  {
    id: 7,
    name: "Artisan Printed Cotton Shirt",
    description: "Stylish printed shirt crafted from 130 GSM cotton, delivering exceptional comfort, breathability, and long-lasting print quality. This lightweight premium piece combines artisanal design with everyday wearability. KEY FEATURES: 130 GSM premium cotton, High-quality artisan print, Lightweight and airy, Exceptional comfort, Breathable construction. FABRIC DETAILS: 100% Cotton, 130 GSM, High-quality print, Lightweight, Airy comfort, Pre-shrunk fabric, Double-stitched seams. FIT AND SIZING: Regular Fit, Model wearing size M is 5'10 inches, True to size - take your usual size. CARE INSTRUCTIONS: Machine wash cold (30 degrees C), Do not bleach, Low heat dry, Iron at low temperature.",
    price: 1200,
    category: "shirts",
    collection: "men",
    images: [
      "https://drive.google.com/uc?export=view&id=1FYOWIROx3Xk-BLBKJj6Wx8v8sd5NAy6u"
    ],
    rating: 4.7,
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    colors: [
      { name: "White", code: "#FFFFFF" },
      { name: "Navy", code: "#001F3F" },
      { name: "Cream", code: "#FFFDD0" }
    ],
    variants: [
      { size: "XS", color: { name: "White", code: "#FFFFFF" }, sku: "TL-007-WHT-XS", inStock: true, quantity: 10 },
      { size: "S", color: { name: "White", code: "#FFFFFF" }, sku: "TL-007-WHT-S", inStock: true, quantity: 16 },
      { size: "M", color: { name: "White", code: "#FFFFFF" }, sku: "TL-007-WHT-M", inStock: true, quantity: 20 },
      { size: "L", color: { name: "White", code: "#FFFFFF" }, sku: "TL-007-WHT-L", inStock: true, quantity: 18 },
      { size: "XL", color: { name: "White", code: "#FFFFFF" }, sku: "TL-007-WHT-XL", inStock: true, quantity: 14 },
      { size: "XXL", color: { name: "White", code: "#FFFFFF" }, sku: "TL-007-WHT-XXL", inStock: true, quantity: 8 },
      { size: "S", color: { name: "Navy", code: "#001F3F" }, sku: "TL-007-NAV-S", inStock: true, quantity: 12 },
      { size: "M", color: { name: "Navy", code: "#001F3F" }, sku: "TL-007-NAV-M", inStock: true, quantity: 15 },
      { size: "L", color: { name: "Navy", code: "#001F3F" }, sku: "TL-007-NAV-L", inStock: true, quantity: 11 },
      { size: "XL", color: { name: "Navy", code: "#001F3F" }, sku: "TL-007-NAV-XL", inStock: false, quantity: 0 },
      { size: "M", color: { name: "Cream", code: "#FFFDD0" }, sku: "TL-007-CRM-M", inStock: true, quantity: 9 },
      { size: "L", color: { name: "Cream", code: "#FFFDD0" }, sku: "TL-007-CRM-L", inStock: true, quantity: 7 }
    ]
  },
  {
    id: 8,
    name: "Relaxed Drop Shoulder Tee - Noir Black",
    description: "Premium 190 GSM oversized black t-shirt with a relaxed drop shoulder design for ultimate comfort and modern style. Crafted from soft premium cotton for a contemporary look that feels effortlessly chic. KEY FEATURES: 190 GSM premium cotton, Relaxed drop shoulder silhouette, Oversized comfortable fit, Soft durable knit, Modern contemporary style. FABRIC DETAILS: 100% Cotton, 190 GSM, Oversized fit, Soft feel, Durable knit, Pre-shrunk fabric, Double-stitched seams. FIT AND SIZING: Oversized/Relaxed Fit, Model wearing size M is 5'6 inches, True to size - take your usual size. CARE INSTRUCTIONS: Machine wash cold (30 degrees C), Do not bleach, Low heat dry, Iron at low temperature.",
    price: 1450,
    discountPrice: 1160,
    category: "tees",
    collection: "women",
    images: [
      "https://drive.google.com/uc?export=view&id=1jzp_6a94RBTZ9-RwahMejdItGX3GwhqR"
    ],
    rating: 4.8,
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: [
      { name: "White", code: "#FFFFFF" },
      { name: "Navy", code: "#001F3F" },
      { name: "Cream", code: "#FFFDD0" }
    ],
    variants: [
      { size: "XS", color: { name: "White", code: "#FFFFFF" }, sku: "TL-008-WHT-XS", inStock: true, quantity: 10 },
      { size: "S", color: { name: "White", code: "#FFFFFF" }, sku: "TL-008-WHT-S", inStock: true, quantity: 14 },
      { size: "M", color: { name: "White", code: "#FFFFFF" }, sku: "TL-008-WHT-M", inStock: true, quantity: 18 },
      { size: "L", color: { name: "White", code: "#FFFFFF" }, sku: "TL-008-WHT-L", inStock: true, quantity: 15 },
      { size: "XL", color: { name: "White", code: "#FFFFFF" }, sku: "TL-008-WHT-XL", inStock: true, quantity: 9 },
      { size: "S", color: { name: "Navy", code: "#001F3F" }, sku: "TL-008-NAV-S", inStock: true, quantity: 12 },
      { size: "M", color: { name: "Navy", code: "#001F3F" }, sku: "TL-008-NAV-M", inStock: true, quantity: 16 },
      { size: "L", color: { name: "Navy", code: "#001F3F" }, sku: "TL-008-NAV-L", inStock: true, quantity: 13 },
      { size: "M", color: { name: "Cream", code: "#FFFDD0" }, sku: "TL-008-CRM-M", inStock: true, quantity: 8 },
      { size: "L", color: { name: "Cream", code: "#FFFDD0" }, sku: "TL-008-CRM-L", inStock: true, quantity: 6 }
    ]
  },
  {
    id: 9,
    name: "Essential White Cotton Tee",
    description: "Classic white tee made from 180 GSM organic cotton. Clean, breathable, and perfect for daily wear, this essential piece combines simplicity with premium quality and lasting durability. KEY FEATURES: 180 GSM organic cotton, Clean classic design, Smooth texture finish, Breathable construction, Perfect daily essential. FABRIC DETAILS: 100% Organic Cotton, 180 GSM, Smooth texture, Breathable, Long-lasting, Pre-shrunk fabric, Double-stitched seams. FIT AND SIZING: Regular Fit, Model wearing size M is 5'6 inches, True to size - take your usual size. CARE INSTRUCTIONS: Machine wash cold (30 degrees C), Do not bleach, Low heat dry, Iron at low temperature.",
    price: 1890,
    category: "tees",
    collection: "women",
    images: [
      "https://drive.google.com/uc?export=view&id=1W4x1_YGmVfzsoP9lpaBKiVA2m63U52oR"
    ],
    rating: 4.7,
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: [
      { name: "Charcoal", code: "#36454F" },
      { name: "Navy", code: "#001F3F" },
      { name: "Beige", code: "#F5F5DC" }
    ],
    variants: [
      { size: "XS", color: { name: "Charcoal", code: "#36454F" }, sku: "TL-009-CHA-XS", inStock: true, quantity: 7 },
      { size: "S", color: { name: "Charcoal", code: "#36454F" }, sku: "TL-009-CHA-S", inStock: true, quantity: 11 },
      { size: "M", color: { name: "Charcoal", code: "#36454F" }, sku: "TL-009-CHA-M", inStock: true, quantity: 13 },
      { size: "L", color: { name: "Charcoal", code: "#36454F" }, sku: "TL-009-CHA-L", inStock: true, quantity: 9 },
      { size: "XL", color: { name: "Charcoal", code: "#36454F" }, sku: "TL-009-CHA-XL", inStock: true, quantity: 5 },
      { size: "S", color: { name: "Navy", code: "#001F3F" }, sku: "TL-009-NAV-S", inStock: true, quantity: 9 },
      { size: "M", color: { name: "Navy", code: "#001F3F" }, sku: "TL-009-NAV-M", inStock: true, quantity: 11 },
      { size: "L", color: { name: "Navy", code: "#001F3F" }, sku: "TL-009-NAV-L", inStock: true, quantity: 8 },
      { size: "M", color: { name: "Beige", code: "#F5F5DC" }, sku: "TL-009-BEI-M", inStock: false, quantity: 0 },
      { size: "L", color: { name: "Beige", code: "#F5F5DC" }, sku: "TL-009-BEI-L", inStock: true, quantity: 6 }
    ]
  },
  {
    id: 10,
    name: "Pure Cotton Full Sleeve Shirt",
    description: "Elegant full sleeve shirt made from 150 GSM fine cotton, offering comfort, softness, and a polished everyday look. This versatile piece delivers sophisticated style with breathable performance and refined comfort. KEY FEATURES: 150 GSM fine cotton, Full sleeve design, Lightweight and comfortable, Smooth weave construction, Polished refined aesthetic. FABRIC DETAILS: 100% Fine Cotton, 150 GSM, Lightweight, Smooth weave, Comfortable fit, Pre-shrunk fabric, Double-stitched seams. FIT AND SIZING: Regular Fit, Model wearing size M is 5'6 inches, True to size - take your usual size. CARE INSTRUCTIONS: Machine wash cold (30 degrees C), Do not bleach, Low heat dry, Iron at low temperature.",
    price: 1290,
    category: "shirts",
    collection: "women",
    images: [
      "https://drive.google.com/uc?export=view&id=1pAK7tmREcuf9zwy9FAb18W4OMXj2g63F"
    ],
    rating: 4.6,
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: [
      { name: "Black", code: "#000000" },
      { name: "Charcoal", code: "#36454F" },
      { name: "Navy", code: "#001F3F" }
    ],
    variants: [
      { size: "XS", color: { name: "Black", code: "#000000" }, sku: "TL-010-BLK-XS", inStock: true, quantity: 6 },
      { size: "S", color: { name: "Black", code: "#000000" }, sku: "TL-010-BLK-S", inStock: true, quantity: 10 },
      { size: "M", color: { name: "Black", code: "#000000" }, sku: "TL-010-BLK-M", inStock: true, quantity: 14 },
      { size: "L", color: { name: "Black", code: "#000000" }, sku: "TL-010-BLK-L", inStock: true, quantity: 11 },
      { size: "XL", color: { name: "Black", code: "#000000" }, sku: "TL-010-BLK-XL", inStock: true, quantity: 7 },
      { size: "S", color: { name: "Charcoal", code: "#36454F" }, sku: "TL-010-CHA-S", inStock: true, quantity: 8 },
      { size: "M", color: { name: "Charcoal", code: "#36454F" }, sku: "TL-010-CHA-M", inStock: true, quantity: 12 },
      { size: "L", color: { name: "Charcoal", code: "#36454F" }, sku: "TL-010-CHA-L", inStock: false, quantity: 0 },
      { size: "M", color: { name: "Navy", code: "#001F3F" }, sku: "TL-010-NAV-M", inStock: true, quantity: 9 }
    ]
  },
  {
    id: 11,
    name: "Classic High-Rise Denim Jeans",
    description: "Premium 12 oz denim jeans with stretch comfort and long-lasting durability, designed for a flattering high-rise fit. These versatile jeans combine classic style with modern comfort technology for all-day wear. KEY FEATURES: 12 oz premium denim fabric, Stretch comfort technology, High-rise flattering fit, Durable strong weave, Long-lasting color. FABRIC DETAILS: 98% Cotton 2% Elastane, 12 oz Denim, Stretch comfort, Strong weave, Shape retention, Pre-shrunk fabric, Double-stitched seams. FIT AND SIZING: High-Rise Fit, Model wearing size M is 5'6 inches, True to size - take your usual size. CARE INSTRUCTIONS: Machine wash cold (30 degrees C), Do not bleach, Low heat dry, Iron at low temperature.",
    price: 2450,
    discountPrice: 1990,
    category: "jeans",
    collection: "women",
    images: [
      "https://drive.google.com/uc?export=view&id=1Za6WZkyRXf3boTLtcuIKTHuOgB2Fs23y"
    ],
    rating: 4.9,
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: [
      { name: "Cream", code: "#FFFDD0" },
      { name: "Gray", code: "#808080" },
      { name: "Charcoal", code: "#36454F" }
    ],
    variants: [
      { size: "XS", color: { name: "Cream", code: "#FFFDD0" }, sku: "TL-011-CRM-XS", inStock: true, quantity: 5 },
      { size: "S", color: { name: "Cream", code: "#FFFDD0" }, sku: "TL-011-CRM-S", inStock: true, quantity: 8 },
      { size: "M", color: { name: "Cream", code: "#FFFDD0" }, sku: "TL-011-CRM-M", inStock: true, quantity: 11 },
      { size: "L", color: { name: "Cream", code: "#FFFDD0" }, sku: "TL-011-CRM-L", inStock: true, quantity: 8 },
      { size: "S", color: { name: "Gray", code: "#808080" }, sku: "TL-011-GRY-S", inStock: true, quantity: 7 },
      { size: "M", color: { name: "Gray", code: "#808080" }, sku: "TL-011-GRY-M", inStock: true, quantity: 10 },
      { size: "L", color: { name: "Gray", code: "#808080" }, sku: "TL-011-GRY-L", inStock: true, quantity: 7 },
      { size: "XL", color: { name: "Gray", code: "#808080" }, sku: "TL-011-GRY-XL", inStock: false, quantity: 0 },
      { size: "M", color: { name: "Charcoal", code: "#36454F" }, sku: "TL-011-CHA-M", inStock: true, quantity: 9 }
    ]
  },
  {
    id: 12,
    name: "Heritage Full-Grain Leather Belt",
    description: "Crafted from 100% full-grain leather, this belt offers unmatched durability, strength, and timeless style. This heritage piece improves with age and is built to last a lifetime of wear and adventures. KEY FEATURES: Full-grain leather construction, Crack-resistant material, Premium finish, Timeless heritage style, Durable and long-lasting. MATERIAL DETAILS: Full-Grain Leather, 3.5mm Thickness, Crack-resistant, Long-lasting, Premium finish, Ages beautifully, Ethically sourced. CARE INSTRUCTIONS: Clean with soft damp cloth, Condition monthly with leather oil, Keep away from excessive heat, Allow to air dry naturally.",
    price: 1990,
    category: "accessories",
    collection: "accessories",
    images: [
      "https://drive.google.com/uc?export=view&id=1dMW9pzl7ypEBrW81c5qfQrG615XuA-H8"
    ],
    rating: 4.8,
    sizes: ["M"],
    colors: [
      { name: "Black", code: "#000000" },
      { name: "Charcoal", code: "#36454F" },
      { name: "Beige", code: "#F5F5DC" }
    ],
    variants: [
      { size: "M", color: { name: "Black", code: "#000000" }, sku: "TL-012-BLK-M", inStock: true, quantity: 12 },
      { size: "M", color: { name: "Charcoal", code: "#36454F" }, sku: "TL-012-CHA-M", inStock: true, quantity: 10 },
      { size: "M", color: { name: "Beige", code: "#F5F5DC" }, sku: "TL-012-BEI-M", inStock: true, quantity: 8 }
    ]
  },
  {
    id: 13,
    name: "Minimalist Gold-Tone Ring Set",
    description: "Elegant gold-tone ring set with durable plating and lightweight comfort, perfect for everyday styling. These versatile rings combine minimalist design with premium craftsmanship for timeless elegance. KEY FEATURES: Gold plated finish, Minimalist design aesthetic, Lightweight comfort, Durable plating, Tarnish-resistant coating. MATERIAL DETAILS: Alloy and Gold Plating, Tarnish-resistant, Lightweight, Skin-friendly, Durable construction, Premium polish. CARE INSTRUCTIONS: Remove before water exposure, Clean with soft dry cloth, Store in jewelry box, Avoid harsh chemicals.",
    price: 890,
    discountPrice: 710,
    category: "jewelry",
    collection: "accessories",
    images: [
      "https://drive.google.com/uc?export=view&id=1Xc3V5kkCC5V1kjpSIV8KOyRmjlUn2cSy"
    ],
    rating: 4.7,
    sizes: ["M"],
    colors: [
      { name: "Navy", code: "#001F3F" },
      { name: "Gray", code: "#808080" },
      { name: "Charcoal", code: "#36454F" },
      { name: "Cream", code: "#FFFDD0" }
    ],
    variants: [
      { size: "M", color: { name: "Navy", code: "#001F3F" }, sku: "TL-013-NAV-M", inStock: true, quantity: 15 },
      { size: "M", color: { name: "Gray", code: "#808080" }, sku: "TL-013-GRY-M", inStock: true, quantity: 14 },
      { size: "M", color: { name: "Charcoal", code: "#36454F" }, sku: "TL-013-CHA-M", inStock: true, quantity: 12 },
      { size: "M", color: { name: "Cream", code: "#FFFDD0" }, sku: "TL-013-CRM-M", inStock: true, quantity: 10 }
    ]
  },
  {
    id: 14,
    name: "Classic Structured Leather Handbag",
    description: "Elegant leather handbag crafted from high-quality genuine leather with a structured, long-lasting design. This timeless piece combines functionality with refined style, perfect for both professional and everyday use. KEY FEATURES: Genuine leather construction, Structured design aesthetic, Microfiber lining interior, Scratch-resistant surface, Durable timeless style. MATERIAL DETAILS: Genuine Leather, Microfiber Lining, Scratch-resistant, Durable build, Timeless style, High-quality craftsmanship, Professional aesthetic. CARE INSTRUCTIONS: Clean with soft damp cloth, Condition monthly with leather oil, Keep away from excessive heat, Allow to air dry naturally.",
    price: 750,
    category: "handbags",
    collection: "accessories",
    images: [
      "https://drive.google.com/uc?export=view&id=1Kn6zZsgU52Cb9jBLB0fPb_TMo6b7hwWM"
    ],
    rating: 4.6,
    sizes: ["M"],
    colors: [
      { name: "Black", code: "#000000" },
      { name: "Navy", code: "#001F3F" },
      { name: "Beige", code: "#F5F5DC" }
    ],
    variants: [
      { size: "M", color: { name: "Black", code: "#000000" }, sku: "TL-014-BLK-M", inStock: true, quantity: 18 },
      { size: "M", color: { name: "Navy", code: "#001F3F" }, sku: "TL-014-NAV-M", inStock: true, quantity: 16 },
      { size: "M", color: { name: "Beige", code: "#F5F5DC" }, sku: "TL-014-BEI-M", inStock: true, quantity: 14 }
    ]
  },
  {
    id: 15,
    name: "Elegant Jewelry Set - Earrings and Bracelet",
    description: "Stylish jewelry set crafted for comfort and shine, featuring durable materials and a premium polished finish. This elegant combination piece brings sophistication to any outfit with versatile, everyday elegance. KEY FEATURES: Protective anti-tarnish coating, Lightweight comfortable wear, Premium polished finish, Durable construction, Long-lasting shine. MATERIAL DETAILS: Alloy and Protective Coating, Anti-tarnish, Lightweight, Long-lasting shine, Skin-friendly materials, Premium polish. CARE INSTRUCTIONS: Remove before water exposure, Clean with soft dry cloth, Store in jewelry box, Avoid harsh chemicals and perfumes.",
    price: 450,
    discountPrice: 360,
    category: "jewelry",
    collection: "accessories",
    images: [
      "https://drive.google.com/uc?export=view&id=1K4yEWh-fLjq8w6M7UJ2rs05GXEtZ3gp7"
    ],
    rating: 4.9,
    sizes: ["M"],
    colors: [
      { name: "Navy", code: "#001F3F" },
      { name: "Charcoal", code: "#36454F" },
      { name: "Olive", code: "#808000" },
      { name: "Cream", code: "#FFFDD0" }
    ],
    variants: [
      { size: "M", color: { name: "Navy", code: "#001F3F" }, sku: "TL-015-NAV-M", inStock: true, quantity: 20 },
      { size: "M", color: { name: "Charcoal", code: "#36454F" }, sku: "TL-015-CHA-M", inStock: true, quantity: 18 },
      { size: "M", color: { name: "Olive", code: "#808000" }, sku: "TL-015-OLI-M", inStock: true, quantity: 16 },
      { size: "M", color: { name: "Cream", code: "#FFFDD0" }, sku: "TL-015-CRM-M", inStock: true, quantity: 14 }
    ]
  }
];

export type DetailedProduct = Product & {
  inStock: boolean;
  stockCount: number;
  reviews: Review[];
  reviewCount: number;
};

const detailedProducts: DetailedProduct[] = featuredProducts.map((product, index) => {
  const reviews = getProductReviews(product.id);
  const avgRating = calculateAverageRating(reviews);
  
  return {
    ...product,
    rating: avgRating,
    inStock: index % 3 !== 2, // Make every 3rd product out of stock for variety
    stockCount: index % 3 !== 2 ? Math.floor(Math.random() * 25) + 5 : 0,
    reviews: reviews,
    reviewCount: reviews.length
  };
});

export function getProductById(id: number): DetailedProduct | undefined {
  return detailedProducts.find((p) => p.id === id);
}



