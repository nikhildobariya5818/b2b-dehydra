import { getClientRequestById, updateClientRequest } from "@/lib/db-operations";
import { NextResponse } from "next/server";

export async function POST(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const clientRequest = await getClientRequestById(id);
  if (!clientRequest) return NextResponse.json({ error: "Request not found" }, { status: 404 });

  if (!process.env.RESEND_API_KEY || !process.env.ADMIN_NOTIFICATION_EMAIL) {
    return NextResponse.json({ error: "Email delivery is not configured. Add RESEND_API_KEY and ADMIN_NOTIFICATION_EMAIL to enable this action." }, { status: 503 });
  }

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${process.env.RESEND_API_KEY}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: process.env.RESEND_FROM_EMAIL || "De'Hydra Foods <onboarding@resend.dev>",
      to: [clientRequest.email],
      subject: "Your requested De'Hydra Foods brochure",
      text: `Hello ${clientRequest.contactName},\n\nThank you for your interest in ${clientRequest.interestedProducts}. Our team will share the brochure and next steps with you shortly.\n\nRegards,\nDe'Hydra Foods`,
    }),
  });

  if (!response.ok) return NextResponse.json({ error: "Resend could not deliver this email." }, { status: 502 });
  await updateClientRequest(id, { status: "responded" });
  return NextResponse.json({ sent: true });
}
