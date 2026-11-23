import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { CourierService } from "@/services/courierService";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { orderIds, action, forcedCourier } = body;

    if (!Array.isArray(orderIds) || orderIds.length === 0) {
      return NextResponse.json({ success: false, error: "No orders selected" }, { status: 400 });
    }

    if (action === "CONFIRM") {
      await prisma.order.updateMany({
        where: { id: { in: orderIds } },
        data: {
          status: "CONFIRMED",
          adminNotes: "বাল্ক সিলেকশন দ্বারা কনফার্ম করা হয়েছে।",
        },
      });

      return NextResponse.json({
        success: true,
        message: `${orderIds.length}টি অর্ডার সফলভাবে কনফার্ম করা হয়েছে।`,
      });
    }

    if (action === "SEND_COURIER") {
      const orders = await prisma.order.findMany({
        where: { id: { in: orderIds } },
        include: { customer: true, items: { include: { product: true } } },
      });

      let dispatchedCount = 0;
      for (const order of orders) {
        if (order.status !== "IN_COURIER" && order.status !== "DELIVERED") {
          const courierRes = await CourierService.dispatchOrder(
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

          await prisma.order.update({
            where: { id: order.id },
            data: {
              status: "IN_COURIER",
              courierName: courierRes.courierName,
              courierTrackingId: courierRes.trackingCode,
              courierStatus: "in_transit",
            },
          });

          dispatchedCount++;
        }
      }

      return NextResponse.json({
        success: true,
        message: `${dispatchedCount}টি অর্ডার সফলভাবে কুরিয়ারে বুক করা হয়েছে।`,
      });
    }

    return NextResponse.json({ success: false, error: "Invalid action" }, { status: 400 });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
