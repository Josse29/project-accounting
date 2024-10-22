import { reinitTooltip, uiLoad } from "../../utils/updateUi.js";
import {
  uiBtnPage,
  uiBtnPageActive,
  uiTbody,
  uiTbodyLoad,
  uiTbodyZero,
} from "./ui.js";
import { getProductsAgain } from "./../products/read.js";
import { getPersediaanAgain } from "../persediaan/read.js";
import {
  listSupplierRefPersediaanRead,
  listSupplierRefPersediaanReadDate,
} from "./list.js";
import { getByLimitOffset, pagination } from "./services.js";
import { debounce } from "../../utils/debounce.js";
$("div#supplier-loading").html(uiLoad());
$("div#supplier-done").hide();
// search
const handleBounce = debounce(() => {
  getInit();
}, 1000);
$("#supplier-search-input")
  .off("keyup")
  .on("keyup", function () {
    searchVal = $(this).val();
    uiTbodyLoad();
    handleBounce();
  });
// limit
$("#supplier-limit")
  .off("change")
  .on("change", function () {
    limitVal = parseInt($(this).val());
    uiTbodyLoad();
    handleBounce();
  });
let searchVal = $("#supplier-search-input").val();
let limitVal = parseInt($("#supplier-limit").val());
let offsetVal = 1;
getInit();
// pagination
async function getInit() {
  const req = {
    searchVal,
    limitVal,
    offsetVal,
  };
  const { status, response } = await pagination(req);
  if (status) {
    const { totalPage, totalRow } = response;
    $("p#supplier-total-row").text(`Total : ${totalRow}`);
    if (totalRow >= 1) {
      await getSupplierPage(req);
      handlePagination(totalPage);
      $("div#supplier-pagination").removeClass("d-none");
    }
    if (totalRow < 1) {
      uiTbodyZero(searchVal);
      $("div#supplier-pagination").addClass("d-none");
    }
    // loading-done
    $("div#supplier-loading").html("");
    $("div#supplier-done").show();
  }
  if (!status) {
    console.error(response);
  }
}
async function getSupplierPage(req) {
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
  $("#supplier-first-page")
    .off("click")
    .on("click", async () => {
      const req = {
        searchVal,
        limitVal,
        offsetVal: 1,
      };
      await getSupplierPage(req);
    });
  // previous page
  $("#supplier-prev-page")
    .off("click")
    .on("click", async () => {
      let pageActive = parseInt($(".supplier-active-page").text().trim());
      let decrementPage = pageActive - 1;
      if (decrementPage < 1) {
        decrementPage = totalPage;
      }
      const req = {
        searchVal,
        limitVal,
        offsetVal: decrementPage,
      };
      await getSupplierPage(req);
    });
  // by based number page
  $("#supplier-number-page")
    .off("click", "button.supplier-btn-page")
    .on("click", "button.supplier-btn-page", async function () {
      const pageNumber = parseInt(this.textContent.trim());
      const req = {
        searchVal,
        limitVal,
        offsetVal: pageNumber,
      };
      await getSupplierPage(req);
    });
  // next page
  $("#supplier-next-page")
    .off("click")
    .on("click", async function () {
      let pageActive = parseInt($(".supplier-active-page").text().trim());
      let incrementPage = pageActive + 1;
      if (incrementPage > totalPage) {
        incrementPage = 1;
      }
      const req = {
        searchVal,
        limitVal,
        offsetVal: incrementPage,
      };
      await getSupplierPage(req);
    });
  // last page
  $("#supplier-last-page")
    .off("click")
    .on("click", async () => {
      const req = {
        searchVal,
        limitVal,
        offsetVal: totalPage,
      };
      await getSupplierPage(req);
    });
}
export const getSupplierAgain = async () => {
  let searchVal = "";
  let limitVal = parseInt($("#supplier-limit").val());
  let offsetVal = 1;
  $("#supplier-search-input").val("");
  // pagination
  const req = {
    searchVal,
    limitVal,
    offsetVal,
  };
  const { status, response } = await pagination(req);
  if (status) {
    const { totalPage, totalRow } = response;
    $("p#supplier-total-row").text(`Total : ${totalRow}`);
    if (totalRow >= 1) {
      await getSupplierPage(req);
      handlePagination(totalPage);
      $("div#supplier-pagination").removeClass("d-none");
    }
    if (totalRow < 1) {
      uiTbodyZero(searchVal);
      $("div#supplier-pagination").addClass("d-none");
    }
  }
  if (!status) {
    console.error(response);
  }
  async function getSupplierPage(req) {
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
    $("#supplier-first-page")
      .off("click")
      .on("click", async () => {
        const req = {
          searchVal,
          limitVal,
          offsetVal: 1,
        };
        await getSupplierPage(req);
      });
    // previous page
    $("#supplier-prev-page")
      .off("click")
      .on("click", async () => {
        let pageActive = parseInt($(".supplier-active-page").text().trim());
        let decrementPage = pageActive - 1;
        if (decrementPage < 1) {
          decrementPage = totalPage;
        }
        const req = {
          searchVal,
          limitVal,
          offsetVal: decrementPage,
        };
        await getSupplierPage(req);
      });
    // by based number page
    $("#supplier-number-page")
      .off("click", "button.supplier-btn-page")
      .on("click", "button.supplier-btn-page", async function () {
        const pageNumber = parseInt(this.textContent.trim());
        const req = {
          searchVal,
          limitVal,
          offsetVal: pageNumber,
        };
        await getSupplierPage(req);
      });
    // next page
    $("#supplier-next-page")
      .off("click")
      .on("click", async function () {
        let pageActive = parseInt($(".supplier-active-page").text().trim());
        let incrementPage = pageActive + 1;
        if (incrementPage > totalPage) {
          incrementPage = 1;
        }
        const req = {
          searchVal,
          limitVal,
          offsetVal: incrementPage,
        };
        await getSupplierPage(req);
      });
    // last page
    $("#supplier-last-page")
      .off("click")
      .on("click", async () => {
        const req = {
          searchVal,
          limitVal,
          offsetVal: totalPage,
        };
        await getSupplierPage(req);
      });
  }
};
export const getSupplierRef = async () => {
  await getProductsAgain();
  await getPersediaanAgain();
  listSupplierRefPersediaanRead();
  listSupplierRefPersediaanReadDate();
};
