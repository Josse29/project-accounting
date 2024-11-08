import { deleteByProductId } from "../persediaan/services.js";
import { deletedById } from "./services.js";
import { uiAlertSuccess } from "./ui.js";
import { getProductAll, getProductRef } from "./utils.js";

// Delete Product event binding mckkkk
$("tbody#product-table")
  .off("click", "#deleteProduct")
  .on("click", "#deleteProduct", function () {
    const product = $(this).closest("tr")[0].dataset;
    const productid = parseInt(product.productid);
    const productName = product.productname;
    const konfirmasiDelete = `Are you sure to delete - <span class="fw-bold">${productName}</span> ?`;
    $("#product-delete-label").text(productName);
    $("#product-confirm-text").html(konfirmasiDelete);
    // Hapus event listener sebelumnya jika ada MCCCCCKKKKKKKK
    $("#sureDelete")
      .off("click")
      .on("click", async () => {
        const req = {
          productid,
          productName,
        };
        await deleteByProductId(productid);
        const { status, response } = await deletedById(req);
        if (status) {
          await getProductAll();
          await getProductRef();
          uiAlertSuccess(response);
          $("#confirmDeleteProductModal").modal("hide");
        }
        if (!status) {
          console.error(response);
        }
      });
  });
