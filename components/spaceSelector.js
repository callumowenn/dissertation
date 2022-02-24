import { Center, Text } from '@chakra-ui/react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { slugify } from '../utils/spaces';

function SpaceSelector({ space }) {
  const router = useRouter();

  return (
    <Center
      bg={
        router.asPath === `/${slugify(space.name)}`
          ? space.colour
          : `${space.colour}33`
      }
      color={
        router.asPath === `/${slugify(space.name)}` ? 'black' : space.colour
      }
      borderRadius="full"
      overflow="hidden"
      mr="2"
    >
      <Link href={slugify(space.name)}>
        <a>
          <Center
            py="3"
            px="3"
            pos="relative"
            overflow="hidden"
            whiteSpace="nowrap"
          >
            <Text zIndex="1" fontWeight="semibold" fontSize="sm">
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
