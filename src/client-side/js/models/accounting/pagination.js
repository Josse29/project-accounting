import { readpage } from "./read.js";
import { uiBtnPage } from "./ui.js";

function handlePagination(totalPage) {
  // ui btn page
  uiBtnPage(totalPage);
  //  get value
  const searchVal = $("input#general-entries-search").val();
  const limitVal = 10;
  // first page
  $("button#general-entry-first")
    .off("click")
    .on("click", async function () {
      const req = {
        searchVal,
        limitVal: parseInt(limitVal),
        offsetVal: 1,
      };
      await readpage(req);
    });
  // prev page
  $("button#general-entry-prev")
    .off("click")
    .on("click", async function () {
      let activePage = parseInt(
        $("button.general-entries-page-active").text().trim()
      );
      let decrementPage = activePage - 1;
      if (decrementPage < 1) {
        decrementPage = totalPage;
      }
      const req = {
        searchVal,
        limitVal: parseInt(limitVal),
        offsetVal: parseInt(decrementPage),
      };
      await readpage(req);
    });
  // by number page
  $("div#general-entries-page-number")
    .off("click", "button.general-entries-page")
    .on("click", "button.general-entries-page", async function () {
      const pageNumber = parseInt(this.textContent.trim());
      const req = {
        searchVal,
        limitVal: parseInt(limitVal),
        offsetVal: pageNumber,
      };
      await readpage(req);
    });
  // next page
  $("button#general-entry-next")
    .off("click")
    .on("click", async function () {
      let activePage = parseInt(
        $("button.general-entries-page-active").text().trim()
      );
      let incrementPage = activePage + 1;
      if (incrementPage > totalPage) {
        incrementPage = 1;
      }
      const req = {
        searchVal,
        limitVal: parseInt(limitVal),
        offsetVal: parseInt(incrementPage),
      };
      await readpage(req);
    });
  // last page
  $("button#general-entry-last")
    .off("click")
    .on("click", async function () {
      const req = {
        searchVal,
        limitVal: parseInt(limitVal),
        offsetVal: totalPage,
      };
      await readpage(req);
    });
}
export default handlePagination;
