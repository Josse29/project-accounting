import { formatRupiah2 } from "../../utils/formatRupiah.js";
import { formatWaktuIndo } from "../../utils/formatWaktu.js";
import { animateFade, reinitTooltip } from "../../utils/updateUi.js";
import { getByDateProductId, getSumQtyDateProduct } from "./services.js";
import { uiTbody, uiTbodyEmpty } from "./ui.js";
// get persediaan date and product
$("div#persediaan-date-all-search")
  .off("change", "select#persediaan-date-product")
  .on("change", "select#persediaan-date-product", async function () {
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
    const qty = await getSumQtyDateProduct(req);
    const qtyStatus = qty.status;
    const qtyRes = qty.response;
    if (qtyStatus) {
      //   sum rupiah
      const sumRupiah = formatRupiah2(priceBuy * qtyRes);
      // insert - to - html sumpersediaan
      const sumSectionHTML = `
      <p class="fs-5 ms-2 mb-1 text-capitalize fw-bold ms-2">${selectedTxt} | ${rangeDateTxt}</p>
      <p class="fs-5 ms-4 mb-1">Price : ${priceBuyRp} </p>
      <p class="fs-5 ms-4 mb-1">Total Qty : ${qtyRes} </p>
      <p class="fs-5 ms-4">Total Price : ${sumRupiah} </p>`;
      $("div#persediaan-sum-section").html(sumSectionHTML);
    }
    if (!qtyStatus) {
      console.error(qtyRes);
    }
    //   table
    const dateProduct = await getByDateProductId(req);
    const dateProductStatus = dateProduct.status;
    const dateProductRes = dateProduct.response;
    if (dateProductStatus) {
      const existed = dateProductRes.length >= 1;
      if (existed) {
        uiTbody(dateProductRes);
        reinitTooltip();
      }
      if (!existed) {
        uiTbodyEmpty(selectedTxt);
      }
    }
    if (!dateProductStatus) {
      console.error(dateProductRes);
    }
    //   references
    $("select#persediaan-date-supplier").val("Choose One Of Suppliers");
    $("select#persediaan-date-category").val("Choose One Of Categories");
  });
