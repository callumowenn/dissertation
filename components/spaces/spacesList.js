import { Flex, Text as ChakraText } from '@chakra-ui/react';
import { usePodSpaces } from '../../lib/podSpaces';
import AddSpaceButton from './addSpaceButton';
import Space from './space';

function SpacesList() {
  const { spaceThings } = usePodSpaces();
  console.log(spaceThings);

  return (
    <Flex flexDirection="column" mt="4" w="100vw">
      <Flex px="8">
        <ChakraText
          fontSize="2xl"
          fontWeight="bold"
          display="flex"
          alignItems="center"
        >
          🪐 Spaces{' '}
        </ChakraText>
        <ChakraText ml="auto" color="whiteAlpha.500" fontSize="xl">
          {spaceThings.length}
        </ChakraText>
      </Flex>
      <Flex w="100vw" overflowX="scroll">
        <Flex ml="8" my="2">
          {spaceThings?.map(({ thing }, index) => (
            <Space thing={thing} key={index} index={index} />
          ))}
          <AddSpaceButton />
        </Flex>
      </Flex>
    </Flex>
  );
}

export default SpacesList;
