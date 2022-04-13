import { Center, Text } from '@chakra-ui/react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { slugify } from '../utils/spaces';

function SpaceSelector({ space }) {
  const router = useRouter();
  console.log(router);
  function isActive() {
    if (router.query.code && space.slug === router.pathname) {
      return true;
    }
    if (space.slug === router.asPath) {
      return true;
    } else if (router.asPath === `/${slugify(space.name)}`) {
      return true;
    } else {
      return false;
    }
  }
  return (
    <Center
      bg={isActive() ? space.colour : `${space.colour}33`}
      color={isActive() ? 'black' : space.colour}
      borderRadius="full"
      overflow="hidden"
      mr="2"
    >
      <Link href={space.slug ?? slugify(space.name)}>
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
