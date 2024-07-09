import { deletePersediaan } from "../../../../serverless-side/functions/persediaan.js";
import { addSpace } from "../../utils/formatSpace.js";
import { formatWaktuIndo } from "../../utils/formatWaktu.js";
import { getPersediaanAgain } from "./read.js";
import { uiSuccessActionPersediaan } from "./ui.js";

$(document).ready(function () {
  $(document).on("click", "#persediaan-delete-btn", function () {
    const persediaan = this.dataset;
    const persediaanqty = parseInt(persediaan.persediaanqty);
    $("#persediaan-delete-name").text(persediaan.productname);
    let txtPersediaanQty = ``;
    if (persediaanqty >= 1) {
      txtPersediaanQty = `<span class="badge text-bg-success">+ ${persediaanqty}</span>`;
    }
    if (persediaanqty < 0) {
      txtPersediaanQty = `<span class="badge text-bg-danger">${addSpace(
        persediaanqty
      )}</span>`;
    }
    const konfirmasiDelete = `Apakah anda yakin menghapus ${txtPersediaanQty} ${
      persediaan.productname
    } pada <span class="fw-bold">Tanggal : ${formatWaktuIndo(
      persediaan.persediaanddmy
    )} Waktu ${persediaan.persediaanhms} </span> ?`;
    $("#confirm-text").html(konfirmasiDelete);
    // action to delete
    $("#persediaan-delete-yes")
      .off("click")
      .on("click", function () {
        deletePersediaan(
          parseInt(persediaan.persediaanid),
          persediaan.productname,
          persediaanqty,
          (status, response) => {
            if (status) {
              uiSuccessActionPersediaan(response);
              getPersediaanAgain();
            }
            if (!status) {
              console.error(response);
            }
          }
        );
      });
  });
});
