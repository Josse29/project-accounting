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
      $("span#persediaan-date-product").text(
        $(this).find("option:selected").text()
      );
      // sum
      const sumRp = await getPersediaanDateRpSupplierId(req);
      const result = formatRupiah2(sumRp);
      $("span#total-rupiah-byid").text(result);
      // table
      const dateSupplier = await getPersediaanDateSupplierId(req);
      console.log(dateSupplier);
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
        const tr = uiTbodyEmpty(` - ${$(this)
          .find("option:selected")
          .text()} :          
            ${formatWaktuIndo(startDateVal)}  -
             ${formatWaktuIndo(endDateVal)}`);
        $("#persediaan-table").html(tr);
      }
      // references
      $("#only-product").hide();
      $("select#persediaan-date-product").val("Produk");
      $("select#persediaan-date-category").val("Kategori");
    } catch (error) {
      console.error(error);
    }
  });
