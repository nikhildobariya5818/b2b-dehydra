import { getAllFacilities, createFacility } from "@/lib/db-operations";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const facilitySchema = z.object({
  name: z.string().min(1),
  address: z.string().min(1),
  latitude: z.string(),
  longitude: z.string(),
  description: z.string().optional(),
  type: z.string().optional(),
});

export async function GET() {
  try {
    const facilities = await getAllFacilities();
    return NextResponse.json(facilities);
  } catch (error) {
    console.error("Failed to fetch facilities:", error);
    return NextResponse.json({ error: "Failed to fetch facilities" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const data = facilitySchema.parse(body);

    const facility = await createFacility(data);
    return NextResponse.json(facility, { status: 201 });
  } catch (error) {
    console.error("Failed to create facility:", error);
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: "Validation failed", details: error.flatten() }, { status: 400 });
    }
    return NextResponse.json({ error: "Failed to create facility" }, { status: 500 });
  }
}
