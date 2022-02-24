import { Button, Center, Text } from '@chakra-ui/react';
import { useState } from 'react';
import { usePodSpaces } from '../../lib/podSpaces';
import DeleteSpaceButton from './deleteSpaceButton';

function Space({ thing, index }) {
  const [clicked, setClicked] = useState(false);
  const { spaces } = usePodSpaces();
  const space = spaces[index];

  return (
    <Button
      key={index}
      mr="2"
      bg={space.colour}
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
          {space.name}
        </Text>
        <Text pos="absolute" right="0" opacity="0.2" fontSize="8xl">
          {space.emoji}
        </Text>
      </Center>
      {clicked ? <DeleteSpaceButton thing={thing} /> : null}
    </Button>
  );
}

export default Space;
