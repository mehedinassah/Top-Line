import { allReviews, calculateAverageRating } from "./reviewsData";
import type { Review } from "./reviewsData";

export const SIZES = ["XS", "S", "M", "L", "XL", "XXL", "XXXL"];

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

export interface ProductDescription {
  story: string;
  highlights: string[];
  trustSignals: string[];
  fabricBuild: {
    description: string;
    composition: string[];
  };
  fitAndSizing: {
    fit: string;
    model: string;
    sizing: string;
  };
  whyYouLoveIt: string[];
  careInstructions: string[];
}

export interface Product {
  id: number;
  name: string;
  description: ProductDescription;
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
    name: "Tropical Breeze Viscose Shirt",
    description: {
      story: "Refined elegance meets effortless summer comfort. Designed with precision, this shirt delivers a clean, polished look without compromising breathability.",
      highlights: [
        "120 GSM Eco-Viscose Rayon",
        "Ultra-Light & Breathable",
        "Fluid Natural Drape",
        "Moisture-Wicking Technology",
        "Perfect for Warm Weather"
      ],
      trustSignals: [
        "Premium Quality Materials",
        "Eco-Conscious Sourcing",
        "Durability Tested"
      ],
      fabricBuild: {
        description: "Crafted from 120 GSM eco-viscose rayon with a smooth, fluid weave offering superior breathability and moisture-wicking properties.",
        composition: [
          "100% Eco Viscose Rayon",
          "Pre-shrunk fabric",
          "Color retention tested",
          "Durable stitching"
        ]
      },
      fitAndSizing: {
        fit: "Regular Fit",
        model: "Model wearing size M is 5'10 inches",
        sizing: "True to size – take your usual size"
      },
      whyYouLoveIt: [
        "Designed for effortless elegance and everyday versatility",
        "Keeps you cool and comfortable in warm weather",
        "Maintains shape and color after multiple washes",
        "Perfect for transitioning from casual to semi-formal occasions"
      ],
      careInstructions: [
        "Machine wash cold (30°C)",
        "Wash with similar colors",
        "Do not bleach",
        "Low heat dry",
        "Iron at low temperature"
      ]
    },
    price: 2200,
    discountPrice: 1890,
    category: "shirts",
    collection: "men",
    images: [
      "https://drive.google.com/uc?export=view&id=18y3VK3nf74ypAkmBJhhe3h1JVh07gRTq"
    ],
    rating: 4.8,
    sizes: ["S", "M", "L", "XL", "XXL", "XXXL"],
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
      { size: "XXXL", color: { name: "Charcoal", code: "#36454F" }, sku: "TL-001-CHA-XXXL", inStock: true, quantity: 5 },
      { size: "S", color: { name: "Navy", code: "#001F3F" }, sku: "TL-001-NAV-S", inStock: true, quantity: 10 },
      { size: "M", color: { name: "Navy", code: "#001F3F" }, sku: "TL-001-NAV-M", inStock: true, quantity: 16 },
      { size: "L", color: { name: "Navy", code: "#001F3F" }, sku: "TL-001-NAV-L", inStock: true, quantity: 11 },
      { size: "XL", color: { name: "Navy", code: "#001F3F" }, sku: "TL-001-NAV-XL", inStock: true, quantity: 6 },
      { size: "XXXL", color: { name: "Navy", code: "#001F3F" }, sku: "TL-001-NAV-XXXL", inStock: true, quantity: 4 },
      { size: "S", color: { name: "Black", code: "#000000" }, sku: "TL-001-BLK-S", inStock: true, quantity: 15 },
      { size: "M", color: { name: "Black", code: "#000000" }, sku: "TL-001-BLK-M", inStock: true, quantity: 20 },
      { size: "L", color: { name: "Black", code: "#000000" }, sku: "TL-001-BLK-L", inStock: true, quantity: 17 },
      { size: "XL", color: { name: "Black", code: "#000000" }, sku: "TL-001-BLK-XL", inStock: true, quantity: 9 },
      { size: "XXXL", color: { name: "Black", code: "#000000" }, sku: "TL-001-BLK-XXXL", inStock: true, quantity: 5 },
      { size: "S", color: { name: "Beige", code: "#F5F5DC" }, sku: "TL-001-BEI-S", inStock: true, quantity: 8 },
      { size: "M", color: { name: "Beige", code: "#F5F5DC" }, sku: "TL-001-BEI-M", inStock: true, quantity: 12 },
      { size: "L", color: { name: "Beige", code: "#F5F5DC" }, sku: "TL-001-BEI-L", inStock: false, quantity: 0 },
      { size: "XXXL", color: { name: "Beige", code: "#F5F5DC" }, sku: "TL-001-BEI-XXXL", inStock: true, quantity: 4 },
    ]
  },
  {
    id: 2,
    name: "Dotted Luxe Cotton Shirt",
    description: {
      story: "Premium elegance meets everyday comfort. Designed with refined details, this dotted shirt balances sophistication with breathability for any occasion.",
      highlights: [
        "140 GSM Premium Combed Cotton",
        "Breathable Poplin Weave",
        "Soft-Touch Finish",
        "Colorfast Dye Technology",
        "All-Day Comfort Fit"
      ],
      trustSignals: [
        "Premium Quality Materials",
        "Eco-Conscious Sourcing",
        "Durability Tested"
      ],
      fabricBuild: {
        description: "Crafted from 140 GSM combed cotton with a smooth poplin weave, offering perfect balance of durability and lightweight comfort.",
        composition: [
          "100% Combed Cotton",
          "Pre-shrunk fabric",
          "Color retention tested",
          "Durable stitching"
        ]
      },
      fitAndSizing: {
        fit: "Regular Fit",
        model: "Model wearing size M is 5'10 inches",
        sizing: "True to size – take your usual size"
      },
      whyYouLoveIt: [
        "Refined pattern adds sophistic appeal to any outfit",
        "Comfortable enough for all-day wear",
        "Clean finish and tailored cut for modern style",
        "Versatile piece for both casual and professional settings"
      ],
      careInstructions: [
        "Machine wash cold (30°C)",
        "Wash with similar colors",
        "Do not bleach",
        "Low heat dry",
        "Iron at low temperature"
      ]
    },
    price: 1500,
    category: "shirts",
    collection: "men",
    images: [
      "https://drive.google.com/uc?export=view&id=15VbtSrK04WkbezbDqh2wum5haAeLXNIR"
    ],
    rating: 4.7,
    sizes: ["XS", "S", "M", "L", "XL", "XXL", "XXXL"],
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
      { size: "XXL", color: { name: "Navy", code: "#001F3F" }, sku: "TL-002-NAV-XXL", inStock: true, quantity: 6 },
      { size: "XXXL", color: { name: "Navy", code: "#001F3F" }, sku: "TL-002-NAV-XXXL", inStock: true, quantity: 4 },
      { size: "XS", color: { name: "Black", code: "#000000" }, sku: "TL-002-BLK-XS", inStock: false, quantity: 0 },
      { size: "S", color: { name: "Black", code: "#000000" }, sku: "TL-002-BLK-S", inStock: true, quantity: 12 },
      { size: "M", color: { name: "Black", code: "#000000" }, sku: "TL-002-BLK-M", inStock: true, quantity: 19 },
      { size: "L", color: { name: "Black", code: "#000000" }, sku: "TL-002-BLK-L", inStock: true, quantity: 15 },
      { size: "XL", color: { name: "Black", code: "#000000" }, sku: "TL-002-BLK-XL", inStock: true, quantity: 8 },
      { size: "XXL", color: { name: "Black", code: "#000000" }, sku: "TL-002-BLK-XXL", inStock: true, quantity: 5 },
      { size: "XXXL", color: { name: "Black", code: "#000000" }, sku: "TL-002-BLK-XXXL", inStock: true, quantity: 3 },
      { size: "S", color: { name: "Charcoal", code: "#36454F" }, sku: "TL-002-CHA-S", inStock: true, quantity: 9 },
      { size: "M", color: { name: "Charcoal", code: "#36454F" }, sku: "TL-002-CHA-M", inStock: true, quantity: 16 },
      { size: "L", color: { name: "Charcoal", code: "#36454F" }, sku: "TL-002-CHA-L", inStock: true, quantity: 11 },
      { size: "XXL", color: { name: "Charcoal", code: "#36454F" }, sku: "TL-002-CHA-XXL", inStock: true, quantity: 4 },
      { size: "XXXL", color: { name: "Charcoal", code: "#36454F" }, sku: "TL-002-CHA-XXXL", inStock: true, quantity: 3 },
    ]
  },
  {
    id: 3,
    name: "Core Essential Cotton Tee - Crimson Red",
    description: {
      story: "Timeless essentials deserve premium quality. This crimson tee combines durability with softness, delivering everyday comfort without compromise.",
      highlights: [
        "180 GSM Organic Cotton",
        "Single Jersey Knit",
        "Fade-Resistant Premium Dye",
        "Durable & Soft Feel",
        "Perfect Daily Essential"
      ],
      trustSignals: [
        "Premium Quality Materials",
        "Eco-Conscious Sourcing",
        "Durability Tested"
      ],
      fabricBuild: {
        description: "Made from 180 GSM organic cotton with a smooth single jersey knit, ensuring long-lasting color and exceptional comfort.",
        composition: [
          "100% Organic Cotton",
          "Pre-shrunk fabric",
          "Color retention tested",
          "Durable knit construction"
        ]
      },
      fitAndSizing: {
        fit: "Regular Fit",
        model: "Model wearing size M is 5'10 inches",
        sizing: "True to size – take your usual size"
      },
      whyYouLoveIt: [
        "Timeless design works with any wardrobe",
        "Incredibly soft and comfortable from day one",
        "Colors stay vibrant even after frequent washing",
        "The perfect essential piece for modern living"
      ],
      careInstructions: [
        "Machine wash cold (30°C)",
        "Wash with similar colors",
        "Do not bleach",
        "Low heat dry",
        "Iron at low temperature"
      ]
    },
    price: 890,
    category: "tees",
    collection: "men",
    images: [
      "https://drive.google.com/uc?export=view&id=1b499K-a75hHTuFUHy6kZna1YKBa1XUtC"
    ],
    rating: 4.6,
    sizes: ["XS", "S", "M", "L", "XL", "XXL", "XXXL"],
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
      { size: "XXXL", color: { name: "White", code: "#FFFFFF" }, sku: "TL-003-WHT-XXXL", inStock: true, quantity: 6 },
      { size: "S", color: { name: "Navy", code: "#001F3F" }, sku: "TL-003-NAV-S", inStock: true, quantity: 20 },
      { size: "M", color: { name: "Navy", code: "#001F3F" }, sku: "TL-003-NAV-M", inStock: true, quantity: 27 },
      { size: "L", color: { name: "Navy", code: "#001F3F" }, sku: "TL-003-NAV-L", inStock: true, quantity: 22 },
      { size: "XL", color: { name: "Navy", code: "#001F3F" }, sku: "TL-003-NAV-XL", inStock: false, quantity: 0 },
      { size: "XXL", color: { name: "Navy", code: "#001F3F" }, sku: "TL-003-NAV-XXL", inStock: true, quantity: 5 },
      { size: "XXXL", color: { name: "Navy", code: "#001F3F" }, sku: "TL-003-NAV-XXXL", inStock: true, quantity: 4 },
      { size: "M", color: { name: "Charcoal", code: "#36454F" }, sku: "TL-003-CHA-M", inStock: true, quantity: 19 },
      { size: "L", color: { name: "Charcoal", code: "#36454F" }, sku: "TL-003-CHA-L", inStock: true, quantity: 14 },
      { size: "XXL", color: { name: "Charcoal", code: "#36454F" }, sku: "TL-003-CHA-XXL", inStock: true, quantity: 4 },
      { size: "XXXL", color: { name: "Charcoal", code: "#36454F" }, sku: "TL-003-CHA-XXXL", inStock: true, quantity: 3 },
      { size: "S", color: { name: "Cream", code: "#FFFDD0" }, sku: "TL-003-CRM-S", inStock: true, quantity: 11 },
      { size: "M", color: { name: "Cream", code: "#FFFDD0" }, sku: "TL-003-CRM-M", inStock: true, quantity: 16 },
      { size: "L", color: { name: "Cream", code: "#FFFDD0" }, sku: "TL-003-CRM-L", inStock: true, quantity: 12 },
      { size: "XXL", color: { name: "Cream", code: "#FFFDD0" }, sku: "TL-003-CRM-XXL", inStock: true, quantity: 4 },
      { size: "XXXL", color: { name: "Cream", code: "#FFFDD0" }, sku: "TL-003-CRM-XXXL", inStock: true, quantity: 3 },
    ]
  },
  {
    id: 4,
    name: "Heritage Check Wool Shacket",
    description: {
      story: "The perfect layering piece. This wool blend shacket combines warmth, structure, and versatile style for effortless transitions from casual to refined.",
      highlights: [
        "320 GSM Wool Blend",
        "Structured Modern Fit",
        "Exceptional Warmth",
        "Wrinkle-Resistant",
        "Classic Check Pattern"
      ],
      trustSignals: [
        "Premium Quality Materials",
        "Eco-Conscious Sourcing",
        "Durability Tested"
      ],
      fabricBuild: {
        description: "Premium 320 GSM wool and polyester blend offering superior insulation and durability with a refined structured finish.",
        composition: [
          "70% Wool, 30% Polyester",
          "Pre-shrunk fabric",
          "Warm insulation properties",
          "Durable weave construction"
        ]
      },
      fitAndSizing: {
        fit: "Regular Fit",
        model: "Model wearing size M is 5'10 inches",
        sizing: "True to size – take your usual size"
      },
      whyYouLoveIt: [
        "The perfect layering piece for transitional seasons",
        "Keeps you warm without feeling heavy or restrictive",
        "Maintains structure and shape after multiple washes",
        "Effortlessly stylish for both casual and refined occasions"
      ],
      careInstructions: [
        "Machine wash cold (30°C)",
        "Wash with similar colors",
        "Do not bleach",
        "Low heat dry",
        "Iron at low temperature"
      ]
    },
    price: 450,
    discountPrice: 360,
    category: "outerwear",
    collection: "men",
    images: [
      "https://drive.google.com/uc?export=view&id=1Z9lQJXzn1EwBSMotxULQ8vE35PPYdP2t"
    ],
    rating: 4.5,
    sizes: ["XS", "S", "M", "L", "XL", "XXL", "XXXL"],
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
      { size: "XXXL", color: { name: "White", code: "#FFFFFF" }, sku: "TL-004-WHT-XXXL", inStock: true, quantity: 18 },
      { size: "XS", color: { name: "Black", code: "#000000" }, sku: "TL-004-BLK-XS", inStock: true, quantity: 35 },
      { size: "S", color: { name: "Black", code: "#000000" }, sku: "TL-004-BLK-S", inStock: true, quantity: 52 },
      { size: "M", color: { name: "Black", code: "#000000" }, sku: "TL-004-BLK-M", inStock: true, quantity: 68 },
      { size: "L", color: { name: "Black", code: "#000000" }, sku: "TL-004-BLK-L", inStock: true, quantity: 55 },
      { size: "XL", color: { name: "Black", code: "#000000" }, sku: "TL-004-BLK-XL", inStock: true, quantity: 38 },
      { size: "XXXL", color: { name: "Black", code: "#000000" }, sku: "TL-004-BLK-XXXL", inStock: true, quantity: 15 },
      { size: "S", color: { name: "Gray", code: "#808080" }, sku: "TL-004-GRY-S", inStock: false, quantity: 0 },
      { size: "M", color: { name: "Gray", code: "#808080" }, sku: "TL-004-GRY-M", inStock: true, quantity: 45 },
      { size: "L", color: { name: "Gray", code: "#808080" }, sku: "TL-004-GRY-L", inStock: true, quantity: 38 },
      { size: "XXL", color: { name: "Gray", code: "#808080" }, sku: "TL-004-GRY-XXL", inStock: true, quantity: 12 },
      { size: "XXXL", color: { name: "Gray", code: "#808080" }, sku: "TL-004-GRY-XXXL", inStock: true, quantity: 8 },
    ]
  },
  {
    id: 5,
    name: "Signature Black Cotton Tee",
    description: {
      story: "The wardrobe essential that never disappoints. Premium black cotton tee designed for perfect shape retention and all-day breathability.",
      highlights: [
        "180 GSM Premium Cotton",
        "Smooth Refined Finish",
        "Excellent Shape Retention",
        "Minimal Versatile Design",
        "Breathable Construction"
      ],
      trustSignals: [
        "Premium Quality Materials",
        "Eco-Conscious Sourcing",
        "Durability Tested"
      ],
      fabricBuild: {
        description: "180 GSM cotton jersey with exceptional durability and softness, designed to maintain shape through countless washes.",
        composition: [
          "100% Cotton Jersey",
          "Pre-shrunk fabric",
          "Color retention tested",
          "Durable knit construction"
        ]
      },
      fitAndSizing: {
        fit: "Regular Fit",
        model: "Model wearing size M is 5'10 inches",
        sizing: "True to size – take your usual size"
      },
      whyYouLoveIt: [
        "So versatile it works with everything in your closet",
        "Incredibly soft against your skin from day one",
        "Perfect shape retention wash after wash",
        "Timeless piece you'll wear for years to come"
      ],
      careInstructions: [
        "Machine wash cold (30°C)",
        "Wash with similar colors",
        "Do not bleach",
        "Low heat dry",
        "Iron at low temperature"
      ]
    },
    price: 950,
    category: "tees",
    collection: "men",
    images: [
      "https://drive.google.com/uc?export=view&id=1rUu2LKvcZcacmPB8ywYrwSjEPsseRYQc"
    ],
    rating: 4.7,
    sizes: ["XS", "S", "M", "L", "XL", "XXL", "XXXL"],
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
      { size: "XXL", color: { name: "Navy", code: "#001F3F" }, sku: "TL-005-NAV-XXL", inStock: true, quantity: 6 },
      { size: "XXXL", color: { name: "Navy", code: "#001F3F" }, sku: "TL-005-NAV-XXXL", inStock: true, quantity: 4 },
      { size: "S", color: { name: "Beige", code: "#F5F5DC" }, sku: "TL-005-BEI-S", inStock: true, quantity: 13 },
      { size: "M", color: { name: "Beige", code: "#F5F5DC" }, sku: "TL-005-BEI-M", inStock: true, quantity: 20 },
      { size: "L", color: { name: "Beige", code: "#F5F5DC" }, sku: "TL-005-BEI-L", inStock: true, quantity: 16 },
      { size: "XXL", color: { name: "Beige", code: "#F5F5DC" }, sku: "TL-005-BEI-XXL", inStock: true, quantity: 5 },
      { size: "XXXL", color: { name: "Beige", code: "#F5F5DC" }, sku: "TL-005-BEI-XXXL", inStock: true, quantity: 3 },
      { size: "M", color: { name: "Charcoal", code: "#36454F" }, sku: "TL-005-CHA-M", inStock: true, quantity: 17 },
      { size: "L", color: { name: "Charcoal", code: "#36454F" }, sku: "TL-005-CHA-L", inStock: false, quantity: 0 },
      { size: "XXL", color: { name: "Charcoal", code: "#36454F" }, sku: "TL-005-CHA-XXL", inStock: true, quantity: 5 },
      { size: "XXXL", color: { name: "Charcoal", code: "#36454F" }, sku: "TL-005-CHA-XXXL", inStock: true, quantity: 3 },
      { size: "S", color: { name: "Olive", code: "#808000" }, sku: "TL-005-OLV-S", inStock: true, quantity: 8 },
      { size: "M", color: { name: "Olive", code: "#808000" }, sku: "TL-005-OLV-M", inStock: true, quantity: 14 },
      { size: "L", color: { name: "Olive", code: "#808000" }, sku: "TL-005-OLV-L", inStock: true, quantity: 11 },
      { size: "XXL", color: { name: "Olive", code: "#808000" }, sku: "TL-005-OLV-XXL", inStock: true, quantity: 4 },
      { size: "XXXL", color: { name: "Olive", code: "#808000" }, sku: "TL-005-OLV-XXXL", inStock: true, quantity: 3 },
    ]
  },
  {
    id: 6,
    name: "Forest Wool Blend Shirt",
    description: {
      story: "Sophisticated comfort redefined. This wool blend shirt provides soft insulation with breathable warmth, perfect for layering with refined style.",
      highlights: [
        "260 GSM Wool Blend",
        "Soft Insulation Properties",
        "Breathable Warmth",
        "Premium Textured Finish",
        "Refined Layering Piece"
      ],
      trustSignals: [
        "Premium Quality Materials",
        "Eco-Conscious Sourcing",
        "Durability Tested"
      ],
      fabricBuild: {
        description: "Premium 260 GSM blend of wool and cotton offering soft insulation with breathable comfort and refined texture.",
        composition: [
          "65% Wool, 35% Cotton",
          "Pre-shrunk fabric",
          "Soft insulation properties",
          "Premium durable weave"
        ]
      },
      fitAndSizing: {
        fit: "Regular Fit",
        model: "Model wearing size M is 5'10 inches",
        sizing: "True to size – take your usual size"
      },
      whyYouLoveIt: [
        "The perfect addition to your layering collection",
        "Warm without being heavy or restrictive",
        "Rich color adds sophistication to any outfit",
        "Versatile enough for casual and professional settings"
      ],
      careInstructions: [
        "Machine wash cold (30°C)",
        "Wash with similar colors",
        "Do not bleach",
        "Low heat dry",
        "Iron at low temperature"
      ]
    },
    price: 1250,
    category: "shirts",
    collection: "men",
    images: [
      "https://drive.google.com/uc?export=view&id=1iUNRUWfB9yTevUftNOuf1iC4E1jFXgHG"
    ],
    rating: 4.6,
    sizes: ["XS", "S", "M", "L", "XL", "XXL", "XXXL"],
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
      { size: "XXXL", color: { name: "Charcoal", code: "#36454F" }, sku: "TL-006-CHA-XXXL", inStock: true, quantity: 5 },
      { size: "S", color: { name: "Navy", code: "#001F3F" }, sku: "TL-006-NAV-S", inStock: true, quantity: 12 },
      { size: "M", color: { name: "Navy", code: "#001F3F" }, sku: "TL-006-NAV-M", inStock: true, quantity: 18 },
      { size: "L", color: { name: "Navy", code: "#001F3F" }, sku: "TL-006-NAV-L", inStock: true, quantity: 14 },
      { size: "XL", color: { name: "Navy", code: "#001F3F" }, sku: "TL-006-NAV-XL", inStock: true, quantity: 9 },
      { size: "XXL", color: { name: "Navy", code: "#001F3F" }, sku: "TL-006-NAV-XXL", inStock: true, quantity: 5 },
      { size: "XXXL", color: { name: "Navy", code: "#001F3F" }, sku: "TL-006-NAV-XXXL", inStock: true, quantity: 4 },
      { size: "M", color: { name: "Cream", code: "#FFFDD0" }, sku: "TL-006-CRM-M", inStock: true, quantity: 10 },
      { size: "L", color: { name: "Cream", code: "#FFFDD0" }, sku: "TL-006-CRM-L", inStock: true, quantity: 8 },
      { size: "XXL", color: { name: "Cream", code: "#FFFDD0" }, sku: "TL-006-CRM-XXL", inStock: true, quantity: 3 },
      { size: "XXXL", color: { name: "Cream", code: "#FFFDD0" }, sku: "TL-006-CRM-XXXL", inStock: true, quantity: 2 },
    ]
  },
  {
    id: 7,
    name: "Artisan Printed Cotton Shirt",
    description: {
      story: "Artisan craftsmanship meets everyday wearability. This printed shirt combines exceptional comfort with premium print quality that lasts.",
      highlights: [
        "130 GSM Premium Cotton",
        "High-Quality Artisan Print",
        "Lightweight & Airy",
        "Exceptional Comfort",
        "Breathable Construction"
      ],
      trustSignals: [
        "Premium Quality Materials",
        "Eco-Conscious Sourcing",
        "Durability Tested"
      ],
      fabricBuild: {
        description: "130 GSM premium cotton with artisan print quality, delivering lightweight comfort with lasting color vibrancy.",
        composition: [
          "100% Premium Cotton",
          "Pre-shrunk fabric",
          "High-quality print retention",
          "Durable lightweight weave"
        ]
      },
      fitAndSizing: {
        fit: "Regular Fit",
        model: "Model wearing size M is 5'10 inches",
        sizing: "True to size – take your usual size"
      },
      whyYouLoveIt: [
        "Unique artisan print makes you stand out",
        "Breathable and comfortable for any season",
        "Print stays vibrant through multiple washes",
        "Perfect statement piece for casual or dressed-up looks"
      ],
      careInstructions: [
        "Machine wash cold (30°C)",
        "Wash with similar colors",
        "Do not bleach",
        "Low heat dry",
        "Iron at low temperature"
      ]
    },
    price: 1200,
    category: "shirts",
    collection: "men",
    images: [
      "https://drive.google.com/uc?export=view&id=1FYOWIROx3Xk-BLBKJj6Wx8v8sd5NAy6u"
    ],
    rating: 4.7,
    sizes: ["XS", "S", "M", "L", "XL", "XXL", "XXXL"],
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
      { size: "XXXL", color: { name: "White", code: "#FFFFFF" }, sku: "TL-007-WHT-XXXL", inStock: true, quantity: 5 },
      { size: "S", color: { name: "Navy", code: "#001F3F" }, sku: "TL-007-NAV-S", inStock: true, quantity: 12 },
      { size: "M", color: { name: "Navy", code: "#001F3F" }, sku: "TL-007-NAV-M", inStock: true, quantity: 15 },
      { size: "L", color: { name: "Navy", code: "#001F3F" }, sku: "TL-007-NAV-L", inStock: true, quantity: 11 },
      { size: "XL", color: { name: "Navy", code: "#001F3F" }, sku: "TL-007-NAV-XL", inStock: false, quantity: 0 },
      { size: "XXL", color: { name: "Navy", code: "#001F3F" }, sku: "TL-007-NAV-XXL", inStock: true, quantity: 4 },
      { size: "XXXL", color: { name: "Navy", code: "#001F3F" }, sku: "TL-007-NAV-XXXL", inStock: true, quantity: 3 },
      { size: "M", color: { name: "Cream", code: "#FFFDD0" }, sku: "TL-007-CRM-M", inStock: true, quantity: 9 },
      { size: "L", color: { name: "Cream", code: "#FFFDD0" }, sku: "TL-007-CRM-L", inStock: true, quantity: 7 },
      { size: "XXL", color: { name: "Cream", code: "#FFFDD0" }, sku: "TL-007-CRM-XXL", inStock: true, quantity: 3 },
      { size: "XXXL", color: { name: "Cream", code: "#FFFDD0" }, sku: "TL-007-CRM-XXXL", inStock: true, quantity: 2 },
    ]
  },
  {
    id: 8,
    name: "Relaxed Drop Shoulder Tee - Noir Black",
    description: {
      story: "Contemporary comfort redefined. This oversized tee with relaxed drop shoulders delivers effortless modern style with premium softness.",
      highlights: [
        "190 GSM Premium Cotton",
        "Relaxed Drop Shoulder",
        "Oversized Comfortable Fit",
        "Soft Durable Knit",
        "Modern Contemporary Style"
      ],
      trustSignals: [
        "Premium Quality Materials",
        "Eco-Conscious Sourcing",
        "Durability Tested"
      ],
      fabricBuild: {
        description: "190 GSM premium cotton knit with relaxed construction, offering superior softness and durability for all-day wear.",
        composition: [
          "100% Premium Cotton",
          "Pre-shrunk fabric",
          "Color retention tested",
          "Durable knit construction"
        ]
      },
      fitAndSizing: {
        fit: "Oversized/Relaxed Fit",
        model: "Model wearing size M is 5'6 inches",
        sizing: "True to size – take your usual size"
      },
      whyYouLoveIt: [
        "So comfortable you'll want to wear it every day",
        "Modern silhouette flatters all body types",
        "Perfect for layering or wearing solo",
        "Effortlessly cool and contemporary style"
      ],
      careInstructions: [
        "Machine wash cold (30°C)",
        "Wash with similar colors",
        "Do not bleach",
        "Low heat dry",
        "Iron at low temperature"
      ]
    },
    price: 1450,
    discountPrice: 1160,
    category: "tees",
    collection: "women",
    images: [
      "https://drive.google.com/uc?export=view&id=1jzp_6a94RBTZ9-RwahMejdItGX3GwhqR"
    ],
    rating: 4.8,
    sizes: ["XS", "S", "M", "L", "XL", "XXL", "XXXL"],
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
      { size: "XXL", color: { name: "White", code: "#FFFFFF" }, sku: "TL-008-WHT-XXL", inStock: true, quantity: 6 },
      { size: "XXXL", color: { name: "White", code: "#FFFFFF" }, sku: "TL-008-WHT-XXXL", inStock: true, quantity: 4 },
      { size: "S", color: { name: "Navy", code: "#001F3F" }, sku: "TL-008-NAV-S", inStock: true, quantity: 12 },
      { size: "M", color: { name: "Navy", code: "#001F3F" }, sku: "TL-008-NAV-M", inStock: true, quantity: 16 },
      { size: "L", color: { name: "Navy", code: "#001F3F" }, sku: "TL-008-NAV-L", inStock: true, quantity: 13 },
      { size: "XXL", color: { name: "Navy", code: "#001F3F" }, sku: "TL-008-NAV-XXL", inStock: true, quantity: 5 },
      { size: "XXXL", color: { name: "Navy", code: "#001F3F" }, sku: "TL-008-NAV-XXXL", inStock: true, quantity: 3 },
      { size: "M", color: { name: "Cream", code: "#FFFDD0" }, sku: "TL-008-CRM-M", inStock: true, quantity: 8 },
      { size: "L", color: { name: "Cream", code: "#FFFDD0" }, sku: "TL-008-CRM-L", inStock: true, quantity: 6 },
      { size: "XXL", color: { name: "Cream", code: "#FFFDD0" }, sku: "TL-008-CRM-XXL", inStock: true, quantity: 3 },
      { size: "XXXL", color: { name: "Cream", code: "#FFFDD0" }, sku: "TL-008-CRM-XXXL", inStock: true, quantity: 2 },
    ]
  },
  {
    id: 9,
    name: "Essential White Cotton Tee",
    description: {
      story: "The foundation of every wardrobe. Clean white cotton tee crafted from organic material for timeless everyday simplicity and quality.",
      highlights: [
        "180 GSM Organic Cotton",
        "Clean Classic Design",
        "Smooth Texture Finish",
        "Breathable Construction",
        "Perfect Daily Essential"
      ],
      trustSignals: [
        "Premium Quality Materials",
        "Eco-Conscious Sourcing",
        "Durability Tested"
      ],
      fabricBuild: {
        description: "180 GSM organic cotton with smooth texture finish, delivering breathability and durability for everyday wear.",
        composition: [
          "100% Organic Cotton",
          "Pre-shrunk fabric",
          "Color retention tested",
          "Durable knit construction"
        ]
      },
      fitAndSizing: {
        fit: "Regular Fit",
        model: "Model wearing size M is 5'6 inches",
        sizing: "True to size – take your usual size"
      },
      whyYouLoveIt: [
        "The perfect white tee every wardrobe needs",
        "Premium softness that improves with every wash",
        "Clean design pairs seamlessly with everything",
        "Timeless piece you'll reach for again and again"
      ],
      careInstructions: [
        "Machine wash cold (30°C)",
        "Wash with similar colors",
        "Do not bleach",
        "Low heat dry",
        "Iron at low temperature"
      ]
    },
    price: 1890,
    category: "tees",
    collection: "women",
    images: [
      "https://drive.google.com/uc?export=view&id=1W4x1_YGmVfzsoP9lpaBKiVA2m63U52oR"
    ],
    rating: 4.7,
    sizes: ["XS", "S", "M", "L", "XL", "XXL", "XXXL"],
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
      { size: "XXL", color: { name: "Charcoal", code: "#36454F" }, sku: "TL-009-CHA-XXL", inStock: true, quantity: 3 },
      { size: "XXXL", color: { name: "Charcoal", code: "#36454F" }, sku: "TL-009-CHA-XXXL", inStock: true, quantity: 2 },
      { size: "S", color: { name: "Navy", code: "#001F3F" }, sku: "TL-009-NAV-S", inStock: true, quantity: 9 },
      { size: "M", color: { name: "Navy", code: "#001F3F" }, sku: "TL-009-NAV-M", inStock: true, quantity: 11 },
      { size: "L", color: { name: "Navy", code: "#001F3F" }, sku: "TL-009-NAV-L", inStock: true, quantity: 8 },
      { size: "XXL", color: { name: "Navy", code: "#001F3F" }, sku: "TL-009-NAV-XXL", inStock: true, quantity: 3 },
      { size: "XXXL", color: { name: "Navy", code: "#001F3F" }, sku: "TL-009-NAV-XXXL", inStock: true, quantity: 2 },
      { size: "M", color: { name: "Beige", code: "#F5F5DC" }, sku: "TL-009-BEI-M", inStock: false, quantity: 0 },
      { size: "L", color: { name: "Beige", code: "#F5F5DC" }, sku: "TL-009-BEI-L", inStock: true, quantity: 6 },
      { size: "XXL", color: { name: "Beige", code: "#F5F5DC" }, sku: "TL-009-BEI-XXL", inStock: true, quantity: 2 },
      { size: "XXXL", color: { name: "Beige", code: "#F5F5DC" }, sku: "TL-009-BEI-XXXL", inStock: true, quantity: 2 },
    ]
  },
  {
    id: 10,
    name: "Pure Cotton Full Sleeve Shirt",
    description: {
      story: "Polished sophistication for everyday elegance. Fine cotton full sleeve shirt designed for professional comfort and refined personal style.",
      highlights: [
        "150 GSM Fine Cotton",
        "Full Sleeve Design",
        "Lightweight & Comfortable",
        "Smooth Weave Construction",
        "Polished Refined Look"
      ],
      trustSignals: [
        "Premium Quality Materials",
        "Eco-Conscious Sourcing",
        "Durability Tested"
      ],
      fabricBuild: {
        description: "150 GSM fine cotton with smooth weave construction offering lightweight comfort with a sophisticated finish.",
        composition: [
          "100% Fine Cotton",
          "Pre-shrunk fabric",
          "Color retention tested",
          "Durable smooth weave"
        ]
      },
      fitAndSizing: {
        fit: "Regular Fit",
        model: "Model wearing size M is 5'6 inches",
        sizing: "True to size – take your usual size"
      },
      whyYouLoveIt: [
        "Professional enough for the office",
        "Sophisticated enough for evening events",
        "Lightweight yet structured for all-day comfort",
        "Versatile piece that elevates any wardrobe"
      ],
      careInstructions: [
        "Machine wash cold (30°C)",
        "Wash with similar colors",
        "Do not bleach",
        "Low heat dry",
        "Iron at low temperature"
      ]
    },
    price: 1290,
    category: "shirts",
    collection: "women",
    images: [
      "https://drive.google.com/uc?export=view&id=1pAK7tmREcuf9zwy9FAb18W4OMXj2g63F"
    ],
    rating: 4.6,
    sizes: ["XS", "S", "M", "L", "XL", "XXL", "XXXL"],
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
      { size: "XXL", color: { name: "Black", code: "#000000" }, sku: "TL-010-BLK-XXL", inStock: true, quantity: 5 },
      { size: "XXXL", color: { name: "Black", code: "#000000" }, sku: "TL-010-BLK-XXXL", inStock: true, quantity: 3 },
      { size: "S", color: { name: "Charcoal", code: "#36454F" }, sku: "TL-010-CHA-S", inStock: true, quantity: 8 },
      { size: "M", color: { name: "Charcoal", code: "#36454F" }, sku: "TL-010-CHA-M", inStock: true, quantity: 12 },
      { size: "L", color: { name: "Charcoal", code: "#36454F" }, sku: "TL-010-CHA-L", inStock: false, quantity: 0 },
      { size: "XXL", color: { name: "Charcoal", code: "#36454F" }, sku: "TL-010-CHA-XXL", inStock: true, quantity: 4 },
      { size: "XXXL", color: { name: "Charcoal", code: "#36454F" }, sku: "TL-010-CHA-XXXL", inStock: true, quantity: 3 },
      { size: "M", color: { name: "Navy", code: "#001F3F" }, sku: "TL-010-NAV-M", inStock: true, quantity: 9 },
      { size: "XXL", color: { name: "Navy", code: "#001F3F" }, sku: "TL-010-NAV-XXL", inStock: true, quantity: 4 },
      { size: "XXXL", color: { name: "Navy", code: "#001F3F" }, sku: "TL-010-NAV-XXXL", inStock: true, quantity: 3 },
    ]
  },
  {
    id: 11,
    name: "Classic High-Rise Denim Jeans",
    description: {
      story: "Timeless denim perfected. High-rise jeans crafted with stretch comfort and premium durability for flattering, all-day wearability.",
      highlights: [
        "12 oz Premium Denim",
        "Stretch Comfort Technology",
        "High-Rise Flattering Fit",
        "Durable Strong Weave",
        "Long-Lasting Color"
      ],
      trustSignals: [
        "Premium Quality Materials",
        "Eco-Conscious Sourcing",
        "Durability Tested"
      ],
      fabricBuild: {
        description: "12 oz premium denim with 2% elastane providing comfortable stretch while maintaining shape and durability.",
        composition: [
          "98% Cotton, 2% Elastane",
          "Pre-shrunk fabric",
          "Stretch comfort technology",
          "Strong durable weave"
        ]
      },
      fitAndSizing: {
        fit: "High-Rise Fit",
        model: "Model wearing size M is 5'6 inches",
        sizing: "True to size – take your usual size"
      },
      whyYouLoveIt: [
        "Flattering high-rise cut that enhances your silhouette",
        "Stretch fabric keeps you comfortable all day",
        "Premium denim quality that lasts for years",
        "Timeless style works with any outfit"
      ],
      careInstructions: [
        "Machine wash cold (30°C)",
        "Wash with similar colors",
        "Turn inside out to preserve color",
        "Air dry or low heat dry",
        "Avoid bleach"
      ]
    },
    price: 2450,
    discountPrice: 1990,
    category: "jeans",
    collection: "women",
    images: [
      "https://drive.google.com/uc?export=view&id=1Za6WZkyRXf3boTLtcuIKTHuOgB2Fs23y"
    ],
    rating: 4.9,
    sizes: ["XS", "S", "M", "L", "XL", "XXL", "XXXL"],
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
      { size: "XXL", color: { name: "Cream", code: "#FFFDD0" }, sku: "TL-011-CRM-XXL", inStock: true, quantity: 4 },
      { size: "XXXL", color: { name: "Cream", code: "#FFFDD0" }, sku: "TL-011-CRM-XXXL", inStock: true, quantity: 3 },
      { size: "S", color: { name: "Gray", code: "#808080" }, sku: "TL-011-GRY-S", inStock: true, quantity: 7 },
      { size: "M", color: { name: "Gray", code: "#808080" }, sku: "TL-011-GRY-M", inStock: true, quantity: 10 },
      { size: "L", color: { name: "Gray", code: "#808080" }, sku: "TL-011-GRY-L", inStock: true, quantity: 7 },
      { size: "XL", color: { name: "Gray", code: "#808080" }, sku: "TL-011-GRY-XL", inStock: false, quantity: 0 },
      { size: "XXL", color: { name: "Gray", code: "#808080" }, sku: "TL-011-GRY-XXL", inStock: true, quantity: 4 },
      { size: "XXXL", color: { name: "Gray", code: "#808080" }, sku: "TL-011-GRY-XXXL", inStock: true, quantity: 3 },
      { size: "M", color: { name: "Charcoal", code: "#36454F" }, sku: "TL-011-CHA-M", inStock: true, quantity: 9 },
      { size: "XXL", color: { name: "Charcoal", code: "#36454F" }, sku: "TL-011-CHA-XXL", inStock: true, quantity: 4 },
      { size: "XXXL", color: { name: "Charcoal", code: "#36454F" }, sku: "TL-011-CHA-XXXL", inStock: true, quantity: 3 },
    ]
  },
  {
    id: 12,
    name: "Heritage Full-Grain Leather Belt",
    description: {
      story: "Timeless quality that ages beautifully. Full-grain leather belt crafted to last a lifetime, improving with every wear.",
      highlights: [
        "100% Full-Grain Leather",
        "Crack-Resistant Material",
        "Premium Finish",
        "Timeless Heritage Style",
        "Lifetime Durability"
      ],
      trustSignals: [
        "Premium Quality Materials",
        "Ethically Sourced",
        "Lifetime Durability"
      ],
      fabricBuild: {
        description: "Premium full-grain leather with 3.5mm thickness, sourced ethically and finished with premium polish for lasting quality.",
        composition: [
          "Full-Grain Leather",
          "3.5mm Thickness",
          "Ethically sourced",
          "Premium finish"
        ]
      },
      fitAndSizing: {
        fit: "One Size",
        model: "Adjustable sizing",
        sizing: "Fits waist sizes XS to XXL"
      },
      whyYouLoveIt: [
        "Gets better looking with age",
        "Lasts a lifetime with proper care",
        "Timeless style never goes out of fashion",
        "Perfect investment piece for any wardrobe"
      ],
      careInstructions: [
        "Clean with soft damp cloth",
        "Condition monthly with leather oil",
        "Keep away from excessive heat",
        "Allow to air dry naturally",
        "Store in dry location"
      ]
    },
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
    description: {
      story: "Elegant simplicity perfected. Gold-tone ring set combining minimalist design with premium craftsmanship for everyday elegance.",
      highlights: [
        "Gold Plated Finish",
        "Minimalist Design",
        "Lightweight Comfort",
        "Durable Plating",
        "Tarnish-Resistant"
      ],
      trustSignals: [
        "Premium Quality Materials",
        "Tarnish-Resistant",
        "Durable Plating"
      ],
      fabricBuild: {
        description: "Alloy base with durable gold plating and tarnish-resistant coating, offering lightweight comfort with premium finish.",
        composition: [
          "Alloy + Gold Plating",
          "Tarnish-resistant coating",
          "Lightweight construction",
          "Skin-friendly materials"
        ]
      },
      fitAndSizing: {
        fit: "One Size",
        model: "Universal sizing",
        sizing: "Adjustable for comfortable fit"
      },
      whyYouLoveIt: [
        "Mix and match rings for different looks",
        "Lightweight so you barely notice wearing them",
        "Elegant design that works with any style",
        "Perfect everyday luxury at an accessible price"
      ],
      careInstructions: [
        "Remove before water exposure",
        "Clean with soft dry cloth",
        "Store in jewelry box",
        "Avoid harsh chemicals",
        "Keep away from perfumes"
      ]
    },
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
    description: {
      story: "Timeless elegance meets everyday functionality. Structured leather handbag designed for professional and casual versatility.",
      highlights: [
        "Genuine Leather",
        "Structured Design",
        "Microfiber Lining",
        "Scratch-Resistant",
        "Durable & Timeless"
      ],
      trustSignals: [
        "Genuine Leather",
        "Scratch-Resistant",
        "Lifetime Value"
      ],
      fabricBuild: {
        description: "Premium genuine leather with microfiber lining, engineered for durability and scratch resistance while maintaining sophistication.",
        composition: [
          "Genuine Leather",
          "Microfiber Interior Lining",
          "Scratch-resistant surface",
          "High-quality hardware"
        ]
      },
      fitAndSizing: {
        fit: "Standard Size",
        model: "Professional carry capacity",
        sizing: "Spacious interior compartments"
      },
      whyYouLoveIt: [
        "Spacious enough for work and everyday essentials",
        "Professional design suits any occasion",
        "Genuine leather improves with age",
        "Perfect investment piece for work and travel"
      ],
      careInstructions: [
        "Clean with soft damp cloth",
        "Condition monthly with leather oil",
        "Keep away from excessive heat",
        "Allow to air dry naturally",
        "Store in dust bag when not in use"
      ]
    },
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
    description: {
      story: "Complete sophistication. Jewelry set combining premium craftsmanship with versatile styling for everyday elegance.",
      highlights: [
        "Anti-Tarnish Coating",
        "Lightweight Design",
        "Premium Polished Finish",
        "Durable Construction",
        "Long-Lasting Shine"
      ],
      trustSignals: [
        "Premium Quality Materials",
        "Anti-Tarnish Coating",
        "Durable Construction"
      ],
      fabricBuild: {
        description: "Alloy with protective anti-tarnish coating, engineered for durability, lightweight comfort, and premium polish finish.",
        composition: [
          "Alloy + Protective Coating",
          "Anti-tarnish technology",
          "Lightweight materials",
          "Premium polish finish"
        ]
      },
      fitAndSizing: {
        fit: "One Size",
        model: "Universal sizing",
        sizing: "Adjustable for comfortable wear"
      },
      whyYouLoveIt: [
        "Complete look with one coordinated set",
        "Mix and match with other pieces you own",
        "Elegant enough for special occasions",
        "Lightweight and comfortable for everyday wear"
      ],
      careInstructions: [
        "Remove before water exposure",
        "Clean with soft dry cloth",
        "Store in jewelry box",
        "Avoid harsh chemicals and perfumes",
        "Keep away from moisture"
      ]
    },
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



