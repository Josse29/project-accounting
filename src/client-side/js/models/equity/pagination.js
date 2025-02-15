import { uiBtnPage, uiBtnPageActive } from "./ui.js";
import { getEquityPage } from "./utils.js";

const handlePagination = (totalPage) => {
  // 1.insert html
  uiBtnPage(totalPage);
  // 2.get value
  const searchVal = $("input#equity-read-search").val();
  const limitVal = $("select#equity-read-limit").val();
  let offsetVal = 1;
  // 3.first page
  $("button#equity-first-page")
    .off("click")
    .on("click", async () => {
      const req = {
        searchVal,
        limitVal,
        offsetVal: 1,
      };
      await getEquityPage(req);
      uiBtnPageActive(req.offsetVal);
    });
  // 4.prev page
  $("button#equity-prev-page")
    .off("click")
    .on("click", async () => {
      let pageActive = parseInt($("button.equity-page-active").text().trim());
      let decrement = pageActive - 1;
      if (decrement < 1) {
        decrement = totalPage;
      }
      const req = {
        searchVal,
        limitVal,
        offsetVal: decrement,
      };
      await getEquityPage(req);
      uiBtnPageActive(req.offsetVal);
    });
  // 5. by number
  $("div#equity-pagination")
    .off("click", "button.equity-page-number")
    .on("click", "button.equity-page-number", async function () {
      const pageNumber = parseInt(this.textContent.trim());
      const req = {
        searchVal,
        limitVal: parseInt(limitVal),
        offsetVal: pageNumber,
      };
      await getEquityPage(req);
      uiBtnPageActive(req.offsetVal);
    });
  // 6.next page
  $("button#equity-next-page")
    .off("click")
    .on("click", async () => {
      let pageActive = parseInt($("button.equity-page-active").text().trim());
      let increment = pageActive + 1;
      if (increment > totalPage) {
        increment = 1;
      }
      const req = {
        searchVal,
        limitVal: parseInt(limitVal),
        offsetVal: increment,
      };
      await getEquityPage(req);
      uiBtnPageActive(req.offsetVal);
    });
  // 7.lastpage
  $("button#equity-last-page")
    .off("click")
    .on("click", async () => {
      const req = {
        searchVal,
        limitVal: parseInt(limitVal),
        offsetVal: totalPage,
      };
      await getEquityPage(req);
      uiBtnPageActive(req.offsetVal);
    });
};
export { handlePagination };
