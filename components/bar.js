import { SearchIcon } from '@chakra-ui/icons';
import { FaUserAlt } from 'react-icons/fa';
import { Avatar, Flex, IconButton } from '@chakra-ui/react';
import SpaceSelector from './spaceSelector';
import { useSession } from '@inrupt/solid-ui-react';
import Link from 'next/link';
import { spaces } from '../spaces';

function Bar() {
  const { session } = useSession();
  return (
    <Flex
      pos="fixed"
      bottom="0"
      w="100vw"
      p="3"
      alignItems="center"
      bg="black"
      zIndex={99}
    >
      <IconButton
        borderRadius="full"
        size="lg"
        bg="black"
        icon={<SearchIcon />}
      />
      <Flex mx="3" grow="1" overflowX="scroll" pos="relative">
        <Flex overflowX="scroll">
          <Flex ml="8" mr="8">
            {spaces.map((space) => (
              <SpaceSelector space={space} />
            ))}
          </Flex>
        </Flex>
        <Flex
          pointerEvents="none"
          pos="absolute"
          w="8"
          h="full"
          zIndex="1"
          bgGradient="linear(to-r, #000000, transparent)"
        ></Flex>
        <Flex
          pointerEvents="none"
          pos="absolute"
          right="0"
          w="8"
          h="full"
          bgGradient="linear(to-l, #000000, transparent)"
          zIndex="1"
        ></Flex>
      </Flex>

      <Link href="/me">
        <a>
          {session.info.isLoggedIn ? (
            <Avatar name="Callum Owen" overflow="hidden" />
          ) : (
            <IconButton
              borderRadius="full"
              size="lg"
              bg="black"
              icon={<FaUserAlt />}
            />
          )}
        </a>
      </Link>
    </Flex>
  );
}

export default Bar;
