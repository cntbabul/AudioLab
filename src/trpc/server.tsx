/* eslint-disable @typescript-eslint/no-explicit-any */
import 'server-only'; // <-- ensure this file cannot be imported from the client
import {
    createTRPCOptionsProxy,
    TRPCQueryOptions
} from '@trpc/tanstack-react-query';
import { createTRPCContext } from './init';
import { getQueryClient } from './query-client';
import { appRouter } from './routers/_app';
import {
    dehydrate,
    HydrationBoundary
} from '@tanstack/react-query';

export const trpc = createTRPCOptionsProxy({
    ctx: createTRPCContext,
    router: appRouter,
    queryClient: getQueryClient,
});

// If your router is on a separate server, pass a client:
// createTRPCOptionsProxy({
//   client: createTRPCClient({
//     links: [httpLink({ url: '...' })],
//   }),
//   queryClient: getQueryClient,
// });

export function HydrateClient(props: { children: React.ReactNode }) {
    const queryClient = getQueryClient();
    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            {props.children}
        </HydrationBoundary>
    );
};

export function prefetch<T extends ReturnType<TRPCQueryOptions<any>>>(
    queryOptions: T,
) {
    const queryClient = getQueryClient();
    if (queryOptions.queryKey[1]?.type === 'infinite') {
        return queryClient.prefetchInfiniteQuery(queryOptions as any);
    } else {
        return queryClient.prefetchQuery(queryOptions);
    }
}