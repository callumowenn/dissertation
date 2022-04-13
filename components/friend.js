import { Button, Center, Text } from '@chakra-ui/react';
import { useState } from 'react';
import { usePodProfile } from '../lib/podProfile';
import DeleteInterestButton from './deleteFriendButton';

function Friend({ thing, index }) {
  const [clicked, setClicked] = useState(false);
  const { friends } = usePodProfile();
  const friend = friends[index];
  console.log(friend);

  return (
    <Button
      mr="2"
      bg="whiteAlpha.100"
      color="white"
      _hover=""
      _active=""
      p="8"
      borderRadius="2xl"
      overflow="hidden"
      onClick={() => setClicked(!clicked)}
    >
      <Text zIndex="1">{friend.id}</Text>
      {clicked ? <DeleteInterestButton thing={thing} /> : null}
    </Button>
  );
}

export default Friend;
