import { debounce } from "../../utils/debounce.js";
import { formatRupiah2 } from "../../utils/formatRupiah.js";
import { getLimitOffset, getRowPage, getSum } from "./services.js";
import {
  uiBtnPage,
  uiBtnPageActive,
  uiLoad,
  uiReset,
  uiTBody,
  uiTrEmpty,
} from "./ui.js";
// get all value
let searchVal = $("input#sales-read-search").val();
let limitVal = parseInt($("select#sales-read-limit").val());
let offsetVal = 1;
// fetch init
getInit();
// search
// Debounced event handler
const handleDebounce = debounce(() => {
  getInit();
}, 1000);
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
    getInit();
    uiReset();
  });
async function getInit() {
  const req = {
    searchVal,
    limitVal,
    offsetVal,
  };
  //1.total sum
  const totalSales = await getSum();
  const sumStatus = totalSales.status;
  const resSum = totalSales.response;
  if (sumStatus) {
    const currency = formatRupiah2(resSum);
    $("div#sales-total-sum").text(currency);
  }
  if (!sumStatus) {
    console.error(resSum);
  }
  // 2.row page
  const init = await getRowPage(req);
  const initStatus = init.status;
  const totalPage = init.response.totalPage;
  const totalRow = init.response.totalRow;
  if (initStatus) {
    if (totalRow >= 1) {
      await getPage(req);
      handlePagination(totalPage);
      $("div#sales-page-container").removeClass("d-none");
    }
    if (totalRow < 1) {
      uiTrEmpty(searchVal);
      $("div#sales-page-container").addClass("d-none");
    }
  }
  if (!initStatus) {
    console.log(init.response);
  }
}
async function getPage(req) {
  const sales = await getLimitOffset(req);
  const status = sales.status;
  const response = sales.response;
  if (status) {
    uiTBody(response);
    uiBtnPageActive(req.offsetVal);
  }
  if (!status) {
    console.error(response);
  }
}
function handlePagination(totalPage) {
  let btn = ``;
  for (let i = 1; i <= totalPage; i++) {
    btn += uiBtnPage(i);
  }
  $("div#sales-read-numberpage").html(btn);
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
  $("input#sales-read-search").val("");
  const searchVal = "";
  const limitVal = 3;
  const offsetVal = 1;
  const req = {
    searchVal,
    limitVal,
    offsetVal,
  };
  // 1.total sum
  const totalSales = await getSum();
  const sumStatus = totalSales.status;
  const resSum = totalSales.response;
  if (sumStatus) {
    const currency = formatRupiah2(resSum);
    $("div#sales-total-sum").text(currency);
  }
  if (!sumStatus) {
    console.error(resSum);
  }
  // 2. row page
  const init = await getRowPage(req);
  const initStatus = init.status;
  const totalPage = init.response.totalPage;
  const totalRow = init.response.totalRow;
  if (initStatus) {
    if (totalRow >= 1) {
      await getPage(req);
      handlePagination(totalPage);
      $("div#sales-page-container").removeClass("d-none");
    }
    if (totalRow < 1) {
      uiTrEmpty(req.searchVal);
      $("tbody#sales-read-table").html(empty);
      $("div#sales-page-container").addClass("d-none");
    }
  }
  if (!initStatus) {
    console.log(init.response);
  }
  async function getPage(req) {
    const sales = await getLimitOffset(req);
    const status = sales.status;
    const response = sales.response;
    if (status) {
      uiTBody(response);
      uiBtnPageActive(req.offsetVal);
    }
    if (!status) {
      console.error(response);
    }
  }
  function handlePagination(totalPage) {
    let btn = ``;
    for (let i = 1; i <= totalPage; i++) {
      btn += uiBtnPage(i);
    }
    $("div#sales-read-numberpage").html(btn);
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
