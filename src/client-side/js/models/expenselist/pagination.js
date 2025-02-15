import { uiBtnPage, uiBtnPageActive } from "./ui.js";
import { getExpenseAll } from "./utils.js";

const handlePagination = (totalPage) => {
  // 1.inserHTML btnPage
  uiBtnPage(totalPage);
  //  2.getvalue
  const searchVal = $("input#expense-search").val();
  const limitVal = $("select#expense-limit").val();
  let offsetVal = 1;
  //   3.firstPage
  $("button#expense-first-page")
    .off("click")
    .on("click", async () => {
      // change offset
      offsetVal = 1;
      // req and active page
      const req = {
        searchVal,
        limitVal,
        offsetVal,
      };
      await getExpenseAll(req);
      uiBtnPageActive(offsetVal);
    });
  // 4. prevPage
  $("button#expense-prev-page")
    .off("click")
    .on("click", async () => {
      let pageActive = parseInt($("button.expense-page-active").text().trim());
      let decrement = pageActive - 1;
      if (decrement < 1) {
        decrement = totalPage;
      }
      // change offsetVal
      offsetVal = decrement;
      // req server and active page
      const req = {
        searchVal,
        limitVal,
        offsetVal,
      };
      await getExpenseAll(req);
      uiBtnPageActive(offsetVal);
    });
  // 5. byNumber
  $("div#expense-number-page")
    .off("click", "button")
    .on("click", "button", async function () {
      const pageNumber = parseInt($(this).text().trim());
      // change offsetVal
      offsetVal = pageNumber;
      // req server and active page
      const req = {
        searchVal,
        limitVal,
        offsetVal,
      };
      await getExpenseAll(req);
      uiBtnPageActive(offsetVal);
    });
  // 6.next
  $("button#expense-next-page")
    .off("click")
    .on("click", async () => {
      let pageActive = parseInt($("button.expense-page-active").text().trim());
      let increment = pageActive + 1;
      if (increment > totalPage) {
        increment = 1;
      }
      // change offsetVal
      offsetVal = increment;
      // req to server and active page
      const req = {
        searchVal,
        limitVal,
        offsetVal,
      };
      await getExpenseAll(req);
      uiBtnPageActive(offsetVal);
    });
  // 7.last
  $("button#expense-last-page")
    .off("click")
    .on("click", async () => {
      // change offsetVal
      offsetVal = totalPage;
      // req to server and active page
      const req = {
        searchVal,
        limitVal,
        offsetVal,
      };
      await getExpenseAll(req);
      uiBtnPageActive(offsetVal);
    });
};
export { handlePagination };
