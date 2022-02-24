import '../styles/globals.css';
import { SessionProvider } from '@inrupt/solid-ui-react';
import { ChakraProvider } from '@chakra-ui/react';
import Layout from '../components/layout';
import { ProvidePodInterests } from '../lib/podInterests';
import { ProvidePodProfile } from '../lib/podProfile';
import { ProvidePodSpaces } from '../lib/podSpaces';
import { ProvidePodGoals } from '../lib/podGoals';

function MyApp({ Component, pageProps }) {
  return (
    <SessionProvider>
      <ChakraProvider>
        <ProvidePodInterests>
          <ProvidePodSpaces>
            <ProvidePodGoals>
              <ProvidePodProfile>
                <Layout>
                  <Component {...pageProps} />
                </Layout>
              </ProvidePodProfile>
            </ProvidePodGoals>
          </ProvidePodSpaces>
        </ProvidePodInterests>
      </ChakraProvider>
    </SessionProvider>
  );
}

export default MyApp;
