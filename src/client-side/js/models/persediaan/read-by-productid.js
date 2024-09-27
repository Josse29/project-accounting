import {
  getPersediaanProductId2,
  getPersediaanQty,
} from "../../../../serverless-side/functions/persediaan.js";
import { formatRupiah2 } from "../../utils/formatRupiah.js";
import { reinitTooltip } from "../../utils/updateUi.js";
import { listProductRefPersediaanRead } from "../products/list.js";
import { uiTbody, uiTbodyEmpty } from "./ui.js";

$(document).ready(function () {
  listProductRefPersediaanRead();
  $("select#persediaan-refproduct-search")
    .off("change")
    .on("change", async function () {
      try {
        // req
        const selectedOption = $(this).find("option:selected");
        const selectedProductId = parseInt($(this).val());
        // caption-selected
        const productName = selectedOption.text();
        const productNameP = `<p class="fs-5 ms-2 mb-1 text-capitalize fw-bold ms-2">
                                  ${productName}</p>`;
        // price buy
        const priceBuy = selectedOption.data("pricebuy");
        const priceBuyRp = formatRupiah2(priceBuy);
        const priceBuyP = `<p class="fs-5 ms-4 mb-1">Price : ${priceBuyRp} </p>`;
        // sum qty
        const sumQty = await getPersediaanQty(selectedProductId);
        const sumQtyP = `<p class="fs-5 ms-4 mb-1">Total Qty : ${sumQty} </p>`;
        // sum rupiah
        const sumRp = priceBuy * sumQty;
        const sumRp1 = formatRupiah2(parseFloat(sumRp));
        const sumRpP = `<p class="fs-5 ms-4">Total Price : ${sumRp1} </p>`;
        // insert - to - html sumpersediaan
        const sumSectionHTML = `${productNameP} ${sumQtyP} ${priceBuyP} ${sumRpP}`;
        $("div#persediaan-sum-section").html(sumSectionHTML);
        // tables
        const byProduct = await getPersediaanProductId2(selectedProductId);
        const existedProduct = byProduct.length >= 1;
        if (existedProduct) {
          let tr = "";
          byProduct.forEach((element) => {
            tr += uiTbody(element);
          });
          $("#persediaan-table").html(tr);
          reinitTooltip();
        }
        if (!existedProduct) {
          const tr = uiTbodyEmpty(productName);
          $("#persediaan-table").html(tr);
        }
        // references
        $("#persediaanLimitSearch").addClass("d-none");
        $("select#persediaan-refsupplier-search").val(
          "Choose One Of Suppliers"
        );
        $("select#persediaan-refcategory-search").val(
          "Choose One Of Categories"
        );
        $("#persediaan-pagination").addClass("d-none");
      } catch (error) {
        console.error(error);
      }
    });
});
