import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { FraudService } from "@/services/fraudService";

export async function POST(request: Request) {
  try {
    const payload = await request.json();

    // Support both standard Nishchinto payload and WooCommerce / Shopify payload formats
    let customerName = "Unknown Customer";
    let customerPhone = "";
    let customerAddress = "Dhaka, Bangladesh";
    let district = "Dhaka";
    let totalAmount = 1000;
    let deliveryCharge = 80;
    let items: any[] = [];
    let source = "WEBSITE_WEBHOOK";

    // 1. Check if WooCommerce webhook format
    if (payload.billing && payload.line_items) {
      customerName = `${payload.billing.first_name || ""} ${payload.billing.last_name || ""}`.trim() || "WooCommerce Customer";
      customerPhone = payload.billing.phone || "";
      customerAddress = `${payload.billing.address_1 || ""} ${payload.billing.address_2 || ""}, ${payload.billing.city || ""}`.trim();
      district = payload.billing.city || "Dhaka";
      totalAmount = Number(payload.total) || 1000;
      source = "WOOCOMMERCE";
      items = payload.line_items.map((item: any) => ({
        productTitle: item.name || "Standard Product",
        quantity: item.quantity || 1,
        unitPrice: Number(item.price) || 500,
      }));
    }
    // 2. Check if Shopify webhook format
    else if (payload.customer && payload.line_items) {
      customerName = `${payload.customer.first_name || ""} ${payload.customer.last_name || ""}`.trim() || "Shopify Customer";
      customerPhone = payload.customer.phone || payload.shipping_address?.phone || "";
      customerAddress = `${payload.shipping_address?.address1 || ""}, ${payload.shipping_address?.city || ""}`.trim();
      district = payload.shipping_address?.city || "Dhaka";
      totalAmount = Number(payload.total_price) || 1000;
      source = "SHOPIFY";
      items = payload.line_items.map((item: any) => ({
        productTitle: item.title || "Standard Product",
        quantity: item.quantity || 1,
        unitPrice: Number(item.price) || 500,
      }));
    }
    // 3. Custom Landing Page / Embed Form payload
    else {
      customerName = payload.customerName || payload.name || "Landing Page Customer";
      customerPhone = payload.customerPhone || payload.phone || "01700000000";
      customerAddress = payload.customerAddress || payload.address || "Dhaka";
      district = payload.district || "Dhaka";
      totalAmount = Number(payload.totalAmount || payload.amount || 1000);
      deliveryCharge = Number(payload.deliveryCharge || 80);
      source = payload.source || "CUSTOM_LANDING_PAGE";
      items = payload.items || [
        {
          productTitle: payload.productTitle || "Custom Product",
          quantity: Number(payload.quantity || 1),
          unitPrice: totalAmount - deliveryCharge,
        },
      ];
    }

    if (!customerPhone) {
      return NextResponse.json(
        { success: false, error: "মোবাইল নম্বর পাওয়া যায়নি।" },
        { status: 400 }
      );
    }

    // Run Real Multi-Vector Fraud Analysis
    const fraudResult = FraudService.analyzeCustomer({
      phone: customerPhone,
      address: customerAddress,
      name: customerName,
    });

    const merchant = await prisma.merchant.findFirst();
    const orderNumber = `ORD-WH-${Date.now().toString().slice(-5)}`;

    // Create or find customer
    let customer = await prisma.customer.findUnique({
      where: { phone: customerPhone },
    });

    if (!customer) {
      customer = await prisma.customer.create({
        data: {
          phone: customerPhone,
          name: customerName,
          address: customerAddress,
          district,
          thana: "",
          totalOrders: 1,
          deliveredOrders: 0,
          returnedOrders: 0,
          fraudScore: fraudResult.score,
        },
      });
    }

    // Create Order in Nishchinto
    const order = await prisma.order.create({
      data: {
        merchantId: merchant?.id || "mch_default_101",
        customerId: customer.id,
        orderNumber,
        totalAmount,
        subtotal: totalAmount - deliveryCharge,
        deliveryCharge,
        advancePaid: 0,
        status: fraudResult.level === "HIGH_RISK" ? "HOLD" : "PENDING",
        fraudScore: fraudResult.score,
        fraudReason: fraudResult.reasons.join(", "),
        courierName: "STEADFAST",
        courierStatus: "UNBOOKED",
        adminNotes: `ওয়েবসাইট থেকে সিঙ্ককৃত (${source})। ফ্রড রিস্ক: ${fraudResult.score}% (${fraudResult.level})।`,
        source,
      },
    });

    return NextResponse.json({
      success: true,
      message: "অর্ডার সফলভাবে Nishchinto ড্যাশবোর্ডে সিঙ্ক হয়েছে!",
      orderId: order.id,
      orderNumber: order.orderNumber,
      fraudScore: fraudResult.score,
      fraudRiskLevel: fraudResult.level,
    });
  } catch (error: any) {
    console.error("Webhook Order Processing Error:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to process webhook order" },
      { status: 500 }
    );
  }
}
