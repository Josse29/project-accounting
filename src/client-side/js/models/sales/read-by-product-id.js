import {
  getSalesProductId,
  getSalesSumProductId,
} from "../../../../serverless-side/functions/sales.js";
import { listProductRefSalesRead } from "../products/list.js";
import { formatRupiah2 } from "./../../utils/formatRupiah.js";
import { uiTr, uiTrEmpty } from "./ui.js";
listProductRefSalesRead();
$("select#sales-read-productid")
  .off("change")
  .on("change", async function () {
    try {
      const seletedProductId = parseInt($(this).val());
      const selectedOption = $(this).find("option:selected");
      // name
      const productName = selectedOption.text();
      // product sell
      const priceSell = selectedOption.data("pricesell");
      const priceSellRp = formatRupiah2(priceSell);
      // totalrp
      const resSum = await getSalesSumProductId(seletedProductId);
      const rupiah = formatRupiah2(resSum.rupiah);
      // qty
      const qty = resSum.qty;
      // inserthtml
      const summary = `<p class="fs-4 mb-1 fw-bold text-capitalize">${productName}</p>
                       <p class="fs-5 ms-1 mb-1">Price Sell : ${priceSellRp}</p>
                       <p class="fs-5 ms-1 mb-1">Qty : ${qty}</p>
                       <p class="fs-5 ms-1 mb-1">Total : ${rupiah}</p> `;
      $("div#summary").html(summary);
      // table
      const resTable = await getSalesProductId(seletedProductId);
      const existed = resTable.length >= 1;
      if (existed) {
        let table = ``;
        resTable.forEach((rows) => {
          table += uiTr(rows);
        });
        $("tbody#sales-read-table").html(table);
      }
      if (!existed) {
        const empty = uiTrEmpty(productName);
        $("tbody#sales-read-table").html(empty);
      }
      // references callback ui
      // 1.limit-search
      $("div#sales-limit-search").addClass("d-none");
      // 2.select-adjacent
      $("select#sales-read-personid").val("Choose One Of Sales");
      $("select#sales-read-customerid").val("Choose One Of Customers");
      // 3.pagination
      $("div#sales-page-container").addClass("d-none");
    } catch (error) {
      console.error(error);
    }
  });
