import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { businessName, ownerName, email, phone, plan = "PRO_AI" } = body;

    if (!businessName || !ownerName || !email || !phone) {
      return NextResponse.json(
        { success: false, error: "সকল তথ্য সঠিকভাবে প্রদান করুন।" },
        { status: 400 }
      );
    }

    // Check if email or phone already exists
    const existing = await prisma.merchant.findUnique({
      where: { email },
    });

    if (existing) {
      return NextResponse.json(
        { success: false, error: "এই ইমেইল দিয়ে ইতিমধ্যে একটি মার্চেন্ট অ্যাকাউন্ট খোলা রয়েছে।" },
        { status: 400 }
      );
    }

    // Create Merchant
    const merchant = await prisma.merchant.create({
      data: {
        businessName,
        ownerName,
        email,
        phone,
        plan,
        walletBalance: 200.0, // Welcome signup bonus ৳200 for AI Voice calls / SMS
      },
    });

    // Create default courier configs for the merchant
    await prisma.courierConfig.createMany({
      data: [
        {
          merchantId: merchant.id,
          courierName: "STEADFAST",
          apiKey: `sf_key_${Date.now().toString().slice(-6)}`,
          secretKey: `sf_sec_${Date.now().toString().slice(-6)}`,
          isActive: true,
          isDefault: true,
        },
        {
          merchantId: merchant.id,
          courierName: "PATHAO",
          apiKey: `pt_key_${Date.now().toString().slice(-6)}`,
          secretKey: `pt_sec_${Date.now().toString().slice(-6)}`,
          isActive: true,
          isDefault: false,
        },
      ],
    });

    return NextResponse.json({
      success: true,
      message: "আপনার মার্চেন্ট অ্যাকাউন্ট সফলভাবে তৈরি হয়েছে!",
      data: merchant,
    });
  } catch (error: any) {
    console.error("Merchant Registration Error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
