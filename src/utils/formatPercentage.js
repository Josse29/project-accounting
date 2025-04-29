import { noNumberRgx } from "./regex";

const formatPercentage = (input) => {
  let value = input.replace(noNumberRgx, "");
  if (value.startsWith("0") && value.length > 1 && !value.startsWith("0.")) {
    value = parseFloat(value);
  }
  return value ? value + "%" : "";
};
const formatPercentage1 = (e) => {
  const { value } = e.target;
  let raw = value.replace("%", "");
  if (raw.length > 0) {
    raw = raw.slice(0, -1);
  }
  return raw ? raw + "%" : "";
};
export { formatPercentage, formatPercentage1 };
