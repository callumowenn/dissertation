import { Center, Text } from '@chakra-ui/react';
import Link from 'next/link';

function SpaceSelector({ space }) {
  return (
    <Center
      bg={space.selected ? space.colour : `${space.colour}33`}
      color={space.selected ? 'black' : space.colour}
      borderRadius="full"
      overflow="hidden"
      mr="2"
    >
      <Link href="">
        <a>
          <Center py="3" px="4" pos="relative" overflow="hidden">
            <Text zIndex="1" fontWeight="semibold">
              {space.name}
            </Text>
            <Text pos="absolute" right="0" opacity="0.3" fontSize="5xl">
              {space.emoji}
            </Text>
          </Center>
        </a>
      </Link>
    </Center>
  );
}

export default SpaceSelector;
