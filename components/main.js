import { useSession } from '@inrupt/solid-ui-react';
import { Box } from '@chakra-ui/react';
import Home from './home';
import Login from './login';

function Main() {
  const { session } = useSession();
  return (
    <Box w="100vw" minH="100vh">
      {session.info.isLoggedIn ? <Home /> : <Login />}
    </Box>
  );
}

export default Main;
