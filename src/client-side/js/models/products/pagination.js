import { get2 } from "./utils.js";
import { uiBtnPage } from "./ui.js";

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
      await get2(req);
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
      await get2(req);
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
      await get2(req);
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
      await get2(req);
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
      await get2(req);
    });
};
