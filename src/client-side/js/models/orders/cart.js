import { uiList, uiQty, uiTbody } from "./ui.js";
import {
  disFormatRupiah1,
  formatRupiah1,
  formatRupiah2,
} from "../../utils/formatRupiah.js";
import {
  getStorageCart,
  getStorageCartSum,
  setStorageCart,
  setStorageCartSum,
} from "../../utils/localStorage.js";
import { terbilangIndonesia } from "../../utils/formatTerbilang.js";
// update qty ++ and -- for card and update to storage
export const updateQty = () => {
  // only loop to card menu
  uiQty();
  // for update ++
  $(document)
    .off("click", "button#order-create-qty-plus")
    .on("click", "button#order-create-qty-plus", function () {
      const cartArray = getStorageCart();
      // get all data
      const productId = $(this).data("productid");
      const productName = $(this).data("productname");
      const productStock = $(this).data("productstock");
      const productPrice = disFormatRupiah1($(this).data("productprice"));
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
        cartArray[productIndex].ProductTotal =
          cartArray[productIndex].ProductQty *
          cartArray[productIndex].ProductPrice;
      }
      // if it isn't already exist in storage, push to storage
      if (productIndex === -1) {
        const newObject = {
          ProductId: productId,
          ProductName: productName,
          ProductPrice: productPrice,
          ProductQty: 1,
          ProductTotal: productPrice,
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
  $(document)
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
      // updating ui card only
      uiQty();
      // updating list cart
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
      totalRp += rows.ProductTotal;
      listTd += uiTbody(rows, noTd);
      noTd++;
    });
    $("div#order-list").addClass("overflow-y-auto");
  }
  if (cartArray.length < 1) {
    listHTML = `<p class="fs-5 text-center fst-italic text-muted h-100     align-content-center">
                          order is empty...
                        </p>`;
    listTd = `<tr>
                <td colspan="5" class="text-center align-content-center px-3 fst-italic fw-bold text-capitalize" style="background-color:#f2f2f2">order is still empty....</td>
              </tr>`;
    $("div#order-list").removeClass("overflow-y-auto");
  }
  // save to storage cartsum
  setStorageCartSum(totalRp);
  // get storage cartsum
  totalRp = Number(getStorageCartSum());
  let terbilang = terbilangIndonesia(totalRp);
  let numberRp = formatRupiah2(totalRp);
  $("span#order-total-cart").text(formatRupiah1(totalRp));
  $("h5#order-list-total").text(numberRp);
  $("i#order-total-cart").text(numberRp);
  $("div#order-list").html(listHTML);
  $("tbody#orders-done").html(listTd);
  $("span#order-terbilang").text(`${terbilang} rupiah`);
};
