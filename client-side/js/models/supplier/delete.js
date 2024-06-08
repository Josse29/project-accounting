import { deleteSupplier } from "../../../../serverless-side/functions/supplier.js"
import { getSupplierAgain } from "./read.js";
import { successActionSupplier } from "./ui.js";

$(document).ready(function () {
    $(document).on("click", "#supplierDelete", function () {
        const supplier = this.dataset;
        const supplierId = parseInt(supplier.supplierid)
        const supplierName = supplier.suppliername
        $("#supplierDeleteModalLabel").text(supplierName)
        $("#supplier-delete-name").html(`Apakah anda yakin menghapus <b>${supplierName}</b> ?`)
        $("#supplier-delete-submit").on("click", () => {
            deleteSupplier(supplierId, supplierName, (status, response) => {
                if (status) {
                    successActionSupplier(response)
                    getSupplierAgain()
                }
                if (!status) {
                    console.error(response)
                }
            })
        })
    });
})