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
        // caption-selected
        const startDateTxt = formatWaktuIndo(startDate);
        const endDateTxt = formatWaktuIndo(endDate);
        const rangeDateTxt = `${startDateTxt} - ${endDateTxt}`;
        // sum rupiah
        const sumRp = await getPersediaanDateSum(startDate, endDate);
        const sumRupiah = formatRupiah2(parseFloat(sumRp));
        // insert - to - html sumpersediaan
        const sumSectionHTML = `<p class="fs-5 ms-2 mb-1 text-capitalize fw-bold ms-2">
                                  All Product | ${rangeDateTxt} </p>
                                <p class="fs-5 ms-4">Total Price : ${sumRupiah} </p>`;
        $("div#persediaan-sum-section").html(sumSectionHTML);
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
        }
        if (!existed) {
          const tr = uiTbodyEmpty(rangeDateTxt);
          $("#persediaan-table").html(tr);
        }
        // references
        uiSumPersediaanDate();
        $("#persediaan-pagination").addClass("d-none");
      } catch (error) {
        console.error(error);
      }
    });
});
