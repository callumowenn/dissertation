import { Flex, Text as ChakraText } from '@chakra-ui/react';
import { usePodInterests } from '../../lib/podInterests';
import AddInterestButton from './addInterestButton';
import Interest from './interest';

function InterestsList() {
  const { interestThings } = usePodInterests();

  return (
    <Flex flexDirection="column" mt="4" w="100vw">
      <Flex px="8">
        <ChakraText
          fontSize="2xl"
          fontWeight="bold"
          display="flex"
          alignItems="center"
        >
          🌱 Interests{' '}
        </ChakraText>
        <ChakraText ml="auto" color="whiteAlpha.500" fontSize="xl">
          {interestThings.length}
        </ChakraText>
      </Flex>
      <Flex w="100vw" overflowX="scroll">
        <Flex ml="8" my="2">
          {interestThings?.map(({ thing }, index) => (
            <Interest thing={thing} key={index} index={index} />
          ))}
          <AddInterestButton />
        </Flex>
      </Flex>
    </Flex>
  );
}

export default InterestsList;
