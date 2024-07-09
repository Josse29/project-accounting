export function addSpace(value) {
  value = value.toString(); // Pastikan value adalah string
  if (value.startsWith("-") && !value.startsWith("- ")) {
    return value.replace("-", "- ");
  }
  return value;
}
