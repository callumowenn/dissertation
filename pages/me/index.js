import { Avatar, Button, Center, Text as ChakraText } from '@chakra-ui/react';
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
        <Avatar size="2xl" /> {/* unsure how to get name into simple string */}
        <ChakraText mt="2" fontSize="3xl">
          <Text
            properties={[
              'http://www.w3.org/2006/vcard/ns#fn',
              'http://xmlns.com/foaf/0.1/name',
            ]}
          />
        </ChakraText>
        <Button my="2" colorScheme="purple">
          <LogoutButton />
        </Button>
        <InterestList
          datasetUrl={session.info.webId}
          thingUrl={session.info.webId}
        />
        <AddInterest />
      </CombinedDataProvider>
    </Center>
  );
}

export default Me;
