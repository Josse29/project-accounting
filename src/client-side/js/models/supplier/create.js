import { createSupplier } from "../../../../serverless-side/functions/supplier.js";
import { getSupplierAgain } from "./read.js";
import { successActionSupplier, supplierCreateBlank } from "./ui.js";
import { capitalizeWord } from "../../utils/formatCapitalize.js";
// supplier-create-name
$(document).ready(function () {
  // Hapus event listener sebelumnya jika ada MCCCCCKKKKKKKK
  // event create product
  $("#supplier-create-submit")
    .off("click")
    .on("click", () => {
      // get all value
      const supplierName = capitalizeWord($("#supplier-create-name").val());
      const supplierInfo = $("#supplier-create-info").val();
      const supplierImg = document.getElementById("supplier-create-img").files;
      // with image
      if (supplierImg.length >= 1) {
        const reader = new FileReader();
        reader.onload = function () {
          const imgbase64 = reader.result;
          createSupplier(
            supplierName,
            supplierInfo,
            imgbase64,
            (status, response) => {
              if (status) {
                getSupplierAgain();
                successActionSupplier(response);
                supplierCreateBlank();
              }
              if (!status) {
                console.error(response);
              }
            }
          );
        };
        reader.readAsDataURL(supplierImg[0]);
      }
      // without image
      if (supplierImg.length < 1) {
        createSupplier(
          supplierName,
          supplierInfo,
          "null",
          (status, response) => {
            if (status) {
              getSupplierAgain();
              successActionSupplier(response);
              supplierCreateBlank();
            }
            if (!status) {
              console.error(response);
            }
          }
        );
      }
    });
});
