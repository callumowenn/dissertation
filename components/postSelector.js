import { Button, Center, Flex, Text } from '@chakra-ui/react';

function PostSelector({ section, elements, state, setState }) {
  console.log(state);
  const isSelected = (el) => {
    try {
      if (state?.find((obj) => obj.name === el.name)) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      if (state.name === el.name) {
        return true;
      } else {
        return false;
      }
    }
  };

  const handleClick = (el) => {
    console.log('called');
    try {
      if (state.find((obj) => obj.name === el.name)) {
        // remove from weightings state
        setState((state) => {
          const list = state.filter((item) => item.name !== el.name);
          return list;
        });
      } else {
        // add with default value 50
        setState((state) => {
          const list = [...state, el];
          return list;
        });
      }
    } catch (error) {
      if (state?.name === el.name) {
        setState(null);
      } else {
        setState(el);
      }
    }
  };
  return (
    <Flex flexDirection="column" mt="2">
      <Text opacity="0.8">{section}</Text>
      <Flex overflowX="scroll">
        <Flex my="2">
          {elements?.map((el) => (
            <Button
              mr="2"
              bg={isSelected(el) ? el.colour : `${el.colour}11`}
              color={isSelected(el) ? 'black' : el.colour}
              _hover=""
              _active=""
              p="8"
              borderRadius="2xl"
              overflow="hidden"
              onClick={() => handleClick(el)}
            >
              <Center pos="relative">
                <Text zIndex="1" fontWeight="semibold">
                  {el.name}
                </Text>
                <Text pos="absolute" right="0" opacity="0.2" fontSize="7xl">
                  {el.emoji}
                </Text>
              </Center>
            </Button>
          ))}
        </Flex>
      </Flex>
    </Flex>
  );
}

export default PostSelector;
