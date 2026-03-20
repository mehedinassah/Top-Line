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
    name: "Relaxed Fit Selvedge Denim",
    description: "Vintage-inspired selvedge jeans with a modern relaxed taper.",
    price: 150,
    category: "jeans",
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
    name: "Everyday Oxford Shirt",
    description: "Crisp cotton oxford shirt designed for everyday layering.",
    price: 89,
    category: "shirts",
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
    name: "Classic White T-Shirt",
    description: "Premium cotton essentials tee for everyday wear.",
    price: 45,
    discountPrice: 36,
    category: "shirts",
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
    name: "Slim Fit Chinos",
    description: "Versatile chinos for casual and semi-formal occasions.",
    price: 95,
    category: "pants",
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
    name: "Wool Sweater",
    description: "Cozy wool blend sweater perfect for layering in cooler weather.",
    price: 125,
    category: "tops",
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
    name: "Premium Linen Shirt",
    description: "Lightweight premium linen shirt perfect for warm weather and casual elegance.",
    price: 120,
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
    name: "Premium Knit Blazer",
    description: "Tailored blazer in soft knit fabric for structured elegance.",
    price: 189,
    category: "outerwear",
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
      { size: "M", color: { name: "Black", code: "#000000" }, sku: "TL-013-BLK-M", inStock: true, quantity: 18 },
      { size: "M", color: { name: "Navy", code: "#001F3F" }, sku: "TL-013-NAV-M", inStock: true, quantity: 16 },
      { size: "M", color: { name: "Beige", code: "#F5F5DC" }, sku: "TL-013-BEI-M", inStock: true, quantity: 14 }
    ]
  },
  {
    id: 14,
    name: "Italian Silk Pocket Square",
    description: "Luxurious silk pocket square for sophisticated style.",
    price: 45,
    discountPrice: 36,
    category: "accessories",
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
      { size: "M", color: { name: "Navy", code: "#001F3F" }, sku: "TL-014-NAV-M", inStock: true, quantity: 20 },
      { size: "M", color: { name: "Charcoal", code: "#36454F" }, sku: "TL-014-CHA-M", inStock: true, quantity: 18 },
      { size: "M", color: { name: "Olive", code: "#808000" }, sku: "TL-014-OLI-M", inStock: true, quantity: 16 },
      { size: "M", color: { name: "Cream", code: "#FFFDD0" }, sku: "TL-014-CRM-M", inStock: true, quantity: 14 }
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
        author: "Voirob",
        rating: 4,
        comment: "Mochotkar hoyeche vaya"
      },
      {
        id: 2,
        author: "Olif",
        rating: 5,
        comment: "Bhaloi"
      },
      {
        id: 3,
        author: "Sagid Majhi",
        rating: 5,
        comment: "Shundor hoise onek"
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
        author: "John Kabir",
        rating: 3,
        comment: "Ekdam 300 dibo"
      },
      {
        id: 5,
        author: "Shaon",
        rating: 4,
        comment: "Nah agei bhalo chilo"
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
        author: "Aowfi",
        rating: 4,
        comment: "Siuuuuuuu"
      },
      {
        id: 7,
        author: "Balakhtiar",
        rating: 4,
        comment: "Accha dost price ta ektu komano jay na"
      },
      {
        id: 8,
        author: "Noor",
        rating: 4,
        comment: "Abbu ke dekhaisi. Dekhi ki bole"
      }
    ]
  },
  {
    ...featuredProducts[3],
    inStock: true,
    stockCount: 25,
    reviews: [
      {
        id: 9,
        author: "Riad Kobra",
        rating: 4,
        comment: "Eto dam keneee"
      },
      {
        id: 10,
        author: "Voirob",
        rating: 4,
        comment: "Mochotkar hoyeche vaya"
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
        author: "Olif",
        rating: 5,
        comment: "Bhaloi"
      },
      {
        id: 12,
        author: "Shaon",
        rating: 4,
        comment: "Nah agei bhalo chilo"
      },
      {
        id: 13,
        author: "Aowfi",
        rating: 4,
        comment: "Siuuuuuuu"
      },
      {
        id: 14,
        author: "John Kabir",
        rating: 3,
        comment: "Ekdam 300 dibo"
      }
    ]
  },
  {
    ...featuredProducts[5],
    inStock: true,
    stockCount: 8,
    reviews: [
      {
        id: 15,
        author: "Sagid Majhi",
        rating: 5,
        comment: "Shundor hoise onek"
      },
      {
        id: 16,
        author: "Noor",
        rating: 4,
        comment: "Abbu ke dekhaisi. Dekhi ki bole"
      },
      {
        id: 17,
        author: "Balakhtiar",
        rating: 4,
        comment: "Accha dost price ta ektu komano jay na"
      }
    ]
  },
  {
    ...featuredProducts[6],
    inStock: true,
    stockCount: 16,
    reviews: [
      {
        id: 18,
        author: "Riad Kobra",
        rating: 4,
        comment: "Eto dam keneee"
      },
      {
        id: 19,
        author: "Voirob",
        rating: 4,
        comment: "Mochotkar hoyeche vaya"
      }
    ]
  },
  {
    ...featuredProducts[7],
    inStock: true,
    stockCount: 11,
    reviews: [
      {
        id: 20,
        author: "Olif",
        rating: 5,
        comment: "Bhaloi"
      },
      {
        id: 21,
        author: "Aowfi",
        rating: 4,
        comment: "Siuuuuuuu"
      },
      {
        id: 22,
        author: "Shaon",
        rating: 4,
        comment: "Nah agei bhalo chilo"
      },
      {
        id: 23,
        author: "John Kabir",
        rating: 3,
        comment: "Ekdam 300 dibo"
      }
    ]
  },
  {
    ...featuredProducts[8],
    inStock: true,
    stockCount: 14,
    reviews: [
      {
        id: 24,
        author: "Sagid Majhi",
        rating: 5,
        comment: "Shundor hoise onek"
      },
      {
        id: 25,
        author: "Balakhtiar",
        rating: 4,
        comment: "Accha dost price ta ektu komano jay na"
      },
      {
        id: 26,
        author: "Noor",
        rating: 4,
        comment: "Abbu ke dekhaisi. Dekhi ki bole"
      }
    ]
  },
  {
    ...featuredProducts[9],
    inStock: true,
    stockCount: 10,
    reviews: [
      {
        id: 27,
        author: "Riad Kobra",
        rating: 4,
        comment: "Eto dam keneee"
      },
      {
        id: 28,
        author: "Voirob",
        rating: 4,
        comment: "Mochotkar hoyeche vaya"
      }
    ]
  },
  {
    ...featuredProducts[10],
    inStock: true,
    stockCount: 9,
    reviews: [
      {
        id: 29,
        author: "Olif",
        rating: 5,
        comment: "Bhaloi"
      },
      {
        id: 30,
        author: "John Kabir",
        rating: 3,
        comment: "Ekdam 300 dibo"
      },
      {
        id: 31,
        author: "Shaon",
        rating: 4,
        comment: "Nah agei bhalo chilo"
      }
    ]
  },
  {
    ...featuredProducts[11],
    inStock: true,
    stockCount: 13,
    reviews: [
      {
        id: 32,
        author: "Aowfi",
        rating: 4,
        comment: "Siuuuuuuu"
      },
      {
        id: 33,
        author: "Sagid Majhi",
        rating: 5,
        comment: "Shundor hoise onek"
      }
    ]
  },
  {
    ...featuredProducts[12],
    inStock: true,
    stockCount: 16,
    reviews: [
      {
        id: 34,
        author: "Balakhtiar",
        rating: 4,
        comment: "Accha dost price ta ektu komano jay na"
      },
      {
        id: 35,
        author: "Noor",
        rating: 4,
        comment: "Abbu ke dekhaisi. Dekhi ki bole"
      },
      {
        id: 36,
        author: "Riad Kobra",
        rating: 4,
        comment: "Eto dam keneee"
      },
      {
        id: 37,
        author: "Voirob",
        rating: 4,
        comment: "Mochotkar hoyeche vaya"
      }
    ]
  },
  {
    ...featuredProducts[13],
    inStock: true,
    stockCount: 22,
    reviews: [
      {
        id: 38,
        author: "Olif",
        rating: 5,
        comment: "Bhaloi"
      },
      {
        id: 39,
        author: "Shaon",
        rating: 4,
        comment: "Nah agei bhalo chilo"
      }
    ]
  }
];

export function getProductById(id: number): DetailedProduct | undefined {
  return detailedProducts.find((p) => p.id === id);
}



