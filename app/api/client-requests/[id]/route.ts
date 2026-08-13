import { getClientRequestById, updateClientRequest, createRequestEvent, getRequestEvents } from "@/lib/db-operations";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const clientRequest = await getClientRequestById(id);
    if (!clientRequest) {
      return NextResponse.json({ error: "Request not found" }, { status: 404 });
    }
    const events = await getRequestEvents(id);
    return NextResponse.json({ ...clientRequest, events });
  } catch (error) {
    console.error("[API] Error fetching client request:", error);
    return NextResponse.json(
      { error: "Failed to fetch client request" },
      { status: 500 }
    );
  }
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await req.json();
    const { status, notes } = body;

    if (!status && !notes) {
      return NextResponse.json(
        { error: "No fields to update" },
        { status: 400 }
      );
    }

    const updated = await updateClientRequest(id, { status, notes });
    await createRequestEvent(id, status ? "status_changed" : "note_added", { status, notes });
    return NextResponse.json(updated);
  } catch (error) {
    console.error("[API] Error updating client request:", error);
    return NextResponse.json(
      { error: "Failed to update client request" },
      { status: 500 }
    );
  }
}
