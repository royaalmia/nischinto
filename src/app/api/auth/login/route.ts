import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password } = body;

    const trimmedEmail = (email || "").trim().toLowerCase();
    const trimmedPassword = (password || "").trim();

    if (!trimmedEmail || !trimmedPassword) {
      return NextResponse.json(
        { success: false, error: "ইমেইল ও পাসওয়ার্ড প্রদান করুন।" },
        { status: 400 }
      );
    }

    // 1. Check Super Admin Credentials
    if (trimmedEmail === "admin@nischinto.app" && trimmedPassword === "Admin@2026") {
      const response = NextResponse.json({
        success: true,
        role: "SUPER_ADMIN",
        redirect: "/admin",
        user: {
          id: "admin_root",
          email: "admin@nischinto.app",
          ownerName: "Super Admin",
          businessName: "Nischinto Technologies Admin",
          role: "SUPER_ADMIN",
          isVerified: true,
        },
        message: "সুপার অ্যাডমিন লগইন সফল হয়েছে।",
      });

      // Set secure HTTP cookies
      response.cookies.set("admin_session", "super_admin_verified", {
        path: "/",
        httpOnly: false,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 60 * 60 * 24 * 7, // 7 days
      });

      response.cookies.set("nishchinto_role", "SUPER_ADMIN", {
        path: "/",
        maxAge: 60 * 60 * 24 * 7,
      });

      return response;
    }

    // 2. Check Real Merchant in Database
    let merchant = await prisma.merchant.findFirst({
      where: {
        OR: [
          { email: trimmedEmail },
          { phone: trimmedEmail },
        ],
      },
    });

    if (!merchant) {
      return NextResponse.json(
        { success: false, error: "এই ইমেইল বা ফোন নম্বরে কোনো মার্চেন্ট অ্যাকাউন্ট পাওয়া যায়নি। সঠিক তথ্য দিন অথবা নতুন অ্যাকাউন্ট খুলুন।" },
        { status: 401 }
      );
    }

    // Check merchant password if set
    if (merchant.password && merchant.password !== trimmedPassword) {
      return NextResponse.json(
        { success: false, error: "ভুল পাসওয়ার্ড! অনুগ্রহ করে সঠিক পাসওয়ার্ড দিন।" },
        { status: 401 }
      );
    }

    // Check if account is approved by admin
    if (merchant.status === "PENDING" || !merchant.isVerified) {
      return NextResponse.json(
        {
          success: false,
          error: "আপনার মার্চেন্ট অ্যাকাউন্টটি এখনো অ্যাডমিন অনুমোদনের (Pending Approval) অপেক্ষায় রয়েছে। অ্যাডমিন ভেরিফাই ও অনুমোদন করার পর আপনি ড্যাশবোর্ডে লগইন করতে পারবেন।",
        },
        { status: 403 }
      );
    }

    if (merchant.status === "SUSPENDED") {
      return NextResponse.json(
        {
          success: false,
          error: "আপনার মার্চেন্ট অ্যাকাউন্টটি স্থগিত (Suspended) রয়েছে। বিস্তারিত জানতে অ্যাডমিন সাপোর্টে যোগাযোগ করুন।",
        },
        { status: 403 }
      );
    }

    const response = NextResponse.json({
      success: true,
      role: "MERCHANT",
      redirect: "/dashboard",
      user: merchant,
      message: "মার্চেন্ট লগইন সফল হয়েছে।",
    });

    // Set server session cookie
    response.cookies.set("nishchinto_session", merchant.id, {
      path: "/",
      httpOnly: false,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 30, // 30 days
    });

    response.cookies.set("nishchinto_role", "MERCHANT", {
      path: "/",
      maxAge: 60 * 60 * 24 * 30,
    });

    return response;
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
