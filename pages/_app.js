import '../styles/globals.css';
import { SessionProvider } from '@inrupt/solid-ui-react';
import { ChakraProvider } from '@chakra-ui/react';
import Layout from '../components/layout';
import { ProvideInterests } from '../lib/interests';

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider>
      <SessionProvider>
        <ProvideInterests>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </ProvideInterests>
      </SessionProvider>
    </ChakraProvider>
  );
}

export default MyApp;
