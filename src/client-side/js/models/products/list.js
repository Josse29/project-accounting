import { getListRefPersediaan, getListRefSale } from "./services.js";
import { formatRupiah2 } from "../../utils/formatPrice.js";

const productListRefPersediaan = async () => {
  const { status, response } = await getListRefPersediaan();
  if (status) {
    const existed = response.length >= 1;
    let option = ``;
    if (existed) {
      option += `<option selected disabled>Choose One Of Products</option>`;
      response.forEach((row) => {
        const productId = row.ProductId;
        const productName = row.ProductName;
        const productPriceBuy = row.ProductPriceBuy;
        const productPriceSell = row.ProductPriceSell;
        const productPersediaanQty = row.TotalPersediaanQty;
        option += `
        <option
          value="${productId}"
          data-productname="${productName}"
          data-pricebuy="${productPriceBuy}"
          data-pricesell="${productPriceSell}"
          data-qty="${productPersediaanQty}"
        >
          ${productName} - ${formatRupiah2(
          productPriceBuy
        )} - Qty : ${productPersediaanQty} 
        </option>
        `;
      });
    }
    if (!existed) {
      option += `<option disabled class="fst-italic text-center text-muted">Product Empty........</option>`;
    }
    return option;
  }
  if (!status) {
    console.error(response);
    throw new Error(response);
  }
};
const productListRefPersediaan1 = async () => {
  const { status, response } = await getListRefPersediaan();
  if (status) {
    const existed = response.length >= 1;
    let option = `<option selected disabled>Choose One Of Products</option>`;
    if (existed) {
      response.forEach((row) => {
        const productId = row.ProductId;
        const productName = row.ProductName;
        const productPriceBuy = row.ProductPriceBuy;
        const productPriceSell = row.ProductPriceSell;
        const productPersediaanQty = row.TotalPersediaanQty;
        option += `<option 
                      value="${productId}"
                      data-productname="${productName}"
                      data-pricebuy="${productPriceBuy}" 
                      data-pricesell="${productPriceSell}"
                      data-qty="${productPersediaanQty}">
                        ${productName}
                  </option>`;
      });
    }
    if (!existed) {
      option += `<option disabled class="fst-italic text-center">Product Empty........</option>`;
    }
    return option;
  }
  if (!status) {
    console.error(response);
    throw new Error(response);
  }
};
const productListRefPersediaan2 = async () => {
  const { status, response } = await getListRefPersediaan();
  if (status) {
    const existed = response.length >= 1;
    let option = `<option selected disabled>Choose One Of Products</option>`;
    if (existed) {
      response.forEach((row) => {
        const productId = row.ProductId;
        const productName = row.ProductName;
        const productPriceBuy = row.ProductPriceBuy;
        const productPriceSell = row.ProductPriceSell;
        const productPersediaanQty = row.TotalPersediaanQty;
        option += `
        <option
          value="${productId}"
          data-productname="${productName}"
          data-pricebuy="${productPriceBuy}"
          data-pricesell="${productPriceSell}"
          data-qty="${productPersediaanQty}"
        >
          ${productName} - ${formatRupiah2(productPriceSell)} - Qty :
          ${productPersediaanQty}
        </option>
        `;
      });
    }
    if (!existed) {
      option += `<option disabled class="fst-italic text-center">Product Empty........</option>`;
    }
    return option;
  }
  if (!status) {
    console.error(response);
    throw new Error(response);
  }
};
const productListRefSale = async () => {
  const { status, response } = await getListRefSale();
  if (status) {
    const existed = response.length >= 1;
    let option = `<option selected disabled>Choose One Of Products</option>`;
    if (existed) {
      response.forEach((row) => {
        const productId = row.ProductId;
        const productName = row.ProductName;
        const productPriceSell = row.ProductPriceSell;
        const totalSalesQty = row.TotalSalesProductQty;
        const totalSalesPrice = row.TotalSalesProductRp;
        option += `<option 
                      value="${productId}"
                      data-productname="${productName}"
                      data-pricesell="${productPriceSell}"
                      data-totalqty="${totalSalesQty}"
                      data-totalprice="${totalSalesPrice}">
                        ${productName}
                  </option>`;
      });
    }
    if (!existed) {
      option += `<option disabled class="fst-italic text-center">Product Empty........</option>`;
    }
    return option;
  }
  if (!status) {
    console.error(response);
    throw new Error(response);
  }
};
const listProductRefPersediaanCreate = async () => {
  const option = await productListRefPersediaan();
  $("select#persediaan-refproduct-search-name").html(option);
};
const listProductRefPersediaanRead = async () => {
  const option = await productListRefPersediaan1();
  $("select#persediaan-refproduct-search").html(option);
};
const listProductRefPersediaanReadDate = async () => {
  const list = await productList();
  const option = `
  <select class="form-control w-auto mb-3" id="persediaan-date-product">
    ${list}
  </select>`;
  return option;
};
const listProductRefSalesRead = async () => {
  const option = await productListRefSale();
  $("select#sales-read-productid").html(option);
};
const listProductRefSalesReadDate = async () => {
  const option = await productList();
  $("select#sales-read-productid-date").html(option);
};
export {
  productListRefPersediaan,
  productListRefPersediaan2,
  listProductRefPersediaanCreate,
  listProductRefPersediaanRead,
  listProductRefPersediaanReadDate,
  listProductRefSalesRead,
  listProductRefSalesReadDate,
};
