import { ChakraProvider, ColorModeProvider } from '@chakra-ui/react'
import theme from '../theme'
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client'

const client = new ApolloClient({
  uri: 'http://localhost:5000/graphql',
  cache: new InMemoryCache(),
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
