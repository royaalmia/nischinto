const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  console.log("Seeding Nischinto CRM database with initial data...");

  // 1. Create Default Merchant
  const merchant = await prisma.merchant.upsert({
    where: { email: "owner@nischinto.com" },
    update: {},
    create: {
      businessName: "Nischinto Fashion & Gadgets",
      ownerName: "Rahim Chowdhury",
      email: "owner@nischinto.com",
      phone: "01711223344",
      plan: "PRO_AI",
      walletBalance: 1450.0,
    },
  });

  // 2. Courier Configurations
  await prisma.courierConfig.createMany({
    data: [
      {
        merchantId: merchant.id,
        courierName: "STEADFAST",
        apiKey: "sf_live_key_9876543210",
        secretKey: "sf_secret_token_abcdef",
        isActive: true,
        isDefault: true,
      },
      {
        merchantId: merchant.id,
        courierName: "PATHAO",
        apiKey: "pathao_client_id_456",
        secretKey: "pathao_client_secret_xyz",
        isActive: true,
        isDefault: false,
      },
    ],
  });

  // 3. Products
  const p1 = await prisma.product.create({
    data: {
      merchantId: merchant.id,
      title: "Premium Heavyweight Drop-Shoulder T-Shirt",
      sku: "TS-DROP-001",
      description: "100% Combed Cotton 240 GSM, reactive dye, breathable fabric.",
      price: 650.0,
      costPrice: 280.0,
      stock: 140,
      image: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=500&auto=format&fit=crop&q=60",
      isActive: true,
    },
  });

  const p2 = await prisma.product.create({
    data: {
      merchantId: merchant.id,
      title: "Waterproof Travel Laptop Backpack (Anti-Theft)",
      sku: "BP-SAFE-002",
      description: "Oxford fabric with USB charging port, waterproof zipper.",
      price: 1450.0,
      costPrice: 650.0,
      stock: 35,
      image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&auto=format&fit=crop&q=60",
      isActive: true,
    },
  });

  const p3 = await prisma.product.create({
    data: {
      merchantId: merchant.id,
      title: "Wireless ANC Earbuds Pro (32h Playtime)",
      sku: "EB-ANC-003",
      description: "Active Noise Cancellation with deep bass and ENC mic.",
      price: 1250.0,
      costPrice: 510.0,
      stock: 0, // OUT OF STOCK to show AI Ad Auto-Pause!
      image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=500&auto=format&fit=crop&q=60",
      isActive: true,
    },
  });

  // 4. Customers
  const c1 = await prisma.customer.create({
    data: {
      phone: "01755123456",
      name: "Tanvir Ahmed",
      address: "House 12, Road 4, Sector 7, Uttara",
      district: "Dhaka",
      thana: "Uttara",
      totalOrders: 6,
      deliveredOrders: 6,
      returnedOrders: 0,
      fraudScore: 5, // Safe customer
    },
  });

  const c2 = await prisma.customer.create({
    data: {
      phone: "01822987654",
      name: "Shakil Hossain",
      address: "Mirpur 10, Block C, Lane 2",
      district: "Dhaka",
      thana: "Mirpur",
      totalOrders: 4,
      deliveredOrders: 2,
      returnedOrders: 2,
      fraudScore: 52, // Medium Risk
    },
  });

  const c3 = await prisma.customer.create({
    data: {
      phone: "01999000111",
      name: "Md. Jewel Rana",
      address: "Gulsan 2 (Fake Address)",
      district: "Dhaka",
      thana: "Gulshan",
      totalOrders: 7,
      deliveredOrders: 1,
      returnedOrders: 6,
      fraudScore: 88, // HIGH RISK FRAUD
      isBlacklisted: true,
    },
  });

  const c4 = await prisma.customer.create({
    data: {
      phone: "01688776655",
      name: "Fatema Begum",
      address: "Chawkbazar, Posta Road",
      district: "Chattogram",
      thana: "Chawkbazar",
      totalOrders: 1,
      deliveredOrders: 0,
      returnedOrders: 0,
      fraudScore: 15,
    },
  });

  // 5. Orders
  // Order 1: Delivered & Settled
  const o1 = await prisma.order.create({
    data: {
      orderNumber: "NSH-1001",
      merchantId: merchant.id,
      customerId: c1.id,
      status: "DELIVERED",
      source: "WEBSITE",
      totalAmount: 1450.0 + 80.0,
      subtotal: 1450.0,
      deliveryCharge: 80.0,
      costOfGoods: 650.0,
      packagingCost: 20.0,
      adSpendShare: 140.0,
      netProfit: (1450.0 + 80.0) - (650.0 + 80.0 + 20.0 + 140.0), // 640 BDT Net profit
      courierName: "STEADFAST",
      courierTrackingId: "SF-88992211",
      courierStatus: "delivered",
      fraudScore: 5,
      items: {
        create: [
          {
            productId: p2.id,
            quantity: 1,
            unitPrice: 1450.0,
            totalPrice: 1450.0,
          },
        ],
      },
    },
  });

  // Order 2: In Courier (Pending Delivery)
  await prisma.order.create({
    data: {
      orderNumber: "NSH-1002",
      merchantId: merchant.id,
      customerId: c1.id,
      status: "IN_COURIER",
      source: "FACEBOOK",
      totalAmount: 1300.0 + 80.0,
      subtotal: 1300.0,
      deliveryCharge: 80.0,
      costOfGoods: 560.0,
      packagingCost: 20.0,
      adSpendShare: 110.0,
      netProfit: (1380.0) - (560.0 + 80.0 + 20.0 + 110.0),
      courierName: "PATHAO",
      courierTrackingId: "PT-442299",
      courierStatus: "in_transit",
      fraudScore: 5,
      items: {
        create: [
          {
            productId: p1.id,
            quantity: 2,
            unitPrice: 650.0,
            totalPrice: 1300.0,
          },
        ],
      },
    },
  });

  // Order 3: Pending Confirmation (Medium Risk - Trigger Call)
  const o3 = await prisma.order.create({
    data: {
      orderNumber: "NSH-1003",
      merchantId: merchant.id,
      customerId: c2.id,
      status: "PENDING",
      source: "WEBSITE",
      totalAmount: 650.0 + 80.0,
      subtotal: 650.0,
      deliveryCharge: 80.0,
      costOfGoods: 280.0,
      packagingCost: 15.0,
      adSpendShare: 90.0,
      netProfit: 730.0 - (280.0 + 80.0 + 15.0 + 90.0),
      fraudScore: 52,
      fraudReason: "কাস্টমারের ৫০% পার্সেল রিটার্নের পূর্ববর্তী রেকর্ড আছে। কল দিয়ে কনফার্ম করুন।",
      items: {
        create: [
          {
            productId: p1.id,
            quantity: 1,
            unitPrice: 650.0,
            totalPrice: 650.0,
          },
        ],
      },
    },
  });

  // Order 4: High Risk (Suspected Fake / Returner)
  await prisma.order.create({
    data: {
      orderNumber: "NSH-1004",
      merchantId: merchant.id,
      customerId: c3.id,
      status: "PENDING",
      source: "WEBSITE",
      totalAmount: 1450.0 + 120.0,
      subtotal: 1450.0,
      deliveryCharge: 120.0,
      costOfGoods: 650.0,
      packagingCost: 20.0,
      adSpendShare: 120.0,
      netProfit: 0.0,
      fraudScore: 88,
      fraudReason: "উচ্চ ঝুঁকি! কুরিয়ার ডেটাবেসে ৭টি পার্সেলের মধ্যে ৬টিই রিটার্ন করেছে। অগ্রিম ডেলিভারি চার্জ ছাড়া পাঠাবেন না।",
      items: {
        create: [
          {
            productId: p2.id,
            quantity: 1,
            unitPrice: 1450.0,
            totalPrice: 1450.0,
          },
        ],
      },
    },
  });

  // Order 5: Incomplete Drop-off (Customer entered phone and address, but left before order submit)
  await prisma.order.create({
    data: {
      orderNumber: "NSH-INCOMPLETE-01",
      merchantId: merchant.id,
      customerId: c4.id,
      status: "INCOMPLETE",
      source: "INCOMPLETE_DROP",
      totalAmount: 650.0 + 120.0,
      subtotal: 650.0,
      deliveryCharge: 120.0,
      costOfGoods: 280.0,
      packagingCost: 15.0,
      adSpendShare: 80.0,
      netProfit: 0.0,
      fraudScore: 15,
      customerNotes: "কাস্টমার চেকআউট ফর্মে নাম ও নম্বর লিখে সাবমিট না করে পেজ থেকে বের হয়ে গেছে। WhatsApp রিকভারি মেসেজ পাঠান।",
      items: {
        create: [
          {
            productId: p1.id,
            quantity: 1,
            unitPrice: 650.0,
            totalPrice: 650.0,
          },
        ],
      },
    },
  });

  // 6. AI Ad Campaigns
  await prisma.aiAdCampaign.create({
    data: {
      merchantId: merchant.id,
      productId: p1.id,
      campaignName: "Drop Shoulder T-Shirt - Smart Scale CAPI",
      platform: "META",
      dailyBudget: 1200.0, // 1200 BDT/day
      status: "ACTIVE",
      headline: "গরমের সেরা প্রিমিয়াম ড্রপ শোল্ডার টি-শার্ট | ক্যাশ অন ডেলিভারি",
      generatedCopy: "১০০% প্রিমিয়াম সুতি কম্বড কটন দিয়ে তৈরি! প্রি-শ্রাঙ্ক কালার গ্যারান্টি। আজই অর্ডার করুন এবং সারা দেশে হোম ডেলিভারিতে পান। সীমিত স্টক!",
      targetAudience: "Age 18-35, Fashion Lovers, Online Shoppers (Lookalike 1% of Delivered Customers)",
      totalSpend: 4200.0,
      impressions: 48500,
      clicks: 1820,
      purchases: 32,
      roas: 4.95,
      costPerPurchase: 131.25,
      autoKillEnabled: true,
      autoStockPause: true,
    },
  });

  await prisma.aiAdCampaign.create({
    data: {
      merchantId: merchant.id,
      productId: p3.id,
      campaignName: "ANC Wireless Earbuds Pro",
      platform: "META",
      dailyBudget: 1500.0,
      status: "KILLED_BY_AI",
      headline: "সুপার বাস ও ক্রিস্টাল ক্লিয়ার কলিং ANC Earbuds",
      generatedCopy: "শোরগোলের মাঝেও একদম পরিষ্কার মিউজিক ও কলিং এক্সপেরিয়েন্স।",
      targetAudience: "Tech Enthusiasts, Gadget Lovers, Students",
      totalSpend: 1100.0,
      impressions: 12000,
      clicks: 410,
      purchases: 0,
      roas: 0.0,
      costPerPurchase: 0.0,
      autoKillEnabled: true,
      autoStockPause: true,
      killReason: "স্বয়ংক্রিয়ভাবে বন্ধ: প্রোডাক্টের স্টক শেষ (Stock = 0)। টাকা বাঁচানোর জন্য Nischinto AI ক্যাম্পেইনটি Pause করেছে।",
    },
  });

  // 7. AI Voice Call Log
  await prisma.aiCallLog.create({
    data: {
      merchantId: merchant.id,
      orderId: o3.id,
      phone: c2.phone,
      status: "COMPLETED",
      durationSec: 34,
      cost: 1.5,
      transcript: "AI: আসসালামু আলাইকুম শাকিল ভাই, নিশচিন্ত ফ্যাশন থেকে কল করেছি। আপনি কি আমাদের ড্রপ শোল্ডার টি-শার্ট অর্ডার করেছিলেন?\nCustomer: হ্যাঁ ভাই, করেছিলাম। সাইজ কি L পাওয়া যাবে?\nAI: জ্বি শাকিল ভাই, আপনার জন্য L সাইজ কনফার্ম করে দিচ্ছি। আগামী ২-৩ দিনে মিরপুর ১০ এ ডেলিভারি পাবেন। ধন্যবাদ!\nCustomer: ঠিক আছে ভাই, পাঠিয়ে দিন।",
      customerIntent: "CONFIRMED",
    },
  });

  // 8. Courier Settlement record
  await prisma.courierSettlement.create({
    data: {
      merchantId: merchant.id,
      orderId: o1.id,
      courierName: "STEADFAST",
      consignmentId: "SF-88992211",
      orderNumber: "NSH-1001",
      codAmount: 1530.0,
      deliveryFee: 80.0,
      codFee: 15.3,
      netPayable: 1434.7,
      status: "PAID",
      bankRefNumber: "EBL-NPSB-9872134",
      settledAt: new Date(),
    },
  });

  console.log("Database seeded successfully with Nischinto real-world scenario!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
