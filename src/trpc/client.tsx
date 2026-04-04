'use client';
// ^-- to make sure we can mount the Provider from a server component
import type { QueryClient } from '@tanstack/react-query';
import { QueryClientProvider } from '@tanstack/react-query';
import { createTRPCClient, httpBatchLink } from '@trpc/client';
import { createTRPCContext } from '@trpc/tanstack-react-query';
import { useState } from 'react';
import { getQueryClient as getSharedQueryClient, makeQueryClient } from './query-client';
import type { AppRouter } from './routers/_app';
import superjson from "superjson";

export const { TRPCProvider, useTRPC } = createTRPCContext<AppRouter>();

let browserQueryClient: QueryClient | undefined;

function getQueryClient() {
    if (typeof window === 'undefined') {
        // Server: use cached getter for request-scoped stability
        return getSharedQueryClient();
    }
    // Browser: make a new query client if we don't already have one
    if (!browserQueryClient) browserQueryClient = makeQueryClient();
    return browserQueryClient;
}

function getUrl() {
    const base = (() => {
        if (typeof window !== 'undefined') return '';
        if (process.env.APP_URL) return process.env.APP_URL;
        return 'http://localhost:3000';
    })();
    return `${base}/api/trpc`;
}

export function TRPCReactProvider(
    props: Readonly<{
        children: React.ReactNode;
    }>,
) {
    const queryClient = getQueryClient();
    const [trpcClient] = useState(() =>
        createTRPCClient<AppRouter>({
            links: [
                httpBatchLink({
                    transformer: superjson,
                    url: getUrl(),
                }),
            ],
        }),
    );
    return (
        <QueryClientProvider client={queryClient}>
            <TRPCProvider trpcClient={trpcClient} queryClient={queryClient}>
                {props.children}
            </TRPCProvider>
        </QueryClientProvider>
    );
}