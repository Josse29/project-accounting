import {
  getPersediaanDateProductId,
  getPersediaanDateQtyProductId,
  getPersediaanDateSumProduct,
} from "../../../../serverless-side/functions/persediaan.js";
import { getProductPriceBuy } from "../../../../serverless-side/functions/product.js";
import { formatRupiah2 } from "../../utils/formatRupiah.js";
import { formatWaktuIndo } from "../../utils/formatWaktu.js";
import { reinitTooltip } from "../../utils/updateUi.js";
import { uiTbody, uiTbodyEmpty } from "./ui.js";
// get persediaan date and product
$("div#persediaan-date-all-search")
  .off("change", "select#persediaan-date-product")
  .on("change", "select#persediaan-date-product", async function () {
    try {
      const startDateVal = $("input#persediaan-start-date").val();
      const endDateVal = $("input#persediaan-end-date").val();
      const productId = parseInt($(this).val());
      const req = { startDateVal, endDateVal, productId };
      // caption
      const selectedTxt = $(this).find("option:selected").text();
      $("span#persediaan-date-product").text(selectedTxt);
      // price buy
      const priceBuy = await getProductPriceBuy(productId);
      const priceBuyRp = formatRupiah2(priceBuy.ProductPriceBeli);
      $("#rupiah-byid").text(priceBuyRp);
      //   qty
      const qty = await getPersediaanDateQtyProductId(req);
      $("span#total-qty-byid").text(qty);
      //   sum rupiah
      const sumRupiah = await getPersediaanDateSumProduct(req);
      const rupiah = formatRupiah2(parseFloat(sumRupiah));
      $("span#total-rupiah-byid").text(rupiah);
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
        const start = `${formatWaktuIndo(startDateVal)}`;
        const end = `${formatWaktuIndo(endDateVal)}`;
        const empty = `${selectedTxt} : ${start}  - ${end}`;
        const tr = uiTbodyEmpty(empty);
        $("#persediaan-table").html(tr);
      }
      //   references
      $("#only-product").show();
      $("select#persediaan-date-category").val("Choose One Of Categories");
      $("select#persediaan-date-supplier").val("Choose One Of Suppliers");
    } catch (error) {
      console.error(error);
    }
  });
