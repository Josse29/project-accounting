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
            getListProduct(productSearch, (status, response) => {
              if (status) {
                const productList = response;
                uiListRefPersediaanCreate(productList);
                getValue();
                getValue2(productList);
              }
              if (!status) {
                console.error(response);
              }
            });
          }
          // nonexistence product
          if (totalProductList < 1) {
            // with search feature
            if (productSearch !== "") {
              const optionNotFound = `<div class='persediaan-refproduct-not-found'>product - <b>${productSearch}</b> tidak ditemukan</div>`;
              $("#persediaan-refproduct-create-list").html(optionNotFound);
            }
            // without search feature
            if (productSearch === "") {
              $productSearch.hide();
              $(".persediaan-refproduct-create-list").hide();
              $("#productList-empty").show();
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
      $(".persediaan-refproduct-create-val").on("click", function () {
        // function to get total qty
        getPersediaanQty($(this).attr("valueid"), (status, response) => {
          if (status) {
            let totalQtyTxt = ``;
            let totalQty = response[0].TotalQty >= 1;
            if (totalQty) {
              totalQtyTxt = response[0].TotalQty;
            }
            if (!totalQty) {
              totalQtyTxt = 0;
            }
            $productSearch.val(
              `${this.textContent} - Total Qty : ${totalQtyTxt}`
            );
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
          }
          if (e.key === "ArrowUp") {
            e.preventDefault();
            index--;
            if (index < 0) {
              index = items.length - 1;
            }
            items.removeClass("active-list");
            $(items).eq(index).addClass("active-list");
          }
          if (e.key === "Enter") {
            e.preventDefault();
            if (index >= 0 && index < items.length) {
              $(items).eq(index).click();
              index = -1;
            }
          }
        });
      $productList.on(
        "mouseenter",
        ".persediaan-refproduct-create-val",
        function () {
          items.removeClass("active-list");
          $(this).addClass("active-list");
          index = items.index(this);
        }
      );
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
      getTotalRowProduct(productSearch, (status, response) => {
        // if succeed
        if (status) {
          const totalProductList = parseInt(response);
          // exsited product
          if (totalProductList >= 1) {
            $("div#productList-empty-update").hide();
            getListProduct(productSearch, (status, response) => {
              if (status) {
                const productList = response;
                uiListRefPersediaanUpdate(productList);
                getValue();
                getValue2(productList);
              } else {
                console.error(response);
              }
            });
          }
          // non-existed product
          if (totalProductList < 1) {
            // with searching
            if (productSearch !== "") {
              const optionNotFound = `<div class='persediaan-refproduct-not-found'>product - <b>${productSearch}</b> tidak ditemukan</div>`;
              $productList.html(optionNotFound);
            }
            if (productSearch === "") {
              $productSearch.hide();
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
            let totalQtyTxt = ``;
            let totalQty = response[0].TotalQty >= 1;
            if (totalQty) {
              totalQtyTxt = response[0].TotalQty;
            }
            if (!totalQty) {
              totalQtyTxt = 0;
            }
            $productSearch.val(
              `${this.textContent} - Total Qty : ${totalQtyTxt}`
            );
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
    // 3 function to get value event keydown and class active hufft
    let index = -1;
    function getValue2() {
      const items = $(".persediaan-refproduct-update-val");
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
          }
          if (e.key === "ArrowUp") {
            e.preventDefault();
            index--;
            if (index < 0) {
              index = items.length - 1;
            }
            items.removeClass("active-list");
            $(items).eq(index).addClass("active-list");
          }
          if (e.key === "Enter") {
            e.preventDefault();
            if (index >= 0 && index < items.length) {
              $(items).eq(index).click();
              index = -1;
            }
          }
        });
      $productList.on(
        "mouseenter",
        ".persediaan-refproduct-update-val",
        function () {
          items.removeClass("active-list");
          $(this).addClass("active-list");
          index = items.index(this);
        }
      );
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
