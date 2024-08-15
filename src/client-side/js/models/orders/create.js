import { createAccounting } from "../../../../serverless-side/functions/accounting.js";
import { insertKas } from "../../../../serverless-side/functions/kas.js";
import { createPersediaan1 } from "../../../../serverless-side/functions/persediaan.js";
import { createSales } from "../../../../serverless-side/functions/sales.js";
import { disFormatRupiah1, formatRupiah1 } from "../../utils/formatRupiah.js";
import { terbilangIndonesia } from "../../utils/formatTerbilang.js";
import { getTimeNow } from "../../utils/formatWaktu.js";
import {
  getStorageCart,
  getStorageCartSum,
  removeStorageCart,
  removeStorageCartSUM,
} from "../../utils/localStorage.js";
import { listUserForRefOrder } from "../users/list.js";
import { listCart } from "./cart.js";

$(document).ready(function () {
  // FOR LIST user ORDER
  listUserForRefOrder();
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
  // insert to db ,updateui, remove storage and
  $("button#order-done")
    .off("click")
    .on("click", function () {
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
      if (totalPaid >= totalCart) {
        // SEND TO PERSEDIAAN
        console.log("send to persediaan");
        const storageCart1 = getStorageCart();
        storageCart1.forEach((el) => {
          const req = {
            ProductYMD: formattedDDMY,
            ProductHMS: formattedHMS,
            ProductId: el.ProductId,
            ProductQty: el.ProductQty * -1,
            ProductTotal: el.ProductTotal * -1,
            PersonSalesId: parseInt(userSalesId),
          };
          return;
          createPersediaan1(req, (status, response) => {
            if (status) {
              console.log(response);
            }
            if (!status) {
              console.error(response);
            }
          });
        });
        // SEND TO SALES
        console.log("send to sales");
        const storageCart2 = getStorageCart();
        storageCart2.forEach((el) => {
          const req = {
            ymdVal: formattedDDMY,
            hmsVal: formattedHMS,
            productIdVal: el.ProductId,
            productQtyVal: el.ProductQty,
            productTotalVal: el.ProductTotal,
            personIdVal: parseInt(userSalesId),
            customerIdVal: parseInt(customerId),
          };
          console.log(req);
          createSales(req, (status, response) => {
            if (status) {
              console.log("berhasil ");
            }
            if (!status) {
              console.error(response);
            }
          });
        });
        // SEND TO KAS
        console.log("send to kas");
        const storageCart3 = getStorageCart();
        storageCart3.forEach((el) => {
          const req = {
            valKasYMD: formattedDDMY,
            valKasHMS: formattedHMS,
            valKasName: "Kas",
            valKasRp: el.ProductTotal,
            valKasInfo: `Sales | ${el.ProductId} - ${el.ProductName}, Total Qty : ${el.ProductQty}`,
          };
          return;
          insertKas(req, (status, response) => {
            if (status) {
              console.log("berhasil ");
            }
            if (!status) {
              console.error(response);
            }
          });
        });
        // send to db.accounting
        const storageCart4 = getStorageCart();
        storageCart4.forEach((row) => {
          const req = [
            [
              {
                AccountingYMD: formattedDDMY,
                AccountingHMS: formattedHMS,
                AccountingRef: "111",
                AccountingName: "Cash",
                AccountingPosition: "debt",
                AccountingRp: row.ProductPrice,
                AccountingInfo: `Sales Product ${row.ProductId} - ${row.ProductName}`,
              },
              {
                AccountingYMD: formattedDDMY,
                AccountingHMS: formattedHMS,
                AccountingRef: "411",
                AccountingName: "Sales",
                AccountingPosition: "credit",
                AccountingRp: row.ProductPrice,
                AccountingInfo: `Paid`,
              },
            ],
          ];
          return;
          createAccounting(req, (status, response) => {
            if (status) {
              console.log(response);
            }
            if (!status) {
              console.log(response);
            }
          });
        });
        // send to db.piutang|| it credit
        // remove storage cart and sum storage card
        removeStorageCart();
        removeStorageCartSUM();
        $("span#order-change").text(0);
        $("input#order-payment").val(0);
        $(".card-body div#order-create-qty").html("");
        $("button#order-create-qty-plus").removeClass("unsufficient");
        $("button#order-create-qty-minus").removeClass("unsufficient");
        $("select#order-create-usersalesid").val("Choose One Of Sales");
        $("select#order-create-usercustomerid").val("Choose One Of Customers");
        listCart();
      }
    });
});
