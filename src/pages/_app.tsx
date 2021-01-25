import { ChakraProvider, ColorModeProvider } from '@chakra-ui/react'
import { Provider, createClient, dedupExchange, fetchExchange } from 'urql'
import theme from '../theme'
import { NavBar } from '../components/NavBar'
import { cacheExchange, Cache, QueryInput } from '@urql/exchange-graphcache'
import {
  FetchUserDocument,
  FetchUserQuery,
  LoginMutation,
  RegisterMutation,
} from '../generated/graphql'

function betterUpdateQuery<Result, Query>(
  cache: Cache,
  qi: QueryInput,
  result: any,
  fn: (r: Result, q: Query) => Query
) {
  return cache.updateQuery(qi, (data) => fn(result, data as any) as any)
}

const client = createClient({
  url: 'http://localhost:5000/graphql',
  fetchOptions: {
    credentials: 'include',
  },
  exchanges: [
    dedupExchange,
    cacheExchange({
      updates: {
        Mutation: {
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
    fetchExchange,
  ],
})

function MyApp(props: { Component: any; pageProps: any }) {
  return (
    <Provider value={client}>
      <ChakraProvider resetCSS theme={theme}>
        <ColorModeProvider
          options={{
            useSystemColorMode: true,
          }}
        >
          <NavBar />
          <props.Component {...props.pageProps} />
        </ColorModeProvider>
      </ChakraProvider>
    </Provider>
  )
}

export default MyApp
