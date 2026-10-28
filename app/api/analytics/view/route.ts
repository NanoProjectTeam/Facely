import { NextRequest, NextResponse } from "next/server";
import { recordProfileView } from "@/lib/storage";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { username, referrer } = body;

    if (!username) {
      return NextResponse.json({ error: "Username is required" }, { status: 400 });
    }

    const result = await recordProfileView(username, referrer);

    return NextResponse.json({
      success: true,
      views_count: result.views,
      unique_visitors_count: result.unique,
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Failed to record view" }, { status: 500 });
  }
}
