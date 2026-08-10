import { put, list } from "@vercel/blob";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  try {
    const { blobs } = await list();
    return NextResponse.json(blobs);
  } catch (error) {
    console.error("Failed to list brochures:", error);
    return NextResponse.json({ error: "Failed to list brochures" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File;
    const productId = formData.get("productId") as string;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    const filename = `brochures/${productId}-${Date.now()}-${file.name}`;
    const blob = await put(filename, file, {
      access: "private",
      cacheControlMaxAge: 60 * 60 * 24 * 365, // 1 year
    });

    return NextResponse.json(blob);
  } catch (error) {
    console.error("Failed to upload brochure:", error);
    return NextResponse.json({ error: "Failed to upload brochure" }, { status: 500 });
  }
}
