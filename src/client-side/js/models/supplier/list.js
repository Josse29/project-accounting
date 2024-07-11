import {
  getListSupplier,
  getTotalRowSupplier,
} from "../../../../serverless-side/functions/supplier.js";
import { uiSupplierListCreateProduct } from "./ui.js";

// function to update list supplier ref product create action
export function listSupplierRefProductCreate() {
  $(".product-refsupplier-list").hide();
  // Initial category fetch
  let supplierListSearch = "";
  getInit(supplierListSearch);
  $("#product-refsupplier-create").on("focus", () => {
    $(".product-refsupplier-list").show();
  });
  $("#product-refsupplier-create").on("blur", () => {
    setTimeout(() => {
      $(".product-refsupplier-list").hide();
    }, 200);
  });
  $("#product-refsupplier-create").on("keyup", function () {
    supplierListSearch = $(this).val();
    getInit(supplierListSearch);
  });
  function getInit(supplierListSearch) {
    getTotalRowSupplier(supplierListSearch, (status, response) => {
      if (status) {
        const totalSupplier = response;
        if (totalSupplier >= 1) {
          $("#product-refsupplier-create").show();
          $("#supplier-empty").hide();
          getListSupplier(supplierListSearch, (status, response) => {
            if (status) {
              uiSupplierListCreateProduct(response);
            } else {
              console.error(response);
            }
          });
        }
        if (totalSupplier < 1) {
          if (supplierListSearch) {
            const optionNotFound = `<div class='product-refsupplier-not-found'>supplier - <b>${supplierListSearch}</b> tidak ditemukan</div>`;
            $(".product-refsupplier-list").html(optionNotFound);
          } else {
            $("#supplier-empty").show();
          }
          $("#product-refsupplier-create").hide();
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
  function updateSupplierList(response) {
    let option = "";
    response.forEach((el) => {
      option += `<div class='product-refsupplier-val-update fs-6' value='${el.SupplierId}'>${el.SupplierName}</div>`;
    });
    $(".product-refsupplier-update-list").html(option);
    // Re-bind click event to new elements
    $(".product-refsupplier-val-update").on("click", function () {
      $("#product-refsupplier-update-val").val($(this).attr("value"));
      $("#product-refsupplier-update").val(this.textContent);
      $(".product-refsupplier-update-list").hide();
    });
  }
  // Initial category fetch
  let supplierListSearch = "";
  getTotalRowSupplier(supplierListSearch, (status, response) => {
    if (status) {
      const totalSupplier = response;
      if (totalSupplier >= 1) {
        $("#product-refsupplier-update").show();
        $(".supplier-empty-update").hide();
        getListSupplier(supplierListSearch, (status, response) => {
          if (status) {
            updateSupplierList(response);
          } else {
            console.error(response);
          }
        });
      }
      if (totalSupplier < 1) {
        $("#product-refsupplier-update").hide();
        $(".supplier-empty-update").show();
      }
    }
    if (!status) {
      console.log(response);
    }
  });
  $("#product-refsupplier-update").on("focus", () => {
    $(".product-refsupplier-update-list").show();
  });
  $("#product-refsupplier-update").on("blur", () => {
    setTimeout(() => {
      $(".product-refsupplier-update-list").hide();
    }, 200);
  });
  $("#product-refsupplier-update").on("keyup", function () {
    supplierListSearch = $(this).val();
    getTotalRowSupplier(supplierListSearch, (status, response) => {
      if (status) {
        const totalCategorySearch = response;
        if (totalCategorySearch >= 1) {
          getListSupplier(supplierListSearch, (status, response) => {
            if (status) {
              updateSupplierList(response);
            } else {
              console.error(response);
            }
          });
        }
        if (totalCategorySearch < 1) {
          const optionNotFound = `<div class='product-refsupplier-not-found-update fs-6'>kategori - <b>${supplierListSearch}</b> tidak ditemukan</div>`;
          $(".product-refsupplier-update-list").html(optionNotFound);
        }
      }
      if (!status) {
        console.log(response);
      }
    });
  });
}
