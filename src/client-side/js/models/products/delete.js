import { deletePersediaanProductId } from "../../../../serverless-side/functions/persediaan.js";
import { deleteProductId } from "../../../../serverless-side/functions/product.js";
import { getProductRef, getProductsAgain } from "./read.js";
import { uiAlertSuccess } from "./ui.js";

// Delete Product event binding mckkkk
$("tbody#product-table")
  .off("click", "#deleteProduct")
  .on("click", "#deleteProduct", function () {
    const product = this.dataset;
    const productid = parseInt(product.productid);
    const productName = product.productname;
    const konfirmasiDelete = `Are you sure to delete - <span class="fw-bold">${productName}</span> ?`;
    $("#product-delete-label").text(productName);
    $("#product-confirm-text").html(konfirmasiDelete);
    // Hapus event listener sebelumnya jika ada MCCCCCKKKKKKKK
    $("#sureDelete")
      .off("click")
      .on("click", async () => {
        try {
          await deletePersediaanProductId(productid);
          const response = await deleteProductId(productid, productName);
          getProductsAgain();
          getProductRef();
          uiAlertSuccess(response);
          $("#confirmDeleteProductModal").modal("hide");
        } catch (error) {
          console.error(error);
        }
      });
  });
