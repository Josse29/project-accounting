import {
  uiBtnPageActive,
  uiBtnPage,
  uiInit,
  uiTbody,
  uiTbodyEmpty,
  uiTbodyLoad,
} from "./ui.js";
import { formatRupiah2 } from "../../utils/formatRupiah.js";
import { reinitTooltip } from "../../utils/updateUi.js";
import { debounce } from "../../utils/debounce.js";
import { getAll, getPagination, getSumPrice } from "./services.js";

// debouncing
const handleBounce = debounce(() => {
  getInitAsync();
}, 1000);

// get all value
let searchVal = $("input#persediaan-search").val();
let limitVal = parseInt($("#persediaan-limit").val());
let offsetVal = 1;

// refresh
$("button#persediaan-refresh")
  .off("click")
  .on("click", function () {
    searchVal = "";
    uiInit();
    uiTbodyLoad();
    handleBounce();
  });
// search
$("input#persediaan-search")
  .off("keyup")
  .on("keyup", function () {
    searchVal = $(this).val();
    uiTbodyLoad();
    handleBounce();
  });
// limit
$("select#persediaan-limit")
  .off("change")
  .on("change", function () {
    limitVal = parseInt($(this).val());
    uiInit();
    uiTbodyLoad();
    handleBounce();
  });

// function
getInitAsync();
// 1. get total page and row
async function getInitAsync() {
  const req = {
    searchVal,
    limitVal,
    offsetVal,
  };
  const { status, response } = await getPagination(req);
  if (status) {
    const { totalRow, totalPage } = response;
    // if it exist inventory
    const existed = totalRow >= 1;
    if (existed) {
      await getSummary();
      await getPersediaanPage(req);
      handlePagination(totalPage);
      $("#persediaan-pagination").removeClass("d-none");
    }
    // if it doesn't exist inventory
    if (!existed) {
      uiTbodyEmpty(searchVal);
      $("#persediaan-pagination").addClass("d-none");
      $("#persediaan-detail-totalrp").text(`Rp 0.00,-`);
    }
  }
  if (!status) {
    console.error(response);
  }
}
// 2. get summary
async function getSummary() {
  const { status, response } = await getSumPrice();
  if (status) {
    const txt = formatRupiah2(response);
    $("#persediaan-detail-totalrp").text(txt);
  }
  if (!status) {
    console.error(response);
  }
}
// 3. get persediaan by limit offset
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
// 4. pagination
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

  let searchVal = "";
  let limitVal = parseInt($("#persediaan-limit").val());
  let offsetVal = 1;
  const req = {
    searchVal,
    limitVal,
    offsetVal,
  };

  // 1. get total page and row
  const { status, response } = await getPagination(req);
  if (status) {
    const { totalRow, totalPage } = response;
    // if it exist inventory
    const existed = totalRow >= 1;
    if (existed) {
      await getSummary();
      await getPersediaanPage(req);
      handlePagination(totalPage);
      $("#persediaan-pagination").removeClass("d-none");
    }
    // if it doesn't exist inventory
    if (!existed) {
      uiTbodyEmpty(searchVal);
      $("#persediaan-pagination").addClass("d-none");
      $("#persediaan-detail-totalrp").text(`Rp 0.00,-`);
    }
  }
  if (!status) {
    console.error(response);
  }

  // 2. get summary
  async function getSummary() {
    const { status, response } = await getSumPrice();
    if (status) {
      const txt = formatRupiah2(response);
      $("#persediaan-detail-totalrp").text(txt);
    }
    if (!status) {
      console.error(response);
    }
  }

  // 3. get persediaan by limit offset
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

  // 4. pagination
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
