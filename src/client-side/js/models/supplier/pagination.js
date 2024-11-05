import { get2 } from "./read.js";
import { uiBtnPage } from "./ui.js";

export const handlePagination = (totalPage) => {
  uiBtnPage(totalPage);
  // get value
  const searchVal = $("#supplier-search-input").val();
  const limitVal = parseInt($("#supplier-limit").val());
  // first page
  $("#supplier-first-page")
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
      await get2(req);
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
      await get2(req);
    });
  // next page
  $("#supplier-next-page")
    .off("click")
    .on("click", async () => {
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
      await get2(req);
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
      await get2(req);
    });
};
