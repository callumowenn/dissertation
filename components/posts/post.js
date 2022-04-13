import { Avatar, Box, Button, Center, Flex, Text } from '@chakra-ui/react';
import { useState } from 'react';
import { usePodPosts } from '../../lib/podPosts';
import { usePodProfile } from '../../lib/podProfile';
import DeletePostButton from './deletePostButton';

function Post({ thing, index, friendPosts, friendName }) {
  const [clicked, setClicked] = useState(false);
  const { name } = usePodProfile();
  const { posts } = usePodPosts();
  const post = friendPosts ? friendPosts[index] : posts[index];
  console.log(post);

  let date = new Date(post?.date);

  return (
    <Flex
      transform={
        friendPosts
          ? `translate(${
              Math.random() * 100 * (Math.random() > 0.5 ? -1 : 1)
            }px, ${Math.random() * 100 * (Math.random() > 0.5 ? -1 : 1)}px)`
          : null
      }
      backdropFilter="blur(30px)"
      shrink="0"
      h="max"
      mr="4"
      p="4"
      borderRadius="3xl"
      bg="blackAlpha.300"
      maxW="80"
      onClick={friendPosts ? null : () => setClicked(!clicked)}
      onMouseEnter={friendPosts ? () => setClicked(!clicked) : null}
      transition="1s"
    >
      <Avatar bg="whiteAlpha.400" name={friendPosts ? friendName : name} />
      <Flex ml="2" direction="column">
        <Box mb="2">
          <Flex>
            <Text fontWeight="bold">{friendPosts ? friendName : name}</Text>
            <Text opacity="0.5" ml="auto">
              {date.toLocaleTimeString().slice(0, -3)}
            </Text>
          </Flex>
          <Text fontWeight="light" opacity="0.8" lineHeight="5">
            {post?.text}
          </Text>
        </Box>
        <Box bg="blackAlpha.300" borderRadius="3xl" overflow="hidden">
          <img src={`data:image/png;base64,${post?.file}`} />
        </Box>
        {clicked && !friendPosts ? <DeletePostButton thing={thing} /> : null}
      </Flex>
    </Flex>
    // <Button
    //   mr="2"
    //   bg="whiteAlpha.100"
    //   color="black"
    //   _hover=""
    //   _active=""
    //   p="8"
    //   borderRadius="2xl"
    //   overflow="hidden"
    //   onClick={() => setClicked(!clicked)}
    // >
    //   <Center pos="relative">
    //     <Text zIndex="1" fontWeight="semibold">
    //       {post.text}
    //     </Text>
    //   </Center>
    //   {clicked ? <DeletePostButton thing={thing} /> : null}
    // </Button>
  );
}

export default Post;
