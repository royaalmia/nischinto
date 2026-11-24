import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
  try {
    const cookieHeader = request.headers.get("cookie") || "";
    const cookies = Object.fromEntries(
      cookieHeader.split(";").map((c) => {
        const [k, ...v] = c.trim().split("=");
        return [k, decodeURIComponent(v.join("="))];
      })
    );

    // 1. Super Admin Session
    if (cookies.admin_session === "super_admin_verified") {
      return NextResponse.json({
        success: true,
        authenticated: true,
        role: "SUPER_ADMIN",
        user: {
          id: "admin_root",
          email: "admin@nischinto.app",
          ownerName: "Super Admin",
          businessName: "Nischinto Technologies Admin",
          role: "SUPER_ADMIN",
          isVerified: true,
        },
      });
    }

    // 2. Merchant Session
    const merchantId = cookies.nishchinto_session;
    let merchant = null;

    if (merchantId) {
      merchant = await prisma.merchant.findUnique({
        where: { id: merchantId },
      });
    }

    // Fallback: Check first registered merchant if any
    if (!merchant) {
      const allMerchants = await prisma.merchant.findMany({
        where: { email: { not: "admin@nischinto.app" } },
        orderBy: { createdAt: "desc" },
        take: 1,
      });
      merchant = allMerchants[0] || null;
    }

    if (merchant) {
      return NextResponse.json({
        success: true,
        authenticated: true,
        role: "MERCHANT",
        user: merchant,
      });
    }

    return NextResponse.json({
      success: true,
      authenticated: false,
      role: "GUEST",
      user: null,
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
