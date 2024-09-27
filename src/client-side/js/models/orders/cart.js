import { uiList, uiQty, uiTbody } from "./ui.js";
import { disFormatRupiah1, formatRupiah2 } from "../../utils/formatRupiah.js";
import {
  getStorageCart,
  getStorageCartSum,
  setStorageCart,
  setStorageCartSum,
} from "../../utils/localStorage.js";
import { terbilangIndonesia } from "../../utils/formatTerbilang.js";
// update qty ++ and -- for card and update to storage
export const updateQty = () => {
  return;
  // only loop to card menu
  uiQty();
  // for update ++
  $(".card-body")
    .off("click", "button#order-create-qty-plus")
    .on("click", "button#order-create-qty-plus", function () {
      const cartArray = getStorageCart();
      // get all data
      const productId = $(this).data("productid");
      const productName = $(this).data("productname");
      const productStock = $(this).data("productstock");
      const productPriceSell = disFormatRupiah1(
        $(this).data("productpricesell")
      );
      const productPriceBuy = disFormatRupiah1($(this).data("productpricebuy"));
      const productCard = $(`button[data-productid=${productId}]`).closest(
        ".card-body"
      );
      const btnPlus = productCard.find("button#order-create-qty-plus");
      const btnMin = productCard.find("button#order-create-qty-minus");
      // find index id
      const productIndex = cartArray.findIndex((e) => {
        return e.ProductId === productId;
      });
      // if it already exist in storage, justupdate qty++
      if (productIndex !== -1) {
        if (cartArray[productIndex].ProductQty < productStock) {
          cartArray[productIndex].ProductQty++;
          btnMin.removeClass("unsufficient");
        }
        if (cartArray[productIndex].ProductQty >= productStock) {
          btnPlus.addClass("unsufficient");
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
        btnMin.removeClass("unsufficient");
      }
      // save to storage
      setStorageCart(cartArray);
      // updating ui only qty
      uiQty();
      // updating list cart
      listCart();
    });
  // for update --
  $(".card-body")
    .off("click", "button#order-create-qty-minus")
    .on("click", "button#order-create-qty-minus", function () {
      const cartArray = getStorageCart();
      // get all data
      const productId = $(this).data("productid");
      // find index id
      const productIndex = cartArray.findIndex((e) => {
        return e.ProductId === productId;
      });
      const productCard = $(`button[data-productid=${productId}]`).closest(
        ".card-body"
      );
      const btnMin = productCard.find("button#order-create-qty-minus");
      const btnPlus = productCard.find("button#order-create-qty-plus");
      // if it already exist in storage, justupdate qty--
      if (productIndex !== -1) {
        if (cartArray[productIndex].ProductQty > 0) {
          cartArray[productIndex].ProductQty--;
          btnPlus.removeClass("unsufficient");
        }
        if (cartArray[productIndex].ProductQty <= 0) {
          btnMin.addClass("unsufficient");
        }
        cartArray[productIndex].ProductTotal =
          cartArray[productIndex].ProductQty *
          cartArray[productIndex].ProductPrice;
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
      // updating list cart for order temp
      listCart();
    });
};
// for list cart order from storage
export const listCart = () => {
  let cartArray = getStorageCart();
  // filter item.productQTy >=1
  cartArray = cartArray.filter((item) => {
    return item.ProductQty >= 1;
  });
  // save to storage cart
  setStorageCart(cartArray);
  // get from storage again cart
  cartArray = getStorageCart();
  let listHTML = ``;
  let totalRp = 0;
  let listTd = ``;
  let noTd = 1;
  if (cartArray.length >= 1) {
    cartArray.forEach((rows) => {
      listHTML += uiList(rows);
      totalRp += rows.ProductPriceSell * rows.ProductQty;
      listTd += uiTbody(rows, noTd);
      noTd++;
    });
  }
  if (cartArray.length < 1) {
    listHTML = `<div class="d-flex justify-content-center align-items-center h-100"
                    style="height: 500px">
                  <p class="fst-italic text-muted fs-4">orders empty...</p>
                </div>`;
    listTd = `<tr>
                <td colspan="5" class="text-center align-content-center px-3 fst-italic fw-bold text-capitalize" style="background-color:#f2f2f2">order is still empty....</td>
              </tr>`;
  }
  // save to storage cartsum
  setStorageCartSum(totalRp);
  // get storage cartsum and  terbilang
  totalRp = getStorageCartSum();
  let terbilang = terbilangIndonesia(totalRp);
  let numberRp = formatRupiah2(totalRp);
  // list cart
  $("h5#order-list-total").text(numberRp);
  $("div#order-list").html(listHTML);
  // table order
  $("tbody#orders-done").html(listTd);
  $("span#order-total-cart").text(formatRupiah2(totalRp));
  $("span#order-terbilang").text(`${terbilang} rupiah`);
  $("i#order-total-cart").text(numberRp);
};
