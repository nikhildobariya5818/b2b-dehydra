import Link from "next/link";
import { getAllProducts } from "@/lib/db-operations";

export default async function ProductsPage() {
  let products: any[] = [];
  let error = null;

  try {
    products = await getAllProducts();
  } catch (err) {
    error = "Failed to load products";
    console.error(err);
  }

  return (
    <div>
      <div className="admin-header">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <h1>Products</h1>
            <p>Manage your product catalog</p>
          </div>
          <Link href="/admin/products/new" className="btn btn-primary">
            + Add Product
          </Link>
        </div>
      </div>

      {error && <div className="error-banner">{error}</div>}

      {products.length === 0 ? (
        <div style={{ textAlign: "center", padding: "40px", background: "white", borderRadius: "8px" }}>
          <p>No products yet. Create your first product to get started.</p>
          <Link href="/admin/products/new" className="btn btn-primary" style={{ marginTop: "20px" }}>
            Create Product
          </Link>
        </div>
      ) : (
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Category</th>
                <th>Slug</th>
                <th>Created</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id}>
                  <td><strong>{product.name}</strong></td>
                  <td>{product.category}</td>
                  <td><code>{product.slug}</code></td>
                  <td>{new Date(product.createdAt).toLocaleDateString()}</td>
                  <td>
                    <div className="action-buttons">
                      <Link href={`/admin/products/${product.id}`} className="btn btn-secondary">
                        Edit
                      </Link>
                      <Link href={`/admin/products/${product.id}/delete`} className="btn btn-danger">
                        Delete
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
