import { Button, Center } from '@chakra-ui/react';
import {
  CombinedDataProvider,
  LogoutButton,
  Text,
  useSession,
} from '@inrupt/solid-ui-react';
import AddInterest from '../../components/addInterest';
import InterestList from '../../components/interestList';

function Me() {
  const { session } = useSession();
  return (
    <Center minH="100vh" py="16" flexDirection="column">
      <CombinedDataProvider
        datasetUrl={session.info.webId}
        thingUrl={session.info.webId}
      >
        <span>You are logged in as: </span>
        <Text
          properties={[
            'http://www.w3.org/2006/vcard/ns#fn',
            'http://xmlns.com/foaf/0.1/name',
          ]}
        />
        <InterestList />
        <AddInterest />
      </CombinedDataProvider>
      <Button mt="32" mb="64" colorScheme="purple">
        <LogoutButton />
      </Button>
    </Center>
  );
}

export default Me;
