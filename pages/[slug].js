import { Center, Image } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { getSpace } from '../utils/spaces';

function Slug() {
  const router = useRouter();
  const { slug } = router.query;
  const [images, setImages] = useState([]);
  const space = getSpace(slug);

  console.log(space);

  useEffect(() => {
    space?.interests.forEach((interest, index) => {
      fetch(
        `https://api.unsplash.com/search/photos/?client_id=__hsJ7lBhDSp2PtHtz0WKN5FERm5ddGU0yAOBilnkQk&query=${interest}`
      )
        .then((response) => {
          if (response.ok) {
            return response.json();
          }
          throw response;
        })
        .then((data) => {
          console.log(data);
          data.results.splice(Math.ceil(space.weightings[index] / 10));
          console.log(data.results);
          setImages((state) => {
            const list = [...state, ...data.results];
            return list;
          });
        })
        .catch((error) => {
          console.log(error);
        });
    });
    return () => {
      setImages([]);
    };
  }, [router.asPath]);

  function shuffle(array) {
    let currentIndex = array.length,
      randomIndex;

    // While there remain elements to shuffle...
    while (currentIndex != 0) {
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
      ];
    }

    return array;
  }

  return (
    <Center
      display="block"
      h="100vh"
      w="100vw"
      overflow="hidden"
      position="relative"
    >
      <Center
        position="absolute"
        w="2000px"
        h="2000px"
        top="50%"
        left="50%"
        transform="translate(-50%, -50%)"
      >
        <Center h="100vh" w="100vw" overflow="scroll" py="24" flexWrap="wrap">
          {shuffle(images)?.map((image) => (
            <Image
              borderRadius="2xl"
              opacity="0.4"
              transition="0.3s"
              cursor="pointer"
              _hover={{
                opacity: 1,
              }}
              m="4"
              w="32"
              src={image?.urls?.small}
              alt={image?.description}
            />
          ))}
        </Center>
      </Center>
    </Center>
  );
}

export default Slug;
