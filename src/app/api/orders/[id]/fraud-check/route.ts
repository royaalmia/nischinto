import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { FraudService } from "@/services/fraudService";

export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    const order = await prisma.order.findUnique({
      where: { id },
      include: { customer: true },
    });

    if (!order) {
      return NextResponse.json({ success: false, error: "Order not found" }, { status: 404 });
    }

    const fraudResult = FraudService.analyzeCustomer({
      phone: order.customer.phone,
      address: order.customer.address || "",
      name: order.customer.name,
      totalOrders: order.customer.totalOrders,
      deliveredOrders: order.customer.deliveredOrders,
      returnedOrders: order.customer.returnedOrders,
    });

    // Update order with latest fraud score
    const updatedOrder = await prisma.order.update({
      where: { id },
      data: {
        fraudScore: fraudResult.score,
        fraudReason: fraudResult.reasons.join(" | "),
      },
    });

    return NextResponse.json({
      success: true,
      data: fraudResult,
      order: updatedOrder,
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
