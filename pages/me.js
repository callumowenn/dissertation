import { Avatar, Button, Center, Text as ChakraText } from '@chakra-ui/react';
import {
  CombinedDataProvider,
  LogoutButton,
  Text,
  useSession,
} from '@inrupt/solid-ui-react';
import GoalsList from '../components/goals/goalsList';
import SpacesList from '../components/spaces/spacesList';
import InterestsList from '../components/interests/interestsList';

function Me() {
  const { session } = useSession();
  return (
    <Center minH="100vh" py="16" flexDirection="column">
      <CombinedDataProvider
        datasetUrl={session.info.webId}
        thingUrl={session.info.webId}
      >
        <Avatar size="xl" bg="blackAlpha.500" />
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
        <SpacesList
          datasetUrl={session.info.webId}
          thingUrl={session.info.webId}
        />
        <InterestsList
          datasetUrl={session.info.webId}
          thingUrl={session.info.webId}
        />
        <GoalsList
          datasetUrl={session.info.webId}
          thingUrl={session.info.webId}
        />
      </CombinedDataProvider>
    </Center>
  );
}

export default Me;
