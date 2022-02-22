import {
  createSolidDataset,
  getSolidDataset,
  saveSolidDatasetAt,
} from '@inrupt/solid-client';

export async function getOrCreateInterestList(containerUri, fetch) {
  const indexUrl = `${containerUri}index.ttl`;
  try {
    const interestList = await getSolidDataset(indexUrl, { fetch });
    return interestList;
  } catch (error) {
    if (error.statusCode === 404) {
      const interestList = await saveSolidDatasetAt(
        indexUrl,
        createSolidDataset(),
        {
          fetch,
        }
      );
      return interestList;
    }
  }
}
