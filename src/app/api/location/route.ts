import { NextResponse } from "next/server";

export async function GET() {
  try {
    const token = process.env.IPINFO_TOKEN;
    if (!token) throw new Error("Missing API token");

    const res = await fetch(`https://ipinfo.io/json?token=${token}`);
    if (!res.ok) throw new Error("Failed to fetch location");

    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching location:", error);
    return NextResponse.json({ city: "Unknown", country: "??", timezone: "Unknown" }, { status: 500 });
  }
}