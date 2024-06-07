import { getSupplier } from "../../../../serverless-side/functions/supplier.js";
import { trSupplier } from "./ui.js";

$(document).ready(function () {
    getSupplier((status, response) => {
        if (status) {
            let tr = ``
            console.log(response)
            response.forEach(element => {
                tr += trSupplier(element)
            });
            $("#supplier-data").html(tr)
        }
        if (!status) {
            console.error(response)
        }
    })
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

