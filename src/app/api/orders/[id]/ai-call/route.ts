import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { AiVoiceService } from "@/services/aiVoiceService";

export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    const order = await prisma.order.findUnique({
      where: { id },
      include: {
        customer: true,
        items: { include: { product: true } },
        merchant: true,
      },
    });

    if (!order) {
      return NextResponse.json({ success: false, error: "Order not found" }, { status: 404 });
    }

    const firstProduct = order.items[0]?.product?.title || "পণ্য";

    // Simulate Conversational AI Voice Call
    const callResult = await AiVoiceService.simulateBengaliVoiceCall({
      customerName: order.customer.name,
      phone: order.customer.phone,
      productTitle: firstProduct,
      totalAmount: order.totalAmount,
      address: order.customer.address || "Dhaka",
      fraudScore: order.fraudScore,
    });

    // Save Call Log
    const callLog = await prisma.aiCallLog.create({
      data: {
        merchantId: order.merchantId,
        orderId: order.id,
        phone: order.customer.phone,
        status: callResult.status,
        durationSec: callResult.durationSeconds,
        cost: callResult.costBDT,
        transcript: callResult.transcript,
        customerIntent: callResult.customerIntent,
      },
    });

    // If customer confirmed, update order status automatically!
    let updatedOrder: any = order;
    if (callResult.customerIntent === "CONFIRMED") {
      updatedOrder = await prisma.order.update({
        where: { id },
        data: {
          status: "CONFIRMED",
          adminNotes: "AI Voice কল দ্বারা সফলভাবে কনফার্ম করা হয়েছে।",
        },
        include: { customer: true, items: { include: { product: true } }, merchant: true },
      });
    }

    // Deduct cost from merchant wallet balance
    await prisma.merchant.update({
      where: { id: order.merchantId },
      data: {
        walletBalance: { decrement: callResult.costBDT },
      },
    });

    return NextResponse.json({
      success: true,
      message: callResult.success
        ? "AI কল সফল হয়েছে এবং কাস্টমার অর্ডার কনফার্ম করেছেন!"
        : "AI কল সম্পন্ন হয়েছে কিন্তু কাস্টমার উত্তর দেননি।",
      data: {
        callResult,
        callLog,
        order: updatedOrder,
      },
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
