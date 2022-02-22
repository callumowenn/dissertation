import { Box } from '@chakra-ui/react';
import { useSession } from '@inrupt/solid-ui-react';
import Background from './background';
import Bar from './bar';
import Login from './login';

function Layout({ children }) {
  const { session } = useSession();
  return (
    <>
      <Bar />
      <Box w="100vw" minH="100vh">
        {session.info.isLoggedIn ? <>{children}</> : <Login />}
      </Box>
      <Background />
    </>
  );
}

export default Layout;
