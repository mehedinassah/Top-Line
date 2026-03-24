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
    description: "Premium dotted cotton shirt designed with refined elegance. This lightweight, breathable shirt balances comfort with sophistication, perfect for both casual and semi-formal occasions.\n\n✨ Key Features:\n• Premium 140 GSM combed cotton\n• Poplin weave construction\n• Breathable & lightweight design\n• Smooth finish with colorfast dye\n• All-day comfort fit\n\n📋 Fabric Details:\n100% Combed Cotton | 140 GSM | Poplin Weave\n✓ Breathable & lightweight\n✓ Smooth finish\n✓ Colorfast dyed\n✓ Pre-shrunk fabric\n✓ Double-stitched seams\n\n👕 Fit & Sizing:\nFit: Regular Fit\nModel wearing size M is 5'10"\nTrue to size – take your usual size\n\n🧺 Care Instructions:\nMachine wash cold (30°C)\nDo not bleach\nLow heat dry\nIron at low temperature",
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
    description: "Stay cool and comfortable with this ultra-lightweight Hawaiian viscose shirt. Designed for effortless summer elegance with a fluid drape and moisture-wicking properties that keep you fresh all day.\n\n✨ Key Features:\n• 120 GSM eco-viscose rayon\n• Ultra-light & breathable\n• Fluid, natural drape\n• Moisture-wicking technology\n• Perfect for warm weather\n\n📋 Fabric Details:\n100% Eco Viscose Rayon | 120 GSM\n✓ Fluid drape\n✓ Moisture-wicking\n✓ Soft touch\n✓ Breathable construction\n✓ Sustainable material\n\n👕 Fit & Sizing:\nFit: Regular Fit\nModel wearing size M is 5'10"\nTrue to size – take your usual size\n\n🧺 Care Instructions:\nMachine wash cold (30°C)\nDo not bleach\nLow heat dry\nIron at low temperature",
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
    name: "Core Essential Cotton Tee – Crimson Red",
    description: "Crafted from premium 180 GSM organic cotton, this crimson red t-shirt delivers durability, softness, and exceptional long-lasting color for everyday wear. A timeless essential piece that never goes out of style.\n\n✨ Key Features:\n• 180 GSM organic cotton\n• Single jersey knit construction\n• Fade-resistant premium dye\n• Durable & soft feel\n• Perfect everyday essential\n\n📋 Fabric Details:\n100% Organic Cotton | 180 GSM | Single Jersey Knit\n✓ Durable knit\n✓ Fade-resistant\n✓ Soft feel\n✓ Pre-shrunk fabric\n✓ Double-stitched seams\n\n👕 Fit & Sizing:\nFit: Regular Fit\nModel wearing size M is 5'10"\nTrue to size – take your usual size\n\n🧺 Care Instructions:\nMachine wash cold (30°C)\nDo not bleach\nLow heat dry\nIron at low temperature",
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
    description: "Premium 320 GSM wool blend shacket designed for warmth, durability, and versatile layering with a structured modern fit. The perfect balance of shirt and jacket for effortless style that transitions seamlessly from casual to refined.\n\n✨ Key Features:\n• 320 GSM wool blend construction\n• Structured modern fit\n• Exceptional warmth retention\n• Durable layering piece\n• Classic check pattern\n\n📋 Fabric Details:\n70% Wool, 30% Polyester | 320 GSM\n✓ Warm insulation\n✓ Durable weave\n✓ Wrinkle-resistant\n✓ Pre-shrunk fabric\n✓ Double-stitched seams\n\n👕 Fit & Sizing:\nFit: Regular Fit\nModel wearing size M is 5'10"\nTrue to size – take your usual size\n\n🧺 Care Instructions:\nMachine wash cold (30°C)\nDo not bleach\nLow heat dry\nIron at low temperature",
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
    description: "A must-have 180 GSM black cotton t-shirt with a smooth finish, durable stitching, and perfect everyday comfort. This timeless essential delivers shape retention and breathable performance for all-day wear.\n\n✨ Key Features:\n• 180 GSM premium cotton jersey\n• Smooth, refined finish\n• Minimal, versatile design\n• Excellent shape retention\n• Breathable construction\n\n📋 Fabric Details:\n100% Cotton Jersey | 180 GSM\n✓ Shape retention\n✓ Breathable\n✓ Minimal design\n✓ Pre-shrunk fabric\n✓ Double-stitched seams\n\n👕 Fit & Sizing:\nFit: Regular Fit\nModel wearing size M is 5'10"\nTrue to size – take your usual size\n\n🧺 Care Instructions:\nMachine wash cold (30°C)\nDo not bleach\nLow heat dry\nIron at low temperature",
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
    description: "Stay stylish with this 260 GSM wool blend shirt offering breathable warmth and a refined textured finish. Perfect for layering, this forest-tone piece brings sophisticated comfort to any wardrobe.\n\n✨ Key Features:\n• 260 GSM wool blend fabric\n• Soft insulation properties\n• Breathable warmth\n• Premium textured finish\n• Refined layering piece\n\n📋 Fabric Details:\n65% Wool, 35% Cotton | 260 GSM\n✓ Soft insulation\n✓ Breathable warmth\n✓ Premium texture\n✓ Pre-shrunk fabric\n✓ Double-stitched seams\n\n👕 Fit & Sizing:\nFit: Regular Fit\nModel wearing size M is 5'10"\nTrue to size – take your usual size\n\n🧺 Care Instructions:\nMachine wash cold (30°C)\nDo not bleach\nLow heat dry\nIron at low temperature",
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
    description: "Stylish printed shirt crafted from 130 GSM cotton, delivering exceptional comfort, breathability, and long-lasting print quality. This lightweight premium piece combines artisanal design with everyday wearability.\n\n✨ Key Features:\n• 130 GSM premium cotton\n• High-quality artisan print\n• Lightweight & airy\n• Exceptional comfort\n• Breathable construction\n\n📋 Fabric Details:\n100% Cotton | 130 GSM\n✓ High-quality print\n✓ Lightweight\n✓ Airy comfort\n✓ Pre-shrunk fabric\n✓ Double-stitched seams\n\n👕 Fit & Sizing:\nFit: Regular Fit\nModel wearing size M is 5'10"\nTrue to size – take your usual size\n\n🧺 Care Instructions:\nMachine wash cold (30°C)\nDo not bleach\nLow heat dry\nIron at low temperature",
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
    name: "Relaxed Drop Shoulder Tee – Noir Black",
    description: "Premium 190 GSM oversized black t-shirt with a relaxed drop shoulder design for ultimate comfort and modern style. Crafted from soft premium cotton for a contemporary look that feels effortlessly chic.\n\n✨ Key Features:\n• 190 GSM premium cotton\n• Relaxed drop shoulder silhouette\n• Oversized comfortable fit\n• Soft, durable knit\n• Modern contemporary style\n\n📋 Fabric Details:\n100% Cotton | 190 GSM\n✓ Oversized fit\n✓ Soft feel\n✓ Durable knit\n✓ Pre-shrunk fabric\n✓ Double-stitched seams\n\n👕 Fit & Sizing:\nFit: Oversized/Relaxed Fit\nModel wearing size M is 5'6"\nTrue to size – take your usual size\n\n🧺 Care Instructions:\nMachine wash cold (30°C)\nDo not bleach\nLow heat dry\nIron at low temperature",
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
    description: "Classic white tee made from 180 GSM organic cotton. Clean, breathable, and perfect for daily wear, this essential piece combines simplicity with premium quality and lasting durability.\n\n✨ Key Features:\n• 180 GSM organic cotton\n• Clean, classic design\n• Smooth texture finish\n• Breathable construction\n• Perfect daily essential\n\n📋 Fabric Details:\n100% Organic Cotton | 180 GSM\n✓ Smooth texture\n✓ Breathable\n✓ Long-lasting\n✓ Pre-shrunk fabric\n✓ Double-stitched seams\n\n👕 Fit & Sizing:\nFit: Regular Fit\nModel wearing size M is 5'6"\nTrue to size – take your usual size\n\n🧺 Care Instructions:\nMachine wash cold (30°C)\nDo not bleach\nLow heat dry\nIron at low temperature",
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
    description: "Elegant full sleeve shirt made from 150 GSM fine cotton, offering comfort, softness, and a polished everyday look. This versatile piece delivers sophisticated style with breathable performance and refined comfort.\n\n✨ Key Features:\n• 150 GSM fine cotton\n• Full sleeve design\n• Lightweight & comfortable\n• Smooth weave construction\n• Polished, refined aesthetic\n\n📋 Fabric Details:\n100% Fine Cotton | 150 GSM\n✓ Lightweight\n✓ Smooth weave\n✓ Comfortable fit\n✓ Pre-shrunk fabric\n✓ Double-stitched seams\n\n👕 Fit & Sizing:\nFit: Regular Fit\nModel wearing size M is 5'6"\nTrue to size – take your usual size\n\n🧺 Care Instructions:\nMachine wash cold (30°C)\nDo not bleach\nLow heat dry\nIron at low temperature",
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
    description: "Premium 12 oz denim jeans with stretch comfort and long-lasting durability, designed for a flattering high-rise fit. These versatile jeans combine classic style with modern comfort technology for all-day wear.\n\n✨ Key Features:\n• 12 oz premium denim fabric\n• Stretch comfort technology\n• High-rise flattering fit\n• Durable, strong weave\n• Long-lasting color\n\n📋 Fabric Details:\n98% Cotton, 2% Elastane | 12 oz Denim\n✓ Stretch comfort\n✓ Strong weave\n✓ Shape retention\n✓ Pre-shrunk fabric\n✓ Double-stitched seams\n\n👕 Fit & Sizing:\nFit: High-Rise Fit\nModel wearing size M is 5'6"\nTrue to size – take your usual size\n\n🧺 Care Instructions:\nMachine wash cold (30°C)\nDo not bleach\nLow heat dry\nIron at low temperature",
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
    description: "Crafted from 100% full-grain leather, this belt offers unmatched durability, strength, and timeless style. This heritage piece improves with age and is built to last a lifetime of wear and adventures.\n\n✨ Key Features:\n• Full-grain leather construction\n• Crack-resistant material\n• Premium finish\n• Timeless heritage style\n• Durable & long-lasting\n\n📋 Material Details:\nFull-Grain Leather | 3.5mm Thickness\n✓ Crack-resistant\n✓ Long-lasting\n✓ Premium finish\n✓ Ages beautifully\n✓ Ethically sourced\n\n🛠️ Care Instructions:\nClean with soft damp cloth\nCondition monthly with leather oil\nKeep away from excessive heat\nAllow to air dry naturally",
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
    description: "Elegant gold-tone ring set with durable plating and lightweight comfort, perfect for everyday styling. These versatile rings combine minimalist design with premium craftsmanship for timeless elegance.\n\n✨ Key Features:\n• Gold plated finish\n• Minimalist design aesthetic\n• Lightweight comfort\n• Durable plating\n• Tarnish-resistant coating\n\n📋 Material Details:\nAlloy + Gold Plating\n✓ Tarnish-resistant\n✓ Lightweight\n✓ Skin-friendly\n✓ Durable construction\n✓ Premium polish\n\n🛠️ Care Instructions:\nRemove before water exposure\nClean with soft dry cloth\nStore in jewelry box\nAvoid harsh chemicals",
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
    description: "Elegant leather handbag crafted from high-quality genuine leather with a structured, long-lasting design. This timeless piece combines functionality with refined style, perfect for both professional and everyday use.\n\n✨ Key Features:\n• Genuine leather construction\n• Structured design aesthetic\n• Microfiber lining interior\n• Scratch-resistant surface\n• Durable timeless style\n\n📋 Material Details:\nGenuine Leather | Microfiber Lining\n✓ Scratch-resistant\n✓ Durable build\n✓ Timeless style\n✓ High-quality craftsmanship\n✓ Professional aesthetic\n\n🛠️ Care Instructions:\nClean with soft damp cloth\nCondition monthly with leather oil\nKeep away from excessive heat\nAllow to air dry naturally",
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
    name: "Elegant Jewelry Set – Earrings & Bracelet",
    description: "Stylish jewelry set crafted for comfort and shine, featuring durable materials and a premium polished finish. This elegant combination piece brings sophistication to any outfit with versatile, everyday elegance.\n\n✨ Key Features:\n• Protective anti-tarnish coating\n• Lightweight comfortable wear\n• Premium polished finish\n• Durable construction\n• Long-lasting shine\n\n📋 Material Details:\nAlloy + Protective Coating\n✓ Anti-tarnish\n✓ Lightweight\n✓ Long-lasting shine\n✓ Skin-friendly materials\n✓ Premium polish\n\n🛠️ Care Instructions:\nRemove before water exposure\nClean with soft dry cloth\nStore in jewelry box\nAvoid harsh chemicals and perfumes",
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



