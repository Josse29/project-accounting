import { formatRupiah2 } from "../../utils/formatRupiah.js";
import { getStorageCart } from "../../utils/localStorage.js";
export const uiCard = (rows) => {
  const productId = parseInt(rows.PersediaanProductId);
  const productName = rows.ProductName;
  const priceBuy = formatRupiah2(parseFloat(rows.PriceBuy));
  const priceSell = formatRupiah2(parseFloat(rows.PriceSell));
  const productStock = parseInt(rows.TotalQty);
  let imgSrc = ``;
  if (rows.ProductImage !== "null") {
    imgSrc = rows.ProductImage;
  } else {
    imgSrc = "./../images/no-img.jpg";
  }
  const productImg = `<img
                        src=${imgSrc}
                        class="card-img-top"
                        alt="..."/>`;
  const html = `<div class="card w-full shadow-sm">
                ${productImg}
                <div class="card-body">
                    <h4 class="fw-bold text-truncate" id="order-productname">${productName}</h4>
                    <h4 class="text-truncate" id="order-productprice">${priceSell}</h4>
                    <p class='fs-5'>Stock : ${productStock}</p>
                    <div class="mt-3 d-flex justify-content-between align-items-center">
                      <div id="order-create-qty">
                      </div>
                      <div>
                        <button id="order-create-qty-plus" class="btn btn-success" 
                                data-productid=${productId}
                                data-productname="${productName}"
                                data-productstock=${productStock}
                                data-productpricesell=${priceSell}
                                data-productpricebuy=${priceBuy}>
                          <i class="fa-solid fa-plus" style="font-size: 18px"></i>
                        </button>
                        <button class="btn btn-danger" id="order-create-qty-minus"
                                data-productid=${productId}
                                data-productname="${productName}"
                                data-productstock=${productStock}
                                data-productpricesell=${priceSell}
                                data-productpricebuy=${priceBuy}>
                          <i class="fa-solid fa-minus" style="font-size: 18px"></i>
                        </button>
                      </div>
                  </div>
                </div>
                </div>`;
  return html;
};
export const uiCardEmpty = (searchVal) => {
  let search = `stock empty...`;
  if (searchVal !== "") {
    search = `${searchVal} - not found....`;
  }
  const emptyP = `<p class="d-block fs-4 fst-italic text-center">${search}</p>`;
  return emptyP;
};
export const uiBtnPage = (number) => {
  return `<button 
            type="button" 
            class="btn fs-4 product-ref-persediaan-page border border-2 ${
              number === 1 ? "product-ref-persediaan-page-active" : ""
            }">${number}</button>`;
};
// update ui Active
export const uiBtnPageActive = (pageNumber) => {
  const btnPage = $("button.product-ref-persediaan-page");
  btnPage.removeClass("product-ref-persediaan-page-active");
  btnPage.eq(pageNumber - 1).addClass("product-ref-persediaan-page-active");
};
// loop to card menu and update ui qty
export const uiQty = () => {
  const cartStorage = getStorageCart();
  for (const item of cartStorage) {
    const productCard = $(`button[data-productid=${item.ProductId}]`).closest(
      ".card-body"
    );
    const qtyElement = productCard.find("#order-create-qty");
    let qtyHtml = ``;
    if (item.ProductQty >= 1) {
      qtyHtml = `<div class='custome-qty-me ms-2'>${item.ProductQty}</div>`;
    }
    qtyElement.html(qtyHtml);
  }
};
// update ui to list cart order
export const uiList = (rows) => {
  const rupiahTotal = formatRupiah2(rows.ProductPriceSell * rows.ProductQty);
  const html = `<div class="py-2 px-1">
                  <h5 class="fw-bold text-truncate w-100" id="order-list-name">
                    ${rows.ProductName} 
                  </h5>
                  <h6 class="text-muted text-truncate" id="order-list-price">${rupiahTotal}</h6>
                  <div class="text-muted ms-2">Qty : <span>${rows.ProductQty}</span>
                  </div>
                </div>`;
  return html;
};
// update ui to tbody card for orderintg
export const uiTbody = (rows, noTd) => {
  const priceSellRp = formatRupiah2(rows.ProductPriceSell);
  const productTotal = formatRupiah2(rows.ProductPriceSell * rows.ProductQty);
  return `<tr>
            <td class="text-center">${noTd}</td>
            <td>${rows.ProductName}</td>
            <td>
                ${priceSellRp}
            </td>
            <td>+ ${rows.ProductQty}</td>
            <td>${productTotal}</td>
          </tr>`;
};
