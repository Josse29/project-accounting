import {
  getPersediaanQty,
  updatePersediaan,
} from "../../../../serverless-side/functions/persediaan.js";
import { getTimeNow } from "../../utils/formatWaktu.js";
import { getPersediaanAgain } from "./read.js";
import { uiFailedUpdate, uiSucceedUpdate } from "./ui.js";

$(document).ready(function () {
  $(document)
    .off("click", "#persediaan-update-btn")
    .on("click", "#persediaan-update-btn", async function () {
      try {
        $("#persediaan-update-failed").html(``);
        const persediaan = this.dataset;
        const persediaanId = parseInt(persediaan.persediaanid);
        const persediaanQty = parseFloat(persediaan.persediaanqty);
        const persediaanName = persediaan.productname;
        const persediaanProductId = parseInt(persediaan.productid);
        const persediaanProductBuy = parseFloat(persediaan.productpricebuy);
        // get all params and value
        $("#persediaan-update-label").text(persediaan.productname);
        $("#persediaan-refproduct-update-search").val(persediaan.productname);
        $("#persediaan-refproduct-update-name").val(persediaan.productname);
        $("#persediaan-update-date").text(persediaan.persediaandate);
        $("#persediaan-update-second").text(persediaan.persediaansecond);
        $("textarea#persediaan-update-info").val(persediaan.persediaaninfo);
        $("input#persediaan-refproduct-update-rp").val(persediaanProductBuy);
        $("input#persediaan-refproduct-update-id").val(persediaanProductId);
        $("input#persediaan-refproduct-update-qty").val(persediaanQty);
        // get qty
        const totalQty = await getPersediaanQty(persediaanProductId);
        $("input#persediaan-refproduct-update-search").val(
          `${persediaanName} - Total Qty : ${totalQty}`
        );
        // function update increse or decrease qty
        let persediaanUpdateQty = $(
          "input#persediaan-refproduct-update-qty"
        ).val();
        $("input#persediaan-refproduct-update-qty")
          .off("keyup")
          .on("keyup", function () {
            persediaanUpdateQty = $(this).val();
          });
        $("button#persediaan-update-qty-decrease")
          .off("click")
          .on("click", function () {
            persediaanUpdateQty--;
            $("input#persediaan-refproduct-update-qty").val(
              persediaanUpdateQty
            );
          });
        $("button#persediaan-update-qty-increase")
          .off("click")
          .on("click", function () {
            persediaanUpdateQty++;
            $("input#persediaan-refproduct-update-qty").val(
              persediaanUpdateQty
            );
          });
        // function action to update persediaan
        $("button#persediaan-update-submit")
          .off("click")
          .on("click", async function () {
            try {
              // get value
              const { formattedDDMY, formattedHMS } = getTimeNow();
              const valPersediaanId = persediaanId;
              const valPersediaanDDMY = formattedDDMY;
              const valPersediaanHMS = formattedHMS;
              const valPersediaanProductId = parseInt(
                $("#persediaan-refproduct-update-id").val()
              );
              const valPersediaanQty = parseFloat(
                $("input#persediaan-refproduct-update-qty").val()
              );
              const valPersediaanRp = parseFloat(
                $("input#persediaan-refproduct-update-rp").val()
              );
              const valPersediaanInfo = $("#persediaan-update-info").val();
              const valProductName = $(
                "#persediaan-refproduct-update-name"
              ).val();
              // send to params
              const req = {
                valPersediaanId,
                valPersediaanDDMY,
                valPersediaanHMS,
                valPersediaanProductId,
                valPersediaanQty,
                valPersediaanRp,
                valPersediaanInfo,
                valProductName,
              };
              const response = await updatePersediaan(req);
              uiSucceedUpdate(response);
              getPersediaanAgain();
              $("#persediaanUpdateModal").modal("hide");
            } catch (error) {
              const errMsg = error || error.message;
              console.error(errMsg);
              uiFailedUpdate(errMsg);
              const modalBody = $("#persediaan-update-modal-body").get(0);
              modalBody.scrollTo({
                top: 0,
                behavior: "smooth",
              });
            }
          });
      } catch (error) {
        const errMsg = error || error.message;
        console.error(errMsg);
      }
    });
});
