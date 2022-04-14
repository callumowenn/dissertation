import { Center, Image } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Post from '../components/posts/post';
import { usePodGoals } from '../lib/podGoals';
import { usePodProfile } from '../lib/podProfile';
import { getSpace } from '../utils/spaces';

function Slug() {
  const router = useRouter();
  const { slug } = router.query;
  const [images, setImages] = useState([]);
  const space = getSpace(slug);
  const { goals } = usePodGoals();
  const { friendsPosts } = usePodProfile();

  useEffect(async () => {
    setImages([]);
    console.log(friendsPosts);
    if (router.query.slug.slice(0, 6) === 'goals-') {
      console.log('GOALS');
      goals?.forEach((goal, index) => {
        fetch(
          `https://api.unsplash.com/search/photos/?client_id=__hsJ7lBhDSp2PtHtz0WKN5FERm5ddGU0yAOBilnkQk&query=${goal.name}`
        )
          .then((response) => {
            if (response.ok) {
              return response.json();
            }
            throw response;
          })
          .then((data) => {
            console.log(data);
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
    } else if (router.query.slug.slice(0, 7) !== 'friends') {
      console.log('interests');
      console.log(space);
      space?.interests?.forEach((interest, index) => {
        fetch(
          `https://api.unsplash.com/search/photos/?client_id=__hsJ7lBhDSp2PtHtz0WKN5FERm5ddGU0yAOBilnkQk&query=${interest}`
        )
          .then((response) => {
            console.log('got');
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
    }
    return () => {
      setImages([]);
    };
  }, [router.query.slug]);

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
    <Center px="2" pb="20" flexWrap="wrap">
      {router.query.slug.slice(0, 7) === 'friends'
        ? friendsPosts?.map(({ thing, data }, index) => (
            <Post thing={thing} key={index} index={index} data={data} />
          ))
        : shuffle(images)?.map((image) => (
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
  );
}

export default Slug;
