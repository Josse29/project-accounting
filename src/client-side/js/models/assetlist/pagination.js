import { uiBtnPage, uiBtnPageActive } from "./ui.js";
import { getAssetNamePage } from "./utils.js";

const handlePagination = (totalPage) => {
  // 1. inserthtml btnPgae
  uiBtnPage(totalPage);
  // 2.getValue
  const searchVal = $("input#asset-search").val();
  const limitVal = $("select#asset-limit").val();
  let offsetVal = 1;
  // 3.firstPage
  $("button#asset-first-page")
    .off("click")
    .on("click", async () => {
      // change offset
      offsetVal = 1;
      //   request
      const req = {
        searchVal,
        limitVal,
        offsetVal,
      };
      await getAssetNamePage(req);
      uiBtnPageActive(offsetVal);
    });
  // 4.prevPage
  $("button#asset-prev-page")
    .off("click")
    .on("click", async () => {
      let pageActive = parseInt($("button.asset-page-active").text().trim());
      let decrement = pageActive - 1;
      if (decrement < 1) {
        decrement = totalPage;
      }
      // change offset
      offsetVal = decrement;
      const req = {
        searchVal,
        limitVal,
        offsetVal,
      };
      await getAssetNamePage(req);
      uiBtnPageActive(offsetVal);
    });
  // 5.byNumber
  $("div#asset-number-page")
    .off("click", "button.asset-page")
    .on("click", "button.asset-page", async function () {
      const pageNumber = parseInt($(this).text().trim());
      //   change offset
      offsetVal = pageNumber;
      const req = {
        searchVal,
        limitVal,
        offsetVal,
      };
      await getAssetNamePage(req);
      uiBtnPageActive(offsetVal);
    });
  // 6.nextPage
  $("button#asset-next-page")
    .off("click")
    .on("click", async () => {
      let pageActive = parseInt($("button.asset-page-active").text().trim());
      let increment = pageActive + 1;
      if (increment > totalPage) {
        increment = 1;
      }
      offsetVal = increment;
      const req = {
        searchVal,
        limitVal,
        offsetVal,
      };
      await getAssetNamePage(req);
      uiBtnPageActive(offsetVal);
    });
  // 7.lastPage
  $("button#asset-last-page")
    .off("click")
    .on("click", async () => {
      offsetVal = totalPage;
      const req = { searchVal, limitVal, offsetVal };
      await getAssetNamePage(req);
      uiBtnPageActive(offsetVal);
    });
};
export { handlePagination };
