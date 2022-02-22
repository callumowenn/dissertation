import { CombinedDataProvider, Text, useSession } from '@inrupt/solid-ui-react';

function Home() {
  const { session } = useSession();
  return (
    <div>
      <CombinedDataProvider
        datasetUrl={session.info.webId}
        thingUrl={session.info.webId}
      >
        <span>You are logged in as: </span>
        <br />
        <Text
          properties={[
            'http://www.w3.org/2006/vcard/ns#fn',
            'http://xmlns.com/foaf/0.1/name',
          ]}
        />
      </CombinedDataProvider>
    </div>
  );
}

export default Home;
