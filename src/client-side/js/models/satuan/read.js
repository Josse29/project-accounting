import {
  getSatuan,
  getTotalPageSatuan,
  getTotalRowSatuan,
} from "../../../../serverless-side/functions/satuan.js";
import {
  btnSatuanPage,
  trSatuan,
  uiActivePageButton,
  uiTrZero,
  uiTrZeroSearch,
} from "./ui.js";
import { reinitializeTooltips } from "../../utils/updateUi.js";
$(document).ready(function () {
  let satuanSearch = $("input#satuan-search").val();
  let satuanLimit = $("#satuan-limit").val();
  let satuanTotalRow;
  let satuanTotalPage;
  let satuanBtnPage;
  getInit();
  $("input#satuan-search").on("keyup", function () {
    satuanSearch = $(this).val();
    getInit(satuanSearch);
  });
  $("#satuan-limit").on("change", function () {
    satuanLimit = parseInt($(this).val());
    getInit();
  });
  // 1. get first,  get total row, upadate ui (total row) as condition
  function getInit() {
    getTotalRowSatuan(satuanSearch, (status, response) => {
      if (status) {
        satuanTotalRow = response;
        $("#satuan-total-row").text(satuanTotalRow);
        if (satuanTotalRow >= 1) {
          getTotalPage();
          $("#satuan-pagination").removeClass("d-none");
        }
        if (satuanTotalRow < 1) {
          if (satuanSearch) {
            $("#satuan-data").html(uiTrZeroSearch(satuanSearch));
          } else {
            $("#satuan-data").html(uiTrZero);
          }
          $("#satuan-pagination").addClass("d-none");
        }
      }
      if (!status) {
        console.error(response);
      }
    });
  }
  // 2. get total page, update ui (total row)
  function getTotalPage() {
    getTotalPageSatuan(satuanSearch, satuanLimit, (status, response) => {
      if (status) {
        satuanTotalPage = response;
        uiPagination(satuanTotalPage);
      }
      if (!status) {
        console.error(response);
      }
    });
  }
  // 3. Function to insert html pagination
  function uiPagination(totalPage) {
    let uiBtnPaginate = "";
    satuanTotalPage = totalPage;
    for (let i = 1; i <= satuanTotalPage; i++) {
      uiBtnPaginate += btnSatuanPage(i);
    }
    $("#satuan-number-page").html(uiBtnPaginate);
    handlePagination(satuanTotalPage);
  }
  // 4. function to handle pagination(first,prev,number,next,last)
  function handlePagination(satuanTotalPage) {
    // Event listeners for pagination buttons
    satuanBtnPage = document.getElementsByClassName("satuan-btn-page");
    // first page
    $("#satuan-first-page")
      .off("click")
      .on("click", () => {
        getSatuanPage(1);
      });
    // previous page
    $("#satuan-prev-page")
      .off("click")
      .on("click", () => {
        let pageActive = parseInt($(".satuan-active-page").text().trim());
        let decrementPage = pageActive - 1;
        if (decrementPage < 1) {
          decrementPage = satuanTotalPage;
        }
        getSatuanPage(decrementPage);
      });
    // based on number when clicked
    for (let i = 0; i < satuanTotalPage; i++) {
      satuanBtnPage[i].addEventListener("click", function () {
        const pageNumber = parseInt(this.textContent.trim());
        getSatuanPage(pageNumber);
      });
    }
    // next page
    $("#satuan-next-page")
      .off("click")
      .on("click", () => {
        let pageActive = parseInt($(".satuan-active-page").text().trim());
        let incrementPage = pageActive + 1;
        if (incrementPage > satuanTotalPage) {
          incrementPage = 1;
        }
        getSatuanPage(incrementPage);
      });
    // last page
    $("#satuan-last-page")
      .off("click")
      .on("click", () => getSatuanPage(satuanTotalPage));
    // default active page first
    getSatuanPage(1);
  }
  // 5. function to handle get satuan based on pageActive
  function getSatuanPage(satuanPageActive) {
    // get all satuan
    getSatuan(
      satuanSearch,
      satuanLimit,
      satuanPageActive,
      (status, response) => {
        if (status) {
          let tr = ``;
          response.forEach((element) => {
            tr += trSatuan(element);
          });
          $("#satuan-data").html(tr);
          uiActivePageButton(satuanPageActive, satuanBtnPage);
          reinitializeTooltips();
        }
        if (!status) {
          console.error(response);
        }
      }
    );
  }
  // get-detail-satuan | get id satuan
  $(document).on("click", "#satuanDetail", function () {
    const satuan = this.dataset;
    $("#detailSatuanModalLabel").text(satuan.satuanname);
    $("#detail-satuan-name").text(satuan.satuanname);
    $("#detail-satuan-keterangan").text(satuan.satuaninfo);
  });
});

