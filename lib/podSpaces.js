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
  getStringNoLocaleAll,
  addInteger,
  getIntegerAll,
} from '@inrupt/solid-client';
import { useSession } from '@inrupt/solid-ui-react';
import { getOrCreateSpacesList } from '../utils/dataset';

const STORAGE_PREDICATE = 'http://www.w3.org/ns/pim/space#storage';
const TYPE_PREDICATE = 'http://www.w3.org/1999/02/22-rdf-syntax-ns#type';
const TEXT_PREDICATE = 'http://schema.org/text';
const NAME_PREDICATE = 'http://schema.org/name';
const NUMBER_PREDICATE = 'http://schema.org/Number';
const COLOUR_PREDICATE = 'http://schema.org/color';
const CREATED_PREDICATE = 'http://www.w3.org/2002/12/cal/ical#created';
const CATEGORY_CLASS = 'http://schema.org/category';

const podSpacesContext = createContext();

export function ProvidePodSpaces({ children }) {
  const podSpaces = useProvidePodSpaces();
  return (
    <podSpacesContext.Provider value={podSpaces}>
      {children}
    </podSpacesContext.Provider>
  );
}

export const usePodSpaces = () => {
  return useContext(podSpacesContext);
};

function useProvidePodSpaces() {
  const { session } = useSession();
  const [spacesList, setSpacesList] = useState();

  const allThings = spacesList ? getThingAll(spacesList) : [];

  // array of space things
  const spaceThings = allThings
    .filter((t) => getUrl(t, TYPE_PREDICATE) === CATEGORY_CLASS)
    .map((t) => {
      return { dataset: spacesList, thing: t };
    });

  // array of formatted space objects
  const spaces = spaceThings.map((t) => {
    return {
      name: getStringNoLocale(t.thing, NAME_PREDICATE),
      emoji: getStringNoLocale(t.thing, TEXT_PREDICATE),
      colour: getStringNoLocale(t.thing, COLOUR_PREDICATE),
      interests: getStringNoLocaleAll(t.thing, CATEGORY_CLASS),
      weightings: getIntegerAll(t.thing, NUMBER_PREDICATE),
      date: getDatetime(t.thing, CREATED_PREDICATE),
    };
  });

  // add single space on form submission
  const addSpace = async (text, emoji, colour, interests) => {
    const indexUrl = getSourceUrl(spacesList);
    const spaceWithText = addStringNoLocale(
      createThing(),
      NAME_PREDICATE,
      text
    );
    const spaceWithDate = addDatetime(
      spaceWithText,
      CREATED_PREDICATE,
      new Date()
    );
    const spaceWithEmoji = addStringNoLocale(
      spaceWithDate,
      TEXT_PREDICATE,
      emoji
    );
    const spaceWithColour = addStringNoLocale(
      spaceWithEmoji,
      COLOUR_PREDICATE,
      colour
    );
    let placeholder = spaceWithColour;
    interests.forEach((interest) => {
      const spaceWithInterest = addStringNoLocale(
        placeholder,
        CATEGORY_CLASS,
        interest.name
      );
      placeholder = addInteger(
        spaceWithInterest,
        NUMBER_PREDICATE,
        interest.weighting
      );
    });
    const spaceWithType = addUrl(placeholder, TYPE_PREDICATE, CATEGORY_CLASS);
    const updatedSpacesList = setThing(spacesList, spaceWithType);
    const updatedDataset = await saveSolidDatasetAt(
      indexUrl,
      updatedSpacesList,
      {
        fetch: session.fetch,
      }
    );
    setSpacesList(updatedDataset);
  };

  // delete single space
  const deleteSpace = async (space) => {
    const spacesUrl = getSourceUrl(spacesList);
    const updatedSpaces = removeThing(spacesList, space);
    const updatedDataset = await saveSolidDatasetAt(spacesUrl, updatedSpaces, {
      fetch: session.fetch,
    });
    setSpacesList(updatedDataset);
  };

  // hook to get or create space list on mount
  useEffect(() => {
    if (!session || !session.info.isLoggedIn) return;
    (async () => {
      const profileDataset = await getSolidDataset(session.info.webId, {
        fetch: session.fetch,
      });
      const profileThing = getThing(profileDataset, session.info.webId);
      const podsUrls = getUrlAll(profileThing, STORAGE_PREDICATE);
      const pod = podsUrls[0];
      const containerUri = `${pod}spaces/`;
      const list = await getOrCreateSpacesList(containerUri, session.fetch);
      setSpacesList(list);
    })();
  }, [session, session.info.isLoggedIn]);

  return {
    spaceThings,
    spaces,
    spacesList,
    setSpacesList,
    addSpace,
    deleteSpace,
  };
}
