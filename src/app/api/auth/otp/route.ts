import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// In-memory OTP cache for instant delivery & verification
const otpCache = new Map<string, { code: string; expiresAt: number }>();

async function sendEmailViaResend(to: string, otp: string) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.log(`ℹ️ [Resend] No RESEND_API_KEY provided in env. Code logged: ${otp}`);
    return { sent: false, reason: "NO_KEY" };
  }

  const fromEmail = process.env.RESEND_FROM_EMAIL || "Nishchinto <onboarding@resend.dev>";

  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <style>
        body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f8fafc; margin: 0; padding: 24px; }
        .card { max-width: 500px; margin: 0 auto; background: #ffffff; border-radius: 16px; border: 1px solid #e2e8f0; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05); }
        .header { background: linear-gradient(135deg, #0d9488 0%, #0891b2 100%); padding: 32px 24px; text-align: center; color: #ffffff; }
        .header h1 { margin: 0; font-size: 22px; font-weight: 800; letter-spacing: -0.5px; }
        .content { padding: 32px 24px; text-align: center; }
        .code-box { background: #f0fdfa; border: 2px dashed #0d9488; border-radius: 12px; padding: 18px 24px; margin: 24px 0; display: inline-block; }
        .code { font-family: monospace; font-size: 36px; font-weight: 800; letter-spacing: 8px; color: #0f766e; }
        .note { font-size: 13px; color: #64748b; line-height: 1.6; }
        .footer { background: #f8fafc; border-top: 1px solid #f1f5f9; padding: 16px 24px; text-align: center; font-size: 11px; color: #94a3b8; }
      </style>
    </head>
    <body>
      <div class="card">
        <div class="header">
          <h1>Nishchinto.app</h1>
          <p style="margin: 6px 0 0 0; font-size: 13px; opacity: 0.9;">ই-কমার্স ও লজিস্টিকস অপারেটিং সিস্টেম</p>
        </div>
        <div class="content">
          <h2 style="font-size: 18px; color: #0f172a; margin-top: 0;">অ্যাকাউন্ট ভেরিফিকেশন ওটিপি</h2>
          <p style="font-size: 14px; color: #475569; margin: 0;">আপনার নিশ্চিন্ত মার্চেন্ট অ্যাকাউন্ট ভেরিফাই করতে নিচের কোডটি ব্যবহার করুন:</p>
          <div class="code-box">
            <span class="code">${otp}</span>
          </div>
          <p class="note">⚠️ এই কোডটির মেয়াদ আগামী <strong>১০ মিনিট</strong> থাকবে। নিরাপত্তা স্বার্থে এই ওটিপি কোডটি কারও সাথে শেয়ার করবেন না।</p>
        </div>
        <div class="footer">
          <p style="margin: 0;">© 2026 Nishchinto Technologies. All Rights Reserved.</p>
        </div>
      </div>
    </body>
    </html>
  `;

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: fromEmail,
        to: [to],
        subject: `[Nishchinto] আপনার ভেরিফিকেশন ওটিপি কোড: ${otp}`,
        html: html,
      }),
    });
    const resData = await res.json();
    return { sent: res.ok, data: resData };
  } catch (err: any) {
    console.error("Resend dispatch error:", err.message);
    return { sent: false, error: err.message };
  }
}

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

      // Dispatch real email via Resend API
      await sendEmailViaResend(cleanEmail, otp);

      return NextResponse.json({
        success: true,
        message: `${cleanEmail} ঠিকানায় ৬-সংখ্যার ভেরিফিকেশন কোড পাঠানো হয়েছে। অনুগ্রহ করে ইনবক্স চেক করুন।`,
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
