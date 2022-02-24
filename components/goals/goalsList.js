import { Flex, Text as ChakraText } from '@chakra-ui/react';
import { usePodGoals } from '../../lib/podGoals';
import AddGoalButton from './addGoalButton';
import Goal from './goal';

function GoalsList() {
  const { goalThings } = usePodGoals();

  return (
    <Flex flexDirection="column" mt="4" w="100vw">
      <Flex px="8">
        <ChakraText
          fontSize="2xl"
          fontWeight="bold"
          display="flex"
          alignItems="center"
        >
          🌟 Goals{' '}
        </ChakraText>
        <ChakraText ml="auto" color="whiteAlpha.500" fontSize="xl">
          {goalThings.length}
        </ChakraText>
      </Flex>
      <Flex w="100vw" overflowX="scroll">
        <Flex ml="8" my="2">
          {goalThings?.map(({ thing }, index) => (
            <Goal thing={thing} index={index} />
          ))}
          <AddGoalButton />
        </Flex>
      </Flex>
    </Flex>
  );
}

export default GoalsList;
