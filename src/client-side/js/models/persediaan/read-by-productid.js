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
        const selectedText = $(this).find("option:selected").text();
        const selectedProductId = parseInt($(this).val());
        // caption
        $("span#persediaan-id").text(selectedText);
        // price buy
        const priceBuy = await getProductPriceBuy(selectedProductId);
        const priceBuyRp = formatRupiah2(priceBuy.ProductPriceBeli);
        $("#rupiah-byid").text(priceBuyRp);
        // sum qty
        const sumQty = await getPersediaanQty(selectedProductId);
        $("span#total-qty-byid").text(sumQty);
        // sum rupiah
        const sumRp = await getPersediaanRpSumProductId(selectedProductId);
        const rupiah = formatRupiah2(parseFloat(sumRp));
        $("span#total-rupiah-byid").text(rupiah);
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
          const tr = uiTbodyEmpty(selectedText);
          $("#persediaan-table").html(tr);
        }
        // references
        $("div#persediaan-sum-section").show();
        $("div#only-product").show();
        $("span#persediaan-date-product").text("");
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
