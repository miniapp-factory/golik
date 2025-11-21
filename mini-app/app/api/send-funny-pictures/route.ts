import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { url } = await request.json();
  console.log("Sending meme:", url);
  // Here you would integrate with an email or messaging service
  return NextResponse.json({ success: true });
}
