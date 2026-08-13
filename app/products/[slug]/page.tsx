import { notFound } from "next/navigation";
import { getProductBySlug } from "@/lib/db-operations";
import { ProductReferenceLayout } from "@/components/product-reference-layout";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) return { title: "Product Not Found" };
  return {
    title: product.name,
    description: product.description,
    alternates: { canonical: `/products/${product.slug}` },
    openGraph: { title: product.name, description: product.description, type: "article", images: product.imageUrl ? [product.imageUrl] : undefined },
  };
}

export default async function ProductDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) notFound();
  return <ProductReferenceLayout product={product} />;
}
