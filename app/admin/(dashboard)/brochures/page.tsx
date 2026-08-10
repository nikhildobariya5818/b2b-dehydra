"use client";

import { useState, useEffect } from "react";
import { Icon } from "@/components/icon";

interface Brochure {
  url: string;
  pathname: string;
  size: number;
  uploadedAt: string;
}

export default function BrochuresPage() {
  const [brochures, setBrochures] = useState<Brochure[]>([]);
  const [products, setProducts] = useState<any[]>([]);
  const [selectedProduct, setSelectedProduct] = useState("");
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadBrochures();
    loadProducts();
  }, []);

  async function loadBrochures() {
    try {
      const response = await fetch("/api/brochures");
      const data = await response.json();
      setBrochures(data);
    } catch (error) {
      console.error("Failed to load brochures:", error);
    } finally {
      setLoading(false);
    }
  }

  async function loadProducts() {
    try {
      const response = await fetch("/api/products");
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error("Failed to load products:", error);
    }
  }

  async function handleUpload(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file || !selectedProduct) {
      alert("Please select a product and a file");
      return;
    }

    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("productId", selectedProduct);

      const response = await fetch("/api/brochures", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        await loadBrochures();
        setSelectedProduct("");
        alert("Brochure uploaded successfully!");
      } else {
        alert("Failed to upload brochure");
      }
    } catch (error) {
      console.error("Upload error:", error);
      alert("Error uploading brochure");
    } finally {
      setUploading(false);
    }
  }

  if (loading) {
    return <div className="admin-container"><p>Loading brochures...</p></div>;
  }

  return (
    <div className="admin-container">
      <div className="admin-header">
        <h1>Brochure Management</h1>
        <p>Upload and manage product brochures</p>
      </div>

      <div className="admin-card">
        <h2>Upload New Brochure</h2>
        <div className="form-group">
          <label>
            Select Product *
            <select
              value={selectedProduct}
              onChange={(e) => setSelectedProduct(e.target.value)}
              required
            >
              <option value="">Choose a product...</option>
              {products.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name}
                </option>
              ))}
            </select>
          </label>
        </div>
        <div className="form-group">
          <label>
            Upload PDF File *
            <input
              type="file"
              accept=".pdf"
              onChange={handleUpload}
              disabled={!selectedProduct || uploading}
            />
          </label>
        </div>
        {uploading && <p>Uploading...</p>}
      </div>

      <div className="admin-card">
        <h2>Uploaded Brochures ({brochures.length})</h2>
        {brochures.length === 0 ? (
          <p>No brochures uploaded yet.</p>
        ) : (
          <div className="brochures-list">
            {brochures.map((brochure) => (
              <div key={brochure.pathname} className="brochure-item">
                <div className="brochure-info">
                  <Icon name="box" size={20} />
                  <div>
                    <p className="brochure-name">{brochure.pathname.split("/").pop()}</p>
                    <p className="brochure-meta">
                      {(brochure.size / 1024 / 1024).toFixed(2)} MB • {new Date(brochure.uploadedAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <a href={brochure.url} target="_blank" rel="noopener noreferrer" className="button small">
                  Download
                </a>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
