import { useSession } from '@inrupt/solid-ui-react';
import { sha256 } from 'js-sha256';
import { usePodSpaces } from '../lib/podSpaces';

// spaces array will come from user's pod
// private spaces will require authorized request to access
export const defaultSpaces = [
  {
    emoji: '🏡',
    name: 'Home',
    colour: '#4CEA89',
    // slug: 'home-af64bde-afb983-ebbaf2', // example unique ID with human readable name and unique hash from webID
  },
  {
    emoji: '🏆',
    name: 'Goals',
    colour: '#F6FF0D',
  },
  {
    emoji: '📰',
    name: 'News',
    colour: '#29BBC7',
  },
  {
    emoji: '🕺',
    name: 'Friends',
    colour: '#AE50FF',
  },
  {
    emoji: '💡',
    name: 'Productivity',
    colour: '#FFB50D',
  },
  {
    emoji: '🌞',
    name: 'Positivity',
    colour: '#FF570D',
  },
  {
    emoji: '🌱',
    name: 'Nature',
    colour: '#44EF3D',
  },
];

export function getSpace(slug, path) {
  const { spaces } = usePodSpaces();
  let allSpaces = defaultSpaces.concat(spaces);
  if (path === '/') {
    return allSpaces[0];
  }
  return allSpaces.find((space) => slugify(space.name) === slug);
}

export function slugify(text) {
  const { session } = useSession();
  let placeholder = text
    .replace(/^[^-_a-zA-Z]+/, '')
    .replace(/^-(?:[-0-9]+)/, '-');
  let final = placeholder && placeholder.replace(/[^-_a-zA-Z0-9]+/g, '-');
  if (session.info.webId) {
    final = final + '-' + sha256(`${session.info.webId}`);
  }
  return final.toLowerCase();
}
