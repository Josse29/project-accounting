import {
  getListCategory,
  getTotalRowCategory,
} from "../../../../serverless-side/functions/categories.js";
import { uiListRefProductCreate, uiListRefProductUpdate } from "./ui.js";

// function to update when create list product ref categories
export function listCategoryRefProductCreate() {
  $(".product-refcategory-list").hide();
  // Initial category fetch
  let categoryListSearch = "";
  getInit(categoryListSearch);
  $("#product-refcategory-create").on("focus", () => {
    $(".product-refcategory-list").show();
  });
  $("#product-refcategory-create").on("blur", () => {
    setTimeout(() => {
      $(".product-refcategory-list").hide();
    }, 200);
  });
  $("input#product-refcategory-create").on("keyup", function () {
    categoryListSearch = $(this).val();
    getInit(categoryListSearch);
  });
  function getInit(categoryListSearch) {
    getTotalRowCategory(categoryListSearch, (status, response) => {
      if (status) {
        const totalCategory = response;
        // exist category
        if (totalCategory >= 1) {
          $("#product-refcategory-create").show();
          $("#category-empty").hide();
          // function get list category
          getListCategory(categoryListSearch, (status, response) => {
            if (status) {
              uiListRefProductCreate(response);
              // Re-bind click event to new elements
              $(".product-refcategory-val").on("click", function () {
                $("#product-refcategory-create-val").val($(this).attr("value"));
                $("#product-refcategory-create").val(this.textContent);
                $(".product-refcategory-list").hide();
              });
            }
            if (!status) {
              console.error(response);
            }
          });
        }
        // non-existence category
        if (totalCategory < 1) {
          // with search
          if (categoryListSearch) {
            const optionNotFound = `<div class='product-refcategory-not-found'>kategori - <b>${categoryListSearch}</b> tidak ditemukan</div>`;
            $(".product-refcategory-list").html(optionNotFound);
          }
          // without search
          if (!categoryListSearch) {
            $("#category-empty").show();
            $("#product-refcategory-create").hide();
          }
        }
      }
      if (!status) {
        console.log(response);
      }
    });
  }
}
// function to update when update list product ref categories
export function listCategoryRefProductUpdate() {
  $(".product-refcategory-update-list").hide();
  // Initial category fetch
  let categoryListSearch = "";
  getInit(categoryListSearch);
  $("#product-refcategory-update").on("focus", () => {
    $(".product-refcategory-update-list").show();
  });
  $("#product-refcategory-update").on("blur", () => {
    setTimeout(() => {
      $(".product-refcategory-update-list").hide();
    }, 200);
  });
  $("#product-refcategory-update").on("keyup", function () {
    categoryListSearch = $(this).val();
    getInit(categoryListSearch);
  });
  function getInit(categoryListSearch) {
    getTotalRowCategory(categoryListSearch, (status, response) => {
      if (status) {
        const totalCategory = response;
        // existence category
        if (totalCategory >= 1) {
          $("#product-refcategory-update").show();
          $(".category-empty-update").hide();
          getListCategory(categoryListSearch, (status, response) => {
            if (status) {
              uiListRefProductUpdate(response);
              // Re-bind click event to new elements
              $(".product-refcategory-val-update").on("click", function () {
                $("#product-refcategory-update-val").val($(this).attr("value"));
                $("#product-refcategory-update").val(this.textContent);
                $(".product-refcategory-update-list").hide();
              });
            } else {
              console.error(response);
            }
          });
        }
        // non-existence category
        if (totalCategory < 1) {
          // with search
          if (categoryListSearch) {
            const optionNotFound = `<div class='product-refcategory-not-found-update fs-6'>kategori - <b>${categoryListSearch}</b> tidak ditemukan</div>`;
            $(".product-refcategory-update-list").html(optionNotFound);
          }
          // without search
          if (!categoryListSearch) {
            $(".category-empty-update").show();
            $("#product-refcategory-update").hide();
          }
        }
      }
      if (!status) {
        console.log(response);
      }
    });
  }
}
