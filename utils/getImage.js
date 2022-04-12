export default function getImageFromBinary(binaryStr) {
  const blob = new Blob([binaryStr]);
  return URL.createObjectURL(blob);
}
