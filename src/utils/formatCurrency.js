import { noNumberRgx1 } from "./regex";

const formatCurrency = (num) => {
  if (!num) return "";
  let number_string = num.toString().replace(noNumberRgx1, "");
  let split = number_string.split(",");
  let integerPart = split[0].replace(/^0+(?!$)/, "");
  let remain = integerPart.length % 3;
  let currency = integerPart.substr(0, remain);
  let thousands = integerPart.substr(remain).match(/\d{3}/gi);
  if (thousands) {
    let separator = remain ? "." : "";
    currency += separator + thousands.join(".");
  }
  currency = split[1] !== undefined ? currency + "," + split[1] : currency;
  return currency ? "Rp " + currency : "";
};
const formatCurrency1 = (input) => {
  const formattedValue = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  }).format(input);
  return formattedValue;
};
const formatCurrency2 = (input) => {
  let priceTxt = ``;
  if (input === 0) {
    priceTxt = `${formatCurrency1(input)}`;
  }
  if (input < 0) {
    priceTxt = `- ${formatCurrency1(Math.abs(input))}`;
  }
  if (input > 0) {
    priceTxt = `+ ${formatCurrency1(input)}`;
  }
  return priceTxt;
};
const unFormatCurrency = (val) => {
  const price = val
    .replace(/^Rp\s*/, "")
    .replace(/\./g, "")
    .replace(/,/g, ".");
  return price;
};
export { formatCurrency, formatCurrency1, formatCurrency2, unFormatCurrency };
