import {
  uiActivePageButton,
  uiBtnpersediaanPage,
  uiTrPersediaan,
  uiTrZero,
  uiTrZeroSearch,
} from "./ui.js";
import { reinitializeTooltips } from "../../utils/updateUi.js";
import { addSpace } from "../../utils/addSpace.js";
import { formatRupiah2 } from "../../utils/formatRupiah.js";
import { getTotalRowPersediaan } from "../../../../serverless-side/functions/persediaan.js";
$(document).ready(function () {
  let persediaanSearch = $("input#persediaan-search").val();
  let persediaanLimit = parseInt($("#persediaan-limit").val());
  let persediaanTotalRow;
  let persediaanTotalPage;
  let persediaanBtnPage;
  getInit();
  $("input#persediaan-search").on("keyup", function () {
    persediaanSearch = $(this).val();
    getInit(persediaanSearch);
  });
  $("select#persediaan-limit").on("change", function () {
    persediaanLimit = parseInt($(this).val());
    getInit();
  });
  // 1. get first,  get total row, upadate ui (total row) as condition
  function getInit() {
    getTotalRowPersediaan(persediaanSearch, (status, response) => {
      if (status) {
        persediaanTotalRow = parseInt(response);
        if (persediaanTotalRow >= 1) {
          getTotalPage();
          $("#persediaan-pagination").removeClass("d-none");
        }
        if (persediaanTotalRow < 1) {
          if (persediaanSearch) {
            $("#persediaan-data").html(uiTrZeroSearch(persediaanSearch));
          } else {
            $("#persediaan-data").html(uiTrZero);
          }
          $("#persediaan-pagination").addClass("d-none");
        }
      }
      if (!status) {
        console.error(response);
      }
    });
  }
  // 2. get total page, update ui (total row)
  function getTotalPage() {
    getTotalPagepersediaan(
      persediaanSearch,
      persediaanLimit,
      (status, response) => {
        if (status) {
          persediaanTotalPage = parseInt(response);
          uiPagination(persediaanTotalPage);
        }
        if (!status) {
          console.error(response);
        }
      }
    );
  }
  // 3. Function to insert html pagination
  function uiPagination(persediaanTotalPage) {
    let uiBtnPaginate = "";
    for (let i = 1; i <= persediaanTotalPage; i++) {
      uiBtnPaginate += uiBtnpersediaanPage(i);
    }
    $("#persediaan-number-page").html(uiBtnPaginate);
    handlePagination(persediaanTotalPage);
  }
  // 4. function to handle pagination(first,prev,number,next,last)
  function handlePagination(persediaanTotalPage) {
    // Event listeners for pagination buttons
    persediaanBtnPage = document.getElementsByClassName("persediaan-btn-page");
    // first page
    $("#persediaan-first-page")
      .off("click")
      .on("click", () => {
        getpersediaanPage(1);
      });
    // previous page
    $("#persediaan-prev-page")
      .off("click")
      .on("click", () => {
        let pageActive = parseInt($(".persediaan-active-page").text().trim());
        let decrementPage = pageActive - 1;
        if (decrementPage < 1) {
          decrementPage = persediaanTotalPage;
        }
        getpersediaanPage(decrementPage);
      });
    // based on number when clicked
    for (let i = 0; i < persediaanTotalPage; i++) {
      persediaanBtnPage[i].addEventListener("click", function () {
        const pageNumber = parseInt(this.textContent.trim());
        getpersediaanPage(pageNumber);
      });
    }
    // next page
    $("#persediaan-next-page")
      .off("click")
      .on("click", () => {
        let pageActive = parseInt($(".persediaan-active-page").text().trim());
        let incrementPage = pageActive + 1;
        if (incrementPage > persediaanTotalPage) {
          incrementPage = 1;
        }
        getpersediaanPage(incrementPage);
      });
    // last page
    $("#persediaan-last-page")
      .off("click")
      .on("click", () => getpersediaanPage(persediaanTotalPage));
    getpersediaanPage(1);
  }
  // 5. function to handle get satuan based on pageActive
  function getpersediaanPage(persediaanActivePage) {
    getpersediaan(
      persediaanSearch,
      persediaanLimit,
      persediaanActivePage,
      (status, response) => {
        if (status) {
          console.log(response);
          let tr = "";
          response.forEach((element) => {
            tr += uiTrpersediaan(element);
          });
          $("#persediaan-data").html(tr);
          uiActivePageButton(persediaanActivePage, persediaanBtnPage);
          reinitializeTooltips();
        }
        if (!status) {
          console.error(response);
        }
      }
    );
  }
  $(document).on("click", "#persediaanDetail", function () {
    const persediaan = this.dataset;
    $("#persediaan-detail-date").text(persediaan.persediaandate);
    $("#persediaan-detail-second").text(persediaan.persediaansecond);
    $("#persediaan-detail-info").text(persediaan.persediaaninfo);
    $("#persediaanDetailTitle").text(persediaan.productname);
    let divProductNameQty = ``;
    let tdProductQty = ``;
    const addSpaceText = addSpace(persediaan.persediaanqty);
    const productPriceRupiah = formatRupiah2(persediaan.productprice);
    if (persediaan.persediaanqty < 0) {
      divProductNameQty = `<h3>${persediaan.productname}</h3>`;
      tdProductQty = `<span class="badge text-bg-danger">${addSpaceText}</span>`;
    }
    if (persediaan.persediaanqty >= 1) {
      divProductNameQty = `<h3>${persediaan.productname}</h3>`;
      tdProductQty = `<span class="badge text-bg-success">+ ${persediaan.persediaanqty}</span>`;
    }
    $("#persediaan-detail-productname").html(divProductNameQty);
    $("td#persediaan-detail-productname").text(persediaan.productname);
    $("td#persediaan-detail-productprice").text(productPriceRupiah);
    $("td#persediaan-detail-productqty").html(tdProductQty);
  });
});

