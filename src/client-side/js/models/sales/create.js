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
import { listUserRefSalesCreate } from "../users/list.js";
import { addSale } from "./services.js";
import { getAll2 } from "../persediaan/utils.js";
import { getAll } from "./utils.js";

// init table order
$(".card-footer ")
  .off("click")
  .on("click", async function () {
    table();
    await listUserRefSalesCreate();
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
      const totalCart = getStorageCartSum();
      const resultChange = totalPaid - totalCart;
      if (resultChange < 0) {
        const span = `<span class='fst-italic text-danger'>cash in must be greater than total cart</span>`;
        $("span#order-change").html(span);
      }
      if (totalCart >= 1 && resultChange >= 0) {
        const txtTerbilang = `${formatRupiah1(
          resultChange
        )} | ${terbilangIndonesia(resultChange)} rupiah `;
        $("span#order-change").text(txtTerbilang);
      }
    }
  });
// req-to-db
$("button#order-done")
  .off("click")
  .on("click", async function () {
    const { formattedDDMY, formattedHMS } = getTimeNow();
    const userSalesId = $("select#order-create-usersalesid").val();
    const customerId = $("select#order-create-usercustomerid").val();
    const totalPaid = disFormatRupiah1($("input#order-payment").val());
    const totalCart = getStorageCartSum();
    const storageCart = getStorageCart();
    if (storageCart.length === 0 || totalCart === 0) {
      return;
    }
    // 1. get value user-sales
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
    // 2. get value user-customer
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
    // 3. validattion total price
    if (totalPaid < totalCart) {
      const span = `<span class='fst-italic text-danger'>cash in must be greater than total cart</span>`;
      $("span#order-change").html(span);
      return false;
    }
    // loop data and req-to-db
    for (const el of storageCart) {
      const reqSales = {
        SalesPersonId: userSalesId,
        SalesCustomerId: customerId,
        SalesStatusVal: "PAID",
        formattedDDMY,
        formattedHMS,
        ProductIdVal: el.ProductId,
        ProductName: el.ProductName,
        ProductPriceBuy: el.ProductPriceBuy,
        ProductPriceSell: el.ProductPriceSell,
        ProductQtyVal: el.ProductQty,
      };
      const { status, response } = await addSale(reqSales);
      if (status) {
        // get again sales
        await getAll();
        // get again persediaan
        await getAll2();
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
          text: "The Order has been successfully completed.",
          icon: "success",
          confirmButtonText: "OK",
        });
      }
      if (!status) {
        console.error(response);
      }
    }
  });
