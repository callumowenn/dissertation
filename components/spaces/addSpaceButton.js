import { AddIcon } from '@chakra-ui/icons';
import AddSpaceForm from './addSpaceForm';
import {
  Modal,
  IconButton,
  useDisclosure,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
} from '@chakra-ui/react';

function AddSpaceButton() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <IconButton
        bg="blackAlpha.400"
        color="whiteAlpha.700"
        p="8"
        mr="8"
        borderRadius="2xl"
        onClick={onOpen}
        icon={<AddIcon />}
      />
      {/* popup modal to add interest */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay backdropFilter="blur(10px)" />
        <ModalContent overflow="hidden">
          <ModalHeader>🪐 Add Space</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <AddSpaceForm />
          </ModalBody>
          <ModalFooter>
            <Button variant="ghost" onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default AddSpaceButton;
