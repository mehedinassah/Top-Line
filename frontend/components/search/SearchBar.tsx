"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { featuredProducts } from "@/lib/productData";

export default function SearchBar() {
  const [q, setQ] = useState("");
  const router = useRouter();

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const query = q.trim();
    if (!query) return;

    // Search for matching products
    const searchQuery = query.toLowerCase();
    const results = featuredProducts.filter(p =>
      p.name.toLowerCase().includes(searchQuery) ||
      p.description.story.toLowerCase().includes(searchQuery) ||
      p.description.highlights.some(h => h.toLowerCase().includes(searchQuery))
    );

    // If exactly one result, go directly to that product page
    if (results.length === 1) {
      router.push(`/products/${results[0].id}`);
    } else {
      // Otherwise, go to products page with search query
      router.push(`/products?search=${encodeURIComponent(query)}`);
    }
  }

  return (
    <form
      onSubmit={onSubmit}
      className="flex items-center border border-neutral-300 bg-neutral-100 px-3 py-1.5 text-sm text-neutral-900"
      title="Search for products"
    >
      <MagnifyingGlassIcon className="mr-2 h-4 w-4 text-neutral-600 flex-shrink-0" />
      <input
        className="flex-1 bg-transparent outline-none placeholder:text-neutral-600"
        placeholder="Search products..."
        value={q}
        onChange={(e) => setQ(e.target.value)}
        aria-label="Search for products"
      />
      <button
        type="submit"
        className="ml-2 px-2 py-1 text-neutral-600 hover:text-neutral-900 hover:bg-neutral-200 transition rounded flex-shrink-0"
        aria-label="Submit search"
        title="Search"
      >
        <MagnifyingGlassIcon className="h-5 w-5" />
      </button>
    </form>
  );
}


