import { createAccounting } from "../../../../serverless-side/functions/accounting.js";
import { insertCash } from "../../../../serverless-side/functions/cash.js";
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
import { getSalesAgain } from "../sales/read.js";
import { listUserForRefOrder } from "../users/list.js";
import { listCart } from "./cart.js";
import { getProductAgain } from "./read.js";

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
      const userSalesText = $("select#order-create-usersalesid")
        .find("option:selected")
        .text();
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
        const insertPromise1 = () => {
          const promises = storageCart.map((el) => {
            return new Promise((resolve, reject) => {
              const req = {
                ProductYMD: formattedDDMY,
                ProductHMS: formattedHMS,
                ProductId: el.ProductId,
                ProductQty: el.ProductQty * -1,
                ProductTotal: el.ProductTotal * -1,
                PersonSalesId: parseInt(userSalesId),
              };
              createPersediaan1(req, (status, response) => {
                if (status) {
                  console.log(response);
                  resolve();
                } else {
                  console.error(response);
                  reject(response);
                }
              });
            });
          });
          return Promise.all(promises);
        };
        // SEND TO SALES
        const insertPromise2 = () => {
          const promises = storageCart.map((el) => {
            return new Promise((resolve, reject) => {
              {
                const req = {
                  SalesYMDVal: formattedDDMY,
                  SalesHMSVal: formattedHMS,
                  SalesProductIdVal: el.ProductId,
                  SalesProductQtyVal: el.ProductQty,
                  SalesProductRpVal: el.ProductTotal,
                  SalesPersonIdVal: parseInt(userSalesId),
                  SalesCustomerIdVal: parseInt(customerId),
                  SalesStatusVal: "PAID",
                };
                createSales(req, (status, response) => {
                  if (status) {
                    console.log("berhasil ");
                    resolve();
                  }
                  if (!status) {
                    console.error(response);
                    reject();
                  }
                });
              }
            });
          });
          return Promise.all(promises);
        };
        // SEND TO CASH
        const insertPromise3 = () => {
          const promises = storageCart.map((el) => {
            return new Promise((resolve, reject) => {
              const req = {
                CashYYYYMMDDVal: formattedDDMY,
                CashHMSVal: formattedHMS,
                CashNameVal: "Sales",
                CashRpVal: el.ProductTotal,
                CashInfoVal: `Sales | ${el.ProductId} - ${el.ProductName}, Total Qty : ${el.ProductQty}`,
              };
              insertCash(req, (status, response) => {
                if (status) {
                  console.log("Cash insertion successful: ", response);
                  resolve();
                } else {
                  console.error("Cash insertion failed: ", response);
                  reject(response);
                }
              });
            });
          });
          return Promise.all(promises);
        };
        // send to db.accounting | huffttt
        const insertPromise4 = () => {
          const promises = storageCart.flatMap((row) => {
            const debitEntry = {
              accountingYMDVal: formattedDDMY,
              accountingHMSVal: formattedHMS,
              accountingRefVal: 111,
              accountingNameVal: "Cash",
              accountingPositionVal: "debt",
              accountingRpVal: row.ProductPrice,
              accountingInfoVal: `Sales | ${row.ProductId} - ${row.ProductName}, Total Qty : ${row.ProductQty}`,
            };
            const creditEntry = {
              accountingYMDVal: formattedDDMY,
              accountingHMSVal: formattedHMS,
              accountingRefVal: 411,
              accountingNameVal: "Sales",
              accountingPositionVal: "credit",
              accountingRpVal: row.ProductPrice,
              accountingInfoVal: `Sales : ${parseInt(
                userSalesId
              )} - ${userSalesText} | Product : ${row.ProductId} - ${
                row.ProductName
              }`,
            };
            return [
              processAccountingEntry(debitEntry),
              processAccountingEntry(creditEntry),
            ];
          });
          // Return a promise that resolves when all accounting entries have been processed
          return Promise.all(promises);
        };
        function processAccountingEntry(entry) {
          return new Promise((resolve, reject) => {
            createAccounting(entry, (status, response) => {
              if (status) {
                resolve(response);
              } else {
                reject(new Error(response));
              }
            });
          });
        }
        Promise.all([
          insertPromise1(),
          insertPromise2(),
          insertPromise3(),
          insertPromise4(),
        ])
          .then(() => {
            getProductAgain();
            getSalesAgain();
          })
          .catch((err) => {
            console.error(err);
          });
        $("#printModal").modal("hide");
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
        $("#printModal").modal("hide");
      }
    });
});
