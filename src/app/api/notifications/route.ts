import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const merchantId = searchParams.get("merchantId");

    let notifications: any[] = [];
    try {
      const where: any = {};
      if (merchantId) where.merchantId = merchantId;

      notifications = await prisma.notification.findMany({
        where,
        orderBy: { createdAt: "desc" },
        take: 20,
      });
    } catch (e) {
      console.warn("Notifications findMany fallback:", e);
    }

    return NextResponse.json({ success: true, data: notifications });
  } catch (error: any) {
    return NextResponse.json({ success: true, data: [] });
  }
}

export async function PATCH(request: Request) {
  try {
    const body = await request.json();
    const { id, markAllRead, merchantId } = body;

    if (markAllRead && merchantId) {
      await prisma.notification.updateMany({
        where: { merchantId, isRead: false },
        data: { isRead: true },
      });
      return NextResponse.json({ success: true, message: "সকল নোটিফিকেশন পড়া হিসেবে চিহ্নিত হয়েছে।" });
    }

    if (id) {
      await prisma.notification.update({
        where: { id },
        data: { isRead: true },
      });
      return NextResponse.json({ success: true, message: "নোটিফিকেশন পড়া হয়েছে।" });
    }

    return NextResponse.json({ success: false, error: "অবৈধ তথ্য।" }, { status: 400 });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
