import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { AiAdService } from "@/services/aiAdService";

export async function POST() {
  try {
    const campaigns = await prisma.aiAdCampaign.findMany({
      where: { status: "ACTIVE" },
      include: { product: true },
    });

    const actionsTaken: string[] = [];

    for (const campaign of campaigns) {
      const evaluation = AiAdService.evaluateAdCampaign({
        id: campaign.id,
        productStock: campaign.product.stock,
        status: campaign.status,
        totalSpend: campaign.totalSpend,
        purchases: campaign.purchases,
        roas: campaign.roas,
      });

      if (evaluation.shouldPause) {
        await prisma.aiAdCampaign.update({
          where: { id: campaign.id },
          data: {
            status: "KILLED_BY_AI",
            killReason: evaluation.reason,
          },
        });
        actionsTaken.push(`ক্যাম্পেইন "${campaign.campaignName}": ${evaluation.reason}`);
      }
    }

    return NextResponse.json({
      success: true,
      message:
        actionsTaken.length > 0
          ? `${actionsTaken.length}টি ঝুঁকিপূর্ণ অ্যাড স্বয়ংক্রিয়ভাবে পজ করা হয়েছে।`
          : "সবগুলো সক্রিয় অ্যাড বর্তমানে স্বাভাবিক ও সুরক্ষিত রয়েছে।",
      actionsTaken,
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
