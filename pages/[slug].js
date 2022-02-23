import { Center } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { getSpace } from '../spaces';

function Slug() {
  const router = useRouter();
  const { slug } = router.query;
  return (
    <Center h="100vh" flexDirection="column">
      {getSpace(slug).name}
    </Center>
  );
}

export default Slug;
