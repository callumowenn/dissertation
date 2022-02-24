import { Button } from '@chakra-ui/react';
import { usePodSpaces } from '../../lib/podSpaces';

function DeleteSpaceButton({ thing }) {
  const { deleteSpace } = usePodSpaces();
  return (
    <Button
      size="xs"
      ml="2"
      colorScheme="red"
      onClick={() => deleteSpace(thing)}
    >
      Delete
    </Button>
  );
}

export default DeleteSpaceButton;
