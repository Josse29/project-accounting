import {
  getPersediaanDate,
  getPersediaanDateSum,
} from "../../../../serverless-side/functions/persediaan.js";
import { formatRupiah2 } from "../../utils/formatRupiah.js";
import { formatWaktuIndo } from "../../utils/formatWaktu.js";
import { reinitTooltip } from "../../utils/updateUi.js";
import { listCategoryRefPersediaanReadDate } from "../categories/list.js";
import { listProductRefPersediaanReadDate } from "../products/list.js";
import { listSupplierRefPersediaanReadDate } from "../supplier/list.js";
import { uiSumPersediaanDate, uiTbody, uiTbodyEmpty } from "./ui.js";

$(document).ready(function () {
  $("button#persediaan-date-search")
    .off("click")
    .on("click", async function () {
      try {
        const startDate = $("input#persediaan-start-date").val();
        const endDate = $("input#persediaan-end-date").val();
        if (startDate === "" || endDate === "" || endDate < startDate) {
          return;
        }
        // caption
        $("span#persediaan-date-product").text("All Product");
        $("#persediaan-id").html(
          ` ${formatWaktuIndo(startDate)}  - ${formatWaktuIndo(endDate)}`
        );
        // sum rupiah
        const sumRp = await getPersediaanDateSum(startDate, endDate);
        const rupiah = formatRupiah2(parseFloat(sumRp));
        $("span#total-rupiah-byid").text(rupiah);
        // table
        const byDate = await getPersediaanDate(startDate, endDate);
        const existed = byDate.length >= 1;
        if (existed) {
          let tr = "";
          byDate.forEach((element) => {
            tr += uiTbody(element);
          });
          $("#persediaan-table").html(tr);
          reinitTooltip();
          listProductRefPersediaanReadDate();
          listSupplierRefPersediaanReadDate();
          listCategoryRefPersediaanReadDate();
          const html = `<select class="form-control w-auto mb-3" id="persediaan-date-product">
                          <option value="test" class="fs-6">Product</option>
                        </select>
                        <select class="form-control w-auto mb-3" id="persediaan-date-supplier">
                          <option value="test" class="fs-6">Supplier</option>
                        </select>
                        <select class="form-control w-auto mb-3" id="persediaan-date-category">
                          <option value="test" class="fs-6">Kategori</option>
                        </select>`;
          $("div#persediaan-date-all-search").html(html);
          $("#persediaan-date-all-search").show();
        }
        if (!existed) {
          const tr = uiTbodyEmpty(
            formatWaktuIndo(startDate) + " - " + formatWaktuIndo(endDate)
          );
          $("#persediaan-table").html(tr);
          $("#persediaan-date-all-search").hide();
        }
        // references
        uiSumPersediaanDate();
        $("#persediaan-sum-section").show();
        $("#only-product").hide();
        $("#persediaan-pagination").addClass("d-none");
      } catch (error) {
        console.error(error);
      }
    });
});
