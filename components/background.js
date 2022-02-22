import { Box, Center, Text } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { getSpace } from '../spaces';

export default function Background() {
  const router = useRouter();
  const { slug } = router.query;

  console.log(router.asPath);
  return (
    <Box w="100vw" h="100vh" pos="fixed" top="0" zIndex="-1">
      <Center
        className="blur"
        w="100vw"
        h="100vh"
        pos="absolute"
        bg="#1a202ccc"
      />
      <Text fontSize="500">{getSpace(slug, router.asPath)?.emoji ?? '🌽'}</Text>
    </Box>
  );
}
