function capitalizeWord(string) {
  if (string === undefined || string === "" || string === null) {
    return "";
  } else {
    const capitalize = string
      .toLowerCase()
      .replace(/\b\w/g, (char) => char.toUpperCase());
    return capitalize.trim();
  }
}

export { capitalizeWord };
