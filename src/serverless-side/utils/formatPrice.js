const formatPrice = (price) => {
  const formattedValue = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  }).format(price);
  return formattedValue;
};
export default formatPrice;
