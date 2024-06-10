import { getSupplier, getTotalSupplier } from "../../../../serverless-side/functions/supplier.js";
import { trSupplier, trSupplierZero } from "./ui.js";

$(document).ready(function () {

    // get total row supplier 
    getTotalSupplier($("#supplier-search").val(), (status, response) => {
        // success get total supplier
        if (status) {
            // if exist supplier
            if (response >= 1) {
                // get all supplier
                getSupplier((status, response) => {
                    if (status) {
                        let tr = ``
                        let option = ``
                        response.forEach(element => {
                            tr += trSupplier(element)
                            option += `<option value="${element.SupplierId}">${element.SupplierName}</option>`
                        });
                        $("#supplier-data").html(tr)
                        $("#inventory-refsupplier-create-name").html(option)
                        $("#supplier-pagination").removeClass("d-none")
                    }
                    if (!status) {
                        console.error(response)
                    }
                })
            }
            // if it doesn't exist supplier
            if (response < 1) {
                $("#supplier-data").html(trSupplierZero())
                $("#supplier-pagination").addClass("d-none")
            }
        }
        // failed get total supplier
        if (!status) {
            console.error(response)

        }
    })
    // get detail
    $(document).on("click", "#supplierDetail", function () {
        const supplier = this.dataset;
        const supplierName = supplier.suppliername
        const supplierInfo = supplier.supplierinfo
        const supplierImg = supplier.supplierimg
        $("#supplierDetailModalLabel").text(supplierName)
        $("#supplier-detail-name").text(supplierName)
        $("#supplier-detail-info").text(supplierInfo)
        // if exist photo
        if (supplierImg === "null") {
            $("#no-image").removeClass("d-none")
            $("#supplier-detail-img").attr('src', "")
        }
        // if it doesn't exist photo
        if (supplierImg !== "null") {
            $("#no-image").addClass("d-none")
            $("#supplier-detail-img").attr('src', supplierImg)
        }
    });
})
export const getSupplierAgain = () => {
    // get total row supplier 
    getTotalSupplier($("#supplier-search").val(), (status, response) => {
        // success get total supplier
        if (status) {
            $("#totalAllSupplier").html(response)
            // if exist supplier
            if (response >= 1) {
                // get all supplier
                getSupplier((status, response) => {
                    if (status) {
                        let tr = ``
                        let option = ``
                        response.forEach(element => {
                            tr += trSupplier(element)
                            option += `<option value="${element.SupplierId}">${element.SupplierName}</option>`
                        });
                        $("#supplier-data").html(tr)
                        $("#inventory-refsupplier-create-name").html(option)
                        $("#supplier-pagination").removeClass("d-none")
                    }
                    if (!status) {
                        console.error(response)
                    }
                })
            }
            // if it doesn't exist supplier
            if (response < 1) {
                $("#supplier-data").html(trSupplierZero())
                $("#supplier-pagination").addClass("d-none")
            }
        }
        // failed get total supplier
        if (!status) {
            console.error(response)
        }
    })
}

