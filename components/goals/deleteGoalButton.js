import { Button } from '@chakra-ui/react';
import { usePodGoals } from '../../lib/podGoals';

function DeleteGoalButton({ thing }) {
  const { deleteGoal } = usePodGoals();
  return (
    <Button
      size="xs"
      ml="2"
      colorScheme="red"
      onClick={() => deleteGoal(thing)}
    >
      Delete
    </Button>
  );
}

export default DeleteGoalButton;
