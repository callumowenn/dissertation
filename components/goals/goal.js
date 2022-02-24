import { Button, Center, Text } from '@chakra-ui/react';
import { useState } from 'react';
import { usePodGoals } from '../../lib/podGoals';
import DeleteGoalButton from './deleteGoalButton';

function Goal({ thing, index }) {
  const [clicked, setClicked] = useState(false);
  const { goals } = usePodGoals();
  const goal = goals[index];

  return (
    <Button
      key={index}
      mr="2"
      bg={goal.colour}
      color="black"
      _hover=""
      _active=""
      p="8"
      borderRadius="2xl"
      overflow="hidden"
      onClick={() => setClicked(!clicked)}
    >
      <Center pos="relative">
        <Text zIndex="1" fontWeight="semibold">
          {goal.name}
        </Text>
        <Text pos="absolute" right="0" opacity="0.2" fontSize="8xl">
          {goal.emoji}
        </Text>
      </Center>
      {clicked ? <DeleteGoalButton thing={thing} /> : null}
    </Button>
  );
}

export default Goal;
