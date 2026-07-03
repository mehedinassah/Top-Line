"use client";

import useSWR from "swr";
import { listProducts, getProduct, type Product as ApiProduct } from "@/lib/api";
import type { Product } from "@/lib/productData";

// The API returns products in the same shape as the storefront Product type.
const asProducts = (p: ApiProduct[]) => p as unknown as Product[];

// Shared SWR options: don't refetch on every tab focus, dedupe bursts of
// requests, and keep showing the previous data while revalidating so navigation
// never flashes an empty/loading state.
const SWR_OPTS = {
  revalidateOnFocus: false,
  keepPreviousData: true,
  dedupingInterval: 60_000,
} as const;

/** All products, fetched from the backend (cached via SWR). */
export function useProducts() {
  const { data, error, isLoading } = useSWR("products", listProducts, SWR_OPTS);
  return {
    products: data ? asProducts(data) : [],
    isLoading,
    error: error ? (error as Error).message : null,
  };
}

/** A single product by id. */
export function useProduct(id: string | number | undefined) {
  const { data, error, isLoading } = useSWR(
    id ? ["product", id] : null,
    () => getProduct(id!),
    SWR_OPTS
  );
  return {
    product: (data as unknown as Product) || null,
    isLoading,
    error: error ? (error as Error).message : null,
  };
}
