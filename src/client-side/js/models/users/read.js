import { reinitTooltip } from "../../utils/updateUi.js";
import { fetchLimitOffset, fetchRowPage } from "./services.js";
import {
  uiBtnPage,
  uiBtnPageActive,
  uiTr,
  uiTrEmpty,
  uiTrSearching,
} from "./ui.js";
// request
let searchVal = $("input#user-search").val();
let limitVal = parseInt($("select#user-limit").val());
let offsetVal = 1;
// searching
let timeoutId;
$("input#user-search")
  .off("keyup")
  .on("keyup", function () {
    $("span#user-total-row").text("waiting..");
    $("div#user-pagination").addClass("d-none");
    searchVal = $(this).val();
    const tr = uiTrSearching();
    $("tbody#user").html(tr);
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => {
      fetchInit();
    }, 1000);
  });
// limit
let timeoutId1;
$("select#user-limit")
  .off("change")
  .on("change", function () {
    limitVal = $(this).val();
    $("div#user-pagination").addClass("d-none");
    const tr = uiTrSearching();
    $("tbody#user").html(tr);
    if (timeoutId1) {
      clearTimeout(timeoutId1);
    }
    timeoutId1 = setTimeout(() => {
      fetchInit();
    }, 1000);
  });
// 1. init & pagination
fetchInit();
async function fetchInit() {
  const req = {
    searchVal,
    limitVal,
    offsetVal,
  };
  const rowPage = await fetchRowPage(req);
  const status = rowPage.status;
  const response = rowPage.response;
  if (status) {
    const { totalPage, totalRow } = response;
    $("span#user-total-row").text(totalRow);
    const existed = totalRow >= 1;
    // existed
    if (existed) {
      getByPage(req);
      handlePagination(totalPage);
      $("div#user-pagination").removeClass("d-none");
    }
    // non-exsited
    if (!existed) {
      const tr = uiTrEmpty(searchVal);
      $("tbody#user").html(tr);
      $("div#user-pagination").addClass("d-none");
    }
  }
  if (!status) {
    console.error(response);
  }
}
// 2. get user based on page
async function getByPage(req) {
  const users = await fetchLimitOffset(req);
  const status = users.status;
  const response = users.response;
  if (status) {
    let tr = ``;
    response.forEach((el) => {
      tr += uiTr(el);
    });
    $("tbody#user").html(tr);
    reinitTooltip();
    // active page
    uiBtnPageActive(req.offsetVal);
  }
  if (!status) {
    console.error(response);
  }
}
// 3. handle pagination
function handlePagination(totalPage) {
  // insert html
  let btn = ``;
  for (let i = 1; i <= totalPage; i++) {
    btn += uiBtnPage(i);
  }
  $("#user-page-number").html(btn);
  // first-page
  $("#user-first-page")
    .off("click")
    .on("click", () => {
      const req = {
        searchVal,
        limitVal,
        offsetVal: 1,
      };
      getByPage(req);
    });
  // prev-page
  $("#user-prev-page")
    .off("click")
    .on("click", function () {
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
      getByPage(req);
    });
  // by-number
  $("#user-page-number")
    .off("click", "button")
    .on("click", "button", function () {
      let numberPage = $(this).text().trim();
      const req = {
        searchVal,
        limitVal,
        offsetVal: numberPage,
      };
      getByPage(req);
    });
  // next - page
  $("#user-next-page")
    .off("click")
    .on("click", function () {
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
      getByPage(req);
    });
  // last page
  $("#user-last-page")
    .off("click")
    .on("click", function () {
      const req = {
        searchVal,
        limitVal,
        offsetVal: totalPage,
      };
      getByPage(req);
    });
}

export const getUserAgain = async () => {
  $("input#user-search").val("");
  let searchVal = $("input#user-search").val();
  let limitVal = parseInt($("select#user-limit").val());
  let offsetVal = 1;
  // 1. init & pagination
  const req = {
    searchVal,
    limitVal,
    offsetVal,
  };
  const rowPage = await fetchRowPage(req);
  const status = rowPage.status;
  const response = rowPage.response;
  if (status) {
    const { totalPage, totalRow } = response;
    $("span#user-total-row").text(totalRow);
    const existed = totalRow >= 1;
    // existed
    if (existed) {
      await getByPage(req);
      handlePagination(totalPage);
      $("div#user-pagination").removeClass("d-none");
    }
    // non-exsited
    if (!existed) {
      const tr = uiTrEmpty(searchVal);
      $("tbody#user").html(tr);
      $("div#user-pagination").addClass("d-none");
    }
  }
  if (!status) {
    console.error(response);
  }
  // 2. get user based on page
  async function getByPage(req) {
    const users = await fetchLimitOffset(req);
    const status = users.status;
    const response = users.response;
    if (status) {
      let tr = ``;
      response.forEach((el) => {
        tr += uiTr(el);
      });
      $("tbody#user").html(tr);
      reinitTooltip();
      // active page
      uiBtnPageActive(req.offsetVal);
      console.log("test-2");
    }
    if (!status) {
      console.error(response);
    }
  }
  // handle pagination
  function handlePagination(totalPage) {
    // insert html
    let btn = ``;
    for (let i = 1; i <= totalPage; i++) {
      btn += uiBtnPage(i);
    }
    $("#user-page-number").html(btn);
    // first-page
    $("#user-first-page")
      .off("click")
      .on("click", () => {
        const req = {
          searchVal,
          limitVal,
          offsetVal: 1,
        };
        getByPage(req);
      });
    // prev-page
    $("#user-prev-page")
      .off("click")
      .on("click", function () {
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
        getByPage(req);
      });
    // by-number
    $("#user-page-number")
      .off("click", "button")
      .on("click", "button", function () {
        let numberPage = $(this).text().trim();
        const req = {
          searchVal,
          limitVal,
          offsetVal: numberPage,
        };
        getByPage(req);
      });
    // next - page
    $("#user-next-page")
      .off("click")
      .on("click", function () {
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
        getByPage(req);
      });
    // last page
    $("#user-last-page")
      .off("click")
      .on("click", function () {
        const req = {
          searchVal,
          limitVal,
          offsetVal: totalPage,
        };
        getByPage(req);
      });
  }
};
