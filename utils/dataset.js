import {
  createSolidDataset,
  getSolidDataset,
  saveSolidDatasetAt,
} from '@inrupt/solid-client';

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
    }
  }
}
export async function getOrCreateGoalsList(containerUri, fetch) {
  const indexUrl = `${containerUri}index.ttl`;
  console.log(indexUrl);
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
