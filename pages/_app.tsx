import { PayPalScriptProvider } from '@paypal/react-paypal-js'
import { SessionProvider } from 'next-auth/react'
import { AppProps } from 'next/app'
import { Provider } from 'react-redux'
import { store } from '../store'
import '../styles/fonts/Roboto/roboto.css'
import '../styles/globals.css'
import { NEXT_PUBLIC_PAYPAL_CLIENT_ID } from '../utils'

function MyApp ({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <SessionProvider session={session}>
      <PayPalScriptProvider
        options={{ 'client-id': NEXT_PUBLIC_PAYPAL_CLIENT_ID }}
      >
        <Provider store={store}>
          <Component {...pageProps} />
        </Provider>
      </PayPalScriptProvider>
    </SessionProvider>
  )
}

export default MyApp
