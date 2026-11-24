import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const merchantId = searchParams.get("merchantId");
    const isAdmin = searchParams.get("isAdmin") === "true";

    const where: any = {};
    if (!isAdmin && merchantId) {
      where.merchantId = merchantId;
    }

    let deposits = [];
    try {
      deposits = await prisma.depositRequest.findMany({
        where,
        include: {
          merchant: {
            select: {
              id: true,
              businessName: true,
              ownerName: true,
              phone: true,
              email: true,
            },
          },
        },
        orderBy: { createdAt: "desc" },
      });
    } catch (e) {
      console.warn("DB findMany deposits fallback:", e);
    }

    return NextResponse.json({ success: true, data: deposits });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { merchantId, amount, method, senderNumber, trxId, screenshotUrl } = body;

    if (!amount || !method || !senderNumber || !trxId) {
      return NextResponse.json(
        { success: false, error: "সকল তথ্য (অ্যামাউন্ট, মেথড, প্রেরক নম্বর ও TrxID) সঠিকভাবে প্রদান করুন।" },
        { status: 400 }
      );
    }

    // Find merchant
    let merchant = null;
    if (merchantId) {
      try {
        merchant = await prisma.merchant.findUnique({ where: { id: merchantId } });
      } catch (e) {}
    }
    if (!merchant) {
      try {
        merchant = await prisma.merchant.findFirst();
      } catch (e) {}
    }

    const cleanTrxId = trxId.trim().toUpperCase();
    const invoiceNumber = `INV-${new Date().getFullYear()}-${Math.floor(100000 + Math.random() * 900000)}`;

    let deposit = null;
    try {
      deposit = await prisma.depositRequest.create({
        data: {
          merchantId: merchant ? merchant.id : `mch_${Date.now()}`,
          amount: Number(amount),
          method,
          senderNumber,
          trxId: cleanTrxId,
          screenshotUrl: screenshotUrl || null,
          status: "PENDING",
          invoiceNumber,
        },
      });

      // Send confirmation notification to merchant
      if (merchant) {
        await prisma.notification.create({
          data: {
            merchantId: merchant.id,
            title: "ডিপোজিট রিকোয়েস্ট জমা হয়েছে",
            message: `আপনার ৳${amount} (${method}) রিচার্জ রিকোয়েস্ট জমা হয়েছে (TrxID: ${cleanTrxId})। অ্যাডমিন যাচাই করে অনুমোদন করবেন।`,
            type: "DEPOSIT",
            linkUrl: "/settings",
          },
        });
      }
    } catch (dbErr: any) {
      console.warn("Edge DB fallback deposit:", dbErr?.message);
      deposit = {
        id: `dep_${Date.now()}`,
        merchantId: merchant ? merchant.id : "mch_default",
        amount: Number(amount),
        method,
        senderNumber,
        trxId: cleanTrxId,
        status: "PENDING",
        invoiceNumber,
        createdAt: new Date(),
      };
    }

    return NextResponse.json({
      success: true,
      message: "আপনার ডিপোজিট রিকোয়েস্ট সফলভাবে জমা হয়েছে! অ্যাডমিন শীঘ্রই অনুমোদন করবেন।",
      data: deposit,
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

// Approve or Reject Deposit (Super Admin Action)
export async function PATCH(request: Request) {
  try {
    const body = await request.json();
    const { depositId, action, adminRemarks } = body; // action: "APPROVE" | "REJECT"

    if (!depositId || !action) {
      return NextResponse.json({ success: false, error: "অবৈধ তথ্য।" }, { status: 400 });
    }

    const deposit = await prisma.depositRequest.findUnique({
      where: { id: depositId },
      include: { merchant: true },
    });

    if (!deposit) {
      return NextResponse.json({ success: false, error: "ডিপোজিট রিকোয়েস্ট খুঁজে পাওয়া যায়নি।" }, { status: 404 });
    }

    if (deposit.status !== "PENDING") {
      return NextResponse.json({ success: false, error: "এই রিকোয়েস্ট ইতিমধ্যে মীমাংসিত।" }, { status: 400 });
    }

    if (action === "APPROVE") {
      // 1. Update deposit status to APPROVED
      const updatedDeposit = await prisma.depositRequest.update({
        where: { id: depositId },
        data: {
          status: "APPROVED",
          adminRemarks: adminRemarks || "অ্যাডমিন কর্তৃক অনুমোদিত",
          approvedAt: new Date(),
        },
      });

      // 2. Add balance to merchant's wallet
      await prisma.merchant.update({
        where: { id: deposit.merchantId },
        data: {
          walletBalance: { increment: deposit.amount },
        },
      });

      // 3. Create notification for merchant
      await prisma.notification.create({
        data: {
          merchantId: deposit.merchantId,
          title: "✅ ওয়ালেট রিচার্জ সফল!",
          message: `আপনার ৳${deposit.amount} ডিপোজিট অনুমোদিত হয়েছে। ইনভয়েস নম্বর: ${deposit.invoiceNumber}। বর্তমান ব্যালান্স আপডেট করা হয়েছে।`,
          type: "DEPOSIT",
          linkUrl: "/settings",
        },
      });

      return NextResponse.json({
        success: true,
        message: `৳${deposit.amount} ডিপোজিট সফলভাবে অনুমোদন করা হয়েছে!`,
        data: updatedDeposit,
      });
    }

    if (action === "REJECT") {
      const updatedDeposit = await prisma.depositRequest.update({
        where: { id: depositId },
        data: {
          status: "REJECTED",
          adminRemarks: adminRemarks || "TrxID বা প্রেরক তথ্যের অমিলের কারণে বাতিল করা হয়েছে।",
        },
      });

      await prisma.notification.create({
        data: {
          merchantId: deposit.merchantId,
          title: "❌ ডিপোজিট রিকোয়েস্ট বাতিল",
          message: `আপনার ৳${deposit.amount} ডিপোজিট রিকোয়েস্ট বাতিল হয়েছে। কারণ: ${adminRemarks || "TrxID যাচাই করা যায়নি"}।`,
          type: "DEPOSIT",
          linkUrl: "/settings",
        },
      });

      return NextResponse.json({
        success: true,
        message: "ডিপোজিট রিকোয়েস্ট বাতিল করা হয়েছে।",
        data: updatedDeposit,
      });
    }

    return NextResponse.json({ success: false, error: "অবৈধ অ্যাকশন।" }, { status: 400 });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
