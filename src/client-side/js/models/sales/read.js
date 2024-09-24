import {
  getSalesRowPage,
  getSalesSum,
  readSales,
} from "../../../../serverless-side/functions/sales.js";
import { formatRupiah2 } from "../../utils/formatRupiah.js";
import { listProductRefSalesRead } from "../products/list.js";
import { uiBtnPage, uiPageActive, uiTable, uiTableEmpty } from "./ui.js";
import { listUserRefSalesRead } from "./../users/list.js";
$(document).ready(function () {
  let searchVal = $("input#sales-read-search").val();
  let limitVal = parseInt($("select#sales-read-limit").val());
  let offsetVal = 1;
  getInit();
  // limit
  $("select#sales-read-limit")
    .off("change")
    .on("change", function () {
      limitVal = parseInt($(this).val());
      getInit();
    });
  // search
  $("input#sales-read-search")
    .off("keyup")
    .on("keyup", function () {
      searchVal = $(this).val();
      getInit();
    });
  $("span#sales-search")
    .off("click")
    .on("click", function () {
      getInit();
    });
  // reset
  $("button#sales-read-reset")
    .off("click")
    .on("click", function () {
      getInit();
    });
  async function getInit() {
    try {
      const req = {
        searchVal,
        limitVal,
        offsetVal,
      };
      // total sum
      const totalSales = await getSalesSum();
      const currency = formatRupiah2(totalSales);
      $("div#sales-total-sum").text(currency);
      // row page
      const init = await getSalesRowPage(req);
      const totalPage = init.totalPage;
      const totalRow = init.totalRow;
      if (totalRow >= 1) {
        await getPage(req);
        handlePagination(totalPage);
        $("div#sales-page-container").removeClass("d-none");
      }
      if (totalRow < 1) {
        const empty = uiTableEmpty(searchVal);
        $("tbody#sales-read-table").html(empty);
        $("div#sales-page-container").addClass("d-none");
      }
      listProductRefSalesRead();
      listUserRefSalesRead();
      return;
      getSalesRowPage(req, (status, response) => {
        if (status) {
          if (totalSales >= 1) {
            getPage(req);
            pageButton(totalPage);
            handlePage();
            $("div#sales-page-container").removeClass("d-none");
          }
          if (totalSales < 1) {
          }
        }
        if (!status) {
          console.error(response);
        }
      });
      $("div#summary").html(``);
      $("div#sales-byDate").addClass("d-none");
      $("div#sales-limit-search").removeClass("d-none");
      $("div#sales-date").removeClass("d-none");
      $("div#read-select-container").removeClass("d-none");
      $("select#sales-read-productid").val("Choose One Of Products");
      $("select#sales-read-personid").val("Choose One Of Sales");
      $("select#sales-read-customerid").val("Choose One Of Customers");
    } catch (error) {
      console.error(error);
    }
  }
  function handlePagination(totalPage) {
    let btn = ``;
    for (let i = 1; i <= totalPage; i++) {
      btn += uiBtnPage(i);
    }
    $("div#sales-read-numberpage").html(btn);
    // first page
    $("button#sales-read-firstpage")
      .off("click")
      .on("click", async () => {
        const req = {
          searchVal,
          limitVal,
          offsetVal: 1,
        };
        await getPage(req);
      });
    // prev page
    $("button#sales-read-prevpage")
      .off("click")
      .on("click", async () => {
        let pageActive = parseInt($("button.sales-active-page").text().trim());
        let decrement = pageActive - 1;
        if (decrement < 1) {
          decrement = totalPage;
        }
        const req = {
          searchVal,
          limitVal,
          offsetVal: decrement,
        };
        await getPage(req);
      });
    // by click
    $("div#sales-read-numberpage")
      .off("click", "button.sales-page")
      .on("click", "button.sales-page", async function () {
        const pageNumber = parseInt(this.textContent.trim());
        const req = {
          searchVal,
          limitVal,
          offsetVal: pageNumber,
        };
        await getPage(req);
      });
    // next page
    $("button#sales-read-nextpage")
      .off("click")
      .on("click", async function () {
        let pageActive = parseInt($("button.sales-active-page").text().trim());
        let increment = pageActive + 1;
        if (increment > totalPage) {
          increment = 1;
        }
        const req = {
          searchVal,
          limitVal,
          offsetVal: increment,
        };
        await getPage(req);
      });
    // last page
    $("button#sales-read-lastpage")
      .off("click")
      .on("click", async function () {
        const req = {
          searchVal,
          limitVal,
          offsetVal: totalPage,
        };
        await getPage(req);
      });
  }
  async function getPage(req) {
    try {
      const response = await readSales(req);
      let table = ``;
      response.forEach((rows) => {
        table += uiTable(rows);
      });
      $("tbody#sales-read-table").html(table);
      uiPageActive(req.offsetVal);
    } catch (error) {
      console.error(error);
    }
  }
});

