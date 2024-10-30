import { getStorageCart, setStorageCart } from "./../../utils/localStorage.js";
import { disFormatRupiah1 } from "../../utils/formatRupiah.js";
import { list } from "../list/index.js";
import { uiQty } from "./qty.js";

$("div#product-refpersediaan-read")
  .off("click", "button#order-create-qty-plus")
  .on("click", "button#order-create-qty-plus", function () {
    // get from storage
    const cartArray = getStorageCart();
    // find dom
    const productCard = $(this).closest("div.card-body");
    // get all data
    const productData = productCard[0].dataset;
    const productId = productData.productid;
    const productName = productData.productname;
    const productStock = productData.productstock;
    const productPriceSell = disFormatRupiah1(productData.productpricesell);
    const productPriceBuy = disFormatRupiah1(productData.productpricebuy);
    const btnPlus = productCard.find("button#order-create-qty-plus")[0];
    const btnMin = productCard.find("button#order-create-qty-minus")[0];
    // find index id
    const productIndex = cartArray.findIndex((e) => {
      return e.ProductId === productId;
    });
    // if it already exist in storage, justupdate qty++
    if (productIndex !== -1) {
      let cartProductI = cartArray[productIndex];
      // it enough from stock
      if (cartProductI.ProductQty < productStock) {
        cartProductI.ProductQty++;
        btnMin.classList.remove("unsufficient");
      }
      // it exceed from stock
      if (cartProductI.ProductQty >= productStock) {
        btnPlus.classList.add("unsufficient");
      }
    }
    // if it isn't already exist in storage, push to storage
    if (productIndex === -1) {
      const newObject = {
        ProductId: productId,
        ProductName: productName,
        ProductPriceBuy: productPriceBuy,
        ProductPriceSell: productPriceSell,
        ProductQty: 1,
      };
      // push to array
      cartArray.push(newObject);
      // sort array by name
      cartArray.sort((a, b) => a.ProductName.localeCompare(b.ProductName));
      btnMin.classList.remove("unsufficient");
    }
    // save to storage
    setStorageCart(cartArray);
    // updating ui only qty
    uiQty();
    // updating list cart
    list();
  });
