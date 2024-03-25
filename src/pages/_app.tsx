import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import {useRouter} from 'next/router';
import {defaultTheme, Provider} from '@adobe/react-spectrum';

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  return (
    <Provider theme={defaultTheme} router={{navigate: router.push}}>
      <Component {...pageProps} />
    </Provider>
  )
}
