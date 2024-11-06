import { getList } from "./services.js";
const productList = async () => {
  const { status, response } = await getList("");
  if (status) {
    const existed = response.length >= 1;
    let option = `<option selected disabled>Choose One Of Products</option>`;
    if (existed) {
      response.forEach((row) => {
        option += `<option 
                      value=${row.ProductId} 
                      data-pricebuy=${row.ProductPriceBeli} 
                      data-pricesell=${row.ProductPriceJual}>
                        ${row.ProductName}
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
  }
};
// function to update when create list product ref persediaan
export const listProductRefPersediaanCreate = async () => {
  const option = await productList();
  $("select#persediaan-refproduct-search-name").html(option);
};
export const listProductRefPersediaanRead = async () => {
  const option = await productList();
  $("select#persediaan-refproduct-search").html(option);
};
export const listProductRefPersediaanReadDate = async () => {
  const option = await productList();
  $("select#persediaan-date-product").html(option);
};
export const listProductRefSalesRead = async () => {
  const option = await productList();
  $("select#sales-read-productid").html(option);
};
export const listProductRefSalesReadDate = async () => {
  const option = await productList();
  $("select#sales-read-productid-date").html(option);
};
