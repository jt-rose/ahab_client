import { ChakraProvider, ColorModeProvider } from '@chakra-ui/react'
import theme from '../theme'

function MyApp(props: { Component: any; pageProps: any }) {
  return (
    <ChakraProvider resetCSS theme={theme}>
      <ColorModeProvider
        options={{
          useSystemColorMode: true,
        }}
      >
        <props.Component {...props.pageProps} />
      </ColorModeProvider>
    </ChakraProvider>
  )
}

export default MyApp
