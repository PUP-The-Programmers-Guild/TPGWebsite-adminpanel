import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import {defaultTheme, Provider} from '@adobe/react-spectrum';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider theme={defaultTheme}>
      <Component {...pageProps} />
    </Provider>
  )
}
