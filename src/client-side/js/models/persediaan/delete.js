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
      const valPersediaanId = parseInt(persediaan.persediaanid);
      const valPersediaanProductId = parseInt(persediaan.productid);
      const valProductName = persediaan.productname;
      const valPersediaanQty = parseInt(persediaan.persediaanqty);
      $("#persediaan-delete-name").text();
      let txtPersediaanQty = ``;
      if (valPersediaanQty >= 1) {
        txtPersediaanQty = `<span class="badge text-bg-success">+ ${valPersediaanQty}</span>`;
      }
      if (valPersediaanQty < 0) {
        txtPersediaanQty = `<span class="badge text-bg-danger">${addSpace(
          valPersediaanQty
        )}</span>`;
      }
      const konfirmasiDelete = `Are you sure to delete ${txtPersediaanQty} ${valProductName} on <span class="fw-bold">Date : ${formatWaktuIndo(
        persediaan.persediaanddmy
      )} Hours : ${persediaan.persediaanhms} </span> ?`;
      $("#confirm-text").html(konfirmasiDelete);
      // action to delete
      $("#persediaan-delete-yes")
        .off("click")
        .on("click", async function () {
          try {
            const req = {
              valPersediaanId,
              valProductName,
              valPersediaanQty,
              valPersediaanProductId,
            };
            const response = await deletePersediaan(req);
            getPersediaanAgain();
            uiSuccessActionPersediaan(response);
            $("#persediaanDeleteModal").modal("hide");
          } catch (error) {
            const errMsg = error || error.message;
            uiFailedDelete(errMsg);
            console.error(errMsg);
            const modalBody = $("#persediaan-delete-modal-body").get(0);
            modalBody.scrollTo({
              top: 0,
              behavior: "smooth",
            });
          }
        });
    });
  // delete all
  $("button#persediaan-delete-all-yes")
    .off("click")
    .on("click", async function () {
      try {
        const response = await deletePersediaanAll();
        uiSuccessActionPersediaan(response);
        getPersediaanAgain();
        $("#persediaanDeleteAllModal").modal("hide");
      } catch (error) {
        const errMsg = error || error.message;
        console.error(errMsg);
      }
    });
});
