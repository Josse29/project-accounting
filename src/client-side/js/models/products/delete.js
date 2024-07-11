import { deleteProductId } from "../../../../serverless-side/functions/product.js";
import { getProductRef, getProductsAgain } from "./read.js";
import { successActionProduct } from "./ui.js";

$(document).ready(function () {
  // Delete Product event binding mckkkk
  $(document).on("click", "#deleteProduct", function () {
    const product = this.dataset;
    console.log(product);
    const productid = product.productid;
    const productName = product.productname;
    const konfirmasiDelete = `Apakah anda yakin menghapus - <span class="fw-bold">${productName}</span> ?`;
    $("#product-delete-label").text(productName);
    $("#product-confirm-text").html(konfirmasiDelete);

    // Hapus event listener sebelumnya jika ada MCCCCCKKKKKKKK
    $("#sureDelete").off("click");
    $("#sureDelete").on("click", () => {
      deleteProductId(productid, productName, (status, response) => {
        if (status) {
          getProductsAgain();
          getProductRef();
          successActionProduct(response);
        }
        if (!status) {
          console.error(response);
        }
      });
    });
  });
});
