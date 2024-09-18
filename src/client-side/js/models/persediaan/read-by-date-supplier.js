import {
  getPersediaanDateRpSupplierId,
  getPersediaanDateSupplierId,
} from "../../../../serverless-side/functions/persediaan.js";
import { formatRupiah2 } from "../../utils/formatRupiah.js";
import { formatWaktuIndo } from "../../utils/formatWaktu.js";
import { reinitTooltip } from "../../utils/updateUi.js";
import { uiTbody, uiTbodyEmpty } from "./ui.js";
// get persediaan date and supplier
$("div#persediaan-date-all-search")
  .off("change", "select#persediaan-date-supplier")
  .on("change", "select#persediaan-date-supplier", async function () {
    try {
      const startDateVal = $("input#persediaan-start-date").val();
      const endDateVal = $("input#persediaan-end-date").val();
      const supplierId = parseInt($(this).val());
      const req = { startDateVal, endDateVal, supplierId };
      // caption
      const selectedTxt = $(this).find("option:selected").text();
      $("span#persediaan-date-product").text(selectedTxt);
      // sum
      const sumRp = await getPersediaanDateRpSupplierId(req);
      const result = formatRupiah2(sumRp);
      $("span#total-rupiah-byid").text(result);
      // table
      const dateSupplier = await getPersediaanDateSupplierId(req);
      const existed = dateSupplier.length >= 1;
      if (existed) {
        let tr = ``;
        dateSupplier.forEach((element) => {
          tr += uiTbody(element);
        });
        $("#persediaan-table").html(tr);
        reinitTooltip();
      }
      if (!existed) {
        const start = `${formatWaktuIndo(startDateVal)}`;
        const end = `${formatWaktuIndo(endDateVal)}`;
        const empty = `${selectedTxt} : ${start}  - ${end}`;
        const tr = uiTbodyEmpty(empty);
        $("#persediaan-table").html(tr);
      }
      // references
      $("#only-product").hide();
      $("select#persediaan-date-product").val("Choose One Of Products");
      $("select#persediaan-date-category").val("Choose One Of Categories");
    } catch (error) {
      console.error(error);
    }
  });
