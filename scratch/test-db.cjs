const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  try {
    await prisma.$connect();
    console.log("DATABASE_CONNECTION_SUCCESSFUL");
    const count = await prisma.user.count();
    console.log(`Total users in DB: ${count}`);
  } catch (error) {
    console.error("DATABASE_CONNECTION_FAILED", error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
