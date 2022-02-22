import { SearchIcon } from '@chakra-ui/icons';
import { FaUserAlt } from 'react-icons/fa';
import { Avatar, Flex, IconButton, Link } from '@chakra-ui/react';
import SpaceSelector from './spaceSelector';
import { CombinedDataProvider, useSession } from '@inrupt/solid-ui-react';

function Bar() {
  const { session } = useSession();
  return (
    <Flex pos="fixed" bottom="0" w="100vw" p="3" alignItems="center" bg="black">
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
          pos="absolute"
          w="8"
          h="full"
          zIndex="1"
          bgGradient="linear(to-r, #000000, transparent)"
        ></Flex>
        <Flex
          pos="absolute"
          right="0"
          w="8"
          h="full"
          bgGradient="linear(to-l, #000000, transparent)"
          zIndex="1"
        ></Flex>
      </Flex>
      {session.info.isLoggedIn ? (
        <Link href="">
          <a>
            <Avatar name="Callum Owen" overflow="hidden" />
          </a>
        </Link>
      ) : (
        <IconButton
          borderRadius="full"
          size="lg"
          bg="black"
          icon={<FaUserAlt />}
        />
      )}
    </Flex>
  );
}

export default Bar;

// spaces array will come from user's pod
// private spaces will require authorized request to access
const spaces = [
  {
    emoji: '🏡',
    name: 'Home',
    colour: '#4CEA89',
    selected: true,
    slug: 'home-af64bde-afb983-ebbaf2', // example unique ID with human readable name and unique hash from webID
  },
  {
    emoji: '🏆',
    name: 'Goals',
    colour: '#F6FF0D',
  },
  {
    emoji: '📰',
    name: 'News',
    colour: '#29BBC7',
  },
  {
    emoji: '🕺',
    name: 'Friends',
    colour: '#AE50FF',
  },
  {
    emoji: '💡',
    name: 'Productivity',
    colour: '#FFB50D',
  },
  {
    emoji: '🌞',
    name: 'Positivity',
    colour: '#FF570D',
  },
  {
    emoji: '🌱',
    name: 'Nature',
    colour: '#44EF3D',
  },
];