export const getSalesAgain = () => {
  $(document).ready(function () {
    let searchVal = $("input#sales-read-search").val();
    let limitVal = parseInt($("select#sales-read-limit").val());
    let offsetVal = 1;
    getInit();
    $("select#sales-read-limit")
      .off("change")
      .on("change", function () {
        limitVal = parseInt($(this).val());
        getInit();
      });
    $("input#sales-read-search")
      .off("keyup")
      .on("keyup", function () {
        searchVal = $(this).val();
        getInit();
      });
    $("span#sales-search")
      .off("click")
      .on("click", function () {
        getInit();
      });
    $("button#sales-read-reset")
      .off("click")
      .on("click", function () {
        getInit();
      });
    function getInit() {
      $("div#summary").html(``);
      $("div#sales-byDate").addClass("d-none");
      $("div#sales-limit-search").removeClass("d-none");
      $("div#sales-date").removeClass("d-none");
      $("div#read-select-container").removeClass("d-none");
      $("select#sales-read-productid").val("Choose One Of Products");
      $("select#sales-read-personid").val("Choose One Of Sales");
      $("select#sales-read-customerid").val("Choose One Of Customers");
      listProductRefSalesRead();
      listUserRefSalesRead();
      getSalesSum((status, response) => {
        if (status) {
          const currency = formatRupiah2(response);
          $("div#sales-total-sum").text(currency);
        }
        if (!status) {
          console.error(response);
        }
      });
      const req = {
        searchVal,
        limitVal,
        offsetVal,
      };
      getSalesRowPage(req, (status, response) => {
        if (status) {
          const totalPage = response.totalPage;
          const totalSales = response.totalSales;
          if (totalSales >= 1) {
            getPage(req);
            pageButton(totalPage);
            handlePage();
            $("div#sales-page-container").removeClass("d-none");
          }
          if (totalSales < 1) {
            $("div#sales-page-container").addClass("d-none");
            $("div#sales-read-table").html(uiTableEmpty(searchVal));
          }
        }
        if (!status) {
          console.error(response);
        }
      });
    }
    function pageButton(totalPage) {
      let btn = ``;
      for (let i = 1; i <= totalPage; i++) {
        btn += uiBtnPage(i);
      }
      $("div#sales-read-numberpage").html(btn);
    }
    function handlePage() {
      const btnPage = $("button.sales-page");
      const totalPage = parseInt(btnPage.length);
      // first page
      $("button#sales-read-firstpage")
        .off("click")
        .on("click", function () {
          const req = {
            searchVal,
            limitVal,
            offsetVal: 1,
          };
          getPage(req);
          activePage(1);
        });
      // prev page
      $("button#sales-read-prevpage")
        .off("click")
        .on("click", function () {
          let pageActive = parseInt(
            $("button.sales-active-page").text().trim()
          );
          let decrement = pageActive - 1;
          if (decrement < 1) {
            decrement = totalPage;
          }
          const req = {
            searchVal,
            limitVal,
            offsetVal: decrement,
          };
          getPage(req);
          activePage(decrement);
        });
      // by click
      for (let i = 0; i < totalPage; i++) {
        $(btnPage)
          .eq(i)
          .off("click")
          .on("click", function () {
            const pageNumber = parseInt(this.textContent.trim());
            const req = {
              searchVal,
              limitVal,
              offsetVal: pageNumber,
            };
            getPage(req);
            activePage(pageNumber);
          });
      }
      // next page
      $("button#sales-read-nextpage")
        .off("click")
        .on("click", function () {
          let pageActive = parseInt(
            $("button.sales-active-page").text().trim()
          );
          let increment = pageActive + 1;
          if (increment > totalPage) {
            increment = 1;
          }
          const req = {
            searchVal,
            limitVal,
            offsetVal: increment,
          };
          getPage(req);
          activePage(increment);
        });
      // last page
      $("button#sales-read-lastpage")
        .off("click")
        .on("click", function () {
          const req = {
            searchVal,
            limitVal,
            offsetVal: totalPage,
          };
          getPage(req);
          activePage(totalPage);
        });
    }
    function activePage(pageNumber) {
      const btnPage = $("button.sales-page");
      btnPage.removeClass("sales-active-page");
      btnPage.eq(pageNumber - 1).addClass("sales-active-page");
    }
    function getPage(req) {
      readSales(req, (status, response) => {
        if (status) {
          let table = ``;
          let index = 1;
          response.forEach((rows) => {
            table += uiTable(rows, index);
            index++;
          });
          $("div#sales-read-table").html(table);
        }
        if (!status) {
          console.error(response);
        }
      });
    }
  });
};
