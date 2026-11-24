import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const merchants = await prisma.merchant.findMany({
      include: {
        orders: true,
        products: true,
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ success: true, data: merchants });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { businessName, ownerName, email, phone, plan = "GROWTH", walletBalance = 500 } = body;

    const merchant = await prisma.merchant.create({
      data: {
        businessName,
        ownerName,
        email,
        phone,
        plan,
        walletBalance: Number(walletBalance) || 500,
      },
    });

    return NextResponse.json({ success: true, data: merchant });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
