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

export type Review = {
  id: number;
  author: string;
  rating: number;
  comment: string;
};

// All available reviews
export const allReviews: Review[] = [
  { id: 1, author: "Voirob", rating: 4, comment: "d**n banaiso vaya shei hoise" },
  { id: 2, author: "Aowfi", rating: 4, comment: "suiii" },
  { id: 3, author: "Zobir", rating: 4, comment: "Eto kom dam? Chi nibo na." },
  { id: 4, author: "Badhon", rating: 4, comment: "Mama amar bhallage na" },
  { id: 5, author: "Olif", rating: 5, comment: "bhaloi" },
  { id: 6, author: "Rapid Khan", rating: 5, comment: "Shundor hoise" },
  { id: 7, author: "Balakhtiar", rating: 3, comment: "Ei dost price ta ektu beshi lagtese" },
  { id: 8, author: "Riad Kobra", rating: 5, comment: "Amar size nai kenee" },
  { id: 9, author: "Sagid Majhi", rating: 4, comment: "Amar kache tw shundor lagse" },
  { id: 10, author: "Shaon", rating: 4, comment: "Nah ager tai bhalo chilo" },
  { id: 11, author: "Ponty", rating: 5, comment: "Kine deeeeee" },
  { id: 12, author: "Myshur", rating: 4, comment: "nice" },
  { id: 13, author: "Noor", rating: 5, comment: "Amar tw pochondo hoise, abbu ke dekhai." },
  { id: 14, author: "Nagin", rating: 4, comment: "No comment" },
  { id: 15, author: "Mash", rating: 5, comment: "Thik ache. shundor" },
  { id: 16, author: "Rafi", rating: 5, comment: "premium feel, really impressed with the quality." },
  { id: 17, author: "Tanvir", rating: 4, comment: "Nice design and fit, perfect for casual outings." },
  { id: 18, author: "Sakib", rating: 5, comment: "Material is top-notch, feels way more expensive than it is." },
  { id: 19, author: "Imran", rating: 4, comment: "Good quality overall, just a bit tight on the shoulders." },
  { id: 20, author: "Nayeem", rating: 5, comment: "Loved the fabric and finishing, definitely ordering again." },
  { id: 21, author: "Arif", rating: 4, comment: "Clean look and comfortable wear, great value for money." },
  { id: 22, author: "Mahin", rating: 5, comment: "Fits perfectly and looks very stylish, highly recommended." },
  { id: 23, author: "Rakib", rating: 5, comment: "Amazing quality, feels soft and durable at the same time." },
  { id: 24, author: "Shuvo", rating: 4, comment: "Nice product, delivery was smooth and packaging was good." },
  { id: 25, author: "Siam", rating: 5, comment: "Gives a premium vibe, exactly what I was looking for." },
  { id: 26, author: "Jahid", rating: 4, comment: "Good fit and breathable fabric, ideal for daily wear." },
  { id: 27, author: "Fahim", rating: 5, comment: "Excellent stitching and attention to detail, loved it." },
  { id: 28, author: "Rasel", rating: 4, comment: "Very comfortable, but I'd love to see more color options." },
  { id: 29, author: "Tarek", rating: 5, comment: "Stylish and high quality, exceeded my expectations." },
  { id: 30, author: "Nabil", rating: 5, comment: "The fabric feels amazing on skin, super happy with this purchase." },
  { id: 31, author: "Ashik", rating: 4, comment: "Great for the price, looks good and feels nice." },
  { id: 32, author: "Shakil", rating: 5, comment: "Premium quality and perfect fitting, worth every taka." },
  { id: 33, author: "Bappy", rating: 4, comment: "Nice design and comfort, good for regular use." },
  { id: 34, author: "Mehedi", rating: 5, comment: "Loved the overall quality, definitely a must-buy." },
  { id: 35, author: "Kamal", rating: 4, comment: "Good material and stitching, satisfied with the purchase." },
  { id: 36, author: "Hasan", rating: 5, comment: "Very classy look and excellent comfort, highly recommended." },
  { id: 37, author: "Parvez", rating: 4, comment: "Comfortable and stylish, just a bit long for my height." },
  { id: 38, author: "Jubayer", rating: 5, comment: "Top-quality product, feels really premium." },
  { id: 39, author: "Sumon", rating: 4, comment: "Nice and simple design, perfect for everyday wear." },
  { id: 40, author: "Anik", rating: 5, comment: "Great fit and fabric, looks even better in real life." }
];

// Function to randomly assign reviews to products
export function getRandomReviewsForProduct(productId: number, count: number): Review[] {
  const shuffled = [...allReviews].sort(() => Math.random() - 0.5);
  const selected = shuffled.slice((productId - 1) * count, (productId - 1) * count + count);
  return selected.length > 0 ? selected : shuffled.slice(0, count);
}

