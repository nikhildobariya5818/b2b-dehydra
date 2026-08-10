import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { user } from "@/lib/schema";
import { count } from "drizzle-orm";

export async function GET() {
  try {
    // Check if any users exist in the database
    const result = await db
      .select({ value: count() })
      .from(user);
    
    const userCount = result[0]?.value || 0;
    const isSetupComplete = userCount > 0;

    return NextResponse.json({
      setupComplete: isSetupComplete,
      userCount,
    });
  } catch (error) {
    console.error("[API] Error checking setup status:", error);
    // If there's an error checking users, assume setup is incomplete
    return NextResponse.json({
      setupComplete: false,
      userCount: 0,
      error: "Unable to check setup status",
    });
  }
}
