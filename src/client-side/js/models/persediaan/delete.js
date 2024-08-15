import { deletePersediaan } from "../../../../serverless-side/functions/persediaan.js";
import { addSpace } from "../../utils/formatSpace.js";
import { formatWaktuIndo } from "../../utils/formatWaktu.js";
import { getPersediaanAgain } from "./read.js";
import { uiFailedDelete, uiSuccessActionPersediaan } from "./ui.js";

$(document).ready(function () {
  // delete by-id
  $(document).on("click", "#persediaan-delete-btn", function () {
    $("#persediaan-delete-failed").html(``);
    const persediaan = this.dataset;
    const persediaanProductId = parseInt(persediaan.productid);
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
  $("button#persediaan-delete-all").on("click", function () {
    console.log("cuci-gudang");
  });
});
