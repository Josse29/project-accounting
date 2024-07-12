import {
  getListProduct,
  getTotalRowProduct,
} from "../../../../serverless-side/functions/product.js";
import { uiListRefPersediaanCreate, uiListRefPersediaanUpdate } from "./ui.js";
import { getPersediaanQty } from "../../../../serverless-side/functions/persediaan.js";
// function to update when create list product ref persediaan
export function listProductRefPersediaanCreate() {
  $(document).ready(function () {
    const $productList = $("#persediaan-refproduct-create-list");
    let productListSearch = $("input#persediaan-refproduct-search-name");
    $productList.hide();
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
      getInit(productListSearch.val());
    });
    // 1.Initial Product (getTotalRow, and getListProduct)
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
                uiListRefPersediaanCreate(response);
                getValue();
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
    // 2.function to get value, get total qty based on click
    function getValue() {
      // Re-bind click event to new elements
      $(".persediaan-refproduct-create-val").on("click", function () {
        // function to get total qty
        getPersediaanQty($(this).attr("valueid"), (status, response) => {
          if (status) {
            const existProduct = response.length >= 1;
            if (existProduct) {
              const totalQty = response[0].TotalQty;
              productListSearch.val(
                `${this.textContent} - Totat Qty : ${totalQty}`
              );
            }
            if (!existProduct) {
              productListSearch.val(this.textContent);
            }
          }
          if (!status) {
            console.error(response);
          }
        });
        $("input#persediaan-refproduct-create-name").val(this.textContent);
        $("input#persediaan-refproduct-create-id").val($(this).attr("valueid"));
        $("input#persediaan-refproduct-create-rp").val(
          $(this).attr("valueprice")
        );
        $("#persediaan-refproduct-create-list").hide();
      });
    }
  });
}
// function to update when update list product ref persediaan hufft
export function listProductRefPersediaanUpdate() {
  $(document).ready(function () {
    let $productSearch = $("input#persediaan-refproduct-update-search");
    const $productList = $("div#persediaan-refproduct-update-list");
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
      getInit($productSearch.val());
    });
    // 1.Initial Product (getTotalRow, and getListProduct)
    function getInit(productSearch) {
      getTotalRowProduct(productSearch, (status, response) => {
        // if succeed
        if (status) {
          const totalProductList = parseInt(response);
          // exsited product
          if (totalProductList >= 1) {
            $("div#productList-empty-update").hide();
            getListProduct(productSearch, (status, response) => {
              if (status) {
                uiListRefPersediaanUpdate(response);
                getValue();
              } else {
                console.error(response);
              }
            });
          }
          // non-existed product
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
        // if fail
        if (!status) {
          console.error(response);
        }
      });
    }
    // 2.function to get value, get total qty based on click
    function getValue() {
      // Re-bind click event to new elements
      $(".persediaan-refproduct-update-val").on("click", function () {
        getPersediaanQty($(this).attr("valueid"), (status, response) => {
          if (status) {
            const existedProduct = response.length >= 1;
            if (existedProduct) {
              const totalQty = response[0].TotalQty;
              $productSearch.val(
                `${this.textContent} - Totat Qty : ${totalQty}`
              );
            }
            if (!existedProduct) {
              $productSearch.val(this.textContent);
            }
          }
          if (!status) {
            console.error(response);
          }
        });
        $("input#persediaan-refproduct-update-id").val($(this).attr("valueid"));
        $("input#persediaan-refproduct-update-rp").val(
          $(this).attr("valueprice")
        );
        $("input#persediaan-refproduct-update-name").val(this.textContent);
        $productList.hide();
      });
    }
  });
}
