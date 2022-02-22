import { LoginButton } from '@inrupt/solid-ui-react';
import { Center, Button, Heading } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { ExternalLinkIcon } from '@chakra-ui/icons';

const authOptions = {
  clientName: "Cal's Dissertation",
};

function Login() {
  const [oidcIssuer, setOidcIssuer] = useState(
    'https://broker.pod.inrupt.com/'
  );
  const [windowLocationHref, setWindowLocationHref] = useState('');

  useEffect(() => {
    setWindowLocationHref(window.location.href);
  });

  // TODO: allow selection of pod provider
  const handleChange = (event) => {
    setOidcIssuer(event.target.value);
  };

  return (
    <Center h="100vh" flexDirection="column">
      <Button colorScheme="purple" leftIcon={<ExternalLinkIcon />}>
        <LoginButton
          oidcIssuer={oidcIssuer}
          redirectUrl={windowLocationHref}
          authOptions={authOptions}
        >
          Connect to your pod
        </LoginButton>
      </Button>
    </Center>
  );
}

export default Login;
