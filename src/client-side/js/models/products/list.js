import {
  getListProduct,
  getTotalRowProduct,
} from "../../../../serverless-side/functions/product.js";
import { uiListRefPersediaanCreate } from "./ui.js";
import { getPersediaanQty } from "../../../../serverless-side/functions/persediaan.js";
// function to update when create list product ref persediaan
export function listProductRefPersediaanCreate() {
  $(document).ready(function () {
    const $productList = $("#persediaan-refproduct-create-list");
    let $productSearch = $("input#persediaan-refproduct-search-name");
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
    $productSearch.on("keyup", function (event) {
      if (
        event.keyCode === 38 || // Arrow Up
        event.keyCode === 40 || // Arrow Down
        event.keyCode === 13 || // Enter
        event.keyCode === 37 || // Arrow Left
        event.keyCode === 39 // Arrow Right
      ) {
        return false;
      }
      getInit($productSearch.val());
    });
    // 1.Initial Product (getTotalRow, and getListProduct)
    function getInit(productSearch) {
      // total row product
      getTotalRowProduct(productSearch, (status, response) => {
        // success total row product
        if (status) {
          const totalProductList = parseInt(response);
          // existed product
          if (totalProductList >= 1) {
            $("#productList-empty").hide();
            $productSearch.show();
            getListProduct(productSearch, (status, response) => {
              if (status) {
                const productList = response;
                uiListRefPersediaanCreate(productList);
                getValue();
                getValue2();
              }
              if (!status) {
                console.error(response);
              }
            });
          }
          // nonexistence product
          if (totalProductList < 1) {
            // without search feature
            if (productSearch === "") {
              $productSearch.hide();
              $("#persediaan-refproduct-create-list").hide();
              $("#productList-empty").show();
            }
            // with search feature
            if (productSearch !== "") {
              const optionNotFound = `<div class='persediaan-refproduct-not-found'>product - <b>${productSearch}</b> tidak ditemukan</div>`;
              $("#persediaan-refproduct-create-list").html(optionNotFound);
            }
          }
        }
        // failed total row product
        if (!status) {
          console.error(response);
        }
      });
    }
    // 2.function to get value, get total qty based on click
    function getValue() {
      // Re-bind click event to new elements
      $(".persediaan-refproduct-create-val")
        .off("click")
        .on("click", function () {
          // function to get total qty
          getPersediaanQty($(this).attr("valueid"), (status, response) => {
            if (status) {
              const totalQtyTxt = response ? response : 0;
              $productSearch.val(`${this.textContent}`);
              const htmlStock = `<div class="fs-5 text-start">Stock : ${totalQtyTxt}</div>`;
              $("div#persediaan-create-stock").html(htmlStock);
            }
            if (!status) {
              console.error(response);
            }
          });
          $("input#persediaan-refproduct-create-name").val(this.textContent);
          $("input#persediaan-refproduct-create-id").val(
            $(this).attr("valueid")
          );
          $("input#persediaan-refproduct-create-rp").val(
            $(this).attr("valueprice")
          );
          $productList.hide();
        });
    }
    // 3 function to get value event keydown and class active hufft
    let index = -1;
    function getValue2() {
      const items = $(".persediaan-refproduct-create-val");
      // akhhhhhhhhhhhhhhhhhh event off huyfftt
      $($productSearch)
        .off("keydown")
        .on("keydown", function (e) {
          $productList.show();
          if (e.key === "ArrowDown") {
            e.preventDefault();
            index++;
            if (index >= items.length) {
              index = 0;
            }
            items.removeClass("active-list");
            $(items).eq(index).addClass("active-list");
            // Scroll into view
            $(items).eq(index)[0].scrollIntoView({
              behavior: "smooth", // Optional: smooth scroll animation
              block: "nearest", // Scroll the item into the nearest visible area
            });
          }
          if (e.key === "ArrowUp") {
            e.preventDefault();
            index--;
            if (index < 0) {
              index = items.length - 1;
            }
            items.removeClass("active-list");
            $(items).eq(index).addClass("active-list");
            // Scroll into view
            $(items).eq(index)[0].scrollIntoView({
              behavior: "smooth",
              block: "nearest",
            });
          }
          if (e.key === "Enter") {
            e.preventDefault();
            if (index >= 0 && index < items.length) {
              $(items).eq(index).click();
              index = -1;
            }
          }
        });
      $productList
        .off("mouseenter")
        .on("mouseenter", ".persediaan-refproduct-create-val", function () {
          items.removeClass("active-list");
          $(this).addClass("active-list");
          index = items.index(this);
        });
    }
  });
}
export const listProductRefPersediaanRead = () => {
  getListProduct("", (status, response) => {
    if (status) {
      let option = `<option selected disabled>Produk</option>`;
      response.forEach((row) => {
        option += `<option value=${row.ProductId}>${row.ProductName}</option>`;
      });
      $("select#persediaan-refproduct-search").html(option);
    }
    if (!status) {
      console.error(response);
    }
  });
};
export const listProductRefPersediaanReadDate = () => {
  getListProduct("", (status, response) => {
    if (status) {
      let option = `<option selected disabled>Produk</option>`;
      response.forEach((row) => {
        option += `<option value=${row.ProductId}>${row.ProductName}</option>`;
      });
      $("select#persediaan-date-product").html(option);
    }
    if (!status) {
      console.error(response);
    }
  });
};
export const listProductRefSalesRead = () => {
  getListProduct("", (status, response) => {
    if (status) {
      let option = `<option selected disabled>Choose One Of Products</option>`;
      response.forEach((row) => {
        option += `<option value=${row.ProductId}>${row.ProductName}</option>`;
      });
      $("select#sales-read-productid").html(option);
    }
    if (!status) {
      console.error(response);
    }
  });
};
export const listProductRefSalesReadDate = () => {
  getListProduct("", (status, response) => {
    if (status) {
      let option = `<option selected disabled>Choose One Of Products</option>`;
      response.forEach((row) => {
        option += `<option value=${row.ProductId}>${row.ProductName}</option>`;
      });
      console.log(option);
      $("select#sales-read-productid-date").html(option);
    }
    if (!status) {
      console.error(response);
    }
  });
};
