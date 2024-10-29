import {
  filterStorage1,
  getStorageCart,
  setStorageCart,
} from "../../utils/localStorage.js";
import { list } from "../list/index.js";
import { uiQty } from "./qty.js";

$("div#product-refpersediaan-read")
  .off("click", "button#order-create-qty-minus")
  .on("click", "button#order-create-qty-minus", function () {
    // get from storage
    const cartArray = getStorageCart();
    // get all data
    const product = $(this).closest("div.card-body");
    const productId = product[0].dataset.productid;
    // find product index
    const productIndex = cartArray.findIndex((e) => {
      return e.ProductId === productId;
    });
    // find dom
    const btnMin = product.find("button#order-create-qty-minus")[0];
    const btnPlus = product.find("button#order-create-qty-plus")[0];
    // if it already exist in storage, justupdate qty--
    if (productIndex !== -1) {
      let cartProductI = cartArray[productIndex];
      if (cartProductI.ProductQty > 0) {
        cartProductI.ProductQty--;
        btnPlus.classList.remove("unsufficient");
      }
      if (cartProductI.ProductQty <= 0) {
        btnMin.classList.add("unsufficient");
      }
    }
    // if its'not already exist in storage, justaddclass btn
    if (productIndex === -1) {
      btnPlus.classList.remove("unsufficient");
      btnMin.classList.add("unsufficient");
    }
    // save to storage
    setStorageCart(cartArray);
    // updating ui qty card only
    uiQty();
    // filter storage
    filterStorage1(cartArray);
    // updating list cart for order temporary
    list();
  });
