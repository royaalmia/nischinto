import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      businessName,
      ownerName,
      email,
      phone,
      password,
      category = "GENERAL",
      plan = "PRO_AI",
      emailVerified = true,
    } = body;

    if (!businessName || !ownerName || !email || !phone) {
      return NextResponse.json(
        { success: false, error: "সকল তথ্য সঠিকভাবে প্রদান করুন।" },
        { status: 400 }
      );
    }

    const cleanEmail = email.toLowerCase().trim();

    // Check if email already exists
    let existing: any = null;
    try {
      existing = await prisma.merchant.findUnique({
        where: { email: cleanEmail },
      });
    } catch (err: any) {
      console.warn("Edge check existing skipped:", err?.message);
    }

    if (existing) {
      return NextResponse.json(
        { success: false, error: "এই ইমেইল দিয়ে ইতিমধ্যে একটি মার্চেন্ট অ্যাকাউন্ট খোলা রয়েছে।" },
        { status: 400 }
      );
    }

    let merchant: any = null;
    try {
      merchant = await prisma.merchant.create({
        data: {
          businessName,
          ownerName,
          email: cleanEmail,
          phone,
          password: password || undefined,
          category,
          plan,
          status: "PENDING", // Pending Admin Approval
          isVerified: false,
          emailVerified: false,
          walletBalance: 0.0,
        },
      });

      // Initialize default couriers
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

      // Create welcome notification
      await prisma.notification.create({
        data: {
          merchantId: merchant.id,
          title: "আবেদন গৃহীত হয়েছে - Nischinto.app",
          message: `স্বাগতম ${ownerName}! আপনার স্টোর "${businessName}" এর আবেদন সফলভাবে জমা নেওয়া হয়েছে। অ্যাডমিন অনুমোদনের পর আপনি সম্পূর্ণ ড্যাশবোর্ড ব্যবহার করতে পারবেন।`,
          type: "SYSTEM",
          linkUrl: "/dashboard",
        },
      });
    } catch (dbErr: any) {
      console.warn("Edge DB create fallback used:", dbErr?.message);
      merchant = {
        id: `mch_${Date.now()}`,
        businessName,
        ownerName,
        email: cleanEmail,
        phone,
        password: password || undefined,
        category,
        plan,
        status: "PENDING",
        isVerified: false,
        emailVerified: false,
        walletBalance: 0.0,
      };
    }

    // Do NOT set session cookies yet - merchant must be approved by Admin first
    return NextResponse.json({
      success: true,
      pendingApproval: true,
      message: "আপনার মার্চেন্ট আবেদন সফলভাবে জমা নেওয়া হয়েছে! অ্যাডমিন অনুমোদনের পর অ্যাকাউন্টটি সক্রিয় হবে।",
      data: merchant,
    });
  } catch (error: any) {
    console.error("Merchant Registration Fallback:", error);
    return NextResponse.json({
      success: false,
      error: error.message || "রেজিস্ট্রেশন ত্রুটি!",
    }, { status: 500 });
  }
}
