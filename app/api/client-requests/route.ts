import { createClientRequest, getAllClientRequests, createRequestEvent } from "@/lib/db-operations";
import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { z } from "zod";

const requestSchema = z.object({
  companyName: z.string().trim().min(1).max(255),
  contactName: z.string().trim().min(1).max(255),
  email: z.string().trim().email().max(255),
  phone: z.string().trim().max(20).optional(),
  industry: z.string().trim().min(1).max(100),
  interestedProducts: z.string().trim().min(1).max(2000),
  estimatedVolume: z.string().trim().max(50).optional(),
  message: z.string().trim().min(1).max(5000),
  requestType: z.enum(["inquiry", "brochure", "sample"]).default("inquiry"),
  productId: z.string().uuid().optional(),
  source: z.string().trim().max(100).optional(),
  utmSource: z.string().trim().max(200).optional(),
  utmMedium: z.string().trim().max(200).optional(),
  utmCampaign: z.string().trim().max(200).optional(),
  referrer: z.string().trim().max(1000).optional(),
  landingPage: z.string().trim().max(1000).optional(),
  consent: z.literal(true),
});

export async function GET() {
  try {
    return NextResponse.json(await getAllClientRequests());
  } catch (error) {
    console.error("[API] Error fetching client requests:", error);
    return NextResponse.json({ error: "Failed to fetch client requests" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const parsed = requestSchema.safeParse(await req.json());
    if (!parsed.success) return NextResponse.json({ error: "Please complete all required fields." }, { status: 400 });
    const { consent, ...data } = parsed.data;
    const clientRequest = await createClientRequest({
      ...data,
      consentAt: consent ? new Date() : undefined,
      phone: data.phone || undefined,
      estimatedVolume: data.estimatedVolume || undefined,
    });
    await createRequestEvent(clientRequest.id, "created", { requestType: data.requestType, source: data.source });

    if (process.env.RESEND_API_KEY && process.env.RESEND_FROM_EMAIL && process.env.ADMIN_NOTIFICATION_EMAIL) {
      const resend = new Resend(process.env.RESEND_API_KEY);
      await resend.emails.send({
        from: process.env.RESEND_FROM_EMAIL,
        to: process.env.ADMIN_NOTIFICATION_EMAIL,
        subject: `New ${data.requestType} request from ${data.companyName}`,
        html: `<h2>New ${data.requestType} request</h2><p><strong>${data.contactName}</strong> at ${data.companyName} (${data.email})</p><p>${data.message}</p><p>Source: ${data.source || "website"}</p>`,
      });
    }
    return NextResponse.json(clientRequest, { status: 201 });
  } catch (error) {
    console.error("[API] Error creating client request:", error);
    return NextResponse.json({ error: "Failed to create client request" }, { status: 500 });
  }
}

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

