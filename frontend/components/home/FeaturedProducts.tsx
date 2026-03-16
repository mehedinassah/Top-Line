import ProductCard from "@/components/products/ProductCard";
import { featuredProducts } from "@/lib/productData";
import Link from "next/link";

export default function FeaturedProducts() {
  return (
    <section className="border-b border-neutral-200 bg-white">
      <div className="mx-auto max-w-6xl px-4 py-10 md:py-16">
        <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between md:gap-4 mb-8">
          <div>
            <h2 className="text-2xl font-bold text-neutral-900 md:text-3xl">Featured menswear</h2>
            <p className="mt-1 text-xs text-neutral-700 md:text-sm">
              Staples across shirting, denim and outerwear.
            </p>
          </div>
          <Link
            href="/products"
            className="inline-flex items-center gap-1 text-xs text-neutral-700 hover:text-neutral-900 transition md:text-sm font-medium"
            title="View all products"
          >
            View all →
          </Link>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {featuredProducts.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </div>
    </section>
  );
}

