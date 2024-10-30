import { debounce } from "../../utils/debounce.js";
import { formatRupiah2 } from "../../utils/formatRupiah.js";
import { getLimitOffset, getRowPage, getSum } from "./services.js";
import {
  uiBtnPage,
  uiBtnPageActive,
  uiLoad,
  uiReset,
  uiTbody,
  uiTbodyEmpty,
} from "./ui.js";

// Debounced event handler
const handleDebounce = debounce(() => {
  getInit();
}, 1000);

// get all value
let searchVal = $("input#sales-read-search").val();
let limitVal = parseInt($("select#sales-read-limit").val());
let offsetVal = 1;

// search
$("input#sales-read-search")
  .off("keyup")
  .on("keyup", function () {
    searchVal = $(this).val();
    uiLoad();
    handleDebounce();
  });
$("span#sales-search")
  .off("click")
  .on("click", function () {
    uiLoad();
    handleDebounce();
  });
// limit
$("select#sales-read-limit")
  .off("change")
  .on("change", function () {
    limitVal = parseInt($(this).val());
    uiLoad();
    handleDebounce();
  });
// reset
$("button#sales-read-reset")
  .off("click")
  .on("click", function () {
    searchVal = "";
    uiReset();
    uiLoad();
    handleDebounce();
  });

// function
getInit();
// 1. get total page and row
async function getInit() {
  const req = {
    searchVal,
    limitVal,
    offsetVal,
  };
  const { status, response } = await getRowPage(req);
  const { totalPage, totalRow } = response;
  if (status) {
    const existed = totalRow >= 1;
    if (existed) {
      await getSummary();
      await getPage(req);
      handlePagination(totalPage);
      $("div#sales-page-container").removeClass("d-none");
    }
    if (!existed) {
      uiTbodyEmpty(searchVal);
      $("div#sales-page-container").addClass("d-none");
      $("div#sales-total-sum").text(`Rp 0.00,-`);
    }
  }
  if (!status) {
    console.error(response);
  }
}
// 2. get summary
async function getSummary() {
  const { status, response } = await getSum();
  if (status) {
    const currency = formatRupiah2(response);
    $("div#sales-total-sum").text(currency);
  }
  if (!status) {
    console.error(response);
  }
}
// 3. get sales by limit and offset
async function getPage(req) {
  const { status, response } = await getLimitOffset(req);
  if (status) {
    uiTbody(response);
    uiBtnPageActive(req.offsetVal);
  }
  if (!status) {
    console.error(response);
  }
}
// 4.handle pagination
function handlePagination(totalPage) {
  uiBtnPage(totalPage);
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
}

export const getSalesAgain = async () => {
  uiReset();
  const searchVal = "";
  const limitVal = 3;
  const offsetVal = 1;

  // 1. get total page and row
  const req = {
    searchVal,
    limitVal,
    offsetVal,
  };
  const { status, response } = await getRowPage(req);
  const { totalPage, totalRow } = response;
  if (status) {
    const existed = totalRow >= 1;
    if (existed) {
      await getSummary();
      await getPage(req);
      handlePagination(totalPage);
      $("div#sales-page-container").removeClass("d-none");
    }
    if (!existed) {
      uiTbodyEmpty(searchVal);
      $("div#sales-page-container").addClass("d-none");
      $("div#sales-total-sum").text(`Rp 0.00,-`);
    }
  }
  if (!status) {
    console.error(response);
  }
  // 2. get summary
  async function getSummary() {
    const { status, response } = await getSum();
    if (status) {
      const currency = formatRupiah2(response);
      $("div#sales-total-sum").text(currency);
    }
    if (!status) {
      console.error(response);
    }
  }
  // 3. get sales by limit and offset
  async function getPage(req) {
    const { status, response } = await getLimitOffset(req);
    if (status) {
      uiTbody(response);
      uiBtnPageActive(req.offsetVal);
    }
    if (!status) {
      console.error(response);
    }
  }
  // 4.handle pagination
  function handlePagination(totalPage) {
    uiBtnPage(totalPage);
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
  }
};
