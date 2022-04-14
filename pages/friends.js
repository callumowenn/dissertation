import { Center, Input } from '@chakra-ui/react';
import { useState } from 'react';
import Post from '../components/posts/post';
import { usePodProfile } from '../lib/podProfile';

function Friends() {
  const { friendsPosts } = usePodProfile();
  const [searchText, setSearchText] = useState();
  console.log(friendsPosts);
  return (
    <Center px="2" pb="20" flexWrap="wrap">
      <Input
        placeholder="🔍 Search"
        position="fixed"
        bg="#1a202c"
        boxShadow="lg"
        top="calc(1rem + env(safe-area-inset-top))"
        left="50%"
        transform="translate(-50%, 0)"
        zIndex="99"
        w="40"
        onChange={(e) => setSearchText(e.target.value)}
      ></Input>
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
  );
}

export default Friends;
