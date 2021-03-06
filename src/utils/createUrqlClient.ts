/*import {
  DeletePostMutationVariables,
  VoteMutationVariables,
} from './../generated/graphql'
import { dedupExchange, fetchExchange, stringifyVariables } from 'urql'
import { cacheExchange, Resolver, Cache } from '@urql/exchange-graphcache'
import {
  LogoutMutation,
  FetchUserQuery,
  FetchUserDocument,
  LoginMutation,
  RegisterMutation,
} from '../generated/graphql'
import { betterUpdateQuery } from './betterUpdateQuery'
import { pipe, tap } from 'wonka'
import { Exchange } from 'urql'
import Router from 'next/router'
import { devtoolsExchange } from '@urql/devtools'
import gql from 'graphql-tag'

const invalidateAllPosts = (cache: Cache) => {
  const allFields = cache.inspectFields('Query')
  const fieldInfos = allFields.filter((field) => field.fieldName === 'posts')
  // invalidate each call
  fieldInfos.forEach((fi) => {
    cache.invalidate('Query', 'posts', fi.arguments || {})
  })
}

// global error handling
export const errorExchange: Exchange = ({ forward }) => (ops$) => {
  return pipe(
    forward(ops$),
    tap(({ error }) => {
      if (error?.message.includes('not authenticated')) {
        Router.replace('/login')
      }
    })
  )
}

// cursor pagination
export const cursorPagination = (): Resolver => {
  return (_parent, fieldArgs, cache, info) => {
    const { parentKey: entityKey, fieldName } = info

    const allFields = cache.inspectFields(entityKey)
    const fieldInfos = allFields.filter((info) => info.fieldName === fieldName)
    const size = fieldInfos.length
    if (size === 0) {
      return undefined
    }

    const fieldKey = `${fieldName}(${stringifyVariables(fieldArgs)})`
    const inCache = cache.resolve(
      cache.resolve(entityKey, fieldKey) as string,
      'posts'
    )
    info.partial = !inCache

    let hasMore = true
    const results: string[] = []
    fieldInfos.forEach((fi) => {
      const key = cache.resolve(entityKey, fi.fieldKey) as string
      const data = cache.resolve(key, 'posts') as string[]
      const _hasMore = cache.resolve(key, 'hasMore')
      if (!_hasMore) {
        hasMore = !hasMore as boolean
      }
      results.push(...data)
    })
    return {
      __typename: 'PaginatedPosts',
      hasMore,
      posts: results,
    }
  }
}

// create urql client
export const createUrqlClient = (ssrExchange: any, ctx: any) => {
  const cookie = ctx?.req?.headers?.cookie ?? ''
  // seems to be a bug with ssr-prepass losing the ctx on client render
  // switch to nullish coalescing op for now

  /*if (isServer()) {
    console.log('ctx: ', ctx.req.headers.cookie)
    cookie = ctx.req.headers.cookie
  }*/
/*
  return {
    url: 'http://localhost:5000/graphql',
    fetchOptions: {
      credentials: 'include' as const,
      headers: cookie
        ? {
            cookie,
          }
        : undefined,
    },
    exchanges: [
      devtoolsExchange,
      dedupExchange,
      cacheExchange({
        keys: {
          PaginatedPosts: () => null,
        },
        resolvers: {
          Query: {
            posts: cursorPagination(),
          },
        },
        updates: {
          Mutation: {
            deletePost: (_result, args, cache, info) => {
              cache.invalidate({
                __typename: 'Post',
                id: (args as DeletePostMutationVariables).id,
              })
            },
            vote: (_result, args, cache, info) => {
              const { postId, value } = args as VoteMutationVariables
              const data = cache.readFragment(
                gql`
                  fragment __ on Post {
                    id
                    points
                    voteStatus
                  }
                `,
                { id: postId } as any
              )
              if (data) {
                if (data.voteStatus === value) return
                const newPoints =
                  (data.points as number) + (!data.voteStatus ? 1 : 2) * value
                cache.writeFragment(
                  gql`
                    fragment __ on Post {
                      points
                      voteStatus
                    }
                  `,
                  { id: postId, points: newPoints, voteStatus: value }
                )
              }
            },
            createPost: (_result, args, cache, info) => {
              invalidateAllPosts(cache)
*/
/*cache.invalidate('Query', 'posts', {
              limit: 10, // must match amount of original cached
            })*/
/*
            },
            logout: (_result, args, cache, info) => {
              betterUpdateQuery<LogoutMutation, FetchUserQuery>(
                cache,
                { query: FetchUserDocument },
                _result,
                () => ({ fetchUser: null })
              )
            },
            login: (_result, args, cache, info) => {
              betterUpdateQuery<LoginMutation, FetchUserQuery>(
                cache,
                { query: FetchUserDocument },
                _result,
                (result, query) => {
                  if (result.login.errors) {
                    return query
                  } else {
                    return { fetchUser: result.login.user }
                  }
                }
              )

              invalidateAllPosts(cache)
            },
            register: (_result, args, cache, info) => {
              betterUpdateQuery<RegisterMutation, FetchUserQuery>(
                cache,
                { query: FetchUserDocument },
                _result,
                (result, query) => {
                  if (result.register.errors) {
                    return query
                  } else {
                    return { fetchUser: result.register.user }
                  }
                }
              )
            },
          },
        },
      }),
      errorExchange,
      ssrExchange,
      fetchExchange,
    ],
  }
}
*/
export const throwaway = null
