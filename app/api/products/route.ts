import { getAllProducts, createProduct } from "@/lib/db-operations";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  try {
    const products = await getAllProducts();
    return NextResponse.json(products);
  } catch (error) {
    console.error("[API] Error fetching products:", error);
    return NextResponse.json({ error: "Failed to fetch products" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const { name, slug, category, description, specifications, imageUrl, brochureUrl } = body;

    if (!name || !slug || !category || !description) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const product = await createProduct({
      name,
      slug,
      category,
      description,
      specifications: specifications || null,
      imageUrl,
      brochureUrl,
    });

    return NextResponse.json(product, { status: 201 });
  } catch (error) {
    console.error("[API] Error creating product:", error);
    return NextResponse.json(
      { error: "Failed to create product" },
      { status: 500 }
    );
  }
}
