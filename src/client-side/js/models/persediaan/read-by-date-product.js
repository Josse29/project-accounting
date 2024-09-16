import {
  getPersediaanDateProductId,
  getPersediaanDateQtyProductId,
  getPersediaanDateSumProduct,
} from "../../../../serverless-side/functions/persediaan.js";
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
      $("span#persediaan-date-product").text(
        $(this).find("option:selected").text()
      );
      //   sum rupiah
      const sumRupiah = await getPersediaanDateSumProduct(req);
      const rupiah = formatRupiah2(parseFloat(sumRupiah));
      $("span#total-rupiah-byid").text(rupiah);
      //   qty
      const qty = await getPersediaanDateQtyProductId(req);
      $("span#total-qty-byid").text(qty);
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
        const tr = uiTbodyEmpty(` - ${$(this)
          .find("option:selected")
          .text()} :          
                            ${formatWaktuIndo(startDateVal)}  -
                             ${formatWaktuIndo(endDateVal)}`);
        $("#persediaan-table").html(tr);
      }
      // price buy
      const priceBuy = formatRupiah2(
        parseFloat(dateProduct[0].ProductPriceBeli)
      );
      $("#rupiah-byid").text(priceBuy);
      //   references
      $("#only-product").show();
      $("select#persediaan-date-category").val("Kategori");
      $("select#persediaan-date-supplier").val("Supplier");
    } catch (error) {
      console.error(error);
    }
  });
