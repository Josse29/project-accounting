import {
  getPersediaanProductId2,
  getPersediaanQty,
  getPersediaanRpSumProductId,
} from "../../../../serverless-side/functions/persediaan.js";
import { getProductPriceBuy } from "../../../../serverless-side/functions/product.js";
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
        const selectedProductId = parseInt($(this).val());
        // caption-selected
        const selectedProductName = $(this).find("option:selected").text();
        // price buy
        const priceBuy = await getProductPriceBuy(selectedProductId);
        const priceBuyRp = formatRupiah2(priceBuy.ProductPriceBeli);
        // sum qty
        const sumQty = await getPersediaanQty(selectedProductId);
        // sum rupiah
        const sumRp = await getPersediaanRpSumProductId(selectedProductId);
        const sumRp1 = formatRupiah2(parseFloat(sumRp));
        // insert - to - html sumpersediaan
        const sumSectionHTML = `<p class="fs-5 ms-2 mb-1 text-capitalize fw-bold ms-2">
                                  ${selectedProductName}</p>
                                <p class="fs-5 ms-4 mb-1">Price : ${priceBuyRp} </p>
                                <p class="fs-5 ms-4 mb-1">Total Qty : ${sumQty} </p>
                                <p class="fs-5 ms-4">Total Price : ${sumRp1} </p>`;
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
          const tr = uiTbodyEmpty(selectedProductName);
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
