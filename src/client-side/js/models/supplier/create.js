import { createSupplier } from "../../../../serverless-side/functions/supplier.js";
import { getSupplierAgain, getSupplierRef } from "./read.js";
import { uiAlertFailCreate, uiAlertSuccess, uiBlankVal } from "./ui.js";
import { capitalizeWord } from "../../utils/formatCapitalize.js";
import { getImageBase64 } from "../../utils/loadImg.js";
// supplier-create-name
$(document).ready(function () {
  $("button#btnCreateSupplier")
    .off("click")
    .on("click", function () {
      $("#supplier-create-failed").html("");
    });
  // supplierCreateImg
  $("input#supplier-create-img")
    .off("change")
    .on("change", async (event) => {
      try {
        const files = event.target.files;
        const validImageTypes = ["image/jpeg", "image/png", "image/gif"];
        if (files.length > 0) {
          if (validImageTypes.includes(files[0].type)) {
            const imgBase64 = await getImageBase64(files[0]);
            console.log(imgBase64);
            $("#supplier-create-img-preview").attr("src", imgBase64);
            $("#supplier-create-img-section").removeClass("d-none");
          }
          if (!validImageTypes.includes(files[0].type)) {
            $("#supplier-create-img-section").addClass("d-none");
          }
        }
      } catch (error) {
        console.error(error);
      }
    });
  // canceling image
  $("#supplier-create-img-cancel")
    .off("click")
    .on("click", () => {
      $("#supplier-create-img").val("");
      $("#supplier-create-img-section").addClass("d-none");
    });
  // Hapus event listener sebelumnya jika ada MCCCCCKKKKKKKK
  // event create product
  $("#supplier-create-submit")
    .off("click")
    .on("click", async () => {
      try {
        // get all value
        const supplierName = capitalizeWord($("#supplier-create-name").val());
        const supplierInfo = $("#supplier-create-info").val();
        const supplierImg = document.getElementById(
          "supplier-create-img"
        ).files;
        let imgBase64 = ``;
        const validImageTypes = ["image/jpeg", "image/png", "image/gif"];
        if (
          supplierImg.length > 0 &&
          validImageTypes.includes(supplierImg[0].type)
        ) {
          imgBase64 = await getImageBase64(supplierImg[0]);
        } else {
          imgBase64 = "null";
        }
        // action createSupplier
        const req = {
          supplierName,
          supplierInfo,
          supplierImg,
          imgBase64,
        };
        const response = await createSupplier(req);
        getSupplierAgain();
        getSupplierRef();
        uiAlertSuccess(response);
        uiBlankVal();
        $("#supplierCreate").modal("hide");
      } catch (error) {
        const errMsg = error || error.message;
        uiAlertFailCreate(errMsg);
        const modalBody = $("#supplier-create-modalBody").get(0);
        modalBody.scrollTo({
          top: 0,
          behavior: "smooth",
        });
      }
    });
});
