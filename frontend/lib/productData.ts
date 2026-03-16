import type { Product } from "@/components/products/ProductCard";

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

export const featuredProducts: Product[] = [
  {
    id: 1,
    name: "Tailored Wool Blend Overcoat",
    description: "Slim fit, mid-length overcoat in a warm charcoal wool blend.",
    price: 220,
    discountPrice: 189,
    category: "outerwear",
    collection: "men",
    images: [
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1539533057440-7bf458871b70?auto=format&fit=crop&w=900&q=80"
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
    name: "Relaxed Fit Selvedge Denim",
    description: "Vintage-inspired selvedge jeans with a modern relaxed taper.",
    price: 150,
    category: "jeans",
    collection: "men",
    images: [
      "https://images.unsplash.com/photo-1514996937319-344454492b37?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1542272604-787c62d465d1?auto=format&fit=crop&w=900&q=80"
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
    name: "Everyday Oxford Shirt",
    description: "Crisp cotton oxford shirt designed for everyday layering.",
    price: 89,
    category: "shirts",
    collection: "men",
    images: [
      "https://images.unsplash.com/photo-1528701800489-20be3c30c1d5?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1559050299-8ecaffc05f60?auto=format&fit=crop&w=900&q=80"
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
    name: "Classic White T-Shirt",
    description: "Premium cotton essentials tee for everyday wear.",
    price: 45,
    discountPrice: 36,
    category: "shirts",
    collection: "men",
    images: [
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=900&q=80"
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
    name: "Slim Fit Chinos",
    description: "Versatile chinos for casual and semi-formal occasions.",
    price: 95,
    category: "pants",
    collection: "men",
    images: [
      "https://images.unsplash.com/photo-1473080169858-d7eb3c43b3b1?auto=format&fit=crop&w=900&q=80"
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
    name: "Wool Sweater",
    description: "Cozy wool blend sweater perfect for layering in cooler weather.",
    price: 125,
    category: "tops",
    collection: "men",
    images: [
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=900&q=80"
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
    name: "Elegant Midi Dress",
    description: "Sophisticated midi dress in premium cotton blend fabric.",
    price: 165,
    discountPrice: 139,
    category: "dresses",
    collection: "women",
    images: [
      "https://images.unsplash.com/photo-1595738452585-54aef1f6d02a?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1612336307429-8a88e8d08dbb?auto=format&fit=crop&w=900&q=80"
    ],
    rating: 4.8,
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: [
      { name: "Black", code: "#000000" },
      { name: "Navy", code: "#001F3F" },
      { name: "Cream", code: "#FFFDD0" }
    ],
    variants: [
      { size: "XS", color: { name: "Black", code: "#000000" }, sku: "TL-007-BLK-XS", inStock: true, quantity: 8 },
      { size: "S", color: { name: "Black", code: "#000000" }, sku: "TL-007-BLK-S", inStock: true, quantity: 12 },
      { size: "M", color: { name: "Black", code: "#000000" }, sku: "TL-007-BLK-M", inStock: true, quantity: 15 },
      { size: "L", color: { name: "Black", code: "#000000" }, sku: "TL-007-BLK-L", inStock: true, quantity: 10 },
      { size: "XL", color: { name: "Black", code: "#000000" }, sku: "TL-007-BLK-XL", inStock: true, quantity: 6 },
      { size: "S", color: { name: "Navy", code: "#001F3F" }, sku: "TL-007-NAV-S", inStock: true, quantity: 10 },
      { size: "M", color: { name: "Navy", code: "#001F3F" }, sku: "TL-007-NAV-M", inStock: true, quantity: 14 },
      { size: "L", color: { name: "Navy", code: "#001F3F" }, sku: "TL-007-NAV-L", inStock: false, quantity: 0 },
      { size: "M", color: { name: "Cream", code: "#FFFDD0" }, sku: "TL-007-CRM-M", inStock: true, quantity: 9 },
      { size: "L", color: { name: "Cream", code: "#FFFDD0" }, sku: "TL-007-CRM-L", inStock: true, quantity: 7 }
    ]
  },
  {
    id: 8,
    name: "Premium Knit Blazer",
    description: "Tailored blazer in soft knit fabric for structured elegance.",
    price: 189,
    category: "outerwear",
    collection: "women",
    images: [
      "https://images.unsplash.com/photo-1595777707802-221658fb74c3?auto=format&fit=crop&w=900&q=80"
    ],
    rating: 4.7,
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: [
      { name: "Charcoal", code: "#36454F" },
      { name: "Navy", code: "#001F3F" },
      { name: "Beige", code: "#F5F5DC" }
    ],
    variants: [
      { size: "XS", color: { name: "Charcoal", code: "#36454F" }, sku: "TL-008-CHA-XS", inStock: true, quantity: 7 },
      { size: "S", color: { name: "Charcoal", code: "#36454F" }, sku: "TL-008-CHA-S", inStock: true, quantity: 11 },
      { size: "M", color: { name: "Charcoal", code: "#36454F" }, sku: "TL-008-CHA-M", inStock: true, quantity: 13 },
      { size: "L", color: { name: "Charcoal", code: "#36454F" }, sku: "TL-008-CHA-L", inStock: true, quantity: 9 },
      { size: "XL", color: { name: "Charcoal", code: "#36454F" }, sku: "TL-008-CHA-XL", inStock: true, quantity: 5 },
      { size: "S", color: { name: "Navy", code: "#001F3F" }, sku: "TL-008-NAV-S", inStock: true, quantity: 9 },
      { size: "M", color: { name: "Navy", code: "#001F3F" }, sku: "TL-008-NAV-M", inStock: true, quantity: 11 },
      { size: "L", color: { name: "Navy", code: "#001F3F" }, sku: "TL-008-NAV-L", inStock: true, quantity: 8 },
      { size: "M", color: { name: "Beige", code: "#F5F5DC" }, sku: "TL-008-BEI-M", inStock: false, quantity: 0 },
      { size: "L", color: { name: "Beige", code: "#F5F5DC" }, sku: "TL-008-BEI-L", inStock: true, quantity: 6 }
    ]
  },
  {
    id: 9,
    name: "High-Waist Trousers",
    description: "Classic high-waist trousers with perfect drape and tailoring.",
    price: 129,
    category: "pants",
    collection: "women",
    images: [
      "https://images.unsplash.com/photo-1539193565614-8be0ed8a0302?auto=format&fit=crop&w=900&q=80"
    ],
    rating: 4.6,
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: [
      { name: "Black", code: "#000000" },
      { name: "Charcoal", code: "#36454F" },
      { name: "Navy", code: "#001F3F" }
    ],
    variants: [
      { size: "XS", color: { name: "Black", code: "#000000" }, sku: "TL-009-BLK-XS", inStock: true, quantity: 6 },
      { size: "S", color: { name: "Black", code: "#000000" }, sku: "TL-009-BLK-S", inStock: true, quantity: 10 },
      { size: "M", color: { name: "Black", code: "#000000" }, sku: "TL-009-BLK-M", inStock: true, quantity: 14 },
      { size: "L", color: { name: "Black", code: "#000000" }, sku: "TL-009-BLK-L", inStock: true, quantity: 11 },
      { size: "XL", color: { name: "Black", code: "#000000" }, sku: "TL-009-BLK-XL", inStock: true, quantity: 7 },
      { size: "S", color: { name: "Charcoal", code: "#36454F" }, sku: "TL-009-CHA-S", inStock: true, quantity: 8 },
      { size: "M", color: { name: "Charcoal", code: "#36454F" }, sku: "TL-009-CHA-M", inStock: true, quantity: 12 },
      { size: "L", color: { name: "Charcoal", code: "#36454F" }, sku: "TL-009-CHA-L", inStock: false, quantity: 0 },
      { size: "M", color: { name: "Navy", code: "#001F3F" }, sku: "TL-009-NAV-M", inStock: true, quantity: 9 }
    ]
  },
  {
    id: 10,
    name: "Luxury Cashmere Cardigan",
    description: "Soft and warm cashmere cardigan for ultimate comfort.",
    price: 245,
    discountPrice: 199,
    category: "tops",
    collection: "women",
    images: [
      "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=900&q=80"
    ],
    rating: 4.9,
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: [
      { name: "Cream", code: "#FFFDD0" },
      { name: "Gray", code: "#808080" },
      { name: "Charcoal", code: "#36454F" }
    ],
    variants: [
      { size: "XS", color: { name: "Cream", code: "#FFFDD0" }, sku: "TL-010-CRM-XS", inStock: true, quantity: 5 },
      { size: "S", color: { name: "Cream", code: "#FFFDD0" }, sku: "TL-010-CRM-S", inStock: true, quantity: 8 },
      { size: "M", color: { name: "Cream", code: "#FFFDD0" }, sku: "TL-010-CRM-M", inStock: true, quantity: 11 },
      { size: "L", color: { name: "Cream", code: "#FFFDD0" }, sku: "TL-010-CRM-L", inStock: true, quantity: 8 },
      { size: "S", color: { name: "Gray", code: "#808080" }, sku: "TL-010-GRY-S", inStock: true, quantity: 7 },
      { size: "M", color: { name: "Gray", code: "#808080" }, sku: "TL-010-GRY-M", inStock: true, quantity: 10 },
      { size: "L", color: { name: "Gray", code: "#808080" }, sku: "TL-010-GRY-L", inStock: true, quantity: 7 },
      { size: "XL", color: { name: "Gray", code: "#808080" }, sku: "TL-010-GRY-XL", inStock: false, quantity: 0 },
      { size: "M", color: { name: "Charcoal", code: "#36454F" }, sku: "TL-010-CHA-M", inStock: true, quantity: 9 }
    ]
  },
  {
    id: 11,
    name: "Minimalist Leather Handbag",
    description: "Timeless leather handbag with elegant design and functionality.",
    price: 199,
    category: "accessories",
    collection: "accessories",
    images: [
      "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=900&q=80"
    ],
    rating: 4.8,
    sizes: ["M"],
    colors: [
      { name: "Black", code: "#000000" },
      { name: "Charcoal", code: "#36454F" },
      { name: "Beige", code: "#F5F5DC" }
    ],
    variants: [
      { size: "M", color: { name: "Black", code: "#000000" }, sku: "TL-011-BLK-M", inStock: true, quantity: 12 },
      { size: "M", color: { name: "Charcoal", code: "#36454F" }, sku: "TL-011-CHA-M", inStock: true, quantity: 10 },
      { size: "M", color: { name: "Beige", code: "#F5F5DC" }, sku: "TL-011-BEI-M", inStock: true, quantity: 8 }
    ]
  },
  {
    id: 12,
    name: "Classic Wool Scarf",
    description: "Premium wool scarf for style and warmth in any season.",
    price: 89,
    discountPrice: 71,
    category: "accessories",
    collection: "accessories",
    images: [
      "https://images.unsplash.com/photo-1614730321146-b6fa6a46bcb4?auto=format&fit=crop&w=900&q=80"
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
      { size: "M", color: { name: "Navy", code: "#001F3F" }, sku: "TL-012-NAV-M", inStock: true, quantity: 15 },
      { size: "M", color: { name: "Gray", code: "#808080" }, sku: "TL-012-GRY-M", inStock: true, quantity: 14 },
      { size: "M", color: { name: "Charcoal", code: "#36454F" }, sku: "TL-012-CHA-M", inStock: true, quantity: 12 },
      { size: "M", color: { name: "Cream", code: "#FFFDD0" }, sku: "TL-012-CRM-M", inStock: true, quantity: 10 }
    ]
  },
  {
    id: 13,
    name: "Premium Leather Belt",
    description: "Versatile leather belt that works with any outfit.",
    price: 75,
    category: "accessories",
    collection: "accessories",
    images: [
      "https://images.unsplash.com/photo-1559810264-c0d931ecc6d9?auto=format&fit=crop&w=900&q=80"
    ],
    rating: 4.6,
    sizes: ["M"],
    colors: [
      { name: "Black", code: "#000000" },
      { name: "Navy", code: "#001F3F" },
      { name: "Beige", code: "#F5F5DC" }
    ],
    variants: [
      { size: "M", color: { name: "Black", code: "#000000" }, sku: "TL-013-BLK-M", inStock: true, quantity: 18 },
      { size: "M", color: { name: "Navy", code: "#001F3F" }, sku: "TL-013-NAV-M", inStock: true, quantity: 16 },
      { size: "M", color: { name: "Beige", code: "#F5F5DC" }, sku: "TL-013-BEI-M", inStock: true, quantity: 14 }
    ]
  }
];

type DetailedProduct = Product & {
  inStock: boolean;
  stockCount: number;
  reviews: {
    id: number;
    author: string;
    rating: number;
    comment: string;
  }[];
};

const detailedProducts: DetailedProduct[] = [
  {
    ...featuredProducts[0],
    inStock: true,
    stockCount: 18,
    reviews: [
      {
        id: 1,
        author: "Michael J.",
        rating: 5,
        comment: "Excellent quality and perfect fit. This overcoat is an excellent investment piece that will last for years."
      },
      {
        id: 2,
        author: "Robert S.",
        rating: 4,
        comment: "Great material and construction. Shipping was fast and packaging was excellent."
      },
      {
        id: 3,
        author: "James T.",
        rating: 5,
        comment: "The best overcoat I've ever owned. Highly recommended!"
      }
    ]
  },
  {
    ...featuredProducts[1],
    inStock: true,
    stockCount: 6,
    reviews: [
      {
        id: 4,
        author: "David P.",
        rating: 5,
        comment: "True to size and amazing quality. These jeans fit perfectly and look great."
      },
      {
        id: 5,
        author: "Chris B.",
        rating: 5,
        comment: "Love the vintage aesthetic but with modern comfort. Will definitely buy again."
      }
    ]
  },
  {
    ...featuredProducts[2],
    inStock: false,
    stockCount: 0,
    reviews: [
      {
        id: 6,
        author: "Tom R.",
        rating: 4,
        comment: "Classic oxford shirt. Currently out of stock but will definitely repurchase when available."
      },
      {
        id: 7,
        author: "Paul K.",
        rating: 5,
        comment: "Perfect for layering. High quality material that feels premium."
      }
    ]
  },
  {
    ...featuredProducts[3],
    inStock: true,
    stockCount: 25,
    reviews: [
      {
        id: 8,
        author: "Alex M.",
        rating: 5,
        comment: "Simple and perfect. Cannot go wrong with a classic white tee."
      },
      {
        id: 9,
        author: "Kevin L.",
        rating: 4,
        comment: "Good quality and comfortable. Fits well after washing."
      },
      {
        id: 10,
        author: "Marcus W.",
        rating: 5,
        comment: "Excellent basics for the price. I bought multiple colors."
      }
    ]
  },
  {
    ...featuredProducts[4],
    inStock: true,
    stockCount: 12,
    reviews: [
      {
        id: 11,
        author: "Jason H.",
        rating: 4,
        comment: "Great chinos for the price. Very versatile and comfortable."
      },
      {
        id: 12,
        author: "Brian T.",
        rating: 5,
        comment: "Perfect fit and great color options. Highly recommend!"
      }
    ]
  },
  {
    ...featuredProducts[5],
    inStock: true,
    stockCount: 8,
    reviews: [
      {
        id: 13,
        author: "Daniel F.",
        rating: 5,
        comment: "Warm and comfortable sweater. Perfect for fall and winter."
      },
      {
        id: 14,
        author: "Steven G.",
        rating: 4,
        comment: "Good quality wool. Slightly tight on first wear but stretches out nicely."
      }
    ]
  },
  {
    ...featuredProducts[6],
    inStock: true,
    stockCount: 16,
    reviews: [
      {
        id: 15,
        author: "Emma L.",
        rating: 5,
        comment: "Such an elegant midi dress. Perfect for any occasion!"
      },
      {
        id: 16,
        author: "Sarah M.",
        rating: 5,
        comment: "Excellent quality fabric and beautiful drape. Highly recommend!"
      }
    ]
  },
  {
    ...featuredProducts[7],
    inStock: true,
    stockCount: 11,
    reviews: [
      {
        id: 17,
        author: "Lisa K.",
        rating: 5,
        comment: "The knit blazer is so comfortable yet stylish. Love it!"
      },
      {
        id: 18,
        author: "Jennifer P.",
        rating: 4,
        comment: "Great quality. Fits true to size."
      }
    ]
  },
  {
    ...featuredProducts[8],
    inStock: true,
    stockCount: 14,
    reviews: [
      {
        id: 19,
        author: "Rachel T.",
        rating: 5,
        comment: "Perfect trousers with excellent tailoring. Very comfortable!"
      },
      {
        id: 20,
        author: "Michelle D.",
        rating: 4,
        comment: "Love the high-waist design. Very flattering."
      }
    ]
  },
  {
    ...featuredProducts[9],
    inStock: true,
    stockCount: 10,
    reviews: [
      {
        id: 21,
        author: "Victoria H.",
        rating: 5,
        comment: "Luxurious cashmere cardigan. Worth every penny!"
      },
      {
        id: 22,
        author: "Angela W.",
        rating: 5,
        comment: "So soft and warm. Perfect for layering."
      }
    ]
  },
  {
    ...featuredProducts[10],
    inStock: true,
    stockCount: 9,
    reviews: [
      {
        id: 23,
        author: "Patricia B.",
        rating: 5,
        comment: "Beautiful leather handbag. Excellent craftsmanship!"
      },
      {
        id: 24,
        author: "Karen R.",
        rating: 4,
        comment: "Perfect size and very stylish. Great quality leather."
      }
    ]
  },
  {
    ...featuredProducts[11],
    inStock: true,
    stockCount: 13,
    reviews: [
      {
        id: 25,
        author: "Margaret A.",
        rating: 5,
        comment: "Classic wool scarf. Perfect for all seasons!"
      },
      {
        id: 26,
        author: "Susan C.",
        rating: 4,
        comment: "Great quality wool. Warm and cozy."
      }
    ]
  },
  {
    ...featuredProducts[12],
    inStock: true,
    stockCount: 16,
    reviews: [
      {
        id: 27,
        author: "Dorothy S.",
        rating: 5,
        comment: "Premium quality leather belt. Looks elegant and lasts forever!"
      },
      {
        id: 28,
        author: "Linda G.",
        rating: 4,
        comment: "Great belt. Perfect for any outfit."
      }
    ]
  }
];

export function getProductById(id: number): DetailedProduct | undefined {
  return detailedProducts.find((p) => p.id === id);
}

