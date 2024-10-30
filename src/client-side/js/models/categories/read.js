import { reinitTooltip, uiLoad } from "../../utils/updateUi.js";
import {
  uiBtnPage,
  uiBtnPageActive,
  uiTbody,
  uiTbodyEmpty,
  uiTbodyLoad,
} from "./ui.js";
import { getProductsAgain } from "./../products/read.js";
import { getPersediaanAgain } from "../persediaan/read.js";
import { listCategoryRefPersediaanRead } from "./list.js";
import { getByLimitOffset, getPagination } from "./services.js";
import { debounce } from "../../utils/debounce.js";

// debouncing
const handleBounce = debounce(() => {
  getInit();
}, 1000);

// get all value
let searchVal = $("#category-search-input").val();
let limitVal = parseInt($("#category-limit").val());
let offsetVal = 1;

// searching
$("#category-search-input")
  .off("keyup")
  .on("keyup", function () {
    searchVal = $(this).val();
    uiTbodyLoad();
    handleBounce();
  });
// limit
$("#category-limit")
  .off("change")
  .on("change", function () {
    limitVal = parseInt($(this).val());
    uiTbodyLoad();
    handleBounce();
  });

// function
getInit();
async function getInit() {
  const req = {
    searchVal,
    limitVal,
    offsetVal,
  };
  const { status, response } = await getPagination(req);
  if (status) {
    const { totalPage, totalRow } = response;
    $("p#categories-total-row").text(`Total : ${totalRow}`);
    // exsited category
    if (totalRow >= 1) {
      await getCategoryPage(req);
      handlePagination(totalPage);
      $("div#category-pagination").removeClass("d-none");
    }
    // non=exsited category
    if (totalRow < 1) {
      uiTbodyEmpty(searchVal);
      $("div#category-pagination").addClass("d-none");
    }
  }
  if (!status) {
    console.error(response);
  }
}
async function getCategoryPage(req) {
  const { status, response } = await getByLimitOffset(req);
  if (status) {
    uiTbody(response);
    reinitTooltip();
    uiBtnPageActive(req.offsetVal);
  }
  if (!status) {
    console.error(response);
  }
}
function handlePagination(totalPage) {
  uiBtnPage(totalPage);
  // first page
  $("#category-first-page")
    .off("click")
    .on("click", async () => {
      const req = {
        searchVal,
        limitVal,
        offsetVal: 1,
      };
      await getCategoryPage(req);
    });
  // previous page
  $("#category-prev-page")
    .off("click")
    .on("click", async function () {
      let pageActive = parseInt($(".category-active-page").text().trim());
      let decrementPage = pageActive - 1;
      if (decrementPage < 1) {
        decrementPage = totalPage;
      }
      const req = {
        searchVal,
        limitVal,
        offsetVal: decrementPage,
      };
      await getCategoryPage(req);
    });
  // based on number when clicked
  $("#category-number-page")
    .off("click", "button.category-btn-page")
    .on("click", "button.category-btn-page", async function () {
      const pageNumber = parseInt(this.textContent.trim());
      const req = {
        searchVal,
        limitVal,
        offsetVal: pageNumber,
      };
      await getCategoryPage(req);
    });
  // // next page
  $("#category-next-page")
    .off("click")
    .on("click", async () => {
      let pageActive = parseInt($(".category-active-page").text().trim());
      let incrementPage = pageActive + 1;
      if (incrementPage > totalPage) {
        incrementPage = 1;
      }
      const req = {
        searchVal,
        limitVal,
        offsetVal: incrementPage,
      };
      await getCategoryPage(req);
    });
  // last page
  $("#category-last-page")
    .off("click")
    .on("click", async () => {
      const req = {
        searchVal,
        limitVal,
        offsetVal: totalPage,
      };
      await getCategoryPage(req);
    });
}
export const getCategoryAgain = async () => {
  $("#category-search-input").val("");
  const req = {
    searchVal,
    limitVal,
    offsetVal,
  };
  const { status, response } = await getPagination(req);
  if (status) {
    const { totalPage, totalRow } = response;
    $("p#categories-total-row").text(`Total : ${totalRow}`);
    if (totalRow >= 1) {
      await getCategoryPage(req);
      handlePagination(totalPage);
      $("div#category-pagination").removeClass("d-none");
    }
    if (totalRow < 1) {
      uiTbodyEmpty(searchVal);
      $("div#category-pagination").addClass("d-none");
    }
    $("div#category-loading").html("");
    $("div#category-done").show();
  }
  if (!status) {
    console.error(response);
  }
  async function getCategoryPage(req) {
    const { status, response } = await getByLimitOffset(req);
    if (status) {
      uiTbody(response);
      reinitTooltip();
      uiBtnPageActive(req.offsetVal);
    }
    if (!status) {
      console.error(response);
    }
  }
  function handlePagination(totalPage) {
    uiBtnPage(totalPage);
    // first page
    $("#category-first-page")
      .off("click")
      .on("click", async () => {
        const req = {
          searchVal,
          limitVal,
          offsetVal: 1,
        };
        await getCategoryPage(req);
      });
    // previous page
    $("#category-prev-page")
      .off("click")
      .on("click", async function () {
        let pageActive = parseInt($(".category-active-page").text().trim());
        let decrementPage = pageActive - 1;
        if (decrementPage < 1) {
          decrementPage = totalPage;
        }
        const req = {
          searchVal,
          limitVal,
          offsetVal: decrementPage,
        };
        await getCategoryPage(req);
      });
    // based on number when clicked
    $("#category-number-page")
      .off("click", "button.category-btn-page")
      .on("click", "button.category-btn-page", async function () {
        const pageNumber = parseInt(this.textContent.trim());
        const req = {
          searchVal,
          limitVal,
          offsetVal: pageNumber,
        };
        await getCategoryPage(req);
      });
    // // next page
    $("#category-next-page")
      .off("click")
      .on("click", async () => {
        let pageActive = parseInt($(".category-active-page").text().trim());
        let incrementPage = pageActive + 1;
        if (incrementPage > totalPage) {
          incrementPage = 1;
        }
        const req = {
          searchVal,
          limitVal,
          offsetVal: incrementPage,
        };
        await getCategoryPage(req);
      });
    // last page
    $("#category-last-page")
      .off("click")
      .on("click", async () => {
        const req = {
          searchVal,
          limitVal,
          offsetVal: totalPage,
        };
        await getCategoryPage(req);
      });
  }
};
export const getCategoryRef = async () => {
  await getProductsAgain();
  await getPersediaanAgain();
  await listCategoryRefPersediaanRead();
};
