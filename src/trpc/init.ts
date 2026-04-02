import * as Sentry from "@sentry/node";
import { auth } from "@clerk/nextjs/server";
import { initTRPC, TRPCError } from "@trpc/server";
import { cache } from "react";
import superjson from "superjson";

export const createTRPCContext = cache(async () => {

    //   @see:https://trpc.io/docs/server/create-context

    return {};
});

// Avoid exporting the entire t-object
// since it's not very descriptive.
// For instance, the use of a t variable
// is common in i18n libraries.
const t = initTRPC.create({
    /**
     * @see https://trpc.io/docs/server/data-transformers
     */
    transformer: superjson,
});

//Base router and procedure helper
export const createTRPCRouter = t.router;
export const createCallerFactory = t.createCallerFactory;
export const baseProcedure = t.procedure.use(async ({ next }) => {
    const { userId } = await auth()

    if (!userId) {
        throw new TRPCError({ code: "UNAUTHORIZED" })
    }
    return next({
        ctx: { userId }
    })
})

//organization procedure - requires userId & orgId
export const orgProcedure = baseProcedure.use(async ({ next }) => {
    const { userId, orgId } = await auth();

    if (!userId) {
        throw new TRPCError({ code: "UNAUTHORIZED" })
    }
    if (!orgId) {
        throw new TRPCError({
            code: "FORBIDDEN",
            message: "Organization required"
        })
    }
    return next({ ctx: { userId, orgId } })
})
