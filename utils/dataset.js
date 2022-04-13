import {
  addDatetime,
  addStringNoLocale,
  addUrl,
  createSolidDataset,
  createThing,
  getSolidDataset,
  getSourceUrl,
  saveSolidDatasetAt,
  setThing,
} from '@inrupt/solid-client';

const TYPE_PREDICATE = 'http://www.w3.org/1999/02/22-rdf-syntax-ns#type';
const TEXT_PREDICATE = 'http://schema.org/text';
const NAME_PREDICATE = 'http://schema.org/name';
const COLOUR_PREDICATE = 'http://schema.org/color';
const CREATED_PREDICATE = 'http://www.w3.org/2002/12/cal/ical#created';
const CATEGORY_CLASS = 'http://schema.org/category';

export async function getOrCreateInterestsList(containerUri, fetch) {
  const indexUrl = `${containerUri}index.ttl`;
  try {
    const interestsList = await getSolidDataset(indexUrl, { fetch });
    return interestsList;
  } catch (error) {
    if (error.statusCode === 404) {
      const interestsList = await saveSolidDatasetAt(
        indexUrl,
        createSolidDataset(),
        {
          fetch,
        }
      );
      return interestsList;
    }
  }
}

export async function getOrCreatePostsList(containerUri, fetch) {
  const indexUrl = `${containerUri}index.ttl`;
  try {
    const postsList = await getSolidDataset(indexUrl, { fetch });
    return postsList;
  } catch (error) {
    if (error.statusCode === 404) {
      const postsList = await saveSolidDatasetAt(
        indexUrl,
        createSolidDataset(),
        {
          fetch,
        }
      );
      return postsList;
    }
  }
}

export async function getOrCreateFriendsList(containerUri, fetch) {
  const indexUrl = `${containerUri}index.ttl`;
  try {
    const friendsList = await getSolidDataset(indexUrl, { fetch });
    return friendsList;
  } catch (error) {
    if (error.statusCode === 404) {
      const friendsList = await saveSolidDatasetAt(
        indexUrl,
        createSolidDataset(),
        {
          fetch,
        }
      );
      return friendsList;
    }
  }
}

export async function getOrCreateGoalsList(containerUri, fetch) {
  const indexUrl = `${containerUri}index.ttl`;
  try {
    const goalsList = await getSolidDataset(indexUrl, { fetch });
    return goalsList;
  } catch (error) {
    if (error.statusCode === 404) {
      const goalsList = await saveSolidDatasetAt(
        indexUrl,
        createSolidDataset(),
        {
          fetch,
        }
      );
      return goalsList;
    }
  }
}

export async function getOrCreateSpacesList(containerUri, fetch) {
  const indexUrl = `${containerUri}index.ttl`;
  try {
    const spacesList = await getSolidDataset(indexUrl, { fetch });
    return spacesList;
  } catch (error) {
    if (error.statusCode === 404) {
      const spacesList = await saveSolidDatasetAt(
        indexUrl,
        createSolidDataset(),
        {
          fetch,
        }
      );
      return spacesList;
      // add default spaces
      // const spacesToReturn = await addDefaultSpaces(spacesList, fetch);
    }
  }
}
// async function addDefaultSpaces(spacesList, fetch) {
//   const indexUrl = getSourceUrl(spacesList);
//   const defaultSpaceOne = addDefaultSpace('Home', '🏡', '#4CEA89');
//   const defaultSpaceTwo = addDefaultSpace('Goals', '🏆', '#F6FF0D');
//   const updatedSpacesList = setThing(
//     setThing(spacesList, defaultSpaceOne),
//     defaultSpaceTwo
//   );
//   const updatedDataset = await saveSolidDatasetAt(indexUrl, updatedSpacesList, {
//     fetch,
//   });
//   return updatedDataset;
// }

// function addDefaultSpace(text, emoji, colour) {
//   const spaceWithText = addStringNoLocale(createThing(), NAME_PREDICATE, text);
//   const spaceWithDate = addDatetime(
//     spaceWithText,
//     CREATED_PREDICATE,
//     new Date()
//   );
//   const spaceWithEmoji = addStringNoLocale(
//     spaceWithDate,
//     TEXT_PREDICATE,
//     emoji
//   );
//   const spaceWithColour = addStringNoLocale(
//     spaceWithEmoji,
//     COLOUR_PREDICATE,
//     colour
//   );
//   return addUrl(spaceWithColour, TYPE_PREDICATE, CATEGORY_CLASS);
// }
