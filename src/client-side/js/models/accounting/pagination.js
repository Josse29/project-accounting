import { getAccountingAPI1 } from "./utils.js";
import { uiBtnPage, uiBtnPageActived } from "./ui.js";

function handlePagination(totalPage) {
  // ui btn page
  uiBtnPage(totalPage);
  //  get value
  const selectedAccount = $("div#select-mode button.active").data("value");
  const searchVal = $("#general-section #limit-search input").val();
  const limitVal = parseInt($("#general-section #limit-search select").val());
  let offsetVal = 1;
  // first page
  $("div#general-section div#pagination button#first-page")
    .off("click")
    .on("click", async function () {
      offsetVal = 1;
      const req = {
        selectedAccount,
        searchVal,
        limitVal,
        offsetVal,
      };
      await getAccountingAPI1(req);
      uiBtnPageActived(offsetVal);
    });
  // prev page
  $("div#general-section div#pagination button#prev-page")
    .off("click")
    .on("click", async function () {
      let activePage = parseInt(
        $("div#general-section div#pagination button.general-page-active")
          .text()
          .trim()
      );
      let decrementPage = activePage - 1;
      if (decrementPage < 1) {
        decrementPage = totalPage;
      }
      offsetVal = decrementPage;
      const req = {
        selectedAccount,
        searchVal,
        limitVal,
        offsetVal,
      };
      await getAccountingAPI1(req);
      uiBtnPageActived(offsetVal);
    });
  // by number page
  $("div#general-section div#pagination")
    .off("click", "div.btn-group div.btn-group button")
    .on("click", "div.btn-group div.btn-group button", async function () {
      const pageNumber = parseInt(this.textContent.trim());
      offsetVal = pageNumber;
      const req = {
        selectedAccount,
        searchVal,
        limitVal,
        offsetVal,
      };
      await getAccountingAPI1(req);
      uiBtnPageActived(offsetVal);
    });
  // next page
  $("div#general-section div#pagination button#next-page")
    .off("click")
    .on("click", async function () {
      let activePage = parseInt(
        $("div#general-section div#pagination button.general-page-active")
          .text()
          .trim()
      );
      let incrementPage = activePage + 1;
      if (incrementPage > totalPage) {
        incrementPage = 1;
      }
      offsetVal = incrementPage;
      const req = {
        selectedAccount,
        searchVal,
        limitVal,
        offsetVal,
      };
      await getAccountingAPI1(req);
      uiBtnPageActived(offsetVal);
    });
  // last page
  $("div#general-section div#pagination button#last-page")
    .off("click")
    .on("click", async function () {
      offsetVal = totalPage;
      const req = {
        selectedAccount,
        searchVal,
        limitVal,
        offsetVal,
      };
      await getAccountingAPI1(req);
      uiBtnPageActived(offsetVal);
    });
}
export default handlePagination;
