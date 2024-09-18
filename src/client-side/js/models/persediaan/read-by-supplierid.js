import {
  getPersediaanRpSumSupplierId,
  getPersediaanSupplierId,
} from "../../../../serverless-side/functions/persediaan.js";
import { formatRupiah2 } from "../../utils/formatRupiah.js";
import { reinitTooltip } from "../../utils/updateUi.js";
import { listSupplierRefPersediaanRead } from "../supplier/list.js";
import { uiTbody, uiTbodyEmpty } from "./ui.js";

$(document).ready(function () {
  listSupplierRefPersediaanRead();
  $("select#persediaan-refsupplier-search").on("change", async function () {
    try {
      const selectedText = $(this).find("option:selected").text();
      const selectedSupplierId = parseInt($(this).val());
      // caption
      $("span#persediaan-id").text(selectedText);
      // sum
      const sum = await getPersediaanRpSumSupplierId(selectedSupplierId);
      const rupiah = formatRupiah2(parseFloat(sum));
      $("span#total-rupiah-byid").text(rupiah);
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
        const tr = uiTbodyEmpty(selectedText);
        $("#persediaan-table").html(tr);
      }
      // references
      $("#persediaan-sum-section").show();
      $("#only-product").hide();
      $("span#persediaan-date-product").text("");
      $("select#persediaan-refproduct-search").val("Choose One Of Products");
      $("select#persediaan-refcategory-search").val("Choose One Of Categories");
      $("#persediaan-pagination").addClass("d-none");
    } catch (error) {
      console.error(error);
    }
  });
});
