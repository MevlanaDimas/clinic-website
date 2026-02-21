import { PrismaClient } from "@/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

/**
 * Prisma Client Singleton
 * Ensures only one instance of Prisma Client is created even in development with hot reloading
 * Includes logging and optimizations for production
 */

const globalForPrisma = global as unknown as {
  prisma: PrismaClient | undefined;
};

function createPrismaClient(): PrismaClient {
  const adapter = new PrismaPg({
    connectionString: process.env.DATABASE_URL,
  });

  return new PrismaClient({
    adapter,
    ...(process.env.NODE_ENV === "development" && {
      log: [
        {
          emit: "event",
          level: "warn",
        },
        {
          emit: "event",
          level: "error",
        },
      ],
    }),
  });
}

const prisma: PrismaClient = globalForPrisma.prisma ?? createPrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}

// Query logging is configured in the Prisma client options
// Prisma logs will appear in development based on the log configuration above

// Graceful shutdown
if (typeof window === "undefined") {
  process.on("SIGTERM", async () => {
    await prisma.$disconnect();
    process.exit();
  });

  process.on("SIGINT", async () => {
    await prisma.$disconnect();
    process.exit();
  });
}

export default prisma;