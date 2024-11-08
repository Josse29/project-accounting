import { deleteById } from "./services.js";
import { getSupplier1, getSupplierRef } from "./utils.js";
import { uiAlertSuccess } from "./ui.js";

$("#supplier-table")
  .off("click", "#supplierDelete")
  .on("click", "#supplierDelete", function () {
    // get all from params
    const supplier = $(this).closest("tr")[0].dataset;
    const supplierId = parseInt(supplier.supplierid);
    const supplierName = supplier.suppliername;
    $("#supplierDeleteModalLabel").text(supplierName);
    $("#supplier-delete-name").html(
      `Are you sure to delete <b>${supplierName}</b> ?`
    );
    // event submit delete
    $("#supplier-delete-submit")
      .off("click")
      .on("click", async () => {
        const req = {
          supplierId,
          supplierName,
        };
        const { status, response } = await deleteById(req);
        if (status) {
          await getSupplier1();
          await getSupplierRef();
          uiAlertSuccess(response);
          $("#supplierDeleteModal").modal("hide");
        }
        if (!status) {
          console.error(response);
        }
      });
  });
