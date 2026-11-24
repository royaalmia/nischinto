import { NextResponse } from "next/server";

export async function POST() {
  const response = NextResponse.json({
    success: true,
    message: "সফলভাবে লগআউট করা হয়েছে।",
  });

  // Clear all cookies
  response.cookies.delete("admin_session");
  response.cookies.delete("nishchinto_session");
  response.cookies.delete("nishchinto_role");

  return response;
}
