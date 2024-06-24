import { getSatuan } from "../../../../serverless-side/functions/satuan.js";
import { trSatuan } from "./ui.js";

$(document).ready(function () {
    // get all satuan
    getSatuan((status, response) => {
        if (status) {
            let tr = ``
            response.forEach(element => {
                tr += trSatuan(element)
            });
            $("#satuan-data").html(tr)
        }
        if (!status) {
            console.error(response)
        }
    })
    // get-detail-satuan | get id satuan
    $(document).on("click", "#satuanDetail", function () {
        console.log("clicked button")
        const satuan = this.dataset
        $("#detailSatuanModalLabel").text(satuan.satuanname)
        $("#detail-satuan-name").text(satuan.satuanname)
        $("#detail-satuan-keterangan").text(satuan.satuaninfo)
    });
})
export const getSatuanAgain = () => {
    // get all satuan
    getSatuan((status, response) => {
        if (status) {
            let tr = ``
            response.forEach(element => {
                tr += trSatuan(element)
            });
            $("#satuan-data").html(tr)
        }
        if (!status) {
            console.error(response)
        }
    })
}