import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const products = await prisma.product.findMany({
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
    const { title, sku, price, costPrice, stock = 10, image, description } = body;

    let merchant = await prisma.merchant.findFirst();
    if (!merchant) {
      merchant = await prisma.merchant.create({
        data: {
          businessName: "My Store",
          ownerName: "মার্চেন্ট",
          email: "merchant@nishchinto.app",
          phone: "01700000000",
          plan: "PRO_AI",
          walletBalance: 200,
        },
      });
    }

    const product = await prisma.product.create({
      data: {
        merchantId: merchant.id,
        title,
        sku: sku || `SKU-${Date.now().toString().slice(-5)}`,
        price: Number(price),
        costPrice: Number(costPrice || price * 0.45),
        stock: Number(stock),
        image: image || "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&auto=format&fit=crop&q=60",
        description,
      },
    });

    return NextResponse.json({ success: true, data: product });
  } catch (error: any) {
    return NextResponse.json({ success: true, data: [] });
  }
}
