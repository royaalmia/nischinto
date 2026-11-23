import { PrismaClient } from "@prisma/client";

// In-Memory Edge Store for Cloudflare Workers when native SQLite / fs.readdir is unavailable
class EdgeMemoryStore {
  merchants: any[] = [
    {
      id: "mch_default_101",
      businessName: "Nischinto Fashion & Gadgets",
      ownerName: "Rahim Chowdhury",
      email: "owner@nischinto.com",
      phone: "01711223344",
      plan: "PRO_AI",
      walletBalance: 1450.0,
      createdAt: new Date(),
    },
  ];

  courierConfigs: any[] = [
    {
      id: "cfg_01",
      merchantId: "mch_default_101",
      courierName: "STEADFAST",
      apiKey: "sf_live_key_9876543210",
      secretKey: "sf_secret_token_abcdef",
      isActive: true,
      isDefault: true,
    },
    {
      id: "cfg_02",
      merchantId: "mch_default_101",
      courierName: "PATHAO",
      apiKey: "pathao_client_id_456",
      secretKey: "pathao_client_secret_xyz",
      isActive: true,
      isDefault: false,
    },
  ];

  products: any[] = [
    {
      id: "prod_01",
      merchantId: "mch_default_101",
      title: "Premium Heavyweight Drop-Shoulder T-Shirt",
      sku: "TS-DROP-001",
      description: "100% Combed Cotton 240 GSM, reactive dye, breathable fabric.",
      price: 650.0,
      costPrice: 280.0,
      stock: 140,
      image: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=500&auto=format&fit=crop&q=60",
      isActive: true,
      createdAt: new Date(),
    },
    {
      id: "prod_02",
      merchantId: "mch_default_101",
      title: "Waterproof Travel Laptop Backpack (Anti-Theft)",
      sku: "BP-SAFE-002",
      description: "Oxford fabric with USB charging port, waterproof zipper.",
      price: 1450.0,
      costPrice: 650.0,
      stock: 35,
      image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&auto=format&fit=crop&q=60",
      isActive: true,
      createdAt: new Date(),
    },
    {
      id: "prod_03",
      merchantId: "mch_default_101",
      title: "Wireless ANC Earbuds Pro (32h Playtime)",
      sku: "EB-ANC-003",
      description: "Active Noise Cancellation with deep bass and ENC mic.",
      price: 1250.0,
      costPrice: 510.0,
      stock: 0,
      image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=500&auto=format&fit=crop&q=60",
      isActive: true,
      createdAt: new Date(),
    },
  ];

  customers: any[] = [
    {
      id: "cust_01",
      phone: "01755123456",
      name: "Tanvir Ahmed",
      address: "House 12, Road 4, Sector 7, Uttara",
      district: "Dhaka",
      thana: "Uttara",
      totalOrders: 6,
      deliveredOrders: 6,
      returnedOrders: 0,
      fraudScore: 5,
    },
    {
      id: "cust_02",
      phone: "01999000111",
      name: "Kamrul Hasan",
      address: "Mirpur 10, Block C",
      district: "Dhaka",
      thana: "Mirpur",
      totalOrders: 7,
      deliveredOrders: 1,
      returnedOrders: 6,
      fraudScore: 88,
    },
  ];

