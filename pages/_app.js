import '../styles/globals.css';
import { SessionProvider } from '@inrupt/solid-ui-react';
import { ChakraProvider } from '@chakra-ui/react';
import Layout from '../components/layout';
import { ProvideInterests } from '../lib/interests';

function MyApp({ Component, pageProps }) {
  return (
    <SessionProvider>
      <ChakraProvider>
        <ProvideInterests>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </ProvideInterests>
      </ChakraProvider>
    </SessionProvider>
  );
}

export default MyApp;
