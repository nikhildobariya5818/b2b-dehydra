import type { MetadataRoute } from "next";
import { getAllProducts } from "@/lib/db-operations";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://dehydrafoods.com";
  const staticRoutes = ["/", "/products", "/locations", "/contact"].map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date(),
    changeFrequency: path === "/" ? "weekly" as const : "monthly" as const,
    priority: path === "/" ? 1 : 0.7,
  }));
  try {
    const products = await getAllProducts();
    return [
      ...staticRoutes,
      ...products.map((product) => ({
        url: `${baseUrl}/products/${product.slug}`,
        lastModified: product.updatedAt,
        changeFrequency: "monthly" as const,
        priority: 0.8,
      })),
    ];
  } catch {
    // Keep the sitemap available during database/network interruptions.
    return staticRoutes;
  }
}
