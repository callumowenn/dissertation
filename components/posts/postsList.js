import { Flex, Text } from '@chakra-ui/react';
import { usePodPosts } from '../../lib/podPosts';
import Post from './post';
import PostButton from '../postButton';

function PostsList() {
  const { postThings } = usePodPosts();
  return (
    <Flex flexDirection="column" mt="4" w="100vw">
      <Flex px="8">
        <Text
          fontSize="2xl"
          fontWeight="bold"
          display="flex"
          alignItems="center"
        >
          📝 Posts{' '}
        </Text>
        <Text ml="auto" color="whiteAlpha.500" fontSize="xl">
          {postThings.length}
        </Text>
      </Flex>
      <Flex w="100vw" overflowX="scroll">
        <Flex ml="8" my="2">
          <PostButton />
          {postThings?.map(({ thing }, index) => (
            <Post thing={thing} key={index} index={index} />
          ))}
        </Flex>
      </Flex>
    </Flex>
  );
}

export default PostsList;
