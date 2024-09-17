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
  handlePagination(categoryTotalPage);
}
// 4. function to handle pagination(first,prev,number,next,last)
function handlePagination(categoryTotalPage) {
  // Event listeners for pagination buttons
  categoryBtnPage = document.getElementsByClassName("category-btn-page");

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
        uiActivePageButton(categoryPageNumber, categoryBtnPage);
        reinitializeTooltips();
      }
      // if failed
      if (!status) {
        console.error(response);
      }
    }
  );
  getDetail();
}
