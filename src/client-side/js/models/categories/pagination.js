import { get2 } from "./read.js";
import { uiBtnPage } from "./ui.js";

export const handlePagination = (totalPage) => {
  // insert html
  uiBtnPage(totalPage);
  // get value
  const searchVal = $("#category-search-input").val();
  const limitVal = parseInt($("#category-limit").val());
  // first page
  $("#category-first-page")
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
      await get2(req);
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
      await get2(req);
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
      await get2(req);
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
      await get2(req);
    });
};
