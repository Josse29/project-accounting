import { getGeneralEntry, getPagination } from "../services.js";
import { uiBtnPage, uiBtnPageActived, uiTbody, uiTbodyZero } from "./ui.js";

// getvalue
let searchVal = $("input#general-entries-search").val();
let limitVal = $("select#general-entries-limit").val();
let offSetVal = 1;

// function
getInit();
async function getInit() {
  const req = {
    searchVal,
    limitVal: parseInt(limitVal),
    offsetVal: parseInt(offSetVal),
  };
  const { status, response } = await getPagination(req);
  if (status) {
    const { totalPage, totalRow } = response;
    if (totalRow >= 1) {
      await readpage(req);
      pagination(totalPage);
      $("div#general-entries-pagination").removeClass("d-none");
    }
    if (totalRow < 1) {
      uiTbodyZero();
      $("div#general-entries-pagination").addClass("d-none");
    }
  }
  if (!status) {
    console.error(response);
  }
}
async function readpage(req) {
  const { status, response } = await getGeneralEntry(req);
  if (status) {
    uiTbody(response);
    uiBtnPageActived(req.offsetVal);
  }
  if (!status) {
    console.error(response);
  }
}
function pagination(totalPage) {
  uiBtnPage(totalPage);
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
      console.log(decrementPage);
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
