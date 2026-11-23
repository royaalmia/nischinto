import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { CourierService } from "@/services/courierService";

export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const body = await request.json().catch(() => ({}));
    const { forcedCourier } = body;

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

    // Call Courier Service
    const courierResult = await CourierService.dispatchOrder(
      {
        orderNumber: order.orderNumber,
        recipientName: order.customer.name,
        recipientPhone: order.customer.phone,
        recipientAddress: order.customer.address || "Dhaka",
        district: order.customer.district || "Dhaka",
        thana: order.customer.thana || "",
        codAmount: order.totalAmount - order.advancePaid,
      },
      forcedCourier
    );

    // Update Order & Inventory
    const updatedOrder = await prisma.order.update({
      where: { id },
      data: {
        status: "IN_COURIER",
        courierName: courierResult.courierName,
        courierTrackingId: courierResult.trackingCode,
        courierStatus: "in_transit",
        deliveryCharge: courierResult.deliveryFee,
      },
      include: { customer: true, items: { include: { product: true } } },
    });

    // Deduct stock for items
    for (const item of order.items) {
      await prisma.product.update({
        where: { id: item.productId },
        data: {
          stock: {
            decrement: Math.min(item.quantity, item.product.stock),
          },
        },
      });
    }

    // Create Courier Settlement record for future reconciliation
    await prisma.courierSettlement.create({
      data: {
        merchantId: order.merchantId,
        orderId: order.id,
        courierName: courierResult.courierName,
        consignmentId: courierResult.consignmentId,
        orderNumber: order.orderNumber,
        codAmount: order.totalAmount - order.advancePaid,
        deliveryFee: courierResult.deliveryFee,
        codFee: (order.totalAmount - order.advancePaid) * 0.01,
        netPayable: (order.totalAmount - order.advancePaid) - courierResult.deliveryFee,
        status: "PENDING",
      },
    });

    return NextResponse.json({
      success: true,
      message: `অর্ডার ${order.orderNumber} সফলভাবে ${courierResult.courierName} এ পাঠানো হয়েছে। ট্র্যাকিং আইডি: ${courierResult.trackingCode}`,
      data: updatedOrder,
      courierInfo: courierResult,
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
