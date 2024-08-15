import { formatRupiah2 } from "../../utils/formatRupiah.js";
import { getStorageCart } from "../../utils/localStorage.js";
export const uiMenu = (rows) => {
  const productId = parseInt(rows.PersediaanProductId);
  const productName = rows.ProductName;
  const priceJual = formatRupiah2(parseFloat(rows.ProductPriceJual));
  const productStock = parseInt(rows.TotalQty);
  const htmlNoImg = `<div 
                        class="border border-1 d-flex justify-content-center      align-items-center fst-italic w-100"
                        style="width: 200px;
                            height: 180px;
                            background-color: #f1f0f0;
                            color: grey;">
                            No Image...
                    </div>`;
  const withImg = `<img
                    src=${rows.ProductImage}
                    class="card-img-top"
                    alt="..."
                    style="height: 180px"/>`;
  const productImg = rows.ProductImage !== "null" ? withImg : htmlNoImg;
  return `<div class="card w-full shadow-sm">
            ${productImg}
            <div class="card-body">
                <h4 class="fw-bold text-truncate" id="order-productname">${productName}</h4>
                <h4 class="text-truncate" id="order-productprice">${priceJual}</h4>
                <p class='fs-5'>Stock : ${productStock}</p>
                <div class="mt-3 d-flex justify-content-between align-items-center">
                  <div id="order-create-qty">
                  </div>
                  <div>
                    <button id="order-create-qty-plus" class="btn btn-success" 
                            data-productid=${productId}
                            data-productname="${productName}"
                            data-productstock=${productStock}
                            data-productprice=${priceJual}>
                      <i class="fa-solid fa-plus" style="font-size: 18px"></i>
                    </button>
                    <button class="btn btn-danger" id="order-create-qty-minus"
                            data-productid=${productId}
                            data-productname="${productName}"
                            data-productstock=${productStock}
                            data-productprice=${priceJual}>
                      <i class="fa-solid fa-minus" style="font-size: 18px"></i>
                    </button>
                  </div>
              </div>
            </div>
          </div>`;
};
export const uiBtnPage = (number) => {
  return `<button 
            type="button" 
            class="btn fs-4 order-page border border-2 ${
              number === 1 ? "order-page-active" : ""
            }">${number}</button>`;
};

export const uiOrderCard1 = (rows) => {
  const productId = parseInt(rows.PersediaanProductId);
  const productName = rows.ProductName;
  const priceJual = formatRupiah2(parseFloat(rows.ProductPriceJual));
  const productStock = parseInt(rows.TotalQty);
  const htmlNoImg = `<div 
                        class="border border-1 d-flex justify-content-center      align-items-center fst-italic w-100"
                        style="width: 200px;
                            height: 180px;
                            background-color: #f1f0f0;
                            color: grey;">
                            No Image...
                    </div>`;
  const withImg = `<img
                    src=${rows.ProductImage}
                    class="card-img-top"
                    alt="..."
                    style="height: 180px"/>`;
  const productImg = rows.ProductImage !== "null" ? withImg : htmlNoImg;
  return `<div class="card w-full shadow-sm">
            ${productImg}
            <div class="card-body">
                <h4 class="fw-bold text-truncate" id="order-productname">${productName}</h4>
                <h4 class="text-truncate" id="order-productprice">${priceJual}</h4>
                <p class='fs-5'>Stock : ${productStock}</p>
                <div class="mt-3 d-flex justify-content-between align-items-center">
                  <div id="order-create-qty">
                  </div>
                  <div>
                    <button id="order-create-qty-plus" class="btn btn-success" 
                            data-productid=${productId}
                            data-productname="${productName}"
                            data-productstock=${productStock}
                            data-productprice=${priceJual}>
                      <i class="fa-solid fa-plus" style="font-size: 18px"></i>
                    </button>
                    <button class="btn btn-danger" id="order-create-qty-minus"
                            data-productid=${productId}
                            data-productname="${productName}"
                            data-productstock=${productStock}
                            data-productprice=${priceJual}>
                      <i class="fa-solid fa-minus" style="font-size: 18px"></i>
                    </button>
                  </div>
              </div>
            </div>
          </div>`;
};
// only loop to card menu
export const uiQty = () => {
  const cartStorage = getStorageCart();
  if (cartStorage) {
    cartStorage.forEach((item) => {
      uiQtyId(item.ProductId);
    });
  }
};
// update qty and inserthtml to cardmenu
export const uiQtyId = (id) => {
  const cartStorage = getStorageCart();
  if (cartStorage) {
    const updateUi = cartStorage.find((item) => {
      return item.ProductId === id;
    });
    if (updateUi) {
      const productCard = $(`button[data-productid=${id}]`).closest(
        ".card-body"
      );
      const qtyElement = productCard.find("#order-create-qty");
      let qtyHtml = ``;
      if (updateUi.ProductQty >= 1) {
        qtyHtml = `<div class='custome-qty-me ms-2'>${updateUi.ProductQty}</div>`;
      }
      qtyElement.html(qtyHtml);
    }
  }
};
// update ui to list cart order
export const uiList = (rows) => {
  const rupiahTotal = formatRupiah2(rows.ProductTotal);
  return `<div class="py-2 px-1">
            <h5 class="fw-bold text-truncate w-100" id="order-list-name">
              ${rows.ProductName} 
            </h5>
            <h6 class="text-muted text-truncate" id="order-list-price">${rupiahTotal}</h6>
            <div class="text-muted ms-2">Qty : <span>${rows.ProductQty}</span>
            </div>
          </div>`;
};
// update ui to tbody card
export const uiTbody = (rows, noTd) => {
  const productPrice = formatRupiah2(rows.ProductPrice);
  const productTotal = formatRupiah2(rows.ProductTotal);
  return `<tr>
            <td class="text-center">${noTd++}</td>
            <td>${rows.ProductName}</td>
            <td>
                ${productPrice}
            </td>
            <td>+ ${rows.ProductQty}</td>
            <td>${productTotal}</td>
          </tr>`;
};
