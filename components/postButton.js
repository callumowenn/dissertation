import {
  ArrowBackIcon,
  ArrowForwardIcon,
  AttachmentIcon,
  EditIcon,
} from '@chakra-ui/icons';
import Dropzone, { useDropzone } from 'react-dropzone';
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  useDisclosure,
  IconButton,
  Box,
  Avatar,
  Editable,
  EditableInput,
  EditablePreview,
  Flex,
  Image,
  Center,
  Text,
} from '@chakra-ui/react';
import { usePodProfile } from '../lib/podProfile';
import { useCallback, useState } from 'react';
import PostPreview from './postPreview';
import getImageFromBinary from '../utils/getImage';
import PostSelector from './postSelector';
import { usePodPosts } from '../lib/podPosts';

function PostButton() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { name } = usePodProfile();
  const { addPost } = usePodPosts();
  const [review, setReview] = useState(false);
  const [text, setText] = useState(null);
  const [file, setFile] = useState(null);
  const [interests, setInterests] = useState([]);
  const [privacy, setPrivacy] = useState(null);

  const post = () => {
    let binary = '';
    let typedArray = new Uint8Array(file);
    console.log(typedArray);
    let len = typedArray.byteLength;
    for (let i = 0; i < len; i++) {
      binary += String.fromCharCode(typedArray[i]);
    }
    const base64String = window.btoa(binary);
    console.log({
      text: text,
      file: base64String,
      interests: interests.map((el) => {
        return el.name;
      }),
      privacy: privacy.name,
    });
    addPost({
      text: text,
      file: base64String,
      interests: interests.map((el) => {
        return el.name;
      }),
      privacy: privacy.name,
    });
    console.log('posted');
    onClose();
  };

  const onDrop = useCallback((acceptedFiles) => {
    console.log(acceptedFiles);
    acceptedFiles.forEach((file) => {
      const reader = new FileReader();

      reader.onabort = () => console.log('file reading was aborted');
      reader.onerror = () => console.log('file reading has failed');
      reader.onload = () => {
        // Do whatever you want with the file contents
        const binaryStr = reader.result;
        setFile(binaryStr);
      };
      reader.readAsArrayBuffer(file);
    });
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });
  return (
    <>
      <IconButton
        bg="blackAlpha.400"
        color="whiteAlpha.700"
        p="8"
        mr="4"
        borderRadius="2xl"
        icon={<EditIcon />}
        onClick={onOpen}
        size="lg"
        // color="blackAlpha.800"
        // borderRadius="full"
        zIndex={99}
        // pos="fixed"
        // bottom="68px"
        // right="2"
        // bgGradient="linear(to-l, #84fab0, #8fd3f4)"
        // _hover={{
        //   bgGradient: 'linear(to-l, #84fab0dd, #8fd3f4dd)',
        // }}
        // _active={{
        //   bgGradient: 'linear(to-l, #84fab0bb, #8fd3f4bb)',
        // }}
      >
        Post
      </IconButton>
      <Modal isOpen={isOpen} onClose={onClose} size="full">
        <ModalOverlay />
        <ModalContent
          borderRadius="0"
          backdropFilter="blur(30px)"
          bg="#00000099"
          pt="env(safe-area-inset-top)"
        >
          <ModalHeader>
            <Flex w="full">
              <Button
                mr="auto"
                leftIcon={review ? <ArrowBackIcon /> : null}
                variant="ghost"
                onClick={review ? () => setReview(false) : onClose}
              >
                {review ? 'Back' : 'Close'}
              </Button>
              <Button
                rightIcon={<ArrowForwardIcon />}
                colorScheme="blue"
                ml={3}
                onClick={review ? () => post() : () => setReview(true)}
                disabled={text && file ? false : true}
              >
                Post
              </Button>
            </Flex>
          </ModalHeader>
          <ModalBody>
            {review ? (
              <Flex direction="column">
                <PostPreview text={text} file={file} name={name} />
                <Text
                  fontSize="4xl"
                  color="yellow.300"
                  fontWeight="bold"
                  fontStyle="italic"
                >
                  Post Privacy
                </Text>
                <PostSelector
                  section="Who can see:"
                  elements={[
                    { name: 'Everyone', colour: '#6FA1FF', emoji: '🌍' },
                    { name: 'Friends', colour: '#CD6EFF', emoji: '🕺' },
                  ]}
                  state={privacy}
                  setState={setPrivacy}
                />
                <PostSelector
                  section="Predicted interests:"
                  elements={[
                    { name: 'Nature', colour: '#B7EB8E', emoji: '🌳' },
                    { name: 'Interior Design', colour: '#EBCB8E', emoji: '🪴' },
                    { name: 'Art', colour: '#FF6464', emoji: '🎨' },
                    { name: 'Minimalism', colour: '#8EEBEB', emoji: '🌱' },
                  ]}
                  state={interests}
                  setState={setInterests}
                />
              </Flex>
            ) : (
              <>
                <Flex w="full" gap="4">
                  <Avatar bg="whiteAlpha.400" name={name} />
                  <Box w="full">
                    <Editable
                      placeholder="Type here..."
                      onSubmit={(e) => setText(e)}
                    >
                      <EditablePreview />
                      <EditableInput as="textarea" />
                    </Editable>
                  </Box>
                </Flex>
                <Flex direction="column">
                  <Flex direction="column" {...getRootProps()}>
                    <input {...getInputProps()} />
                    <Center
                      bg={isDragActive ? 'whiteAlpha.300' : 'whiteAlpha.200'}
                      borderRadius="3xl"
                      mt="4"
                      minH="36"
                      p="4"
                      border="dashed 4px #ffffff11"
                      fontSize="4xl"
                      fontWeight="bold"
                      color="whiteAlpha.200"
                    >
                      {isDragActive ? (
                        <>
                          <p>Drop!</p>&nbsp; <AttachmentIcon />
                        </>
                      ) : file ? (
                        <Image
                          src={getImageFromBinary(file)}
                          borderRadius="xl"
                        />
                      ) : (
                        <>
                          <p>Upload file </p>&nbsp; <AttachmentIcon />
                        </>
                      )}
                    </Center>
                  </Flex>
                  {file ? (
                    <Button
                      size="xs"
                      mt="4"
                      alignSelf="center"
                      variant="ghost"
                      onClick={() => setFile(null)}
                    >
                      Remove
                    </Button>
                  ) : null}
                </Flex>
              </>
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}

export default PostButton;
