import { formatRupiah2 } from "../../utils/formatRupiah.js";
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
  const btn = `<button 
                type="button" 
                class="btn fs-4 product-ref-persediaan-page border border-2 ${
                  number === 1 ? "product-ref-persediaan-page-active" : ""
                }">${number}</button>`;
  return btn;
};
// update ui Active
export const uiBtnPageActive = (pageNumber) => {
  const btnPage = $("button.product-ref-persediaan-page");
  btnPage.removeClass("product-ref-persediaan-page-active");
  btnPage.eq(pageNumber - 1).addClass("product-ref-persediaan-page-active");
};
