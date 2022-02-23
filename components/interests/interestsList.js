import { Flex, Text as ChakraText } from '@chakra-ui/react';
import { useInterests } from '../../lib/interests';
import AddInterestButton from './addInterestButton';
import Interest from './interest';

function InterestsList() {
  const { thingsArray } = useInterests();

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
          {thingsArray.length}
        </ChakraText>
      </Flex>
      <Flex w="100vw" overflowX="scroll">
        <Flex mx="8" my="2">
          {thingsArray?.map(({ thing }) => (
            <Interest keyThing={thing} thing={thing} />
          ))}
          <AddInterestButton />
        </Flex>
      </Flex>
    </Flex>
  );
}

export default InterestsList;

// <Table things={thingsArray}>
//<TableColumn property={TEXT_PREDICATE} header="" />
{
  /* <TableColumn
    property={TEXT_PREDICATE}
    header=""
    body={() => <DeleteButton />}
  /> */
}
// </Table>
