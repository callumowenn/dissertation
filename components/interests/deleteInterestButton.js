import { Button } from '@chakra-ui/react';
import { usePodInterests } from '../../lib/podInterests';

function DeleteInterestButton({ thing }) {
  const { deleteInterest } = usePodInterests();
  return (
    <Button
      size="xs"
      ml="2"
      colorScheme="red"
      onClick={() => deleteInterest(thing)}
    >
      Delete
    </Button>
  );
}

export default DeleteInterestButton;
