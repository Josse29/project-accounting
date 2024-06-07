import { createSatuan } from "../../../../serverless-side/functions/satuan.js"
import { getSatuanAgain } from "./read.js"
import { successActionSatuan } from "./ui.js"

$(document).ready(function () {
    $("#product-create-submit").on("click", () => {
        const satuanName = $("#create-satuan-name").val()
        const satuanInfo = $("#create-satuan-keterangan").val()
        createSatuan(satuanName, satuanInfo, (status, response) => {
            if (status) {
                successActionSatuan(response)
                getSatuanAgain()
            }
            if (!status) {
                console.log(response)
            }
        })
    })
})