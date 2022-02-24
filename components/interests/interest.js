import { Button, Center, Text } from '@chakra-ui/react';
import { useState } from 'react';
import { useInterests } from '../../lib/interests';
import DeleteInterestButton from './deleteInterestButton';

function Interest({ thing, index }) {
  const [clicked, setClicked] = useState(false);
  const { formattedInterests } = useInterests();

  const interest = formattedInterests[index];

  return (
    <Button
      key={index}
      mr="2"
      bg={interest.colour}
      color="black"
      _hover=""
      _active=""
      p="8"
      borderRadius="2xl"
      overflow="hidden"
      onClick={() => setClicked(!clicked)}
    >
      <Center pos="relative">
        <Text zIndex="1" fontWeight="semibold">
          {interest.name}
        </Text>
        <Text pos="absolute" right="0" opacity="0.2" fontSize="8xl">
          {interest.emoji}
        </Text>
      </Center>
      {clicked ? <DeleteInterestButton thing={thing} /> : null}
    </Button>
  );
}

export default Interest;
