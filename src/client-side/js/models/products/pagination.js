import { getPage, getPage1 } from "./utils.js";
import { uiBtnPage, uiBtnPage1 } from "./ui.js";

export const handlePagination = (totalPage) => {
  // inserthtml
  uiBtnPage(totalPage);
  // get value
  const searchVal = $("#product-search-input").val();
  const limitVal = parseInt($("#product-limit").val());
  // first page
  $("#product-first-page")
    .off("click")
    .on("click", async () => {
      const req = {
        searchVal,
        limitVal,
        offsetVal: 1,
      };
      await getPage(req);
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
      await getPage(req);
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
      await getPage(req);
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
      await getPage(req);
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
      await getPage(req);
    });
};
// ref persediaaan
export const handlePagination1 = (totalPage) => {
  // insert to html
  uiBtnPage1(totalPage);
  // get all value
  const searchVal = $("input#order-search").val();
  const limitVal = 3;
  // first page
  $("button#product-ref-persediaan-first-page")
    .off("click")
    .on("click", async function () {
      const req = {
        searchVal,
        limitVal,
        offsetVal: 1,
      };
      await getPage1(req);
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
        limitVal,
        offsetVal: decrement,
      };
      await getPage1(req);
    });
  // by click
  $("div#product-ref-persediaan-page-number")
    .off("click", ".product-ref-persediaan-page")
    .on("click", ".product-ref-persediaan-page", async function () {
      const pageNumber = parseInt(this.textContent.trim());
      const req = {
        searchVal,
        limitVal,
        offsetVal: pageNumber,
      };
      await getPage1(req);
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
        limitVal,
        offsetVal: increment,
      };
      await getPage1(req);
    });
  // last page
  $("button#product-ref-persediaan-last-page")
    .off("click")
    .on("click", async function () {
      const req = {
        searchVal,
        limitVal,
        offsetVal: totalPage,
      };
      await getPage1(req);
    });
};
