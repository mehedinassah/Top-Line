"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Product,
  ProductColor,
  Variant,
  createProduct,
  updateProduct,
} from "@/lib/api";

const STD_SIZES = ["XS", "S", "M", "L", "XL", "XXL", "XXXL"];
const COLLECTIONS = ["men", "women", "accessories"];

const linesToArr = (s: string) =>
  s.split("\n").map((x) => x.trim()).filter(Boolean);
const arrToLines = (a?: string[]) => (a || []).join("\n");

function buildVariants(
  sizes: string[],
  colors: ProductColor[],
  existing: Variant[]
): Variant[] {
  const out: Variant[] = [];
  for (const color of colors) {
    for (const size of sizes) {
      const prior = existing.find(
        (v) => v.size === size && v.color?.name === color.name
      );
      const abbr = (color.name || "XXX").slice(0, 3).toUpperCase();
      out.push(
        prior || {
          size,
          color,
          sku: `TL-${abbr}-${size}`,
          inStock: true,
          quantity: 10,
        }
      );
    }
  }
  return out;
}

// simple inputs
const inputCls =
  "w-full border border-neutral-300 rounded px-3 py-2 text-sm bg-white text-neutral-900 placeholder-neutral-400 outline-none focus:border-neutral-900";
const labelCls = "block text-sm font-medium text-neutral-700 mb-1";

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className={labelCls}>{label}</label>
      {children}
    </div>
  );
}

