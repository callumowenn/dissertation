import { Avatar, Box, Button, Center, Flex, Text } from '@chakra-ui/react';
import { useState } from 'react';
import { usePodPosts } from '../../lib/podPosts';
import { usePodProfile } from '../../lib/podProfile';
import DeletePostButton from './deletePostButton';

function Post({ thing, index }) {
  const [clicked, setClicked] = useState(false);
  const { name } = usePodProfile();
  const { posts } = usePodPosts();
  const post = posts[index];
  console.log(post);

  let date = new Date(post.date);

  return (
    <Flex
      shrink="0"
      h="max"
      mr="4"
      p="4"
      borderRadius="3xl"
      bg="whiteAlpha.50"
      maxW="80"
      onClick={() => setClicked(!clicked)}
    >
      <Avatar bg="whiteAlpha.400" name={name} />
      <Flex ml="2" direction="column">
        <Box mb="2">
          <Flex>
            <Text fontWeight="bold">{name}</Text>
            <Text opacity="0.5" ml="auto">
              {date.toLocaleTimeString().slice(0, -3)}
            </Text>
          </Flex>
          <Text fontWeight="light" opacity="0.8" lineHeight="5">
            {post.text}
          </Text>
        </Box>
        <Box bg="blackAlpha.300" borderRadius="3xl" overflow="hidden">
          <img src={`data:image/png;base64,${post.file}`} />
        </Box>
        {clicked ? <DeletePostButton thing={thing} /> : null}
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
