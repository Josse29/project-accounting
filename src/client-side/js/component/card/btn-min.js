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
    const productId = $(this).data("productid");
    // find product index
    const productIndex = cartArray.findIndex((e) => {
      return e.ProductId === productId;
    });
    // find dom
    const productCard = $(`button[data-productid=${productId}]`).closest(
      ".card-body"
    );
    const btnMin = productCard.find("button#order-create-qty-minus");
    const btnPlus = productCard.find("button#order-create-qty-plus");
    // if it already exist in storage, justupdate qty--
    if (productIndex !== -1) {
      let cartProductI = cartArray[productIndex];
      if (cartProductI.ProductQty > 0) {
        cartProductI.ProductQty--;
        btnPlus.removeClass("unsufficient");
      }
      if (cartProductI.ProductQty <= 0) {
        btnMin.addClass("unsufficient");
      }
    }
    // if its'not already exist in storage, justaddclass btn
    if (productIndex === -1) {
      btnPlus.removeClass("unsufficient");
      btnMin.addClass("unsufficient");
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
