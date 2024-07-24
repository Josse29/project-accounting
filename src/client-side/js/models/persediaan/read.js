import {
  uiActivePageButton,
  uiBtnPersediaanPage,
  uiTrPersediaan,
  uiTrZero,
  uiTrZeroSearch,
} from "./ui.js";
import { reinitializeTooltips } from "../../utils/updateUi.js";
import { addSpace } from "../../utils/formatSpace.js";
import { formatRupiah2 } from "../../utils/formatRupiah.js";
import {
  getPersediaan,
  getPersediaanRpSum,
  getPersediaanTotalPage,
  getPersediaanTotalRow,
} from "../../../../serverless-side/functions/persediaan.js";
import { formatWaktuIndo } from "../../utils/formatWaktu.js";
$(document).ready(function () {
  let persediaanSearch = $("input#persediaan-search").val();
  let persediaanLimit = parseInt($("#persediaan-limit").val());
  let persediaanTotalRow;
  let persediaanTotalPage;
  let persediaanBtnPage;
  getInit(persediaanSearch);
  $("#persediaan-sum-section").hide();
  $("button#persediaan-refresh").on("click", function () {
    getInit();
  });
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
    getPersediaanTotalRow(persediaanSearch, (status, response) => {
      if (status) {
        persediaanTotalRow = parseInt(response);
        // existed product
        if (persediaanTotalRow >= 1) {
          getPersediaanRpSum((status, response) => {
            if (status) {
              const totalRupiah = formatRupiah2(response);
              $("#persediaan-detail-totalrp").text(totalRupiah);
            }
            if (!status) {
              console.error(response);
            }
          });
          getTotalPage();
          $("#persediaan-pagination").show();
        }
        // non-existed product
        if (persediaanTotalRow < 1) {
          // with search
          if (persediaanSearch !== "") {
            $("#persediaan-table").html(uiTrZeroSearch(persediaanSearch));
          }
          // without search
          if (persediaanSearch === "") {
            $("#persediaan-table").html(uiTrZero);
          }
          $("#persediaan-pagination").hide();
        }
      }
      if (!status) {
        console.error(response);
      }
    });
  }
  // 2. get total page, update ui (total row)
  function getTotalPage() {
    getPersediaanTotalPage(
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
      uiBtnPaginate += uiBtnPersediaanPage(i);
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
        getPersediaanPage(1);
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
        getPersediaanPage(decrementPage);
      });
    // based on number when clicked
    for (let i = 0; i < persediaanTotalPage; i++) {
      persediaanBtnPage[i].addEventListener("click", function () {
        const pageNumber = parseInt(this.textContent.trim());
        getPersediaanPage(pageNumber);
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
        getPersediaanPage(incrementPage);
      });
    // last page
    $("#persediaan-last-page")
      .off("click")
      .on("click", () => getPersediaanPage(persediaanTotalPage));
    // get init
    getPersediaanPage(1);
  }
  // 5. function to handle get satuan based on pageActive
  function getPersediaanPage(persediaanActivePage) {
    getPersediaan(
      persediaanSearch,
      persediaanLimit,
      persediaanActivePage,
      (status, response) => {
        if (status) {
          let tr = "";
          response.forEach((element) => {
            tr += uiTrPersediaan(element);
          });
          $("#persediaan-table").html(tr);
          uiActivePageButton(persediaanActivePage, persediaanBtnPage);
          reinitializeTooltips();
        }
        if (!status) {
          console.error(response);
        }
      }
    );
    getDetail();
  }
  function getDetail() {
    $(document).on("click", "#persediaanDetail", function () {
      const persediaan = this.dataset;
      $("#persediaan-detail-productname").text(persediaan.productname);
      $("#persediaan-detail-date").text(
        formatWaktuIndo(persediaan.persediaanddmy)
      );
      $("#persediaan-detail-second").text(persediaan.persediaanhms);
      $("#persediaan-detail-info").text(persediaan.persediaaninfo);
      $("#persediaanDetailTitle").text(persediaan.productname);
      let tdProductQty = ``;
      if (persediaan.persediaanqty < 1) {
        tdProductQty = `<span class="badge text-bg-danger">${addSpace(
          persediaan.persediaanqty
        )}</span>`;
      }
      if (persediaan.persediaanqty >= 1) {
        tdProductQty = `<span class="badge text-bg-success">+ ${persediaan.persediaanqty}</span>`;
      }
      $("td#persediaan-detail-productprice").text(
        formatRupiah2(persediaan.productprice)
      );
      $("td#persediaan-detail-productqty").html(tdProductQty);
      const persediaaanRp = persediaan.persediaanprice;
      let txtPersediaanRp = ``;
      if (persediaaanRp < 1) {
        txtPersediaanRp =
          persediaaanRp.substr(0, 1) +
          " " +
          formatRupiah2(persediaaanRp.substr(1));
      }
      if (persediaaanRp >= 1) {
        txtPersediaanRp = formatRupiah2(persediaaanRp);
      }
      $("td#persediaan-detail-rp").text(txtPersediaanRp);
    });
  }
});

export const getPersediaanAgain = () => {
  let persediaanSearch = $("input#persediaan-search").val();
  let persediaanLimit = parseInt($("#persediaan-limit").val());
  let persediaanTotalRow;
  let persediaanTotalPage;
  let persediaanBtnPage;
  getInit(persediaanSearch);
  getPersediaanRpSum((status, response) => {
    if (status) {
      const totalRupiah = formatRupiah2(response);
      $("#persediaan-detail-totalrp").text(totalRupiah);
    }
    if (!status) {
      console.error(response);
    }
  });
  // 1. get first,  get total row, upadate ui (total row) as condition
  function getInit() {
    getPersediaanTotalRow(persediaanSearch, (status, response) => {
      if (status) {
        persediaanTotalRow = parseInt(response);
        if (persediaanTotalRow >= 1) {
          getTotalPage();
          $("#persediaan-pagination").removeClass("d-none");
        }
        if (persediaanTotalRow < 1) {
          if (persediaanSearch) {
            $("#persediaan-table").html(uiTrZeroSearch(persediaanSearch));
          } else {
            $("#persediaan-table").html(uiTrZero);
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
    getPersediaanTotalPage(
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
      uiBtnPaginate += uiBtnPersediaanPage(i);
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
        getPersediaanPage(1);
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
        getPersediaanPage(decrementPage);
      });
    // based on number when clicked
    for (let i = 0; i < persediaanTotalPage; i++) {
      persediaanBtnPage[i].addEventListener("click", function () {
        const pageNumber = parseInt(this.textContent.trim());
        getPersediaanPage(pageNumber);
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
        getPersediaanPage(incrementPage);
      });
    // last page
    $("#persediaan-last-page")
      .off("click")
      .on("click", () => getPersediaanPage(persediaanTotalPage));
    // get init
    getPersediaanPage(1);
  }
  // 5. function to handle get satuan based on pageActive
  function getPersediaanPage(persediaanActivePage) {
    getPersediaan(
      persediaanSearch,
      persediaanLimit,
      persediaanActivePage,
      (status, response) => {
        if (status) {
          let tr = "";
          response.forEach((element) => {
            tr += uiTrPersediaan(element);
          });
          $("#persediaan-table").html(tr);
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
