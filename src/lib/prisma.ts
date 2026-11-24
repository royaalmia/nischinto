import { PrismaClient } from "@prisma/client";

// In-Memory Edge Store for Cloudflare Workers when native SQLite / fs.readdir is unavailable
class EdgeMemoryStore {
  // Start with clean empty store - no fake demo accounts, products, or fake demo orders
  merchants: any[] = [];
  courierConfigs: any[] = [];
  products: any[] = [];
  customers: any[] = [];
  orders: any[] = [];
  campaigns: any[] = [];
  settlements: any[] = [];
  disputes: any[] = [];
  aiCallLogs: any[] = [];
  depositRequests: any[] = [];
  notifications: any[] = [];
  paymentMethods: any[] = [
    {
      id: "pm_bkash",
      method: "BKASH",
      title: "বিকাশ মার্চেন্ট অ্যাকাউন্ট",
      accountType: "MERCHANT",
      accountNumber: "01700-000000",
      instructions: "Make Payment অপশন ব্যবহার করে পেমেন্ট করুন",
      isActive: true,
      isDefault: true,
      createdAt: new Date(),
    },
    {
      id: "pm_nagad",
      method: "NAGAD",
      title: "নগদ পার্সোনাল অ্যাকাউন্ট",
      accountType: "PERSONAL",
      accountNumber: "01800-000000",
      instructions: "Send Money অপশন ব্যবহার করুন",
      isActive: true,
      isDefault: false,
      createdAt: new Date(),
    },
    {
      id: "pm_rocket",
      method: "ROCKET",
      title: "রকেট অ্যাকাউন্ট",
      accountType: "PERSONAL",
      accountNumber: "01900-000000-8",
      instructions: "Send Money অপশন ব্যবহার করুন",
      isActive: true,
      isDefault: false,
      createdAt: new Date(),
    },
    {
      id: "pm_bank",
      method: "BANK",
      title: "ব্র্যাক ব্যাংক পিএলসি (BRAC Bank PLC)",
      accountType: "CURRENT",
      accountNumber: "1501204892019001",
      bankName: "BRAC Bank PLC",
      branchName: "Gulshan Branch, Dhaka",
      routingNumber: "060261726",
      instructions: "হিসাব নাম: Nischinto Technologies Ltd",
      isActive: true,
      isDefault: false,
      createdAt: new Date(),
    },
  ];
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
      else if (modelName === "depositRequest") list = memoryStore.depositRequests;
      else if (modelName === "notification") list = memoryStore.notifications;
      else if (modelName === "paymentMethod") list = memoryStore.paymentMethods;
      else if (modelName === "courierConfig") list = memoryStore.courierConfigs;
      else if (modelName === "aiAdCampaign") list = memoryStore.campaigns;
      else if (modelName === "courierSettlement") list = memoryStore.settlements;
      else if (modelName === "dispute") list = memoryStore.disputes;
      else if (modelName === "aiCallLog") list = memoryStore.aiCallLogs;
      else if (modelName === "depositRequest") list = memoryStore.depositRequests;
      else if (modelName === "notification") list = memoryStore.notifications;
      else if (modelName === "paymentMethod") list = memoryStore.paymentMethods;

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
      else if (modelName === "depositRequest") list = memoryStore.depositRequests;
      else if (modelName === "notification") list = memoryStore.notifications;
      else if (modelName === "paymentMethod") list = memoryStore.paymentMethods;

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
      else if (modelName === "depositRequest") memoryStore.depositRequests.unshift(data);
      else if (modelName === "notification") memoryStore.notifications.unshift(data);
      else if (modelName === "paymentMethod") memoryStore.paymentMethods.unshift(data);

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

    delete: async (args: any = {}) => {
      const where = args?.where || {};
      let list: any[] = [];
      if (modelName === "paymentMethod") list = memoryStore.paymentMethods;
      else if (modelName === "product") list = memoryStore.products;
      const idx = list.findIndex((item) => item.id === where.id);
      if (idx !== -1) {
        return list.splice(idx, 1)[0];
      }
      return { id: where.id };
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
  // Cloudflare Workers / Edge environments do not have native Node fs/SQLite runtime.
  // When no remote database connection is provided (or when SQLite file is used in production),
  // directly use EdgeMemoryStore to prevent any unenv fs.readdir errors.
  const isEdgeWorker =
    typeof process === "undefined" ||
    process.env.NEXT_RUNTIME === "edge" ||
    !process.env.DATABASE_URL ||
    process.env.DATABASE_URL.startsWith("file:");

  if (isEdgeWorker) {
    return new Proxy(
      {},
      {
        get(_target, prop: string) {
          return createModelHandler(prop);
        },
      }
    ) as unknown as PrismaClient;
  }

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
