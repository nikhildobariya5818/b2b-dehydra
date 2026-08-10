"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

export function ProductForm({ product }: { product?: any }) {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: product?.name || "",
    slug: product?.slug || "",
    category: product?.category || "",
    description: product?.description || "",
    specifications: product?.specifications ? JSON.stringify(product.specifications, null, 2) : "",
    imageUrl: product?.imageUrl || "",
    brochureUrl: product?.brochureUrl || "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const payload = {
        ...formData,
        specifications: formData.specifications ? JSON.parse(formData.specifications) : null,
      };

      const method = product ? "PATCH" : "POST";
      const url = product ? `/api/products/${product.id}` : "/api/products";

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const data = await response.json();
        setError(data.error || "Failed to save product");
        return;
      }

      router.push("/admin/products");
    } catch (err) {
      setError("An error occurred. Please try again.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="form-container">
      {error && <div className="error-banner">{error}</div>}

      <div className="form-group">
        <label htmlFor="name">Product Name *</label>
        <input
          id="name"
          type="text"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          placeholder="e.g., Premium Potato Flakes"
          required
          disabled={isLoading}
        />
      </div>

      <div className="form-group">
        <label htmlFor="slug">URL Slug *</label>
        <input
          id="slug"
          type="text"
          value={formData.slug}
          onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
          placeholder="e.g., potato-flakes"
          required
          disabled={isLoading}
        />
      </div>

      <div className="form-group">
        <label htmlFor="category">Category *</label>
        <input
          id="category"
          type="text"
          value={formData.category}
          onChange={(e) => setFormData({ ...formData, category: e.target.value })}
          placeholder="e.g., Dehydrated"
          required
          disabled={isLoading}
        />
      </div>

      <div className="form-group">
        <label htmlFor="description">Description *</label>
        <textarea
          id="description"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          placeholder="Detailed product description"
          required
          disabled={isLoading}
          rows={6}
        />
      </div>

      <div className="form-group">
        <label htmlFor="imageUrl">Image URL</label>
        <input
          id="imageUrl"
          type="url"
          value={formData.imageUrl}
          onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
          placeholder="https://example.com/image.jpg"
          disabled={isLoading}
        />
      </div>

      <div className="form-group">
        <label htmlFor="brochureUrl">Brochure URL</label>
        <input
          id="brochureUrl"
          type="url"
          value={formData.brochureUrl}
          onChange={(e) => setFormData({ ...formData, brochureUrl: e.target.value })}
          placeholder="https://example.com/brochure.pdf"
          disabled={isLoading}
        />
      </div>

      <div className="form-group">
        <label htmlFor="specifications">Specifications (JSON)</label>
        <textarea
          id="specifications"
          value={formData.specifications}
          onChange={(e) => setFormData({ ...formData, specifications: e.target.value })}
          placeholder={'{\n  "moisture": "8-10%",\n  "shelf_life": "24 months"\n}'}
          disabled={isLoading}
          rows={6}
        />
      </div>

      <div className="form-actions">
        <button type="submit" className="btn btn-primary" disabled={isLoading}>
          {isLoading ? "Saving..." : product ? "Update Product" : "Create Product"}
        </button>
        <a href="/admin/products" className="btn btn-secondary">
          Cancel
        </a>
      </div>
    </form>
  );
}
