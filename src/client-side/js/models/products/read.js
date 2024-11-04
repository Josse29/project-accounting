import { reinitTooltip, uiLoad } from "../../utils/updateUi.js";
import {
  uiBtnPage,
  uiBtnPageActive,
  uiTbody,
  uiTBodyEmpty,
  uiTBodyLoad,
} from "./ui.js";
import { getPersediaanAgain } from "../persediaan/read.js";
import {
  listProductRefPersediaanRead,
  listProductRefSalesRead,
} from "./list.js";
import { getCategoryAgain } from "../categories/read.js";
import { getLimitOffset, getPagination } from "./services.js";
import { debounce } from "../../utils/debounce.js";

// debouncing
const handleBounce = debounce(() => {
  getInit();
}, 1000);

// get all value
let searchVal = $("#product-search-input").val();
let limitVal = parseInt($("#product-limit").val());
let offsetVal = 1;

// searching
$("#product-search-input")
  .off("keyup")
  .on("keyup", function () {
    searchVal = $(this).val();
    uiTBodyLoad();
    handleBounce();
  });
// limit
$("#product-limit")
  .off("change")
  .on("change", function () {
    limitVal = parseInt($(this).val());
    uiTBodyLoad();
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
  const pagination = await getPagination(req);
  const { status, response } = pagination;
  if (status) {
    const { totalPage, totalRow } = response;
    $("p#product-total-row").text(`Total : ${totalRow}`);
    if (totalRow >= 1) {
      await getProductPage(req);
      handlePagination(totalPage);
      $("#product-pagination").removeClass("d-none");
    }
    if (totalRow < 1) {
      uiTBodyEmpty(searchVal);
      $("#product-pagination").addClass("d-none");
    }
  }
  if (!status) {
    console.error(response);
  }
}
async function getProductPage(req) {
  const { status, response } = await getLimitOffset(req);
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
  $("#product-first-page")
    .off("click")
    .on("click", async () => {
      const req = {
        searchVal,
        limitVal,
        offsetVal: 1,
      };
      await getProductPage(req);
    });
  // previous page
  $("#product-prev-page")
    .off("click")
    .on("click", async function () {
      let pageActive = parseInt($(".product-active-page").text().trim());
      let decrementPage = pageActive - 1;
      if (decrementPage < 1) {
        decrementPage = totalPage;
      }
      const req = {
        searchVal,
        limitVal,
        offsetVal: decrementPage,
      };
      await getProductPage(req);
    });
  // based on number when clicked
  $("div#product-number-page")
    .off("click", "button.product-btn-page")
    .on("click", "button.product-btn-page", async function () {
      const pageNumber = parseInt(this.textContent.trim());
      const req = {
        searchVal,
        limitVal,
        offsetVal: pageNumber,
      };
      await getProductPage(req);
    });
  // next page
  $("#product-next-page")
    .off("click")
    .on("click", async function () {
      let pageActive = parseInt($(".product-active-page").text().trim());
      let incrementPage = pageActive + 1;
      if (incrementPage > totalPage) {
        incrementPage = 1;
      }
      const req = {
        searchVal,
        limitVal,
        offsetVal: incrementPage,
      };
      await getProductPage(req);
    });
  // last page
  $("#product-last-page")
    .off("click")
    .on("click", async () => {
      const req = {
        searchVal,
        limitVal,
        offsetVal: totalPage,
      };
      await getProductPage(req);
    });
}
// RE-Initial fetch and setup
export const getProductsAgain = async () => {
  // reset-search
  $("#product-search-input").val("");

  // 1. init
  // get all value
  let searchVal = $("#product-search-input").val();
  let limitVal = parseInt($("#product-limit").val());
  let offsetVal = 1;
  const req = {
    searchVal,
    limitVal,
    offsetVal,
  };

  // pagination and total row
  const pagination = await getPagination(req);
  const { status, response } = pagination;
  if (status) {
    const { totalPage, totalRow } = response;
    $("p#product-total-row").text(`Total : ${totalRow}`);
    if (totalRow >= 1) {
      await getProductPage(req);
      handlePagination(totalPage);
      $("#product-pagination").removeClass("d-none");
    }
    if (totalRow < 1) {
      uiTBodyEmpty(searchVal);
      $("#product-pagination").addClass("d-none");
    }
    // references and loading
    $("div#product-loading").html("");
    $("div#product-done").show();
  }
  if (!status) {
    console.error(response);
  }

  // by page
  async function getProductPage(req) {
    const { status, response } = await getLimitOffset(req);
    if (status) {
      uiTbody(response);
      reinitTooltip();
      uiBtnPageActive(req.offsetVal);
    }
    if (!status) {
      console.error(response);
    }
  }

  // button page
  function handlePagination(totalPage) {
    uiBtnPage(totalPage);
    // first page
    $("#product-first-page")
      .off("click")
      .on("click", async () => {
        const req = {
          searchVal,
          limitVal,
          offsetVal: 1,
        };
        await getProductPage(req);
      });
    // previous page
    $("#product-prev-page")
      .off("click")
      .on("click", async function () {
        let pageActive = parseInt($(".product-active-page").text().trim());
        let decrementPage = pageActive - 1;
        if (decrementPage < 1) {
          decrementPage = totalPage;
        }
        const req = {
          searchVal,
          limitVal,
          offsetVal: decrementPage,
        };
        await getProductPage(req);
      });
    // based on number when clicked
    $("div#product-number-page")
      .off("click", "button.product-btn-page")
      .on("click", "button.product-btn-page", async function () {
        const pageNumber = parseInt(this.textContent.trim());
        const req = {
          searchVal,
          limitVal,
          offsetVal: pageNumber,
        };
        await getProductPage(req);
      });
    // next page
    $("#product-next-page")
      .off("click")
      .on("click", async function () {
        let pageActive = parseInt($(".product-active-page").text().trim());
        let incrementPage = pageActive + 1;
        if (incrementPage > totalPage) {
          incrementPage = 1;
        }
        const req = {
          searchVal,
          limitVal,
          offsetVal: incrementPage,
        };
        await getProductPage(req);
      });
    // last page
    $("#product-last-page")
      .off("click")
      .on("click", async () => {
        const req = {
          searchVal,
          limitVal,
          offsetVal: totalPage,
        };
        await getProductPage(req);
      });
  }
};
export const getProductRef = async () => {
  await getPersediaanAgain();
  await getCategoryAgain();
  await listProductRefPersediaanRead();
  await listProductRefSalesRead();
};
