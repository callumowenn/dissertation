import {
  Button,
  Center,
  Text,
  Modal,
  useDisclosure,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react';
import { usePodSpaces } from '../../lib/podSpaces';
import AddSpaceForm from './addSpaceForm';
import DeleteSpaceButton from './deleteSpaceButton';

function Space({ thing, index }) {
  const { spaces } = usePodSpaces();
  const space = spaces[index];
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Button
        mr="2"
        bg={space.colour}
        color="black"
        _hover=""
        _active=""
        p="8"
        borderRadius="2xl"
        overflow="hidden"
        onClick={onOpen}
      >
        <Center pos="relative">
          <Text zIndex="1" fontWeight="semibold">
            {space.name}
          </Text>
          <Text pos="absolute" right="0" opacity="0.2" fontSize="8xl">
            {space.emoji}
          </Text>
        </Center>
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay backdropFilter="blur(10px)" />
        <ModalContent>
          <ModalHeader>🪐 Space</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <AddSpaceForm space={space} update />
          </ModalBody>
          <ModalFooter mt="8">
            <Button variant="ghost" mr="3" onClick={onClose}>
              Close
            </Button>
            <DeleteSpaceButton thing={thing} onClose={onClose} />
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default Space;
