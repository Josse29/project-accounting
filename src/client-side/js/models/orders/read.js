import {
  getPersediaanProductGroup1,
  getPersediaanTotalRow1,
} from "../../../../serverless-side/functions/persediaan.js";
import { listCart, updateQty } from "./cart.js";
import { uiActivePage, uiBtnPage, uiMenu } from "./ui.js";
$(document).ready(function () {
  let searchVal = $("input#order-search").val();
  let limitVal = 3;
  let offsetVal = 1;
  getInit("");
  // searching
  $("input#order-search")
    .off("keyup")
    .on("keyup", function () {
      const orderSearch = $(this).val();
      getInit(orderSearch);
    });
  // get total row and page
  async function getInit(searchVal) {
    try {
      const req = {
        searchVal,
        limitVal,
        offsetVal,
      };
      const response = await getPersediaanTotalRow1(req);
      const totalPage = response.totalPage;
      const totalRow = response.totalRow;
      if (totalRow >= 1) {
        await getPage(req);
        handlePagination(totalPage);
        $("div#product-refpersediaan-pagination").removeClass("d-none");
      }
      if (totalRow < 1) {
        let search = `product empty...`;
        if (searchVal !== "") {
          search = `${searchVal} - not found...`;
        }
        const notFound = `<p class="d-block w-100 fs-4 fst-italic">${search}</p>`;
        $("div#product-refpersediaan-read").html(notFound);
        $("div#product-refpersediaan-pagination").addClass("d-none");
      }
    } catch (error) {
      console.error(error);
    }
  }
  // get by page
  async function getPage(req) {
    try {
      const response = await getPersediaanProductGroup1(req);
      let menu = ``;
      response.forEach((rows) => {
        menu += uiMenu(rows);
      });
      $("div#product-refpersediaan-read").html(menu);
      // update qty to card menu and save to storage
      updateQty();
      // update qty to list cart and save to storage
      listCart();
      // update active page
      uiActivePage(req.offsetVal);
    } catch (error) {
      console.error(error);
    }
  }
  // loop and inserthtml pagination
  function handlePagination(totalPage) {
    // insert to html
    let btn = ``;
    for (let i = 1; i <= totalPage; i++) {
      btn += uiBtnPage(i);
    }
    $("div#product-ref-persediaan-page-number").html(btn);
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
});
export const getProductAgain = () => {
  $(document).ready(function () {
    getInit("");
    $("input#order-search")
      .off("keyup")
      .on("keyup", function () {
        const orderSearch = $(this).val();
        getInit(orderSearch);
      });
    // get total row and page
    function getInit(searchVal) {
      getPersediaanTotalRow1(searchVal, (status, response) => {
        if (status) {
          const totalProduct = response.totalProduct;
          if (totalProduct >= 1) {
            const orderLimit = 3;
            let orderPage = 1;
            const totalPage = response.totalPage;
            $("div#order-pagination-section").removeClass("d-none");
            $("div#product-reforder-card").removeClass("d-none");
            $("div#product-reforder-empty").addClass("d-none");
            getPage(searchVal, orderLimit, orderPage);
            pageButton(totalPage);
            handlePage(searchVal);
          }
          if (totalProduct < 1) {
            $("div#order-pagination-section").addClass("d-none");
            $("div#product-reforder-card").addClass("d-none");
            $("div#product-reforder-empty").removeClass("d-none");
            // with searching
            if (searchVal !== "") {
              const notFound = `<p class="d-block w-100 fs-4 fst-italic text-center"><span class='fw-bold text-capitalize'>${searchVal}</span> not found....</p>`;
              $("div#product-reforder-empty").html(notFound);
            }
            // without searching
            if (searchVal === "") {
              const empty = `<div class="d-block w-100 fs-4 fst-italic text-center">Product empty....</div>`;
              $("div#product-reforder-empty").html(empty);
            }
          }
        }
        if (!status) {
          console.error(response);
        }
      });
    }
    // loop and inserthtml pagination
    function pageButton(totalPage) {
      let btn = ``;
      for (let i = 1; i <= totalPage; i++) {
        btn += uiBtnPage(i);
      }
      $("div#order-page-number").html(btn);
    }
    function handlePage(searchVal) {
      const btnPage = $("button.order-page");
      const totalPage = parseInt(btnPage.length);
      // first page
      $("button#order-first-page")
        .off("click")
        .on("click", function () {
          getPage(searchVal, 3, 1);
          activePage(1);
        });
      // prev page
      $("button#order-prev-page")
        .off("click")
        .on("click", function () {
          let pageActive = parseInt(
            $("button.order-page-active").text().trim()
          );
          let decrement = pageActive - 1;
          if (decrement < 1) {
            decrement = totalPage;
          }
          getPage(searchVal, 3, decrement);
          activePage(decrement);
        });
      // by click
      for (let i = 0; i < totalPage; i++) {
        $(btnPage)
          .eq(i)
          .off("click")
          .on("click", function () {
            const pageNumber = parseInt(this.textContent.trim());
            getPage(searchVal, 3, pageNumber);
            activePage(pageNumber);
          });
      }
      // next page
      $("button#order-next-page")
        .off("click")
        .on("click", function () {
          let pageActive = parseInt(
            $("button.order-page-active").text().trim()
          );
          let increment = pageActive + 1;
          if (increment > totalPage) {
            increment = 1;
          }
          getPage(searchVal, 3, increment);
          activePage(increment);
        });
      // last page
      $("button#order-last-page")
        .off("click")
        .on("click", function () {
          getPage(searchVal, 3, totalPage);
          activePage(totalPage);
        });
    }
    function activePage(pageNumber) {
      const btnPage = $("button.order-page");
      btnPage.removeClass("order-page-active");
      btnPage.eq(pageNumber - 1).addClass("order-page-active");
    }
    // get by page
    function getPage(search, limit, page) {
      getPersediaanProductGroup1(search, limit, page, (status, response) => {
        if (status) {
          let menu = ``;
          response.forEach((rows) => {
            menu += uiMenu(rows);
          });
          $("div#product-reforder-card").html(menu);
          // update qty to card menu and save to storage
          updateQty();
          // update qty to list cart and save to storage
          listCart();
        }
        if (!status) {
          console.error(response);
        }
      });
    }
  });
};
