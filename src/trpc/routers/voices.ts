import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { prisma } from "@/lib/db";
import { createTRPCRouter, orgProcedure } from "../init";

export const voicesRouter = createTRPCRouter({
    getAll: orgProcedure
        .input(z.object({ query: z.string().trim().optional() }).optional())
        .query(async ({ ctx, input }) => {
            console.log("[voices.getAll] Starting query", { orgId: ctx.orgId });
            const searchFilter = input?.query
                ? {
                    OR: [
                        {
                            name: {
                                contains: input.query, mode: "insensitive" as const
                            }
                        },
                        {
                            description: {
                                contains: input.query,
                                mode: "insensitive" as const,
                            },
                        },
                    ],
                }
                : {};

            try {
                const custom = await prisma.voice.findMany({
                    where: {
                        variant: "CUSTOM",
                        orgId: ctx.orgId,
                        ...searchFilter,
                    },
                    orderBy: { createdAt: "desc" },
                    select: {
                        id: true,
                        name: true,
                        description: true,
                        category: true,
                        language: true,
                        variant: true,
                    },
                });

                const system = await prisma.voice.findMany({
                    where: {
                        variant: "SYSTEM",
                        ...searchFilter,
                    },
                    orderBy: { name: "asc" },
                    select: {
                        id: true,
                        name: true,
                        description: true,
                        category: true,
                        language: true,
                        variant: true,
                    },
                });

                console.log("[voices.getAll] Query successful", {
                    customCount: custom.length,
                    systemCount: system.length,
                });
                return { custom, system };
            } catch (err) {
                console.error("[voices.getAll] Query failed:", err);
                throw err;
            }
        }),

    delete: orgProcedure
        .input(z.object({ id: z.string() }))
        .mutation(async ({ ctx, input }) => {
            const voice = await prisma.voice.findUnique({
                where: {
                    id: input.id,
                    variant: "CUSTOM",
                    orgId: ctx.orgId,
                },
                select: { id: true, r2ObjectKey: true },
            });

            if (!voice) {
                throw new TRPCError({
                    code: "NOT_FOUND",
                    message: "Voice not found",
                });
            }

            await prisma.voice.delete({ where: { id: voice.id } });

            if (voice.r2ObjectKey) {
                // In production, consider background jobs, retries, cron jobs etc.
                const { deleteAudio } = await import("@/lib/r2");
                await deleteAudio(voice.r2ObjectKey).catch(() => { });
            }

            return { success: true };
        }),
});
