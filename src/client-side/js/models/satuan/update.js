import { updateSatuan } from "../../../../serverless-side/functions/satuan.js";
import { getSatuanAgain } from "./read.js";
import { successActionSatuan } from "./ui.js";

$(document).ready(function () {
    $(document).on("click", "#satuanEdit", function () {

        // get from params
        const satuan = this.dataset;

        $("#updateSatuanModalLabel").text(satuan.satuanname)
        $("#update-satuan-name").val(satuan.satuanname)
        $("#update-satuan-info").val(satuan.satuaninfo)

        // Hapus event listener sebelumnya jika ada MCCCCCKKKKKKKK
        $("#satuan-update-submit").off("click");

        // event submit update
        $("#satuan-update-submit").on("click", () => {
            const satuanId = parseInt(satuan.satuanid)
            const satuanName = $("#update-satuan-name").val()
            const satuanInfo = $("#update-satuan-info").val()
            updateSatuan(satuanId, satuanName, satuanInfo, (status, response) => {
                if (status) {
                    successActionSatuan(response)
                    getSatuanAgain()
                }
                if (!status) {
                    console.error(response)
                }
            })
        })
    });
})