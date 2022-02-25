import { SearchIcon } from '@chakra-ui/icons';
import { FaHome, FaSearch, FaUserAlt } from 'react-icons/fa';
import { Avatar, Flex, IconButton } from '@chakra-ui/react';
import SpaceSelector from './spaceSelector';
import { useSession } from '@inrupt/solid-ui-react';
import Link from 'next/link';
import { usePodProfile } from '../lib/podProfile';
import { usePodSpaces } from '../lib/podSpaces';

function Bar() {
  const { session } = useSession();
  const { name } = usePodProfile();
  const { spaces } = usePodSpaces();

  return (
    <Flex
      pos="fixed"
      bottom="0"
      pb="calc(8px + env(safe-area-inset-bottom))"
      w="100vw"
      px="2"
      pt="2"
      alignItems="center"
      bg="black"
      zIndex={99}
    >
      <IconButton borderRadius="full" bg="black" icon={<FaSearch />} />
      <Link href="/">
        <a>
          <IconButton ml="1" borderRadius="full" bg="black" icon={<FaHome />} />
        </a>
      </Link>
      <Flex mx="1" grow="1" overflowX="scroll" pos="relative">
        <Flex overflowX="scroll">
          <Flex mx="8" my="0">
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
          {session?.info?.isLoggedIn && name ? (
            <Avatar w="40px" h="40px" bg="whiteAlpha.400" name={name} />
          ) : (
            <IconButton borderRadius="full" bg="black" icon={<FaUserAlt />} />
          )}
        </a>
      </Link>
    </Flex>
  );
}

export default Bar;
