"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

type Media = { url: string; name?: string; size?: number };

export function ProductForm({ product }: { product?: any }) {
  const router = useRouter();
  const [formData, setFormData] = useState({ name: product?.name || "", slug: product?.slug || "", category: product?.category || "", description: product?.description || "", specifications: product?.specifications ? JSON.stringify(product.specifications, null, 2) : "", imageUrl: product?.imageUrl || "", brochureUrl: product?.brochureUrl || "", videoUrl: product?.videoUrl || "" });
  const [isLoading, setIsLoading] = useState(false);
  const [uploading, setUploading] = useState<string | null>(null);
  const [error, setError] = useState("");

  async function upload(kind: "image" | "brochure" | "video", file?: File) {
    if (!file) return;
    setUploading(kind); setError("");
    try {
      const body = new FormData(); body.append("file", file); body.append("kind", kind);
      const response = await fetch("/api/uploads", { method: "POST", body });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Upload failed");
      const key = kind === "image" ? "imageUrl" : kind === "brochure" ? "brochureUrl" : "videoUrl";
      setFormData((current) => ({ ...current, [key]: data.url }));
    } catch (err) { setError(err instanceof Error ? err.message : "Upload failed"); }
    finally { setUploading(null); }
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault(); setError(""); setIsLoading(true);
    try {
      const payload = { ...formData, specifications: formData.specifications ? JSON.parse(formData.specifications) : null };
      const response = await fetch(product ? `/api/products/${product.id}` : "/api/products", { method: product ? "PATCH" : "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
      if (!response.ok) { const data = await response.json(); throw new Error(data.error || "Failed to save product"); }
      router.push("/admin/products");
    } catch (err) { setError(err instanceof Error ? err.message : "An error occurred. Please try again."); }
    finally { setIsLoading(false); }
  }

  const disabled = isLoading || !!uploading;
  return <form onSubmit={handleSubmit} className="form-container">
    {error && <div className="error-banner">{error}</div>}
    <div className="form-group"><label htmlFor="name">Product Name *</label><input id="name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} required disabled={disabled} /></div>
    <div className="form-group"><label htmlFor="slug">URL Slug *</label><input id="slug" value={formData.slug} onChange={(e) => setFormData({ ...formData, slug: e.target.value })} required disabled={disabled} /></div>
    <div className="form-group"><label htmlFor="category">Category *</label><input id="category" value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value })} required disabled={disabled} /></div>
    <div className="form-group"><label htmlFor="description">Description *</label><textarea id="description" value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} required disabled={disabled} rows={6} /></div>
    <div className="form-group"><label htmlFor="image">Product image</label><input id="image" type="file" accept="image/jpeg,image/png,image/webp" onChange={(e) => upload("image", e.target.files?.[0])} disabled={disabled} />{formData.imageUrl && <img src={formData.imageUrl} alt="Product preview" style={{ maxWidth: 240, marginTop: 8 }} />}</div>
    <div className="form-group"><label htmlFor="brochure">Brochure PDF</label><input id="brochure" type="file" accept="application/pdf" onChange={(e) => upload("brochure", e.target.files?.[0])} disabled={disabled} />{formData.brochureUrl && <a href={formData.brochureUrl} target="_blank" rel="noreferrer">View current brochure</a>}</div>
    <div className="form-group"><label htmlFor="video">Product video</label><input id="video" type="file" accept="video/mp4,video/webm,video/quicktime" onChange={(e) => upload("video", e.target.files?.[0])} disabled={disabled} />{formData.videoUrl && <video src={formData.videoUrl} controls style={{ maxWidth: 420, marginTop: 8 }} />}</div>
    <div className="form-group"><label htmlFor="specifications">Specifications (JSON)</label><textarea id="specifications" value={formData.specifications} onChange={(e) => setFormData({ ...formData, specifications: e.target.value })} disabled={disabled} rows={6} /></div>
    <div className="form-actions"><button type="submit" className="btn btn-primary" disabled={disabled}>{isLoading ? "Saving..." : uploading ? `Uploading ${uploading}...` : product ? "Update Product" : "Create Product"}</button><a href="/admin/products" className="btn btn-secondary">Cancel</a></div>
  </form>;
}
