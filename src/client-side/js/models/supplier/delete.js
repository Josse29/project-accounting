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
      `Apakah anda yakin menghapus <b>${supplierName}</b> ?`
    );
    // Hapus event listener sebelumnya jika ada MCCCCCKKKKKKKK
    $("#supplier-delete-submit").off("click");
    // event submit delete
    $("#supplier-delete-submit").on("click", () => {
      deleteSupplier(supplierId, supplierName, (status, response) => {
        // if succcess delete
        if (status) {
          getSupplierAgain();
          getSupplierRef();
          successActionSupplier(response);
        }
        // if fail delete
        if (!status) {
          console.error(response);
        }
      });
    });
  });
});
