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
} from '@inrupt/solid-client';
import { useSession } from '@inrupt/solid-ui-react';
import { getOrCreateInterestList } from '../utils/dataset';

const STORAGE_PREDICATE = 'http://www.w3.org/ns/pim/space#storage';
const TODO_CLASS = 'http://www.w3.org/2002/12/cal/ical#Vtodo';
const TYPE_PREDICATE = 'http://www.w3.org/1999/02/22-rdf-syntax-ns#type';
const TEXT_PREDICATE = 'http://schema.org/text';
const CREATED_PREDICATE = 'http://www.w3.org/2002/12/cal/ical#created';
const INTEREST_CLASS = 'http://www.w3.org/2002/12/cal/ical#Vtodo';

const interestsContext = createContext();

export function ProvideInterests({ children }) {
  const interests = useProvideInterests();
  return (
    <interestsContext.Provider value={interests}>
      {children}
    </interestsContext.Provider>
  );
}

export const useInterests = () => {
  return useContext(interestsContext);
};

function useProvideInterests() {
  const { session } = useSession();
  const [interestList, setInterestList] = useState();

  const interestThings = interestList ? getThingAll(interestList) : [];

  const thingsArray = interestThings
    .filter((t) => getUrl(t, TYPE_PREDICATE) === TODO_CLASS)
    .map((t) => {
      return { dataset: interestList, thing: t };
    });

  // add single interest on form submission
  const addInterest = async (text) => {
    const indexUrl = getSourceUrl(interestList);
    const interestWithText = addStringNoLocale(
      createThing(),
      TEXT_PREDICATE,
      text
    );
    const interestWithDate = addDatetime(
      interestWithText,
      CREATED_PREDICATE,
      new Date()
    );
    const interestWithType = addUrl(
      interestWithDate,
      TYPE_PREDICATE,
      INTEREST_CLASS
    );
    const updatedInterestList = setThing(interestList, interestWithType);
    const updatedDataset = await saveSolidDatasetAt(
      indexUrl,
      updatedInterestList,
      {
        fetch: session.fetch,
      }
    );
    setInterestList(updatedDataset);
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
      const list = await getOrCreateInterestList(containerUri, session.fetch);
      setInterestList(list);
    })();
  }, [session, session.info.isLoggedIn]);

  return {
    interestList,
    thingsArray,
    setInterestList,
    addInterest,
  };
}
