import { uiBtnPage } from "./ui.js";
import { getStock1API } from "./utils.js";

export const handlePagination = (totalPage) => {
  // for pagination to insert html
  uiBtnPage(totalPage);
  // get all value
  const searchVal = $("input#persediaan-search").val();
  const limitVal = parseInt($("#persediaan-limit").val());
  // first page
  $("#persediaan-first-page")
    .off("click")
    .on("click", async () => {
      const req = {
        searchVal,
        limitVal,
        offsetVal: 1,
      };
      await getStock1API(req);
    });
  // previous page
  $("#persediaan-prev-page")
    .off("click")
    .on("click", async () => {
      let pageActive = parseInt($(".persediaan-active-page").text().trim());
      let decrementPage = pageActive - 1;
      if (decrementPage < 1) {
        decrementPage = totalPage;
      }
      const req = {
        searchVal,
        limitVal,
        offsetVal: decrementPage,
      };
      await getStock1API(req);
    });
  // based on number when clicked
  $("div#persediaan-number-page")
    .off("click", "button.persediaan-btn-page")
    .on("click", "button.persediaan-btn-page", async function () {
      const pageNumber = parseInt(this.textContent.trim());
      const req = {
        searchVal,
        limitVal,
        offsetVal: pageNumber,
      };
      await getStock1API(req);
    });
  // next page
  $("#persediaan-next-page")
    .off("click")
    .on("click", async () => {
      let pageActive = parseInt($(".persediaan-active-page").text().trim());
      let incrementPage = pageActive + 1;
      if (incrementPage > totalPage) {
        incrementPage = 1;
      }
      const req = {
        searchVal,
        limitVal,
        offsetVal: incrementPage,
      };
      await getStock1API(req);
    });
  // last page
  $("#persediaan-last-page")
    .off("click")
    .on("click", async () => {
      const req = {
        searchVal,
        limitVal,
        offsetVal: totalPage,
      };
      await getStock1API(req);
    });
};
