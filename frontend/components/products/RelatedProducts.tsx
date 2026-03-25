import ProductCard from "@/components/products/ProductCard";
import type { Product } from "@/lib/productData";

interface RelatedProductsProps {
  products: Product[];
  currentProductId: number;
}

export default function RelatedProducts({ 
  products, 
  currentProductId 
}: RelatedProductsProps) {
  // Deterministic shuffle using seeded random based on current product ID
  // This ensures same products on server and client (fixes hydration mismatch)
  const seededShuffle = (arr: Product[], seed: number) => {
    const shuffled = [...arr];
    for (let i = shuffled.length - 1; i > 0; i--) {
      seed = (seed * 9301 + 49297) % 233280;
      const j = Math.floor((seed / 233280) * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  const relatedProducts = seededShuffle(
    products.filter(p => p.id !== currentProductId),
    currentProductId
  ).slice(0, 4);

  if (relatedProducts.length === 0) {
    return null;
  }

  return (
    <section className="border-t border-neutral-200 bg-white py-10 md:py-16">
      <div className="mx-auto max-w-6xl px-4">
        <h2 className="mb-8 text-2xl font-bold text-neutral-900 md:text-3xl">
          Related Products
        </h2>
        <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4">
          {relatedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}

