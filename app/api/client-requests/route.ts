import { createClientRequest, getAllClientRequests } from "@/lib/db-operations";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  try {
    const requests = await getAllClientRequests();
    return NextResponse.json(requests);
  } catch (error) {
    console.error("[API] Error fetching client requests:", error);
    return NextResponse.json(
      { error: "Failed to fetch client requests" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const {
      companyName,
      contactName,
      email,
      phone,
      industry,
      interestedProducts,
      estimatedVolume,
      message,
    } = body;

    // Validation
    if (!companyName || !contactName || !email || !industry || !interestedProducts || !message) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const clientRequest = await createClientRequest({
      companyName,
      contactName,
      email,
      phone: phone || undefined,
      industry,
      interestedProducts, // Should be JSON string array
      estimatedVolume: estimatedVolume || undefined,
      message,
    });

    // TODO: Send email notification to admin
    console.log("[API] New client request created:", clientRequest.id);

    return NextResponse.json(clientRequest, { status: 201 });
  } catch (error) {
    console.error("[API] Error creating client request:", error);
    return NextResponse.json(
      { error: "Failed to create client request" },
      { status: 500 }
    );
  }
}
