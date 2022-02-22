import { Box } from '@chakra-ui/react';
import { useSession } from '@inrupt/solid-ui-react';
import Head from 'next/head';
import Background from './background';
import Bar from './bar';
import Login from './login';

function Layout({ children }) {
  const { session } = useSession();
  return (
    <>
      <Head>
        <title>Dissertation</title>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, viewport-fit=cover"
        />
      </Head>
      <Bar />
      <Box w="100vw" minH="100vh">
        {session?.info?.isLoggedIn ? children : <Login />}
      </Box>
      <Background />
    </>
  );
}

export default Layout;
