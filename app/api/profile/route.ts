import { NextRequest, NextResponse } from "next/server";
import { getProfileByUsername, saveProfile } from "@/lib/storage";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const username = searchParams.get("username");

  if (!username) {
    return NextResponse.json({ error: "Username parameter is required" }, { status: 400 });
  }

  const profile = await getProfileByUsername(username);
  if (!profile) {
    return NextResponse.json({ error: "Profile not found" }, { status: 404 });
  }

  return NextResponse.json(profile);
}

export async function POST(req: NextRequest) {
  try {
    const profile = await req.json();

    if (!profile.username) {
      return NextResponse.json({ error: "Username is required" }, { status: 400 });
    }

    const saved = await saveProfile(profile);
    return NextResponse.json({ success: true, profile: saved });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Failed to save profile" }, { status: 500 });
  }
}
