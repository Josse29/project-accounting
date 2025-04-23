import { noNumberRgx } from "./regex";

const formatPercentage = (e) => {
  let value = e.replace(noNumberRgx, "");
  if (value) {
    value = value + "%";
  } else {
    value = 0;
  }
  return value;
};
const formatPercentage1 = (event) => {
  let input = event.target;
  let value = input.value.replace("%", "");
  if (value.length > 0) {
    input.value = value.slice(0, -1) + "%";
  }
  event.preventDefault();
  return input.value;
};
export { formatPercentage, formatPercentage1 };
