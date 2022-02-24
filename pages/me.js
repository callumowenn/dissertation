import { Avatar, Button, Center, Text } from '@chakra-ui/react';
import { LogoutButton } from '@inrupt/solid-ui-react';
import GoalsList from '../components/goals/goalsList';
import SpacesList from '../components/spaces/spacesList';
import InterestsList from '../components/interests/interestsList';
import { usePodProfile } from '../lib/podProfile';

function Me() {
  const { name } = usePodProfile();

  return (
    <Center minH="100vh" py="16" flexDirection="column">
      <Avatar size="xl" name={name} />
      <Text mt="2" fontSize="3xl">
        {name}
      </Text>
      <Button my="2" colorScheme="purple">
        <LogoutButton />
      </Button>
      <SpacesList />
      <InterestsList />
      <GoalsList />
    </Center>
  );
}

export default Me;
