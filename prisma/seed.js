const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  console.log("Initializing Nischinto CRM production database (Zero demo accounts)...");

  // Create or verify default Super Admin in database
  const admin = await prisma.merchant.upsert({
    where: { email: "admin@nischinto.app" },
    update: {
      ownerName: "Super Admin",
      businessName: "Nischinto Technologies Admin",
      plan: "SUPER_ADMIN",
      isVerified: true,
      walletBalance: 0.0,
    },
    create: {
      email: "admin@nischinto.app",
      ownerName: "Super Admin",
      businessName: "Nischinto Technologies Admin",
      phone: "01700000000",
      plan: "SUPER_ADMIN",
      isVerified: true,
      walletBalance: 0.0,
      category: "GENERAL",
    },
  });

  console.log("Super Admin verified:", admin.email);
  console.log("No demo accounts created. Ready for real merchant onboarding.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
