import { getSupplier } from "../../../../serverless-side/functions/supplier.js";
import { trSupplier } from "./ui.js";

$(document).ready(function () {
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
        }
        if (!status) {
            console.error(response)
        }
    })
    $(document).on("click", "#supplierDetail", function () {
        const supplier = this.dataset;
        const supplierName = supplier.suppliername
        const supplierInfo = supplier.supplierinfo
        $("#supplierDetailModalLabel").text(supplierName)
        $("#supplier-detail-name").text(supplierName)
        $("#supplier-detail-info").text(supplierInfo)
    });
})
export const getSupplierAgain = () => {
    getSupplier((status, response) => {
        if (status) {
            let tr = ``
            response.forEach(element => {
                tr += trSupplier(element)
            });
            $("#supplier-data").html(tr)
        }
        if (!status) { console.error(response) }
    })
}

