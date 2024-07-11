import {
  getListProduct,
  getTotalRowProduct,
} from "../../../../serverless-side/functions/product.js";
import {
  uiProductListCreatePersediaan,
  uiProductListupdatePersediaan,
} from "./ui.js";

// function to update when create list product ref persediaan
export function listProductRefPersediaanCreate() {
  $(document).ready(function () {
    const $productList = $("#persediaan-refproduct-create-list");
    $productList.hide();
    let productListSearch = $("input#persediaan-refproduct-search-name");
    getInit(productListSearch.val());
    productListSearch.on("focus", () => {
      $("#persediaan-refproduct-create-list").show();
    });
    productListSearch.on("blur", () => {
      setTimeout(() => {
        $("#persediaan-refproduct-create-list").hide();
      }, 200);
    });
    productListSearch.on("keyup", function () {
      productListSearch = $(this).val();
      getInit(productListSearch);
    });
    // Initial product fetch
    function getInit(productListSearch) {
      getTotalRowProduct(productListSearch, (status, response) => {
        // success total row product
        if (status) {
          const totalProductList = parseInt(response);
          // exist product
          if (totalProductList >= 1) {
            $("#productList-empty").hide();
            getListProduct(productListSearch, (status, response) => {
              if (status) {
                uiProductListCreatePersediaan(response);
                $(".persediaan-refproduct-create-list").show();
              } else {
                console.error(response);
              }
            });
          }
          // nonexistence product
          if (totalProductList < 1) {
            // with search feature
            if (productListSearch) {
              const optionNotFound = `<div class='persediaan-refproduct-not-found'>product - <b>${productListSearch}</b> tidak ditemukan</div>`;
              $("#persediaan-refproduct-create-list").html(optionNotFound);
            }
            // without search feature
            if (!productListSearch) {
              $(".persediaan-refproduct-create-list").hide();
              $("input#persediaan-refproduct-create-name").hide();
              $("#productList-empty").show();
            }
          }
        }
        // failed total row product
        if (!status) {
          console.log(response);
        }
      });
    }
  });
}
// function to update when update list product ref persediaan hufft
export function listProductRefPersediaanUpdate() {
  $(document).ready(function () {
    const $productList = $("div#persediaan-refproduct-update-list");
    let $productSearch = $("input#persediaan-refproduct-update-name");
    $productList.hide();
    getInit($productSearch.val());
    $productSearch.on("focus", () => {
      $productList.show();
    });
    $productSearch.on("blur", () => {
      setTimeout(() => {
        $productList.hide();
      }, 200);
    });
    $productSearch.on("keyup", function () {
      $productSearch = $(this).val();
      getInit($productSearch);
      $productList.show();
    });
    function getInit(productSearch) {
      getTotalRowProduct(productSearch, (status, response) => {
        if (status) {
          const totalProductList = parseInt(response);
          if (totalProductList >= 1) {
            $("#productList-empty-update").hide();
            getListProduct(productSearch, (status, response) => {
              if (status) {
                uiProductListupdatePersediaan(response);
                console.log("test1");
              } else {
                console.error(response);
              }
            });
          }
          if (totalProductList < 1) {
            if (productSearch !== "") {
              const optionNotFound = `<div class='persediaan-refproduct-not-found'>product - <b>${productSearch}</b> tidak ditemukan</div>`;
              $productList.html(optionNotFound);
            } else {
              $productList.hide();
              $("#productList-empty-update").show();
            }
          }
        }
        if (!status) {
          console.error(response);
        }
      });
    }
  });
}
