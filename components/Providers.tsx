'use client';

import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';
import { ApolloProvider } from '@apollo/client/react';

const link = new HttpLink({
  uri: process.env.NEXT_PUBLIC_API_URL!,
});

const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        characters: {
          keyArgs: ['filter'],
          merge(existing, incoming) {
            if (!existing) return incoming;
            return {
              ...incoming,
              results: [...existing.results, ...incoming.results],
            };
          },
        },
      },
    },
  },
});

const client = new ApolloClient({
  link,
  cache,
});

export function Providers({ children }: { children: React.ReactNode }) {
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
}
