const { createContext, useState, useContext, useEffect } = require('react');
import {
  access,
  addStringNoLocale,
  addUrl,
  createThing,
  getSolidDataset,
  getSourceUrl,
  getStringNoLocale,
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
      // access.setAgentAccess(
      //   `${pod}posts/index.ttl`,
      //   'https://pod.inrupt.com/cal2/profile/card#me', // webId of the person you want to give access to
      //   { read: true, write: false, append: false, control: false }, // which is of type {read: true, write: false, append false, control: false} or something like that
      //   {
      //     fetch: session.fetch,
      //   }
      // );
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
      access.setAgentAccess(
        `${pod}posts/index.ttl`,
        friends[0]?.id,
        {
          read: true,
        }, // which is of type {read: true, write: false, append false, control: false} or something like that
        {
          fetch: session.fetch,
        }
      );
    })();
  }, [session, session.info.isLoggedIn]);

  return {
    friendThings,
    friends,
    friendsList,
    setFriendsList,
    addFriend,
    deleteFriend,
    name,
    podProfile,
    setPodProfile,
  };
}