export default function ProductForm({ initial }: { initial?: Product }) {
  const router = useRouter();
  const editing = !!initial?.id;

  const [name, setName] = useState(initial?.name || "");
  const [category, setCategory] = useState(initial?.category || "");
  const [collection, setCollection] = useState(initial?.collection || "men");
  const [price, setPrice] = useState<string>(initial?.price?.toString() || "");
  const [discountPrice, setDiscountPrice] = useState<string>(
    initial?.discountPrice?.toString() || ""
  );
  const [rating, setRating] = useState<string>(initial?.rating?.toString() || "4.5");
  const [inStock, setInStock] = useState(initial?.inStock ?? true);
  const [images, setImages] = useState(arrToLines(initial?.images));
  const [sizes, setSizes] = useState<string[]>(
    initial?.sizes?.length ? initial.sizes : ["S", "M", "L", "XL"]
  );
  const [colors, setColors] = useState<ProductColor[]>(
    initial?.colors?.length ? initial.colors : [{ name: "Black", code: "#000000" }]
  );

  const d = initial?.description || {};
  const [story, setStory] = useState(d.story || "");
  const [highlights, setHighlights] = useState(arrToLines(d.highlights));
  const [trustSignals, setTrustSignals] = useState(arrToLines(d.trustSignals));
  const [fabricDesc, setFabricDesc] = useState(d.fabricBuild?.description || "");
  const [composition, setComposition] = useState(arrToLines(d.fabricBuild?.composition));
  const [fit, setFit] = useState(d.fitAndSizing?.fit || "");
  const [model, setModel] = useState(d.fitAndSizing?.model || "");
  const [sizing, setSizing] = useState(d.fitAndSizing?.sizing || "");
  const [whyYouLoveIt, setWhyYouLoveIt] = useState(arrToLines(d.whyYouLoveIt));
  const [careInstructions, setCareInstructions] = useState(
    arrToLines(d.careInstructions)
  );

  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const toggleSize = (s: string) =>
    setSizes((prev) => (prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s]));

  const updateColor = (i: number, key: keyof ProductColor, val: string) =>
    setColors((prev) => prev.map((c, idx) => (idx === i ? { ...c, [key]: val } : c)));
  const addColor = () => setColors((p) => [...p, { name: "", code: "#000000" }]);
  const removeColor = (i: number) => setColors((p) => p.filter((_, idx) => idx !== i));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!name || !price) {
      setError("Name and price are required.");
      return;
    }
    const orderedSizes = STD_SIZES.filter((s) => sizes.includes(s));
    const cleanColors = colors.filter((c) => c.name.trim());
    const payload: Product = {
      name,
      category,
      collection,
      price: parseFloat(price),
      discountPrice: discountPrice ? parseFloat(discountPrice) : null,
      rating: parseFloat(rating) || 0,
      inStock,
      images: linesToArr(images),
      sizes: orderedSizes,
      colors: cleanColors,
      variants: buildVariants(orderedSizes, cleanColors, initial?.variants || []),
      description: {
        story,
        highlights: linesToArr(highlights),
        trustSignals: linesToArr(trustSignals),
        fabricBuild: {
          description: fabricDesc,
          composition: linesToArr(composition),
        },
        fitAndSizing: { fit, model, sizing },
        whyYouLoveIt: linesToArr(whyYouLoveIt),
        careInstructions: linesToArr(careInstructions),
      },
    };

    setSaving(true);
    try {
      if (editing) await updateProduct(initial!.id!, payload);
      else await createProduct(payload);
      router.push("/admin/products");
    } catch (err: any) {
      setError(err.message || "Save failed");
      setSaving(false);
    }
  };

  const section = "bg-white border border-neutral-200 rounded-lg p-5 space-y-4";

  return (
    <form onSubmit={handleSubmit} className="max-w-3xl space-y-6">
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3 rounded">
          {error}
        </div>
      )}

      <div className={section}>
        <h2 className="font-semibold">Basics</h2>
        <Field label="Name">
          <input className={inputCls} value={name} onChange={(e) => setName(e.target.value)} />
        </Field>
        <div className="grid grid-cols-2 gap-4">
          <Field label="Category (e.g. shirts, tees)">
            <input className={inputCls} value={category} onChange={(e) => setCategory(e.target.value)} />
          </Field>
          <Field label="Collection">
            <select className={inputCls} value={collection} onChange={(e) => setCollection(e.target.value)}>
              {COLLECTIONS.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </Field>
        </div>
        <div className="grid grid-cols-3 gap-4">
          <Field label="Price (৳)">
            <input type="number" className={inputCls} value={price} onChange={(e) => setPrice(e.target.value)} />
          </Field>
          <Field label="Sale price (৳, optional)">
            <input type="number" className={inputCls} value={discountPrice} onChange={(e) => setDiscountPrice(e.target.value)} />
          </Field>
          <Field label="Rating (0–5)">
            <input type="number" step="0.1" className={inputCls} value={rating} onChange={(e) => setRating(e.target.value)} />
          </Field>
        </div>
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" checked={inStock} onChange={(e) => setInStock(e.target.checked)} />
          In stock
        </label>
      </div>

      <div className={section}>
        <h2 className="font-semibold">Images</h2>
        <p className="text-xs text-neutral-500">One image URL per line. The first is the main image.</p>
        <textarea className={inputCls} rows={4} value={images} onChange={(e) => setImages(e.target.value)} placeholder="https://…" />
      </div>

      <div className={section}>
        <h2 className="font-semibold">Sizes & Colours</h2>
        <div>
          <label className={labelCls}>Sizes</label>
          <div className="flex flex-wrap gap-2">
            {STD_SIZES.map((s) => (
              <button
                type="button"
                key={s}
                onClick={() => toggleSize(s)}
                className={`px-3 py-1 rounded border text-sm ${
                  sizes.includes(s)
                    ? "bg-neutral-900 text-white border-neutral-900"
                    : "bg-white text-neutral-700 border-neutral-300"
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>
        <div>
          <label className={labelCls}>Colours</label>
          <div className="space-y-2">
            {colors.map((c, i) => (
              <div key={i} className="flex items-center gap-2">
                <input
                  className={inputCls + " flex-1"}
                  placeholder="Colour name"
                  value={c.name}
                  onChange={(e) => updateColor(i, "name", e.target.value)}
                />
                <input
                  type="color"
                  className="h-9 w-12 border border-neutral-300 rounded"
                  value={c.code}
                  onChange={(e) => updateColor(i, "code", e.target.value)}
                />
                <button type="button" onClick={() => removeColor(i)} className="text-red-600 text-sm px-2">
                  ✕
                </button>
              </div>
            ))}
          </div>
          <button type="button" onClick={addColor} className="mt-2 text-sm text-neutral-700 underline">
            + Add colour
          </button>
        </div>
        <p className="text-xs text-neutral-500">
          Stock variants are generated automatically from every size × colour combination.
        </p>
      </div>

      <div className={section}>
        <h2 className="font-semibold">Description</h2>
        <Field label="Story">
          <textarea className={inputCls} rows={3} value={story} onChange={(e) => setStory(e.target.value)} />
        </Field>
        <Field label="Highlights (one per line)">
          <textarea className={inputCls} rows={3} value={highlights} onChange={(e) => setHighlights(e.target.value)} />
        </Field>
        <Field label="Fabric / build description">
          <textarea className={inputCls} rows={2} value={fabricDesc} onChange={(e) => setFabricDesc(e.target.value)} />
        </Field>
        <Field label="Composition (one per line)">
          <textarea className={inputCls} rows={3} value={composition} onChange={(e) => setComposition(e.target.value)} />
        </Field>
        <div className="grid grid-cols-3 gap-4">
          <Field label="Fit"><input className={inputCls} value={fit} onChange={(e) => setFit(e.target.value)} /></Field>
          <Field label="Model note"><input className={inputCls} value={model} onChange={(e) => setModel(e.target.value)} /></Field>
          <Field label="Sizing"><input className={inputCls} value={sizing} onChange={(e) => setSizing(e.target.value)} /></Field>
        </div>
        <Field label="Why you'll love it (one per line)">
          <textarea className={inputCls} rows={3} value={whyYouLoveIt} onChange={(e) => setWhyYouLoveIt(e.target.value)} />
        </Field>
        <Field label="Care instructions (one per line)">
          <textarea className={inputCls} rows={3} value={careInstructions} onChange={(e) => setCareInstructions(e.target.value)} />
        </Field>
        <Field label="Trust signals (one per line)">
          <textarea className={inputCls} rows={2} value={trustSignals} onChange={(e) => setTrustSignals(e.target.value)} />
        </Field>
      </div>

      <div className="flex gap-3">
        <button
          type="submit"
          disabled={saving}
          className="bg-neutral-900 text-white text-sm font-semibold rounded px-6 py-2.5 hover:bg-neutral-800 disabled:opacity-60"
        >
          {saving ? "Saving…" : editing ? "Save changes" : "Create product"}
        </button>
        <button
          type="button"
          onClick={() => router.push("/admin/products")}
          className="text-sm text-neutral-600 px-4"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
