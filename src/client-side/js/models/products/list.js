import { getListProduct } from "../../../../serverless-side/functions/product.js";
// function to update when create list product ref persediaan
export const listProductRefPersediaanCreate = async () => {
  try {
    const response = await getListProduct("");
    console.log(response);
    const existed = response.length >= 1;
    let option = ``;
    if (existed) {
      option = `<option selected disabled>Choose One Of Products</option>`;
      response.forEach((row) => {
        option += `<option value=${row.ProductId} data-pricebuy=${row.ProductPriceBeli}>${row.ProductName}</option>`;
      });
    }
    if (!existed) {
      option = `<option selected disabled class="fst-italic">Product Empty....</option>`;
    }
    $("select#persediaan-refproduct-search-name").html(option);
  } catch (error) {
    console.error(error);
  }
};
export const listProductRefPersediaanRead = async () => {
  try {
    const response = await getListProduct("");
    const existed = response.length >= 1;
    let option = ``;
    if (existed) {
      option = `<option selected disabled>Choose One Of Products</option>`;
      response.forEach((row) => {
        option += `<option value=${row.ProductId}>${row.ProductName}</option>`;
      });
    }
    if (!existed) {
      option = `<option selected disabled>Product Empty</option>`;
    }
    $("select#persediaan-refproduct-search").html(option);
  } catch (error) {
    console.error(error);
  }
};
export const listProductRefPersediaanReadDate = async () => {
  try {
    const response = await getListProduct("");
    const existed = response.length >= 1;
    let option = ``;
    if (existed) {
      option = `<option selected disabled>Choose One Of Products</option>`;
      response.forEach((row) => {
        option += `<option value=${row.ProductId}>${row.ProductName}</option>`;
      });
    }
    if (!existed) {
      option = `<option selected disabled>Product Empty</option>`;
    }
    $("select#persediaan-date-product").html(option);
  } catch (error) {
    console.error(error);
  }
};
export const listProductRefSalesRead = async () => {
  try {
    const response = await getListProduct("");
    const existed = response.length >= 1;
    let option = ``;
    if (existed) {
      option = `<option selected disabled>Choose One Of Products</option>`;
      response.forEach((row) => {
        option += `<option value=${row.ProductId}>${row.ProductName}</option>`;
      });
    }
    if (!existed) {
      option = `<option selected disabled>Product Empty</option>`;
    }
    $("select#sales-read-productid").html(option);
  } catch (error) {
    console.error(error);
  }
};
export const listProductRefSalesReadDate = async () => {
  try {
    const response = await getListProduct("");
    const existed = response.length >= 1;
    let option = ``;
    if (existed) {
      option = `<option selected disabled>Choose One Of Products</option>`;
      response.forEach((row) => {
        option += `<option value=${row.ProductId}>${row.ProductName}</option>`;
      });
    }
    if (!existed) {
      option = `<option selected disabled>Product Empty</option>`;
    }
    $("select#sales-read-productid-date").html(option);
  } catch (error) {
    console.error(error);
  }
};
