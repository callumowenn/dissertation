import { Avatar, AvatarBadge, AvatarGroup, Center } from '@chakra-ui/react';

function Home() {
  return (
    <Center h="100vh" flexDirection="column">
      🏡
      <AvatarGroup
        max={3}
        pos="fixed"
        top="calc(1rem + env(safe-area-inset-top))"
      >
        <Avatar
          bg="yellow.300"
          src="https://gravatar.com/avatar/2f643a7982b8cecd34258aac2ab48ff6?s=400&d=robohash&r=x"
        >
          <AvatarBadge boxSize="0.9em" borderWidth="2px" bg="green.400" />
        </Avatar>
        <Avatar name="Segun Adebayo" src="https://bit.ly/sage-adebayo">
          <AvatarBadge boxSize="0.9em" borderWidth="2px" bg="green.400" />
        </Avatar>
        <Avatar
          name="Kent Dodds"
          src="https://avatars.dicebear.com/v2/female/c44c04058c04128e661e8dbf5f86f97a.svg"
        >
          <AvatarBadge boxSize="0.9em" borderWidth="2px" bg="red.400" />
        </Avatar>
        <Avatar name="Prosper Otemuyiwa" src="https://bit.ly/prosper-baba" />
        <Avatar name="Christian Nwamba" src="https://bit.ly/code-beast" />
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </AvatarGroup>
    </Center>
  );
}

export default Home;
