import {
  getSupplier,
  getTotalPageSupplier,
  getTotalRowSupplier,
} from "../../../../serverless-side/functions/supplier.js";
import { reinitializeTooltips } from "../../utils/updateUi.js";
import {
  btnSupplierPage,
  trSupplier,
  trSupplierZero,
  trSupplierZeroSearch,
  updateActivePageButton,
} from "./ui.js";
$(document).ready(function () {
  // get all value
  let supplierSearch = $("#supplier-search-input").val();
  let supplierLimit = parseInt($("#supplier-limit").val());
  let supplierCurrentPage = 1;
  let supplierTotalRow;
  let supplierTotalPage;
  let supplierBtnPage;
  getInit();
  $("#supplier-search-input").on("keyup", function () {
    supplierSearch = $(this).val();
    getInit(supplierSearch);
  });
  $("#supplier-limit").on("change", function () {
    supplierLimit = parseInt($(this).val());
    getInit();
  });
  // 1. get first,  get total row, upadate ui (total row) as condition
  function getInit() {
    getTotalRowSupplier(supplierSearch, (status, response) => {
      if (status) {
        supplierTotalRow = parseInt(response);
        $("#supplier-total-row").text(supplierTotalRow);
        // if it exist product
        if (supplierTotalRow >= 1) {
          getTotalPage();
          $("#supplier-pagination").removeClass("d-none");
        }
        // if it doesn't exist product
        if (supplierTotalRow < 1) {
          if (supplierSearch) {
            $("#supplier-table").html(trSupplierZeroSearch(supplierSearch));
          } else {
            $("#supplier-table").html(trSupplierZero);
          }
          $("#supplier-pagination").addClass("d-none");
        }
      }
      if (!status) {
        console.log(response);
      }
    });
  }
  // 2. get total page, update ui (total row)
  function getTotalPage() {
    getTotalPageSupplier(supplierSearch, supplierLimit, (status, response) => {
      if (status) {
        supplierTotalPage = parseInt(response);
        uiPagination(supplierTotalPage);
      }
      if (!status) {
        console.error(response);
      }
    });
  }
  // 3. Function to insert html pagination
  function uiPagination(supplierTotalPage) {
    let uiBtnPaginate = "";
    for (let i = 1; i <= supplierTotalPage; i++) {
      uiBtnPaginate += btnSupplierPage(i);
    }
    $("#supplier-number-page").html(uiBtnPaginate);
    handlePagination(supplierTotalPage);
  }
  // 4. function to handle pagination(first,prev,number,next,last)
  function handlePagination(supplierTotalPage) {
    // Event listeners for pagination buttons
    supplierBtnPage = document.getElementsByClassName("supplier-btn-page");
    // first page
    $("#supplier-first-page")
      .off("click")
      .on("click", () => {
        getSupplierPage(1);
      });
    // previous page
    $("#supplier-prev-page")
      .off("click")
      .on("click", () => {
        let pageActive = parseInt($(".supplier-active-page").text().trim());
        let decrementPage = pageActive - 1;
        if (decrementPage < 1) {
          decrementPage = supplierTotalPage;
        }
        getSupplierPage(decrementPage);
      });
    // based on number when clicked
    for (let i = 0; i < supplierTotalPage; i++) {
      supplierBtnPage[i].addEventListener("click", function () {
        const pageNumber = parseInt(this.textContent.trim());
        getSupplierPage(pageNumber);
      });
    }
    // next page
    $("#supplier-next-page")
      .off("click")
      .on("click", () => {
        let pageActive = parseInt($(".supplier-active-page").text().trim());
        let incrementPage = pageActive + 1;
        if (incrementPage > supplierTotalPage) {
          incrementPage = 1;
        }
        getSupplierPage(incrementPage);
      });
    // last page
    $("#supplier-last-page")
      .off("click")
      .on("click", () => getSupplierPage(supplierTotalPage));

    // Initial page load
    getSupplierPage(supplierCurrentPage);
  }
  // 5. function to handle get satuan based on pageActive
  function getSupplierPage(supplierPageNumber) {
    getSupplier(
      supplierSearch,
      supplierLimit,
      supplierPageNumber,
      (status, response) => {
        if (status) {
          let tr = ``;
          let productList;
          response.forEach((element) => {
            if (element.ProductList) {
              let productListArray = element.ProductList.split(",");
              let productListItems = productListArray
                .map((product) => `<li class='text-capitalize'>${product}</li>`)
                .join("");
              productList = `<ul class='mt-3'>${productListItems}</ul>`;
            } else {
              productList = `<div class='text-muted text-center'>No products available</div>`;
            }
            tr += trSupplier(element, productList);
          });
          // supplier-refproduct-list
          $("#supplier-table").html(tr);
          updateActivePageButton(supplierPageNumber, supplierBtnPage);
          reinitializeTooltips();
        }
        if (!status) {
          console.error(response);
        }
      }
    );
  }
  // get detail based on paramsid
  $(document).on("click", "#supplierDetail", function () {
    const supplier = this.dataset;
    const supplierName = supplier.suppliername;
    const supplierInfo = supplier.supplierinfo;
    const supplierImg = supplier.supplierimg;
    console.log(supplier);
    $("#supplierDetailModalLabel").text(supplierName);
    $("#supplier-detail-name").text(supplierName);
    $("#supplier-detail-info").text(supplierInfo);
    // if it no information further
    if (supplierInfo === "") {
      $("#supplier-detail-info").text("-");
    }
    // if exist photo
    if (supplierImg === "null") {
      $("#no-image").removeClass("d-none");
      $("#supplier-detail-img").attr("src", "");
    }
    // if it doesn't exist photo
    if (supplierImg !== "null") {
      $("#no-image").addClass("d-none");
      $("#supplier-detail-img").attr("src", supplierImg);
    }
  });
});
export const getSupplierAgain = () => {
  // get all value
  let supplierSearch = $("#supplier-search-input").val();
  let supplierLimit = parseInt($("#supplier-limit").val());
  let supplierCurrentPage = 1;
  let supplierTotalRow;
  let supplierTotalPage;
  let supplierBtnPage;
  getInit();
  $("#supplier-search-input").on("keyup", function () {
    supplierSearch = $(this).val();
    getInit(supplierSearch);
  });
  $("#supplier-limit").on("change", function () {
    supplierLimit = parseInt($(this).val());
    getInit();
  });
  // 1. get first,  get total row, upadate ui (total row) as condition
  function getInit() {
    getTotalRowSupplier(supplierSearch, (status, response) => {
      if (status) {
        supplierTotalRow = parseInt(response);
        $("#supplier-total-row").text(supplierTotalRow);
        // if it exist product
        if (supplierTotalRow >= 1) {
          getTotalPage();
          $("#supplier-pagination").removeClass("d-none");
        }
        // if it doesn't exist product
        if (supplierTotalRow < 1) {
          if (supplierSearch) {
            $("#supplier-table").html(trSupplierZeroSearch(supplierSearch));
          } else {
            $("#supplier-table").html(trSupplierZero);
          }
          $("#supplier-pagination").addClass("d-none");
        }
      }
      if (!status) {
        console.log(response);
      }
    });
  }
  // 2. get total page, update ui (total row)
  function getTotalPage() {
    getTotalPageSupplier(supplierSearch, supplierLimit, (status, response) => {
      if (status) {
        supplierTotalPage = parseInt(response);
        uiPagination(supplierTotalPage);
      }
      if (!status) {
        console.error(response);
      }
    });
  }
  // 3. Function to insert html pagination
  function uiPagination(supplierTotalPage) {
    let uiBtnPaginate = "";
    for (let i = 1; i <= supplierTotalPage; i++) {
      uiBtnPaginate += btnSupplierPage(i);
    }
    $("#supplier-number-page").html(uiBtnPaginate);
    handlePagination(supplierTotalPage);
  }
  // 4. function to handle pagination(first,prev,number,next,last)
  function handlePagination(supplierTotalPage) {
    // Event listeners for pagination buttons
    supplierBtnPage = document.getElementsByClassName("supplier-btn-page");
    // first page
    $("#supplier-first-page")
      .off("click")
      .on("click", () => {
        getSupplierPage(1);
      });
    // previous page
    $("#supplier-prev-page")
      .off("click")
      .on("click", () => {
        let pageActive = parseInt($(".supplier-active-page").text().trim());
        let decrementPage = pageActive - 1;
        if (decrementPage < 1) {
          decrementPage = supplierTotalPage;
        }
        getSupplierPage(decrementPage);
      });
    // based on number when clicked
    for (let i = 0; i < supplierTotalPage; i++) {
      supplierBtnPage[i].addEventListener("click", function () {
        const pageNumber = parseInt(this.textContent.trim());
        getSupplierPage(pageNumber);
      });
    }
    // next page
    $("#supplier-next-page")
      .off("click")
      .on("click", () => {
        let pageActive = parseInt($(".supplier-active-page").text().trim());
        let incrementPage = pageActive + 1;
        if (incrementPage > supplierTotalPage) {
          incrementPage = 1;
        }
        getSupplierPage(incrementPage);
      });
    // last page
    $("#supplier-last-page")
      .off("click")
      .on("click", () => getSupplierPage(supplierTotalPage));

    // Initial page load
    getSupplierPage(supplierCurrentPage);
  }
  // 5. function to handle get satuan based on pageActive
  function getSupplierPage(supplierPageNumber) {
    getSupplier(
      supplierSearch,
      supplierLimit,
      supplierPageNumber,
      (status, response) => {
        if (status) {
          let tr = ``;
          let productList;
          response.forEach((element) => {
            if (element.ProductList) {
              let productListArray = element.ProductList.split(",");
              let productListItems = productListArray
                .map((product) => `<li class='text-capitalize'>${product}</li>`)
                .join("");
              productList = `<ul class='mt-3'>${productListItems}</ul>`;
            } else {
              productList = `<div class='text-muted text-center'>No products available</div>`;
            }
            tr += trSupplier(element, productList);
          });
          // supplier-refproduct-list
          $("#supplier-table").html(tr);
          updateActivePageButton(supplierPageNumber, supplierBtnPage);
          reinitializeTooltips();
        }
        if (!status) {
          console.error(response);
        }
      }
    );
  }
};
