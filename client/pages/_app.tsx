import '../styles/globals.css'
import type { AppProps } from 'next/app'
import GlobalContextProvider from '../common/context';
import Layout from '../common/components/Layout';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <GlobalContextProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </GlobalContextProvider>
  );
}

export default MyApp
