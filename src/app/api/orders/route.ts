import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { FraudService } from "@/services/fraudService";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status");
    const search = searchParams.get("search");

    const where: any = {};

    if (status && status !== "ALL") {
      where.status = status;
    }

    if (search) {
      where.OR = [
        { orderNumber: { contains: search } },
        { customer: { phone: { contains: search } } },
        { customer: { name: { contains: search } } },
        { courierTrackingId: { contains: search } },
      ];
    }

    const orders = await prisma.order.findMany({
      where,
      include: {
        customer: true,
        items: {
          include: {
            product: true,
          },
        },
        aiCalls: true,
        disputes: true,
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ success: true, data: orders });
  } catch (error: any) {
    console.error("Failed to fetch orders:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      customerName,
      customerPhone,
      customerAddress,
      district = "Dhaka",
      thana = "",
      productId,
      quantity = 1,
      deliveryCharge = 80,
      source = "WEBSITE",
      isIncomplete = false,
    } = body;

    // 1. Find or create merchant
    const merchant = await prisma.merchant.findFirst();
    if (!merchant) {
      return NextResponse.json({ success: false, error: "No merchant found" }, { status: 400 });
    }

    // 2. Find product
    const product = await prisma.product.findUnique({ where: { id: productId } });
    if (!product) {
      return NextResponse.json({ success: false, error: "Product not found" }, { status: 404 });
    }

    // 3. Find or create customer
    let customer = await prisma.customer.findUnique({ where: { phone: customerPhone } });
    if (!customer) {
      customer = await prisma.customer.create({
        data: {
          phone: customerPhone,
          name: customerName || "Customer",
          address: customerAddress || "",
          district,
          thana,
        },
      });
    }

    // 4. Run Fraud Score
    const fraudAnalysis = FraudService.analyzeCustomer({
      phone: customerPhone,
      address: customerAddress,
      name: customerName,
      totalOrders: customer.totalOrders,
      deliveredOrders: customer.deliveredOrders,
      returnedOrders: customer.returnedOrders,
    });

    const subtotal = product.price * quantity;
    const totalAmount = subtotal + Number(deliveryCharge);
    const orderNumber = isIncomplete
      ? `INCOMP-${Date.now().toString().slice(-6)}`
      : `NSH-${Date.now().toString().slice(-6)}`;

    const order = await prisma.order.create({
      data: {
        orderNumber,
        merchantId: merchant.id,
        customerId: customer.id,
        status: isIncomplete ? "INCOMPLETE" : "PENDING",
        source,
        subtotal,
        deliveryCharge: Number(deliveryCharge),
        totalAmount,
        costOfGoods: product.costPrice * quantity,
        packagingCost: 20.0,
        adSpendShare: 80.0,
        netProfit: totalAmount - (product.costPrice * quantity + Number(deliveryCharge) + 20.0 + 80.0),
        fraudScore: fraudAnalysis.score,
        fraudReason: fraudAnalysis.reasons.join(" | "),
        customerNotes: isIncomplete
          ? "কাস্টমার চেকআউট পেজে ফোন নম্বর লিখে অর্ডার ড্রপ করেছে। (Incomplete Order)"
          : "",
        items: {
          create: [
            {
              productId: product.id,
              quantity,
              unitPrice: product.price,
              totalPrice: subtotal,
            },
          ],
        },
      },
      include: {
        customer: true,
        items: { include: { product: true } },
      },
    });

    // Update customer stats
    await prisma.customer.update({
      where: { id: customer.id },
      data: {
        totalOrders: { increment: 1 },
        fraudScore: fraudAnalysis.score,
      },
    });

    return NextResponse.json({ success: true, data: order });
  } catch (error: any) {
    console.error("Failed to create order:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
