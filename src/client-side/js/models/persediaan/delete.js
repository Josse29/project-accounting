import {
  deletePersediaan,
  deletePersediaanAll,
} from "../../../../serverless-side/functions/persediaan.js";
import { addSpace } from "../../utils/formatSpace.js";
import { formatWaktuIndo } from "../../utils/formatWaktu.js";
import { getPersediaanAgain } from "./read.js";
import { uiFailedDelete, uiSuccessActionPersediaan } from "./ui.js";

$(document).ready(function () {
  // delete by-id
  $(document)
    .off("click", "#persediaan-delete-btn")
    .on("click", "#persediaan-delete-btn", function () {
      $("#persediaan-delete-failed").html(``);
      const persediaan = this.dataset;
      const persediaanId = parseInt(persediaan.persediaanid);
      const persediaanProductId = parseInt(persediaan.productid);
      const persediaanName = persediaan.productname;
      const persediaanqty = parseInt(persediaan.persediaanqty);
      $("#persediaan-delete-name").text();
      let txtPersediaanQty = ``;
      if (persediaanqty >= 1) {
        txtPersediaanQty = `<span class="badge text-bg-success">+ ${persediaanqty}</span>`;
      }
      if (persediaanqty < 0) {
        txtPersediaanQty = `<span class="badge text-bg-danger">${addSpace(
          persediaanqty
        )}</span>`;
      }
      const konfirmasiDelete = `Apakah anda yakin menghapus ${txtPersediaanQty} ${persediaanName} pada <span class="fw-bold">Tanggal : ${formatWaktuIndo(
        persediaan.persediaanddmy
      )} Waktu ${persediaan.persediaanhms} </span> ?`;
      $("#confirm-text").html(konfirmasiDelete);
      // action to delete
      $("#persediaan-delete-yes")
        .off("click")
        .on("click", function () {
          deletePersediaan(
            persediaanId,
            persediaanName,
            persediaanqty,
            persediaanProductId,
            (status, response) => {
              if (status) {
                getPersediaanAgain();
                uiSuccessActionPersediaan(response);
                $("#persediaanDeleteModal").modal("hide");
              }
              if (!status) {
                uiFailedDelete(response);
              }
            }
          );
        });
    });
  // delete all
  $("button#persediaan-delete-all-yes")
    .off("click")
    .on("click", function () {
      deletePersediaanAll((status, response) => {
        if (status) {
          uiSuccessActionPersediaan(response);
          getPersediaanAgain();
          $("#persediaanDeleteAllModal").modal("hide");
        }
        if (!status) {
          console.log(response);
        }
      });
    });
});
