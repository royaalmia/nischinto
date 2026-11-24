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
    const { businessName, ownerName, email, phone, category = "GENERAL", plan = "GROWTH", walletBalance = 0 } = body;

    const merchant = await prisma.merchant.create({
      data: {
        businessName,
        ownerName,
        email,
        phone,
        category,
        plan,
        walletBalance: Number(walletBalance) || 0,
      },
    });

    return NextResponse.json({ success: true, data: merchant });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  try {
    const body = await request.json();
    const { id, isVerified, status } = body;

    const updateData: any = {};
    if (typeof isVerified === "boolean") updateData.isVerified = isVerified;
    if (status) updateData.status = status;

    const updated = await prisma.merchant.update({
      where: { id },
      data: updateData,
    });

    return NextResponse.json({ success: true, data: updated });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
