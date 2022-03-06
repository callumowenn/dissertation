export function getInterestFromName(name, interests) {
  let result = interests.find((interest) => {
    return interest.name === name;
  });
  return result;
}
