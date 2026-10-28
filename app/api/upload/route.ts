import { NextRequest, NextResponse } from "next/server";
import { isSupabaseConfigured } from "@/lib/supabase";
import { createClient } from "@supabase/supabase-js";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;
    const bucket = (formData.get("bucket") as string) || "avatars";

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;

    // Check if Supabase Storage is configured
    if (isSupabaseConfigured && supabaseUrl && serviceKey) {
      const adminClient = createClient(supabaseUrl, serviceKey);
      const fileExt = file.name.split(".").pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 9)}.${fileExt}`;
      const filePath = `${bucket}/${fileName}`;

      const arrayBuffer = await file.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);

      const { data, error } = await adminClient.storage
        .from("facely-media")
        .upload(filePath, buffer, {
          contentType: file.type,
          upsert: true,
        });

      if (!error && data) {
        const { data: publicUrlData } = adminClient.storage
          .from("facely-media")
          .getPublicUrl(filePath);

        return NextResponse.json({
          success: true,
          url: publicUrlData.publicUrl,
        });
      }
    }

    // Local / Dev fallback: Base64 data URI
    const arrayBuffer = await file.arrayBuffer();
    const base64 = Buffer.from(arrayBuffer).toString("base64");
    const mimeType = file.type || "application/octet-stream";
    const dataUri = `data:${mimeType};base64,${base64}`;

    return NextResponse.json({
      success: true,
      url: dataUri,
      note: "Stored as base64 data URI (Configure Supabase Storage for remote CDN hosting)",
    });
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || "File upload failed" },
      { status: 500 }
    );
  }
}
