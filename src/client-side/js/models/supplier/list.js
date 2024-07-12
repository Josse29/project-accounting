import {
  getListSupplier,
  getTotalRowSupplier,
} from "../../../../serverless-side/functions/supplier.js";
import { uiListProductCreate, uiListProductUpdate } from "./ui.js";

// function to update list supplier ref product create action
export function listSupplierRefProductCreate() {
  $(".product-refsupplier-list").hide();
  // Initial category fetch
  let supplierListSearch = $("input#product-refsupplier-create");
  getInit(supplierListSearch.val());
  supplierListSearch.on("focus", () => {
    $(".product-refsupplier-list").show();
  });
  supplierListSearch.on("blur", () => {
    setTimeout(() => {
      $(".product-refsupplier-list").hide();
    }, 200);
  });
  supplierListSearch.on("keyup", function () {
    supplierListSearch = $(this).val();
    getInit(supplierListSearch);
  });
  function getInit(supplierListSearch) {
    getTotalRowSupplier(supplierListSearch, (status, response) => {
      if (status) {
        const totalSupplier = response;
        // existence supplier
        if (totalSupplier >= 1) {
          $("#product-refsupplier-create").show();
          $("#supplier-empty").hide();
          getListSupplier(supplierListSearch, (status, response) => {
            if (status) {
              uiListProductCreate(response);
              // Re-bind click event to new elements
              $(".product-refsupplier-val").on("click", function () {
                $("#product-refsupplier-create-val").val($(this).attr("value"));
                $("#product-refsupplier-create").val(this.textContent);
                $(".product-refsupplier-list").hide();
              });
            }
            if (!status) {
              console.error(response);
            }
          });
        }
        // non-existence supplier
        if (totalSupplier < 1) {
          // with feature-search
          if (supplierListSearch) {
            const optionNotFound = `<div class='product-refsupplier-not-found'>supplier - <b>${supplierListSearch}</b> tidak ditemukan</div>`;
            $(".product-refsupplier-list").html(optionNotFound);
          }
          // without feature search
          if (!supplierListSearch) {
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
