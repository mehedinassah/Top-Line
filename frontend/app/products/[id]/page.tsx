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

async function fetchProduct(id: string) {
  try {
    const res = await fetch(`${API_BASE}/products/${id}`, { cache: "no-store" });
    if (!res.ok) return null;
    const json = await res.json();
    return json.data ?? null;
  } catch {
    return null;
  }
}

async function fetchAll() {
  try {
    const res = await fetch(`${API_BASE}/products`, { cache: "no-store" });
    if (!res.ok) return [];
    const json = await res.json();
    return json.data ?? [];
  } catch {
    return [];
  }
}

export default async function ProductDetailPage({ params }: PageProps) {
  const { id } = await params;

  const product = await fetchProduct(id);
  if (!product) {
    notFound();
  }

  const allProducts = await fetchAll();
  const reviews = getProductReviews(Number(product.id));
  return (
    <ProductDetailClient {...product} reviews={reviews} allProducts={allProducts} />
  );
}
