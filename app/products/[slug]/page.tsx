import { notFound } from "next/navigation";
import { getProductBySlug } from "@/lib/db-operations";
import { ProductReferenceLayout } from "@/components/product-reference-layout";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) return { title: "Product Not Found" };
  return { title: `${product.name} | De'Hydra Foods`, description: product.description };
}

export default async function ProductDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) notFound();
  return <ProductReferenceLayout product={product} />;
}
