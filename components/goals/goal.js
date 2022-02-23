import { Button, Text as ChakraText } from '@chakra-ui/react';
import { Text } from '@inrupt/solid-ui-react';
import { useState } from 'react';
// import DeleteInterestButton from './deleteInterestButton';

const TEXT_PREDICATE = 'http://schema.org/text';

function Goal({ keyThing, thing }) {
  const [clicked, setClicked] = useState(false);

  return (
    <Button
      key={keyThing.url}
      mr="2"
      bg="blackAlpha.400"
      p="8"
      borderRadius="2xl"
      onClick={() => setClicked(!clicked)}
    >
      <ChakraText color="whiteAlpha.700" fontWeight="semibold">
        <Text thing={thing} property={TEXT_PREDICATE} />
      </ChakraText>
      {/* {clicked ? <DeleteInterestButton thing={thing} /> : null} */}
    </Button>
  );
}

export default Goal;
