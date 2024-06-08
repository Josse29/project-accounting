import { updateSupplier } from "../../../../serverless-side/functions/supplier.js"
import { getSupplierAgain } from "./read.js"
import { successActionSupplier } from "./ui.js"
$(document).ready(function () {
    $(document).on("click", "#supplierUpdate", function () {
        const supplier = this.dataset;
        console.log(supplier)
        $("#supplierUpdateModalLabel").text(supplier.suppliername)
        $("#supplier-update-name").val(supplier.suppliername)
        $("#supplier-update-info").val(supplier.supplierinfo)
        $("#supplier-update-submit").on("click", () => {
            const supplierId = parseInt(supplier.supplierid)
            const supplierName = $("#supplier-update-name").val()
            const supplierInfo = $("#supplier-update-info").val()
            updateSupplier(supplierId, supplierName, supplierInfo, (status, response) => {
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