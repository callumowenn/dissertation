import { Button } from '@chakra-ui/react';
import { useThing } from '@inrupt/solid-ui-react';
import { useInterests } from '../lib/interests';

function DeleteButton() {
  const { thing } = useThing();
  const { deleteInterest } = useInterests();
  return (
    <Button size="xs" colorScheme="red" onClick={() => deleteInterest(thing)}>
      Delete
    </Button>
  );
}

export default DeleteButton;
