const { createContext, useState, useContext, useEffect } = require('react');
import {
  getSolidDataset,
  getThing,
  getThingAll,
  getUrl,
  getUrlAll,
  addDatetime,
  addStringNoLocale,
  addUrl,
  createThing,
  getSourceUrl,
  saveSolidDatasetAt,
  setThing,
  removeThing,
  getStringNoLocale,
  getDatetime,
} from '@inrupt/solid-client';
import { useSession } from '@inrupt/solid-ui-react';
import { getOrCreateInterestsList } from '../utils/dataset';

const STORAGE_PREDICATE = 'http://www.w3.org/ns/pim/space#storage';
const TYPE_PREDICATE = 'http://www.w3.org/1999/02/22-rdf-syntax-ns#type';
const TEXT_PREDICATE = 'http://schema.org/text';
const NAME_PREDICATE = 'http://schema.org/name';
const COLOUR_PREDICATE = 'http://schema.org/color';
const CREATED_PREDICATE = 'http://www.w3.org/2002/12/cal/ical#created';
const CATEGORY_CLASS = 'http://schema.org/category';

const podInterestsContext = createContext();

export function ProvidePodInterests({ children }) {
  const podInterests = useProvidePodInterests();
  return (
    <podInterestsContext.Provider value={podInterests}>
      {children}
    </podInterestsContext.Provider>
  );
}

export const usePodInterests = () => {
  return useContext(podInterestsContext);
};

function useProvidePodInterests() {
  const { session } = useSession();
  const [interestsList, setInterestsList] = useState();

  const allThings = interestsList ? getThingAll(interestsList) : [];

  // array of interest things
  const interestThings = allThings
    .filter((t) => getUrl(t, TYPE_PREDICATE) === CATEGORY_CLASS)
    .map((t) => {
      return { dataset: interestsList, thing: t };
    });

  // array of formatted interest objects
  const interests = interestThings.map((t) => {
    return {
      name: getStringNoLocale(t.thing, NAME_PREDICATE),
      emoji: getStringNoLocale(t.thing, TEXT_PREDICATE),
      colour: getStringNoLocale(t.thing, COLOUR_PREDICATE),
      date: getDatetime(t.thing, CREATED_PREDICATE),
    };
  });

  // add single interest on form submission
  const addInterest = async (text, emoji, colour) => {
    const indexUrl = getSourceUrl(interestsList);
    const interestWithText = addStringNoLocale(
      createThing(),
      NAME_PREDICATE,
      text
    );
    const interestWithDate = addDatetime(
      interestWithText,
      CREATED_PREDICATE,
      new Date()
    );
    const interestWithEmoji = addStringNoLocale(
      interestWithDate,
      TEXT_PREDICATE,
      emoji
    );
    const interestWithColour = addStringNoLocale(
      interestWithEmoji,
      COLOUR_PREDICATE,
      colour
    );
    const interestWithType = addUrl(
      interestWithColour,
      TYPE_PREDICATE,
      CATEGORY_CLASS
    );
    const updatedInterestsList = setThing(interestsList, interestWithType);
    const updatedDataset = await saveSolidDatasetAt(
      indexUrl,
      updatedInterestsList,
      {
        fetch: session.fetch,
      }
    );
    setInterestsList(updatedDataset);
  };

  // delete single interest
  const deleteInterest = async (interest) => {
    const interestsUrl = getSourceUrl(interestsList);
    const updatedIntersts = removeThing(interestsList, interest);
    const updatedDataset = await saveSolidDatasetAt(
      interestsUrl,
      updatedIntersts,
      {
        fetch: session.fetch,
      }
    );
    setInterestsList(updatedDataset);
  };

  // hook to get or create interest list on mount
  useEffect(() => {
    if (!session || !session.info.isLoggedIn) return;
    (async () => {
      const profileDataset = await getSolidDataset(session.info.webId, {
        fetch: session.fetch,
      });
      const profileThing = getThing(profileDataset, session.info.webId);
      const podsUrls = getUrlAll(profileThing, STORAGE_PREDICATE);
      const pod = podsUrls[0];
      const containerUri = `${pod}interests/`;
      const list = await getOrCreateInterestsList(containerUri, session.fetch);
      setInterestsList(list);
    })();
  }, [session, session.info.isLoggedIn]);

  return {
    interestThings,
    interests,
    interestsList,
    setInterestsList,
    addInterest,
    deleteInterest,
  };
}
