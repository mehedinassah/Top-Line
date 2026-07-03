import { notFound } from "next/navigation";
import ProductDetailClient from "./ProductDetailClient";
import { allReviews } from "@/lib/reviewsData";

const API_BASE =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8080/api";

type PageProps = {
  params: Promise<{ id: string }>;
};

// Sample reviews are generated deterministically (backend has no reviews table yet).
function getProductReviews(productId: number) {
  const seed = (productId || 1) * 7;
  const reviewCount = 4 + (seed % 2);
  const startIndex = seed % Math.max(1, allReviews.length - reviewCount);
  return allReviews.slice(startIndex, startIndex + reviewCount);
}

// Cache responses at the edge for 5 minutes (ISR). Product pages then render
// instantly from cache instead of blocking on the backend every visit — and
// stay fast even if the free-tier backend is cold.
const REVALIDATE_SECONDS = 300;

async function fetchProduct(id: string) {
  try {
    const res = await fetch(`${API_BASE}/products/${id}`, {
      next: { revalidate: REVALIDATE_SECONDS },
    });
    if (!res.ok) return null;
    const json = await res.json();
    return json.data ?? null;
  } catch {
    return null;
  }
}

async function fetchAll() {
  try {
    const res = await fetch(`${API_BASE}/products`, {
      next: { revalidate: REVALIDATE_SECONDS },
    });
    if (!res.ok) return [];
    const json = await res.json();
    return json.data ?? [];
  } catch {
    return [];
  }
}

export default async function ProductDetailPage({ params }: PageProps) {
  const { id } = await params;

  // Fetch the product and the catalogue in parallel (was sequential).
  const [product, allProducts] = await Promise.all([fetchProduct(id), fetchAll()]);
  if (!product) {
    notFound();
  }

  const reviews = getProductReviews(Number(product.id));
  return (
    <ProductDetailClient {...product} reviews={reviews} allProducts={allProducts} />
  );
}
