import { AppProps } from 'next/app'
import { Provider } from 'react-redux'
import { store } from '../store'
import '../styles/fonts/Roboto/roboto.css'
import '../styles/globals.css'
import { SessionProvider } from 'next-auth/react'

function MyApp ({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <SessionProvider session={session}>
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    </SessionProvider>
  )
}

export default MyApp
