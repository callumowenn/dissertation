import { AddIcon } from '@chakra-ui/icons';
import AddInterestForm from './addInterestForm';
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

function AddInterestButton() {
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
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add Interest</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <AddInterestForm />
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

export default AddInterestButton;
