import { updateSupplier } from "../../../../serverless-side/functions/supplier.js";
import { getSupplierAgain, getSupplierRef } from "./read.js";
import { successActionSupplier } from "./ui.js";
import { capitalizeWord } from "../../utils/formatCapitalize.js";
$(document).ready(function () {
  $(document).on("click", "#supplierUpdate", function () {
    // get from params
    const supplier = this.dataset;
    // get vallue from params
    $("#supplierUpdateModalLabel").text(supplier.suppliername);
    $("#supplier-update-name").val(supplier.suppliername);
    $("#supplier-update-info").val(supplier.supplierinfo);
    // with image
    if (supplier.supplierimg !== "null") {
      $("#supplier-update-img-section").show();
      $("#supplier-update-img-preview").attr("src", supplier.supplierimg);
    }
    // without img
    if (supplier.supplierimg === "null") {
      $("#supplier-update-img-section").hide();
      $("#supplier-update-img-preview").attr("src", "");
    }
    // cancel image
    let cancelImg = false;
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
      .on("click", () => {
        const supplierId = parseInt(supplier.supplierid);
        const supplierName = capitalizeWord($("#supplier-update-name").val());
        const supplierInfo = $("#supplier-update-info").val();
        const supplierImg = document.getElementById(
          "supplier-update-img"
        ).files;
        // with new image
        if (supplierImg.length >= 1) {
          const reader = new FileReader();
          reader.onload = function () {
            const imgbase64 = reader.result;
            callUpdateSupplier(imgbase64);
          };
          reader.readAsDataURL(supplierImg[0]);
        }
        // without image
        if (supplierImg.length < 1) {
          if (cancelImg) {
            callUpdateSupplier("null");
          }
          if (!cancelImg) {
            callUpdateSupplier(supplier.supplierimg);
          }
        }
        // action createSupplier
        function callUpdateSupplier(imgbase64) {
          updateSupplier(
            supplierId,
            supplierName,
            supplierInfo,
            imgbase64,
            (status, response) => {
              if (status) {
                getSupplierAgain();
                getSupplierRef();
                successActionSupplier(response);
              }
              if (!status) {
                console.error(response);
              }
            }
          );
        }
      });
  });
});
