import {
  getSupplier,
  getSupplierInit,
} from "../../../../serverless-side/functions/supplier.js";
import { reinitTooltip, uiLoad } from "../../utils/updateUi.js";
import { btnSupplierPage, uiActivePageBtn, uiTr, uiTrZero } from "./ui.js";
import { getProductsAgain } from "./../products/read.js";
import { getPersediaanAgain } from "../persediaan/read.js";

import {
  listSupplierRefPersediaanRead,
  listSupplierRefPersediaanReadDate,
} from "./list.js";
$(document).ready(function () {
  $("div#supplier-loading").html(uiLoad());
  $("div#supplier-done").hide();
  let searchVal = $("#supplier-search-input").val();
  let limitVal = parseInt($("#supplier-limit").val());
  let offsetVal = 1;
  getInit();
  $("#supplier-search-input")
    .off("keyup")
    .on("keyup", function () {
      searchVal = $(this).val();
      getInit();
    });
  $("#supplier-limit")
    .off("change")
    .on("change", function () {
      limitVal = parseInt($(this).val());
      getInit();
    });
  async function getInit() {
    try {
      const req = {
        searchVal,
        limitVal,
        offsetVal,
      };
      const init = await getSupplierInit(req);
      const totalPage = init.totalPage;
      // totalSupplier
      const totalRow = init.totalRow;
      $("p#supplier-total-row").text(`Total : ${totalRow}`);
      if (totalRow >= 1) {
        await getSupplierPage(req);
        handlePagination(totalPage);
        $("div#supplier-pagination").removeClass("d-none");
      }
      if (totalRow < 1) {
        const empty = uiTrZero(searchVal);
        $("#supplier-table").html(empty);
        $("div#supplier-pagination").addClass("d-none");
      }
      // loading-done
      $("div#supplier-loading").html("");
      $("div#supplier-done").show();
    } catch (error) {
      console.error(error);
    }
  }
  async function getSupplierPage(req) {
    try {
      const response = await getSupplier(req);
      let tr = ``;
      response.forEach((element) => {
        tr += uiTr(element);
      });
      $("#supplier-table").html(tr);
      reinitTooltip();
      uiActivePageBtn(req.offsetVal);
    } catch (error) {
      console.error(error);
    }
  }
  function handlePagination(totalPage) {
    let uiBtnPaginate = "";
    for (let i = 1; i <= totalPage; i++) {
      uiBtnPaginate += btnSupplierPage(i);
    }
    $("#supplier-number-page").html(uiBtnPaginate);
    // first page
    $("#supplier-first-page")
      .off("click")
      .on("click", async () => {
        const req = {
          searchVal,
          limitVal,
          offsetVal: 1,
        };
        await getSupplierPage(req);
      });
    // previous page
    $("#supplier-prev-page")
      .off("click")
      .on("click", async () => {
        let pageActive = parseInt($(".supplier-active-page").text().trim());
        let decrementPage = pageActive - 1;
        if (decrementPage < 1) {
          decrementPage = totalPage;
        }
        const req = {
          searchVal,
          limitVal,
          offsetVal: decrementPage,
        };
        await getSupplierPage(req);
      });
    // by based number page
    $("#supplier-number-page")
      .off("click", "button.supplier-btn-page")
      .on("click", "button.supplier-btn-page", async function () {
        const pageNumber = parseInt(this.textContent.trim());
        const req = {
          searchVal,
          limitVal,
          offsetVal: pageNumber,
        };
        await getSupplierPage(req);
      });
    // next page
    $("#supplier-next-page")
      .off("click")
      .on("click", async function () {
        let pageActive = parseInt($(".supplier-active-page").text().trim());
        let incrementPage = pageActive + 1;
        if (incrementPage > totalPage) {
          incrementPage = 1;
        }
        const req = {
          searchVal,
          limitVal,
          offsetVal: incrementPage,
        };
        await getSupplierPage(req);
      });
    // last page
    $("#supplier-last-page")
      .off("click")
      .on("click", async () => {
        const req = {
          searchVal,
          limitVal,
          offsetVal: totalPage,
        };
        await getSupplierPage(req);
      });
  }
});
export const getSupplierAgain = () => {
  let searchVal = "";
  let limitVal = parseInt($("#supplier-limit").val());
  let offsetVal = 1;
  $("#supplier-search-input").val("");
  getInit();
  async function getInit() {
    try {
      const req = {
        searchVal,
        limitVal,
        offsetVal,
      };
      const init = await getSupplierInit(req);
      const totalPage = init.totalPage;
      // totalSupplier
      const totalRow = init.totalRow;
      $("p#supplier-total-row").text(`Total : ${totalRow}`);
      if (totalRow >= 1) {
        await getSupplierPage(req);
        handlePagination(totalPage);
        $("div#supplier-pagination").removeClass("d-none");
      }
      if (totalRow < 1) {
        const empty = uiTrZero(searchVal);
        $("#supplier-table").html(empty);
        $("div#supplier-pagination").addClass("d-none");
      }
    } catch (error) {
      console.error(error);
    }
  }
  async function getSupplierPage(req) {
    try {
      const response = await getSupplier(req);
      let tr = ``;
      response.forEach((element) => {
        tr += uiTr(element);
      });
      $("#supplier-table").html(tr);
      reinitTooltip();
      uiActivePageBtn(req.offsetVal);
    } catch (error) {
      console.error(error);
    }
  }
  function handlePagination(totalPage) {
    let uiBtnPaginate = "";
    for (let i = 1; i <= totalPage; i++) {
      uiBtnPaginate += btnSupplierPage(i);
    }
    $("#supplier-number-page").html(uiBtnPaginate);
    // first page
    $("#supplier-first-page")
      .off("click")
      .on("click", async () => {
        const req = {
          searchVal,
          limitVal,
          offsetVal: 1,
        };
        await getSupplierPage(req);
      });
    // previous page
    $("#supplier-prev-page")
      .off("click")
      .on("click", async () => {
        let pageActive = parseInt($(".supplier-active-page").text().trim());
        let decrementPage = pageActive - 1;
        if (decrementPage < 1) {
          decrementPage = totalPage;
        }
        const req = {
          searchVal,
          limitVal,
          offsetVal: decrementPage,
        };
        await getSupplierPage(req);
      });
    // by based number page
    $("#supplier-number-page")
      .off("click", "button.supplier-btn-page")
      .on("click", "button.supplier-btn-page", async function () {
        const pageNumber = parseInt(this.textContent.trim());
        const req = {
          searchVal,
          limitVal,
          offsetVal: pageNumber,
        };
        await getSupplierPage(req);
      });
    // next page
    $("#supplier-next-page")
      .off("click")
      .on("click", async function () {
        let pageActive = parseInt($(".supplier-active-page").text().trim());
        let incrementPage = pageActive + 1;
        if (incrementPage > totalPage) {
          incrementPage = 1;
        }
        const req = {
          searchVal,
          limitVal,
          offsetVal: incrementPage,
        };
        await getSupplierPage(req);
      });
    // last page
    $("#supplier-last-page")
      .off("click")
      .on("click", async () => {
        const req = {
          searchVal,
          limitVal,
          offsetVal: totalPage,
        };
        await getSupplierPage(req);
      });
  }
};
export const getSupplierRef = () => {
  getProductsAgain();
  getPersediaanAgain();
  listSupplierRefPersediaanRead();
  listSupplierRefPersediaanReadDate();
};