// Function to calculate average rating from reviews
export function calculateAverageRating(reviews: Review[]): number {
  if (reviews.length === 0) return 0;
  const sum = reviews.reduce((acc, review) => acc + review.rating, 0);
  return Math.round((sum / reviews.length) * 10) / 10;
}

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
  fabricDescription?: string;
  fabricComposition?: string;
  price: number;
  discountPrice?: number;
  category: string;
  collection: "men" | "women" | "accessories";
  images: string[];
  rating: number;
  reviewCount?: number;
  sizes: Size[];
  colors: Color[];
  variants: ProductVariant[];
  isNew?: boolean;
  isBestSeller?: boolean;
}

export const featuredProducts: Product[] = [
  {
    id: 1,
    name: "Tropical Breeze Viscose Shirt",
    description: "Built for warm days and effortless style. Feels as light as the air around you. Key Features: 120 GSM ultra-light viscose, Soft fluid drape, Breathable summer fabric, Relaxed comfort feel, Fade-resistant print",
    fabricDescription: "Made from premium 120 GSM eco-viscose rayon with exceptional breathability and beautiful fluid drape. The ultra-light fabric is soft and comfortable, perfect for warm climates and summer wear. The material provides excellent moisture-wicking properties while maintaining a luxurious feel.",
    fabricComposition: "100% Eco Viscose Rayon | 120 GSM",
    price: 750,
    discountPrice: 525,
    category: "outerwear",
    collection: "men",
    images: [
      "https://drive.google.com/uc?export=view&id=18y3VK3nf74ypAkmBJhhe3h1JVh07gRTq"
    ],
    rating: 4.8,
    reviewCount: 48,
    isBestSeller: true,
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
    name: "Dotted Luxe Cotton Shirt",
    description: "Refined details meet everyday comfort. A shirt that quietly stands out without trying too hard. Key Features: 140 GSM breathable cotton, Subtle dotted pattern design, Smooth poplin weave finish, Lightweight all-day comfort, Durable stitching",
    fabricDescription: "Crafted from premium 140 GSM combed cotton with a refined poplin weave, this shirt offers exceptional breathability and a smooth, sophisticated finish. The subtle dotted pattern adds visual interest while maintaining versatility. The fabric is colorfast and durable, perfect for everyday wear with lasting quality.",
    fabricComposition: "100% Combed Cotton | 140 GSM | Poplin Weave",
    price: 1100,
    category: "jeans",
    collection: "men",
    images: [
      "https://drive.google.com/uc?export=view&id=15VbtSrK04WkbezbDqh2wum5haAeLXNIR"
    ],
    rating: 4.7,
    reviewCount: 62,
    isNew: true,
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
    description: "A bold essential made for everyday confidence. Simple, clean, and always reliable. Key Features: 180 GSM premium cotton, Soft jersey knit, Durable everyday wear, Fade-resistant color, Breathable fabric",
    fabricDescription: "Made from 180 GSM premium organic cotton with soft single jersey knit construction. This tee offers durability combined with exceptional softness that improves with washing. The fabric resists fading while maintaining its vibrant crimson red color, perfect for everyday wear.",
    fabricComposition: "100% Organic Cotton | 180 GSM | Single Jersey Knit",
    price: 450,
    category: "shirts",
    collection: "men",
    images: [
      "https://drive.google.com/uc?export=view&id=1b499K-a75hHTuFUHy6kZna1YKBa1XUtC"
    ],
    rating: 4.6,
    reviewCount: 35,
    isBestSeller: true,
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
    description: "Where warmth meets structure. Designed for layering through changing seasons. Key Features: 320 GSM wool blend, Structured overshirt design, Warm yet breathable, Durable outer layer, Classic check pattern",
    fabricDescription: "This premium shacket features 320 GSM wool blend construction with a structured design perfect for layering. The fabric offers exceptional warmth without bulk, featuring a classic check pattern that adds visual interest. The tightly constructed weave ensures durability while maintaining breathability for transitional weather.",
    fabricComposition: "70% Wool, 30% Polyester | 320 GSM",
    price: 1199,
    discountPrice: 839,
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
    name: "Signature Black Cotton Tee",
    description: "Minimal at its core, essential in every wardrobe. Built to go with everything. Key Features: 180 GSM cotton jersey, Soft and smooth texture, Shape retention fit, Breathable everyday wear, Clean minimalist design",
    fabricDescription: "Crafted from 180 GSM premium cotton jersey, this signature tee features a smooth finish and exceptional durability. The fabric is engineered for shape retention, maintaining its perfect fit wash after wash. The breathable cotton provides comfort for all-day wear while the minimalist design pairs seamlessly with any wardrobe.",
    fabricComposition: "100% Cotton Jersey | 180 GSM",
    price: 320,
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
    name: "Forest Wool Blend Shirt",
    description: "A balance of warmth and sophistication. Designed for cooler days with a refined edge. Key Features: 260 GSM wool blend, Soft insulated feel, Breathable warmth, Premium textured finish, Durable construction",
    fabricDescription: "This premium shirt is crafted from 260 GSM wool blend fabric that combines warmth with refined sophistication. The soft insulation keeps you comfortable in cooler weather, while the breathable construction prevents overheating. The premium textured finish adds visual interest and ensures long-lasting durability.",
    fabricComposition: "65% Wool, 35% Cotton | 260 GSM",
    price: 899,
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
    name: "Artisan Printed Cotton Shirt",
    description: "Designed to stand out without being loud. A perfect blend of comfort and expression. Key Features: 130 GSM lightweight cotton, High-definition print, Breathable fabric, Soft touch finish, Summer-friendly wear",
    fabricDescription: "Made from 130 GSM lightweight cotton with high-definition print quality, this artisan shirt combines comfort with artistic expression. The breathable cotton provides exceptional comfort for summer wear, while the soft touch finish ensures durability. The premium print maintains its vibrancy through multiple washes.",
    fabricComposition: "100% Cotton | 130 GSM",
    price: 799,
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
    description: "Effortless comfort meets modern street style. Made to move with you. Key Features: 190 GSM cotton fabric, Oversized drop shoulder fit, Soft breathable texture, Durable everyday wear, Minimalist design",
    fabricDescription: "Crafted from 190 GSM premium cotton with comfortable, durable knit construction. The oversized drop shoulder design provides effortless style and ease of movement. The soft yet durable fabric is perfect for everyday wear, while the minimalist design ensures versatility and contemporary street style appeal.",
    fabricComposition: "100% Cotton | 190 GSM",
    price: 650,
    discountPrice: 455,
    category: "tops",
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
    description: "Clean, timeless, and endlessly versatile. The foundation of every wardrobe. Key Features: 180 GSM organic cotton, Smooth soft finish, Breathable fabric, Long-lasting quality, Minimal design",
    fabricDescription: "Made from 180 GSM premium organic cotton with a smooth, soft finish and exceptional durability. The breathable fabric ensures all-day comfort while the quality construction guarantees longevity. The minimalist design makes it the perfect foundation piece for any wardrobe, pairing effortlessly with everything.",
    fabricComposition: "100% Organic Cotton | 180 GSM",
    price: 320,
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
    description: "Elegance in simplicity. Designed for comfort that feels as good as it looks. Key Features: 150 GSM fine cotton, Smooth lightweight weave, Breathable comfort, Clean refined look, Durable stitching",
    fabricDescription: "Crafted from 150 GSM fine cotton with a smooth, lightweight weave, this full sleeve shirt offers refined elegance with exceptional comfort. The breathable fabric ensures all-day wearability while maintaining a polished appearance. The durable stitching and premium construction make this a reliable piece for professional and casual settings alike.",
    fabricComposition: "100% Fine Cotton | 150 GSM",
    price: 890,
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
    description: "Built to shape, move, and last. Denim that adapts to your everyday life. Key Features: 12 oz stretch denim, High-rise fit, Durable fabric, Shape retention, Comfortable flexibility",
    fabricDescription: "Made from premium 12 oz stretch denim with 98% cotton and 2% elastane blend for comfortable flexibility. The high-rise cut provides a flattering fit while the durable weave ensures long-lasting wear. The fabric is designed for shape retention, maintaining its perfect fit through multiple wears and washes.",
    fabricComposition: "98% Cotton, 2% Elastane | 12 oz Denim",
    price: 1350,
    discountPrice: 945,
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
    description: "Timeless craftsmanship that only gets better with age. Built to last for years. Key Features: Full-grain genuine leather, 3.5mm thickness, Durable metal buckle, Scratch-resistant finish, Long-lasting build",
    fabricDescription: "Crafted from premium full-grain leather with a substantial 3.5mm thickness, this belt offers unmatched durability and lasting quality. The full-grain construction develops a beautiful patina with age, creating unique character. The premium stitching and quality hardware ensure reliable performance for years to come.",
    price: 1499,
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
    description: "Subtle elegance for everyday wear. Designed to complement every look. Key Features: Gold-plated finish, Lightweight design, Tarnish-resistant coating, Skin-friendly material, Stackable styling",
    fabricDescription: "This elegant ring set features a premium gold-tone plated finish with a tarnish-resistant protective coating. The lightweight alloy construction ensures comfortable all-day wear, while the skin-friendly materials are gentle on sensitive skin. The minimalist design is perfect for stacking or wearing individually.",
    price: 499,
    discountPrice: 349,
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
      { size: "M", color: { name: "Navy", code: "#001F3F" }, sku: "TL-013-NAV-M", inStock: true, quantity: 15 },
      { size: "M", color: { name: "Gray", code: "#808080" }, sku: "TL-013-GRY-M", inStock: true, quantity: 14 },
      { size: "M", color: { name: "Charcoal", code: "#36454F" }, sku: "TL-013-CHA-M", inStock: true, quantity: 12 },
      { size: "M", color: { name: "Cream", code: "#FFFDD0" }, sku: "TL-013-CRM-M", inStock: true, quantity: 10 }
    ]
  },
  {
    id: 14,
    name: "Classic Structured Leather Handbag",
    description: "A statement of quiet luxury. Designed to carry more than just essentials. Key Features: Genuine leather exterior, Structured silhouette, Durable inner lining, Spacious compartments, Premium finish",
    fabricDescription: "Crafted from high-quality genuine leather with a structured design that maintains its shape. The durable microfiber lining protects your essentials while the premium construction ensures lasting quality. Every detail has been carefully considered to create a timeless piece that only improves with age.",
    price: 2450,
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
      { size: "M", color: { name: "Black", code: "#000000" }, sku: "TL-014-BLK-M", inStock: true, quantity: 18 },
      { size: "M", color: { name: "Navy", code: "#001F3F" }, sku: "TL-014-NAV-M", inStock: true, quantity: 16 },
      { size: "M", color: { name: "Beige", code: "#F5F5DC" }, sku: "TL-014-BEI-M", inStock: true, quantity: 14 }
    ]
  },
  {
    id: 15,
    name: "Elegant Jewelry Set - Earrings & Bracelet",
    description: "Refined pieces that elevate every outfit. Simple, elegant, and timeless. Key Features: Polished alloy finish, Lightweight comfort, Anti-tarnish coating, Elegant design, Everyday wear friendly",
    fabricDescription: "This elegant jewelry set features a polished alloy finish with premium anti-tarnish coating for lasting beauty. The lightweight construction ensures comfortable all-day wear, while the elegant design works with any style. Each piece has been carefully crafted to provide timeless appeal and durability.",
    price: 999,
    discountPrice: 699,
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
      { size: "M", color: { name: "Navy", code: "#001F3F" }, sku: "TL-015-NAV-M", inStock: true, quantity: 20 },
      { size: "M", color: { name: "Charcoal", code: "#36454F" }, sku: "TL-015-CHA-M", inStock: true, quantity: 18 },
      { size: "M", color: { name: "Olive", code: "#808000" }, sku: "TL-015-OLI-M", inStock: true, quantity: 16 },
      { size: "M", color: { name: "Cream", code: "#FFFDD0" }, sku: "TL-015-CRM-M", inStock: true, quantity: 14 }
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
    reviews: []
  },
  {
    ...featuredProducts[1],
    inStock: true,
    stockCount: 22,
    reviews: []
  },
  {
    ...featuredProducts[2],
    inStock: false,
    stockCount: 0,
    reviews: []
  },
  {
    ...featuredProducts[3],
    inStock: true,
    stockCount: 25,
    reviews: []
  },
  {
    ...featuredProducts[4],
    inStock: true,
    stockCount: 12,
    reviews: []
  },
  {
    ...featuredProducts[5],
    inStock: true,
    stockCount: 8,
    reviews: []
  },
  {
    ...featuredProducts[6],
    inStock: true,
    stockCount: 16,
    reviews: []
  },
  {
    ...featuredProducts[7],
    inStock: true,
    stockCount: 12,
    reviews: []
  },
  {
    ...featuredProducts[8],
    inStock: true,
    stockCount: 11,
    reviews: []
  },
  {
    ...featuredProducts[9],
    inStock: true,
    stockCount: 14,
    reviews: []
  },
  {
    ...featuredProducts[10],
    inStock: true,
    stockCount: 10,
    reviews: []
  },
  {
    ...featuredProducts[11],
    inStock: true,
    stockCount: 13,
    reviews: []
  },
  {
    ...featuredProducts[12],
    inStock: true,
    stockCount: 16,
    reviews: []
  },
  {
    ...featuredProducts[13],
    inStock: true,
    stockCount: 22,
    reviews: []
  },
  {
    ...featuredProducts[14],
    inStock: true,
    stockCount: 19,
    reviews: []
  }
];

export function getProductById(id: number): DetailedProduct | undefined {
  return detailedProducts.find((p) => p.id === id);
}



