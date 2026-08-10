import type { MetadataRoute } from "next";

const routes = ["/", "/products", "/manufacturing", "/infrastructure", "/quality", "/exports", "/contact", "/products/potato-flakes"];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((route) => ({ url: `https://dehydrafoods.com${route}`, lastModified: new Date(), changeFrequency: route === "/" ? "weekly" : "monthly", priority: route === "/" ? 1 : 0.7 }));
}
