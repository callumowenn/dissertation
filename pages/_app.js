import '../styles/globals.css';
import { SessionProvider } from '@inrupt/solid-ui-react';
import { ChakraProvider } from '@chakra-ui/react';
import Layout from '../components/layout';

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider>
      <SessionProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </SessionProvider>
    </ChakraProvider>
  );
}

export default MyApp;
