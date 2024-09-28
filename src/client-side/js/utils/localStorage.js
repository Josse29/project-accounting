// 1.cart-storage
export const getStorageCart = () => {
  let storage = localStorage.getItem("cartStorage");
  if (storage) {
    storage = JSON.parse(storage);
  } else {
    storage = [];
  }
  return storage;
};
export const setStorageCart = (arr) => {
  const array = JSON.stringify(arr);
  localStorage.setItem("cartStorage", array);
};
export const removeStorageCart = () => {
  localStorage.removeItem("cartStorage");
};
export const filterStorage1 = (cartArray) => {
  const cartArray1 = cartArray.filter((e) => {
    return e.ProductQty >= 1;
  });
  setStorageCart(cartArray1);
};
// 2.sum-storage
export const getStorageCartSum = () => {
  let storage = localStorage.getItem("cartStorageSum");
  if (storage) {
    storage = Number(storage);
  } else {
    storage = 0;
  }
  return storage;
};
export const setStorageCartSum = (number) => {
  localStorage.setItem("cartStorageSum", number.toString());
};
export const removeStorageCartSUM = () => {
  localStorage.removeItem("cartStorageSum");
};
