import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const merchantId = searchParams.get("merchantId");
    const category = searchParams.get("category");

    const where: any = {};
    if (merchantId) {
      where.merchantId = merchantId;
    }
    if (category && category !== "ALL") {
      where.category = category;
    }

    const products = await prisma.product.findMany({
      where,
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json({ success: true, data: products });
  } catch (error: any) {
    return NextResponse.json({ success: true, data: [] });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      merchantId,
      title,
      sku,
      category = "GENERAL",
      price,
      costPrice,
      stock = 0,
      image,
      description,
    } = body;

    let targetMerchantId = merchantId;

    if (!targetMerchantId) {
      const merchant = await prisma.merchant.findFirst();
      if (merchant) {
        targetMerchantId = merchant.id;
      } else {
        const newMerchant = await prisma.merchant.create({
          data: {
            businessName: "আমার স্টোর",
            ownerName: "মার্চেন্ট",
            email: "merchant@nishchinto.app",
            phone: "01700000000",
            category: "GENERAL",
            plan: "PRO_AI",
            walletBalance: 0,
          },
        });
        targetMerchantId = newMerchant.id;
      }
    }

    const product = await prisma.product.create({
      data: {
        merchantId: targetMerchantId,
        title,
        sku: sku || `SKU-${Date.now().toString().slice(-6)}`,
        category: category || "GENERAL",
        price: Number(price),
        costPrice: Number(costPrice || price * 0.5),
        stock: Number(stock),
        image: image || null,
        description: description || null,
      },
    });

    return NextResponse.json({ success: true, data: product });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
