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
  // Shuffle and select random products that change on each refresh
  const relatedProducts = products
    .filter(p => p.id !== currentProductId)
    .sort(() => Math.random() - 0.5)
    .slice(0, 4);

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

