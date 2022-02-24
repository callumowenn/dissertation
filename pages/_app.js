import '../styles/globals.css';
import { SessionProvider } from '@inrupt/solid-ui-react';
import { ChakraProvider } from '@chakra-ui/react';
import Layout from '../components/layout';
import { ProvideInterests } from '../lib/interests';
import { ProvidePodProfile } from '../lib/podProfile';

function MyApp({ Component, pageProps }) {
  return (
    <SessionProvider>
      <ChakraProvider>
        <ProvideInterests>
          <ProvidePodProfile>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </ProvidePodProfile>
        </ProvideInterests>
      </ChakraProvider>
    </SessionProvider>
  );
}

export default MyApp;
