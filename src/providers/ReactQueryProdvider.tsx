'use client';
import {
  MutationCache,
  Query,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      staleTime: 1000 * 60,
    },
  },
  mutationCache: new MutationCache({
    onSuccess: (_data, _variables, _context, mutation) => {
      // Option 1
      const nonStaticQueries = (query: Query) => {
        const defaultStaleTime =
          queryClient.getQueryDefaults(query.queryKey).staleTime ?? 0;
        const staleTimes = query.observers
          .map((observer) => observer.options.staleTime)
          .filter((staleTime) => staleTime !== undefined);
        const staleTime =
          query.getObserversCount() > 0
            ? Math.min(...(staleTimes as number[]))
            : defaultStaleTime;
        return staleTime !== Number.POSITIVE_INFINITY;
      };
      queryClient.invalidateQueries({
        queryKey: mutation.options.mutationKey,
        predicate: nonStaticQueries,
      });

      // option 2
      //   queryClient.invalidateQueries({
      //     predicate: (query) =>
      //       // invalidate all matching tags at once
      //       // or everything if no meta is provided
      //       mutation.meta?.invalidates?.some((queryKey) =>
      //         matchQuery({ queryKey }, query)
      //       ) ?? true,
      //   });
    },
  }),
});

export function ReactQueryProvider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
