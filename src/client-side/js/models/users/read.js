import { debounce } from "../../utils/debounce.js";
import { reinitTooltip } from "../../utils/updateUi.js";
import { fetchLimitOffset, fetchRowPage } from "./services.js";
import {
  uiBtnPage,
  uiBtnPageActive,
  uiLoad,
  uiTbody,
  uiTbodyEmpty,
} from "./ui.js";
// request
let searchVal = $("input#user-search").val();
let limitVal = parseInt($("select#user-limit").val());
let offsetVal = 1;
// Debounced event handler
const handleDebounce = debounce(() => {
  fetchInit();
}, 1000);
$("input#user-search")
  .off("keyup")
  .on("keyup", function () {
    searchVal = $(this).val();
    $("span#user-total-row").text("waiting..");
    uiLoad();
    handleDebounce();
  });
// limit
$("select#user-limit")
  .off("change")
  .on("change", function () {
    limitVal = $(this).val();
    uiLoad();
    handleDebounce();
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
      await getByPage(req);
      handlePagination(totalPage);
      $("div#user-pagination").removeClass("d-none");
    }
    // non-exsited
    if (!existed) {
      uiTbodyEmpty(searchVal);
      $("div#user-pagination").addClass("d-none");
    }
  }
  if (!status) {
    console.error(response);
  }
}
// 2. get user based on page
async function getByPage(req) {
  const { status, response } = await fetchLimitOffset(req);
  if (status) {
    uiTbody(response);
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
  // 1. init & pagination
  let searchVal = $("input#user-search").val();
  let limitVal = parseInt($("select#user-limit").val());
  let offsetVal = 1;
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
      uiTbodyEmpty(searchVal);
      $("div#user-pagination").addClass("d-none");
    }
  }
  if (!status) {
    console.error(response);
  }
  // 2. get user based on page
  async function getByPage(req) {
    const { status, response } = await fetchLimitOffset(req);
    if (status) {
      uiTbody(response);
      reinitTooltip();
      // active page
      uiBtnPageActive(req.offsetVal);
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
