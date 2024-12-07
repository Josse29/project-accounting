const formatQty = (num) => {
  let qtyTxt = ``;
  if (num < 0) {
    qtyTxt = `- ${Math.abs(num)}`;
  }
  if (num === 0) {
    qtyTxt = num;
  }
  if (num > 0) {
    qtyTxt = `+ ${num}`;
  }
  return qtyTxt;
};
export default formatQty;
