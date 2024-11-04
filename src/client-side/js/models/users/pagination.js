import { get2 } from "./read.js";
import { uiBtnPage } from "./ui.js";

export const handlePagination = (totalPage) => {
  // insertBtn
  uiBtnPage(totalPage);

  // request
  const searchVal = $("input#user-search").val();
  const limitVal = parseInt($("select#user-limit").val());

  // first-page
  $("#user-first-page")
    .off("click")
    .on("click", async () => {
      const req = {
        searchVal,
        limitVal,
        offsetVal: 1,
      };
      await get2(req);
    });
  // prev-page
  $("#user-prev-page")
    .off("click")
    .on("click", async function () {
      const pageActive = parseInt($("button.user-page-active").text().trim());
      let decrement = pageActive - 1;
      if (decrement < 1) {
        decrement = totalPage;
      }
      const req = {
        searchVal,
        limitVal,
        offsetVal: decrement,
      };
      await get2(req);
    });
  // by-number
  $("#user-page-number")
    .off("click", "button")
    .on("click", "button", async function () {
      let numberPage = $(this).text().trim();
      const req = {
        searchVal,
        limitVal,
        offsetVal: numberPage,
      };
      await get2(req);
    });
  // next - page
  $("#user-next-page")
    .off("click")
    .on("click", async function () {
      const pageActive = parseInt($("button.user-page-active").text().trim());
      let increment = pageActive + 1;
      if (increment > totalPage) {
        increment = 1;
      }
      const req = {
        searchVal,
        limitVal,
        offsetVal: increment,
      };
      await get2(req);
    });
  // last page
  $("#user-last-page")
    .off("click")
    .on("click", async function () {
      const req = {
        searchVal,
        limitVal,
        offsetVal: totalPage,
      };
      await get2(req);
    });
};
