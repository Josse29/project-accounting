import { getListProduct } from "../../../../serverless-side/functions/product.js";
$(document).ready(function () {
  getListProduct("", (status, response) => {
    if (status) {
      let option = `<option selected disabled>Produk</option>`;
      response.forEach((row) => {
        option += `<option value=${row.ProductName}>${row.ProductName}</option>`;
      });
      $("select#persediaan-refproduct-search").html(option);
    }
    if (!status) {
      console.error(response);
    }
  });
});
