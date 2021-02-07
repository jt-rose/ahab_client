import { withApollo as createWithApollo } from 'next-apollo'
import { InMemoryCache, ApolloClient } from '@apollo/client'
import { PaginatedPosts, Post } from '../generated/graphql'

const apolloCache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        posts: {
          keyArgs: [],
          merge(
            existing: PaginatedPosts | undefined,
            incoming: PaginatedPosts
          ): PaginatedPosts {
            const mergedPosts: Post[] = [
              ...(existing?.posts || []),
              ...incoming.posts,
            ]

            return {
              __typename: incoming.__typename,
              hasMore: incoming.hasMore,
              posts: mergedPosts,

              // {...incoming, posts: ...} also works
            }
          },
        },
      },
    },
  },
})

const apolloClient = new ApolloClient({
  uri: 'http://localhost:5000/graphql',
  cache: apolloCache,
  credentials: 'include',
})

export const withApollo = createWithApollo(apolloClient)
