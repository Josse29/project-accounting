const getStorageCart = () => JSON.parse(localStorage.getItem("cart") || "[]");
const setStorageCart = (cart) => {
  cart.sort((a, b) => a.ProductName.localeCompare(b.ProductName));
  localStorage.setItem("cart", JSON.stringify(cart));
};
const setStorageCartSum = (cart) => {
  let totalQty = 0;
  let totalBalance = 0;
  cart.forEach((el) => {
    totalQty += el.ProductQty;
    totalBalance += el.ProductQty * el.PriceSell;
  });
  const cartSum = {
    totalQty,
    totalBalance,
  };
  localStorage.setItem("cartSum", JSON.stringify(cartSum));
};
const getStorageCartSum = () =>
  JSON.parse(localStorage.getItem("cartSum") || "[]");
const triggerStorage = () => {
  window.dispatchEvent(new Event("storage"));
};
const removeStorage = () => {
  localStorage.removeItem("cart");
  localStorage.removeItem("cartSum");
};
export {
  getStorageCart,
  getStorageCartSum,
  setStorageCart,
  setStorageCartSum,
  removeStorage,
  triggerStorage,
};
