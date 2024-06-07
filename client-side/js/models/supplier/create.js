import { createSupplier } from "../../../../serverless-side/functions/supplier.js";
import { getSupplierAgain } from "./read.js";
import { successActionSupplier } from "./ui.js";

// supplier-create-name
$(document).ready(function () {

    $("#supplier-create-submit").on("click", () => {
        const supplierName = $("#supplier-create-name").val()
        const supplierInfo = $("#supplier-create-info").val()
        createSupplier(supplierName, supplierInfo, (status, response) => {
            if (status) {
                getSupplierAgain()
                successActionSupplier(response)
            }
            if (!status) {
                console.error(response)
            }
        })
    })
})
