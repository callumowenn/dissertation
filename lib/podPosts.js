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
  addLiteral,
  getStringNoLocaleAll,
} from '@inrupt/solid-client';
import { useSession } from '@inrupt/solid-ui-react';
import { getOrCreatePostsList } from '../utils/dataset';

const STORAGE_PREDICATE = 'http://www.w3.org/ns/pim/space#storage';
const TYPE_PREDICATE = 'http://www.w3.org/1999/02/22-rdf-syntax-ns#type';
const TEXT_PREDICATE = 'http://schema.org/text';
const NAME_PREDICATE = 'http://schema.org/name';
const COLOUR_PREDICATE = 'http://schema.org/color';
const CREATED_PREDICATE = 'http://www.w3.org/2002/12/cal/ical#created';
const CATEGORY_CLASS = 'http://schema.org/category';
const MEDIA_PREDICATE = 'http://schema.org/MediaObject';
const POST_PREDICATE = 'http://schema.org/SocialMediaPosting';
const PRIVACY_PREDICATE = 'http://purl.org/dc/terms/accessRights';

const podPostsContext = createContext();

export function ProvidePodPosts({ children }) {
  const podPosts = useProvidePodPosts();
  return (
    <podPostsContext.Provider value={podPosts}>
      {children}
    </podPostsContext.Provider>
  );
}

export const usePodPosts = () => {
  return useContext(podPostsContext);
};

function useProvidePodPosts() {
  const { session } = useSession();
  const [postsList, setPostsList] = useState();

  const allThings = postsList ? getThingAll(postsList) : [];

  // array of post things
  const postThings = allThings
    .filter((t) => getUrl(t, TYPE_PREDICATE) === POST_PREDICATE)
    .map((t) => {
      return { dataset: postsList, thing: t };
    });

  // array of formatted post objects
  const posts = postThings.map((t) => {
    return {
      text: getStringNoLocale(t.thing, TEXT_PREDICATE),
      date: getDatetime(t.thing, CREATED_PREDICATE),
      file: getStringNoLocale(t.thing, MEDIA_PREDICATE),
      privacy: getStringNoLocale(t.thing, PRIVACY_PREDICATE),
      interests: getStringNoLocaleAll(t.thing, CATEGORY_CLASS),
    };
  });

  // add single post on form submission
  const addPost = async ({ text, file, interests, privacy }) => {
    const indexUrl = getSourceUrl(postsList);
    const postWithText = addStringNoLocale(createThing(), TEXT_PREDICATE, text);
    const postWithDate = addDatetime(
      postWithText,
      CREATED_PREDICATE,
      new Date()
    );
    const postWithFile = addStringNoLocale(postWithDate, MEDIA_PREDICATE, file);
    const postWithPrivacy = addStringNoLocale(
      postWithFile,
      PRIVACY_PREDICATE,
      privacy
    );
    let placeholder = postWithPrivacy;
    interests.forEach((interest) => {
      placeholder = addStringNoLocale(placeholder, CATEGORY_CLASS, interest);
    });
    const postWithType = addUrl(placeholder, TYPE_PREDICATE, POST_PREDICATE);
    const updatedPostsList = setThing(postsList, postWithType);
    const updatedDataset = await saveSolidDatasetAt(
      indexUrl,
      updatedPostsList,
      {
        fetch: session.fetch,
      }
    );
    setPostsList(updatedDataset);
  };

  // delete single post
  const deletePost = async (post) => {
    const postsUrl = getSourceUrl(postsList);
    const updatedPosts = removeThing(postsList, post);
    const updatedDataset = await saveSolidDatasetAt(postsUrl, updatedPosts, {
      fetch: session.fetch,
    });
    setPostsList(updatedDataset);
  };

  // hook to get or create post list on mount
  useEffect(() => {
    if (!session || !session.info.isLoggedIn) return;
    (async () => {
      const profileDataset = await getSolidDataset(session.info.webId, {
        fetch: session.fetch,
      });
      const profileThing = getThing(profileDataset, session.info.webId);
      const podsUrls = getUrlAll(profileThing, STORAGE_PREDICATE);
      const pod = podsUrls[0];
      const containerUri = `${pod}posts/`;
      const list = await getOrCreatePostsList(containerUri, session.fetch);
      setPostsList(list);
    })();
  }, [session, session.info.isLoggedIn]);

  return {
    postThings,
    posts,
    postsList,
    setPostsList,
    addPost,
    deletePost,
  };
}
