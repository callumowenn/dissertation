import { Center, Input } from '@chakra-ui/react';
import { useState } from 'react';
import Post from '../components/posts/post';
import { usePodProfile } from '../lib/podProfile';

function Friends() {
  const { friendsPosts } = usePodProfile();
  const [searchText, setSearchText] = useState();
  console.log(friendsPosts);
  return (
    <Center
      display="block"
      h="100vh"
      w="100vw"
      overflow="hidden"
      position="relative"
    >
      <Input
        placeholder="🔍 Search"
        position="absolute"
        bg="#1a202c"
        boxShadow="lg"
        top="4"
        left="50%"
        transform="translate(-50%, 0)"
        zIndex="99"
        w="40"
        onChange={(e) => setSearchText(e.target.value)}
      ></Input>
      <Center
        position="absolute"
        w="2000px"
        h="2000px"
        top="50%"
        left="50%"
        transform="translate(-50%, -50%)"
      >
        <Center h="100vh" w="100vw" overflow="scroll" p="4" flexWrap="wrap">
          {searchText
            ? friendsPosts
                ?.filter((post) => post.data.interests?.includes(searchText))
                .sort((a, b) => {
                  return b.data.date - a.data.date;
                })
                .map(({ thing, data }, index) => (
                  <Post thing={thing} key={index} index={index} data={data} />
                ))
            : friendsPosts
                .sort((a, b) => {
                  return b.data.date - a.data.date;
                })
                .map(({ thing, data }, index) => (
                  <Post thing={thing} key={index} index={index} data={data} />
                ))}
        </Center>
      </Center>
    </Center>
  );
}

export default Friends;