export const getSatuanAgain = () => {
  let satuanSearch = $("input#satuan-search").val();
  let satuanLimit = $("#satuan-limit").val();
  let satuanTotalRow;
  let satuanTotalPage;
  let satuanBtnPage;
  getInit();
  $("input#satuan-search").on("keyup", function () {
    satuanSearch = $(this).val();
    getInit(satuanSearch);
  });
  $("#satuan-limit").on("change", function () {
    satuanLimit = parseInt($(this).val());
    getInit();
  });
  // 1. get first,  get total row, upadate ui (total row) as condition
  function getInit() {
    getTotalRowSatuan(satuanSearch, (status, response) => {
      if (status) {
        satuanTotalRow = response;
        $("#satuan-total-row").text(satuanTotalRow);
        if (satuanTotalRow >= 1) {
          getTotalPage();
          $("#satuan-pagination").removeClass("d-none");
        }
        if (satuanTotalRow < 1) {
          if (satuanSearch) {
            $("#satuan-data").html(uiTrZeroSearch(satuanSearch));
          } else {
            $("#satuan-data").html(uiTrZero);
          }
          $("#satuan-pagination").addClass("d-none");
        }
      }
      if (!status) {
        console.error(response);
      }
    });
  }
  // 2. get total page, update ui (total row)
  function getTotalPage() {
    getTotalPageSatuan(satuanSearch, satuanLimit, (status, response) => {
      if (status) {
        satuanTotalPage = response;
        uiPagination(satuanTotalPage);
      }
      if (!status) {
        console.error(response);
      }
    });
  }
  // 3. Function to insert html pagination
  function uiPagination(totalPage) {
    let uiBtnPaginate = "";
    satuanTotalPage = totalPage;
    for (let i = 1; i <= satuanTotalPage; i++) {
      uiBtnPaginate += btnSatuanPage(i);
    }
    $("#satuan-number-page").html(uiBtnPaginate);
    handlePagination(satuanTotalPage);
  }
  // 4. function to handle pagination(first,prev,number,next,last)
  function handlePagination(satuanTotalPage) {
    // Event listeners for pagination buttons
    satuanBtnPage = document.getElementsByClassName("satuan-btn-page");
    // first page
    $("#satuan-first-page")
      .off("click")
      .on("click", () => {
        getSatuanPage(1);
      });
    // previous page
    $("#satuan-prev-page")
      .off("click")
      .on("click", () => {
        let pageActive = parseInt($(".satuan-active-page").text().trim());
        let decrementPage = pageActive - 1;
        if (decrementPage < 1) {
          decrementPage = satuanTotalPage;
        }
        getSatuanPage(decrementPage);
      });
    // based on number when clicked
    for (let i = 0; i < satuanTotalPage; i++) {
      satuanBtnPage[i].addEventListener("click", function () {
        const pageNumber = parseInt(this.textContent.trim());
        getSatuanPage(pageNumber);
      });
    }
    // next page
    $("#satuan-next-page")
      .off("click")
      .on("click", () => {
        let pageActive = parseInt($(".satuan-active-page").text().trim());
        let incrementPage = pageActive + 1;
        if (incrementPage > satuanTotalPage) {
          incrementPage = 1;
        }
        getSatuanPage(incrementPage);
      });
    // last page
    $("#satuan-last-page")
      .off("click")
      .on("click", () => getSatuanPage(satuanTotalPage));
    // default active page first
    getSatuanPage(1);
  }
  // 5. function to handle get satuan based on pageActive
  function getSatuanPage(satuanPageActive) {
    // get all satuan
    getSatuan(
      satuanSearch,
      satuanLimit,
      satuanPageActive,
      (status, response) => {
        if (status) {
          let tr = ``;
          response.forEach((element) => {
            tr += trSatuan(element);
          });
          $("#satuan-data").html(tr);
          uiActivePageButton(satuanPageActive, satuanBtnPage);
          reinitializeTooltips();
        }
        if (!status) {
          console.error(response);
        }
      }
    );
  }
};
