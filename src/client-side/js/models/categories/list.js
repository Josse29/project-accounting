import {
  getListCategory,
  getTotalRowCategory,
} from "../../../../serverless-side/functions/categories.js";

// function to update when create list product ref categories
export function listCategoryRefProductCreate() {
  $(".product-refcategory-list").hide();
  function updateCategoryList(response) {
    let option = "";
    response.forEach((el) => {
      option += `<div class='product-refcategory-val fs-6' value='${el.CategoryId}'>${el.CategoryName}</div>`;
    });
    $(".product-refcategory-list").html(option);
    // Re-bind click event to new elements
    $(".product-refcategory-val").on("click", function () {
      $("#product-refcategory-create-val").val($(this).attr("value"));
      $("#product-refcategory-create").val(this.textContent);
      $(".product-refcategory-list").hide();
    });
  }
  // Initial category fetch
  let categoryListSearch = "";
  getTotalRowCategory(categoryListSearch, (status, response) => {
    if (status) {
      const totalCategory = response;
      if (totalCategory >= 1) {
        $("#product-refcategory-create").show();
        $("#category-empty").hide();
        getListCategory(categoryListSearch, (status, response) => {
          if (status) {
            updateCategoryList(response);
          } else {
            console.error(response);
          }
        });
      }
      if (totalCategory < 1) {
        $("#product-refcategory-create").hide();
        $("#category-empty").show();
      }
    }
    if (!status) {
      console.log(response);
    }
  });
  $("#product-refcategory-create").on("focus", () => {
    $(".product-refcategory-list").show();
  });
  $("#product-refcategory-create").on("blur", () => {
    setTimeout(() => {
      $(".product-refcategory-list").hide();
    }, 200);
  });
  $("#product-refcategory-create").on("keyup", function () {
    categoryListSearch = $(this).val();
    getTotalRowCategory(categoryListSearch, (status, response) => {
      if (status) {
        const totalCategorySearch = response;
        if (totalCategorySearch >= 1) {
          getListCategory(categoryListSearch, (status, response) => {
            if (status) {
              updateCategoryList(response);
            } else {
              console.error(response);
            }
          });
        }
        if (totalCategorySearch < 1) {
          const optionNotFound = `<div class='product-refcategory-not-found'>kategori - <b>${categoryListSearch}</b> tidak ditemukan</div>`;
          $(".product-refcategory-list").html(optionNotFound);
        }
      }
      if (!status) {
        console.log(response);
      }
    });
  });
}
// function to update when update list product ref categories
export function listCategoryRefProductUpdate() {
  $(".product-refcategory-update-list").hide();
  function updateCategoryList(response) {
    let option = "";
    response.forEach((el) => {
      option += `<div class='product-refcategory-val-update fs-6' value='${el.CategoryId}'>${el.CategoryName}</div>`;
    });
    $(".product-refcategory-update-list").html(option);
    // Re-bind click event to new elements
    $(".product-refcategory-val-update").on("click", function () {
      $("#product-refcategory-update-val").val($(this).attr("value"));
      $("#product-refcategory-update").val(this.textContent);
      $(".product-refcategory-update-list").hide();
    });
  }
  // Initial category fetch
  let categoryListSearch = "";
  getTotalRowCategory(categoryListSearch, (status, response) => {
    if (status) {
      const totalCategory = response;
      if (totalCategory >= 1) {
        $("#product-refcategory-update").show();
        $(".category-empty-update").hide();
        getListCategory(categoryListSearch, (status, response) => {
          if (status) {
            updateCategoryList(response);
          } else {
            console.error(response);
          }
        });
      }
      if (totalCategory < 1) {
        $("#product-refcategory-update").hide();
        $(".category-empty-update").show();
      }
    }
    if (!status) {
      console.log(response);
    }
  });
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
    getTotalRowCategory(categoryListSearch, (status, response) => {
      if (status) {
        const totalCategorySearch = response;
        if (totalCategorySearch >= 1) {
          getListCategory(categoryListSearch, (status, response) => {
            if (status) {
              updateCategoryList(response);
            } else {
              console.error(response);
            }
          });
        }
        if (totalCategorySearch < 1) {
          const optionNotFound = `<div class='product-refcategory-not-found-update fs-6'>kategori - <b>${categoryListSearch}</b> tidak ditemukan</div>`;
          $(".product-refcategory-update-list").html(optionNotFound);
        }
      }
      if (!status) {
        console.log(response);
      }
    });
  });
}
