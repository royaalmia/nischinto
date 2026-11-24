import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// In-memory OTP cache for instant delivery & verification
const otpCache = new Map<string, { code: string; expiresAt: number }>();

export async function POST(request: Request) {
  try {
    const { email, action, code } = await request.json();

    if (!email) {
      return NextResponse.json({ success: false, error: "ইমেইল প্রদান করুন।" }, { status: 400 });
    }

    const cleanEmail = email.toLowerCase().trim();

    // 1. Send OTP
    if (action === "SEND") {
      const otp = Math.floor(100000 + Math.random() * 900000).toString();
      const expiresAt = Date.now() + 10 * 60 * 1000; // 10 minutes

      otpCache.set(cleanEmail, { code: otp, expiresAt });

      console.log(`\n======================================================`);
      console.log(`📩 [Nischinto.app OTP] To: ${cleanEmail}`);
      console.log(`🔑 Verification Code: ${otp}`);
      console.log(`⏰ Valid for: 10 minutes`);
      console.log(`======================================================\n`);

      return NextResponse.json({
        success: true,
        message: `${cleanEmail} ঠিকানায় ৬-সংখ্যার ভেরিফিকেশন কোড পাঠানো হয়েছে।`,
        // In preview/dev mode, also expose demoOtp for effortless testing
        devOtp: otp,
      });
    }

    // 2. Verify OTP
    if (action === "VERIFY") {
      const entry = otpCache.get(cleanEmail);
      if (!entry) {
        return NextResponse.json({
          success: false,
          error: "কোনো সক্রিয় ওটিপি পাওয়া যায়নি। নতুন ওটিপি পাঠান।",
        }, { status: 400 });
      }

      if (Date.now() > entry.expiresAt) {
        otpCache.delete(cleanEmail);
        return NextResponse.json({
          success: false,
          error: "ওটিপির মেয়াদ শেষ হয়ে গেছে। অনুগ্রহ করে আবার ওটিপি পাঠান।",
        }, { status: 400 });
      }

      if (entry.code !== code?.trim()) {
        return NextResponse.json({
          success: false,
          error: "ভুল ওটিপি কোড! অনুগ্রহ করে আবার চেষ্টা করুন।",
        }, { status: 400 });
      }

      // Valid OTP
      otpCache.delete(cleanEmail);
      return NextResponse.json({
        success: true,
        message: "ইমেইল সফলভাবে ভেরিফাই হয়েছে!",
      });
    }

    return NextResponse.json({ success: false, error: "অবৈধ অ্যাকশন।" }, { status: 400 });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
