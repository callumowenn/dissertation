import { Box, Center, Image } from '@chakra-ui/react';
import {
  getDatetime,
  getSolidDataset,
  getStringNoLocale,
  getStringNoLocaleAll,
  getThing,
  getThingAll,
  getUrl,
  getUrlAll,
} from '@inrupt/solid-client';
import { useSession } from '@inrupt/solid-ui-react';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Post from '../components/posts/post';
import { usePodGoals } from '../lib/podGoals';
import { usePodProfile } from '../lib/podProfile';
import { getSpace } from '../utils/spaces';
const TEXT_PREDICATE = 'http://schema.org/text';
const CREATED_PREDICATE = 'http://www.w3.org/2002/12/cal/ical#created';
const CATEGORY_CLASS = 'http://schema.org/category';
const MEDIA_PREDICATE = 'http://schema.org/MediaObject';
const POST_PREDICATE = 'http://schema.org/SocialMediaPosting';
const PRIVACY_PREDICATE = 'http://purl.org/dc/terms/accessRights';
const STORAGE_PREDICATE = 'http://www.w3.org/ns/pim/space#storage';
const TYPE_PREDICATE = 'http://www.w3.org/1999/02/22-rdf-syntax-ns#type';

function Slug() {
  const router = useRouter();
  const { session } = useSession();
  const { slug } = router.query;
  const [images, setImages] = useState([]);
  const space = getSpace(slug);
  const { goals } = usePodGoals();
  const { friends } = usePodProfile();
  const [friendsPosts, setFriendsPosts] = useState(null);
  const [friendsPostsThings, setFriendsPostsThings] = useState(null);
  const [friendsName, setFriendsName] = useState(null);

  useEffect(async () => {
    setImages([]);
    setFriendsPosts([]);
    setFriendsPostsThings([]);
    if (router.query.slug.slice(0, 6) === 'goals-') {
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
    } else if (router.query.slug.slice(0, 8) !== 'friends-') {
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
    } else {
      const friendProfileDataset = await getSolidDataset(friends[0].id, {
        fetch: session.fetch,
      });
      const friendProfileThing = getThing(friendProfileDataset, friends[0].id);
      const podsUrls = getUrlAll(friendProfileThing, STORAGE_PREDICATE);
      const pod = podsUrls[0];
      const containerUri = `${pod}posts/index.ttl`;
      const friendPostsList = await getSolidDataset(containerUri, {
        fetch: session.fetch,
      });
      const allThings = friendPostsList ? getThingAll(friendPostsList) : [];
      const friendPostThings = allThings
        .filter((t) => getUrl(t, TYPE_PREDICATE) === POST_PREDICATE)
        .map((t) => {
          return { dataset: friendPostsList, thing: t };
        });
      setFriendsPostsThings(friendPostThings);
      const posts = friendPostThings.map((t) => {
        return {
          text: getStringNoLocale(t.thing, TEXT_PREDICATE),
          date: getDatetime(t.thing, CREATED_PREDICATE),
          file: getStringNoLocale(t.thing, MEDIA_PREDICATE),
          privacy: getStringNoLocale(t.thing, PRIVACY_PREDICATE),
          interests: getStringNoLocaleAll(t.thing, CATEGORY_CLASS),
        };
      });
      setFriendsPosts(posts);
      const formattedName = getStringNoLocale(
        friendProfileThing,
        'http://xmlns.com/foaf/0.1/name'
      );
      setFriendsName(formattedName);
    }
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
        <Center h="100vh" w="100vw" overflow="scroll" p="32" flexWrap="wrap">
          {friendsPosts
            ? friendsPostsThings?.map(({ thing }, index) => (
                <Post
                  thing={thing}
                  key={index}
                  index={index}
                  friendPosts={friendsPosts}
                  friendName={friendsName}
                />
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
      </Center>
    </Center>
  );
}

export default Slug;
