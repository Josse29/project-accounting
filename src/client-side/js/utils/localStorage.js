// 1.cart-storage
export const getStorageCart = () => {
  const storage = localStorage.getItem("cartStorage")
    ? JSON.parse(localStorage.getItem("cartStorage"))
    : [];
  return storage;
};
export const setStorageCart = (arr) => {
  const array = JSON.stringify(arr);
  localStorage.setItem("cartStorage", array);
};
export const removeStorageCart = () => {
  localStorage.removeItem("cartStorage");
  const orderEmpty = `
  <div class="d-flex justify-content-center align-items-center h-100">
    <p class="fst-italic text-muted fs-4">order empty...</p>
  </div>`;
  $("div#order-list").html(orderEmpty);
};
export const filterStorage1 = (cartArray) => {
  const cartArray1 = cartArray.filter((e) => {
    return e.ProductQty >= 1;
  });
  setStorageCart(cartArray1);
};
// 2.sum-storage
export const getStorageCartSum = () => {
  const storage = localStorage.getItem("cartStorageSum")
    ? localStorage.getItem("cartStorageSum")
    : 0;
  return storage;
};
export const setStorageCartSum = (number) => {
  localStorage.setItem("cartStorageSum", number);
};
export const removeStorageCartSUM = () => {
  localStorage.removeItem("cartStorageSum");
  $("h5#order-list-total").text(`Rp. 0,00`);
};
