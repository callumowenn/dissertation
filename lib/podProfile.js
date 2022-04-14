const { createContext, useState, useContext, useEffect } = require('react');
import {
  access,
  addStringNoLocale,
  addUrl,
  createThing,
  getDatetime,
  getSolidDataset,
  getSourceUrl,
  getStringNoLocale,
  getStringNoLocaleAll,
  getThing,
  getThingAll,
  getUrl,
  getUrlAll,
  removeThing,
  saveSolidDatasetAt,
  setThing,
} from '@inrupt/solid-client';
import { useSession } from '@inrupt/solid-ui-react';
import { getOrCreateFriendsList } from '../utils/dataset';

const STORAGE_PREDICATE = 'http://www.w3.org/ns/pim/space#storage';
const TYPE_PREDICATE = 'http://www.w3.org/1999/02/22-rdf-syntax-ns#type';
const IDENTIFIER_CLASS = 'https://schema.org/identifier';
const PERSON_CLASS = 'https://www.w3.org/ns/activitystreams#Person';
const POST_PREDICATE = 'http://schema.org/SocialMediaPosting';
const TEXT_PREDICATE = 'http://schema.org/text';
const CREATED_PREDICATE = 'http://www.w3.org/2002/12/cal/ical#created';
const CATEGORY_CLASS = 'http://schema.org/category';
const MEDIA_PREDICATE = 'http://schema.org/MediaObject';
const PRIVACY_PREDICATE = 'http://purl.org/dc/terms/accessRights';

const podProfileContext = createContext();

export function ProvidePodProfile({ children }) {
  const podProfile = useProvidePodProfile();
  return (
    <podProfileContext.Provider value={podProfile}>
      {children}
    </podProfileContext.Provider>
  );
}

export const usePodProfile = () => {
  return useContext(podProfileContext);
};

function useProvidePodProfile() {
  const { session } = useSession();
  const [podProfile, setPodProfile] = useState();
  const [name, setName] = useState();
  const [friendsList, setFriendsList] = useState();
  const [friendsPosts, setFriendsPosts] = useState([]);

  const allThings = friendsList ? getThingAll(friendsList) : [];

  // array of friend things
  const friendThings = allThings
    .filter((t) => getUrl(t, TYPE_PREDICATE) === PERSON_CLASS)
    .map((t) => {
      return { dataset: friendsList, thing: t };
    });

  // array of formatted friend objects
  const friends = friendThings.map((t) => {
    return {
      id: getStringNoLocale(t.thing, IDENTIFIER_CLASS),
    };
  });

  const addFriend = async (id) => {
    console.log(id);
    const podsUrls = getUrlAll(podProfile, STORAGE_PREDICATE);
    const pod = podsUrls[0];
    access.setAgentAccess(
      `${pod}posts/index.ttl`,
      id,
      {
        read: true,
      }, // which is of type {read: true, write: false, append false, control: false} or something like that
      {
        fetch: session.fetch,
      }
    );
    const indexUrl = getSourceUrl(friendsList);
    const friendWithId = addStringNoLocale(createThing(), IDENTIFIER_CLASS, id);
    const friendWithType = addUrl(friendWithId, TYPE_PREDICATE, PERSON_CLASS);
    const updatedFriendsList = setThing(friendsList, friendWithType);
    const updatedDataset = await saveSolidDatasetAt(
      indexUrl,
      updatedFriendsList,
      {
        fetch: session.fetch,
      }
    );
    setFriendsList(updatedDataset);
  };

  const deleteFriend = async (friend) => {
    const friendsUrl = getSourceUrl(friendsList);
    const updatedFriends = removeThing(friendsList, friend);
    const updatedDataset = await saveSolidDatasetAt(
      friendsUrl,
      updatedFriends,
      {
        fetch: session.fetch,
      }
    );
    setFriendsList(updatedDataset);
  };

  const getFriendPosts = async (friend) => {
    const friendProfileDataset = await getSolidDataset(friend.id, {
      fetch: session.fetch,
    });
    const friendProfileThing = getThing(friendProfileDataset, friend.id);
    const formattedName = getStringNoLocale(
      friendProfileThing,
      'http://xmlns.com/foaf/0.1/name'
    );
    const podsUrls = getUrlAll(friendProfileThing, STORAGE_PREDICATE);
    const pod = podsUrls[0];
    const containerUri = `${pod}posts/index.ttl`;
    const friendPostsList = await getSolidDataset(containerUri, {
      fetch: session.fetch,
    });
    const allThings = getThingAll(friendPostsList);
    const friendPostThings = allThings
      .filter((t) => getUrl(t, TYPE_PREDICATE) === POST_PREDICATE)
      .map((t) => {
        return { dataset: friendPostsList, thing: t };
      });
    const posts = friendPostThings.map((t) => {
      return {
        thing: t,
        user: friendProfileThing,
        data: {
          text: getStringNoLocale(t.thing, TEXT_PREDICATE),
          date: getDatetime(t.thing, CREATED_PREDICATE),
          file: getStringNoLocale(t.thing, MEDIA_PREDICATE),
          privacy: getStringNoLocale(t.thing, PRIVACY_PREDICATE),
          interests: getStringNoLocaleAll(t.thing, CATEGORY_CLASS),
          name: formattedName,
        },
      };
    });
    posts.forEach((post) => {
      setFriendsPosts((state) => {
        const list = [...state, post];
        return list;
      });
    });
  };

  // hook to get or create friend list on mount
  useEffect(() => {
    if (!session || !session.info.isLoggedIn) return;
    (async () => {
      const podProfileDataset = await getSolidDataset(session.info.webId, {
        fetch: session.fetch,
      });
      const podProfileThing = getThing(podProfileDataset, session.info.webId);
      setPodProfile(podProfileThing);
      const podsUrls = getUrlAll(podProfileThing, STORAGE_PREDICATE);
      const pod = podsUrls[0];
      const containerUri = `${pod}friends/`;
      const list = await getOrCreateFriendsList(containerUri, session.fetch);
      setFriendsList(list);
      const formattedName = getStringNoLocale(
        podProfileThing,
        'http://xmlns.com/foaf/0.1/name'
      );
      setName(formattedName);
      const allThings = getThingAll(list);
      const friendThings = allThings
        .filter((t) => getUrl(t, TYPE_PREDICATE) === PERSON_CLASS)
        .map((t) => {
          return { dataset: list, thing: t };
        });

      // array of formatted friend objects
      const friends = friendThings.map((t) => {
        return {
          id: getStringNoLocale(t.thing, IDENTIFIER_CLASS),
        };
      });
      friends.forEach(async (friend) => {
        access.setAgentAccess(
          `${pod}posts/index.ttl`,
          friend.id,
          {
            read: true,
          }, // which is of type {read: true, write: false, append false, control: false} or something like that
          {
            fetch: session.fetch,
          }
        );
        await getFriendPosts(friend);
      });
    })();
  }, [session, session.info.isLoggedIn]);

  return {
    friendThings,
    friends,
    friendsList,
    setFriendsList,
    addFriend,
    deleteFriend,
    friendsPosts,
    name,
    podProfile,
    setPodProfile,
  };
}
