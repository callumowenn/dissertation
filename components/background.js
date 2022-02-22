import { Box, Center, Text } from '@chakra-ui/react';

export default function Background() {
  return (
    <Box w="100vw" h="100vh" pos="fixed" top="0" zIndex="-1">
      <Center
        className="blur"
        w="100vw"
        h="100vh"
        pos="absolute"
        bg="#1a202ccc"
      />
      <Text fontSize="500">🌽</Text>
    </Box>
  );
}