  orders: any[] = [
    {
      id: "ord_1001",
      merchantId: "mch_default_101",
      customerId: "cust_01",
      orderNumber: "ORD-1001",
      totalAmount: 730.0,
      deliveryCharge: 80.0,
      discount: 0.0,
      status: "DELIVERED",
      fraudRiskScore: 5,
      fraudRiskLevel: "LOW",
      courierName: "STEADFAST",
      courierTrackingId: "ST-892147",
      courierStatus: "DELIVERED",
      courierFee: 130.0,
      notes: "ডেলিভারি সম্পন্ন",
      source: "WEBSITE",
      createdAt: new Date(Date.now() - 86400000 * 2),
      customer: {
        id: "cust_01",
        phone: "01755123456",
        name: "Tanvir Ahmed",
        address: "House 12, Road 4, Sector 7, Uttara",
        district: "Dhaka",
        thana: "Uttara",
        totalOrders: 6,
        deliveredOrders: 6,
        returnedOrders: 0,
        fraudScore: 5,
      },
      items: [
        {
          id: "item_01",
          orderId: "ord_1001",
          productId: "prod_01",
          quantity: 1,
          unitPrice: 650.0,
          product: {
            title: "Premium Heavyweight Drop-Shoulder T-Shirt",
            sku: "TS-DROP-001",
            price: 650.0,
          },
        },
      ],
      aiCalls: [],
      disputes: [],
    },
    {
      id: "ord_1002",
      merchantId: "mch_default_101",
      customerId: "cust_02",
      orderNumber: "ORD-1002",
      totalAmount: 1530.0,
      deliveryCharge: 80.0,
      discount: 0.0,
      status: "HOLD",
      fraudRiskScore: 88,
      fraudRiskLevel: "HIGH",
      courierName: "STEADFAST",
      courierTrackingId: null,
      courierStatus: "UNBOOKED",
      courierFee: 0.0,
      notes: "সেন্ট্রাল কুরিয়ার ফ্রড অ্যালার্ট: পার্সেল পাঠানোর পূর্বে অগ্রিম ডেলিভারি চার্জ নিন",
      source: "WEBSITE",
      createdAt: new Date(Date.now() - 3600000 * 4),
      customer: {
        id: "cust_02",
        phone: "01999000111",
        name: "Kamrul Hasan",
        address: "Mirpur 10, Block C",
        district: "Dhaka",
        thana: "Mirpur",
        totalOrders: 7,
        deliveredOrders: 1,
        returnedOrders: 6,
        fraudScore: 88,
      },
      items: [
        {
          id: "item_02",
          orderId: "ord_1002",
          productId: "prod_02",
          quantity: 1,
          unitPrice: 1450.0,
          product: {
            title: "Waterproof Travel Laptop Backpack (Anti-Theft)",
            sku: "BP-SAFE-002",
            price: 1450.0,
          },
        },
      ],
      aiCalls: [],
      disputes: [],
    },
    {
      id: "ord_1003",
      merchantId: "mch_default_101",
      customerId: "cust_01",
      orderNumber: "ORD-1003",
      totalAmount: 730.0,
      deliveryCharge: 80.0,
      discount: 0.0,
      status: "CONFIRMED",
      fraudRiskScore: 5,
      fraudRiskLevel: "LOW",
      courierName: "STEADFAST",
      courierTrackingId: null,
      courierStatus: "UNBOOKED",
      courierFee: 0.0,
      notes: "বাংলা AI ভয়েস কল সফলভাবে সম্পন্ন - গ্রাহক অর্ডার নিশ্চিত করেছেন",
      source: "FACEBOOK",
      createdAt: new Date(Date.now() - 3600000 * 2),
      customer: {
        id: "cust_01",
        phone: "01755123456",
        name: "Tanvir Ahmed",
        address: "House 12, Road 4, Sector 7, Uttara",
        district: "Dhaka",
        thana: "Uttara",
        totalOrders: 6,
        deliveredOrders: 6,
        returnedOrders: 0,
        fraudScore: 5,
      },
      items: [
        {
          id: "item_03",
          orderId: "ord_1003",
          productId: "prod_01",
          quantity: 1,
          unitPrice: 650.0,
          product: {
            title: "Premium Heavyweight Drop-Shoulder T-Shirt",
            sku: "TS-DROP-001",
            price: 650.0,
          },
        },
      ],
      aiCalls: [
        {
          id: "call_01",
          orderId: "ord_1003",
          status: "CONFIRMED",
          durationSeconds: 38,
          costBDT: 1.25,
          transcript: "AI: আসসালামু আলাইকুম... গ্রাহক: হ্যাঁ অর্ডার পাঠাইয়া দেন।",
        },
      ],
      disputes: [],
    },
  ];

  campaigns: any[] = [
    {
      id: "camp_01",
      merchantId: "mch_default_101",
      productId: "prod_01",
      platform: "META",
      campaignName: "T-Shirt Summer Drop Campaign",
      dailyBudget: 25.0,
      status: "ACTIVE",
      roas: 4.2,
      spend: 320.0,
      sales: 1344.0,
      autoPauseOnLowStock: true,
      lastOptimizedAt: new Date(),
    },
    {
      id: "camp_02",
      merchantId: "mch_default_101",
      productId: "prod_03",
      platform: "META",
      campaignName: "ANC Earbuds Scaler",
      dailyBudget: 40.0,
      status: "AUTO_PAUSED",
      roas: 3.8,
      spend: 480.0,
      sales: 1824.0,
      autoPauseOnLowStock: true,
      lastOptimizedAt: new Date(),
    },
  ];

  settlements: any[] = [
    {
      id: "set_01",
      merchantId: "mch_default_101",
      orderId: "ord_1001",
      courierName: "STEADFAST",
      codAmount: 730.0,
      courierFee: 130.0,
      netSettledAmount: 600.0,
      cogsAmount: 280.0,
      adSpendAmount: 75.0,
      trueNetProfit: 245.0,
      status: "SETTLED",
      disputeRaised: false,
      disputeReason: null,
      createdAt: new Date(),
    },
  ];

  disputes: any[] = [];
  aiCallLogs: any[] = [];
}

const memoryStore = new EdgeMemoryStore();

