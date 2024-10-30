import { getCashByLimitOffset, getPagination, getSum } from "./services.js";
import { debounce } from "../../utils/debounce.js";
import { formatRupiah2 } from "../../utils/formatRupiah.js";
import {
  uiBtnPage,
  uiBtnPageActive,
  uiTbody,
  uiTbodyEmpty,
  uiTbodyLoad,
} from "./ui.js";

// debouncing
const handleBounce = debounce(() => {
  getInit();
}, 1000);

// getvalue
let searchVal = $("input#cash-read-search").val();
let limitVal = $("select#cash-read-limit").val();
let offsetVal = 1;

// search
$("input#cash-read-search")
  .off("keyup")
  .on("keyup", function () {
    searchVal = $(this).val();
    uiTbodyLoad();
    handleBounce();
  });

// function
getInit();
async function getInit() {
  const req = {
    searchVal,
    limitVal: parseInt(limitVal),
    offsetVal: parseInt(offsetVal),
  };
  const { status, response } = await getPagination(req);
  if (status) {
    const { totalPage, totalRow } = response;
    if (totalRow >= 1) {
      await summary();
      await getCashPage(req);
      handlePagination(totalPage);
      $("div#cash-pagination-container").removeClass("d-none");
    }
    if (totalRow < 1) {
      uiTbodyEmpty(searchVal);
      $("div#cash-pagination-container").addClass("d-none");
    }
  }
}
async function summary() {
  const { status, response } = await getSum();
  if (status) {
    const rupiah = formatRupiah2(response);
    $("span#cash_sum").text(rupiah);
  }
  if (!status) {
    console.error(response);
  }
}
async function getCashPage(req) {
  const { status, response } = await getCashByLimitOffset(req);
  if (status) {
    uiTbody(response);
    uiBtnPageActive(req.offsetVal);
  }
  if (!status) {
    console.error(response);
  }
}
function handlePagination(totalPage) {
  uiBtnPage(totalPage);
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
}
