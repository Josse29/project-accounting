import {
  getProducts,
  getTotalPageProduct,
  getTotalRowProduct,
} from "../../../../serverless-side/functions/product.js";
import { formatRupiah2 } from "../../utils/formatRupiah.js";
import { reinitializeTooltips } from "../../utils/updateUi.js";
import {
  btnProductPage,
  trProductZero,
  trProductZeroSearch,
  uiActivePageButton,
  uiTrProduct,
} from "./ui.js";
import { listProductRefPersediaanCreate } from "../products/list.js";
import { getSupplierAgain } from "./../supplier/read.js";
import { getPersediaanAgain } from "../persediaan/read.js";
$(document).ready(function () {
  let productSearch = $("#product-search-input").val();
  let productLimit = parseInt($("#product-limit").val());
  let productTotalRow;
  let productTotalPage;
  let productBtnPage;
  getInit(productSearch);
  $("#product-search-input").on("keyup", function () {
    productSearch = $(this).val();
    getInit(productSearch);
  });
  $("#product-limit").on("change", function () {
    productLimit = parseInt($(this).val());
    getInit();
  });
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
          if (productSearch) {
            $("#product-data").html(trProductZeroSearch(productSearch));
          } else {
            $("#product-data").html(trProductZero);
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
  // 5. function to handle get satuan based on pageActive
  function getProductPage(productPageNumber) {
    getProducts(
      productSearch,
      productLimit,
      productPageNumber,
      (status, response) => {
        // if success
        if (status) {
          let tr = "";
          response.forEach((element) => {
            tr += uiTrProduct(element);
          });
          $("#product-data").html(tr);
          uiActivePageButton(productPageNumber, productBtnPage);
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
  // get-detail-product event binding fuckkkkkkk 2 jam lebih
  function getDetail() {
    $(document).on("click", "#productDetailBtn", function () {
      const product = this.dataset;
      const productPriceRupiah = formatRupiah2(product.productprice);
      $("#detailProductModalLabel").html(product.productname);
      $("#detail-product-name").text(product.productname);
      // if exist image
      if (product.productimage !== "null") {
        $("img#detail-product-image").attr("src", product.productimage);
        $("#detail-product-image").removeClass("d-none");
        $("#detail-no-image").text(``);
      }
      // if not exist image
      if (product.productimage === "null") {
        $("#detail-product-image").addClass("d-none");
        $("#detail-no-image").text(`no - image displayed`);
        $("img#detail-product-image").attr("src", "");
      }
      // if not exist keterangan
      if (product.productketerangan === "") {
        $("#detail-product-keterangan").text("-");
      }
      // if exist keterangan
      if (product.productketerangan !== "") {
        $("#detail-product-keterangan").text(product.productketerangan);
      }
      $("#detail-product-price").text(productPriceRupiah);
      $("#detail-category-price").text(product.productcategory);
      $("#proudct-detail-refsupplier").text(product.productsupplier);
    });
  }
});
// RE-Initial fetch and setup
export function getProductsAgain() {
  let productSearch = $("#product-search-input").val();
  let productLimit = parseInt($("#product-limit").val());
  let productTotalRow;
  let productTotalPage;
  let productBtnPage;
  getInit(productSearch);
  // 1. get first,  get total row, upadate ui (total row) as condition
  function getInit() {
    getTotalRowProduct(productSearch, (status, response) => {
      // success get total row product
      if (status) {
        productTotalRow = response;
        $("#product-total-row").text(productTotalRow);
        // if it exist product
        if (productTotalRow >= 1) {
          getTotalPage();
          $("#product-pagination").removeClass("d-none");
        }
        // if it doesn't exist product
        if (productTotalRow < 1) {
          if (productSearch) {
            $("#product-data").html(trProductZeroSearch(productSearch));
          } else {
            $("#product-data").html(trProductZero);
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
  // 5. function to handle get satuan based on pageActive
  function getProductPage(productPageNumber) {
    getProducts(
      productSearch,
      productLimit,
      productPageNumber,
      (status, response) => {
        // if success
        if (status) {
          let tr = "";
          response.forEach((element) => {
            tr += uiTrProduct(element);
          });
          $("#product-data").html(tr);
          uiActivePageButton(productPageNumber, productBtnPage);
          reinitializeTooltips();
        }
        // if failed
        if (!status) {
          console.error(response);
        }
      }
    );
  }
}
export const getProductRef = () => {
  listProductRefPersediaanCreate();
  getSupplierAgain();
  getPersediaanAgain();
};
