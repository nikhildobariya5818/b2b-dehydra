import { ProductForm } from "../product-form";

export default function NewProductPage() {
  return (
    <div>
      <div className="admin-header">
        <h1>Create New Product</h1>
        <p>Add a new product to your catalog</p>
      </div>
      <ProductForm />
    </div>
  );
}
