import { ChakraProvider, ColorModeProvider } from '@chakra-ui/react'
import theme from '../theme'
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client'
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

const client = new ApolloClient({
  uri: 'http://localhost:5000/graphql',
  cache: apolloCache,
  credentials: 'include',
})

function MyApp(props: { Component: any; pageProps: any }) {
  return (
    <ApolloProvider client={client}>
      <ChakraProvider resetCSS theme={theme}>
        <ColorModeProvider
          options={{
            useSystemColorMode: true,
          }}
        >
          <props.Component {...props.pageProps} />
        </ColorModeProvider>
      </ChakraProvider>
    </ApolloProvider>
  )
}

export default MyApp
