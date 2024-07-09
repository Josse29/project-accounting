import { addSpace } from "./formatSpace.js";

export const formatQty1 = (valueQty) => {
  let PersediaanQty = ``;
  const formattedQty = addSpace(valueQty);
  if (valueQty >= 1) {
    PersediaanQty = `<span> + ${valueQty}</span>`;
  } else {
    PersediaanQty = `<span>${formattedQty}</span>`;
  }
  return PersediaanQty;
};
