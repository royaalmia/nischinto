import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const merchantId = searchParams.get("merchantId");

    const where: any = {};
    if (merchantId) where.merchantId = merchantId;

    const pages = await prisma.landingPage.findMany({
      where,
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ success: true, data: pages });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      slug,
      merchantId,
      title,
      subtitle,
      category = "GENERAL",
      offerPrice,
      originalPrice,
      deliveryInside = 70,
      deliveryOutside = 130,
      imageUrl,
      features,
      stockCount = 20,
    } = body;

    if (!slug || !title || offerPrice === undefined) {
      return NextResponse.json(
        { success: false, error: "টাইটেল, স্লাগ ও অফার মূল্য আবশ্যক।" },
        { status: 400 }
      );
    }

    const cleanSlug = slug
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9-]/g, "-")
      .replace(/-+/g, "-");

    const featuresJson = typeof features === "string" ? features : JSON.stringify(features || []);

    const pageData = {
      slug: cleanSlug,
      merchantId,
      title,
      subtitle,
      category,
      offerPrice: Number(offerPrice),
      originalPrice: Number(originalPrice || offerPrice * 1.35),
      deliveryInside: Number(deliveryInside),
      deliveryOutside: Number(deliveryOutside),
      imageUrl,
      features: featuresJson,
      stockCount: Number(stockCount),
      isActive: true,
    };

    const saved = await prisma.landingPage.upsert({
      where: { slug: cleanSlug },
      update: pageData,
      create: pageData,
    });

    return NextResponse.json({
      success: true,
      message: "ল্যান্ডিং পেজ সফলভাবে ক্লাউড সার্ভারে সংরক্ষিত হয়েছে।",
      data: saved,
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
