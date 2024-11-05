import { uiAlertFailUpdate, uiAlertSuccess } from "./ui.js";
import { capitalizeWord } from "../../utils/formatCapitalize.js";
import { getImageBase64, validateImg } from "../../utils/loadImg.js";
import { update } from "./services.js";
import { getSupplier1 } from "./read.js";
import { getSupplierRef } from "./utils.js";

$("#supplier-table")
  .off("click", "#supplierUpdate")
  .on("click", "#supplierUpdate", function () {
    $("input#supplier-update-img").val("");
    $("div#supplier-update-failed").html("");
    // get from params
    const supplier = $(this).closest("tr")[0].dataset;
    const supplierName = supplier.suppliername;
    const supplierInfo = supplier.supplierinfo;
    const supplierImg = supplier.supplierimg;
    let supplierCancelImg = false;
    // name
    $("#supplierUpdateModalLabel").text(supplierName);
    $("#supplier-update-name").val(supplierName);
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
          const validImg = validateImg(files);
          if (validImg) {
            const imgBase64 = await getImageBase64(files[0]);
            $("#supplier-update-img-preview").attr("src", imgBase64);
            $("#supplier-update-img-section").show();
          }
          if (!validImg) {
            $("#supplier-update-img-section").hide();
          }
          supplierCancelImg = false;
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
        supplierCancelImg = true;
      });
    // event submit update
    $("#supplier-update-submit")
      .off("click")
      .on("click", async () => {
        const supplierId = parseInt(supplier.supplierid);
        const supplierName = capitalizeWord($("#supplier-update-name").val());
        const supplierInfo = $("#supplier-update-info").val();
        const supplierImgVal = document.getElementById(
          "supplier-update-img"
        ).files;
        // action createSupplier
        const req = {
          supplierId,
          supplierName,
          supplierInfo,
          supplierImgVal,
          supplierCancelImg,
        };
        const { status, response } = await update(req);
        if (status) {
          await getSupplier1();
          await getSupplierRef();
          uiAlertSuccess(response);
          $("#supplierUpdateModal").modal("hide");
        }
        if (!status) {
          console.error(response);
          uiAlertFailUpdate(response);
          const modalBody = $("#supplier-update-modalBody").get(0);
          modalBody.scrollTo({
            top: 0,
            behavior: "smooth",
          });
        }
      });
  });
