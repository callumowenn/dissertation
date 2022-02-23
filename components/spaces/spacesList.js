import { Box, Flex, Text as ChakraText } from '@chakra-ui/react';
import AddGoalButton from './addSpaceButton';
import Space from './space';

function SpacesList() {
  return (
    <Flex flexDirection="column" mt="4" w="100vw">
      <Box px="8">
        <ChakraText fontSize="2xl" fontWeight="bold">
          {/* Spaces {thingsArray.length} */}
          🪐 Spaces
        </ChakraText>
      </Box>
      <Flex w="100vw" overflowX="scroll">
        <Flex mx="8" my="2">
          {/* {thingsArray?.map(({ thing }) => (
            <Space keyThing={thing} thing={thing} />
          ))} */}
          <AddGoalButton />
        </Flex>
      </Flex>
    </Flex>
  );
}

export default SpacesList;

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
