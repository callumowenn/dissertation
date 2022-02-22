// spaces array will come from user's pod
// private spaces will require authorized request to access
export const spaces = [
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
  if (path === '/') {
    return spaces[0];
  }
  return spaces.find((space) => space.name.toLowerCase() === slug);
}
