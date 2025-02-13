import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0].trim() || "unknown"; // Get user's IP  
  const token = process.env.NEXT_PUBLIC_IPINFO_TOKEN;

  if (!token) {
    console.error("❌ Missing IPINFO_TOKEN");
    return NextResponse.json({ error: "Missing API token" }, { status: 500 });
  }

  try {
    const response = await fetch(`https://ipinfo.io/${ip}?token=${token}`);

    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

    const data = await response.json();

    return NextResponse.json(data);
  } catch (error) {
    console.error("❌ Error fetching location:", error);
    return NextResponse.json({ error: "Failed to fetch location" }, { status: 500 });
  }
}