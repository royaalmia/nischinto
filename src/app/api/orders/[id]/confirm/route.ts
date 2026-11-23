import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const order = await prisma.order.update({
      where: { id },
      data: {
        status: "CONFIRMED",
        adminNotes: "অর্ডারটি সফলভাবে কনফার্ম করা হয়েছে।",
      },
      include: { customer: true, items: { include: { product: true } } },
    });

    return NextResponse.json({
      success: true,
      message: `অর্ডার ${order.orderNumber} সফলভাবে কনফার্ম করা হয়েছে।`,
      data: order,
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
