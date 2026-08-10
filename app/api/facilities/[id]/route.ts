import { getFacilityById, updateFacility, deleteFacility } from "@/lib/db-operations";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const facilityUpdateSchema = z.object({
  name: z.string().optional(),
  address: z.string().optional(),
  latitude: z.string().optional(),
  longitude: z.string().optional(),
  description: z.string().optional(),
  type: z.string().optional(),
});

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const facility = await getFacilityById(id);
    if (!facility) {
      return NextResponse.json({ error: "Facility not found" }, { status: 404 });
    }
    return NextResponse.json(facility);
  } catch (error) {
    console.error("Failed to fetch facility:", error);
    return NextResponse.json({ error: "Failed to fetch facility" }, { status: 500 });
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const data = facilityUpdateSchema.parse(body);

    const facility = await updateFacility(id, data);
    return NextResponse.json(facility);
  } catch (error) {
    console.error("Failed to update facility:", error);
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: "Validation failed", details: error.flatten() }, { status: 400 });
    }
    return NextResponse.json({ error: "Failed to update facility" }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await deleteFacility(id);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Failed to delete facility:", error);
    return NextResponse.json({ error: "Failed to delete facility" }, { status: 500 });
  }
}
