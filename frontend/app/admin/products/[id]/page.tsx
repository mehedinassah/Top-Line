"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import ProductForm from "@/components/admin/ProductForm";
import { getProduct, Product } from "@/lib/api";

export default function EditProductPage() {
  const params = useParams();
  const id = params?.id as string;
  const [product, setProduct] = useState<Product | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    if (id) getProduct(id).then(setProduct).catch((e) => setError(e.message));
  }, [id]);

  if (error) return <div className="text-red-600">{error}</div>;
  if (!product) return <div className="text-neutral-500">Loading…</div>;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Edit: {product.name}</h1>
      <ProductForm initial={product} />
    </div>
  );
}
