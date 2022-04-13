import {
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Text,
} from '@chakra-ui/react';
import { Field, Form, Formik } from 'formik';
import { usePodProfile } from '../lib/podProfile';
import AddFriendButton from './addFriendButton';
import Friend from './friend';

function FriendsList() {
  const { friendThings, addFriend } = usePodProfile();
  return (
    <Flex flexDirection="column" mt="4" w="100vw">
      <Flex px="8">
        <Text
          fontSize="2xl"
          fontWeight="bold"
          display="flex"
          alignItems="center"
        >
          👥 Friends{' '}
        </Text>
        <Text ml="auto" color="whiteAlpha.500" fontSize="xl">
          {friendThings.length}
        </Text>
      </Flex>
      <Flex w="100vw" overflowX="scroll">
        <Flex ml="8" my="2">
          {friendThings?.map(({ thing }, index) => (
            <Friend thing={thing} key={index} index={index} />
          ))}
          <AddFriendButton />
        </Flex>
      </Flex>
    </Flex>
  );
}

export default FriendsList;
