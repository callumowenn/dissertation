import { AddIcon } from '@chakra-ui/icons';
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
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
} from '@chakra-ui/react';
import { useSession } from '@inrupt/solid-ui-react';
import { Field, Form, Formik } from 'formik';
import { usePodProfile } from '../lib/podProfile';

function AddFriendButton() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { addFriend } = usePodProfile();
  const { session } = useSession();

  function validateWebId(value) {
    let error;
    if (value.toLowerCase() === session.info.webId.toLowerCase()) {
      error = "You can't add yourself.";
    }
    return error;
  }
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
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay backdropFilter="blur(10px)" />
        <ModalContent>
          <ModalHeader>Add Friend</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Formik
              initialValues={{ webId: '' }}
              onSubmit={({ webId }) => {
                console.log(webId);
                addFriend(webId);
              }}
            >
              {() => (
                <Form>
                  <Field name="webId" validate={validateWebId}>
                    {({ field, form }) => (
                      <FormControl
                        isRequired
                        isInvalid={form.errors.webId && form.touched.webId}
                      >
                        <FormLabel htmlFor="webId">Web ID</FormLabel>
                        <Input
                          {...field}
                          w="400px"
                          id="webId"
                          placeholder="https://pod.inrupt.com/<example>/profile/card#me"
                        />
                        <FormErrorMessage>{form.errors.webId}</FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
                  <Button colorScheme="blue" mt="2" type="submit">
                    Add
                  </Button>
                </Form>
              )}
            </Formik>
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

export default AddFriendButton;
