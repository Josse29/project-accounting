import { deleteSupplier } from "../../../../serverless-side/functions/supplier.js";
import { getSupplierAgain, getSupplierRef } from "./read.js";
import { successActionSupplier } from "./ui.js";

$(document).ready(function () {
  $(document).on("click", "#supplierDelete", function () {
    // get all from params
    const supplier = this.dataset;
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
        try {
          const response = await deleteSupplier(supplierId, supplierName);
          getSupplierAgain();
          getSupplierRef();
          successActionSupplier(response);
        } catch (error) {
          console.error(error);
        }
      });
  });
});
