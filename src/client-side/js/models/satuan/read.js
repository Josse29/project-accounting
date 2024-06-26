import {
  getSatuan,
  getTotalPageSatuan,
  getTotalRowSatuan,
} from "../../../../serverless-side/functions/satuan.js";
import { btnSatuanPage, trSatuan, uiTrZero } from "./ui.js";

$(document).ready(function () {
  let satuanSearch = $("input#satuan-search").val();
  let satuanLimit = $("#satuan-limit").val();
  let satuanTotalRow;
  let satuanTotalPage;
  let satuanBtnPage;
  // $("input#satuan-search").on("keyup", function () {
  //   console.log($("input#satuan-search").val());
  // });
  // 1. get first,  get total row, upadate ui (total row) as condition
  function getInit() {
    getTotalRowSatuan(satuanSearch, (status, response) => {
      if (status) {
        satuanTotalRow = response;
        $("#satuan-total-row").text(satuanTotalRow);
        if (satuanTotalRow >= 1) {
          getPage();
        }
        if (satuanTotalRow < 1) {
          $("#satuan-data").html(uiTrZero);
          $("#satuan-pagination").addClass("d-none");
        }
      }
      if (!status) {
        console.error(response);
      }
    });
  }
  // 2. get total page, update ui (total row)
  function getPage() {
    getTotalPageSatuan(satuanSearch, satuanLimit, (status, response) => {
      if (status) {
        satuanTotalPage = response;
        handlePagination(satuanTotalPage);
      }
      if (!status) {
        console.error(response);
      }
    });
    // get all satuan
    getSatuan((status, response) => {
      if (status) {
        let tr = ``;
        response.forEach((element) => {
          tr += trSatuan(element);
        });
        $("#satuan-data").html(tr);
      }
      if (!status) {
        console.error(response);
      }
    });
  }
  // 3. Function to handle pagination(first,prev,number,next,last) and updateui active pagination
  function handlePagination(response) {
    let uiBtnPaginate = "";
    for (let i = 1; i <= response; i++) {
      uiBtnPaginate += btnSatuanPage(i);
    }
    $("#satuan-number-page").html(uiBtnPaginate);
    // Event listeners for pagination buttons
    satuanBtnPage = document.getElementsByClassName("satuan-btn-page");
    satuanTotalPage = response;
    // // first page
    // $("#supplier-first-page")
    //   .off("click")
    //   .on("click", () => {
    //     getSupplierPage(1);
    //   });
    // // previous page
    // $("#supplier-prev-page")
    //   .off("click")
    //   .on("click", () => {
    //     let pageActive = parseInt($(".supplier-active-page").text().trim());
    //     let decrementPage = pageActive - 1;
    //     if (decrementPage < 1) {
    //       decrementPage = supplierTotalPage;
    //     }
    //     getSupplierPage(decrementPage);
    //   });
    // // based on number when clicked
    // for (let i = 0; i < supplierTotalPage; i++) {
    //   supplierBtnPage[i].addEventListener("click", function () {
    //     const pageNumber = parseInt(this.textContent.trim());
    //     getSupplierPage(pageNumber);
    //   });
    // }
    // // next page
    // $("#supplier-next-page")
    //   .off("click")
    //   .on("click", () => {
    //     let pageActive = parseInt($(".supplier-active-page").text().trim());
    //     let incrementPage = pageActive + 1;
    //     if (incrementPage > supplierTotalPage) {
    //       incrementPage = 1;
    //     }
    //     getSupplierPage(incrementPage);
    //   });
    // // last page
    // $("#supplier-last-page")
    //   .off("click")
    //   .on("click", () => getSupplierPage(supplierTotalPage));

    // // Initial page load
    // getSupplierPage(supplierCurrentPage);
  }

  getInit();
  // get-detail-satuan | get id satuan
  $(document).on("click", "#satuanDetail", function () {
    console.log("clicked button");
    const satuan = this.dataset;
    $("#detailSatuanModalLabel").text(satuan.satuanname);
    $("#detail-satuan-name").text(satuan.satuanname);
    $("#detail-satuan-keterangan").text(satuan.satuaninfo);
  });
});

export const getSatuanAgain = () => {
  // get all satuan
  getSatuan((status, response) => {
    if (status) {
      let tr = ``;
      response.forEach((element) => {
        tr += trSatuan(element);
      });
      $("#satuan-data").html(tr);
    }
    if (!status) {
      console.error(response);
    }
  });
};
