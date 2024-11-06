import { getCashPage } from "./read.js";
import { uiBtnPage } from "./ui.js";

const handlePagination = (totalPage) => {
  // insert html
  uiBtnPage(totalPage);
  // get value
  const searchVal = $("input#cash-read-search").val();
  const limitVal = $("select#cash-read-limit").val();
  // first Page
  $("button#cash-first-page")
    .off("click")
    .on("click", async function () {
      const req = {
        searchVal,
        limitVal: parseInt(limitVal),
        offsetVal: 1,
      };
      await getCashPage(req);
    });
  // prev page
  $("button#cash-prev-page")
    .off("click")
    .on("click", async function () {
      let pageActive = parseInt($("button.cash-page-active").text().trim());
      let decrement = pageActive - 1;
      if (decrement < 1) {
        decrement = totalPage;
      }
      const req = {
        searchVal,
        limitVal: parseInt(limitVal),
        offsetVal: decrement,
      };
      await getCashPage(req);
    });
  // by number
  $("div#cash-pagination-container")
    .off("click", "button.cash-page-number")
    .on("click", "button.cash-page-number", async function () {
      const pageNumber = parseInt(this.textContent.trim());
      const req = {
        searchVal,
        limitVal: parseInt(limitVal),
        offsetVal: pageNumber,
      };
      await getCashPage(req);
    });
  // next page
  $("button#cash-next-page")
    .off("click")
    .on("click", async function () {
      let pageActive = parseInt($("button.cash-page-active").text().trim());
      let increment = pageActive + 1;
      if (increment > totalPage) {
        increment = 1;
      }
      const req = {
        searchVal,
        limitVal: parseInt(limitVal),
        offsetVal: increment,
      };
      await getCashPage(req);
    });
  $("button#cash-last-page")
    .off("click")
    .on("click", async function () {
      const req = {
        searchVal,
        limitVal: parseInt(limitVal),
        offsetVal: totalPage,
      };
      await getCashPage(req);
    });
};
export default handlePagination;
