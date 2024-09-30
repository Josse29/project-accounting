import {
  getPersediaanProductGroup1,
  getPersediaanTotalRow1,
} from "../../../../serverless-side/functions/persediaan.js";
import { uiQty } from "../../component/card/qty.js";
import { list } from "../../component/list/index.js";
import { uiBtnPage, uiBtnPageActive, uiCard, uiCardEmpty } from "./ui.js";
$(document).ready(function () {
  let searchVal = $("input#order-search").val();
  let limitVal = 3;
  let offsetVal = 1;
  getInit();
  // searching
  $("input#order-search")
    .off("keyup")
    .on("keyup", function () {
      searchVal = $(this).val();
      getInit();
    });
  // get total row and page
  async function getInit() {
    try {
      const req = {
        searchVal,
        limitVal,
        offsetVal,
      };
      const response = await getPersediaanTotalRow1(req);
      const totalPage = response.totalPage;
      const totalRow = response.totalRow;
      if (totalRow >= 1) {
        await getPage(req);
        handlePagination(totalPage);
        $("div#product-refpersediaan-pagination").removeClass("d-none");
      }
      if (totalRow < 1) {
        const empty = uiCardEmpty(searchVal);
        $("div#product-refpersediaan-read").html(empty);
        $("div#product-refpersediaan-pagination").addClass("d-none");
      }
    } catch (error) {
      console.error(error);
    }
  }
  // get by page
  async function getPage(req) {
    try {
      const response = await getPersediaanProductGroup1(req);
      let card = ``;
      response.forEach((rows) => {
        card += uiCard(rows);
      });
      const parentCard = `<div class="container-by-me">${card}</div>`;
      $("div#product-refpersediaan-read").html(parentCard);
      // update qty to card menu as well as btn plus/min triggered
      uiQty();
      // update list cart menu as well as btn plus/min triggered
      list();
      // update active page
      uiBtnPageActive(req.offsetVal);
    } catch (error) {
      console.error(error);
    }
  }
  // loop and inserthtml pagination
  function handlePagination(totalPage) {
    // insert to html
    let btn = ``;
    for (let i = 1; i <= totalPage; i++) {
      btn += uiBtnPage(i);
    }
    $("div#product-ref-persediaan-page-number").html(btn);
    // first page
    $("button#product-ref-persediaan-first-page")
      .off("click")
      .on("click", async function () {
        const req = {
          searchVal,
          limitVal: 3,
          offsetVal: 1,
        };
        await getPage(req);
      });
    // prev page
    $("button#product-ref-persediaan-prev-page")
      .off("click")
      .on("click", async function () {
        let pageActive = parseInt(
          $("button.product-ref-persediaan-page-active").text().trim()
        );
        let decrement = pageActive - 1;
        if (decrement < 1) {
          decrement = totalPage;
        }
        const req = {
          searchVal,
          limitVal: 3,
          offsetVal: decrement,
        };
        await getPage(req);
      });
    // by click
    $("div#product-ref-persediaan-page-number")
      .off("click", ".product-ref-persediaan-page")
      .on("click", ".product-ref-persediaan-page", async function () {
        const pageNumber = parseInt(this.textContent.trim());
        const req = {
          searchVal,
          limitVal: 3,
          offsetVal: pageNumber,
        };
        await getPage(req);
      });
    // next page
    $("button#product-ref-persediaan-next-page")
      .off("click")
      .on("click", async function () {
        let pageActive = parseInt(
          $(".product-ref-persediaan-page-active").text().trim()
        );
        let increment = pageActive + 1;
        if (increment > totalPage) {
          increment = 1;
        }
        const req = {
          searchVal,
          limitVal: 3,
          offsetVal: increment,
        };
        await getPage(req);
      });
    // last page
    $("button#product-ref-persediaan-last-page")
      .off("click")
      .on("click", async function () {
        const req = {
          searchVal,
          limitVal: 3,
          offsetVal: totalPage,
        };
        await getPage(req);
      });
  }
});
export const getProductAgain = () => {
  let searchVal = "";
  let limitVal = 3;
  let offsetVal = 1;
  $("input#order-search").val("");
  getInit();
  // get total row and page
  async function getInit() {
    try {
      const req = {
        searchVal,
        limitVal,
        offsetVal,
      };
      const response = await getPersediaanTotalRow1(req);
      const totalPage = response.totalPage;
      const totalRow = response.totalRow;
      if (totalRow >= 1) {
        await getPage(req);
        handlePagination(totalPage);
        $("div#product-refpersediaan-pagination").removeClass("d-none");
      }
      if (totalRow < 1) {
        const empty = uiCardEmpty(searchVal);
        $("div#product-refpersediaan-read").html(empty);
        $("div#product-refpersediaan-pagination").addClass("d-none");
      }
    } catch (error) {
      console.error(error);
    }
  }
  // get by page
  async function getPage(req) {
    try {
      const response = await getPersediaanProductGroup1(req);
      let card = ``;
      response.forEach((rows) => {
        card += uiCard(rows);
      });
      const parentCard = `<div class="container-by-me">${card}</div>`;
      $("div#product-refpersediaan-read").html(parentCard);
      // update active page
      uiBtnPageActive(req.offsetVal);
    } catch (error) {
      console.error(error);
    }
  }
  // loop and inserthtml pagination
  function handlePagination(totalPage) {
    // insert to html
    let btn = ``;
    for (let i = 1; i <= totalPage; i++) {
      btn += uiBtnPage(i);
    }
    $("div#product-ref-persediaan-page-number").html(btn);
    // first page
    $("button#product-ref-persediaan-first-page")
      .off("click")
      .on("click", async function () {
        const req = {
          searchVal,
          limitVal: 3,
          offsetVal: 1,
        };
        await getPage(req);
      });
    // prev page
    $("button#product-ref-persediaan-prev-page")
      .off("click")
      .on("click", async function () {
        let pageActive = parseInt(
          $("button.product-ref-persediaan-page-active").text().trim()
        );
        let decrement = pageActive - 1;
        if (decrement < 1) {
          decrement = totalPage;
        }
        const req = {
          searchVal,
          limitVal: 3,
          offsetVal: decrement,
        };
        await getPage(req);
      });
    // by click
    $("div#product-ref-persediaan-page-number")
      .off("click", ".product-ref-persediaan-page")
      .on("click", ".product-ref-persediaan-page", async function () {
        const pageNumber = parseInt(this.textContent.trim());
        const req = {
          searchVal,
          limitVal: 3,
          offsetVal: pageNumber,
        };
        await getPage(req);
      });
    // next page
    $("button#product-ref-persediaan-next-page")
      .off("click")
      .on("click", async function () {
        let pageActive = parseInt(
          $(".product-ref-persediaan-page-active").text().trim()
        );
        let increment = pageActive + 1;
        if (increment > totalPage) {
          increment = 1;
        }
        const req = {
          searchVal,
          limitVal: 3,
          offsetVal: increment,
        };
        await getPage(req);
      });
    // last page
    $("button#product-ref-persediaan-last-page")
      .off("click")
      .on("click", async function () {
        const req = {
          searchVal,
          limitVal: 3,
          offsetVal: totalPage,
        };
        await getPage(req);
      });
  }
};
