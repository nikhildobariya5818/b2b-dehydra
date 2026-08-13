import { getClientRequestById, getProductById, createRequestEvent, updateClientRequest } from "@/lib/db-operations";
import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { z } from "zod";

const payloadSchema = z.object({
  brochureUrl: z.string().url(),
  brochureName: z.string().trim().min(1).max(255),
  message: z.string().trim().max(5000).optional(),
});

export async function POST(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    if (!process.env.RESEND_API_KEY || !process.env.RESEND_FROM_EMAIL) {
      return NextResponse.json({ error: "Email delivery is not configured" }, { status: 503 });
    }
    const { id } = await params;
    const request = await getClientRequestById(id);
    if (!request) return NextResponse.json({ error: "Request not found" }, { status: 404 });
    const parsed = payloadSchema.safeParse(await req.json());
    if (!parsed.success) return NextResponse.json({ error: "A valid brochure URL and filename are required" }, { status: 400 });

    const { brochureUrl, brochureName, message } = parsed.data;
    const resend = new Resend(process.env.RESEND_API_KEY);
    const result = await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL,
      to: request.email,
      subject: "Your De'Hydra Foods product brochure",
      html: `<p>Hello ${request.contactName},</p><p>${message || "Please find the requested product brochure attached."}</p><p>Best regards,<br/>De'Hydra Foods</p>`,
      attachments: [{ path: brochureUrl, filename: brochureName }],
    });
    await updateClientRequest(id, { status: "responded" });
    await createRequestEvent(id, "brochure_sent", { brochureName, emailId: result.data?.id || null });
    return NextResponse.json({ sent: true, emailId: result.data?.id || null });
  } catch (error) {
    console.error("[API] Error sending brochure:", error);
    return NextResponse.json({ error: "Failed to send brochure" }, { status: 500 });
  }
}

export const runtime = "nodejs";
