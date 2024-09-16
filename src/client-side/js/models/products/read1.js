// 1. get first,  get total row, upadate ui (total row) as condition
function getInit() {
  getTotalRowProduct(productSearch, (status, response) => {
    // success get total row product
    if (status) {
      productTotalRow = parseInt(response);
      $("#product-total-row").text(productTotalRow);
      // if it exist product
      if (productTotalRow >= 1) {
        getTotalPage();
        $("#product-pagination").removeClass("d-none");
      }
      // if it doesn't exist product
      if (productTotalRow < 1) {
        if (productSearch !== "") {
          $("#product-table").html(trProductZeroSearch(productSearch));
        }
        if (productSearch === "") {
          $("#product-table").html(trProductZero);
        }
        $("#product-pagination").addClass("d-none");
      }
    }
    // failed get total row product
    if (!status) {
      console.error(response);
    }
  });
}
// 2. get total page, update ui (total row)
function getTotalPage() {
  getTotalPageProduct(productLimit, productSearch, (status, response) => {
    if (status) {
      productTotalPage = parseInt(response);
      uiPagination(productTotalPage);
    }
    if (!status) {
      console.error(response);
    }
  });
}
// 3. Function to insert html pagination
function uiPagination(productTotalPage) {
  let uiBtnPaginate = "";
  for (let i = 1; i <= productTotalPage; i++) {
    uiBtnPaginate += btnProductPage(i);
  }
  $("#product-number-page").html(uiBtnPaginate);
  handlePagination(productTotalPage);
}
// 4. function to handle pagination(first,prev,number,next,last)
function handlePagination(productTotalPage) {
  // Event listeners for pagination buttons
  productBtnPage = document.getElementsByClassName("product-btn-page");
  // first page
  $("#product-first-page")
    .off("click")
    .on("click", () => {
      getProductPage(1);
    });
  // previous page
  $("#product-prev-page")
    .off("click")
    .on("click", () => {
      let pageActive = parseInt($(".product-active-page").text().trim());
      let decrementPage = pageActive - 1;
      if (decrementPage < 1) {
        decrementPage = productTotalPage;
      }
      getProductPage(decrementPage);
    });
  // based on number when clicked
  for (let i = 0; i < productTotalPage; i++) {
    productBtnPage[i].addEventListener("click", function () {
      const pageNumber = parseInt(this.textContent.trim());
      getProductPage(pageNumber);
    });
  }
  // next page
  $("#product-next-page")
    .off("click")
    .on("click", () => {
      let pageActive = parseInt($(".product-active-page").text().trim());
      let incrementPage = pageActive + 1;
      if (incrementPage > productTotalPage) {
        incrementPage = 1;
      }
      getProductPage(incrementPage);
    });
  // last page
  $("#product-last-page")
    .off("click")
    .on("click", () => getProductPage(productTotalPage));
  // Initial page load
  getProductPage(1);
}
// 5. function to handle get based on pageActive
function getProductPage(productPageNumber) {
  getDetail();
}
