import {
  uiBtnPageActive,
  uiBtnPage,
  uiInit,
  uiTbody,
  uiTbodyEmpty,
  uiTBodyLoad,
} from "./ui.js";
import { formatRupiah2 } from "../../utils/formatRupiah.js";
import { reinitTooltip, uiLoad } from "../../utils/updateUi.js";
import { debounce } from "../../utils/debounce.js";
import { getAll, getPagination, getSumPrice } from "./services.js";
// loading
$("div#persediaan-loading").html(uiLoad());
$("div#persediaan-done").hide();
// get all value
let searchVal = $("input#persediaan-search").val();
let limitVal = parseInt($("#persediaan-limit").val());
let offsetVal = 1;
// get init
getInitAsync();
// refresh
$("button#persediaan-refresh")
  .off("click")
  .on("click", function () {
    searchVal = "";
    getInitAsync();
    uiInit();
  });
// search
const handleBounce = debounce(() => {
  getInitAsync();
}, 1000);
$("input#persediaan-search")
  .off("keyup")
  .on("keyup", function () {
    searchVal = $(this).val();
    uiTBodyLoad();
    handleBounce();
  });
// limit
$("select#persediaan-limit")
  .off("change")
  .on("change", function () {
    limitVal = parseInt($(this).val());
    uiTBodyLoad();
    handleBounce();
  });
