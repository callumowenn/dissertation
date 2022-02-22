import { Center } from '@chakra-ui/react';
import { Table, TableColumn } from '@inrupt/solid-ui-react';
import { useInterests } from '../lib/interests';

const TEXT_PREDICATE = 'http://schema.org/text';
const CREATED_PREDICATE = 'http://www.w3.org/2002/12/cal/ical#created';

function InterestList() {
  const { thingsArray } = useInterests();

  if (!thingsArray.length) return null;

  return (
    <Center flexDirection="column" w="90vw" mt="8">
      interests: {thingsArray.length}
      <Table things={thingsArray} width="300px">
        <TableColumn property={TEXT_PREDICATE} header="" />
        <TableColumn
          property={CREATED_PREDICATE}
          dataType="datetime"
          header="Created At"
          body={({ value }) => value.toDateString()}
        />
      </Table>
    </Center>
  );
}

export default InterestList;
