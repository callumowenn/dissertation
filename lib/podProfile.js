const { createContext, useState, useContext, useEffect } = require('react');
import {
  getSolidDataset,
  getStringNoLocale,
  getThing,
} from '@inrupt/solid-client';
import { useSession } from '@inrupt/solid-ui-react';

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

  // hook to get or create interest list on mount
  useEffect(() => {
    if (!session || !session.info.isLoggedIn) return;
    (async () => {
      const podProfileDataset = await getSolidDataset(session.info.webId, {
        fetch: session.fetch,
      });
      const podProfileThing = getThing(podProfileDataset, session.info.webId);
      setPodProfile(podProfileThing);
      const formattedName = getStringNoLocale(
        podProfileThing,
        'http://xmlns.com/foaf/0.1/name'
      );
      setName(formattedName);
    })();
  }, [session, session.info.isLoggedIn]);

  return {
    name,
    podProfile,
    setPodProfile,
  };
}
