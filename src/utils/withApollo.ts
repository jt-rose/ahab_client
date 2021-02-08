import { createWithApollo } from './createWithApollo'
import { InMemoryCache, ApolloClient } from '@apollo/client'
import { PaginatedPosts, Post } from '../generated/graphql'
import { NextPageContext } from 'next'

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

const createClient = (ctx: NextPageContext) =>
  new ApolloClient({
    uri: 'http://localhost:5000/graphql',
    cache: apolloCache,
    credentials: 'include',
    headers: {
      cookie:
        (typeof window === 'undefined' ? ctx.req?.headers.cookie : undefined) ||
        '',
    },
  })

export const withApollo = createWithApollo(createClient)
