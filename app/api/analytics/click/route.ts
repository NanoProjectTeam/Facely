import { NextRequest, NextResponse } from "next/server";
import { recordLinkClick } from "@/lib/storage";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { username, linkId } = body;

    if (!username || !linkId) {
      return NextResponse.json({ error: "Username and linkId are required" }, { status: 400 });
    }

    await recordLinkClick(username, linkId);

    return NextResponse.json({ success: true });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Failed to record click" }, { status: 500 });
  }
}
