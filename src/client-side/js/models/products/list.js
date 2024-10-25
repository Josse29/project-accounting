import { getList } from "./services.js";
// function to update when create list product ref persediaan
export const listProductRefPersediaanCreate = async () => {
  const { status, response } = await getList("");
  if (status) {
    const existed = response.length >= 1;
    let option = `<option selected disabled>Choose One Of Products</option>`;
    if (existed) {
      response.forEach((row) => {
        option += `<option value=${row.ProductId} data-pricebuy=${row.ProductPriceBeli}>${row.ProductName}</option>`;
      });
    }
    if (!existed) {
      option += `<option disabled class="fst-italic text-center">Product Empty........</option>`;
    }
    $("select#persediaan-refproduct-search-name").html(option);
  }
  if (!status) {
    console.error(response);
  }
};
export const listProductRefPersediaanRead = async () => {
  const { status, response } = await getList("");
  if (status) {
    const existed = response.length >= 1;
    let option = `<option selected disabled>Choose One Of Products</option>`;
    if (existed) {
      response.forEach((row) => {
        option += `<option value=${row.ProductId} data-pricebuy=${row.ProductPriceBeli}>${row.ProductName}</option>`;
      });
    }
    if (!existed) {
      option += `<option disabled class="fst-italic text-center">Product Empty........</option>`;
    }
    $("select#persediaan-refproduct-search").html(option);
  }
  if (!status) {
    console.error(response);
  }
};
export const listProductRefPersediaanReadDate = async () => {
  const { status, response } = await getList("");
  if (status) {
    const existed = response.length >= 1;
    let option = `<option selected disabled>Choose One Of Products</option>`;
    if (existed) {
      response.forEach((row) => {
        option += `<option value=${row.ProductId} data-pricebuy=${row.ProductPriceBeli}>${row.ProductName}</option>`;
      });
    }
    if (!existed) {
      option += `<option disabled class="fst-italic text-center">Product Empty........</option>`;
    }
    $("select#persediaan-date-product").html(option);
  }
  if (!status) {
    console.error(response);
  }
};
export const listProductRefSalesRead = async () => {
  const { status, response } = await getList("");
  if (status) {
    const existed = response.length >= 1;
    let option = `<option selected disabled>Choose One Of Products</option>`;
    if (existed) {
      response.forEach((row) => {
        option += `<option value=${row.ProductId} data-pricesell=${row.ProductPriceJual}>${row.ProductName}</option>`;
      });
    }
    if (!existed) {
      option += `<option disabled class="fst-italic text-center">Product Empty........</option>`;
    }
    $("select#sales-read-productid").html(option);
  }
  if (!status) {
    console.error(response);
  }
};
export const listProductRefSalesReadDate = async () => {
  const { status, response } = await getList("");
  if (status) {
    const existed = response.length >= 1;
    let option = `<option selected disabled>Choose One Of Products</option>`;
    if (existed) {
      response.forEach((row) => {
        option += `<option value=${row.ProductId} data-pricesell=${row.ProductPriceJual}>${row.ProductName}</option>`;
      });
    }
    if (!existed) {
      option += `<option disabled class="fst-italic text-center">Product Empty........</option>`;
    }
    $("select#sales-read-productid-date").html(option);
  }
  if (!status) {
    console.error(response);
  }
};
