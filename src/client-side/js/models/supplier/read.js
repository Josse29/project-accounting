import {
  getListSupplier,
  getSupplier,
  getTotalPageSupplier,
  getTotalRowSupplier,
} from "../../../../serverless-side/functions/supplier.js";
import { reinitializeTooltips } from "../../utils/updateUi.js";
import {
  btnSupplierPage,
  trSupplier,
  trSupplierZero,
  trSupplierZeroSearch,
  updateActivePageButton,
} from "./ui.js";
$(document).ready(function () {
  // get all value
  let supplierSearch = $("#supplier-search-input").val();
  let supplierLimit = parseInt($("#supplier-limit").val());
  let supplierCurrentPage = 1;
  let supplierTotalRow;
  let supplierTotalPage;
  let supplierBtnPage;
  // Function to update product based on page number and insert to html
  function getSupplierPage(supplierPageNumber) {
    getSupplier(
      supplierSearch,
      supplierLimit,
      supplierPageNumber,
      (status, response) => {
        if (status) {
          let tr = ``;
          let productList;
          response.forEach((element) => {
            if (element.ProductList) {
              let productListArray = element.ProductList.split(",");
              let productListItems = productListArray
                .map((product) => `<li class='text-capitalize'>${product}</li>`)
                .join("");
              productList = `<ul class='mt-3'>${productListItems}</ul>`;
            } else {
              productList = `<div class='text-muted text-center'>No products available</div>`;
            }
            tr += trSupplier(element, productList);
          });
          // supplier-refproduct-list
          $("#supplier-table").html(tr);

          updateActivePageButton(supplierPageNumber, supplierBtnPage);
          reinitializeTooltips();
        }
        if (!status) {
          console.error(response);
        }
      }
    );
    // get detail based on paramsid
    $(document).on("click", "#supplierDetail", function () {
      const supplier = this.dataset;
      const supplierName = supplier.suppliername;
      const supplierInfo = supplier.supplierinfo;
      const supplierImg = supplier.supplierimg;
      console.log(supplier);
      $("#supplierDetailModalLabel").text(supplierName);
      $("#supplier-detail-name").text(supplierName);
      $("#supplier-detail-info").text(supplierInfo);
      // if it no information further
      if (supplierInfo === "") {
        $("#supplier-detail-info").text("-");
      }
      // if exist photo
      if (supplierImg === "null") {
        $("#no-image").removeClass("d-none");
        $("#supplier-detail-img").attr("src", "");
      }
      // if it doesn't exist photo
      if (supplierImg !== "null") {
        $("#no-image").addClass("d-none");
        $("#supplier-detail-img").attr("src", supplierImg);
      }
    });
  }
  // Function to handle pagination(first,prev,number,next,last) and updateui active pagination
  function handlePagination(response) {
    let uiBtnPaginate = "";
    for (let i = 1; i <= response; i++) {
      uiBtnPaginate += btnSupplierPage(i);
    }
    $("#supplier-number-page").html(uiBtnPaginate);
    // Event listeners for pagination buttons
    supplierBtnPage = document.getElementsByClassName("supplier-btn-page");
    supplierTotalPage = response;
    // first page
    $("#supplier-first-page")
      .off("click")
      .on("click", () => {
        getSupplierPage(1);
      });
    // previous page
    $("#supplier-prev-page")
      .off("click")
      .on("click", () => {
        let pageActive = parseInt($(".supplier-active-page").text().trim());
        let decrementPage = pageActive - 1;
        if (decrementPage < 1) {
          decrementPage = supplierTotalPage;
        }
        getSupplierPage(decrementPage);
      });
    // based on number when clicked
    for (let i = 0; i < supplierTotalPage; i++) {
      supplierBtnPage[i].addEventListener("click", function () {
        const pageNumber = parseInt(this.textContent.trim());
        getSupplierPage(pageNumber);
      });
    }
    // next page
    $("#supplier-next-page")
      .off("click")
      .on("click", () => {
        let pageActive = parseInt($(".supplier-active-page").text().trim());
        let incrementPage = pageActive + 1;
        if (incrementPage > supplierTotalPage) {
          incrementPage = 1;
        }
        getSupplierPage(incrementPage);
      });
    // last page
    $("#supplier-last-page")
      .off("click")
      .on("click", () => getSupplierPage(supplierTotalPage));

    // Initial page load
    getSupplierPage(supplierCurrentPage);
  }
  function getSupplierSearch() {
    supplierSearch = $("#supplier-search-input").val();
    getTotalRowSupplier(supplierSearch, (status, response) => {
      if (status) {
        supplierTotalRow = response;
        $("#supplier-total-row").text(supplierTotalRow);
        // if it exist product
        if (supplierTotalRow >= 1) {
          // 2. get total page supplier
          getTotalPageSupplier(
            supplierSearch,
            supplierLimit,
            (status, response) => {
              if (status) {
                supplierTotalPage = parseInt(response);
                handlePagination(supplierTotalPage);
                $("#supplier-pagination").removeClass("d-none");
              }
              if (!status) {
                console.error(response);
              }
            }
          );
        }
        // if it doesn't exist product
        if (supplierTotalRow < 1) {
          $("#supplier-table").html(trSupplierZeroSearch(supplierSearch));
          $("#supplier-pagination").addClass("d-none");
        }
      }
      if (!status) {
        console.log(response);
      }
    });
  }
  function getSupplierLimit() {
    supplierLimit = parseInt($("#supplier-limit").val());
    // 2. get total page supplier
    getTotalPageSupplier(supplierSearch, supplierLimit, (status, response) => {
      if (status) {
        supplierTotalPage = parseInt(response);
        handlePagination(supplierTotalPage);
        $("#supplier-pagination").removeClass("d-none");
      }
      if (!status) {
        console.error(response);
      }
    });
  }
  // Initial fetch ,setup, getTotalRowSupplier first
  getTotalRowSupplier(supplierSearch, (status, response) => {
    if (status) {
      supplierTotalRow = response;
      $("#supplier-total-row").text(supplierTotalRow);
      // if it exist product
      if (supplierTotalRow >= 1) {
        // 2. get total page supplier
        getTotalPageSupplier(
          supplierSearch,
          supplierLimit,
          (status, response) => {
            if (status) {
              supplierTotalPage = parseInt(response);
              handlePagination(supplierTotalPage);
              $("#supplier-pagination").removeClass("d-none");
              $("#supplier-search-input").on("keyup", getSupplierSearch);
              $("#supplier-limit").on("change", getSupplierLimit);
            }
            if (!status) {
              console.error(response);
            }
          }
        );
      }
      // if it doesn't exist product
      if (supplierTotalRow < 1) {
        $("#supplier-table").html(trSupplierZero);
        $("#supplier-pagination").addClass("d-none");
      }
    }
    if (!status) {
      console.log(response);
    }
  });
  listSupplierRefProductCreate();
});
export const getSupplierAgain = () => {
  // get all value
  let supplierSearch = $("#supplier-search-input").val();
  let supplierLimit = parseInt($("#supplier-limit").val());
  let supplierCurrentPage = 1;
  let supplierTotalRow;
  let supplierTotalPage;
  let supplierBtnPage;
  // Function to update product based on page number
  function getSupplierPage(supplierPageNumber) {
    getSupplier(
      supplierSearch,
      supplierLimit,
      supplierPageNumber,
      (status, response) => {
        if (status) {
          let tr = ``;
          let productList;
          response.forEach((element) => {
            if (element.ProductList) {
              let productListArray = element.ProductList.split(",");
              let productListItems = productListArray
                .map((product) => `<li class='text-capitalize'>${product}</li>`)
                .join("");
              productList = `<ul class='mt-3'>${productListItems}</ul>`;
            } else {
              productList = `<div class='text-muted text-center'>No products available</div>`;
            }
            tr += trSupplier(element, productList);
          });
          $("#supplier-table").html(tr);
          updateActivePageButton(supplierPageNumber, supplierBtnPage);
          reinitializeTooltips();
        }
        if (!status) {
          console.error(response);
        }
      }
    );
  }
  // Function to handle pagination(first,prev,number,next,last) and updateui active pagination
  function handlePagination(response) {
    let uiBtnPaginate = "";
    for (let i = 1; i <= response; i++) {
      uiBtnPaginate += btnSupplierPage(i);
    }
    $("#supplier-number-page").html(uiBtnPaginate);
    // Event listeners for pagination buttons
    supplierBtnPage = document.getElementsByClassName("supplier-btn-page");
    supplierTotalPage = response;
    // first page
    $("#supplier-first-page")
      .off("click")
      .on("click", () => {
        getSupplierPage(1);
      });
    // previous page
    $("#supplier-prev-page")
      .off("click")
      .on("click", () => {
        let pageActive = parseInt($(".supplier-active-page").text().trim());
        let decrementPage = pageActive - 1;
        if (decrementPage < 1) {
          decrementPage = supplierTotalPage;
        }
        getSupplierPage(decrementPage);
      });
    // based on number when clicked
    for (let i = 0; i < supplierTotalPage; i++) {
      supplierBtnPage[i].addEventListener("click", function () {
        const pageNumber = parseInt(this.textContent.trim());
        getSupplierPage(pageNumber);
      });
    }
    // next page
    $("#supplier-next-page")
      .off("click")
      .on("click", () => {
        let pageActive = parseInt($(".supplier-active-page").text().trim());
        let incrementPage = pageActive + 1;
        if (incrementPage > supplierTotalPage) {
          incrementPage = 1;
        }
        getSupplierPage(incrementPage);
      });
    // last page
    $("#supplier-last-page")
      .off("click")
      .on("click", () => getSupplierPage(supplierTotalPage));

    // Initial page load
    getSupplierPage(supplierCurrentPage);
  }
  // Initial fetch ,setup, getTotalRowSupplier first
  getTotalRowSupplier(supplierSearch, (status, response) => {
    if (status) {
      supplierTotalRow = response;
      $("#supplier-total-row").text(supplierTotalRow);
      // if it exist product
      if (supplierTotalRow >= 1) {
        // 2. get total page supplier
        getTotalPageSupplier(
          supplierSearch,
          supplierLimit,
          (status, response) => {
            if (status) {
              supplierTotalPage = parseInt(response);
              handlePagination(supplierTotalPage);
              $("#supplier-pagination").removeClass("d-none");
            }
            if (!status) {
              console.error(response);
            }
          }
        );
      }
      // if it doesn't exist product
      if (supplierTotalRow < 1) {
        $("#supplier-table").html(trSupplierZero);
        $("#supplier-pagination").addClass("d-none");
      }
    }
    if (!status) {
      console.log(response);
    }
  });
  listSupplierRefProductCreate();
};
// function to update list supplier ref product create action
export function listSupplierRefProductCreate() {
  $(".product-refsupplier-list").hide();
  // get only list supplier
  function updateSupplierList(response) {
    let option = "";
    response.forEach((el) => {
      option += `<div class='product-refsupplier-val fs-6' value='${el.SupplierId}'>${el.SupplierName}</div>`;
    });
    $(".product-refsupplier-list").html(option);
    // Re-bind click event to new elements
    $(".product-refsupplier-val").on("click", function () {
      $("#product-refsupplier-create-val").val($(this).attr("value"));
      $("#product-refsupplier-create").val(this.textContent);
      $(".product-refsupplier-list").hide();
    });
  }
  // Initial category fetch
  let supplierListSearch = "";
  getTotalRowSupplier(supplierListSearch, (status, response) => {
    if (status) {
      const totalSupplier = response;
      if (totalSupplier >= 1) {
        $("#product-refsupplier-create").show();
        $("#supplier-empty").hide();
        getListSupplier(supplierListSearch, (status, response) => {
          if (status) {
            updateSupplierList(response);
          } else {
            console.error(response);
          }
        });
      }
      if (totalSupplier < 1) {
        $("#product-refsupplier-create").hide();
        $("#supplier-empty").show();
      }
    }
    if (!status) {
      console.error(response);
    }
  });
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
    getTotalRowSupplier(supplierListSearch, (status, response) => {
      if (status) {
        const totalSupplierSearch = response;
        if (totalSupplierSearch >= 1) {
          getListSupplier(supplierListSearch, (status, response) => {
            if (status) {
              updateSupplierList(response);
            } else {
              console.error(response);
            }
          });
        }
        if (totalSupplierSearch < 1) {
          const optionNotFound = `<div class='product-refsupplier-not-found'>supplier - <b>${supplierListSearch}</b> tidak ditemukan</div>`;
          $(".product-refsupplier-list").html(optionNotFound);
        }
      }
      if (!status) {
        console.error(response);
      }
    });
  });
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
