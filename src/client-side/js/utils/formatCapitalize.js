export function capitalizeWord(string) {
  return string.replace(/\b\w/g, (char) => char.toUpperCase());
}
