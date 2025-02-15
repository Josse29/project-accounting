function capitalizeWord(string) {
  return string.toLowerCase().replace(/\b\w/g, (char) => char.toUpperCase());
}

export { capitalizeWord };
