const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function check() {
  const merchants = await prisma.merchant.findMany();
  console.log('Merchants count:', merchants.length);
  merchants.forEach(m => console.log(' -', m.businessName, '|', m.email, '| Balance:', m.walletBalance));

  const products = await prisma.product.findMany();
  console.log('Products count:', products.length);
  products.forEach(pr => console.log(' -', pr.title, '| Stock:', pr.stock));

  const orders = await prisma.order.findMany();
  console.log('Orders count:', orders.length);
}

check().finally(() => prisma.$disconnect());
