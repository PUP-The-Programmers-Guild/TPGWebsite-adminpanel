import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import {useRouter} from 'next/router';
import {defaultTheme, Provider} from '@adobe/react-spectrum';
import { ToastContainer } from '@react-spectrum/toast';
import {I18nProvider, useLocale} from 'react-aria-components';

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  let {locale, direction} = useLocale();
  return (
    <I18nProvider locale={locale}>
      <Provider theme={defaultTheme} router={{navigate: router.push}}>
        <Component {...pageProps} />
        <ToastContainer />
      </Provider>
    </I18nProvider>
  )
}
