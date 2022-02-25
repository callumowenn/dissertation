import { useSession } from '@inrupt/solid-ui-react';
import { sha256 } from 'js-sha256';
import { usePodSpaces } from '../lib/podSpaces';

export function getSpace(slug, path) {
  const { spaces } = usePodSpaces();
  return spaces.find((space) => slugify(space.name) === slug);
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
