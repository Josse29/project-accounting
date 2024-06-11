import { deleteSatuan } from "../../../../serverless-side/functions/satuan.js";
import { getSatuanAgain } from "./read.js";
import { successActionSatuan } from "./ui.js";

$(document).ready(function () {
    $(document).on("click", "#satuanDelete", function () {
        // get from params
        const satuan = this.dataset;
        const satuanid = parseInt(satuan.satuanid)
        const satuanName = satuan.satuanname

        $("#satuanDeleteModalLabel").text(satuanName)
        $("#satuan-delete-satuanname").html(`Apakah anda yakin menghapus <b>${satuanName}</b> ?`)

        // Hapus event listener sebelumnya jika ada MCCCCCKKKKKKKK
        $("#satuan-delete-sure").off("click");

        // event submit delete
        $("#satuan-delete-sure").on("click", () => {
            deleteSatuan(satuanid, satuanName, (status, response) => {
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