import { createAccounting } from "../../../../serverless-side/functions/accounting.js";
import { createCash } from "../../../../serverless-side/functions/cash.js";
import { createPersediaan1 } from "../../../../serverless-side/functions/persediaan.js";
import { createSales } from "../../../../serverless-side/functions/sales.js";
import { table } from "../../component/table/index.js";
import { disFormatRupiah1, formatRupiah1 } from "../../utils/formatRupiah.js";
import { terbilangIndonesia } from "../../utils/formatTerbilang.js";
import { getTimeNow } from "../../utils/formatWaktu.js";
import {
  getStorageCart,
  getStorageCartSum,
  removeStorageCart,
  removeStorageCartSUM,
} from "../../utils/localStorage.js";
import { getSalesAgain } from "../sales/read.js";
import { listUserRefSalesCreate } from "../users/list.js";
import { getProductAgain } from "./read.js";

// init table order
$(".card-footer ")
  .off("click")
  .on("click", function () {
    table();
    listUserRefSalesCreate();
  });
// for change result
$("input#order-payment")
  .off("input")
  .on("input", function () {
    let formattedValue = formatRupiah1($(this).val());
    $(this).val(formattedValue);
  });
$("input#order-payment")
  .off("keyup")
  .on("keyup", function (event) {
    if (event.key === "Enter") {
      const totalPaid = disFormatRupiah1($(this).val());
      const totalCart = Number(getStorageCartSum());
      const resultChange = totalPaid - totalCart;
      if (resultChange < 0) {
        const span = `<span class='fst-italic text-danger'>cash in must be greater than total cart</span>`;
        $("span#order-change").html(span);
      }
      if (totalCart >= 1 && resultChange >= 0) {
        $("span#order-change").text(
          `${formatRupiah1(resultChange)} | ${terbilangIndonesia(
            resultChange
          )} rupiah `
        );
      }
    }
  });
// req-to-db
$("button#order-done")
  .off("click")
  .on("click", async function () {
    try {
      console.log("test");
      const { formattedDDMY, formattedHMS } = getTimeNow();
      const userSalesId = $("select#order-create-usersalesid").val();
      const customerId = $("select#order-create-usercustomerid").val();
      const totalPaid = disFormatRupiah1($("input#order-payment").val());
      const totalCart = Number(getStorageCartSum());
      const storageCart = getStorageCart();
      if (storageCart.length === 0 || totalCart === 0) {
        return;
      }
      // for user-sales
      if (userSalesId === null) {
        $("select#order-create-usersalesid").addClass("is-invalid");
        const modalBody = document.getElementById("order-create-modalBody");
        if (modalBody) {
          modalBody.scrollTo({
            top: 0,
            behavior: "smooth",
          });
        }
        return;
      }
      if (userSalesId !== null) {
        $("select#order-create-usersalesid").removeClass("is-invalid");
      }
      // for user-customer
      if (customerId === null) {
        $("select#order-create-usercustomerid").addClass("is-invalid");
        const modalBody = document.getElementById("order-create-modalBody");
        if (modalBody) {
          modalBody.scrollTo({
            top: 0,
            behavior: "smooth",
          });
        }
        return;
      }
      if (customerId !== null) {
        $("select#order-create-usercustomerid").removeClass("is-invalid");
      }
      // req-to-db
      if (totalPaid >= totalCart) {
        for (const el of storageCart) {
          // 1. req-to-db-sales
          const reqSales = {
            SalesYMDVal: formattedDDMY,
            SalesHMSVal: formattedHMS,
            SalesProductIdVal: el.ProductId,
            SalesProductQtyVal: el.ProductQty,
            SalesProductRpVal: el.ProductPriceSell * el.ProductQty,
            SalesPersonIdVal: parseInt(userSalesId),
            SalesCustomerIdVal: parseInt(customerId),
            SalesStatusVal: "PAID",
          };
          await createSales(reqSales);
          // 2. req-to-db-persediaan
          const reqPersediaan = {
            PersediaanYMDVal: formattedDDMY,
            PersediaanHMSVal: formattedHMS,
            PersediaanQtyVal: el.ProductQty * -1,
            PersediaanTotalVal: el.ProductPriceBuy * el.ProductQty * -1,
            PersediaanInfoVal: `${el.ProductName} has been sold with qty ${el.ProductQty}`,
            PersediaanProductIdVal: el.ProductId,
            PersediaanPersonIdVal: parseInt(userSalesId),
          };
          await createPersediaan1(reqPersediaan);
          // 3. req-to-db-cash
          const reqCash = {
            CashYYYYMMDDVal: formattedDDMY,
            CashHMSVal: formattedHMS,
            CashNameVal: `Sales Product - ${el.ProductName}`,
            CashRpVal: el.ProductPriceSell * el.ProductQty,
            CashInfoVal: `${el.ProductName} has been sold with qty ${el.ProductQty}`,
          };
          await createCash(reqCash);
          //4. req-to-db-accounting
          const debtEntry = {
            accountingYMDVal: formattedDDMY,
            accountingHMSVal: formattedHMS,
            accountingRefVal: 111,
            accountingNameVal: "Cash",
            accountingPositionVal: "debt",
            accountingRpVal: el.ProductPriceSell * el.ProductQty,
            accountingInfoVal: `${el.ProductName} has been sold with qty ${el.ProductQty}`,
          };
          await createAccounting(debtEntry);
          const creditEntry = {
            accountingYMDVal: formattedDDMY,
            accountingHMSVal: formattedHMS,
            accountingRefVal: 411,
            accountingNameVal: "Sales",
            accountingPositionVal: "credit",
            accountingRpVal: el.ProductPriceSell * el.ProductQty,
            accountingInfoVal: `${el.ProductName} has been sold with qty ${el.ProductQty}`,
          };
          await createAccounting(creditEntry);
        }
        // send to db.piutang|| it credit comingsooon
        // comingsoonn....
        // get all ref from orders|sales
        getProductAgain();
        getSalesAgain();
        // remove storage cart and sum storage card
        removeStorageCart();
        removeStorageCartSUM();
        // change
        $("span#order-change").text(0);
        $("input#order-payment").val(0);
        // update ui qty card
        $(".card-body div#order-create-qty").html("");
        $("button#order-create-qty-plus").removeClass("unsufficient");
        $("button#order-create-qty-minus").removeClass("unsufficient");
        $("select#order-create-usersalesid").val("Choose One Of Sales");
        $("select#order-create-usercustomerid").val("Choose One Of Customers");
        $("#sales-create-modal").modal("hide");
        // sweet alert
        Swal.fire({
          title: "Success!",
          text: "The Order was completed successfully.",
          icon: "success",
          confirmButtonText: "OK",
        });
      }
    } catch (error) {
      console.error(error);
    }
  });