export const getpersediaanAgain = () => {
  let persediaanSearch = $("input#persediaan-search").val();
  let persediaanLimit = parseInt($("#persediaan-limit").val());
  let persediaanTotalRow;
  let persediaanTotalPage;
  let persediaanBtnPage;
  getInit(persediaanSearch);
  $("input#persediaan-search").on("keyup", function () {
    persediaanSearch = $(this).val();
    getInit(persediaanSearch);
  });
  $("select#persediaan-limit").on("change", function () {
    persediaanLimit = parseInt($(this).val());
    getInit();
  });
  // 1. get first,  get total row, upadate ui (total row) as condition
  function getInit() {
    getTotalRowpersediaan(persediaanSearch, (status, response) => {
      if (status) {
        persediaanTotalRow = parseInt(response);
        if (persediaanTotalRow >= 1) {
          getTotalPage();
          $("#persediaan-pagination").removeClass("d-none");
        }
        if (persediaanTotalRow < 1) {
          if (persediaanSearch) {
            $("#persediaan-data").html(uiTrZeroSearch(persediaanSearch));
          } else {
            $("#persediaan-data").html(uiTrZero);
          }
          $("#persediaan-pagination").addClass("d-none");
        }
      }
      if (!status) {
        console.error(response);
      }
    });
  }
  // 2. get total page, update ui (total row)
  function getTotalPage() {
    getTotalPagepersediaan(
      persediaanSearch,
      persediaanLimit,
      (status, response) => {
        if (status) {
          persediaanTotalPage = parseInt(response);
          uiPagination(persediaanTotalPage);
        }
        if (!status) {
          console.error(response);
        }
      }
    );
  }
  // 3. Function to insert html pagination
  function uiPagination(persediaanTotalPage) {
    let uiBtnPaginate = "";
    for (let i = 1; i <= persediaanTotalPage; i++) {
      uiBtnPaginate += uiBtnpersediaanPage(i);
    }
    $("#persediaan-number-page").html(uiBtnPaginate);
    handlePagination(persediaanTotalPage);
  }
  // 4. function to handle pagination(first,prev,number,next,last)
  function handlePagination(persediaanTotalPage) {
    // Event listeners for pagination buttons
    persediaanBtnPage = document.getElementsByClassName("persediaan-btn-page");
    // first page
    $("#persediaan-first-page")
      .off("click")
      .on("click", () => {
        getpersediaanPage(1);
      });
    // previous page
    $("#persediaan-prev-page")
      .off("click")
      .on("click", () => {
        let pageActive = parseInt($(".persediaan-active-page").text().trim());
        let decrementPage = pageActive - 1;
        if (decrementPage < 1) {
          decrementPage = persediaanTotalPage;
        }
        getpersediaanPage(decrementPage);
      });
    // based on number when clicked
    for (let i = 0; i < persediaanTotalPage; i++) {
      persediaanBtnPage[i].addEventListener("click", function () {
        const pageNumber = parseInt(this.textContent.trim());
        getpersediaanPage(pageNumber);
      });
    }
    // next page
    $("#persediaan-next-page")
      .off("click")
      .on("click", () => {
        let pageActive = parseInt($(".persediaan-active-page").text().trim());
        let incrementPage = pageActive + 1;
        if (incrementPage > persediaanTotalPage) {
          incrementPage = 1;
        }
        getpersediaanPage(incrementPage);
      });
    // last page
    $("#persediaan-last-page")
      .off("click")
      .on("click", () => getpersediaanPage(persediaanTotalPage));
    getpersediaanPage(1);
  }
  // 5. function to handle get satuan based on pageActive
  function getpersediaanPage(persediaanActivePage) {
    getpersediaan(
      persediaanSearch,
      persediaanLimit,
      persediaanActivePage,
      (status, response) => {
        if (status) {
          let tr = "";
          response.forEach((element) => {
            tr += uiTrpersediaan(element);
          });
          $("#persediaan-data").html(tr);
          uiActivePageButton(persediaanActivePage, persediaanBtnPage);
          reinitializeTooltips();
        }
        if (!status) {
          console.error(response);
        }
      }
    );
  }
};
