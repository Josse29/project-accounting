import {
  getCategory,
  getTotalPageCategory,
  getTotalRowCategory,
} from "../../../../serverless-side/functions/categories.js";
import { reinitializeTooltips } from "../../utils/updateUi.js";
import {
  uiActivePageButton,
  uiBtnPage,
  uiTrCategory,
  uiTrZero,
  uiTrZeroSearch,
} from "./ui.js";
$(document).ready(function () {
  let categoryTotalRow;
  let categoryTotalPage;
  let categoryBtnPage;
  let categorySearch = $("#category-search-input").val();
  let categoryLimit = $("#category-limit").val();
  getInit();
  $("#category-search-input").on("keyup", function () {
    categorySearch = $(this).val();
    getInit(categorySearch);
  });
  $("#category-limit").on("change", function () {
    categoryLimit = parseInt($(this).val());
    getInit();
  });
  // 1. get first,  get total row, upadate ui (total row) as condition
  function getInit() {
    getTotalRowCategory(categorySearch, (status, response) => {
      // if success get total row category
      if (status) {
        categoryTotalRow = response;
        $("#categories-total-row").text(categoryTotalRow);
        // if it exist category
        if (categoryTotalRow >= 1) {
          getTotalPage();
          $("#category-pagination").removeClass("d-none");
        }
        // if it doesn't exist category
        if (categoryTotalRow < 1) {
          if (categorySearch) {
            $("#category-data").html(uiTrZeroSearch(categorySearch));
          } else {
            $("#category-data").html(uiTrZero);
          }
          $("#category-pagination").addClass("d-none");
        }
      }
      // if failed get total row category
      if (!status) {
        console.error(response);
      }
    });
  }
  // 2. get total page, update ui (total row)
  function getTotalPage() {
    getTotalPageCategory(categorySearch, categoryLimit, (status, response) => {
      if (status) {
        categoryTotalPage = parseInt(response);
        uiPagination(categoryTotalPage);
      }
      if (!status) {
        console.error(response);
      }
    });
  }
  // 3. Function to insert html pagination
  function uiPagination(categoryTotalPage) {
    let uiBtnPaginate = "";
    for (let i = 1; i <= categoryTotalPage; i++) {
      uiBtnPaginate += uiBtnPage(i);
    }
    $("#category-number-page").html(uiBtnPaginate);
    handlePagination(categoryTotalPage);
  }
  // 4. function to handle pagination(first,prev,number,next,last)
  function handlePagination(categoryTotalPage) {
    // Event listeners for pagination buttons
    categoryBtnPage = document.getElementsByClassName("category-btn-page");
    // first page
    $("#category-first-page")
      .off("click")
      .on("click", () => {
        getCategoryPage(1);
      });
    // previous page
    $("#category-prev-page")
      .off("click")
      .on("click", () => {
        let pageActive = parseInt($(".category-active-page").text().trim());
        let decrementPage = pageActive - 1;
        if (decrementPage < 1) {
          decrementPage = categoryTotalPage;
        }
        getCategoryPage(decrementPage);
      });
    // based on number when clicked
    for (let i = 0; i < categoryTotalPage; i++) {
      categoryBtnPage[i].addEventListener("click", function () {
        const pageNumber = parseInt(this.textContent.trim());
        getCategoryPage(pageNumber);
      });
    }
    // // next page
    $("#category-next-page")
      .off("click")
      .on("click", () => {
        let pageActive = parseInt($(".category-active-page").text().trim());
        let incrementPage = pageActive + 1;
        if (incrementPage > categoryTotalPage) {
          incrementPage = 1;
        }
        getCategoryPage(incrementPage);
      });
    // last page
    $("#category-last-page")
      .off("click")
      .on("click", () => getCategoryPage(categoryTotalPage));

    // Initial page load
    getCategoryPage(1);
  }
  // 5. function to handle get satuan based on pageActive
  function getCategoryPage(categoryPageNumber) {
    // function to only get product based on search, limit, page
    getCategory(
      categorySearch,
      categoryLimit,
      categoryPageNumber,
      (status, response) => {
        // if success
        if (status) {
          let tr = "";
          response.forEach((element) => {
            tr += uiTrCategory(element);
          });
          $("#category-data").html(tr);
          uiActivePageButton(categoryPageNumber, categoryBtnPage);
          reinitializeTooltips();
        }
        // if failed
        if (!status) {
          console.error(response);
        }
      }
    );
  }
  // get-detail-product event binding fuckkkkkkk 2 jam lebih
  $(document).on("click", "#categoryDetailBtn", function () {
    const category = this.dataset;
    $("#category-detail-label").text(category.categorynama);
    $("#category-detail-name").text(category.categorynama);
    $("#category-detail-info").text(category.categoryketerangan);
  });
});
export const getCategoryAgain = () => {
  let categoryTotalRow;
  let categoryTotalPage;
  let categoryBtnPage;
  let categorySearch = $("#category-search-input").val();
  let categoryLimit = $("#category-limit").val();
  getInit();
  $("#category-search-input").on("keyup", function () {
    categorySearch = $(this).val();
    getInit(categorySearch);
  });
  $("#category-limit").on("change", function () {
    categoryLimit = parseInt($(this).val());
    getInit();
  });
  // 1. get first,  get total row, upadate ui (total row) as condition
  function getInit() {
    getTotalRowCategory(categorySearch, (status, response) => {
      // if success get total row category
      if (status) {
        categoryTotalRow = response;
        $("#categories-total-row").text(categoryTotalRow);
        // if it exist category
        if (categoryTotalRow >= 1) {
          getTotalPage();
          $("#category-pagination").removeClass("d-none");
        }
        // if it doesn't exist category
        if (categoryTotalRow < 1) {
          if (categorySearch) {
            $("#category-data").html(uiTrZeroSearch(categorySearch));
          } else {
            $("#category-data").html(uiTrZero);
          }
          $("#category-pagination").addClass("d-none");
        }
      }
      // if failed get total row category
      if (!status) {
        console.error(response);
      }
    });
  }
  // 2. get total page, update ui (total row)
  function getTotalPage() {
    getTotalPageCategory(categorySearch, categoryLimit, (status, response) => {
      if (status) {
        categoryTotalPage = parseInt(response);
        uiPagination(categoryTotalPage);
      }
      if (!status) {
        console.error(response);
      }
    });
  }
  // 3. Function to insert html pagination
  function uiPagination(categoryTotalPage) {
    let uiBtnPaginate = "";
    for (let i = 1; i <= categoryTotalPage; i++) {
      uiBtnPaginate += uiBtnPage(i);
    }
    $("#category-number-page").html(uiBtnPaginate);
    handlePagination(categoryTotalPage);
  }
  // 4. function to handle pagination(first,prev,number,next,last)
  function handlePagination(categoryTotalPage) {
    // Event listeners for pagination buttons
    categoryBtnPage = document.getElementsByClassName("category-btn-page");
    // first page
    $("#category-first-page")
      .off("click")
      .on("click", () => {
        getCategoryPage(1);
      });
    // previous page
    $("#category-prev-page")
      .off("click")
      .on("click", () => {
        let pageActive = parseInt($(".category-active-page").text().trim());
        let decrementPage = pageActive - 1;
        if (decrementPage < 1) {
          decrementPage = categoryTotalPage;
        }
        getCategoryPage(decrementPage);
      });
    // based on number when clicked
    for (let i = 0; i < categoryTotalPage; i++) {
      categoryBtnPage[i].addEventListener("click", function () {
        const pageNumber = parseInt(this.textContent.trim());
        getCategoryPage(pageNumber);
      });
    }
    // // next page
    $("#category-next-page")
      .off("click")
      .on("click", () => {
        let pageActive = parseInt($(".category-active-page").text().trim());
        let incrementPage = pageActive + 1;
        if (incrementPage > categoryTotalPage) {
          incrementPage = 1;
        }
        getCategoryPage(incrementPage);
      });
    // last page
    $("#category-last-page")
      .off("click")
      .on("click", () => getCategoryPage(categoryTotalPage));

    // Initial page load
    getCategoryPage(1);
  }
  // 5. function to handle get satuan based on pageActive
  function getCategoryPage(categoryPageNumber) {
    // function to only get product based on search, limit, page
    getCategory(
      categorySearch,
      categoryLimit,
      categoryPageNumber,
      (status, response) => {
        // if success
        if (status) {
          let tr = "";
          response.forEach((element) => {
            tr += uiTrCategory(element);
          });
          $("#category-data").html(tr);
          uiActivePageButton(categoryPageNumber, categoryBtnPage);
          reinitializeTooltips();
        }
        // if failed
        if (!status) {
          console.error(response);
        }
      }
    );
  }
  // get-detail-product event binding fuckkkkkkk 2 jam lebih
  $(document).on("click", "#categoryDetailBtn", function () {
    const category = this.dataset;
    $("#category-detail-label").text(category.categorynama);
    $("#category-detail-name").text(category.categorynama);
    $("#category-detail-info").text(category.categoryketerangan);
  });
  listCategoryRefProductCreate();
};
