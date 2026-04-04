import * as pg from "pg";
const { Pool } = pg;
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const globalForPrisma = global as unknown as {
    prisma: PrismaClient | undefined;
};

let prisma: PrismaClient;

if (globalForPrisma.prisma) {
    prisma = globalForPrisma.prisma;
} else {
    const pool = new Pool({
        connectionString: process.env.DATABASE_URL,
        max: 10,
        idleTimeoutMillis: 10000,
        connectionTimeoutMillis: 30000,
    });

    pool.on('error', (err) => {
        console.error('Unexpected error on idle pg client', err);
    });

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const adapter = new PrismaPg(pool as any);

    prisma = new PrismaClient({ adapter });

    if (process.env.NODE_ENV !== "production") {
        globalForPrisma.prisma = prisma;
    }
}

export { prisma };

