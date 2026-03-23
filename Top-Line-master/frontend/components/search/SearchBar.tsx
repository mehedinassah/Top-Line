"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

export default function SearchBar() {
  const [q, setQ] = useState("");
  const router = useRouter();

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const query = q.trim();
    if (!query) return;
    router.push(`/products?search=${encodeURIComponent(query)}`);
  }

  return (
    <form
      onSubmit={onSubmit}
      className="flex items-center rounded-full border border-neutral-300 bg-neutral-100 px-3 py-1.5 text-sm text-neutral-900"
      title="Search for products"
    >
      <MagnifyingGlassIcon className="mr-2 h-4 w-4 text-neutral-600" />
      <input
        className="flex-1 bg-transparent outline-none placeholder:text-neutral-600"
        placeholder="Search products..."
        value={q}
        onChange={(e) => setQ(e.target.value)}
        aria-label="Search for products"
      />
    </form>
  );
}

