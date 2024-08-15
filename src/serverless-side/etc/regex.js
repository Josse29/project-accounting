export const isNumeric = (val) => {
  const regex = /^-?\d*(?:\.\d+)?(?:[eE][-+]?\d+)?$/;
  const numeric = regex.test(val);
  return numeric && val !== 0;
};
