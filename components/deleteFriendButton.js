import { Button } from '@chakra-ui/react';
import { usePodProfile } from '../lib/podProfile';

function DeleteFriendButton({ thing }) {
  const { deleteFriend } = usePodProfile();
  return (
    <Button
      size="xs"
      ml="2"
      colorScheme="red"
      onClick={() => deleteFriend(thing)}
    >
      Delete
    </Button>
  );
}

export default DeleteFriendButton;
