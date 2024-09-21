import {
  getCategory,
  getCategoryInit,
} from "../../../../serverless-side/functions/categories.js";
import { reinitTooltip, uiLoad } from "../../utils/updateUi.js";
import { uiActivePageButton, uiBtnPage, uiTrCategory, uiTrZero } from "./ui.js";
import { getProductsAgain } from "./../products/read.js";
import { getPersediaanAgain } from "../persediaan/read.js";
import {
  listCategoryRefPersediaanRead,
  listCategoryRefPersediaanReadDate,
} from "./list.js";
$(document).ready(function () {
  $("div#category-loading").html(uiLoad());
  $("div#category-done").hide();
  let searchVal = $("#category-search-input").val();
  let limitVal = parseInt($("#category-limit").val());
  let offsetVal = 1;
  getInit();
  $("#category-search-input")
    .off("keyup")
    .on("keyup", function () {
      searchVal = $(this).val();
      getInit(searchVal);
    });
  $("#category-limit")
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
      const init = await getCategoryInit(req);
      const totalPage = init.totalPage;
      // total-row
      const totalRow = init.totalRow;
      $("p#categories-total-row").text(`Total : ${totalRow}`);
      if (totalRow >= 1) {
        await getCategoryPage(req);
        handlePagination(totalPage);
        $("div#category-pagination").removeClass("d-none");
      }
      if (totalRow < 1) {
        const empty = uiTrZero(searchVal);
        $("#category-data").html(empty);
        $("div#category-pagination").addClass("d-none");
      }
      $("div#category-loading").html("");
      $("div#category-done").show();
    } catch (error) {
      console.error(error);
    }
  }
  async function getCategoryPage(req) {
    try {
      const response = await getCategory(req);
      let tr = "";
      response.forEach((element) => {
        tr += uiTrCategory(element);
      });
      $("#category-data").html(tr);
      reinitTooltip();
      uiActivePageButton(req.offsetVal);
    } catch (error) {
      console.error(error);
    }
  }
  function handlePagination(totalPage) {
    let uiBtnPaginate = "";
    for (let i = 1; i <= totalPage; i++) {
      uiBtnPaginate += uiBtnPage(i);
    }
    $("#category-number-page").html(uiBtnPaginate);
    // first page
    $("#category-first-page")
      .off("click")
      .on("click", async () => {
        const req = {
          searchVal,
          limitVal,
          offsetVal: 1,
        };
        await getCategoryPage(req);
      });
    // previous page
    $("#category-prev-page")
      .off("click")
      .on("click", async function () {
        let pageActive = parseInt($(".category-active-page").text().trim());
        let decrementPage = pageActive - 1;
        if (decrementPage < 1) {
          decrementPage = totalPage;
        }
        const req = {
          searchVal,
          limitVal,
          offsetVal: decrementPage,
        };
        await getCategoryPage(req);
      });
    // based on number when clicked
    $("#category-number-page")
      .off("click", "button.category-btn-page")
      .on("click", "button.category-btn-page", async function () {
        const pageNumber = parseInt(this.textContent.trim());
        const req = {
          searchVal,
          limitVal,
          offsetVal: pageNumber,
        };
        await getCategoryPage(req);
      });
    // // next page
    $("#category-next-page")
      .off("click")
      .on("click", async () => {
        let pageActive = parseInt($(".category-active-page").text().trim());
        let incrementPage = pageActive + 1;
        if (incrementPage > totalPage) {
          incrementPage = 1;
        }
        const req = {
          searchVal,
          limitVal,
          offsetVal: incrementPage,
        };
        await getCategoryPage(req);
      });
    // last page
    $("#category-last-page")
      .off("click")
      .on("click", async () => {
        const req = {
          searchVal,
          limitVal,
          offsetVal: totalPage,
        };
        await getCategoryPage(req);
      });
  }
});
export const getCategoryAgain = () => {
  $("#category-search-input").val("");
  let searchVal = "";
  let limitVal = $("#category-limit").val();
  let offsetVal = 1;
  getInit();
  async function getInit() {
    try {
      const req = {
        searchVal,
        limitVal,
        offsetVal,
      };
      const init = await getCategoryInit(req);
      const totalPage = init.totalPage;
      // total-row
      const totalRow = init.totalRow;
      $("p#categories-total-row").text(`Total : ${totalRow}`);
      if (totalRow >= 1) {
        await getCategoryPage(req);
        handlePagination(totalPage);
        $("div#category-pagination").removeClass("d-none");
      }
      if (totalRow < 1) {
        const empty = uiTrZero(searchVal);
        $("#category-data").html(empty);
        $("div#category-pagination").addClass("d-none");
      }
    } catch (error) {
      console.error(error);
    }
  }
  async function getCategoryPage(req) {
    try {
      const response = await getCategory(req);
      let tr = "";
      response.forEach((element) => {
        tr += uiTrCategory(element);
      });
      $("#category-data").html(tr);
      reinitTooltip();
      uiActivePageButton(req.offsetVal);
    } catch (error) {
      console.error(error);
    }
  }
  function handlePagination(totalPage) {
    let uiBtnPaginate = "";
    for (let i = 1; i <= totalPage; i++) {
      uiBtnPaginate += uiBtnPage(i);
    }
    $("#category-number-page").html(uiBtnPaginate);
    // first page
    $("#category-first-page")
      .off("click")
      .on("click", async () => {
        const req = {
          searchVal,
          limitVal,
          offsetVal: 1,
        };
        await getCategoryPage(req);
      });
    // previous page
    $("#category-prev-page")
      .off("click")
      .on("click", async function () {
        let pageActive = parseInt($(".category-active-page").text().trim());
        let decrementPage = pageActive - 1;
        if (decrementPage < 1) {
          decrementPage = totalPage;
        }
        const req = {
          searchVal,
          limitVal,
          offsetVal: decrementPage,
        };
        await getCategoryPage(req);
      });
    // based on number when clicked
    $("#category-number-page")
      .off("click", "button.category-btn-page")
      .on("click", "button.category-btn-page", async function () {
        const pageNumber = parseInt(this.textContent.trim());
        const req = {
          searchVal,
          limitVal,
          offsetVal: pageNumber,
        };
        await getCategoryPage(req);
      });
    // // next page
    $("#category-next-page")
      .off("click")
      .on("click", async () => {
        let pageActive = parseInt($(".category-active-page").text().trim());
        let incrementPage = pageActive + 1;
        if (incrementPage > totalPage) {
          incrementPage = 1;
        }
        const req = {
          searchVal,
          limitVal,
          offsetVal: incrementPage,
        };
        await getCategoryPage(req);
      });
    // last page
    $("#category-last-page")
      .off("click")
      .on("click", async () => {
        const req = {
          searchVal,
          limitVal,
          offsetVal: totalPage,
        };
        await getCategoryPage(req);
      });
  }
};
export const getCategoryRef = () => {
  getProductsAgain();
  getPersediaanAgain();
  listCategoryRefPersediaanRead();
  listCategoryRefPersediaanReadDate();
};
