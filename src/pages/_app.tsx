import { ChakraProvider, ColorModeProvider } from '@chakra-ui/react'
import { Provider, createClient } from 'urql'
import theme from '../theme'
import { NavBar } from '../components/NavBar'

const client = createClient({
  url: 'http://localhost:5000/graphql',
  fetchOptions: {
    credentials: 'include',
  },
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
