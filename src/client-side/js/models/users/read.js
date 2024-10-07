import { fetchLimitOffset, fetchRowPage } from "./services.js";
import { uiBtnPage, uiBtnPageActive, uiTr } from "./ui.js";
let searchVal = $("input#user-search").val();
let limitVal = parseInt($("select#user-limit").val());
let offsetVal = 1;
const req = {
  searchVal,
  limitVal,
  offsetVal,
};
// 1. init & pagination
fetchRowPage(req, (status, response) => {
  if (status) {
    const totalPage = response.totalPage;
    const totalRow = response.totalRow;
    $("span#user-total-row").text(totalRow);
    const existed = totalRow >= 1;
    if (existed) {
      let btn = ``;
      for (let i = 1; i <= totalPage; i++) {
        btn += uiBtnPage(i);
      }
      $("#user-page-number").html(btn);
      $("div#user-pagination").removeClass("d-none");
      getByPage(req);
      handlePagination(totalPage);
    }
    if (!existed) {
      $("div#user-pagination").addClass("d-none");
    }
  }
  if (!status) {
    console.error(response);
  }
});
// 2. get user based on page
function getByPage(req) {
  fetchLimitOffset(req, (status, response) => {
    if (status) {
      let tr = ``;
      response.forEach((el) => {
        tr += uiTr(el);
      });
      $("tbody#user").html(tr);
      // active page
      uiBtnPageActive(req.offsetVal);
    }
    if (!status) {
      console.error(response);
    }
  });
}
// handle pagination
function handlePagination(totalPage) {
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
  $("#user-page-number button")
    .off("click")
    .on("click", function () {
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
