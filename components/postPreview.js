import { Avatar, Box, Flex, Image, Text } from '@chakra-ui/react';
import getImageFromBinary from '../utils/getImage';

function PostPreview({ text, file, name }) {
  return (
    <Flex
      opacity="0.3"
      p="4"
      borderRadius="3xl"
      bg="whiteAlpha.100"
      transform="translateY(30px)"
    >
      <Avatar bg="whiteAlpha.400" name={name} />
      <Flex ml="2" direction="column">
        <Box mb="2">
          <Text fontWeight="bold">{name}</Text>
          <Text fontWeight="light" opacity="0.8" lineHeight="5">
            {text}
          </Text>
        </Box>
        <Box
          height="200px"
          bg="blackAlpha.300"
          borderRadius="3xl"
          overflow="hidden"
        >
          <Image src={getImageFromBinary(file)} />
        </Box>
      </Flex>
    </Flex>
  );
}

export default PostPreview;
