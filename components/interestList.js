import { Center, Flex, Text as ChakraText } from '@chakra-ui/react';
import { Text } from '@inrupt/solid-ui-react';
import { useInterests } from '../lib/interests';
import DeleteButton from './deleteButton';

const TEXT_PREDICATE = 'http://schema.org/text';
const CREATED_PREDICATE = 'http://www.w3.org/2002/12/cal/ical#created';

function InterestList() {
  const { thingsArray } = useInterests();

  if (!thingsArray.length) return null;

  return (
    <Center flexDirection="column" w="90vw" mt="8">
      interests: {thingsArray.length}
      <Flex mt="4" maxW="90vw" overflow="scroll">
        {thingsArray.map(({ thing }) => (
          <ChakraText mr="2" bg="whiteAlpha.200" p="4" borderRadius="2xl">
            <Text thing={thing} property={TEXT_PREDICATE} />
          </ChakraText>
        ))}
      </Flex>
    </Center>
  );
}

export default InterestList;

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
