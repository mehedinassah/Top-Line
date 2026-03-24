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
      className="flex items-center border border-neutral-300 bg-neutral-100 px-1.5 sm:px-3 py-1 sm:py-1.5 text-xs sm:text-sm text-neutral-900"
      title="Search for products"
    >
      <MagnifyingGlassIcon className="mr-1 h-3 sm:h-4 w-3 sm:w-4 text-neutral-600 flex-shrink-0" />
      <input
        className="flex-1 min-w-[50px] bg-transparent outline-none placeholder:text-neutral-600"
        placeholder="Search"
        value={q}
        onChange={(e) => setQ(e.target.value)}
        aria-label="Search for products"
      />
      <button
        type="submit"
        className="ml-0.5 px-1 py-0.5 text-neutral-600 hover:text-neutral-900 hover:bg-neutral-200 transition rounded flex-shrink-0"
        aria-label="Submit search"
        title="Search"
      >
        <MagnifyingGlassIcon className="h-3.5 w-3.5" />
      </button>
    </form>
  );
}


