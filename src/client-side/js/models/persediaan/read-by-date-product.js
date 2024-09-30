import {
  getPersediaanDateProductId,
  getPersediaanDateQtyProductId,
  getPersediaanDateSumProduct,
} from "../../../../serverless-side/functions/persediaan.js";
import { formatRupiah2 } from "../../utils/formatRupiah.js";
import { formatWaktuIndo } from "../../utils/formatWaktu.js";
import { animateFade, reinitTooltip } from "../../utils/updateUi.js";
import { uiTbody, uiTbodyEmpty } from "./ui.js";
// get persediaan date and product
$("div#persediaan-date-all-search")
  .off("change", "select#persediaan-date-product")
  .on("change", "select#persediaan-date-product", async function () {
    try {
      animateFade("#persediaan-section");
      // req
      const startDateVal = $("input#persediaan-start-date").val();
      const endDateVal = $("input#persediaan-end-date").val();
      const productId = parseInt($(this).val());
      const req = { startDateVal, endDateVal, productId };
      // caption-selected
      const startDateTxt = formatWaktuIndo(startDateVal);
      const endDateTxt = formatWaktuIndo(endDateVal);
      const rangeDateTxt = `${startDateTxt} - ${endDateTxt}`;
      const selectedTxt = $(this).find("option:selected").text();
      // price buy
      const selectedOption = $(this).find("option:selected");
      const priceBuy = selectedOption.data("pricebuy");
      const priceBuyRp = formatRupiah2(priceBuy);
      //   qty
      const qty = await getPersediaanDateQtyProductId(req);
      //   sum rupiah
      const sum = await getPersediaanDateSumProduct(req);
      const sumRupiah = formatRupiah2(parseFloat(sum));
      // insert - to - html sumpersediaan
      const sumSectionHTML = `<p class="fs-5 ms-2 mb-1 text-capitalize fw-bold ms-2">
                                ${selectedTxt} | ${rangeDateTxt}</p>
                              <p class="fs-5 ms-4 mb-1">Price : ${priceBuyRp} </p>
                              <p class="fs-5 ms-4 mb-1">Total Qty : ${qty} </p>
                              <p class="fs-5 ms-4">Total Price : ${sumRupiah} </p>`;
      $("div#persediaan-sum-section").html(sumSectionHTML);
      //   table
      const dateProduct = await getPersediaanDateProductId(req);
      const existed = dateProduct.length >= 1;
      if (existed) {
        let tr = ``;
        dateProduct.forEach((element) => {
          tr += uiTbody(element);
        });
        $("#persediaan-table").html(tr);
        reinitTooltip();
      }
      if (!existed) {
        const tr = uiTbodyEmpty(selectedTxt);
        $("#persediaan-table").html(tr);
      }
      //   references
      $("select#persediaan-date-supplier").val("Choose One Of Suppliers");
      $("select#persediaan-date-category").val("Choose One Of Categories");
    } catch (error) {
      console.error(error);
    }
  });
