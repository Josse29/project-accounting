import {
  getPersediaanDateCategoryId,
  getPersediaanDateRpCategoryId,
} from "../../../../serverless-side/functions/persediaan.js";
import { formatRupiah2 } from "../../utils/formatRupiah.js";
import { formatWaktuIndo } from "../../utils/formatWaktu.js";
import { uiTbody, uiTbodyEmpty } from "./ui.js";
// get persediaan date and category
$("div#persediaan-date-all-search")
  .off("change", "select#persediaan-date-category")
  .on("change", "select#persediaan-date-category", async function () {
    const startDateVal = $("input#persediaan-start-date").val();
    const endDateVal = $("input#persediaan-end-date").val();
    const categoryId = parseInt($(this).val());
    const req = { startDateVal, endDateVal, categoryId };
    // caption
    $("span#persediaan-date-product").text(
      $(this).find("option:selected").text()
    );
    // sum rupiah
    const sumRp = await getPersediaanDateRpCategoryId(req);
    const rupiah = formatRupiah2(sumRp);
    $("span#total-rupiah-byid").text(rupiah);
    // table
    const dateCategory = await getPersediaanDateCategoryId(req);
    const existed = dateCategory.length >= 1;
    if (existed) {
      let tr = ``;
      dateCategory.forEach((element) => {
        tr += uiTbody(element);
      });
      $("#persediaan-table").html(tr);
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
    $("select#persediaan-date-supplier").val("Supplier");
  });
