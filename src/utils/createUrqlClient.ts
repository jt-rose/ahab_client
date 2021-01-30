import { dedupExchange, fetchExchange } from 'urql'
import { cacheExchange } from '@urql/exchange-graphcache'
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

export const createUrqlClient = (ssrExchange: any) => ({
  url: 'http://localhost:5000/graphql',
  fetchOptions: {
    credentials: 'include' as const,
  },
  exchanges: [
    dedupExchange,
    cacheExchange({
      updates: {
        Mutation: {
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
})
