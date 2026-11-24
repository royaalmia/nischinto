const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function cleanDemoData() {
  console.log('Cleaning all demo products, orders and resetting demo merchant...');
  await prisma.orderItem.deleteMany({});
  await prisma.order.deleteMany({});
  await prisma.aiCallLog.deleteMany({});
  await prisma.aiAdCampaign.deleteMany({});
  await prisma.courierSettlement.deleteMany({});
  await prisma.dispute.deleteMany({});
  await prisma.product.deleteMany({});
  await prisma.customer.deleteMany({});
  await prisma.depositRequest.deleteMany({});
  await prisma.notification.deleteMany({});
  await prisma.courierConfig.deleteMany({});
  await prisma.merchant.deleteMany({});

  console.log('All demo data cleared successfully! Database is clean for real merchants.');
}

cleanDemoData().finally(() => prisma.$disconnect());
