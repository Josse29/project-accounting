import { uiBtnPage } from "./ui.js";
import { getPage } from "./utils.js";

export const handlePagination = (totalPage) => {
  // insert html btn page
  uiBtnPage(totalPage);
  // get value
  const searchVal = $("input#sales-read-search").val();
  const limitVal = parseInt($("select#sales-read-limit").val());
  // first page
  $("button#sales-read-firstpage")
    .off("click")
    .on("click", async () => {
      const req = {
        searchVal,
        limitVal,
        offsetVal: 1,
      };
      await getPage(req);
    });
  // prev page
  $("button#sales-read-prevpage")
    .off("click")
    .on("click", async () => {
      let pageActive = parseInt($("button.sales-active-page").text().trim());
      let decrement = pageActive - 1;
      if (decrement < 1) {
        decrement = totalPage;
      }
      const req = {
        searchVal,
        limitVal,
        offsetVal: decrement,
      };
      await getPage(req);
    });
  // by click
  $("div#sales-read-numberpage")
    .off("click", "button.sales-page")
    .on("click", "button.sales-page", async function () {
      const pageNumber = parseInt(this.textContent.trim());
      const req = {
        searchVal,
        limitVal,
        offsetVal: pageNumber,
      };
      await getPage(req);
    });
  // next page
  $("button#sales-read-nextpage")
    .off("click")
    .on("click", async function () {
      let pageActive = parseInt($("button.sales-active-page").text().trim());
      let increment = pageActive + 1;
      if (increment > totalPage) {
        increment = 1;
      }
      const req = {
        searchVal,
        limitVal,
        offsetVal: increment,
      };
      await getPage(req);
    });
  // last page
  $("button#sales-read-lastpage")
    .off("click")
    .on("click", async function () {
      const req = {
        searchVal,
        limitVal,
        offsetVal: totalPage,
      };
      await getPage(req);
    });
};
