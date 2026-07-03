"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { listProducts, deleteProduct, Product } from "@/lib/api";

function taka(n?: number | null) {
  return n == null ? "—" : "৳" + n.toLocaleString("en-BD");
}

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const load = () => {
    setLoading(true);
    listProducts()
      .then(setProducts)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  };

  useEffect(load, []);

  const handleDelete = async (p: Product) => {
    if (!confirm(`Delete "${p.name}"? This cannot be undone.`)) return;
    try {
      await deleteProduct(p.id!);
      setProducts((prev) => prev.filter((x) => x.id !== p.id));
    } catch (e: any) {
      alert(e.message);
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Products</h1>
        <Link
          href="/admin/products/new"
          className="bg-neutral-900 text-white text-sm font-semibold rounded px-4 py-2 hover:bg-neutral-800"
        >
          + Add product
        </Link>
      </div>

      {error && <div className="text-red-600 mb-4">{error}</div>}
      {loading ? (
        <div className="text-neutral-500">Loading…</div>
      ) : (
        <div className="bg-white border border-neutral-200 rounded-lg overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-neutral-500 border-b border-neutral-200 bg-neutral-50">
                <th className="py-3 px-4">Product</th>
                <th className="px-2">Category</th>
                <th className="px-2">Collection</th>
                <th className="px-2 text-right">Price</th>
                <th className="px-2 text-right">Sale</th>
                <th className="px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((p) => (
                <tr key={p.id} className="border-b border-neutral-100 hover:bg-neutral-50">
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-3">
                      {p.images?.[0] && (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={p.images[0]}
                          alt=""
                          className="w-9 h-9 rounded object-cover bg-neutral-100"
                        />
                      )}
                      <span className="font-medium">{p.name}</span>
                    </div>
                  </td>
                  <td className="px-2 text-neutral-600">{p.category}</td>
                  <td className="px-2 text-neutral-600">{p.collection}</td>
                  <td className="px-2 text-right">{taka(p.price)}</td>
                  <td className="px-2 text-right">{taka(p.discountPrice)}</td>
                  <td className="px-4 text-right whitespace-nowrap">
                    <Link
                      href={`/admin/products/${p.id}`}
                      className="text-neutral-700 hover:text-neutral-900 font-medium mr-3"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(p)}
                      className="text-red-600 hover:text-red-700 font-medium"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
              {products.length === 0 && (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-neutral-500">
                    No products yet. Click “Add product” to create one.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
