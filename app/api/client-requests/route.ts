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
      website,
    } = body;

    // Honeypot field: bots should never populate this hidden input.
    if (website) return NextResponse.json({ error: "Invalid request" }, { status: 400 });

    const normalizedEmail = String(email || "").trim().toLowerCase();
    const emailIsValid = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(normalizedEmail);

    // Validation
    if (!companyName || !contactName || !emailIsValid || !industry || !interestedProducts || !message) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const clientRequest = await createClientRequest({
      companyName,
      contactName,
      email: normalizedEmail,
      phone: phone ? String(phone).trim().slice(0, 20) : undefined,
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
