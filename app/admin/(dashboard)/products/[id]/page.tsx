import { ProductForm } from "../product-form";
import { getProductById } from "@/lib/db-operations";

export default async function EditProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  let product = null;
  let error = null;

  try {
    product = await getProductById(id);
    if (!product) {
      error = "Product not found";
    }
  } catch (err) {
    error = "Failed to load product";
    console.error(err);
  }

  return (
    <div>
      <div className="admin-header">
        <h1>{product ? "Edit Product" : "Product Not Found"}</h1>
        <p>{product ? product.name : error}</p>
      </div>
      {product ? <ProductForm product={product} /> : <div className="error-banner">{error}</div>}
    </div>
  );
}
