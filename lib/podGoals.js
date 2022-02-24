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
import { getOrCreateGoalsList } from '../utils/dataset';

const STORAGE_PREDICATE = 'http://www.w3.org/ns/pim/space#storage';
const TYPE_PREDICATE = 'http://www.w3.org/1999/02/22-rdf-syntax-ns#type';
const TEXT_PREDICATE = 'http://schema.org/text';
const NAME_PREDICATE = 'http://schema.org/name';
const COLOUR_PREDICATE = 'http://schema.org/color';
const CREATED_PREDICATE = 'http://www.w3.org/2002/12/cal/ical#created';
const CATEGORY_CLASS = 'http://schema.org/category';

const podGoalsContext = createContext();

export function ProvidePodGoals({ children }) {
  const podGoals = useProvidePodGoals();
  return (
    <podGoalsContext.Provider value={podGoals}>
      {children}
    </podGoalsContext.Provider>
  );
}

export const usePodGoals = () => {
  return useContext(podGoalsContext);
};

function useProvidePodGoals() {
  const { session } = useSession();
  const [goalsList, setGoalsList] = useState();

  const allThings = goalsList ? getThingAll(goalsList) : [];

  // array of goal things
  const goalThings = allThings
    .filter((t) => getUrl(t, TYPE_PREDICATE) === CATEGORY_CLASS)
    .map((t) => {
      return { dataset: goalsList, thing: t };
    });

  // array of formatted goal objects
  const goals = goalThings.map((t) => {
    return {
      name: getStringNoLocale(t.thing, NAME_PREDICATE),
      emoji: getStringNoLocale(t.thing, TEXT_PREDICATE),
      colour: getStringNoLocale(t.thing, COLOUR_PREDICATE),
      date: getDatetime(t.thing, CREATED_PREDICATE),
    };
  });

  // add single goal on form submission
  const addGoal = async (text, emoji, colour) => {
    const indexUrl = getSourceUrl(goalsList);
    const goalWithText = addStringNoLocale(createThing(), NAME_PREDICATE, text);
    const goalWithDate = addDatetime(
      goalWithText,
      CREATED_PREDICATE,
      new Date()
    );
    const goalWithEmoji = addStringNoLocale(
      goalWithDate,
      TEXT_PREDICATE,
      emoji
    );
    const goalWithColour = addStringNoLocale(
      goalWithEmoji,
      COLOUR_PREDICATE,
      colour
    );
    const goalWithType = addUrl(goalWithColour, TYPE_PREDICATE, CATEGORY_CLASS);
    const updatedGoalsList = setThing(goalsList, goalWithType);
    const updatedDataset = await saveSolidDatasetAt(
      indexUrl,
      updatedGoalsList,
      {
        fetch: session.fetch,
      }
    );
    setGoalsList(updatedDataset);
  };

  // delete single goal
  const deleteGoal = async (goal) => {
    const goalsUrl = getSourceUrl(goalsList);
    const updatedGoals = removeThing(goalsList, goal);
    const updatedDataset = await saveSolidDatasetAt(goalsUrl, updatedGoals, {
      fetch: session.fetch,
    });
    setGoalsList(updatedDataset);
  };

  // hook to get or create goal list on mount
  useEffect(() => {
    if (!session || !session.info.isLoggedIn) return;
    (async () => {
      const profileDataset = await getSolidDataset(session.info.webId, {
        fetch: session.fetch,
      });
      const profileThing = getThing(profileDataset, session.info.webId);
      const podsUrls = getUrlAll(profileThing, STORAGE_PREDICATE);
      const pod = podsUrls[0];
      const containerUri = `${pod}goals/`;
      const list = await getOrCreateGoalsList(containerUri, session.fetch);
      console.log('use effect');
      console.log(list);
      setGoalsList(list);
    })();
  }, [session, session.info.isLoggedIn]);

  return {
    goalThings,
    goals,
    goalsList,
    setGoalsList,
    addGoal,
    deleteGoal,
  };
}
