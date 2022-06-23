import { ChakraProvider } from '@chakra-ui/react'
import { extendTheme } from '@chakra-ui/react'
import '@fontsource/jetbrains-mono';

const theme = extendTheme({
  fonts: {
    body: `'Jetbrains Mono', sans-serif`,
  },
})

function MyApp({ Component, pageProps }) {
  return (
    <>
      <ChakraProvider theme={theme}>
        <Component {...pageProps} />
      </ChakraProvider>
    </>
  )
}

export default MyApp
