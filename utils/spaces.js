import { useSession } from '@inrupt/solid-ui-react';
import { sha256 } from 'js-sha256';
import { usePodSpaces } from '../lib/podSpaces';

export const defaultSpaces = [
  {
    name: 'Home',
    emoji: '🏡',
    colour: '#4CEA89',
    slug: '/',
  },
  {
    name: 'Goals',
    emoji: '🏆',
    colour: '#F6FF0D',
  },
  {
    name: 'Friends',
    emoji: '🕺',
    colour: '#FF9BDC',
    slug: '/friends',
  },
];

export function getSpace(slug, path) {
  const { spaces } = usePodSpaces();
  return defaultSpaces
    .concat(spaces)
    .find((space) =>
      space.slug ? space.slug === path : slugify(space.name) === slug
    );
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
