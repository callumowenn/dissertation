import { Button } from '@chakra-ui/react';
import { usePodPosts } from '../../lib/podPosts';

function DeletePostButton({ thing }) {
  const { deletePost } = usePodPosts();
  return (
    <Button
      size="xs"
      mt="4"
      w="24"
      ml="2"
      colorScheme="red"
      onClick={() => deletePost(thing)}
    >
      Delete
    </Button>
  );
}

export default DeletePostButton;
