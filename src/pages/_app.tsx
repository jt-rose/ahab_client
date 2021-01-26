import { ChakraProvider, ColorModeProvider } from '@chakra-ui/react'
import theme from '../theme'
import { NavBar } from '../components/NavBar'

function MyApp(props: { Component: any; pageProps: any }) {
  return (
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
  )
}

export default MyApp