async function getInitAsync() {
  // 1.sum rupiah persediaan
  const totalPrice = await getSumPrice();
  const totalPriceRes = totalPrice.response;
  const totalPriceStatus = totalPrice.status;
  if (totalPriceStatus) {
    const txt = formatRupiah2(totalPriceRes);
    $("#persediaan-detail-totalrp").text(txt);
  }
  if (!totalPriceStatus) {
    console.error(totalPriceRes);
  }
  // 2.get total row and page
  const req = {
    searchVal,
    limitVal,
    offsetVal,
  };
  const init = await getPagination(req);
  const initStatus = init.status;
  const initRes = init.response;
  if (initStatus) {
    const { totalRow, totalPage } = initRes;
    // if it exist inventory
    if (totalRow >= 1) {
      await getPersediaanPage(req);
      handlePagination(totalPage);
      $("#persediaan-pagination").removeClass("d-none");
    }
    // if it doesn't exist inventory
    if (totalRow < 1) {
      uiTbodyEmpty(searchVal);
      $("#persediaan-pagination").addClass("d-none");
    }
  }
  if (!initStatus) {
    console.error(initRes);
  }
  // references and loading
  $("div#persediaan-done").show();
  $("div#persediaan-loading").html("");
}
async function getPersediaanPage(req) {
  const { status, response } = await getAll(req);
  if (status) {
    uiTbody(response);
    uiBtnPageActive(req.offsetVal);
    reinitTooltip();
  }
  if (!status) {
    console.error(response);
  }
}
function handlePagination(totalPage) {
  // for pagination
  uiBtnPage(totalPage);
  // first page
  $("#persediaan-first-page")
    .off("click")
    .on("click", async () => {
      const req = {
        searchVal,
        limitVal,
        offsetVal: 1,
      };
      await getPersediaanPage(req);
    });
  // previous page
  $("#persediaan-prev-page")
    .off("click")
    .on("click", async () => {
      let pageActive = parseInt($(".persediaan-active-page").text().trim());
      let decrementPage = pageActive - 1;
      if (decrementPage < 1) {
        decrementPage = totalPage;
      }
      const req = {
        searchVal,
        limitVal,
        offsetVal: decrementPage,
      };
      await getPersediaanPage(req);
    });
  // based on number when clicked
  $("div#persediaan-number-page")
    .off("click", "button.persediaan-btn-page")
    .on("click", "button.persediaan-btn-page", async function () {
      const pageNumber = parseInt(this.textContent.trim());
      const req = {
        searchVal,
        limitVal,
        offsetVal: pageNumber,
      };
      await getPersediaanPage(req);
    });
  // next page
  $("#persediaan-next-page")
    .off("click")
    .on("click", async () => {
      let pageActive = parseInt($(".persediaan-active-page").text().trim());
      let incrementPage = pageActive + 1;
      if (incrementPage > totalPage) {
        incrementPage = 1;
      }
      const req = {
        searchVal,
        limitVal,
        offsetVal: incrementPage,
      };
      await getPersediaanPage(req);
    });
  // last page
  $("#persediaan-last-page")
    .off("click")
    .on("click", async () => {
      const req = {
        searchVal,
        limitVal,
        offsetVal: totalPage,
      };
      await getPersediaanPage(req);
    });
}
export const getPersediaanAgain = async () => {
  // reset ui
  uiInit();
  // 1.sum rupiah persediaan
  const totalPrice = await getSumPrice();
  const totalPriceRes = totalPrice.response;
  const totalPriceStatus = totalPrice.status;
  if (totalPriceStatus) {
    const txt = formatRupiah2(totalPriceRes);
    $("#persediaan-detail-totalrp").text(txt);
  }
  if (!totalPriceStatus) {
    console.error(totalPriceRes);
  }
  // 2.get total row and page
  const req = {
    searchVal,
    limitVal,
    offsetVal,
  };
  const init = await getPagination(req);
  const initStatus = init.status;
  const initRes = init.response;
  if (initStatus) {
    const { totalRow, totalPage } = initRes;
    // if it exist inventory
    if (totalRow >= 1) {
      await getPersediaanPage(req);
      handlePagination(totalPage);
      $("#persediaan-pagination").removeClass("d-none");
    }
    // if it doesn't exist inventory
    if (totalRow < 1) {
      uiTbodyEmpty(searchVal);
      $("#persediaan-pagination").addClass("d-none");
    }
  }
  if (!initStatus) {
    console.error(initRes);
  }
  async function getPersediaanPage(req) {
    const { status, response } = await getAll(req);
    if (status) {
      uiTbody(response);
      uiBtnPageActive(req.offsetVal);
      reinitTooltip();
    }
    if (!status) {
      console.error(response);
    }
  }
  function handlePagination(totalPage) {
    // for pagination
    uiBtnPage(totalPage);
    // first page
    $("#persediaan-first-page")
      .off("click")
      .on("click", async () => {
        const req = {
          searchVal,
          limitVal,
          offsetVal: 1,
        };
        await getPersediaanPage(req);
      });
    // previous page
    $("#persediaan-prev-page")
      .off("click")
      .on("click", async () => {
        let pageActive = parseInt($(".persediaan-active-page").text().trim());
        let decrementPage = pageActive - 1;
        if (decrementPage < 1) {
          decrementPage = totalPage;
        }
        const req = {
          searchVal,
          limitVal,
          offsetVal: decrementPage,
        };
        await getPersediaanPage(req);
      });
    // based on number when clicked
    $("div#persediaan-number-page")
      .off("click", "button.persediaan-btn-page")
      .on("click", "button.persediaan-btn-page", async function () {
        const pageNumber = parseInt(this.textContent.trim());
        const req = {
          searchVal,
          limitVal,
          offsetVal: pageNumber,
        };
        await getPersediaanPage(req);
      });
    // next page
    $("#persediaan-next-page")
      .off("click")
      .on("click", async () => {
        let pageActive = parseInt($(".persediaan-active-page").text().trim());
        let incrementPage = pageActive + 1;
        if (incrementPage > totalPage) {
          incrementPage = 1;
        }
        const req = {
          searchVal,
          limitVal,
          offsetVal: incrementPage,
        };
        await getPersediaanPage(req);
      });
    // last page
    $("#persediaan-last-page")
      .off("click")
      .on("click", async () => {
        const req = {
          searchVal,
          limitVal,
          offsetVal: totalPage,
        };
        await getPersediaanPage(req);
      });
  }
};
