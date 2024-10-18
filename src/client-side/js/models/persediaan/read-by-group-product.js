import { uiQty } from "../../component/card/qty.js";
import { list } from "../../component/list/index.js";
import { debounce } from "../../utils/debounce.js";
import { getGroupProduct, getRowPage1 } from "./services.js";
import {
  uiBtnPage1,
  uiBtnPageActive1,
  uiCard,
  uiCardEmpty,
  uiLoad,
} from "./ui.js";
let searchVal = $("input#order-search").val();
let limitVal = 3;
let offsetVal = 1;
// searching
const handleBounce = debounce(() => {
  getInit();
}, 1000);
$("input#order-search")
  .off("keyup")
  .on("keyup", function () {
    searchVal = $(this).val();
    uiLoad();
    handleBounce();
  });
getInit();
async function getInit() {
  const req = {
    searchVal,
    limitVal,
    offsetVal,
  };
  const rowPage = await getRowPage1(req);
  const response = rowPage.response;
  const status = rowPage.status;
  if (status) {
    const { totalPage, totalRow } = response;
    if (totalRow >= 1) {
      await getPage(req);
      handlePagination(totalPage);
      $("div#product-refpersediaan-pagination").removeClass("d-none");
    }
    if (totalRow < 1) {
      uiCardEmpty(searchVal);
      $("div#product-refpersediaan-pagination").addClass("d-none");
    }
  }
  if (!status) {
    console.error(response);
  }
}
async function getPage(req) {
  const stock = await getGroupProduct(req);
  const response = stock.response;
  const status = stock.status;
  if (status) {
    uiCard(response);
    // update qty to card menu as well as btn plus/min triggered
    uiQty();
    // update list cart menu as well as btn plus/min triggered
    list();
    // update active page
    uiBtnPageActive1(req.offsetVal);
  }
  if (!status) {
    console.error(response);
  }
}
function handlePagination(totalPage) {
  // insert to html
  uiBtnPage1(totalPage);
  // first page
  $("button#product-ref-persediaan-first-page")
    .off("click")
    .on("click", async function () {
      const req = {
        searchVal,
        limitVal: 3,
        offsetVal: 1,
      };
      await getPage(req);
    });
  // prev page
  $("button#product-ref-persediaan-prev-page")
    .off("click")
    .on("click", async function () {
      let pageActive = parseInt(
        $("button.product-ref-persediaan-page-active").text().trim()
      );
      let decrement = pageActive - 1;
      if (decrement < 1) {
        decrement = totalPage;
      }
      const req = {
        searchVal,
        limitVal: 3,
        offsetVal: decrement,
      };
      await getPage(req);
    });
  // by click
  $("div#product-ref-persediaan-page-number")
    .off("click", ".product-ref-persediaan-page")
    .on("click", ".product-ref-persediaan-page", async function () {
      const pageNumber = parseInt(this.textContent.trim());
      const req = {
        searchVal,
        limitVal: 3,
        offsetVal: pageNumber,
      };
      await getPage(req);
    });
  // next page
  $("button#product-ref-persediaan-next-page")
    .off("click")
    .on("click", async function () {
      let pageActive = parseInt(
        $(".product-ref-persediaan-page-active").text().trim()
      );
      let increment = pageActive + 1;
      if (increment > totalPage) {
        increment = 1;
      }
      const req = {
        searchVal,
        limitVal: 3,
        offsetVal: increment,
      };
      await getPage(req);
    });
  // last page
  $("button#product-ref-persediaan-last-page")
    .off("click")
    .on("click", async function () {
      const req = {
        searchVal,
        limitVal: 3,
        offsetVal: totalPage,
      };
      await getPage(req);
    });
}
// get product again
export const getGroupProductAgain = async () => {
  $("input#order-search").val("");
  let searchVal = $("input#order-search").val();
  let limitVal = 3;
  let offsetVal = 1;
  await getInit();
  async function getInit() {
    const req = {
      searchVal,
      limitVal,
      offsetVal,
    };
    const rowPage = await getRowPage1(req);
    const response = rowPage.response;
    const status = rowPage.status;
    if (status) {
      const { totalPage, totalRow } = response;
      if (totalRow >= 1) {
        await getPage(req);
        handlePagination(totalPage);
        $("div#product-refpersediaan-pagination").removeClass("d-none");
      }
      if (totalRow < 1) {
        uiCardEmpty(req.searchVal);
        $("div#product-refpersediaan-pagination").addClass("d-none");
      }
    }
    if (!status) {
      console.error(response);
    }
  }
  async function getPage(req) {
    const stock = await getGroupProduct(req);
    const response = stock.response;
    const status = stock.status;
    if (status) {
      uiCard(response);
      // update qty to card menu as well as btn plus/min triggered
      uiQty();
      // update list cart menu as well as btn plus/min triggered
      list();
      // update active page
      uiBtnPageActive1(req.offsetVal);
    }
    if (!status) {
      console.error(response);
    }
  }
  function handlePagination(totalPage) {
    // insert to html
    uiBtnPage1(totalPage);
    // first page
    $("button#product-ref-persediaan-first-page")
      .off("click")
      .on("click", async function () {
        const req = {
          searchVal,
          limitVal: 3,
          offsetVal: 1,
        };
        await getPage(req);
      });
    // prev page
    $("button#product-ref-persediaan-prev-page")
      .off("click")
      .on("click", async function () {
        let pageActive = parseInt(
          $("button.product-ref-persediaan-page-active").text().trim()
        );
        let decrement = pageActive - 1;
        if (decrement < 1) {
          decrement = totalPage;
        }
        const req = {
          searchVal,
          limitVal: 3,
          offsetVal: decrement,
        };
        await getPage(req);
      });
    // by click
    $("div#product-ref-persediaan-page-number")
      .off("click", ".product-ref-persediaan-page")
      .on("click", ".product-ref-persediaan-page", async function () {
        const pageNumber = parseInt(this.textContent.trim());
        const req = {
          searchVal,
          limitVal: 3,
          offsetVal: pageNumber,
        };
        await getPage(req);
      });
    // next page
    $("button#product-ref-persediaan-next-page")
      .off("click")
      .on("click", async function () {
        let pageActive = parseInt(
          $(".product-ref-persediaan-page-active").text().trim()
        );
        let increment = pageActive + 1;
        if (increment > totalPage) {
          increment = 1;
        }
        const req = {
          searchVal,
          limitVal: 3,
          offsetVal: increment,
        };
        await getPage(req);
      });
    // last page
    $("button#product-ref-persediaan-last-page")
      .off("click")
      .on("click", async function () {
        const req = {
          searchVal,
          limitVal: 3,
          offsetVal: totalPage,
        };
        await getPage(req);
      });
  }
};
