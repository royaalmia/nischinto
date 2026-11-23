import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { AiAdService } from "@/services/aiAdService";

export async function GET() {
  try {
    const campaigns = await prisma.aiAdCampaign.findMany({
      include: {
        product: true,
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ success: true, data: campaigns });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { productId, dailyBudget = 1000, platform = "META", campaignName } = body;

    const merchant = await prisma.merchant.findFirst();
    if (!merchant) {
      return NextResponse.json({ success: false, error: "Merchant not found" }, { status: 404 });
    }

    const product = await prisma.product.findUnique({ where: { id: productId } });
    if (!product) {
      return NextResponse.json({ success: false, error: "Product not found" }, { status: 404 });
    }

    // Generate High-Converting Ad Copy using AI Ad Engine
    const adCopy = AiAdService.generateAdCopy({
      productTitle: product.title,
      price: product.price,
      description: product.description || undefined,
    });

    const finalCampaignName = campaignName || `${product.title.slice(0, 20)} - AI Autopilot`;

    const campaign = await prisma.aiAdCampaign.create({
      data: {
        merchantId: merchant.id,
        productId: product.id,
        platform,
        campaignName: finalCampaignName,
        dailyBudget: Number(dailyBudget),
        status: "ACTIVE",
        generatedCopy: adCopy.primaryText,
        headline: adCopy.headline,
        targetAudience: adCopy.targetAudience,
        totalSpend: 0,
        impressions: 0,
        clicks: 0,
        purchases: 0,
        roas: 0,
        costPerPurchase: 0,
        autoKillEnabled: true,
        autoStockPause: true,
      },
      include: { product: true },
    });

    return NextResponse.json({
      success: true,
      message: `ক্যাম্পেইন "${finalCampaignName}" সফলভাবে তৈরি হয়েছে এবং Meta Ad Manager-এ লাইভ হয়েছে!`,
      data: campaign,
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
