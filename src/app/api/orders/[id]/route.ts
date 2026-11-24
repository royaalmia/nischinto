import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
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
        aiCalls: true,
      },
    });

    if (!order) {
      return NextResponse.json({ success: false, error: "অর্ডার পাওয়া যায়নি" }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: order });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const body = await request.json();
    const { status, adminNotes, customerNotes, courierTrackingId, courierName } = body;

    const dataToUpdate: any = {};
    if (status !== undefined) dataToUpdate.status = status;
    if (adminNotes !== undefined) dataToUpdate.adminNotes = adminNotes;
    if (customerNotes !== undefined) dataToUpdate.customerNotes = customerNotes;
    if (courierTrackingId !== undefined) dataToUpdate.courierTrackingId = courierTrackingId;
    if (courierName !== undefined) dataToUpdate.courierName = courierName;

    const updated = await prisma.order.update({
      where: { id },
      data: dataToUpdate,
      include: {
        customer: true,
        items: { include: { product: true } },
      },
    });

    return NextResponse.json({
      success: true,
      message: "অর্ডার সফলভাবে আপডেট করা হয়েছে",
      data: updated,
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
