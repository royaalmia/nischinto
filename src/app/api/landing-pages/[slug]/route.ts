import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  request: Request,
  { params }: { params: { slug: string } }
) {
  try {
    const { slug } = params;
    const cleanSlug = slug.toLowerCase().trim();

    const page = await prisma.landingPage.findUnique({
      where: { slug: cleanSlug },
    });

    if (!page) {
      return NextResponse.json(
        { success: false, error: "ল্যান্ডিং পেজ পাওয়া যায়নি।" },
        { status: 404 }
      );
    }

    // Safely parse features
    let parsedFeatures: string[] = [];
    try {
      parsedFeatures = typeof page.features === "string" ? JSON.parse(page.features) : page.features;
    } catch (e) {
      parsedFeatures = [];
    }

    // Increment views
    try {
      await prisma.landingPage.update({
        where: { slug: cleanSlug },
        data: { views: (page.views || 0) + 1 },
      });
    } catch (e) {}

    return NextResponse.json({
      success: true,
      data: {
        ...page,
        features: parsedFeatures,
      },
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { slug: string } }
) {
  try {
    const { slug } = params;
    const cleanSlug = slug.toLowerCase().trim();

    await prisma.landingPage.delete({
      where: { slug: cleanSlug },
    });

    return NextResponse.json({
      success: true,
      message: "ল্যান্ডিং পেজ সফলভাবে মুছে ফেলা হয়েছে।",
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
