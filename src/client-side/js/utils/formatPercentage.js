const formatPercentage = (e) => {
  let value = e.replace(/\D/g, "");
  if (value) {
    value = value + "%";
  } else {
    value = 0;
  }
  return value;
};
export default formatPercentage;
