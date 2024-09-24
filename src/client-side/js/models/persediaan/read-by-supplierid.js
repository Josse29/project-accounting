import { getPersediaanSupplierId } from "../../../../serverless-side/functions/persediaan.js";
import { reinitTooltip } from "../../utils/updateUi.js";
import { listSupplierRefPersediaanRead } from "../supplier/list.js";
import { uiTbody, uiTbodyEmpty } from "./ui.js";

$(document).ready(function () {
  listSupplierRefPersediaanRead();
  $("select#persediaan-refsupplier-search")
    .off("change")
    .on("change", async function () {
      try {
        // req
        const selectedSupplierId = parseInt($(this).val());
        // caption-selected
        const selectedSupplierName = $(this).find("option:selected").text();
        const caption = `<p class="fs-5 ms-2 mb-1 text-capitalize fw-bold ms-2">
                                  ${selectedSupplierName}</p>`;
        $("div#persediaan-sum-section").html(caption);
        // table
        const bySupplierId = await getPersediaanSupplierId(selectedSupplierId);
        const existedSupplier = bySupplierId.length >= 1;
        if (existedSupplier) {
          let tr = "";
          bySupplierId.forEach((element) => {
            tr += uiTbody(element);
          });
          $("#persediaan-table").html(tr);
          reinitTooltip();
        }
        if (!existedSupplier) {
          const tr = uiTbodyEmpty(selectedSupplierName);
          $("#persediaan-table").html(tr);
        }
        // references
        $("#persediaanLimitSearch").addClass("d-none");
        $("select#persediaan-refproduct-search").val("Choose One Of Products");
        $("select#persediaan-refcategory-search").val(
          "Choose One Of Categories"
        );
        $("#persediaan-pagination").addClass("d-none");
      } catch (error) {
        console.error(error);
      }
    });
});
