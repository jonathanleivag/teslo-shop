import { AppProps } from 'next/app'
import '../styles/fonts/Roboto/roboto.css'
import '../styles/globals.css'

function MyApp ({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}

export default MyApp
