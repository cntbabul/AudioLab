import { TRPCError } from "@trpc/server";
import { createTRPCRouter, orgProcedure } from "../init";

export const billingRouter = createTRPCRouter({
    createCheckout: orgProcedure.mutation(async ({ ctx }) => {
        const [{ polar }, { env }] = await Promise.all([
            import("@/lib/polar"),
            import("@/lib/env"),
        ]);

        const result = await polar.checkouts.create({
            products: [env.POLAR_PRODUCT_ID],
            externalCustomerId: ctx.orgId,
            successUrl: `${env.APP_URL}/dashboard`,
        });

        if (!result.url) {
            throw new TRPCError({
                code: "INTERNAL_SERVER_ERROR",
                message: "Failed to create checkout session",
            });
        }

        return { checkoutUrl: result.url };
    }),

    createPortalSession: orgProcedure.mutation(async ({ ctx }) => {
        const { polar } = await import("@/lib/polar");

        const result = await polar.customerSessions.create({
            externalCustomerId: ctx.orgId,
        });

        if (!result.customerPortalUrl) {
            throw new TRPCError({
                code: "INTERNAL_SERVER_ERROR",
                message: "Failed to create customer portal session",
            });
        }

        return { portalUrl: result.customerPortalUrl };
    }),

    getStatus: orgProcedure.query(async ({ ctx }) => {
        const { polar } = await import("@/lib/polar");

        try {
            const customerState = await polar.customers.getStateExternal({
                externalId: ctx.orgId,
            });

            const hasActiveSubscription =
                (customerState.activeSubscriptions ?? []).length > 0;

            // Sum up estimated costs from all meters across active subscriptions
            let estimatedCostCents = 0;
            for (const sub of customerState.activeSubscriptions ?? []) {
                for (const meter of sub.meters ?? []) {
                    estimatedCostCents += meter.amount ?? 0;
                }
            }

            return {
                hasActiveSubscription,
                customerId: customerState.id,
                estimatedCostCents,
            };
        } catch (err: unknown) {
            // Only return defaults if the customer doesn't exist yet in Polar
            if (err instanceof Error && "statusCode" in err && err.statusCode === 404) {
                return {
                    hasActiveSubscription: false,
                    customerId: null,
                    estimatedCostCents: 0,
                };
            }

            // Re-throw other errors (e.g. auth, network) to avoid misclassifying them
            throw err;
        }
    }),
});
