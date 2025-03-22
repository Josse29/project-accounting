import { deleteAll, deleteById } from "./services.js";

import { formatWaktuIndo } from "../../utils/formatTime.js";
import { uiAlertFailDelete, uiAlertSuccess } from "./ui.js";
import { getAll } from "./utils.js";

// 1.delete by-id
$("tbody#persediaan-table")
  .off("click", "#persediaan-delete-btn")
  .on("click", "#persediaan-delete-btn", function () {
    $("#persediaan-delete-failed").html(``);
    // get data from attr button
    const persediaan = $(this).closest("tr")[0].dataset;
    const valPersediaanYMD = formatWaktuIndo(persediaan.persediaanddmy);
    const valPersediaanHMS = persediaan.persediaanhms;
    const valPersediaanId = parseInt(persediaan.persediaanid);
    const valPersediaanProductId = parseInt(persediaan.productid);
    const valProductName = persediaan.productname;
    const valPersediaanQty = parseInt(persediaan.persediaanqty);
    // name
    $("#persediaan-delete-name").text(valProductName);
    // qty
    let txtQty =
      valPersediaanQty >= 1
        ? `+ ${valPersediaanQty}`
        : `- ${Math.abs(valPersediaanQty)}`;
    const spanQty = `<span class="badge ${
      valPersediaanQty >= 1 ? "text-bg-success" : "text-bg-danger"
    }">${txtQty}</span>`;
    // confirm delete section
    const divConfirmDelete = `
    Are you sure to delete ${spanQty} ${valProductName} on <span class="fw-bold">Date : ${valPersediaanYMD} Hours : ${valPersediaanHMS} </span> ?`;
    $("#confirm-text").html(divConfirmDelete);
    // req-to-db
    $("#persediaan-delete-yes")
      .off("click")
      .on("click", async function () {
        const req = {
          valPersediaanId,
          valProductName,
          valPersediaanQty,
          valPersediaanProductId,
        };
        const { status, response } = await deleteById(req);
        if (status) {
          await getAll();
          uiAlertSuccess(response);
          $("#persediaanDeleteModal").modal("hide");
        }
        if (!status) {
          console.error(response);
          uiAlertFailDelete(response);
          const modalBody = $("#persediaan-delete-modal-body").get(0);
          modalBody.scrollTo({
            top: 0,
            behavior: "smooth",
          });
        }
      });
  });
// 2.delete all
// req-to-db
$("button#persediaan-delete-all-yes")
  .off("click")
  .on("click", async function () {
    const { status, response } = await deleteAll();
    if (status) {
      await getPersediaan1();
      uiAlertSuccess(response);
      $("#persediaanDeleteAllModal").modal("hide");
    }
    if (!status) {
      console.error(response);
    }
  });
