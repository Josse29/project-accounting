import {
  getPersediaanQty,
  updatePersediaan,
} from "../../../../serverless-side/functions/persediaan.js";
import { getTimeNow } from "../../utils/formatWaktu.js";
import { listProductRefPersediaanUpdate } from "../products/list.js";
import { getPersediaanAgain } from "./read.js";
import { uiSuccessActionPersediaan } from "./ui.js";

$(document).ready(function () {
  $(document).on("click", "#persediaan-update-btn", function () {
    listProductRefPersediaanUpdate();
    const persediaan = this.dataset;
    // get all params
    $("#persediaan-update-label").text(persediaan.productname);
    $("#persediaan-update-date").text(persediaan.persediaandate);
    $("#persediaan-update-second").text(persediaan.persediaansecond);
    $("#persediaan-refproduct-update-id").val(persediaan.productid);
    $("input#persediaan-refproduct-update-rp").val(
      parseFloat(persediaan.productprice)
    );
    $("input#persediaan-update-qty").val(persediaan.persediaanqty);
    $("textarea#persediaan-update-info").val(persediaan.persediaaninfo);
    $("input#persediaan-refproduct-update-id").val(
      parseInt(persediaan.productid)
    );
    $("input#persediaan-refproduct-update-qty").val(
      parseInt(persediaan.persediaanqty)
    );
    getPersediaanQty(parseInt(persediaan.productid), (status, response) => {
      if (status) {
        const persediaan = response[0];
        $("input#persediaan-refproduct-update-search").val(
          `${persediaan.ProductName} - TotalQty : ${persediaan.TotalQty}`
        );
      }
      if (!status) {
        console.error(response);
      }
    });
    // function update increse or decrease qty
    let persediaanUpdateQty = parseFloat(
      $("input#persediaan-update-qty").val()
    );
    $("input#persediaan-update-qty").on("keyup", function () {
      persediaanUpdateQty = $(this).val();
    });
    $("button#persediaan-update-qty-decrease").on("click", function () {
      persediaanUpdateQty--;
      $("input#persediaan-update-qty").val(persediaanUpdateQty);
    });
    $("button#persediaan-update-qty-increase").on("click", function () {
      persediaanUpdateQty++;
      $("input#persediaan-update-qty").val(persediaanUpdateQty);
    });
    // action submit
    $("button#persediaan-update-submit")
      .off("click")
      .on("click", function () {
        const { formattedDDMY, formattedHMS } = getTimeNow();
        const valPersediaanId = parseInt(persediaan.persediaanid);
        const valPersediaanDDMY = formattedDDMY;
        const valPersediaanHMS = formattedHMS;
        const valPersediaanProductId = parseInt(
          $("#persediaan-refproduct-update-id").val()
        );
        const valPersediaanQty = parseFloat(
          $("input#persediaan-update-qty").val()
        );
        const valPersediaanRp = parseFloat(
          $("input#persediaan-refproduct-update-rp").val()
        );
        const valPersediaanInfo = $("#persediaan-update-info").val();
        const valProductName = $("#persediaan-refproduct-update-name").val();
        updatePersediaan(
          valPersediaanId,
          valPersediaanDDMY,
          valPersediaanHMS,
          valPersediaanProductId,
          valPersediaanQty,
          valPersediaanRp,
          valPersediaanInfo,
          valProductName,
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
