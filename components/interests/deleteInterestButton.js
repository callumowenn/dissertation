import { Button } from '@chakra-ui/react';
import { useInterests } from '../../lib/interests';

function DeleteInterestButton({ thing }) {
  const { deleteInterest } = useInterests();
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
