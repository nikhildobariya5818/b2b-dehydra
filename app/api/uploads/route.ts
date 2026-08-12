import { put } from "@vercel/blob";
import { NextRequest, NextResponse } from "next/server";

const limits = { image: 10 * 1024 * 1024, brochure: 25 * 1024 * 1024, video: 200 * 1024 * 1024 };
const types = {
  image: ["image/jpeg", "image/png", "image/webp"],
  brochure: ["application/pdf"],
  video: ["video/mp4", "video/webm", "video/quicktime"],
};

export async function POST(request: NextRequest) {
  const formData = await request.formData();
  const file = formData.get("file");
  const kind = formData.get("kind");
  if (!(file instanceof File) || !(kind === "image" || kind === "brochure" || kind === "video")) {
    return NextResponse.json({ error: "A valid file and media type are required" }, { status: 400 });
  }
  if (!types[kind].includes(file.type) || file.size > limits[kind]) {
    return NextResponse.json({ error: `Invalid ${kind} file or size limit exceeded` }, { status: 400 });
  }
  try {
    const blob = await put(`products/${kind}/${crypto.randomUUID()}-${file.name.replace(/[^a-zA-Z0-9._-]/g, "-")}`, file, { access: "public", addRandomSuffix: false, contentType: file.type });
    return NextResponse.json({ url: blob.url, pathname: blob.pathname, name: file.name, size: file.size, contentType: file.type });
  } catch (error) {
    console.error("[API] Media upload failed:", error);
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}

export const runtime = "nodejs";
export const maxDuration = 60;
