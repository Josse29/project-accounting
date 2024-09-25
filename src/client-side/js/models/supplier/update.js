import { updateSupplier } from "../../../../serverless-side/functions/supplier.js";
import { getSupplierAgain, getSupplierRef } from "./read.js";
import { uiAlertFailUpdate, uiAlertSuccess } from "./ui.js";
import { capitalizeWord } from "../../utils/formatCapitalize.js";
import { getImageBase64 } from "../../utils/loadImg.js";
$(document).ready(function () {
  $("#supplier-table")
    .off("click", "#supplierUpdate")
    .on("click", "#supplierUpdate", function () {
      $("input#supplier-update-img").val("");
      $("div#supplier-update-failed").html("");
      // get from params
      const supplier = this.dataset;
      const supplierName = supplier.suppliername;
      const supplierInfo = supplier.supplierinfo;
      const supplierImg = supplier.supplierimg;
      let cancelImg = false;
      //name
      $("#supplierUpdateModalLabel").text(supplierName);
      $("#supplier-update-name").val(supplierName);
      console.log(supplier);
      console.log(supplierImg);
      // with image
      if (supplierImg !== "null") {
        $("#supplier-update-img-preview").attr("src", supplierImg);
        $("#supplier-update-img-section").show();
      }
      // without img
      if (supplierImg === "null") {
        $("#supplier-update-img-preview").attr("src", "");
        $("#supplier-update-img-section").hide();
      }
      // information
      $("#supplier-update-info").val(supplierInfo);
      // update preview image
      $("#supplier-update-img")
        .off("change")
        .on("change", async (event) => {
          try {
            const files = event.target.files;
            const validImageTypes = ["image/jpeg", "image/png", "image/gif"];
            if (files.length > 0) {
              if (validImageTypes.includes(files[0].type)) {
                const imgBase64 = await getImageBase64(files[0]);
                $("#supplier-update-img-preview").attr("src", imgBase64);
                $("#supplier-update-img-section").show();
              }
              if (!validImageTypes.includes(files[0].type)) {
                $("#supplier-update-img-section").hide();
              }
              cancelImg = false;
            }
          } catch (error) {
            console.error(error);
          }
        });
      // cancel image
      $("label#supplier-update-img-cancel")
        .off("click")
        .on("click", function () {
          $("input#supplier-update-img").val("");
          $("#supplier-update-img-section").hide();
          cancelImg = true;
        });
      // event submit update
      $("#supplier-update-submit")
        .off("click")
        .on("click", async () => {
          try {
            const supplierId = parseInt(supplier.supplierid);
            const supplierName = capitalizeWord(
              $("#supplier-update-name").val()
            );
            const supplierInfo = $("#supplier-update-info").val();
            const supplierImgVal = document.getElementById(
              "supplier-update-img"
            ).files;
            let imgBase64 = ``;
            const validImageTypes = ["image/jpeg", "image/png", "image/gif"];
            if (!cancelImg) {
              if (
                supplierImgVal.length > 0 &&
                validImageTypes.includes(supplierImgVal[0].type)
              ) {
                imgBase64 = await getImageBase64(supplierImgVal[0]);
              } else {
                imgBase64 = supplierImg;
              }
            }
            if (cancelImg) {
              imgBase64 = "null";
            }
            // action createSupplier
            const req = {
              supplierId,
              supplierName,
              supplierInfo,
              supplierImgVal,
              imgBase64,
            };
            const response = await updateSupplier(req);
            getSupplierAgain();
            getSupplierRef();
            uiAlertSuccess(response);
            $("#supplierUpdateModal").modal("hide");
          } catch (error) {
            const errMsg = error || error.message;
            uiAlertFailUpdate(errMsg);
            console.error(error);
            const modalBody = $("#supplier-update-modalBody").get(0);
            modalBody.scrollTo({
              top: 0,
              behavior: "smooth",
            });
          }
        });
    });
});
