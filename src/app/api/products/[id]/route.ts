import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const body = await request.json();
    const { title, sku, price, costPrice, stock, category, image, description } = body;

    const updated = await prisma.product.update({
      where: { id },
      data: {
        title,
        sku,
        price: Number(price),
        costPrice: Number(costPrice),
        stock: Number(stock),
        category: category || "GENERAL",
        image: image || null,
        description: description || null,
      },
    });

    return NextResponse.json({ success: true, data: updated });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    await prisma.product.delete({
      where: { id },
    });

    return NextResponse.json({ success: true, message: "পণ্যটি সফলভাবে মুছে ফেলা হয়েছে।" });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
