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
    try {
      const startDateVal = $("input#persediaan-start-date").val();
      const endDateVal = $("input#persediaan-end-date").val();
      const categoryId = parseInt($(this).val());
      const req = { startDateVal, endDateVal, categoryId };
      // caption
      const selectedTxt = $(this).find("option:selected").text();
      $("span#persediaan-date-product").text(selectedTxt);
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
        const start = `${formatWaktuIndo(startDateVal)}`;
        const end = `${formatWaktuIndo(endDateVal)}`;
        const empty = `${selectedTxt} : ${start}  - ${end}`;
        const tr = uiTbodyEmpty(empty);
        $("#persediaan-table").html(tr);
      }
      // references
      $("#only-product").hide();
      $("select#persediaan-date-product").val("Choose One Of Products");
      $("select#persediaan-date-supplier").val("Choose One Of Suppliers");
    } catch (error) {
      console.error(error);
    }
  });
