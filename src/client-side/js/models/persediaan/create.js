import { getTimeNow } from "../../utils/formatWaktu.js";
import { createPersediaan } from "../../../../serverless-side/functions/persediaan.js";
import {
  uiBlankValue,
  uiFailedActionPersediaan,
  uiSuccessActionPersediaan,
} from "./ui.js";
import { listProductRefPersediaanCreate } from "../products/list.js";
import { getPersediaanAgain } from "./read.js";

$(document).ready(function () {
  $("button#btnpersediaanModal").on("click", function () {
    listProductRefPersediaanCreate();
    $("#sectionFailedActionPersediaan").html("");
    $("div#persediaan-create-stock").html("");
  });
  // function create increse or decrease qty
  let persediaanCreateQty = $("input#persediaan-create-qty").val();
  $("button#persediaan-create-decrease")
    .off("click")
    .on("click", function () {
      persediaanCreateQty--;
      $("input#persediaan-create-qty").val(persediaanCreateQty);
    });
  $("input#persediaan-create-qty").on("keyup", function () {
    persediaanCreateQty = $(this).val();
  });
  $("button#persediaan-create-increase")
    .off("click")
    .on("click", function () {
      persediaanCreateQty++;
      $("input#persediaan-create-qty").val(persediaanCreateQty);
    });
  // function action to create persediaan
  $("#persediaan-create-submit")
    .off("click")
    .on("click", () => {
      const { formattedDDMY, formattedHMS } = getTimeNow();
      const valProductName = $("#persediaan-refproduct-create-name").val();
      const valPersediaanDDMY = formattedDDMY;
      const valPersediaanHMS = formattedHMS;
      const valPersediaanProductId = parseInt(
        $("input#persediaan-refproduct-create-id").val()
      );
      const valPersediaanRp = $("input#persediaan-refproduct-create-rp").val();
      const valPersediaanQty = parseFloat(
        $("input#persediaan-create-qty").val()
      );
      const valPersediaanInfo = $("#persediaan-create-info").val();
      createPersediaan(
        valProductName,
        valPersediaanDDMY,
        valPersediaanHMS,
        valPersediaanProductId,
        valPersediaanQty,
        valPersediaanRp,
        valPersediaanInfo,
        (status, response) => {
          if (status) {
            getPersediaanAgain();
            uiSuccessActionPersediaan(response);
            uiBlankValue();
            $("#persediaanCreateModal").modal("hide");
            persediaanCreateQty = 0; //hufft
          }
          if (!status) {
            uiFailedActionPersediaan(response);
            console.error(response);
          }
        }
      );
    });
});
