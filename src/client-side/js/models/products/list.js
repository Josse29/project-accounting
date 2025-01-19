import { getListRefPersediaan, getListRefSale } from "./services.js";

const productListRefPersediaan = async () => {
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
                        ${productName} - Qty : ${productPersediaanQty}
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
const productListRefSale = async () => {
  const { status, response } = await getListRefSale();
  if (status) {
    console.log(response);
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
// function to update when create list product ref persediaan
export const listProductRefPersediaanCreate = async () => {
  const option = await productListRefPersediaan();
  $("select#persediaan-refproduct-search-name").html(option);
};
export const listProductRefPersediaanRead = async () => {
  const option = await productListRefPersediaan1();
  $("select#persediaan-refproduct-search").html(option);
};
export const listProductRefPersediaanReadDate = async () => {
  const list = await productList();
  const option = `
  <select class="form-control w-auto mb-3" id="persediaan-date-product">
    ${list}
  </select>`;
  return option;
};
export const listProductRefSalesRead = async () => {
  const option = await productListRefSale();
  $("select#sales-read-productid").html(option);
};
export const listProductRefSalesReadDate = async () => {
  const option = await productList();
  $("select#sales-read-productid-date").html(option);
};