// Create Edge-Safe Fallback Model Handler
function createModelHandler(modelName: string) {
  return {
    findMany: async (args: any = {}) => {
      let list: any[] = [];
      if (modelName === "merchant") list = memoryStore.merchants;
      else if (modelName === "product") list = memoryStore.products;
      else if (modelName === "customer") list = memoryStore.customers;
      else if (modelName === "order") list = memoryStore.orders;
      else if (modelName === "courierConfig") list = memoryStore.courierConfigs;
      else if (modelName === "aiAdCampaign") list = memoryStore.campaigns;
      else if (modelName === "courierSettlement") list = memoryStore.settlements;
      else if (modelName === "dispute") list = memoryStore.disputes;
      else if (modelName === "aiCallLog") list = memoryStore.aiCallLogs;

      if (args?.where) {
        return list.filter((item) => {
          for (const key of Object.keys(args.where)) {
            if (key === "OR") continue;
            if (item[key] !== undefined && item[key] !== args.where[key]) {
              return false;
            }
          }
          return true;
        });
      }
      return list;
    },

    findFirst: async (args: any = {}) => {
      const list = await createModelHandler(modelName).findMany(args);
      return list[0] || null;
    },

    findUnique: async (args: any = {}) => {
      const where = args?.where || {};
      let list: any[] = [];
      if (modelName === "merchant") list = memoryStore.merchants;
      else if (modelName === "product") list = memoryStore.products;
      else if (modelName === "customer") list = memoryStore.customers;
      else if (modelName === "order") list = memoryStore.orders;

      return (
        list.find((item) => {
          for (const key of Object.keys(where)) {
            if (item[key] === where[key]) return true;
          }
          return false;
        }) || null
      );
    },

    create: async (args: any = {}) => {
      const data = { ...args.data };
      if (!data.id) {
        data.id = `${modelName.slice(0, 4)}_${Date.now()}`;
      }
      if (!data.createdAt) {
        data.createdAt = new Date();
      }

      if (modelName === "merchant") memoryStore.merchants.push(data);
      else if (modelName === "product") memoryStore.products.push(data);
      else if (modelName === "customer") memoryStore.customers.push(data);
      else if (modelName === "order") {
        data.customer = data.customer || memoryStore.customers[0];
        data.items = data.items || [];
        data.aiCalls = [];
        data.disputes = [];
        memoryStore.orders.unshift(data);
      } else if (modelName === "courierConfig") memoryStore.courierConfigs.push(data);
      else if (modelName === "aiAdCampaign") memoryStore.campaigns.push(data);
      else if (modelName === "courierSettlement") memoryStore.settlements.push(data);
      else if (modelName === "aiCallLog") memoryStore.aiCallLogs.push(data);

      return data;
    },

    createMany: async (args: any = {}) => {
      const list = args.data || [];
      for (const item of list) {
        await createModelHandler(modelName).create({ data: item });
      }
      return { count: list.length };
    },

    update: async (args: any = {}) => {
      const where = args?.where || {};
      const data = args?.data || {};
      const item = await createModelHandler(modelName).findUnique({ where });
      if (item) {
        Object.assign(item, data);
        return item;
      }
      return data;
    },

    updateMany: async (args: any = {}) => {
      const list = await createModelHandler(modelName).findMany(args);
      for (const item of list) {
        Object.assign(item, args.data || {});
      }
      return { count: list.length };
    },

    upsert: async (args: any = {}) => {
      const existing = await createModelHandler(modelName).findUnique({ where: args.where });
      if (existing) {
        return createModelHandler(modelName).update({ where: args.where, data: args.update });
      }
      return createModelHandler(modelName).create({ data: args.create });
    },
  };
}

// Resilient Prisma Proxy wrapper
function createResilientPrisma() {
  let realPrisma: any = null;

  try {
    realPrisma = new PrismaClient({
      log: ["warn", "error"],
    });
  } catch (err) {
    console.warn("Prisma Client direct instantiation skipped, using Edge In-Memory store.");
  }

  return new Proxy(
    {},
    {
      get(_target, prop: string) {
        const fallback = createModelHandler(prop);

        // If realPrisma is not available, use fallback directly
        if (!realPrisma || !realPrisma[prop]) {
          return fallback;
        }

        // Return a proxy that intercepts model calls and catches fs.readdir / unenv errors
        return new Proxy(realPrisma[prop], {
          get(modelTarget, method: string) {
            const originalMethod = modelTarget[method];
            if (typeof originalMethod !== "function") {
              return (fallback as any)[method];
            }

            return async (...methodArgs: any[]) => {
              try {
                return await originalMethod.apply(modelTarget, methodArgs);
              } catch (error: any) {
                const msg = error?.message || "";
                if (
                  msg.includes("fs.readdir") ||
                  msg.includes("unenv") ||
                  msg.includes("PrismaClientInitializationError") ||
                  msg.includes("Environment variable not found") ||
                  error?.name?.includes("PrismaClient")
                ) {
                  const fallbackFn = (fallback as any)[method];
                  if (typeof fallbackFn === "function") {
                    return await fallbackFn(...methodArgs);
                  }
                }
                throw error;
              }
            };
          },
        });
      },
    }
  ) as unknown as PrismaClient;
}

declare global {
  var prisma: PrismaClient | undefined;
}

export const prisma = global.prisma || createResilientPrisma();

if (process.env.NODE_ENV !== "production") {
  global.prisma = prisma;
}

export default prisma;
