import { Avatar, Button, Center, Flex, Text } from '@chakra-ui/react';
import { LogoutButton } from '@inrupt/solid-ui-react';
import GoalsList from '../components/goals/goalsList';
import SpacesList from '../components/spaces/spacesList';
import InterestsList from '../components/interests/interestsList';
import { usePodProfile } from '../lib/podProfile';
import PostsList from '../components/posts/postsList';
import FriendsList from '../components/friendsList';

function Me() {
  const { name } = usePodProfile();

  return (
    <Center
      minH="100vh"
      pt="16"
      pb="32"
      flexDirection="column"
      position="relative"
    >
      <Avatar size="xl" bg="whiteAlpha.400" name={name} />
      <Text mt="2" fontSize="3xl">
        {name}
      </Text>
      <Button my="2" colorScheme="purple" size="sm">
        <LogoutButton />
      </Button>
      <PostsList />
      <SpacesList />
      <InterestsList />
      <GoalsList />
      <FriendsList />
    </Center>
  );
}

export default Me;
