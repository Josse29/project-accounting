import { getListRefStock, getListRefSale } from "./services.js";
import { formatRupiah2 } from "../../utils/formatPrice.js";

const productListRefStock = async () => {
  const { status, response } = await getListRefStock();
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
        const productStockQty = row.TotalStockQty;
        const supplierFullName = row.UserFullname;
        const supplierEmail = row.UserEmail;
        option += `
        <option
          value="${productId}"
          data-productname="${productName}"
          data-pricebuy="${productPriceBuy}"
          data-pricesell="${productPriceSell}"
          data-qty="${productStockQty}"
          data-suppliername="${supplierFullName}"
          data-supplieremail="${supplierEmail}"
        >
          ${productName} - ${formatRupiah2(
          productPriceBuy
        )} - Qty : ${productStockQty} 
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
const productListRefStock1 = async () => {
  const { status, response } = await getListRefStock();
  if (status) {
    const existed = response.length >= 1;
    let option = `<option selected disabled>Choose One Of Products</option>`;
    if (existed) {
      response.forEach((row) => {
        const productId = row.ProductId;
        const productName = row.ProductName;
        const productPriceBuy = row.ProductPriceBuy;
        const productPriceSell = row.ProductPriceSell;
        const productStockQty = row.TotalStockQty;
        option += `
        <option
          value="${productId}"
          data-productname="${productName}"
          data-pricebuy="${productPriceBuy}"
          data-pricesell="${productPriceSell}"
          data-qty="${productStockQty}"
        >
          ${productName}
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
const productListRefStock2 = async () => {
  const { status, response } = await getListRefStock();
  if (status) {
    const existed = response.length >= 1;
    let option = `<option selected disabled>Choose One Of Products</option>`;
    if (existed) {
      response.forEach((row) => {
        const productId = row.ProductId;
        const productName = row.ProductName;
        const productPriceBuy = row.ProductPriceBuy;
        const productPriceSell = row.ProductPriceSell;
        const productStockQty = row.TotalStockQty;
        option += `
        <option
          value="${productId}"
          data-productname="${productName}"
          data-pricebuy="${productPriceBuy}"
          data-pricesell="${productPriceSell}"
          data-qty="${productStockQty}"
        >
          ${productName} - ${formatRupiah2(productPriceSell)} - Qty :
          ${productStockQty}
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
const listProductRefStockCreate = async () => {
  const option = await productListRefStock();
  $("select#Stock-refproduct-search-name").html(option);
};
const listProductRefStockRead = async () => {
  const option = await productListRefStock1();
  $("select#Stock-refproduct-search").html(option);
};
const listProductRefStockReadDate = async () => {
  const list = await productList();
  const option = `
  <select class="form-control w-auto mb-3" id="Stock-date-product">
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
  productListRefStock,
  productListRefStock2,
  listProductRefStockCreate,
  listProductRefStockRead,
  listProductRefStockReadDate,
  listProductRefSalesRead,
  listProductRefSalesReadDate,
};
