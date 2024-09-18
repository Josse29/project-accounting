import {
  getProductInit,
  getProducts,
} from "../../../../serverless-side/functions/product.js";
import { reinitTooltip } from "../../utils/updateUi.js";
import {
  btnProductPage,
  uiActivePageButton,
  uiTbody,
  uiTbodyZero,
} from "./ui.js";
import { getPersediaanAgain } from "../persediaan/read.js";
import {
  listProductRefPersediaanRead,
  listProductRefPersediaanReadDate,
  listProductRefSalesRead,
} from "./list.js";
import { getCategoryAgain } from "../categories/read.js";
$(document).ready(function () {
  let searchVal = $("#product-search-input").val();
  let limitVal = parseInt($("#product-limit").val());
  let offsetVal = 1;
  getInit(searchVal);
  $("#product-search-input")
    .off("keyup")
    .on("keyup", function () {
      searchVal = $(this).val();
      getInit(searchVal);
    });
  $("#product-limit")
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
      const init = await getProductInit(req);
      const totalPage = init.totalPage;
      // total Row
      const totalRow = init.totalRow;
      $("#product-total-row").text(totalRow);
      if (totalRow >= 1) {
        await getProductPage(req);
        handlePagination(totalPage);
        $("#product-pagination").removeClass("d-none");
      }
      if (totalRow < 1) {
        const empty = uiTbodyZero(searchVal);
        $("#product-table").html(empty);
        $("#product-pagination").addClass("d-none");
      }
    } catch (error) {
      console.error(error);
    }
  }
  async function getProductPage(req) {
    try {
      const response = await getProducts(req);
      let tr = "";
      response.forEach((element) => {
        tr += uiTbody(element);
      });
      $("#product-table").html(tr);
      reinitTooltip();
      uiActivePageButton(req.offsetVal);
    } catch (error) {
      console.log(error);
    }
  }
  function handlePagination(totalPage) {
    let uiBtnPaginate = "";
    for (let i = 1; i <= totalPage; i++) {
      uiBtnPaginate += btnProductPage(i);
    }
    $("#product-number-page").html(uiBtnPaginate);
    // first page
    $("#product-first-page")
      .off("click")
      .on("click", async () => {
        const req = {
          searchVal,
          limitVal,
          offsetVal: 1,
        };
        await getProductPage(req);
      });
    // previous page
    $("#product-prev-page")
      .off("click")
      .on("click", async function () {
        let pageActive = parseInt($(".product-active-page").text().trim());
        let decrementPage = pageActive - 1;
        if (decrementPage < 1) {
          decrementPage = totalPage;
        }
        const req = {
          searchVal,
          limitVal,
          offsetVal: decrementPage,
        };
        await getProductPage(req);
      });
    // based on number when clicked
    $("div#product-number-page")
      .off("click", "button.product-btn-page")
      .on("click", "button.product-btn-page", async function () {
        const pageNumber = parseInt(this.textContent.trim());
        const req = {
          searchVal,
          limitVal,
          offsetVal: pageNumber,
        };
        await getProductPage(req);
      });
    // next page
    $("#product-next-page")
      .off("click")
      .on("click", async function () {
        let pageActive = parseInt($(".product-active-page").text().trim());
        let incrementPage = pageActive + 1;
        if (incrementPage > totalPage) {
          incrementPage = 1;
        }
        const req = {
          searchVal,
          limitVal,
          offsetVal: incrementPage,
        };
        await getProductPage(req);
      });
    // last page
    $("#product-last-page")
      .off("click")
      .on("click", async () => {
        const req = {
          searchVal,
          limitVal,
          offsetVal: totalPage,
        };
        await getProductPage(req);
      });
  }
});
// RE-Initial fetch and setup
export function getProductsAgain() {
  $("#product-search-input").val("");
  let searchVal = "";
  let limitVal = parseInt($("#product-limit").val());
  let offsetVal = 1;
  getInit();
  async function getInit() {
    try {
      const req = {
        searchVal,
        limitVal,
        offsetVal,
      };
      const init = await getProductInit(req);
      const totalPage = init.totalPage;
      // total Row
      const totalRow = init.totalRow;
      $("#product-total-row").text(totalRow);
      if (totalRow >= 1) {
        await getProductPage(req);
        handlePagination(totalPage);
        $("#product-pagination").removeClass("d-none");
      }
      if (totalRow < 1) {
        const empty = uiTbodyZero(searchVal);
        $("#product-table").html(empty);
        $("#product-pagination").addClass("d-none");
      }
    } catch (error) {
      console.error(error);
    }
  }
  async function getProductPage(req) {
    try {
      const response = await getProducts(req);
      let tr = "";
      response.forEach((element) => {
        tr += uiTbody(element);
      });
      $("#product-table").html(tr);
      reinitTooltip();
      uiActivePageButton(req.offsetVal);
    } catch (error) {
      console.log(error);
    }
  }
  function handlePagination(totalPage) {
    let uiBtnPaginate = "";
    for (let i = 1; i <= totalPage; i++) {
      uiBtnPaginate += btnProductPage(i);
    }
    $("#product-number-page").html(uiBtnPaginate);
    // first page
    $("#product-first-page")
      .off("click")
      .on("click", async () => {
        const req = {
          searchVal,
          limitVal,
          offsetVal: 1,
        };
        await getProductPage(req);
      });
    // previous page
    $("#product-prev-page")
      .off("click")
      .on("click", async function () {
        let pageActive = parseInt($(".product-active-page").text().trim());
        let decrementPage = pageActive - 1;
        if (decrementPage < 1) {
          decrementPage = totalPage;
        }
        const req = {
          searchVal,
          limitVal,
          offsetVal: decrementPage,
        };
        await getProductPage(req);
      });
    // based on number when clicked
    $("div#product-number-page")
      .off("click", "button.product-btn-page")
      .on("click", "button.product-btn-page", async function () {
        const pageNumber = parseInt(this.textContent.trim());
        const req = {
          searchVal,
          limitVal,
          offsetVal: pageNumber,
        };
        await getProductPage(req);
      });
    // next page
    $("#product-next-page")
      .off("click")
      .on("click", async function () {
        let pageActive = parseInt($(".product-active-page").text().trim());
        let incrementPage = pageActive + 1;
        if (incrementPage > totalPage) {
          incrementPage = 1;
        }
        const req = {
          searchVal,
          limitVal,
          offsetVal: incrementPage,
        };
        await getProductPage(req);
      });
    // last page
    $("#product-last-page")
      .off("click")
      .on("click", async () => {
        const req = {
          searchVal,
          limitVal,
          offsetVal: totalPage,
        };
        await getProductPage(req);
      });
  }
}
export const getProductRef = () => {
  getPersediaanAgain();
  getCategoryAgain();
  listProductRefPersediaanRead();
  listProductRefPersediaanReadDate();
  listProductRefSalesRead();
};
