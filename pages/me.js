import { Avatar, Button, Center, Flex, Text } from '@chakra-ui/react';
import { LogoutButton } from '@inrupt/solid-ui-react';
import GoalsList from '../components/goals/goalsList';
import SpacesList from '../components/spaces/spacesList';
import InterestsList from '../components/interests/interestsList';
import { usePodProfile } from '../lib/podProfile';
import PostButton from '../components/postButton';
import { usePodPosts } from '../lib/podPosts';
import PostsList from '../components/posts/postsList';

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
      <PostButton />
      <SpacesList />
      <InterestsList />
      <GoalsList />
      <PostsList />
    </Center>
  );
}

export default Me;
