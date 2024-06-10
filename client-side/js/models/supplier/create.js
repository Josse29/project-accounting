import { createSupplier } from "../../../../serverless-side/functions/supplier.js";
import { getSupplierAgain } from "./read.js";
import { successActionSupplier } from "./ui.js";

// supplier-create-name
$(document).ready(function () {

    $("#supplier-create-submit").on("click", () => {
        const supplierName = $("#supplier-create-name").val()
        const supplierInfo = $("#supplier-create-info").val()
        const supplierImg = document.getElementById("supplier-create-img").files
        // with image
        if (supplierImg.length >= 1) {
            const reader = new FileReader();
            reader.onload = function () {
                const imgbase64 = reader.result
                createSupplier(supplierName, supplierInfo, imgbase64, (status, response) => {
                    if (status) {
                        getSupplierAgain()
                        successActionSupplier(response)
                    }
                    if (!status) {
                        console.error(response)
                    }
                })
            }
            reader.readAsDataURL(supplierImg[0]);
        }
        // without image
        if (supplierImg.length < 1) {
            createSupplier(supplierName, supplierInfo, "null", (status, response) => {
                if (status) {
                    getSupplierAgain()
                    successActionSupplier(response)
                }
                if (!status) {
                    console.error(response)
                }
            })
        }
    })
})
