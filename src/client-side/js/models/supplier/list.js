import {
  getListSupplier,
  getTotalRowSupplier,
} from "../../../../serverless-side/functions/supplier.js";
import { uiListProductCreate, uiListProductUpdate } from "./ui.js";

// function to update list supplier ref product create action
export function listSupplierRefProductCreate() {
  const supplierList = $(".product-refsupplier-list");
  let supplierListSearch = $("input#product-refsupplier-create");
  supplierList.hide();
  getInit(supplierListSearch.val());
  supplierListSearch.on("focus", () => {
    supplierList.show();
  });
  supplierListSearch.on("blur", () => {
    setTimeout(() => {
      supplierList.hide();
    }, 200);
  });
  supplierListSearch.on("keyup", function (event) {
    if (
      event.keyCode === 38 || // Arrow Up
      event.keyCode === 40 || // Arrow Down
      event.keyCode === 13 || // Enter
      event.keyCode === 37 || // Arrow Left
      event.keyCode === 39 // Arrow Right
    ) {
      return false;
    }
    getInit(supplierListSearch.val());
  });
  // 1.Initial Supplierr (getTotalRow, and getListSupplier)
  function getInit(valSearch) {
    getTotalRowSupplier(valSearch, (status, response) => {
      if (status) {
        const totalSupplier = parseInt(response);
        // existence supplier
        if (totalSupplier >= 1) {
          $("#product-refsupplier-create").show();
          $("#supplier-empty").hide();
          getListSupplier(valSearch, (status, response) => {
            if (status) {
              uiListProductCreate(response);
              getValue();
              getValue2();
            }
            if (!status) {
              console.error(response);
            }
          });
        }
        // non-existence supplier
        if (totalSupplier < 1) {
          // with feature-search
          if (valSearch !== "") {
            const optionNotFound = `<div class='product-refsupplier-not-found'>supplier - <b>${valSearch}</b> tidak ditemukan</div>`;
            $(".product-refsupplier-list").html(optionNotFound);
          }
          // without feature search
          if (valSearch === "") {
            supplierListSearch.hide();
            $("#supplier-empty").show();
          }
        }
      }
      if (!status) {
        console.error(response);
      }
    });
  }
  // 2.function to get value, get total qty based on click
  function getValue() {
    // Re-bind click event to new elements
    $(".product-refsupplier-val").on("click", function () {
      $("#product-refsupplier-create-val").val($(this).attr("value"));
      $("#product-refsupplier-create").val(this.textContent);
      $(".product-refsupplier-list").hide();
    });
  }
  // 3 function to get value event keydown and class active hufft
  let index = -1;
  function getValue2() {
    const items = $(".product-refsupplier-val");
  }
}
// function to update when create list product ref categories
export function listSupplierRefProductUpdate() {
  $(".product-refsupplier-update-list").hide();
  let supplierListSearch = $("#product-refsupplier-update");
  getInit(supplierListSearch.val());
  supplierListSearch.on("focus", () => {
    $(".product-refsupplier-update-list").show();
  });
  supplierListSearch.on("blur", () => {
    setTimeout(() => {
      $(".product-refsupplier-update-list").hide();
    }, 200);
  });
  supplierListSearch.on("keyup", function () {
    supplierListSearch = $(this).val();
    getInit(supplierListSearch);
  });
  // Initial category fetch
  function getInit(supplierListSearch) {
    getTotalRowSupplier(supplierListSearch, (status, response) => {
      if (status) {
        const totalSupplier = response;
        // existence supplier
        if (totalSupplier >= 1) {
          $("#product-refsupplier-update").show();
          $(".supplier-empty-update").hide();
          getListSupplier(supplierListSearch, (status, response) => {
            if (status) {
              uiListProductUpdate(response);
              // Re-bind click event to new elements
              $(".product-refsupplier-val-update").on("click", function () {
                $("#product-refsupplier-update-val").val($(this).attr("value"));
                $("#product-refsupplier-update").val(this.textContent);
                $(".product-refsupplier-update-list").hide();
              });
            }
            if (!status) {
              console.error(response);
            }
          });
        }
        // non-existence supplier
        if (totalSupplier < 1) {
          if (supplierListSearch) {
            const optionNotFound = `<div class='product-refsupplier-not-found'>supplier - <b>${supplierListSearch}</b> tidak ditemukan</div>`;
            $(".product-refsupplier-update-list").html(optionNotFound);
          }
          if (!supplierListSearch) {
            supplierListSearch.hide();
            $(".supplier-empty-update").show();
          }
        }
      }
      if (!status) {
        console.log(response);
      }
    });
  }
}
