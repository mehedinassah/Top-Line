import { notFound } from "next/navigation";
import ProductDetailClient from "./ProductDetailClient";
import { getProductById } from "@/lib/productData";

type PageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function ProductDetailPage({ params }: PageProps) {
  const resolvedParams = await params;
  const id = Number(resolvedParams.id);
  if (Number.isNaN(id)) {
    notFound();
  }

  const product = getProductById(id);
  if (!product) {
    notFound();
  }

  return <ProductDetailClient {...product} />;
}

