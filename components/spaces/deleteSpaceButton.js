import { DeleteIcon } from '@chakra-ui/icons';
import { Button } from '@chakra-ui/react';
import { usePodSpaces } from '../../lib/podSpaces';

function DeleteSpaceButton({ thing, onClose }) {
  const { deleteSpace } = usePodSpaces();
  return (
    <Button
      colorScheme="red"
      leftIcon={<DeleteIcon />}
      onClick={() => {
        onClose();
        deleteSpace(thing);
      }}
    >
      Delete Space
    </Button>
  );
}

export default DeleteSpaceButton;
