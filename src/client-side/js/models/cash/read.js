import {
  readCash,
  readInitCash,
  sumCash,
} from "../../../../serverless-side/functions/cash.js";
import { formatRupiah2 } from "../../utils/formatRupiah.js";
import { uiTbody, uiTbodyEmpty } from "./ui.js";

$(document).ready(function () {
  let searchVal = $("input#cash-read-search").val();
  let limitVal = $("select#cash-read-limit").val();
  let offsetVal = 1;
  getInit();
  $("input#cash-read-search")
    .off("keyup")
    .on("keyup", function () {
      searchVal = $(this).val();
      getInit();
    });
  function getInit() {
    sumCash((status, response) => {
      if (status) {
        const rupiah = formatRupiah2(response);
        $("span#cash_sum").text(rupiah);
      }
      if (!status) {
        console.error(response);
      }
    });
    const req = {
      searchVal,
      limitVal: parseInt(limitVal),
      offsetVal: parseInt(offsetVal),
    };
    readInitCash(req, (status, response) => {
      if (status) {
        const totalPage = parseInt(response.totalPage);
        const totalRow = parseInt(response.totalRow);
        if (totalRow >= 1) {
          getCashPage(req);
          handlePagination(totalPage);
        }
        if (totalRow < 1) {
          $("tbody#cash").html(uiTbodyEmpty(searchVal));
          $("div#cash-pagination-container").addClass("d-none");
        }
      }
      if (!status) {
        console.error(response);
      }
    });
    // action to get page
    function getCashPage(req) {
      readCash(req, (status, response) => {
        if (status) {
          let tbody = ``;
          response.forEach((rows) => {
            tbody += uiTbody(rows);
          });
          $("tbody#cash").html(tbody);
          //   <tbody id="cash"></tbody>
        }
        if (!status) {
          console.log(response);
        }
      });
    }
    // for pagination
    function handlePagination(totalPage) {
      $("div#cash-pagination-container").removeClass("d-none");
      let btn = ``;
      for (let i = 1; i <= totalPage; i++) {
        btn += `<button 
                  type="button" 
                  class="btn border border-2 
                        fs-6 cash-page-number
                        ${i === 1 && "cash-page-active"}">
                  ${i}
                </button>`;
      }
      $("div#cash-pagination-container").html(btn);
      // event pagination
      const btnCashPage = $("button.cash-page-number");
      // first Page
      $("button#cash-first-page")
        .off("click")
        .on("click", function () {
          const req = {
            searchVal,
            limitVal: parseInt(limitVal),
            offsetVal: 1,
          };
          getCashPage(req);
          btnCashPage.removeClass("cash-page-active");
          btnCashPage.eq(1 - 1).addClass("cash-page-active");
        });
      // prev page
      $("button#cash-prev-page")
        .off("click")
        .on("click", function () {
          let pageActive = parseInt($("button.cash-page-active").text().trim());
          let decrement = pageActive - 1;
          if (decrement < 1) {
            decrement = totalPage;
          }
          const req = {
            searchVal,
            limitVal: parseInt(limitVal),
            offsetVal: decrement,
          };
          getCashPage(req);
          btnCashPage.removeClass("cash-page-active");
          btnCashPage.eq(decrement - 1).addClass("cash-page-active");
        });
      // by number
      $("div#cash-pagination-container")
        .off("click", "button.cash-page-number")
        .on("click", "button.cash-page-number", function () {
          const pageNumber = parseInt(this.textContent.trim());
          const req = {
            searchVal,
            limitVal: parseInt(limitVal),
            offsetVal: pageNumber,
          };
          getCashPage(req);
          btnCashPage.removeClass("cash-page-active");
          btnCashPage.eq(pageNumber - 1).addClass("cash-page-active");
        });
      // next page
      $("button#cash-next-page")
        .off("click")
        .on("click", function () {
          let pageActive = parseInt($("button.cash-page-active").text().trim());
          let increment = pageActive + 1;
          if (increment > totalPage) {
            increment = 1;
          }
          const req = {
            searchVal,
            limitVal: parseInt(limitVal),
            offsetVal: increment,
          };
          getCashPage(req);
          btnCashPage.removeClass("cash-page-active");
          btnCashPage.eq(increment - 1).addClass("cash-page-active");
        });
      $("button#cash-last-page")
        .off("click")
        .on("click", function () {
          const req = {
            searchVal,
            limitVal: parseInt(limitVal),
            offsetVal: totalPage,
          };
          getCashPage(req);
          btnCashPage.removeClass("cash-page-active");
          btnCashPage.eq(totalPage - 1).addClass("cash-page-active");
        });
    }
  }
});
export const getCash1 = () => {
  let searchVal = $("input#cash-read-search").val();
  let limitVal = $("select#cash-read-limit").val();
  let offsetVal = 1;
  getInit();
  $("input#cash-read-search")
    .off("keyup")
    .on("keyup", function () {
      searchVal = $(this).val();
      getInit();
    });
  async function getInit() {
    try {
      const sumResponse = await sumCashAsync();
      const rupiah = formatRupiah2(sumResponse);
      $("span#cash_sum").text(rupiah);
      const req = {
        searchVal,
        limitVal: parseInt(limitVal),
        offsetVal: parseInt(offsetVal),
      };
      const readResponse = await readInitCashAsync(req);
      const totalPage = parseInt(readResponse.totalPage);
      const totalRow = parseInt(readResponse.totalRow);
      if (totalRow >= 1) {
        await getCashPage(req);
        handlePagination(totalPage);
      } else {
        $("tbody#cash").html(uiTbodyEmpty(searchVal));
        $("div#cash-pagination-container").addClass("d-none");
      }
    } catch (error) {
      console.error(error);
    }
  }
  async function getCashPage(req) {
    try {
      const response = await readCashAsync(req);
      let tbody = ``;
      response.forEach((rows) => {
        tbody += uiTbody(rows);
      });
      $("tbody#cash").html(tbody);
    } catch (error) {
      console.error(error);
    }
  }
  function handlePagination(totalPage) {
    $("div#cash-pagination-container").removeClass("d-none");
    let btn = ``;
    for (let i = 1; i <= totalPage; i++) {
      btn += `<button 
              type="button" 
              class="btn border border-2 
                    fs-6 cash-page-number
                    ${i === 1 && "cash-page-active"}">
              ${i}
            </button>`;
    }
    $("div#cash-pagination-container").html(btn);
    const btnCashPage = $("button.cash-page-number");
    $("button#cash-first-page")
      .off("click")
      .on("click", async function () {
        const req = {
          searchVal,
          limitVal: parseInt(limitVal),
          offsetVal: 1,
        };
        await getCashPage(req);
        btnCashPage.removeClass("cash-page-active");
        btnCashPage.eq(1 - 1).addClass("cash-page-active");
      });

    $("button#cash-prev-page")
      .off("click")
      .on("click", async function () {
        let pageActive = parseInt($("button.cash-page-active").text().trim());
        let decrement = pageActive - 1;
        if (decrement < 1) {
          decrement = totalPage;
        }
        const req = {
          searchVal,
          limitVal: parseInt(limitVal),
          offsetVal: decrement,
        };
        await getCashPage(req);
        btnCashPage.removeClass("cash-page-active");
        btnCashPage.eq(decrement - 1).addClass("cash-page-active");
      });
    $("div#cash-pagination-container")
      .off("click", "button.cash-page-number")
      .on("click", "button.cash-page-number", async function () {
        const pageNumber = parseInt(this.textContent.trim());
        const req = {
          searchVal,
          limitVal: parseInt(limitVal),
          offsetVal: pageNumber,
        };
        await getCashPage(req);
        btnCashPage.removeClass("cash-page-active");
        btnCashPage.eq(pageNumber - 1).addClass("cash-page-active");
      });

    $("button#cash-next-page")
      .off("click")
      .on("click", async function () {
        let pageActive = parseInt($("button.cash-page-active").text().trim());
        let increment = pageActive + 1;
        if (increment > totalPage) {
          increment = 1;
        }
        const req = {
          searchVal,
          limitVal: parseInt(limitVal),
          offsetVal: increment,
        };
        await getCashPage(req);
        btnCashPage.removeClass("cash-page-active");
        btnCashPage.eq(increment - 1).addClass("cash-page-active");
      });

    $("button#cash-last-page")
      .off("click")
      .on("click", async function () {
        const req = {
          searchVal,
          limitVal: parseInt(limitVal),
          offsetVal: totalPage,
        };
        await getCashPage(req);
        btnCashPage.removeClass("cash-page-active");
        btnCashPage.eq(totalPage - 1).addClass("cash-page-active");
      });
  }
  // Wrapping the callbacks into promises for async/await usage
  function sumCashAsync() {
    return new Promise((resolve, reject) => {
      sumCash((status, response) => {
        if (status) resolve(response);
        else reject(response);
      });
    });
  }
  function readInitCashAsync(req) {
    return new Promise((resolve, reject) => {
      readInitCash(req, (status, response) => {
        if (status) resolve(response);
        else reject(response);
      });
    });
  }
  function readCashAsync(req) {
    return new Promise((resolve, reject) => {
      readCash(req, (status, response) => {
        if (status) resolve(response);
        else reject(response);
      });
    });
  }
};
